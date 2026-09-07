export default async function handler(req, res) {
  // Cabeceras CORS completas para peticiones cross-origin y desarrollo local
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key, Authorization'
  );

  // Manejo de preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sanitizar path recibido
  let { path = '' } = req.query;
  if (Array.isArray(path)) {
    path = path.join('/');
  }
  path = path.replace(/^\/+/, '');
  if (path.startsWith('api/')) {
    path = path.slice(4);
  }

  // Variables de servidor privadas en Vercel (SIN prefijo VITE_)
  const BACKEND_URL = process.env.BACKEND_URL || 'https://api-cu.onrender.com';
  const API_KEY_SECRET = process.env.API_KEY_SECRET;

  if (!API_KEY_SECRET) {
    return res.status(500).json({ error: 'Falta configurar API_KEY_SECRET en las variables de entorno de Vercel' });
  }

  const targetUrl = `${BACKEND_URL}/api/${path}`;

  try {
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY_SECRET, // Se inyecta de forma segura en el servidor de Vercel
      },
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else {
      const text = await response.text();
      return res.status(response.status).send(text);
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Error en el proxy de Vercel',
      details: error.message,
    });
  }
}


