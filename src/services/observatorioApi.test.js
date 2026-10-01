import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { __testing, consultarObservatorio } from './observatorioApi.js';

const originalFetch = global.fetch;

function centro(totalGeneral = 1) {
  return {
    indicators: [],
    studentSummary: { totalGeneral },
    proyecciones: [],
    matriculados: [],
    matriculados2026: [],
    desercion: [],
    oferta: [],
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

beforeEach(() => __testing.resetCache());
afterEach(() => { global.fetch = originalFetch; });

test('Sede Bogotá uses one consolidated request and preserves the combined result', async () => {
  const calls = [];
  global.fetch = async (url) => {
    calls.push(url);
    return jsonResponse({
      cache_updated_at: '2026-10-01T12:00:00Z',
      version: '2026-S2-Q3',
      centros: {
        'centro-engativa': centro(),
        'centro-kennedy': centro(),
        'centro-santa-fe-las-cruces': centro(),
        'centro-perdomo-ciudad-bolivar': centro(),
        'centro-san-cristobal-usaquen': centro(),
      },
    });
  };

  const result = await consultarObservatorio('sede-bogota');

  assert.deepEqual(calls, ['/api/proxy/observatorio/sede-bogota']);
  assert.equal(result.studentSummary.totalGeneral, 5);
  assert.equal(result.cache_updated_at, '2026-10-01T12:00:00Z');
  assert.equal(result.cache_version, '2026-S2-Q3');
});

test('shares an in-flight and resolved Sede Bogotá request', async () => {
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return jsonResponse({
      centros: {
        'centro-engativa': centro(),
        'centro-kennedy': centro(),
        'centro-santa-fe-las-cruces': centro(),
        'centro-perdomo-ciudad-bolivar': centro(),
        'centro-san-cristobal-usaquen': centro(),
      },
    });
  };

  await Promise.all([
    consultarObservatorio('sede-bogota'),
    consultarObservatorio('sede-bogota'),
  ]);
  await consultarObservatorio('sede-bogota');

  assert.equal(calls, 1);
});

test('a 503 shows an actionable cache message without retrying', async () => {
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return jsonResponse({ detail: { code: 'CACHE_NOT_READY' } }, 503);
  };

  await assert.rejects(
    consultarObservatorio('sede-bogota'),
    /aún no están disponibles en caché/,
  );
  assert.equal(calls, 1);
});

test('an individual center keeps using its existing endpoint', async () => {
  const calls = [];
  global.fetch = async (url) => { calls.push(url); return jsonResponse(centro(7)); };

  const result = await consultarObservatorio('centro-kennedy');

  assert.deepEqual(calls, ['/api/proxy/observatorio/completo/centro-kennedy']);
  assert.equal(result.studentSummary.totalGeneral, 7);
});
