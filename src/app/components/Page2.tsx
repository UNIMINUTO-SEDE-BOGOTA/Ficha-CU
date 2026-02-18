import React from 'react';

// ============================================================================
// CONSTANTES GLOBALES - VERSIÓN COMPACTA CON BORDES
// ============================================================================
const SUBTITLE = "Centro Universitario Especial Minuto de Dios - Engativá";

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

// Tamaños de fuente reducidos
const FONT = {
  data:   "8px",    // datos de tablas principales
  header: "8px",    // encabezados de tabla
  banner: "8px",    // títulos de sección
  graph:  "5px",    // textos dentro de gráficas
  small:  "6px",    // tablas secundarias (matrículas, oferta)
};

// Espaciados mínimos
const PAD = "1px 2px";
const MPAD = "0px 1px";

// ============================================================================
// DATOS (sin cambios)
// ============================================================================
type YD = { nuevos: string; continuos: string; totales: string };
const YEARS = ["2025","2026","2027","2028","2029","2030"];

const pregPresencial: YD[] = [
  { nuevos:"2.230", continuos:"10.053", totales:"12.283" },
  { nuevos:"2.285", continuos:"10.429", totales:"12.714" },
  { nuevos:"2.040", continuos:"9.796",  totales:"11.836" },
  { nuevos:"2.115", continuos:"9.831",  totales:"11.946" },
  { nuevos:"2.130", continuos:"9.952",  totales:"12.082" },
  { nuevos:"2.185", continuos:"10.058", totales:"12.243" },
];
const pregDistancia: YD[] = [
  { nuevos:"850", continuos:"3.839", totales:"4.689" },
  { nuevos:"880", continuos:"4.041", totales:"4.921" },
  { nuevos:"730", continuos:"3.735", totales:"4.465" },
  { nuevos:"730", continuos:"4.404", totales:"5.134" },
  { nuevos:"860", continuos:"3.695", totales:"4.555" },
  { nuevos:"860", continuos:"3.790", totales:"4.650" },
];
const pregTotal: YD[] = [
  { nuevos:"3.080", continuos:"13.892", totales:"16.972" },
  { nuevos:"3.165", continuos:"14.470", totales:"17.635" },
  { nuevos:"2.770", continuos:"13.531", totales:"16.301" },
  { nuevos:"2.845", continuos:"13.505", totales:"16.350" },
  { nuevos:"2.890", continuos:"13.647", totales:"16.537" },
  { nuevos:"3.045", continuos:"13.848", totales:"16.893" },
];
const posPresencial: YD[] = [
  { nuevos:"285", continuos:"301", totales:"586"   },
  { nuevos:"370", continuos:"441", totales:"811"   },
  { nuevos:"253", continuos:"324", totales:"577"   },
  { nuevos:"270", continuos:"485", totales:"755"   },
  { nuevos:"338", continuos:"582", totales:"920"   },
  { nuevos:"343", continuos:"773", totales:"1.116" },
];
const posDistancia: YD[] = [
  { nuevos:"210", continuos:"477",   totales:"687"   },
  { nuevos:"280", continuos:"398",   totales:"678"   },
  { nuevos:"245", continuos:"436",   totales:"681"   },
  { nuevos:"245", continuos:"459",   totales:"704"   },
  { nuevos:"280", continuos:"472",   totales:"752"   },
  { nuevos:"295", continuos:"543",   totales:"838"   },
];
const posTotal: YD[] = [
  { nuevos:"495", continuos:"778",   totales:"1.273" },
  { nuevos:"650", continuos:"839",   totales:"1.489" },
  { nuevos:"498", continuos:"760",   totales:"1.258" },
  { nuevos:"515", continuos:"944",   totales:"1.459" },
  { nuevos:"618", continuos:"1.054", totales:"1.672" },
  { nuevos:"638", continuos:"1.316", totales:"1.954" },
];
const grandTotal: YD[] = [
  { nuevos:"3.575", continuos:"14.670", totales:"18.245" },
  { nuevos:"3.815", continuos:"15.309", totales:"19.124" },
  { nuevos:"3.268", continuos:"14.291", totales:"17.559" },
  { nuevos:"3.360", continuos:"14.449", totales:"17.809" },
  { nuevos:"3.508", continuos:"14.701", totales:"18.209" },
  { nuevos:"3.683", continuos:"15.164", totales:"18.847" },
];
const pregSemestral: YD[] = [
  { nuevos:"2.175", continuos:"10.053", totales:"12.228" },
  { nuevos:"2.220", continuos:"10.406", totales:"12.626" },
  { nuevos:"2.020", continuos:"9.689",  totales:"11.709" },
  { nuevos:"2.095", continuos:"9.653",  totales:"11.748" },
  { nuevos:"2.105", continuos:"9.740",  totales:"11.845" },
  { nuevos:"2.125", continuos:"9.810",  totales:"11.935" },
];
const pregCuatrimestral: YD[] = [
  { nuevos:"905", continuos:"3.839", totales:"4.744" },
  { nuevos:"945", continuos:"4.064", totales:"5.009" },
  { nuevos:"750", continuos:"3.842", totales:"4.592" },
  { nuevos:"750", continuos:"3.852", totales:"4.602" },
  { nuevos:"785", continuos:"3.907", totales:"4.692" },
  { nuevos:"920", continuos:"4.038", totales:"4.958" },
];
const posSemestral: YD[] = [
  { nuevos:"315", continuos:"449", totales:"764"   },
  { nuevos:"365", continuos:"538", totales:"903"   },
  { nuevos:"268", continuos:"356", totales:"624"   },
  { nuevos:"285", continuos:"511", totales:"796"   },
  { nuevos:"318", continuos:"600", totales:"918"   },
  { nuevos:"328", continuos:"731", totales:"1.059" },
];
const posCuatrimestral: YD[] = [
  { nuevos:"180", continuos:"329", totales:"509" },
  { nuevos:"285", continuos:"301", totales:"586" },
  { nuevos:"230", continuos:"404", totales:"634" },
  { nuevos:"230", continuos:"433", totales:"663" },
  { nuevos:"300", continuos:"454", totales:"754" },
  { nuevos:"310", continuos:"585", totales:"895" },
];
const modPresencial: YD[] = [
  { nuevos:"2.515", continuos:"10.354", totales:"12.869" },
  { nuevos:"2.655", continuos:"10.870", totales:"13.525" },
  { nuevos:"2.293", continuos:"10.120", totales:"12.413" },
  { nuevos:"2.385", continuos:"10.316", totales:"12.701" },
  { nuevos:"2.468", continuos:"10.534", totales:"13.002" },
  { nuevos:"2.528", continuos:"10.831", totales:"13.359" },
];
const modDistancia: YD[] = [
  { nuevos:"1.060", continuos:"4.316", totales:"5.376" },
  { nuevos:"1.160", continuos:"4.439", totales:"5.599" },
  { nuevos:"975",   continuos:"4.171", totales:"5.146" },
  { nuevos:"975",   continuos:"5.108", totales:"6.083" },
  { nuevos:"1.040", continuos:"4.167", totales:"5.207" },
  { nuevos:"1.155", continuos:"4.333", totales:"5.488" },
];

