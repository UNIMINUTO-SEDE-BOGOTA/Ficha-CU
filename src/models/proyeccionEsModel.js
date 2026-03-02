/**
 * proyeccionEsModel.js
 *
 * TABLA 3 — fuentes de datos:
 *   Proyectado     ← Proyecciones_cu (tipo_informacion='Meta', año=2026, Q1/S1)
 *   Nuevos Matric. ← Poblacion Estudiantil SUM([Estudiantes Nuevos])
 *   Continuos/Tot. ← Sin dato real → matriculado = 0, variación = -proyectado
 *   Variación / %  ← Calculado sin decimales, color verde/rojo según esPositivo/esExito
 */

// ─────────────────────────────────────────────────────────────────────────────
// Utilidades
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (val) => {
  if (val === undefined || val === null || val === "") return "-";
  const num = parseFloat(String(val).replace(",", "."));
  if (isNaN(num)) return "-";
  return Math.trunc(num).toLocaleString("es-CO");
};

const toNum = (fmtVal) =>
  parseInt(String(fmtVal).replace(/\./g, "").replace(/,/g, ""), 10) || 0;

const sumarFmt = (a, b) => fmt(toNum(a) + toNum(b));

/**
 * Calcula métricas comparando proyectado (Meta) vs matriculado real.
 * Si matriculado es null → se trata como 0 (sin dato real aún).
 * Variación y % sin decimales.
 * esPositivo controla color verde/rojo en variación Y porcentaje.
 */
