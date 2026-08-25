// hooks/useObservatorio.js
import { useState, useEffect } from 'react';

// URL base del API (por defecto usa el proxy serverless seguro de Vercel)
const API_BASE = import.meta.env.VITE_API_URL || '/api/proxy';

// Debug: Log de configuración
console.log('[useObservatorio] API_BASE:', API_BASE);

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
        const url = `${API_BASE}/observatorio/completo/${encodeURIComponent(centroId)}`;
        console.log('[useObservatorio] Fetching from:', url);

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

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