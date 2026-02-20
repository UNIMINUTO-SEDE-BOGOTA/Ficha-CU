// proyeccionPage1Model.js
const fmt = (val) => (val !== undefined && val !== null ? val.toLocaleString() : "-");

// Función para generar valores por año con formato
const generarValoresAnio = (data, nombreFila, años) => {
  // data sería un objeto con los valores por año para esa fila
  // Por ahora, mientras no hay API, devolvemos "-" para todos
  return años.map(() => "-");
};

export const transformarPage1 = (bases) => {
  // Si no hay bases, devolver estructura con guiones
  if (!bases) {
    // Definir años
    const añosFinancial = ["LB 2025", "2026", "2027", "2028", "2029", "2030"];
    const añosIndicadores = ["2025", "2025 Real", "2026", "2027", "2028", "2029", "2030"];

    // Tabla financiera
    const financialRows = añosFinancial.map(año => ({
      año,
      ingresos: "-",
      costos: "-",
      pctCostos: "-",
      ebitda: "-",
      pctEbitda: "-"
    }));

    // Indicadores (lista fija de nombres)
    const nombresIndicadores = [
      "Deserción Distancia",
      "Deserción Presencial",
      "Diversificación de Ingresos",
      "EBITDA",
      "Educación Continua",
      "Estudiantes Centro Universitario",
      "Matrícula Nuevos",
      "Saber PRO Presencial",
      "Tasa de Conversión",
      "Tipología Centro Universitario"
    ];

    const indicatorsRows = nombresIndicadores.map(nombre => {
      // Para Tipología Centro Universitario, el valor puede ser texto (ej. "A")
      // Por ahora devolvemos "-" para todos los años
      return [nombre, ...añosIndicadores.map(() => "-")];
    });

    // Resumen de estudiantes para la derecha (valores de ejemplo, pero con guiones)
    const studentSummary = {
      pregradoDistancia: "-",
      pregradoPresencial: "-",
      pregradoTotal: "-",
      posgradoDistancia: "-",
      posgradoPresencial: "-",
      posgradoTotal: "-",
      totalGeneral: "-",
      hombres: "-",
      mujeres: "-"
    };

    return {
      financialRows,
      indicatorsRows,
      studentSummary
    };
  }

  // Aquí iría la lógica real cuando haya API
  // Por ahora retornamos lo mismo que el caso sin datos
  return transformarPage1(null);
};