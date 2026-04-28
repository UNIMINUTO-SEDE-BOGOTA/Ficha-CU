// models/proyeccionPage1Model.js
 
const ANIOS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
 
const obtenerValorAnio = (item, anio) => {
  const anioStr = String(anio);
  const claveEncontrada = Object.keys(item).find(
    (k) => String(k).trim() === anioStr
  );
  return claveEncontrada !== undefined ? item[claveEncontrada] : undefined;
};
 
const mostrarValor = (valor) => {
  if (valor === null || valor === undefined || String(valor).trim() === '') {
    return '-';
  }
  return String(valor).trim();
};
 
export function transformarPage1(apiData) {
console.log('=== RAW studentSummary ===', JSON.stringify(apiData?.studentSummary));
  console.log('=== RAW oferta (primeras 5) ===', JSON.stringify(apiData?.oferta?.slice(0,5)));
  // ─────────────────

  if (!apiData) return generarEstructurasVacias();
 
  const indicators = apiData.indicators || [];
 
  const itemsValidos = indicators.filter((item) => {
    const nombre = item['Nombre Corto'];
    return nombre && String(nombre).trim() !== '';
  });
 
  const indicatorsRows = itemsValidos.map((item) => {
    const nombre = String(item['Nombre Corto']).trim();
    return [
      nombre,
      ...ANIOS.map((anio) => mostrarValor(obtenerValorAnio(item, anio)))
    ];
  });
 
  const financialRows = generarFinancialRows(apiData.proyecciones || []);
  const studentSummary = generarStudentSummary(apiData.studentSummary);
 
  return {
    financialRows,
    indicatorsRows,
    studentSummary
  };
}
 
function generarFinancialRows(proyecciones) {
  const proyeccionMap = {};
 
  proyecciones.forEach((p) => {
    const nivelAcademico = p['Nivel Académico'] || p['Nivel academico'] || '';
    const tipoInfo = p['Tipo de Información'] || p['Tipo de Informacion'] || '';
    const anio = p['Año'] || p['Anio'] || p['año'] || '';
    const key = `${nivelAcademico}_${tipoInfo}_${anio}`;
    proyeccionMap[key] = p.Valor;
  });
 
  return ANIOS.map((anio, index) => {
    const anioTexto = index === 0 ? 'LB 2025' : String(anio);
 
    const ingresosPregrado = Number(proyeccionMap[`Pregrado_Ingresos Matrícula_${anio}`] || 0);
    const ingresosPosgrado = Number(proyeccionMap[`Posgrado_Ingresos Matrícula_${anio}`] || 0);
    const ingresos = ingresosPregrado + ingresosPosgrado;
 
    const costosPregrado = Number(proyeccionMap[`Pregrado_Costos y Gastos_${anio}`] || 0);
    const costosPosgrado = Number(proyeccionMap[`Posgrado_Costos y Gastos_${anio}`] || 0);
    const costos = costosPregrado + costosPosgrado;
 
    const pctCostos = ingresos > 0 ? (costos / ingresos) * 100 : 0;
    const ebitda = ingresos - costos;
    const pctEbitda = ingresos > 0 ? (ebitda / ingresos) * 100 : 0;
 
    return {
      año: anioTexto,
      ingresos: mostrarValor(ingresos || null),
      costos: mostrarValor(costos || null),
      pctCostos: mostrarValor(pctCostos ? pctCostos.toFixed(1) + '%' : null),
      ebitda: mostrarValor(ebitda || null),
      pctEbitda: mostrarValor(pctEbitda ? pctEbitda.toFixed(1) + '%' : null)
    };
  });
}
 
function generarStudentSummary(studentData) {
  if (!studentData) return generarStudentSummaryVacio();

  // psycopg2 colapsa camelCase a minúsculas → cubrimos las 3 variantes
  const normalizado = {
    pregradoDistancia:      studentData.pregradoDistancia      ?? studentData.pregrado_distancia      ?? studentData.pregradodistancia,
    pregradoPresencial:     studentData.pregradoPresencial      ?? studentData.pregrado_presencial      ?? studentData.pregradopresencial,
    pregradoTotal:          studentData.pregradoTotal           ?? studentData.pregrado_total           ?? studentData.pregradototal,
    posgradoDistancia:      studentData.posgradoDistancia       ?? studentData.posgrado_distancia       ?? studentData.posgradodistancia,
    posgradoPresencial:     studentData.posgradoPresencial      ?? studentData.posgrado_presencial      ?? studentData.posgradopresencial,
    posgradoTotal:          studentData.posgradoTotal           ?? studentData.posgrado_total           ?? studentData.posgradototal,
    totalGeneralDistancia:  studentData.totalGeneralDistancia   ?? studentData.total_general_distancia  ?? studentData.totalgeneraldistancia,
    totalGeneralPresencial: studentData.totalGeneralPresencial  ?? studentData.total_general_presencial ?? studentData.totalgeneralpresencial,
    totalGeneral:           studentData.totalGeneral            ?? studentData.total_general            ?? studentData.totalgeneral,
    hombres:                studentData.hombres,
    mujeres:                studentData.mujeres,
  };

  const resultado = {};
  Object.keys(normalizado).forEach((campo) => {
    resultado[campo] = formatearMiles(normalizado[campo]);
  });
  return resultado;
}

function formatearMiles(valor) {
  if (valor === null || valor === undefined || String(valor).trim() === '') return '-';
  const num = parseFloat(String(valor).replace(/\./g, '').replace(',', '.'));
  if (isNaN(num)) return '-';
  return Math.trunc(num).toLocaleString('es-CO');
}
 
function generarEstructurasVacias() {
  return {
    financialRows: ANIOS.map((anio, i) => ({
      año: i === 0 ? 'LB 2025' : String(anio),
      ingresos: '-', costos: '-', pctCostos: '-', ebitda: '-', pctEbitda: '-'
    })),
    indicatorsRows: [],
    studentSummary: generarStudentSummaryVacio()
  };
}
 
function generarStudentSummaryVacio() {
  return {
    pregradoDistancia: '-', pregradoPresencial: '-', pregradoTotal: '-',
    posgradoDistancia: '-', posgradoPresencial: '-', posgradoTotal: '-',
    totalGeneralDistancia: '-', totalGeneralPresencial: '-', totalGeneral: '-',
    hombres: '-', mujeres: '-'
  };
}