import { consolidarSedeBogota } from '../models/sedeBogotaModel.js';

const rawApiBase = (import.meta.env?.VITE_API_URL || '/api/proxy').replace(/\/+$/, '');
const API_BASE = (rawApiBase.startsWith('http') && !rawApiBase.includes('/api'))
  ? `${rawApiBase}/api/proxy`
  : rawApiBase;

const CENTROS_SEDE_BOGOTA = [
  'centro-engativa',
  'centro-kennedy',
  'centro-santa-fe-las-cruces',
  'centro-perdomo-ciudad-bolivar',
  'centro-san-cristobal-usaquen',
];

const cacheSolicitudes = new Map();

async function obtenerDetalleError(response) {
  try {
    const body = await response.json();
    return body?.detail?.message
      || body?.detail
      || body?.message
      || body?.error
      || '';
  } catch {
    return '';
  }
}

async function validarRespuesta(response, contexto) {
  if (response.ok) return response.json();

  const detalle = await obtenerDetalleError(response);
  if (response.status === 503) {
    throw new Error(
      'Los datos de Sede Bogotá aún no están disponibles en caché. '
      + 'Solicita una actualización administrativa e inténtalo nuevamente.',
    );
  }

  const sufijo = typeof detalle === 'string' && detalle ? ` - ${detalle}` : '';
  throw new Error(`Error ${response.status} al consultar ${contexto}${sufijo}`);
}

async function consultarCentroSinCache(centroId) {
  const url = `${API_BASE}/observatorio/completo/${encodeURIComponent(centroId)}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });
  return validarRespuesta(response, centroId);
}

async function consultarSedeBogotaSinCache() {
  const response = await fetch(`${API_BASE}/observatorio/sede-bogota`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const payload = await validarRespuesta(response, 'Sede Bogotá');

  if (!payload?.centros || typeof payload.centros !== 'object') {
    throw new Error('La respuesta consolidada de Sede Bogotá no contiene el campo centros.');
  }

  const respuestas = CENTROS_SEDE_BOGOTA.map((centroId) => {
    const centro = payload.centros[centroId];
    if (!centro) {
      throw new Error(`La respuesta consolidada no contiene el centro ${centroId}.`);
    }
    return centro;
  });

  return {
    ...consolidarSedeBogota(respuestas),
    cache_updated_at: payload.cache_updated_at,
    cache_version: payload.version,
  };
}

function compartirSolicitud(clave, fabrica) {
  if (cacheSolicitudes.has(clave)) return cacheSolicitudes.get(clave);

  const solicitud = fabrica();
  cacheSolicitudes.set(clave, solicitud);
  solicitud.catch(() => cacheSolicitudes.delete(clave));
  return solicitud;
}

export function consultarObservatorio(centroId) {
  if (centroId === 'sede-bogota') {
    return compartirSolicitud(centroId, consultarSedeBogotaSinCache);
  }
  return compartirSolicitud(centroId, () => consultarCentroSinCache(centroId));
}

export const __testing = {
  API_BASE,
  resetCache() {
    cacheSolicitudes.clear();
  },
};
