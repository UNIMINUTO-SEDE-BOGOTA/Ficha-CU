import React from 'react';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage2 } from '../../models/proyeccionEsModel';

// ============================================================================
// CONSTANTES GLOBALES - VERSIÓN COMPACTA CON BORDES
// ============================================================================
// NUEVO: Eliminamos SUBTITLE fijo y lo definimos más abajo dinámicamente
// const SUBTITLE = "Centro Universitario Especial Minuto de Dios - Engativá";

const C = {
  navy:        "#012657",
  white:       "#ffffff",
  skyBlue:     "#C3E0FB",
  skyBlueTx:   "#012657",
  redTotal:    "#C00000",
  green:       "#107C10",
  purple:      "#9977bd",
  border:      "#c8c8c8",
  grayBanner:  "#D9D9D9",
  black:       "#000000",
  matHeaderBg: "#C6EFCE",
  matTotalBg:  "#FFFF99",
};

// Tamaños de fuente reducidos aún más en impresión
const FONT = {
  data:   "8px",
  header: "8px",
  banner: "8px",
  graph:  "5px",
  small:  "6px",
};

// Espaciados mínimos
const PAD = "1px 2px";
const MPAD = "0px 1px";

// ============================================================================
// AÑOS (2026 - 2030)
// ============================================================================
const YEARS = ["2026", "2027", "2028", "2029", "2030"];

// NUEVO: Mapeo de IDs de centro a nombres para mostrar en el título
const CENTRO_NOMBRES: Record<string, string> = {
  'centro-engativa': 'Engativá',
  'centro-kennedy': 'Kennedy',
  'centro-santa-fe-las-cruces': 'Las Cruces Santa Fé',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen': 'San Cristóbal Norte - Usaquén',
};

// ============================================================================
// COMPONENTES DE TABLA REUTILIZABLES
// ============================================================================
const Th = ({
  children, colSpan = 1,
  bg = C.skyBlue, color = C.skyBlueTx,
  align = "center" as "center" | "left",
}) => (
  <th colSpan={colSpan} style={{
    border: "1px solid #e0e0e0",
    backgroundColor: bg,
    color,
    fontSize: FONT.header,
    fontWeight: 700,
    textAlign: align,
    padding: PAD,
    whiteSpace: "nowrap"
  }}>
    {children}
  </th>
);

const Td = ({
  children, align = "right" as "right"|"left"|"center",
  bold = false, color = "inherit", bg = "transparent",
}) => (
  <td style={{
    border: "1px solid #e0e0e0",
    fontSize: FONT.data,
    textAlign: align,
    fontWeight: bold ? 700 : 400,
    color,
    backgroundColor: bg,
    padding: PAD,
    whiteSpace: "nowrap"
  }}>
    {children}
  </td>
);

const YearCells = ({ d, color = "inherit", bg = "transparent" }: { d: { nuevos: string; continuos: string; totales: string }; color?: string; bg?: string }) => (
  <>
    <Td color={color} bg={bg}>{d.nuevos}</Td>
    <Td color={color} bg={bg}>{d.continuos}</Td>
    <Td color={color} bg={bg}>{d.totales}</Td>
  </>
);

const TableHeader = () => (
  <thead>
    <tr>
      <Th colSpan={2} align="left">Año</Th>
      {YEARS.map(y => <Th key={y} colSpan={3}>{y}</Th>)}
    </tr>
    <tr>
      <Th align="left"></Th>
      <Th align="left"></Th>
      {YEARS.map(y => (
        <React.Fragment key={y}>
          {["Nuevos","Continuos","Totales"].map(s => <Th key={s}>{s}</Th>)}
        </React.Fragment>
      ))}
    </tr>
  </thead>
);

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "Inter, sans-serif"
};

const rowSpanStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  fontSize: FONT.data,
  fontWeight: 700,
  padding: PAD,
  verticalAlign: "middle",
  whiteSpace: "nowrap"
};