const calcularMetricasMatricula = (proyectado, matriculado) => {
  const p = Number(proyectado)  || 0;
  const m = Number(matriculado) || 0;  // null → 0

  const variacion  = m - p;
  const porcentaje = p > 0 ? (m / p) * 100 : 0;

  // Sin decimales, sin coma en número entero
  const varAbs = Math.round(Math.abs(variacion));
  const varStr = variacion >= 0
    ? `+${varAbs.toLocaleString("es-CO")}`
    : `-${varAbs.toLocaleString("es-CO")}`;

  const pctStr = p > 0 ? `${Math.round(porcentaje)} %` : "0 %";

  return {
    proyectado:  fmt(p),
    matriculado: fmt(m),
    variacion:   varStr,
    porcentaje:  pctStr,
    esPositivo:  variacion >= 0,    // verde si real ≥ meta
    esExito:     porcentaje >= 100, // verde en % si cumplió meta
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────
const YEARS = ["2026", "2027", "2028", "2029", "2030"];
const TIPO_PROYECCION = "Meta";

// ─────────────────────────────────────────────────────────────────────────────
// getValor: SUMA todos los valores de las filas que cumplan los filtros
// ─────────────────────────────────────────────────────────────────────────────
const getValor = (filtros, fuente) => {
  const coinciden = fuente.filter((d) =>
    Object.keys(filtros).every((k) => {
      const vFila   = String(d[k]       ?? "").trim().toLowerCase();
      const vFiltro = String(filtros[k] ?? "").trim().toLowerCase();
      return vFila === vFiltro;
    })
  );
  if (coinciden.length === 0) return null;
  return coinciden.reduce((acc, d) => {
    const v = parseFloat(String(d.valor ?? "0").replace(",", "."));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
};

// ─────────────────────────────────────────────────────────────────────────────
// procEst: genera el array de 5 años (tipo_informacion siempre = 'Meta')
// ─────────────────────────────────────────────────────────────────────────────
const procEst = (filtrosBase, fuente) =>
  YEARS.map((año) => {
    const base = {
      ...filtrosBase,
      año:              String(año),
      tipo_informacion: TIPO_PROYECCION,
    };
    return {
      nuevos:    fmt(getValor({ ...base, tipo_estudiante: "Nuevos"    }, fuente)),
      continuos: fmt(getValor({ ...base, tipo_estudiante: "Continuos" }, fuente)),
      totales:   fmt(getValor({ ...base, tipo_estudiante: "Totales"   }, fuente)),
    };
  });

// ─────────────────────────────────────────────────────────────────────────────
// Transformador principal
// ─────────────────────────────────────────────────────────────────────────────
export const transformarPage2 = (bases) => {
  if (!bases) return null;

  const {
    proyecciones     = [],
    matriculados2026 = [],
    desercion        = [],
    oferta           = [],
  } = bases;

  // ── TABLA 1 ───────────────────────────────────────────────────────────────
  const t1_pregPresencial = procEst({ nivel_academico: "Pregrado", modalidad: "Presencial" }, proyecciones);
  const t1_pregDistancia  = procEst({ nivel_academico: "Pregrado", modalidad: "Distancia"  }, proyecciones);
  const t1_pregTotal      = procEst({ nivel_academico: "Pregrado"                           }, proyecciones);
  const t1_posPresencial  = procEst({ nivel_academico: "Posgrado", modalidad: "Presencial" }, proyecciones);
  const t1_posDistancia   = procEst({ nivel_academico: "Posgrado", modalidad: "Distancia"  }, proyecciones);
  const t1_posTotal       = procEst({ nivel_academico: "Posgrado"                           }, proyecciones);

  const t1_grandTotal = YEARS.map((_, i) => ({
    nuevos:    sumarFmt(t1_pregTotal[i].nuevos,    t1_posTotal[i].nuevos),
    continuos: sumarFmt(t1_pregTotal[i].continuos, t1_posTotal[i].continuos),
    totales:   sumarFmt(t1_pregTotal[i].totales,   t1_posTotal[i].totales),
  }));

  // ── TABLA 2 ───────────────────────────────────────────────────────────────
  const t2_modPresencial = procEst({ modalidad: "Presencial" }, proyecciones);
  const t2_modDistancia  = procEst({ modalidad: "Distancia"  }, proyecciones);
  const t2_modTotal      = procEst({                          }, proyecciones);

  // ── TABLA 3: Comparativa 2026 ─────────────────────────────────────────────
  const data2026proy = proyecciones.filter((d) => String(d.año) === "2026");

  const getProy2026 = (tipoEst, nivel = null, modalidad = null) => {
    const filtros = { tipo_informacion: "Meta", tipo_estudiante: tipoEst };
    if (nivel)    filtros.nivel_academico = nivel;
    if (modalidad) filtros.modalidad      = modalidad;
    return getValor(filtros, data2026proy);
  };

  // Solo existe nuevos_matriculados desde Poblacion Estudiantil
// 1. calcularMetricasMatricula — esPositivo para variacion, esExito para %
// 1.5 getMatric2026
// ── getMatric2026 ──────────────────────────────────────────────────────────
const getMatric2026 = (campo, nivel = null, modalidad = null) => {
  const filtrados = matriculados2026.filter((d) => {
    if (nivel     && String(d.nivel_academico ?? "").trim().toLowerCase() !== nivel.toLowerCase())     return false;
    if (modalidad && String(d.modalidad       ?? "").trim().toLowerCase() !== modalidad.toLowerCase()) return false;
    return true;
  });

  console.log("OBJETO COMPLETO:", JSON.stringify(matriculados2026[0], null, 2));
  
  if (filtrados.length === 0) return null;
  return filtrados.reduce((acc, d) => {
    const v = parseFloat(String(d[campo] ?? "0").replace(",", "."));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
};

// ── getComp2026 ────────────────────────────────────────────────────────────
const getComp2026 = (nivel = null, modalidad = null) => ({
  nuevos: calcularMetricasMatricula(
    getProy2026("Nuevos", nivel, modalidad),
    getMatric2026("nuevos_matriculados", nivel, modalidad)
  ),
  continuos: calcularMetricasMatricula(
    getProy2026("Continuos", nivel, modalidad),
    getMatric2026("continuos_matriculados", nivel, modalidad)
  ),
  totales: calcularMetricasMatricula(
    getProy2026("Totales", nivel, modalidad),
    getMatric2026("totales_matriculados", nivel, modalidad)
  ),
});

  const t3_matriculas2026 = {
    pregradoPresencial: getComp2026("Pregrado", "Presencial"),
    pregradoDistancia:  getComp2026("Pregrado", "Distancia"),
    pregradoTotal:      getComp2026("Pregrado"),
    posgradoPresencial: getComp2026("Posgrado", "Presencial"),
    posgradoDistancia:  getComp2026("Posgrado", "Distancia"),
    posgradoTotal:      getComp2026("Posgrado"),
    totalGeneral:       getComp2026(),
  };

  // ── TABLA 4 ───────────────────────────────────────────────────────────────
  const t4_pregSemestral     = procEst({ nivel_academico: "Pregrado", periodicidad: "Semestral"     }, proyecciones);
  const t4_pregCuatrimestral = procEst({ nivel_academico: "Pregrado", periodicidad: "Cuatrimestral" }, proyecciones);
  const t4_pregTotal         = procEst({ nivel_academico: "Pregrado"                                 }, proyecciones);
  const t4_posSemestral      = procEst({ nivel_academico: "Posgrado", periodicidad: "Semestral"     }, proyecciones);
  const t4_posCuatrimestral  = procEst({ nivel_academico: "Posgrado", periodicidad: "Cuatrimestral" }, proyecciones);
  const t4_posTotal          = procEst({ nivel_academico: "Posgrado"                                 }, proyecciones);

  const t4_grandTotal = YEARS.map((_, i) => ({
    nuevos:    sumarFmt(t4_pregTotal[i].nuevos,    t4_posTotal[i].nuevos),
    continuos: sumarFmt(t4_pregTotal[i].continuos, t4_posTotal[i].continuos),
    totales:   sumarFmt(t4_pregTotal[i].totales,   t4_posTotal[i].totales),
  }));

  // ── GRÁFICA 1: Oferta Académica ───────────────────────────────────────────
  const ofertaPorAnio = (filtros) =>
    YEARS.map((año) => {
      const total = oferta
        .filter((d) => {
          if (String(d.año).trim() !== String(año)) return false;
          return Object.keys(filtros).every(
            (k) =>
              String(d[k] ?? "").trim().toLowerCase() ===
              String(filtros[k] ?? "").trim().toLowerCase()
          );
        })
        .reduce((acc, cur) => acc + (Number(cur.snies_unico) || 0), 0);
      return fmt(total);
    });

  const graficaOferta = {
    pregrado:              ofertaPorAnio({ nivel_academico: "Pregrado" }),
    pregradoSemestral:     ofertaPorAnio({ nivel_academico: "Pregrado", periodicidad: "Semestral"     }),
    pregradoCuatrimestral: ofertaPorAnio({ nivel_academico: "Pregrado", periodicidad: "Cuatrimestral" }),
    posgrado:              ofertaPorAnio({ nivel_academico: "Posgrado" }),
    posgradoSemestral:     ofertaPorAnio({ nivel_academico: "Posgrado", periodicidad: "Semestral"     }),
    posgradoCuatrimestral: ofertaPorAnio({ nivel_academico: "Posgrado", periodicidad: "Cuatrimestral" }),
    total:                 ofertaPorAnio({}),
    presencial:            ofertaPorAnio({ modalidad: "Presencial" }),
    distancia:             ofertaPorAnio({ modalidad: "Distancia"  }),
    totalModalidad:        ofertaPorAnio({}),
  };

  // ── GRÁFICA 2: Deserción ──────────────────────────────────────────────────
  const getDesercionPorcentaje = (modalidad) =>
    YEARS.map((año) => {
      const item = desercion.find(
        (d) =>
          String(d.año) === String(año) &&
          String(d.modalidad ?? "").trim().toLowerCase() === modalidad.toLowerCase()
      );
      return item ? Number(item.porcentaje).toFixed(1) : "0.0";
    });

  const graficaDesercion = {
    presencial: getDesercionPorcentaje("Presencial"),
    distancia:  getDesercionPorcentaje("Distancia"),
  };

  // ── GRÁFICA 3: Líneas por Nivel de Formación ─────────────────────────────
  const getValoresLinea = (nivelFormacion) =>
    YEARS.map((año) => {
      const val = getValor(
        {
          año:              String(año),
          tipo_informacion: TIPO_PROYECCION,
          tipo_estudiante:  "Totales",
          nivel_formacion:  nivelFormacion,
        },
        proyecciones
      );
      return val != null ? Number(val) : 0;
    });

  const graficaLineas = {
    profesional:     getValoresLinea("Profesional"),
    maestria:        getValoresLinea("Maestría"),
    especializacion: getValoresLinea("Especialización"),
    doctorado:       getValoresLinea("Doctorado"),
  };

  return {
    t1_pregPresencial, t1_pregDistancia,  t1_pregTotal,
    t1_posPresencial,  t1_posDistancia,   t1_posTotal,
    t1_grandTotal,

    t2_modPresencial, t2_modDistancia, t2_modTotal,

    t3_matriculas2026,

    t4_pregSemestral, t4_pregCuatrimestral, t4_pregTotal,
    t4_posSemestral,  t4_posCuatrimestral,  t4_posTotal,
    t4_grandTotal,

    graficaOferta,
    graficaDesercion,
    graficaLineas,
  };
};