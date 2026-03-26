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

  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';

  useEffect(() => {
    if (!centroId) {
      setLoading(false);
      return;
    }

    if (!API_KEY) {
      setError('API Key no configurada');
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

        const response = await fetch(url, {
          headers: {
            'X-API-Key':    API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result);
        }

      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
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