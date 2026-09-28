const DEFAULT_PRIMARY_BACKEND_URL = 'https://api-cu.onrender.com';
const DEFAULT_FALLBACK_BACKEND_URL = 'https://fichas-cu-backend-v2.vercel.app';
const SAFE_METHODS = new Set(['GET', 'HEAD']);

const circuit = {
  state: 'CLOSED',
  consecutiveFailures: 0,
  openedAt: 0,
  halfOpenProbeInFlight: false,
};

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function configFromEnv() {
  return {
    primaryUrl: (process.env.PRIMARY_BACKEND_URL || process.env.BACKEND_URL || DEFAULT_PRIMARY_BACKEND_URL).replace(/\/+$/, ''),
    fallbackUrl: (process.env.FALLBACK_BACKEND_URL || DEFAULT_FALLBACK_BACKEND_URL).replace(/\/+$/, ''),
    apiKey: process.env.API_KEY_SECRET,
    primaryTimeoutMs: positiveInteger(process.env.PRIMARY_BACKEND_TIMEOUT_MS, 4000),
    failureThreshold: positiveInteger(process.env.CIRCUIT_FAILURE_THRESHOLD, 3),
    openDurationMs: positiveInteger(process.env.CIRCUIT_OPEN_DURATION_MS, 30000),
  };
}

function markPrimarySuccess() {
  Object.assign(circuit, { state: 'CLOSED', consecutiveFailures: 0, openedAt: 0, halfOpenProbeInFlight: false });
}

function markPrimaryFailure(config, now = Date.now()) {
  circuit.halfOpenProbeInFlight = false;
  circuit.consecutiveFailures += 1;
  if (circuit.state === 'HALF_OPEN' || circuit.consecutiveFailures >= config.failureThreshold) {
    circuit.state = 'OPEN';
    circuit.openedAt = now;
  }
}

function primaryAttemptDecision(config, now = Date.now()) {
  if (circuit.state === 'CLOSED') return { attempt: true, state: 'CLOSED' };
  if (circuit.state === 'OPEN' && now - circuit.openedAt >= config.openDurationMs) circuit.state = 'HALF_OPEN';
  if (circuit.state === 'HALF_OPEN' && !circuit.halfOpenProbeInFlight) {
    circuit.halfOpenProbeInFlight = true;
    return { attempt: true, state: 'HALF_OPEN' };
  }
  return { attempt: false, state: circuit.state };
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function requestOptions(req, apiKey) {
  const options = {
    method: req.method,
    headers: {
      'Content-Type': req.headers?.['content-type'] || 'application/json',
      'X-API-Key': apiKey,
    },
  };
  if (!SAFE_METHODS.has(req.method) && req.body !== undefined && req.body !== null) {
    options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }
  return options;
}

async function sendBackendResponse(res, response, backendUsed) {
  res.setHeader('X-Backend-Used', backendUsed);
  res.setHeader('X-Circuit-State', circuit.state);
  const contentType = response.headers.get('content-type') || '';
  if (contentType) res.setHeader('Content-Type', contentType);
  if (!response.body || response.status === 204 || response.status === 304) {
    return res.status(response.status).end();
  }
  if (contentType.includes('application/json')) return res.status(response.status).json(await response.json());
  return res.status(response.status).send(await response.text());
}

function sanitizedPath(req) {
  let { path = '' } = req.query || {};
  if (Array.isArray(path)) path = path.join('/');
  path = String(path).replace(/^\/+/, '');
  return path.startsWith('api/') ? path.slice(4) : path;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'X-Backend-Used, X-Circuit-State');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const config = configFromEnv();
  if (!config.apiKey) return res.status(500).json({ error: 'Falta configurar API_KEY_SECRET en las variables de entorno de Vercel' });

  const path = sanitizedPath(req);
  const options = requestOptions(req, config.apiKey);

  // Las operaciones con efectos van una sola vez al principal: nunca se reintentan
  // ni se redirigen al respaldo, aunque el circuito de lecturas esté abierto.
  if (!SAFE_METHODS.has(req.method)) {
    try {
      const response = await fetchWithTimeout(
        `${config.primaryUrl}/api/${path}`,
        options,
        config.primaryTimeoutMs,
      );
      return sendBackendResponse(res, response, 'primary');
    } catch (error) {
      res.setHeader('X-Backend-Used', 'primary');
      res.setHeader('X-Circuit-State', circuit.state);
      return res.status(502).json({ error: 'No fue posible contactar el backend principal', details: error instanceof Error ? error.message : 'Error de red' });
    }
  }

  const decision = primaryAttemptDecision(config);
  if (decision.attempt) {
    try {
      const response = await fetchWithTimeout(`${config.primaryUrl}/api/${path}`, options, config.primaryTimeoutMs);
      if (response.status < 500 || response.status > 599) {
        markPrimarySuccess();
        return sendBackendResponse(res, response, 'primary');
      }
      markPrimaryFailure(config);
    } catch {
      markPrimaryFailure(config);
    }
  }

  try {
    return sendBackendResponse(res, await fetch(`${config.fallbackUrl}/api/${path}`, options), 'fallback');
  } catch (error) {
    res.setHeader('X-Backend-Used', 'fallback');
    res.setHeader('X-Circuit-State', circuit.state);
    return res.status(502).json({ error: 'No fue posible contactar ninguno de los backends disponibles', details: error instanceof Error ? error.message : 'Error de red' });
  }
}

export const __testing = {
  circuit,
  configFromEnv,
  markPrimaryFailure,
  markPrimarySuccess,
  primaryAttemptDecision,
  resetCircuit() { markPrimarySuccess(); },
};
