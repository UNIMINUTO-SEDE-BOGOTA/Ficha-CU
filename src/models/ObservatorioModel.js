export interface ReporteLimpio {
  id: number;
  titulo: string;
  resumen: string;
  puntos: number[];
}

// Esta función "limpia" y "clasifica" la data de la API
export const transformarReporte = (dataApi: any): ReporteLimpio => {
  return {
    id: dataApi.id_reporte_db, // Renombras
    titulo: dataApi.main_title || "Sin Título", // Validamos
    resumen: dataApi.description_text.substring(0, 100) + "...", // Recortamos si es largo
    puntos: dataApi.metrics_array.map((m: any) => m.value) // Extraemos solo los números
  };
};