const Banner = ({ text }: { text: string }) => (
  <div style={{
    backgroundColor: C.grayBanner,
    clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
    textAlign: "center",
    padding: "1px 4px",
    flexShrink: 0
  }}>
    <span style={{ fontSize: FONT.banner, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
      {text}
    </span>
  </div>
);

// ============================================================================
// ESTILOS PARA TABLA DE MATRÍCULAS (aún más compactos)
// ============================================================================
const mc = (align: "left"|"right"|"center" = "right", color = "inherit"): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: "0px 1px",
  textAlign: align,
  fontWeight: 400,
  color,
  backgroundColor: "transparent",
  overflow: "visible",
});

const mcY = (color = "inherit"): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: "0px 1px",
  textAlign: "right",
  fontWeight: 400,
  color,
  backgroundColor: C.matTotalBg,
  overflow: "visible",
});

const mcT = (align: "left"|"right"|"center" = "right", color = C.black): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: "0px 1px",
  textAlign: align,
  fontWeight: 700,
  color,
  backgroundColor: C.matTotalBg,
  overflow: "visible",
});

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
// NUEVO: Añadimos centroId a las props, con valor por defecto
interface Props { innerRef?: React.Ref<HTMLDivElement>; centroId?: string; }

export function Page2({ innerRef, centroId = 'centro-engativa' }: Props) {
  // NUEVO: Usamos centroId en el hook
  const { data, loading } = useObservatorio(centroId, {});
  const pageData = transformarPage2(data);

  // NUEVO: Construimos el subtítulo dinámicamente
  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';
  const subtitle = `Centro Universitario ${centroNombre}`;

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <style>{`
        @media print {
          .print-page {
            padding: 1mm 2mm !important;
          }
          table, td, th {
            font-size: 6px !important;
          }
          .banner-text {
            font-size: 7px !important;
          }
          .graph-container {
            height: 65px !important;
          }
          svg text {
            font-size: 4px !important;
          }
        }
      `}</style>
      <div
        ref={innerRef}
        className="bg-white print-page"
        style={{
          width: "297mm",
          minHeight: "210mm",
          padding: "1mm 4mm",
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
          pageBreakInside: "avoid",
        }}
      >
        {/* HEADER */}
        <div className="flex flex-col w-full" style={{ marginBottom: 1 }}>
          <div className="flex justify-between items-center px-2 py-0 w-full">
            <img src="/Logo UNIMINUTO.png" alt="Logo UNIMINUTO" className="h-10 w-auto object-contain" />
            <div className="flex-1 mx-2 h-6 relative flex justify-center items-center">
              <div className="absolute inset-0" style={{ backgroundColor: C.skyBlue, clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" }} />
              {/* NUEVO: Usamos subtitle dinámico */}
              <span className="relative z-10 text-black font-normal text-[10px] tracking-wide whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>
                {subtitle}
              </span>
            </div>
            <img src="/Logo_Acreditacion.png" alt="Logo Acreditación" className="h-8 w-auto object-contain" />
          </div>

          <div className="w-full flex justify-center mt-0">
            <div className="px-4 py-0" style={{
              backgroundColor: C.grayBanner,
              clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              height: "10px"
            }}>
              <h3 className="text-black font-semibold text-[7px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>
                Proyección estudiantes 2026–2030 S1/Q1 por Nivel Académico y Modalidad
              </h3>
            </div>
          </div>
        </div>

        {/* TABLA 1 — Nivel Académico */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <table style={tableStyle}>
            <TableHeader />
            <tbody>
              <tr>
                <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
                <Td align="left">Presencial</Td>
                {pageData?.t1_pregPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left">Distancia</Td>
                {pageData?.t1_pregDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left" bold>Total</Td>
                {pageData?.t1_pregTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr>
                <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
                <Td align="left">Presencial</Td>
                {pageData?.t1_posPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left">Distancia</Td>
                {pageData?.t1_posDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left" bold>Total</Td>
                {pageData?.t1_posTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
                {pageData?.t1_grandTotal?.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: 1 }} />

        {/* TABLA 2 — Modalidad */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={tableStyle}>
            <TableHeader />
            <tbody>
              <tr>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Presencial</td>
                {pageData?.t2_modPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Distancia</td>
                {pageData?.t2_modDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
                {pageData?.t2_modTotal?.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: 1 }} />

        {/* TABLA MATRÍCULAS 2026 — completa */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "visible" }}>
          <table style={{
            ...tableStyle,
            fontSize: FONT.small,
            tableLayout: "fixed",
            width: "auto",
            borderSpacing: 0
          }}>
            <colgroup>
              <col style={{ width: "45px" }} />
              <col style={{ width: "45px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} />
            </colgroup>
            <thead>
              <tr>
                <td colSpan={14} style={{
                  border: "none",
                  backgroundColor: C.grayBanner,
                  textAlign: "center",
                  fontSize: FONT.banner,
                  fontWeight: 600,
                  padding: "1px 2px 1px 2px",
                  clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)"
                }}>
                  Comportamiento matrículas 2026 S1/Q1 por Nivel Académico y Modalidad
                </td>
              </tr>
              <tr><td colSpan={14} style={{ border: "none", height: "1px", padding: 0 }} /></tr>
              <tr>
                {[
                  { label: "Pregrado", align: "left" as const },
                  { label: "", align: "left" as const },
                  { label: "Nuevos\nProyectados", align: "center" as const },
                  { label: "Nuevos\nMatriculados", align: "center" as const },
                  { label: "Variación", align: "center" as const },
                  { label: "%", align: "center" as const },
                  { label: "Continuos\nProyectados", align: "center" as const },
                  { label: "Continuos\nMatriculados", align: "center" as const },
                  { label: "Variación", align: "center" as const },
                  { label: "%", align: "center" as const },
                  { label: "Totales\nProyectados", align: "center" as const },
                  { label: "Totales\nMatriculados", align: "center" as const },
                  { label: "Variación", align: "center" as const },
                  { label: "%", align: "center" as const },
                ].map((h, i) => (
                  <th key={i} style={{
                    border: "1px solid #e0e0e0",
                    backgroundColor: C.matHeaderBg,
                    color: C.black,
                    fontSize: FONT.small,
                    fontWeight: 700,
                    padding: "1px 1px",
                    textAlign: h.align,
                    whiteSpace: "pre-line",
                    lineHeight: 1
                  }}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Pregrado Presencial */}
              <tr>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>1.Pregrado</td>
                <td style={mc("left")}>Presencial</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoPresencial.nuevos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoPresencial.nuevos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoPresencial.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoPresencial.nuevos.variacion}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoPresencial.nuevos.porcentaje}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoPresencial.continuos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoPresencial.continuos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoPresencial.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoPresencial.continuos.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoPresencial.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoPresencial.continuos.porcentaje}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.pregradoPresencial.totales.proyectado}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.pregradoPresencial.totales.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoPresencial.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoPresencial.totales.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoPresencial.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoPresencial.totales.porcentaje}</td>
              </tr>
              {/* Pregrado Distancia */}
              <tr>
                <td style={mc("left")}>Distancia</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoDistancia.nuevos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoDistancia.nuevos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoDistancia.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoDistancia.nuevos.variacion}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoDistancia.nuevos.porcentaje}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoDistancia.continuos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.pregradoDistancia.continuos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoDistancia.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoDistancia.continuos.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoDistancia.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoDistancia.continuos.porcentaje}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.pregradoDistancia.totales.proyectado}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.pregradoDistancia.totales.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoDistancia.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoDistancia.totales.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.pregradoDistancia.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoDistancia.totales.porcentaje}</td>
              </tr>
              {/* Pregrado Total */}
              <tr>
                <td style={mcT("left")}>Total</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.nuevos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.nuevos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.pregradoTotal.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoTotal.nuevos.variacion}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.nuevos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.continuos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.continuos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.pregradoTotal.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoTotal.continuos.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.pregradoTotal.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoTotal.continuos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.totales.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.pregradoTotal.totales.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.pregradoTotal.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.pregradoTotal.totales.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.pregradoTotal.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.pregradoTotal.totales.porcentaje}</td>
              </tr>

              {/* Posgrado Presencial */}
              <tr>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>2.Posgrado</td>
                <td style={mc("left")}>Presencial</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoPresencial.nuevos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoPresencial.nuevos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoPresencial.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoPresencial.nuevos.variacion}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoPresencial.nuevos.porcentaje}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoPresencial.continuos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoPresencial.continuos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoPresencial.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoPresencial.continuos.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoPresencial.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoPresencial.continuos.porcentaje}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.posgradoPresencial.totales.proyectado}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.posgradoPresencial.totales.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoPresencial.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoPresencial.totales.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoPresencial.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoPresencial.totales.porcentaje}</td>
              </tr>
              {/* Posgrado Distancia */}
              <tr>
                <td style={mc("left")}>Distancia</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoDistancia.nuevos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoDistancia.nuevos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoDistancia.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoDistancia.nuevos.variacion}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoDistancia.nuevos.porcentaje}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoDistancia.continuos.proyectado}</td>
                <td style={mc()}>{pageData?.t3_matriculas2026?.posgradoDistancia.continuos.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoDistancia.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoDistancia.continuos.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoDistancia.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoDistancia.continuos.porcentaje}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.posgradoDistancia.totales.proyectado}</td>
                <td style={mcY()}>{pageData?.t3_matriculas2026?.posgradoDistancia.totales.matriculado}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoDistancia.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoDistancia.totales.variacion}</td>
                <td style={{ ...mc("right"), color: pageData?.t3_matriculas2026?.posgradoDistancia.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoDistancia.totales.porcentaje}</td>
              </tr>
              {/* Posgrado Total */}
              <tr>
                <td style={mcT("left")}>Total</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.nuevos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.nuevos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.posgradoTotal.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoTotal.nuevos.variacion}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.nuevos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.continuos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.continuos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.posgradoTotal.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoTotal.continuos.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.posgradoTotal.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoTotal.continuos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.totales.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.posgradoTotal.totales.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.posgradoTotal.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.posgradoTotal.totales.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.posgradoTotal.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.posgradoTotal.totales.porcentaje}</td>
              </tr>

              {/* Total General */}
              <tr>
                <td colSpan={2} style={mcT("left")}>Total</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.nuevos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.nuevos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.totalGeneral.nuevos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.totalGeneral.nuevos.variacion}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.nuevos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.continuos.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.continuos.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.totalGeneral.continuos.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.totalGeneral.continuos.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.totalGeneral.continuos.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.totalGeneral.continuos.porcentaje}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.totales.proyectado}</td>
                <td style={mcT()}>{pageData?.t3_matriculas2026?.totalGeneral.totales.matriculado}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.totalGeneral.totales.esPositivo ? C.green : C.redTotal }}>{pageData?.t3_matriculas2026?.totalGeneral.totales.variacion}</td>
                <td style={{ ...mcT("right"), color: pageData?.t3_matriculas2026?.totalGeneral.totales.esExito ? C.green : 'inherit' }}>{pageData?.t3_matriculas2026?.totalGeneral.totales.porcentaje}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TITULO — Proyección 2026-2030 */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 1, marginBottom: 1 }}>
          <div style={{
            backgroundColor: C.grayBanner,
            clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
            padding: "1px 4px",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{
              fontSize: FONT.banner,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1,
              display: "block"
            }}>
              Proyección estudiantes 2026–2030 S1/Q1 por Nivel Académico y Periodicidad
            </span>
          </div>
        </div>

        <div style={{ height: 1 }} />

        {/* TABLA 4 — Periodicidad */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={tableStyle}>
            <TableHeader />
            <tbody>
              <tr>
                <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
                <Td align="left">Semestral</Td>
                {pageData?.t4_pregSemestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left">Cuatrimestral</Td>
                {pageData?.t4_pregCuatrimestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left" bold>Total</Td>
                {pageData?.t4_pregTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr>
                <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
                <Td align="left">Semestral</Td>
                {pageData?.t4_posSemestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left">Cuatrimestral</Td>
                {pageData?.t4_posCuatrimestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr>
                <Td align="left" bold>Total</Td>
                {pageData?.t4_posTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
                {pageData?.t4_grandTotal?.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: 1 }} />

        {/* GRÁFICAS — 3 paneles completos */}
        <div style={{ display: "flex", flexDirection: "row", gap: 2, width: "100%", height: 70, alignItems: "stretch" }} className="graph-container">
          {/* Panel 1: Oferta Académica */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Banner text="Proyección Oferta Académica" />
            <div style={{ flex: 1, padding: "0 1px", overflow: "visible" }}>
              <table style={{ ...tableStyle, fontSize: FONT.small }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "left" }}>Periodicidad</th>
                    {YEARS.map(y => <th key={y} style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>⊟ 1.Pregrado</td>
                    {pageData?.graficaOferta?.pregrado?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>{pageData?.graficaOferta?.pregradoSemestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                  <tr>{pageData?.graficaOferta?.pregradoCuatrimestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                  <tr>
                    <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>⊟ 2.Posgrado</td>
                    {pageData?.graficaOferta?.posgrado?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>{pageData?.graficaOferta?.posgradoSemestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                  <tr>{pageData?.graficaOferta?.posgradoCuatrimestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px" }}>Total</td>
                    {pageData?.graficaOferta?.total?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr><td colSpan={7} style={{ border: "none", padding: "1px" }}></td></tr>
                  <tr>
                    <th style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "left" }}>Modalidad</th>
                    {YEARS.map(y => <th key={y} style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{y}</th>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px" }}>Presencial</td>
                    {pageData?.graficaOferta?.presencial?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px" }}>Distancia</td>
                    {pageData?.graficaOferta?.distancia?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px" }}>Total</td>
                    {pageData?.graficaOferta?.totalModalidad?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel 2: Deserción barras */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Banner text="Proyección Deserción por Centro Universitario" />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
              {(() => {
                const pres = pageData?.graficaDesercion?.presencial?.map(v => Number(v)) ?? [0,0,0,0,0];
                const dist = pageData?.graficaDesercion?.distancia?.map(v => Number(v)) ?? [0,0,0,0,0];
                const yellow = "#F5D97A", blue = "#4A86C8";
                const colW = 18, gap = 3, pX = 2, pBot = 16, pTop = 6;
                const W = YEARS.length * (colW + gap) - gap + pX * 2, H = 68;
                const maxVal = Math.max(...pres, ...dist, 1);
                const sc = (H - pTop - pBot) / maxVal, base = H - pBot;
                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
                    {YEARS.map((y, i) => {
                      const x = pX + i * (colW + gap), hP = pres[i] * sc, hD = dist[i] * sc;
                      return (
                        <g key={y}>
                          <rect x={x} y={base - hP} width={colW} height={hP} fill={yellow} />
                          <rect x={x} y={base - hP - hD} width={colW} height={hD} fill={blue} />
                          <text x={x + colW / 2} y={base - hP / 2} textAnchor="middle" dominantBaseline="middle" fontSize={FONT.graph} fontWeight="600" fill="#333">
                            {pres[i].toFixed(1)}%
                          </text>
                          <text x={x + colW / 2} y={base - hP - hD / 2} textAnchor="middle" dominantBaseline="middle" fontSize={FONT.graph} fontWeight="600" fill="white">
                            {dist[i].toFixed(1)}%
                          </text>
                          <text x={x + colW / 2} y={H - pBot + 4} textAnchor="middle" fontSize={FONT.graph} fill="#555">{y}</text>
                        </g>
                      );
                    })}
                    <rect x={pX} y={H - 8} width={4} height={3} fill={yellow} />
                    <text x={pX + 6} y={H - 5.5} fontSize={FONT.graph} fill="#555">Presencial</text>
                    <rect x={pX + 28} y={H - 8} width={4} height={3} fill={blue} />
                    <text x={pX + 34} y={H - 5.5} fontSize={FONT.graph} fill="#555">Distancia</text>
                  </svg>
                );
              })()}
            </div>
          </div>

          {/* Panel 3: Líneas modalidad */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "white" }}>
            <Banner text="Proyección estudiantes por modalidad S1-Q1" />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2px" }}>
              {(() => {
                const yearsNum = [2026, 2027, 2028, 2029, 2030];
                const series = [
                  { label: "Profesional",     color: "#d4af37", values: pageData?.graficaLineas?.profesional ?? [0,0,0,0,0] },
                  { label: "Maestría",        color: "#00aaff", values: pageData?.graficaLineas?.maestria ?? [0,0,0,0,0] },
                  { label: "Especialización", color: "#e91e63", values: pageData?.graficaLineas?.especializacion ?? [0,0,0,0,0] },
                  { label: "Doctorado",       color: "#4caf50", values: pageData?.graficaLineas?.doctorado ?? [0,0,0,0,0] },
                ];

                const pX = 15, pTop = 16, pBot = 28, W = 250, H = 68;
                const allV = series.flatMap(s => s.values);
                const maxV = Math.max(...allV, 1);
                
                const plotW = W - pX * 2, plotH = H - pTop - pBot;
                const xP = (i) => pX + (i / (YEARS.length - 1)) * plotW;
                const yP = (v) => pTop + plotH - (v / maxV) * plotH;

                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{fontFamily: 'sans-serif'}}>
                    {/* Líneas verticales punteadas */}
                    {YEARS.map((_, i) => (
                      <line key={`v-line-${i}`} x1={xP(i)} y1={pTop} x2={xP(i)} y2={H - pBot} stroke="#999" strokeWidth="0.5" strokeDasharray="2,2" />
                    ))}

                    {/* Líneas de series */}
                    {series.map(s => {
                      const pts = s.values.map((v, i) => `${xP(i)},${yP(v)}`).join(" ");
                      return (
                        <polyline key={`line-${s.label}`} points={pts} fill="none" stroke={s.color} strokeWidth="1.2" />
                      );
                    })}

                    {/* Puntos y etiquetas */}
                    {series.map(s =>
                      s.values.map((v, i) => (
                        <g key={`${s.label}-${i}`}>
                          <circle cx={xP(i)} cy={yP(v)} r="1.5" fill={s.color} />
                          <text
                            x={xP(i)}
                            y={s.label === "Profesional" ? yP(v) + 10 : yP(v) - 5}
                            textAnchor="middle"
                            fontSize="5px"
                            fill="#333"
                          >
                            {v.toLocaleString('es-CO')}
                          </text>
                        </g>
                      ))
                    )}

                    {/* Eje X */}
                    {yearsNum.map((y, i) => (
                      <text key={y} x={xP(i)} y={H - pBot + 10} textAnchor="middle" fontSize="6px" fill="#000">{y}</text>
                    ))}

                    {/* Leyenda */}
                    {series.map((s, i) => {
                      const spacing = 60;
                      const startX = (W - (series.length * spacing)) / 2;
                      return (
                        <g key={`legend-${s.label}`} transform={`translate(${startX + i * spacing}, ${H - 6})`}>
                          <circle cx="0" cy="0" r="2" fill={s.color} />
                          <text x="5" y="2" fontSize="5px" fill="#333">{s.label}</text>
                        </g>
                      );
                    })}
                  </svg>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}