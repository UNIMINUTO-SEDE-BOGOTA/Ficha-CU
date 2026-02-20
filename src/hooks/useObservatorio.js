import { useState, useEffect } from 'react'; // <--- ESTO ES LO QUE FALTA

export function useObservatorio(centroId, colecciones) {
  // Ahora useState ya no dará error
  const [data, setData] = useState({ proyecciones: [], oferta: [], desercion: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no tienes API aún, este código no hará nada, 
    // pero al menos no romperá la página.
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Simulación o Fetch real
        // const res = await fetch(...)
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchAll();
  }, [centroId]);

  return { data, loading };
}