// ============================================================================
// COMPONENTES DE TABLA REUTILIZABLES CON BORDES SUTILES
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

const YearCells = ({ d, color = "inherit", bg = "transparent" }: { d: YD; color?: string; bg?: string }) => (
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
// ESTILOS PARA TABLA DE MATRÍCULAS (con bordes)
// ============================================================================
const mc = (align: "left"|"right"|"center" = "right", color = "inherit"): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: MPAD,
  textAlign: align,
  fontWeight: 400,
  color,
  backgroundColor: "transparent",
  overflow: "visible",
});

const mcY = (color = "inherit"): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: MPAD,
  textAlign: "right",
  fontWeight: 400,
  color,
  backgroundColor: C.matTotalBg,
  overflow: "visible",
});

const mcT = (align: "left"|"right"|"center" = "right", color = C.black): React.CSSProperties => ({
  border: "1px solid #e0e0e0",
  fontSize: FONT.small,
  padding: MPAD,
  textAlign: align,
  fontWeight: 700,
  color,
  backgroundColor: C.matTotalBg,
  overflow: "visible",
});

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
interface Props { innerRef?: React.Ref<HTMLDivElement>; }

export function Page2({ innerRef }: Props) {
  return (
    <div
      ref={innerRef}
      className="bg-white"
      style={{
        width: "297mm",
        height: "210mm",
        padding: "2mm 6mm 4mm 6mm",
        display: "flex",
        flexDirection: "column",
        overflow: "visible"
      }}
    >
      {/* HEADER - más compacto */}
      <div className="flex flex-col w-full" style={{ marginBottom: 2 }}>
        <div className="flex justify-between items-center px-2 py-1 w-full">
          <img src="/Logo UNIMINUTO.png" alt="Logo UNIMINUTO" className="h-12 w-auto object-contain" />
          <div className="flex-1 mx-2 h-7 relative flex justify-center items-center">
            <div className="absolute inset-0" style={{ backgroundColor: C.skyBlue, clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" }} />
            <span className="relative z-10 text-black font-normal text-[11px] tracking-wide whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>
              {SUBTITLE}
            </span>
          </div>
          <img src="/Logo_Acreditacion.png" alt="Logo Acreditación" className="h-10 w-auto object-contain" />
        </div>

        <div className="w-full flex justify-center mt-0">
          <div className="px-6 py-0" style={{
            backgroundColor: C.grayBanner,
            clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            height: "12px"
          }}>
            <h3 className="text-black font-semibold text-[8px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>
              Proyección estudiantes 2025–2030 S1/Q1 por Nivel Académico y Modalidad
            </h3>
          </div>
        </div>
      </div>

      {/* TABLA 1 — Nivel Académico */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <table style={tableStyle}>
          <TableHeader />
          <tbody>
            <tr>
              <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
              <Td align="left">Presencial</Td>
              {pregPresencial.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left">Distancia</Td>
              {pregDistancia.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left" bold>Total</Td>
              {pregTotal.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
            </tr>
            <tr>
              <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
              <Td align="left">Presencial</Td>
              {posPresencial.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left">Distancia</Td>
              {posDistancia.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left" bold>Total</Td>
              {posTotal.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
              {grandTotal.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ height: 2 }} />

      {/* TABLA 2 — Modalidad */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={tableStyle}>
          <TableHeader />
          <tbody>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Presencial</td>
              {modPresencial.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Distancia</td>
              {modDistancia.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
              {grandTotal.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ height: 2 }} />

      {/* TABLA MATRÍCULAS 2025 — columnas más angostas */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "visible" }}>
        <table style={{
          ...tableStyle,
          fontSize: FONT.small,
          tableLayout: "fixed",
          width: "auto",
          borderSpacing: 0
        }}>
          <colgroup>
            <col style={{ width: "50px" }} />
            <col style={{ width: "50px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
            <col style={{ width: "40px" }} />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={14} style={{
                border: "none",
                backgroundColor: C.grayBanner,
                textAlign: "center",
                fontSize: FONT.banner,
                fontWeight: 600,
                padding: "1px 2px 2px 2px",
                clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)"
              }}>
                Comportamiento matrículas 2025 por Nivel Académico y Modalidad
              </td>
            </tr>
            <tr><td colSpan={14} style={{ border: "none", height: "2px", padding: 0 }} /></tr>
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
                  padding: "2px 1px",
                  textAlign: h.align,
                  whiteSpace: "pre-line",
                  lineHeight: 1.1
                }}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Pregrado */}
            <tr>
              <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>1.Pregrado</td>
              <td style={mc("left")}>Presencial</td>
              <td style={mc()}>2.230</td>
              <td style={mc()}>1.973</td>
              <td style={mc("right", C.redTotal)}>-257</td>
              <td style={mc()}>88,48 %</td>
              <td style={mc()}>10.053</td>
              <td style={mc()}>10.628</td>
              <td style={mc("right", C.green)}>575</td>
              <td style={mc("right", C.green)}>105,72 %</td>
              <td style={mcY()}>12.283</td>
              <td style={mcY()}>12.601</td>
              <td style={mc("right", C.green)}>318</td>
              <td style={mc("right", C.green)}>102,59 %</td>
            </tr>
            <tr>
              <td style={mc("left")}>Distancia</td>
              <td style={mc()}>850</td>
              <td style={mc()}>722</td>
              <td style={mc("right", C.redTotal)}>-128</td>
              <td style={mc()}>84,94 %</td>
              <td style={mc()}>3.839</td>
              <td style={mc()}>3.913</td>
              <td style={mc("right", C.green)}>74</td>
              <td style={mc("right", C.green)}>101,93 %</td>
              <td style={mcY()}>4.689</td>
              <td style={mcY()}>4.635</td>
              <td style={mc("right", C.redTotal)}>-54</td>
              <td style={mc()}>98,85 %</td>
            </tr>
            <tr>
              <td style={mcT("left")}>Total</td>
              <td style={mcT()}>3.080</td>
              <td style={mcT()}>2.695</td>
              <td style={mcT("right", C.redTotal)}>-385</td>
              <td style={mcT()}>87,50 %</td>
              <td style={mcT()}>13.892</td>
              <td style={mcT()}>14.541</td>
              <td style={mcT("right", C.green)}>649</td>
              <td style={mcT("right", C.green)}>104,67 %</td>
              <td style={mcT()}>16.972</td>
              <td style={mcT()}>17.236</td>
              <td style={mcT("right", C.green)}>264</td>
              <td style={mcT("right", C.green)}>101,56 %</td>
            </tr>

            {/* Posgrado */}
            <tr>
              <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>2.Posgrado</td>
              <td style={mc("left")}>Presencial</td>
              <td style={mc()}>285</td>
              <td style={mc()}>203</td>
              <td style={mc("right", C.redTotal)}>-82</td>
              <td style={mc()}>71,23 %</td>
              <td style={mc()}>301</td>
              <td style={mc()}>209</td>
              <td style={mc("right", C.redTotal)}>-92</td>
              <td style={mc()}>69,44 %</td>
              <td style={mcY()}>586</td>
              <td style={mcY()}>412</td>
              <td style={mc("right", C.redTotal)}>-174</td>
              <td style={mc()}>70,31 %</td>
            </tr>
            <tr>
              <td style={mc("left")}>Distancia</td>
              <td style={mc()}>210</td>
              <td style={mc()}>270</td>
              <td style={mc("right", C.green)}>60</td>
              <td style={mc("right", C.green)}>128,57 %</td>
              <td style={mc()}>477</td>
              <td style={mc()}>343</td>
              <td style={mc("right", C.redTotal)}>-134</td>
              <td style={mc()}>71,91 %</td>
              <td style={mcY()}>687</td>
              <td style={mcY()}>613</td>
              <td style={mc("right", C.redTotal)}>-74</td>
              <td style={mc()}>89,23 %</td>
            </tr>
            <tr>
              <td style={mcT("left")}>Total</td>
              <td style={mcT()}>495</td>
              <td style={mcT()}>473</td>
              <td style={mcT("right", C.redTotal)}>-22</td>
              <td style={mcT()}>95,56 %</td>
              <td style={mcT()}>778</td>
              <td style={mcT()}>552</td>
              <td style={mcT("right", C.redTotal)}>-226</td>
              <td style={mcT()}>70,95 %</td>
              <td style={mcT()}>1.273</td>
              <td style={mcT()}>1.025</td>
              <td style={mcT("right", C.redTotal)}>-248</td>
              <td style={mcT()}>80,52 %</td>
            </tr>

            {/* Total General */}
            <tr>
              <td colSpan={2} style={mcT("left")}>Total</td>
              <td style={mcT()}>3.575</td>
              <td style={mcT()}>3.168</td>
              <td style={mcT("right", C.redTotal)}>-407</td>
              <td style={mcT()}>88,62 %</td>
              <td style={mcT()}>14.670</td>
              <td style={mcT()}>15.093</td>
              <td style={mcT("right", C.green)}>423</td>
              <td style={mcT("right", C.green)}>102,88 %</td>
              <td style={mcT()}>18.245</td>
              <td style={mcT()}>18.261</td>
              <td style={mcT("right", C.green)}>16</td>
              <td style={mcT("right", C.green)}>100,09 %</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TITULO — Proyección 2026-2030 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 1, marginBottom: 1 }}>
        <div style={{
          backgroundColor: C.grayBanner,
          clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
          padding: "1px 6px",
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

      <div style={{ height: 2 }} />

      {/* TABLA 4 — Periodicidad */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={tableStyle}>
          <TableHeader />
          <tbody>
            <tr>
              <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
              <Td align="left">Semestral</Td>
              {pregSemestral.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left">Cuatrimestral</Td>
              {pregCuatrimestral.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left" bold>Total</Td>
              {pregTotal.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
            </tr>
            <tr>
              <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
              <Td align="left">Semestral</Td>
              {posSemestral.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left">Cuatrimestral</Td>
              {posCuatrimestral.map((d,i) => <YearCells key={i} d={d} />)}
            </tr>
            <tr>
              <Td align="left" bold>Total</Td>
              {posTotal.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
              {grandTotal.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ height: 2 }} />

      {/* GRÁFICAS — 3 paneles SIN BORDES EXTERNOS (solo bordes de celdas internas) */}
      <div style={{ display: "flex", flexDirection: "row", gap: 4, width: "100%", height: 100, alignItems: "stretch" }}>
        {/* Panel 1: Oferta Académica - sin borde exterior */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Banner text="Proyección Oferta Académica" />
          <div style={{ flex: 1, padding: "1px 2px", overflow: "visible" }}>
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
                  {[41,44,33,35,35,37].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
                <tr>{[28,30,21,23,23,25].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                <tr>{[13,14,12,12,12,12].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                <tr>
                  <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>⊟ 2.Posgrado</td>
                  {[23,31,23,24,30,30].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
                <tr>{[15,20,14,15,15,15].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                <tr>{[8,11,9,9,9,9].map((v,i)   => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}</tr>
                <tr>
                  <td style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px" }}>Total</td>
                  {[84,75,58,50,50,50].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
                <tr><td colSpan={7} style={{ border: "none", padding: "1px" }}></td></tr>
                <tr>
                  <th style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "left" }}>Modalidad</th>
                  {YEARS.map(y => <th key={y} style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{y}</th>)}
                </tr>
                <tr>
                  <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px" }}>Presencial</td>
                  {[43,50,35,38,42,44].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
                <tr>
                  <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px" }}>Distancia</td>
                  {[21,25,21,21,21,21].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
                <tr>
                  <td style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px" }}>Total</td>
                  {[64,75,56,59,63,67].map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel 2: Deserción barras - sin borde exterior */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Banner text="Proyección Deserción por Centro Universitario" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "1px" }}>
            {(() => {
              const pres = [8.0,8.0,9.0,8.0,8.0,8.0];
              const dist = [10.0,10.0,10.0,10.0,10.0,11.0];
              const yellow = "#F5D97A", blue = "#4A86C8";
              const colW = 20, gap = 4, pX = 4, pBot = 18, pTop = 8;
              const W = YEARS.length * (colW + gap) - gap + pX * 2, H = 80;
              const sc = (H - pTop - pBot) / 21, base = H - pBot;
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
                        <text x={x + colW / 2} y={H - pBot + 5} textAnchor="middle" fontSize={FONT.graph} fill="#555">{y}</text>
                      </g>
                    );
                  })}
                  <rect x={pX} y={H - 8} width={4} height={3} fill={yellow} />
                  <text x={pX + 6} y={H - 5.5} fontSize={FONT.graph} fill="#555">Presencial</text>
                  <rect x={pX + 32} y={H - 8} width={4} height={3} fill={blue} />
                  <text x={pX + 38} y={H - 5.5} fontSize={FONT.graph} fill="#555">Distancia</text>
                </svg>
              );
            })()}
          </div>
        </div>
              {/* Panel 3: Líneas modalidad - Estilo Fiel a la Imagen */}
<div style={{ flex: 1, display: "flex", flexDirection: "column", background: "white" }}>
  <Banner text="Proyección estudiantes por modalidad S1-Q1" />
  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
    {(() => {
      const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];
      const series = [
        { label: "Profesional",     color: "#d4af37", values: [16972, 17635, 16301, 16350, 16537, 16893] },
        { label: "Maestría",        color: "#00aaff", values: [447, 565, 389, 512, 639, 741] },
        { label: "Especialización", color: "#e91e63", values: [447, 859, 389, 512, 639, 741] },
        { label: "Doctorado",       color: "#4caf50", values: [100, 150, 120, 180, 200, 210] }, // Valores de ejemplo para visibilidad
      ];

      const pX = 20, pTop = 20, pBot = 40, W = 300, H = 180;
      const allV = series.flatMap(s => s.values);
      const maxV = 20000; // Ajustado para dar aire arriba como en la foto
      const minV = 0;
      
      const plotW = W - pX * 2, plotH = H - pTop - pBot;
      const xP = (i) => pX + (i / (YEARS.length - 1)) * plotW;
      const yP = (v) => pTop + plotH - (v / maxV) * plotH;

      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{fontFamily: 'sans-serif'}}>
          
          {/* Líneas verticales punteadas de fondo */}
          {YEARS.map((_, i) => (
            <line key={`v-line-${i}`} x1={xP(i)} y1={pTop} x2={xP(i)} y2={H - pBot} stroke="#999" strokeWidth="0.5" strokeDasharray="2,2" />
          ))}

          {/* Líneas de las series */}
          {series.map(s => {
            const pts = s.values.map((v, i) => `${xP(i)},${yP(v)}`).join(" ");
            return (
              <polyline key={`line-${s.label}`} points={pts} fill="none" stroke={s.color} strokeWidth="1.2" />
            );
          })}

          {/* Puntos y Etiquetas de datos */}
          {series.map(s =>
            s.values.map((v, i) => (
              <g key={`${s.label}-${i}`}>
                <circle cx={xP(i)} cy={yP(v)} r="2" fill={s.color} />
                <text
                  x={xP(i)}
                  y={s.label === "Profesional" ? yP(v) + 12 : yP(v) - 6} // Profesional abajo del punto, otros arriba (ajustar según imagen)
                  textAnchor="middle"
                  fontSize="8px"
                  fill="#333"
                >
                  {v.toLocaleString('es-CO')}
                </text>
              </g>
            ))
          )}

          {/* Eje X (Años) */}
          {YEARS.map((y, i) => (
            <text key={y} x={xP(i)} y={H - pBot + 15} textAnchor="middle" fontSize="10px" fill="#000">{y}</text>
          ))}

          {/* Leyenda Horizontal Inferior */}
          {series.map((s, i) => {
            const spacing = 70;
            const startX = (W - (series.length * spacing)) / 2;
            return (
              <g key={`legend-${s.label}`} transform={`translate(${startX + i * spacing}, ${H - 10})`}>
                <circle cx="0" cy="0" r="3" fill={s.color} />
                <text x="7" y="3" fontSize="9px" fill="#333">{s.label}</text>
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
  );
}