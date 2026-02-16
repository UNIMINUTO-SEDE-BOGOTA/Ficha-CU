// src/data/universityMockData.ts

export const financialProjections = [
  { año: "LB 2024", ingresos: "136,53", costos: "119,65", porcentajeCostos: "87,64", ebitda: "21,31", porcentajeEbitda: "15,61" },
  { año: "2025", ingresos: "138,45", costos: "115,82", porcentajeCostos: "83,65", ebitda: "23,50", porcentajeEbitda: "16,97" },
  { año: "2026", ingresos: "142,45", costos: "118,79", porcentajeCostos: "83,39", ebitda: "24,94", porcentajeEbitda: "17,51" },
  { año: "2027", ingresos: "150,64", costos: "127,29", porcentajeCostos: "84,50", ebitda: "29,62", porcentajeEbitda: "19,66" },
  { año: "2028", ingresos: "164,70", costos: "135,88", porcentajeCostos: "82,50", ebitda: "36,56", porcentajeEbitda: "22,20" },
  { año: "2029", ingresos: "179,45", costos: "145,71", porcentajeCostos: "81,20", ebitda: "42,79", porcentajeEbitda: "23,85" },
  { año: "2030", ingresos: "195,55", costos: "156,44", porcentajeCostos: "80,00", ebitda: "48,84", porcentajeEbitda: "24,98" },
];

export const indicatorProjections = [
  { nombre: "Descripción Distancia", "2025": "10%", "2026": "12,1%", "2027": "10%", "2028": "10%", "2029": "10%", "2030": "11%" },
  { nombre: "Descripción Presencial", "2025": "8%", "2026": "10,04%", "2027": "8%", "2028": "8%", "2029": "8%", "2030": "8%" },
  { nombre: "Diversificación de Ingresos", "2025": "5%", "2026": "6%", "2027": "6%", "2028": "6%", "2029": "6%", "2030": "5%" },
  { nombre: "EBITDA", "2025": "17%", "2026": "16,97%", "2027": "15,5%", "2028": "19,79%", "2029": "22,2%", "2030": "23,8%" },
  { nombre: "Educación Continua", "2025": 4615, "2026": 5896, "2027": 7404, "2028": 9021, "2029": 10706, "2030": 12430 },
  { nombre: "Estudiantes Centro Universitario", "2025": 18244, "2026": 20193, "2027": 19592, "2028": 20524, "2029": 20847, "2030": 21372 },
  { nombre: "Matrícula Nuevos", "2025": 7700, "2026": 8195, "2027": 8560, "2028": 8730, "2029": 8770, "2030": 8775 },
  { nombre: "Saber PRO Presencial", "2025": 135, "2026": 136, "2027": 137, "2028": 137, "2029": 137, "2030": 138 },
  { nombre: "Tasa de Conversión", "2025": "58%", "2026": "60%", "2027": "62%", "2028": "64%", "2029": "66%", "2030": "68%" },
  { nombre: "Tipología Centro Universitario", "2025": "A", "2026": "A", "2027": "A", "2028": "A", "2029": "A", "2030": "A" },
];

export const studentCount = {
  distancia: { pregrado: 4643, posgrado: 617, total: 5260 },
  presencial: { pregrado: 12669, posgrado: 412, total: 13081 },
  total: { pregrado: 17312, posgrado: 1029, total: 18341 },
};

export const contextData = {
  poblacion: 2314490,
  hombres: 48.29,
  mujeres: 51.71,
  vocacion: "Sectores servicios, comercio e industria. Corredor vial de transporte intercomunal. Tradición de organización social y comunitario.",
  sociosProductivos: "Comercio al por menor, Servicios, Transporte y Logística.", // Este dato no está en la imagen, lo dejamos del anterior
  colegios: { privados: 307, publicos: 93 },
  competencia: { publicos: 4, privados: 16 },
};