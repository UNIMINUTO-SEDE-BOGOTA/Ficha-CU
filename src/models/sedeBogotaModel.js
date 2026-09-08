const ANIOS_INDICADORES = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const CAMPOS_ESTUDIANTES = [
  'pregradoDistancia',
  'pregradoPresencial',
  'pregradoTotal',
  'posgradoDistancia',
  'posgradoPresencial',
  'posgradoTotal',
  'totalGeneralDistancia',
  'totalGeneralPresencial',
  'totalGeneral',
  'hombres',
  'mujeres',
];

const VARIANTES_ESTUDIANTES = {
  pregradoDistancia: ['pregradoDistancia', 'pregrado_distancia', 'pregradodistancia'],
  pregradoPresencial: ['pregradoPresencial', 'pregrado_presencial', 'pregradopresencial'],
  pregradoTotal: ['pregradoTotal', 'pregrado_total', 'pregradototal'],
  posgradoDistancia: ['posgradoDistancia', 'posgrado_distancia', 'posgradodistancia'],
  posgradoPresencial: ['posgradoPresencial', 'posgrado_presencial', 'posgradopresencial'],
  posgradoTotal: ['posgradoTotal', 'posgrado_total', 'posgradototal'],
  totalGeneralDistancia: ['totalGeneralDistancia', 'total_general_distancia', 'totalgeneraldistancia'],
  totalGeneralPresencial: ['totalGeneralPresencial', 'total_general_presencial', 'totalgeneralpresencial'],
  totalGeneral: ['totalGeneral', 'total_general', 'totalgeneral'],
  hombres: ['hombres'],
  mujeres: ['mujeres'],
};

function aNumero(valor) {
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : 0;
  if (valor === null || valor === undefined) return 0;

  let texto = String(valor).trim().replace(/\s/g, '').replace(/%$/, '');
  if (!texto || texto === '-') return 0;

  if (texto.includes(',') && texto.includes('.')) {
    texto = texto.lastIndexOf(',') > texto.lastIndexOf('.')
      ? texto.replace(/\./g, '').replace(',', '.')
      : texto.replace(/,/g, '');
  } else if (texto.includes(',')) {
    texto = texto.replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(texto)) {
    texto = texto.replace(/\./g, '');
  }

  const numero = Number(texto);
  return Number.isFinite(numero) ? numero : 0;
}

function redondear(numero) {
  return Math.round((numero + Number.EPSILON) * 100) / 100;
}

function obtenerCampo(objeto, variantes) {
  for (const variante of variantes) {
    if (objeto?.[variante] !== undefined && objeto[variante] !== null) {
      return objeto[variante];
    }
  }
  return 0;
}

function consolidarEstudiantes(respuestas) {
  return CAMPOS_ESTUDIANTES.reduce((resultado, campo) => {
    resultado[campo] = redondear(
      respuestas.reduce(
        (total, respuesta) => total + aNumero(
          obtenerCampo(respuesta?.studentSummary, VARIANTES_ESTUDIANTES[campo])
        ),
        0,
      ),
    );
    return resultado;
  }, {});
}

function obtenerValorAnio(indicador, anio) {
  const clave = Object.keys(indicador).find((campo) => String(campo).trim() === anio);
  return clave ? indicador[clave] : 0;
}

function consolidarIndicadores(respuestas) {
  const agrupados = new Map();

  respuestas.forEach((respuesta) => {
    (respuesta?.indicators || []).forEach((indicador) => {
      const nombre = String(indicador?.['Nombre Corto'] || '').trim();
      if (!nombre) return;

      if (!agrupados.has(nombre)) {
        agrupados.set(nombre, {
          ...indicador,
          'Nombre Corto': nombre,
          __porcentaje: {},
        });
        ANIOS_INDICADORES.forEach((anio) => {
          agrupados.get(nombre)[anio] = 0;
        });
      }

      const acumulado = agrupados.get(nombre);
      ANIOS_INDICADORES.forEach((anio) => {
        const valorOriginal = obtenerValorAnio(indicador, anio);
        acumulado[anio] = redondear(aNumero(acumulado[anio]) + aNumero(valorOriginal));
        acumulado.__porcentaje[anio] = acumulado.__porcentaje[anio]
          || String(valorOriginal ?? '').includes('%');
      });
    });
  });

  return Array.from(agrupados.values()).map((indicador) => {
    ANIOS_INDICADORES.forEach((anio) => {
      if (indicador.__porcentaje[anio]) indicador[anio] = `${indicador[anio]}%`;
    });
    delete indicador.__porcentaje;
    return indicador;
  });
}

function consolidarDesercion(respuestas) {
  const agrupados = new Map();

  respuestas.forEach((respuesta) => {
    (respuesta?.desercion || []).forEach((fila) => {
      const anio = String(fila?.año ?? fila?.anio ?? '').trim();
      const modalidad = String(fila?.modalidad ?? '').trim();
      const clave = `${anio}::${modalidad.toLowerCase()}`;

      if (!agrupados.has(clave)) {
        agrupados.set(clave, { ...fila, año: anio, modalidad, desercion_porcentaje: 0 });
      }

      const acumulado = agrupados.get(clave);
      acumulado.desercion_porcentaje = redondear(
        aNumero(acumulado.desercion_porcentaje) + aNumero(fila?.desercion_porcentaje),
      );
    });
  });

  return Array.from(agrupados.values());
}

function concatenar(respuestas, campo) {
  return respuestas.flatMap((respuesta) => (
    Array.isArray(respuesta?.[campo]) ? respuesta[campo] : []
  ));
}

export function consolidarSedeBogota(respuestas) {
  const respuestasValidas = respuestas.filter(Boolean);
  const base = respuestasValidas[0] || {};

  return {
    ...base,
    indicators: consolidarIndicadores(respuestasValidas),
    studentSummary: consolidarEstudiantes(respuestasValidas),
    proyecciones: concatenar(respuestasValidas, 'proyecciones'),
    matriculados2026: concatenar(respuestasValidas, 'matriculados2026'),
    oferta: concatenar(respuestasValidas, 'oferta'),
    desercion: consolidarDesercion(respuestasValidas),
  };
}
