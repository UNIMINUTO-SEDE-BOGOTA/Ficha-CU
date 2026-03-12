// hooks/useObservatorio.js
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "https://api-cu-production.up.railway.app";
const API_KEY = import.meta.env.VITE_API_KEY;

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

  // ── centroNombre se deriva del centroId, NO va al useEffect ──────────────
  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';

  useEffect(() => {
    if (!centroId) {
      setLoading(false);
      return;
    }

    // Verificar que la API key esté configurada
    if (!API_KEY) {
      console.error('❌ VITE_API_KEY no está configurada en las variables de entorno');
      setError('API Key no configurada');
      setLoading(false);
      return;
    }

    let cancelled = false; // evitar setState si el componente se desmontó

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const url = `${API_URL}/api/observatorio/completo/${encodeURIComponent(centroId)}`;
        console.log(`🔄 Fetching: ${url}`);

        const response = await fetch(url, {
          headers: {
            'X-API-Key':     API_KEY,
            'Content-Type':  'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (!cancelled) {
          console.log('✅ Datos recibidos:', {
            indicators:       result.indicators?.length,
            studentSummary:   !!result.studentSummary,
            proyecciones:     result.proyecciones?.length,
            matriculados2026: result.matriculados2026?.length,
            desercion:        result.desercion?.length,
            oferta:           result.oferta?.length,
          });
          setData(result);
        }

      } catch (err) {
        if (!cancelled) {
          console.error('❌ Error fetch:', err);
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: si cambia centroId antes de que termine el fetch, cancelar
    return () => { cancelled = true; };

  }, [centroId]); // ← solo centroId, NO centroNombre

  return { data, loading, error, centroNombre };
}