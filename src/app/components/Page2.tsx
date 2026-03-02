import React from 'react';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage2 } from '../../models/proyeccionEsModel';

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

const FONT = {
  data:   "9px",
  header: "8px",
  banner: "8px",
  graph:  "5px",
  small:  "6px",
};

const PAD = "1px 2px";

const YEARS = ["2026", "2027", "2028", "2029", "2030"];

const CENTRO_NOMBRES: Record<string, string> = {
  'centro-engativa':               'Engativá',
  'centro-kennedy':                'Kennedy',
  'centro-santa-fe-las-cruces':    'Las Cruces Santa Fé',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen':  'San Cristóbal Norte - Usaquén',
};

// ============================================================================
// COMPONENTES REUTILIZABLES
// ============================================================================
const Th = ({ children, colSpan = 1, bg = C.skyBlue, color = C.skyBlueTx, align = "center" as "center"|"left" }) => (
  <th colSpan={colSpan} style={{ border: "1px solid #e0e0e0", backgroundColor: bg, color, fontSize: FONT.header, fontWeight: 700, textAlign: align, padding: PAD, whiteSpace: "nowrap" }}>
    {children}
  </th>
);

const Td = ({ children, align = "right" as "right"|"left"|"center", bold = false, color = "inherit", bg = "transparent" }) => (
  <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, textAlign: align, fontWeight: bold ? 700 : 400, color, backgroundColor: bg, padding: PAD, whiteSpace: "nowrap" }}>
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

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" };
const rowSpanStyle: React.CSSProperties = { border: "1px solid #e0e0e0", fontSize: FONT.data, fontWeight: 700, padding: PAD, verticalAlign: "middle", whiteSpace: "nowrap" };

