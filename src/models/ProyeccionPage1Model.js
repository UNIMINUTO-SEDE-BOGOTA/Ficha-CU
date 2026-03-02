// models/proyeccionPage1Model.js
 
const ANIOS = [2025, 2026, 2027, 2028, 2029, 2030];
 
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
  console.log('🔄 Transformando datos:', apiData);
 
  if (!apiData) return generarEstructurasVacias();
 
  const indicators = apiData.indicators || [];
  console.log('📈 indicators recibidos:', indicators.length);
 
  // Filtrar items con Nombre Corto válido
  const itemsValidos = indicators.filter((item) => {
    const nombre = item['Nombre Corto'];
    return nombre && String(nombre).trim() !== '';
  });
 
  console.log(`🔍 Items con Nombre Corto: ${itemsValidos.length} de ${indicators.length}`);
 
  // ==========================================
  // TODOS los indicadores de la BD, sin lista fija, sin exclusiones
  // ==========================================
  const indicatorsRows = itemsValidos.map((item) => {
    const nombre = String(item['Nombre Corto']).trim();
    return [
      nombre,
      ...ANIOS.map((anio) => mostrarValor(obtenerValorAnio(item, anio)))
    ];
  });
 
  // Filas financieras
  const financialRows = generarFinancialRows(apiData.proyecciones || []);
 
  // Resumen de estudiantes
  const studentSummary = generarStudentSummary(apiData.studentSummary);
 
  console.log('✅ Datos transformados:', {
    indicators: indicators.length,
    itemsValidos: itemsValidos.length,
    indicatorsRows: indicatorsRows.length,
    financialRows: financialRows.length,
    studentSummary
  });
 
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
 
  const campos = [
    'pregradoDistancia', 'pregradoPresencial', 'pregradoTotal',
    'posgradoDistancia', 'posgradoPresencial', 'posgradoTotal',
    'totalGeneralDistancia', 'totalGeneralPresencial', 'totalGeneral',
    'hombres', 'mujeres'
  ];
 
  const resultado = {};
  campos.forEach((campo) => {
    resultado[campo] = mostrarValor(studentData[campo]);
  });
  return resultado;
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