// hooks/useObservatorio.js
import { useState, useEffect } from 'react';
import { consultarObservatorio } from '../services/observatorioApi.js';

const CENTRO_NOMBRES = {
  'sede-bogota':                   'Sede Bogotá',
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
