// hooks/useObservatorio.js
import { useState, useEffect } from 'react';
import { consolidarSedeBogota } from '../models/sedeBogotaModel';

// URL base del API (por defecto usa el proxy seguro)
const rawApiBase = (import.meta.env.VITE_API_URL || '/api/proxy').replace(/\/+$/, '');
const API_BASE = (rawApiBase.startsWith('http') && !rawApiBase.includes('/api'))
  ? `${rawApiBase}/api/proxy`
  : rawApiBase;

const API_KEY = import.meta.env.VITE_API_KEY;

const CENTROS_SEDE_BOGOTA = [
  'centro-engativa',
  'centro-kennedy',
  'centro-santa-fe-las-cruces',
  'centro-perdomo-ciudad-bolivar',
  'centro-san-cristobal-usaquen',
];

// Comparte solicitudes en curso y resultados resueltos entre las vistas de
// escritorio, impresión y móvil para no consultar el mismo centro varias veces.
const cacheSolicitudes = new Map();

// Debug: Log de configuración
console.log('[useObservatorio] API_BASE:', API_BASE);

const CENTRO_NOMBRES = {
  'sede-bogota':                   'Sede Bogotá',
  'centro-engativa':               'Especial Minuto de Dios - Engativá',
  'centro-kennedy':                'Kennedy',
  'centro-santa-fe-las-cruces':    'Las Cruces - Santa Fe',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen':  'San Cristóbal Norte - Usaquén',
};

async function consultarCentro(centroId) {
  if (cacheSolicitudes.has(centroId)) {
    return cacheSolicitudes.get(centroId);
  }

  const solicitud = (async () => {
    const url = `${API_BASE}/observatorio/completo/${encodeURIComponent(centroId)}`;
    const headers = { 'Content-Type': 'application/json' };
    if (API_KEY) headers['X-API-Key'] = API_KEY;

    const response = await fetch(url, { headers });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error ${response.status}: ${response.statusText} - ${errText}`);
    }

    return response.json();
  })();

  cacheSolicitudes.set(centroId, solicitud);
  solicitud.catch(() => cacheSolicitudes.delete(centroId));
  return solicitud;
}

async function consultarObservatorio(centroId) {
  if (centroId !== 'sede-bogota') return consultarCentro(centroId);

  if (cacheSolicitudes.has(centroId)) {
    return cacheSolicitudes.get(centroId);
  }

  const solicitudGlobal = Promise.all(
    CENTROS_SEDE_BOGOTA.map(consultarCentro),
  ).then(consolidarSedeBogota);

  cacheSolicitudes.set(centroId, solicitudGlobal);
  solicitudGlobal.catch(() => cacheSolicitudes.delete(centroId));
  return solicitudGlobal;
}

export function useObservatorio(centroId) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';

  useEffect(() => {
    if (!centroId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const result = await consultarObservatorio(centroId);
        console.log('[useObservatorio] Data received:', !!result);

        if (!cancelled) {
          setData(result);
        }

      } catch (err) {
        const errMessage = err instanceof Error ? err.message : 'Error desconocido';
        console.error('[useObservatorio] Error:', errMessage);
        
        if (!cancelled) {
          setError(errMessage);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { cancelled = true; };

  }, [centroId]);

  return { data, loading, error, centroNombre };
}
