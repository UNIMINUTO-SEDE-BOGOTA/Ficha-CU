// hooks/useObservatorio.js
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "https://api-cu-production.up.railway.app";
const API_KEY = import.meta.env.VITE_API_KEY;

// Debug: Log de configuración
console.log('[useObservatorio] API_URL:', API_URL);
console.log('[useObservatorio] API_KEY configured:', !!API_KEY);

const CENTRO_NOMBRES = {
  'centro-engativa':               'Especial Minuto de Dios - Engativá',
  'centro-kennedy':                'Kennedy',
  'centro-santa-fe-las-cruces':    'Las Cruces - Santa Fe',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen':  'San Cristóbal Norte - Usaquén',
};

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
        const url = `${API_URL}/api/observatorio/completo/${encodeURIComponent(centroId)}`;
        console.log('[useObservatorio] Fetching from:', url);

        // Construir headers - API_KEY es opcional
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (API_KEY) {
          headers['X-API-Key'] = API_KEY;
        }

        const response = await fetch(url, { headers });

        console.log('[useObservatorio] Response status:', response.status);

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Error ${response.status}: ${response.statusText} - ${errText}`);
        }

        const result = await response.json();
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