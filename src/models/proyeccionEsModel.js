const fmt = (val) => (val !== undefined && val !== null ? val.toLocaleString() : "-");

const calcularMetricasMatricula = (proyectado, historico) => {
  if (proyectado === null && historico === null) {
    return { proyectado: "-", matriculado: "-", variacion: "-", porcentaje: "-", esPositivo: false, esExito: false };
  }
  const p = proyectado || 0;
  const h = historico || 0;
  const variacion = h - p;
  const porcentaje = p > 0 ? (h / p) * 100 : 0;

  return {
    proyectado: fmt(p),
    matriculado: fmt(h),
    variacion: variacion >= 0 ? `+${variacion}` : `${variacion}`,
    porcentaje: p > 0 ? porcentaje.toFixed(2) + " %" : "0 %",
    esPositivo: variacion >= 0,
    esExito: porcentaje >= 100
  };
};

export const transformarPage2 = (bases) => {
  if (!bases || !bases.proyecciones) return null;

  const { proyecciones, oferta, desercion } = bases;
  const anios = ["2026", "2027", "2028", "2029", "2030"];

  // Filtrar por años 2026+ y periodo S1/Q1
  const fEst = proyecciones.filter(d => parseInt(d.anio) >= 2026 && (d.periodo === "S1" || d.periodo === "Q1"));
  const fOf = oferta?.filter(d => parseInt(d.anio) >= 2026 && (d.periodo === "S1" || d.periodo === "Q1")) || [];
  const fDes = desercion?.filter(d => parseInt(d.anio) >= 2026 && (d.periodo === "S1" || d.periodo === "Q1")) || [];

  const getEst = (filtros) => fEst.find(d => Object.keys(filtros).every(k => d[k] === filtros[k]))?.valor || null;
  const getOf = (filtros) => fOf.find(d => Object.keys(filtros).every(k => d[k] === filtros[k]))?.valor || 0;
  const getDes = (filtros) => fDes.find(d => Object.keys(filtros).every(k => d[k] === filtros[k]))?.valor || 0;

  const procEst = (nivel, key, val) => anios.map(anio => ({
    nuevos: fmt(getEst({ nivel_academico: nivel, [key]: val, anio, tipo_estudiante: "Nuevos" })),
    continuos: fmt(getEst({ nivel_academico: nivel, [key]: val, anio, tipo_estudiante: "Continuos" })),
    totales: fmt(getEst({ nivel_academico: nivel, [key]: val, anio, tipo_estudiante: "Totales" }))
  }));

  // Totales por nivel
  const totalPregrado = anios.map(anio => {
    const nuevos = getEst({ nivel_academico: "Pregrado", anio, tipo_estudiante: "Nuevos" }) || 0;
    const continuos = getEst({ nivel_academico: "Pregrado", anio, tipo_estudiante: "Continuos" }) || 0;
    return {
      nuevos: fmt(nuevos),
      continuos: fmt(continuos),
      totales: fmt(nuevos + continuos)
    };
  });

  const totalPosgrado = anios.map(anio => {
    const nuevos = getEst({ nivel_academico: "Posgrado", anio, tipo_estudiante: "Nuevos" }) || 0;
    const continuos = getEst({ nivel_academico: "Posgrado", anio, tipo_estudiante: "Continuos" }) || 0;
    return {
      nuevos: fmt(nuevos),
      continuos: fmt(continuos),
      totales: fmt(nuevos + continuos)
    };
  });

  const totalGeneral = anios.map(anio => {
    const nuevos = (getEst({ nivel_academico: "Pregrado", anio, tipo_estudiante: "Nuevos" }) || 0) +
                   (getEst({ nivel_academico: "Posgrado", anio, tipo_estudiante: "Nuevos" }) || 0);
    const continuos = (getEst({ nivel_academico: "Pregrado", anio, tipo_estudiante: "Continuos" }) || 0) +
                      (getEst({ nivel_academico: "Posgrado", anio, tipo_estudiante: "Continuos" }) || 0);
    return {
      nuevos: fmt(nuevos),
      continuos: fmt(continuos),
      totales: fmt(nuevos + continuos)
    };
  });

  // Tabla 3: Matrículas 2026 (ejemplo con datos fijos mientras no hay API)
  const matriculas2026 = {
    pregradoPresencial: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    pregradoDistancia: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    pregradoTotal: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    posgradoPresencial: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Presencial", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    posgradoDistancia: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", modalidad: "Distancia", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    posgradoTotal: {
      nuevos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" })
      ),
      continuos: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" })
      ),
      totales: calcularMetricasMatricula(
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }),
        getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" })
      )
    },
    totalGeneral: {
      nuevos: calcularMetricasMatricula(
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Proyectado" }) || 0),
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Nuevos", tipo_informacion: "Historico" }) || 0)
      ),
      continuos: calcularMetricasMatricula(
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Proyectado" }) || 0),
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Continuos", tipo_informacion: "Historico" }) || 0)
      ),
      totales: calcularMetricasMatricula(
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Proyectado" }) || 0),
        (getEst({ nivel_academico: "Pregrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" }) || 0) +
        (getEst({ nivel_academico: "Posgrado", anio: "2026", tipo_estudiante: "Totales", tipo_informacion: "Historico" }) || 0)
      )
    }
  };

  // Datos para gráficas
  const graficaOferta = {
    pregrado: anios.map(a => getOf({ nivel_academico: "Pregrado", anio: a })),
    pregradoSemestral: anios.map(a => getOf({ nivel_academico: "Pregrado", periodicidad: "Semestral", anio: a })),
    pregradoCuatrimestral: anios.map(a => getOf({ nivel_academico: "Pregrado", periodicidad: "Cuatrimestral", anio: a })),
    posgrado: anios.map(a => getOf({ nivel_academico: "Posgrado", anio: a })),
    posgradoSemestral: anios.map(a => getOf({ nivel_academico: "Posgrado", periodicidad: "Semestral", anio: a })),
    posgradoCuatrimestral: anios.map(a => getOf({ nivel_academico: "Posgrado", periodicidad: "Cuatrimestral", anio: a })),
    total: anios.map(a => getOf({ anio: a })),
    presencial: anios.map(a => getOf({ modalidad: "Presencial", anio: a })),
    distancia: anios.map(a => getOf({ modalidad: "Distancia", anio: a })),
    totalModalidad: anios.map(a => getOf({ anio: a }))
  };

  const graficaDesercion = {
    presencial: anios.map(a => getDes({ modalidad: "Presencial", anio: a })),
    distancia: anios.map(a => getDes({ modalidad: "Distancia", anio: a }))
  };

  return {
    t1_pregPresencial: procEst("Pregrado", "modalidad", "Presencial"),
    t1_pregDistancia: procEst("Pregrado", "modalidad", "Distancia"),
    t1_pregTotal: totalPregrado,
    t1_posPresencial: procEst("Posgrado", "modalidad", "Presencial"),
    t1_posDistancia: procEst("Posgrado", "modalidad", "Distancia"),
    t1_posTotal: totalPosgrado,
    t1_grandTotal: totalGeneral,

    t2_modPresencial: anios.map(anio => ({
      nuevos: fmt(getEst({ modalidad: "Presencial", anio, tipo_estudiante: "Nuevos" })),
      continuos: fmt(getEst({ modalidad: "Presencial", anio, tipo_estudiante: "Continuos" })),
      totales: fmt(getEst({ modalidad: "Presencial", anio, tipo_estudiante: "Totales" }))
    })),
    t2_modDistancia: anios.map(anio => ({
      nuevos: fmt(getEst({ modalidad: "Distancia", anio, tipo_estudiante: "Nuevos" })),
      continuos: fmt(getEst({ modalidad: "Distancia", anio, tipo_estudiante: "Continuos" })),
      totales: fmt(getEst({ modalidad: "Distancia", anio, tipo_estudiante: "Totales" }))
    })),
    t2_modTotal: totalGeneral,

    t3_matriculas2026: matriculas2026,

    t4_pregSemestral: procEst("Pregrado", "periodicidad", "Semestral"),
    t4_pregCuatrimestral: procEst("Pregrado", "periodicidad", "Cuatrimestral"),
    t4_pregTotal: totalPregrado,
    t4_posSemestral: procEst("Posgrado", "periodicidad", "Semestral"),
    t4_posCuatrimestral: procEst("Posgrado", "periodicidad", "Cuatrimestral"),
    t4_posTotal: totalPosgrado,
    t4_grandTotal: totalGeneral,

    graficaOferta,
    graficaDesercion,
    graficaLineas: {
      profesional: anios.map(() => 0),
      maestria: anios.map(() => 0),
      especializacion: anios.map(() => 0),
      doctorado: anios.map(() => 0)
    }
  };
};