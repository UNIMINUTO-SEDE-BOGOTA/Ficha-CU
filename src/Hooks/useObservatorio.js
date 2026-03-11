// hooks/useObservatorio.js
import { useState, useEffect } from 'react';
 
const API_URL = import.meta.env.VITE_API_URL || "https://api-cu-production.up.railway.app";
const API_KEY = import.meta.env.VITE_API_KEY;
console.log('🔑 API_KEY:', API_KEY);
 
const CENTRO_NOMBRES = {
  'centro-engativa': 'Especial Minuto de Dios - Engativá',
  'centro-kennedy': 'Kennedy',
  'centro-santa-fe-las-cruces': 'Las Cruces - Santa Fe',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen': 'San Cristóbal Norte - Usaquén',
};
 
export function useObservatorio(centroId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';
 
  useEffect(() => {
    if (!centroId) {
      setLoading(false);
      return;
    }
 
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_URL}/api/observatorio/completo/${encodeURIComponent(centroId)}`;
        console.log(`📍 Centro: ${centroNombre} (${centroId})`);
        console.log('📡 URL:', url);
 
        const response = await fetch(url, {
          headers: {
            'X-API-Key': API_KEY || '',
            'Content-Type': 'application/json',
          },
        });
 
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
 
        const result = await response.json();
        console.log('✅ Datos recibidos:', result);
        setData(result);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [centroId, centroNombre]);
 
  return { data, loading, error, centroNombre };
}