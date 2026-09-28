import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import handler, { __testing } from './proxy.js';

const originalFetch = global.fetch;
const originalEnv = { ...process.env };

function backendResponse(status, body = { ok: true }) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function request(method = 'GET') {
  return { method, query: { path: 'observatorio/completo/centro-engativa' }, headers: { 'content-type': 'application/json' }, body: method === 'GET' ? undefined : { value: 1 } };
}

function response() {
  return {
    headers: {}, statusCode: 200,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
    send(value) { this.body = value; return this; },
    end() { this.ended = true; return this; },
  };
}

beforeEach(() => {
  __testing.resetCircuit();
  Object.assign(process.env, {
    API_KEY_SECRET: 'test-secret', PRIMARY_BACKEND_URL: 'https://primary.example',
    FALLBACK_BACKEND_URL: 'https://fallback.example', CIRCUIT_FAILURE_THRESHOLD: '2',
    CIRCUIT_OPEN_DURATION_MS: '1000',
  });
});

afterEach(() => { global.fetch = originalFetch; process.env = { ...originalEnv }; });

test('uses the primary once when it succeeds', async () => {
  const calls = [];
  global.fetch = async (url) => { calls.push(url); return backendResponse(200); };
  const res = response();
  await handler(request(), res);
  assert.deepEqual(calls, ['https://primary.example/api/observatorio/completo/centro-engativa']);
  assert.equal(res.headers['X-Backend-Used'], 'primary');
  assert.equal(res.headers['X-Circuit-State'], 'CLOSED');
});

test('does not fall back for a functional 4xx response', async () => {
  let calls = 0;
  global.fetch = async () => { calls += 1; return backendResponse(404, { detail: 'not found' }); };
  const res = response();
  await handler(request(), res);
  assert.equal(calls, 1);
  assert.equal(res.statusCode, 404);
  assert.equal(res.headers['X-Backend-Used'], 'primary');
});

test('falls back on 5xx and opens the circuit after the threshold', async () => {
  const calls = [];
  global.fetch = async (url) => { calls.push(url); return url.startsWith('https://primary') ? backendResponse(503) : backendResponse(200); };
  await handler(request(), response());
  const second = response(); await handler(request(), second);
  const third = response(); await handler(request(), third);
  assert.equal(calls.filter((url) => url.startsWith('https://primary')).length, 2);
  assert.equal(calls.filter((url) => url.startsWith('https://fallback')).length, 3);
  assert.equal(second.headers['X-Circuit-State'], 'OPEN');
  assert.equal(third.headers['X-Backend-Used'], 'fallback');
});

test('uses a real request as half-open probe and closes on success', async () => {
  const config = __testing.configFromEnv();
  __testing.circuit.state = 'OPEN';
  __testing.circuit.openedAt = Date.now() - config.openDurationMs - 1;
  global.fetch = async () => backendResponse(200);
  const res = response(); await handler(request(), res);
  assert.equal(res.headers['X-Backend-Used'], 'primary');
  assert.equal(res.headers['X-Circuit-State'], 'CLOSED');
});

test('never retries a non-idempotent operation on the fallback', async () => {
  const calls = [];
  global.fetch = async (url) => { calls.push(url); throw new Error('network down'); };
  const res = response(); await handler(request('POST'), res);
  assert.deepEqual(calls, ['https://primary.example/api/observatorio/completo/centro-engativa']);
  assert.equal(res.statusCode, 502);
  assert.equal(res.headers['X-Backend-Used'], 'primary');
});
