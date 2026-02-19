import api from './api'; // Importas el enchufe

export const getDatosParaImprimir = async (id) => {
  const response = await api.get(`/observatorio/${id}`);
  const dataSucia = response.data;

  // AQUÍ ES DONDE ELIMINAS LA DATA INVENTADA Y CLASIFICAS
  return {
    titulo: dataSucia.header_title || "Reporte Oficial",
    valorPrincipal: dataSucia.main_value,
    fecha: dataSucia.date_created,
    // Si la API trae 20 campos y solo usas 3, aquí los filtras
  };
};