const Banner = ({ text }: { text: string }) => (
  <div style={{ backgroundColor: C.grayBanner, clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", textAlign: "center", padding: "1px 4px", flexShrink: 0 }}>
    <span style={{ fontSize: FONT.banner, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{text}</span>
  </div>
);

// ============================================================================
// ESTILOS TABLA MATRÍCULAS
// ============================================================================
const mc = (align: "left"|"right"|"center" = "right"): React.CSSProperties => ({
  border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "0px 1px",
  textAlign: align, fontWeight: 400, backgroundColor: "transparent", overflow: "visible",
});

const mcY = (): React.CSSProperties => ({
  border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "0px 1px",
  textAlign: "right", fontWeight: 400, backgroundColor: C.matTotalBg, overflow: "visible",
});

const mcT = (align: "left"|"right"|"center" = "right"): React.CSSProperties => ({
  border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "0px 1px",
  textAlign: align, fontWeight: 700, backgroundColor: C.matTotalBg, overflow: "visible",
});

// ============================================================================
// HELPER: renderiza las 4 celdas de un bloque (proyectado, matriculado, variación, %)
// color de variación y % dependen de esPositivo
// ============================================================================
const MatCells = ({
  d,
  isTotalRow = false,
  isYellow = false,
}: {
  d: { proyectado: string; matriculado: string; variacion: string; porcentaje: string; esPositivo: boolean; esExito: boolean };
  isTotalRow?: boolean;
  isYellow?: boolean;
}) => {
  const colorVar = d.esPositivo ? C.green : C.redTotal;
  const colorPct = parseFloat(d.porcentaje) >= 0 ? C.green : C.redTotal;
  const styleProy = isTotalRow ? mcT() : isYellow ? mcY() : mc();
  const styleMatr = isTotalRow ? mcT() : isYellow ? mcY() : mc();
  const styleVar  = isTotalRow ? { ...mcT(), color: colorVar } : { ...mc(), color: colorVar };
  const stylePct  = isTotalRow ? { ...mcT(), color: colorPct } : { ...mc(), color: colorPct };
  return (
    <>
      <td style={styleProy}>{d.proyectado}</td>
      <td style={styleMatr}>{d.matriculado}</td>
      <td style={styleVar}>{d.variacion}</td>
      <td style={stylePct}>{d.porcentaje}</td>
    </>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
interface Props { innerRef?: React.Ref<HTMLDivElement>; centroId?: string; }

export function Page2({ innerRef, centroId = 'centro-engativa' }: Props) {
  // ✅ Hook con UN solo argumento
  const { data, loading } = useObservatorio(centroId);
  const pageData = transformarPage2(data);

  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';
  const subtitle = `Centro Universitario ${centroNombre}`;

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <style>{`
        @media print {
          .print-page { padding: 1mm 2mm !important; }
          table, td, th { font-size: 6px !important; }
          .graph-container { height: 65px !important; }
          svg text { font-size: 4px !important; }
        }
      `}</style>
      <div ref={innerRef} className="bg-white print-page" style={{ width: "297mm", minHeight: "210mm", padding: "1mm 4mm", display: "flex", flexDirection: "column", overflow: "visible", pageBreakInside: "avoid" }}>

        {/* HEADER */}
        <div className="flex flex-col w-full" style={{ marginBottom: 1 }}>
          <div className="flex justify-between items-center px-2 py-0 w-full">
            <img src="/Logo UNIMINUTO.png" alt="Logo UNIMINUTO" className="h-10 w-auto object-contain" />
            <div className="flex-1 mx-2 h-6 relative flex justify-center items-center">
              <div className="absolute inset-0" style={{ backgroundColor: C.skyBlue, clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" }} />
              <span className="relative z-10 text-black font-normal text-[10px] tracking-wide whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>{subtitle}</span>
            </div>
            <img src="/Logo_Acreditacion.png" alt="Logo Acreditación" className="h-8 w-auto object-contain" />
          </div>
          <div className="w-full flex justify-center mt-0">
            <div className="px-4 py-0" style={{ backgroundColor: C.grayBanner, clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", display: "flex", alignItems: "center", height: "10px" }}>
              <h3 className="text-black font-semibold text-[7px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>
                Proyección estudiantes 2026–2030 S1/Q1 por Nivel Académico y Modalidad
              </h3>
            </div>
          </div>
        </div>

        {/* TABLA 1 */}
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

        {/* TABLA 2 */}
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

        {/* TABLA 3: MATRÍCULAS 2026 */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "visible" }}>
          <table style={{ ...tableStyle, fontSize: FONT.small, tableLayout: "fixed", width: "auto", borderSpacing: 0 }}>
            <colgroup>
              <col style={{ width: "45px" }} /><col style={{ width: "45px" }} />
              <col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} />
              <col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} /><col style={{ width: "32px" }} />
            </colgroup>
            <thead>
              <tr>
                <td colSpan={14} style={{ border: "none", backgroundColor: C.grayBanner, textAlign: "center", fontSize: FONT.banner, fontWeight: 600, padding: "1px 2px", clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)" }}>
                  Comportamiento matrículas 2026 S1/Q1 por Nivel Académico y Modalidad
                </td>
              </tr>
              <tr><td colSpan={14} style={{ border: "none", height: "1px", padding: 0 }} /></tr>
              <tr>
                {[
                  { label: "Nivel",               align: "left"   as const },
                  { label: "",                    align: "left"   as const },
                  { label: "Nuevos\nProy.",        align: "center" as const },
                  { label: "Nuevos\nMatric.",      align: "center" as const },
                  { label: "Variación",            align: "center" as const },
                  { label: "%",                   align: "center" as const },
                  { label: "Continuos\nProy.",     align: "center" as const },
                  { label: "Continuos\nMatric.",   align: "center" as const },
                  { label: "Variación",            align: "center" as const },
                  { label: "%",                   align: "center" as const },
                  { label: "Totales\nProy.",       align: "center" as const },
                  { label: "Totales\nMatric.",     align: "center" as const },
                  { label: "Variación",            align: "center" as const },
                  { label: "%",                   align: "center" as const },
                ].map((h, i) => (
                  <th key={i} style={{ border: "1px solid #e0e0e0", backgroundColor: C.matHeaderBg, color: C.black, fontSize: FONT.small, fontWeight: 700, padding: "1px 1px", textAlign: h.align, whiteSpace: "pre-line", lineHeight: 1 }}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* ── Pregrado ── */}
              <tr>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>1.Pregrado</td>
                <td style={mc("left")}>Presencial</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.totales} isYellow />
              </tr>
              <tr>
                <td style={mc("left")}>Distancia</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.totales} isYellow />
              </tr>
              <tr>
                <td style={mcT("left")}>Total</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.nuevos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.continuos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.totales} isTotalRow />
              </tr>

              {/* ── Posgrado ── */}
              <tr>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>2.Posgrado</td>
                <td style={mc("left")}>Presencial</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.totales} isYellow />
              </tr>
              <tr>
                <td style={mc("left")}>Distancia</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.totales} isYellow />
              </tr>
              <tr>
                <td style={mcT("left")}>Total</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.nuevos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.continuos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.totales} isTotalRow />
              </tr>

              {/* ── Total General ── */}
              <tr>
                <td colSpan={2} style={mcT("left")}>Total</td>
                <MatCells d={pageData?.t3_matriculas2026?.totalGeneral.nuevos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.totalGeneral.continuos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.totalGeneral.totales} isTotalRow />
              </tr>
            </tbody>
          </table>
        </div>

        {/* TITULO TABLA 4 */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 1, marginBottom: 1 }}>
          <div style={{ backgroundColor: C.grayBanner, clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", padding: "1px 4px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: FONT.banner, fontWeight: 600, fontFamily: "Inter, sans-serif", lineHeight: 1 }}>
              Proyección estudiantes 2026–2030 S1/Q1 por Nivel Académico y Periodicidad
            </span>
          </div>
        </div>

        <div style={{ height: 1 }} />

        {/* TABLA 4 */}
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

        {/* GRÁFICAS */}
        <div style={{ display: "flex", flexDirection: "row", gap: 2, width: "100%", height: 70, alignItems: "stretch" }} className="graph-container">

          {/* Panel 1: Oferta */}
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

          {/* Panel 2: Deserción */}
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
                          <text x={x + colW/2} y={base - hP/2} textAnchor="middle" dominantBaseline="middle" fontSize={FONT.graph} fontWeight="600" fill="#333">{pres[i].toFixed(1)}%</text>
                          <text x={x + colW/2} y={base - hP - hD/2} textAnchor="middle" dominantBaseline="middle" fontSize={FONT.graph} fontWeight="600" fill="white">{dist[i].toFixed(1)}%</text>
                          <text x={x + colW/2} y={H - pBot + 4} textAnchor="middle" fontSize={FONT.graph} fill="#555">{y}</text>
                        </g>
                      );
                    })}
                    <rect x={pX} y={H-8} width={4} height={3} fill={yellow} />
                    <text x={pX+6} y={H-5.5} fontSize={FONT.graph} fill="#555">Presencial</text>
                    <rect x={pX+28} y={H-8} width={4} height={3} fill={blue} />
                    <text x={pX+34} y={H-5.5} fontSize={FONT.graph} fill="#555">Distancia</text>
                  </svg>
                );
              })()}
            </div>
          </div>

          {/* Panel 3: Líneas */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "white" }}>
            <Banner text="Proyección estudiantes por modalidad S1-Q1" />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2px" }}>
              {(() => {
                const yearsNum = [2026,2027,2028,2029,2030];
                const series = [
                  { label: "Profesional",     color: "#d4af37", values: pageData?.graficaLineas?.profesional     ?? [0,0,0,0,0] },
                  { label: "Maestría",        color: "#00aaff", values: pageData?.graficaLineas?.maestria        ?? [0,0,0,0,0] },
                  { label: "Especialización", color: "#e91e63", values: pageData?.graficaLineas?.especializacion ?? [0,0,0,0,0] },
                  { label: "Doctorado",       color: "#4caf50", values: pageData?.graficaLineas?.doctorado       ?? [0,0,0,0,0] },
                ];
                const pX = 15, pTop = 16, pBot = 28, W = 250, H = 68;
                const allV = series.flatMap(s => s.values);
                const maxV = Math.max(...allV, 1);
                const plotW = W - pX*2, plotH = H - pTop - pBot;
                const xP = (i: number) => pX + (i/(YEARS.length-1))*plotW;
                const yP = (v: number) => pTop + plotH - (v/maxV)*plotH;
                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{fontFamily:'sans-serif'}}>
                    {YEARS.map((_,i) => <line key={i} x1={xP(i)} y1={pTop} x2={xP(i)} y2={H-pBot} stroke="#999" strokeWidth="0.5" strokeDasharray="2,2" />)}
                    {series.map(s => <polyline key={s.label} points={s.values.map((v,i) => `${xP(i)},${yP(v)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="1.2" />)}
                    {series.map(s => s.values.map((v,i) => (
                      <g key={`${s.label}-${i}`}>
                        <circle cx={xP(i)} cy={yP(v)} r="1.5" fill={s.color} />
                        <text x={xP(i)} y={s.label==="Profesional" ? yP(v)+10 : yP(v)-5} textAnchor="middle" fontSize="5px" fill="#333">{v.toLocaleString('es-CO')}</text>
                      </g>
                    )))}
                    {yearsNum.map((y,i) => <text key={y} x={xP(i)} y={H-pBot+10} textAnchor="middle" fontSize="6px" fill="#000">{y}</text>)}
                    {series.map((s,i) => {
                      const spacing = 60, startX = (W - series.length*spacing)/2;
                      return (
                        <g key={`leg-${s.label}`} transform={`translate(${startX+i*spacing},${H-6})`}>
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