import React from 'react';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage2 } from '../../models/proyeccionEsModel';
import { useAnimatedRows } from '../../hooks/useAnimatedRows';

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
  banner: "9px",
  graph:  "5px",
  small:  "8.5px",
  oferta: "10px",
};

const PAD = "0px 1px";

const YEARS = ["2026", "2027", "2028", "2029", "2030"];

const CENTRO_NOMBRES: Record<string, string> = {
  'centro-engativa': 'Especial Minuto de Dios - Engativá',
  'centro-kennedy': 'Kennedy',
  'centro-santa-fe-las-cruces': 'Las Cruces - Santa Fe',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen': 'San Cristóbal Norte - Usaquén',
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

const tableStyle: React.CSSProperties = { width: "95%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" };
const rowSpanStyle: React.CSSProperties = { border: "1px solid #e0e0e0", fontSize: FONT.data, fontWeight: 700, padding: PAD, verticalAlign: "middle", whiteSpace: "nowrap" };

const Banner = ({ text }: { text: string }) => (
  <div style={{ backgroundColor: C.grayBanner, clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", padding: "1px 60px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "10px", width: "fit-content", alignSelf: "center" }}>
    <span style={{ fontSize: FONT.banner, fontWeight: 600, fontFamily: "Inter, sans-serif", lineHeight: 1 }}>{text}</span>
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
  const { data, loading } = useObservatorio(centroId);
  const pageData = transformarPage2(data);

  const visibleT1 = useAnimatedRows(centroId, 7, 70);
  const visibleT2 = useAnimatedRows(centroId, 3, 80);
  const visibleT3 = useAnimatedRows(centroId, 7, 60);
  const visibleT4 = useAnimatedRows(centroId, 7, 70);

  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';
  const subtitle = `Centro Universitario ${centroNombre} S1/Q1`;

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <div ref={innerRef} className="bg-white" style={{ width: "297mm", height: "210mm", overflow: "hidden", pageBreakInside: "avoid" }}>

        {/* HEADER */}
        <div className="flex flex-col w-full" style={{ marginBottom: 1 }}>
          <div className="flex justify-between items-center px-2 py-0 w-full">
            <img src="/Logo UNIMINUTO.png" alt="Logo UNIMINUTO" className="h-10 w-auto object-contain" />
            <div className="flex-1 mx-2 h-6 relative flex justify-center items-center">
              <div className="absolute inset-0" style={{ backgroundColor: C.skyBlue, clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" }} />
              <span className="relative z-10 text-black font-normal text-[12px] tracking-wide whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>{subtitle}</span>
            </div>
            <img src="/Logo_Acreditacion.png" alt="Logo Acreditación" className="h-8 w-auto object-contain" />
          </div>
          <div className="w-full flex justify-center mt-0">
            <div className="px-4 py-0" style={{ backgroundColor: C.grayBanner, clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", display: "flex", alignItems: "center", height: "10px" }}>
              <h3 className="text-black font-semibold text-[10px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>
                Proyección estudiantes 2026–2030 por Nivel Académico y Modalidad
              </h3>
            </div>
          </div>
        </div>

        {/* TABLA 1 */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <table style={tableStyle}>
            <TableHeader />
            <tbody>
              <tr className={visibleT1[0] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
                <Td align="left">Presencial</Td>
                {pageData?.t1_pregPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[1] ? 'row-animated' : 'row-hidden'}>
                <Td align="left">Distancia</Td>
                {pageData?.t1_pregDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[2] ? 'row-animated' : 'row-hidden'}>
                <Td align="left" bold>Total</Td>
                {pageData?.t1_pregTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr className={visibleT1[3] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
                <Td align="left">Presencial</Td>
                {pageData?.t1_posPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[4] ? 'row-animated' : 'row-hidden'}>
                <Td align="left">Distancia</Td>
                {pageData?.t1_posDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[5] ? 'row-animated' : 'row-hidden'}>
                <Td align="left" bold>Total</Td>
                {pageData?.t1_posTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr className={visibleT1[6] ? 'row-animated' : 'row-hidden'}>
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
              <tr className={visibleT2[0] ? 'row-animated' : 'row-hidden'}>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Presencial</td>
                {pageData?.t2_modPresencial?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT2[1] ? 'row-animated' : 'row-hidden'}>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", fontSize: FONT.data, padding: PAD }}>Distancia</td>
                {pageData?.t2_modDistancia?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT2[2] ? 'row-animated' : 'row-hidden'}>
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
                  Comportamiento matrículas 2026 por Nivel Académico y Modalidad
                </td>
              </tr>
              <tr><td colSpan={14} style={{ border: "none", height: "1px", padding: 0 }} /></tr>
              <tr>
                {[
                  { label: "Nivel",               align: "left"   as const },
                  { label: "",                    align: "left"   as const },
                  { label: "Nuevos\nProyecciones",        align: "center" as const },
                  { label: "Nuevos\nMatriculados",      align: "center" as const },
                  { label: "Variación",            align: "center" as const },
                  { label: "%",                   align: "center" as const },
                  { label: "Continuos\nProyecciones",     align: "center" as const },
                  { label: "Continuos\nMatriculados",   align: "center" as const },
                  { label: "Variación",            align: "center" as const },
                  { label: "%",                   align: "center" as const },
                  { label: "Totales\nProyecciones",       align: "center" as const },
                  { label: "Totales\nMatriculados",     align: "center" as const },
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
              <tr className={visibleT3[0] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>1.Pregrado</td>
                <td style={mc("left")}>Presencial</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoPresencial.totales} isYellow />
              </tr>
              <tr className={visibleT3[1] ? 'row-animated' : 'row-hidden'}>
                <td style={mc("left")}>Distancia</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoDistancia.totales} isYellow />
              </tr>
              <tr className={visibleT3[2] ? 'row-animated' : 'row-hidden'}>
                <td style={mcT("left")}>Total</td>
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.nuevos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.continuos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.pregradoTotal.totales} isTotalRow />
              </tr>

              {/* ── Posgrado ── */}
              <tr className={visibleT3[3] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", verticalAlign: "middle" }}>2.Posgrado</td>
                <td style={mc("left")}>Presencial</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoPresencial.totales} isYellow />
              </tr>
              <tr className={visibleT3[4] ? 'row-animated' : 'row-hidden'}>
                <td style={mc("left")}>Distancia</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.nuevos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.continuos} />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoDistancia.totales} isYellow />
              </tr>
              <tr className={visibleT3[5] ? 'row-animated' : 'row-hidden'}>
                <td style={mcT("left")}>Total</td>
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.nuevos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.continuos} isTotalRow />
                <MatCells d={pageData?.t3_matriculas2026?.posgradoTotal.totales} isTotalRow />
              </tr>

              {/* ── Total General ── */}
              <tr className={visibleT3[6] ? 'row-animated' : 'row-hidden'}>
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
              Proyección estudiantes 2026–2030 por Nivel Académico y Periodicidad
            </span>
          </div>
        </div>

        <div style={{ height: 1 }} />

        {/* TABLA 4 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={tableStyle}>
            <TableHeader />
            <tbody>
              <tr className={visibleT4[0] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={rowSpanStyle}>1.Pregrado</td>
                <Td align="left">Semestral</Td>
                {pageData?.t4_pregSemestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[1] ? 'row-animated' : 'row-hidden'}>
                <Td align="left">Cuatrimestral</Td>
                {pageData?.t4_pregCuatrimestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[2] ? 'row-animated' : 'row-hidden'}>
                <Td align="left" bold>Total</Td>
                {pageData?.t4_pregTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr className={visibleT4[3] ? 'row-animated' : 'row-hidden'}>
                <td rowSpan={3} style={rowSpanStyle}>2.Posgrado</td>
                <Td align="left">Semestral</Td>
                {pageData?.t4_posSemestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[4] ? 'row-animated' : 'row-hidden'}>
                <Td align="left">Cuatrimestral</Td>
                {pageData?.t4_posCuatrimestral?.map((d,i) => <YearCells key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[5] ? 'row-animated' : 'row-hidden'}>
                <Td align="left" bold>Total</Td>
                {pageData?.t4_posTotal?.map((d,i) => <YearCells key={i} d={d} color={C.redTotal} />)}
              </tr>
              <tr className={visibleT4[6] ? 'row-animated' : 'row-hidden'}>
                <td colSpan={2} style={{ border: "1px solid #e0e0e0", backgroundColor: C.purple, color: C.black, fontSize: FONT.data, fontWeight: 700, padding: PAD }}>Total</td>
                {pageData?.t4_grandTotal?.map((d,i) => <YearCells key={i} d={d} color={C.black} bg={C.purple} />)}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: 1 }} />

        {/* GRÁFICAS */}
        <div style={{ display: "flex", flexDirection: "row", gap: 0, width: "95%", height: 200, alignItems: "stretch", justifyContent: "center" }} className="graph-container">

          {/* Panel 1: Oferta Académica */}
          <div
            key={`oferta-${centroId}`}
            style={{ width: "34%", display: "flex", flexDirection: "column", animation: "slideInLeft 0.4s ease forwards" }}
          >
            <Banner text="Proyección Oferta Académica" />
            <div className="mt-3" style={{ flex: 1, padding: "0 1px", overflow: "visible" }}>
              <table style={{ ...tableStyle, fontSize: FONT.oferta, margin: "0 auto", width: "80%" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.oferta, fontWeight: 700, padding: "1px 2px", textAlign: "left" }}>Periodicidad</th>
                    {YEARS.map(y => <th key={y} style={{ border: "1px solid #e0e0e0", backgroundColor: C.skyBlue, color: C.skyBlueTx, fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, fontWeight: 700, padding: "1px 2px" }}>⊟ 1.Pregrado</td>
                    {pageData?.graficaOferta?.pregrado?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", paddingLeft: "8px" }}>Presencial</td>
                    {pageData?.graficaOferta?.pregradoSemestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", paddingLeft: "8px" }}>Distancia</td>
                    {pageData?.graficaOferta?.pregradoCuatrimestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, fontWeight: 700, padding: "1px 2px" }}>⊟ 2.Posgrado</td>
                    {pageData?.graficaOferta?.posgrado?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.small, fontWeight: 700, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", paddingLeft: "8px" }}>Presencial</td>
                    {pageData?.graficaOferta?.posgradoSemestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", paddingLeft: "8px" }}>Distancia</td>
                    {pageData?.graficaOferta?.posgradoCuatrimestral?.map((v,i) => <td key={i} style={{ border: "1px solid #e0e0e0", fontSize: FONT.oferta, padding: "1px 2px", textAlign: "center" }}>{v}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel 2: Deserción */}
          <div
            key={`desercion-${centroId}`}
            style={{ width: "35%", display: "flex", flexDirection: "column", minWidth: 0, animation: "slideInLeft 0.5s ease forwards" }}
          >
            <Banner text="Proyección Deserción por Centro Universitario" />
            <div style={{ flex: 1, width: "100%", overflow: "hidden" }}>
              {(() => {
                const toNumber = (val) => {
                  if (val === null || val === undefined || val === '') return 0;
                  const num = Number(val);
                  return isNaN(num) ? 0 : num;
                };

                const presRaw = (pageData?.graficaDesercion?.presencial || []).map(v => toNumber(v));
                const distRaw = (pageData?.graficaDesercion?.distancia || []).map(v => toNumber(v));

                const pres = presRaw.length >= 5 ? presRaw.slice(0,5) : [...presRaw, ...Array(5 - presRaw.length).fill(0)];
                const dist = distRaw.length >= 5 ? distRaw.slice(0,5) : [...distRaw, ...Array(5 - distRaw.length).fill(0)];

                const años = ["2026", "2027", "2028", "2029", "2030"];
                const colorDist = "#4A86C8";
                const colorPres = "#F5D97A";

                const W = 900;
                const H = 400;
                const padL = 20;
                const padR = 20;
                const padTop = 40;
                const padBot = 70;

                const plotW = W - padL - padR;
                const plotH = H - padTop - padBot;
                const base = padTop + plotH;
                const n = años.length;
                const step = plotW / n;
                const colW = step * 0.6;

                const valoresSuma = pres.map((p, i) => p + dist[i]).filter(v => !isNaN(v));
                const maxVal = valoresSuma.length > 0 ? Math.max(...valoresSuma, 1) : 1;
                const sc = plotH / maxVal;

                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
                    {años.map((y, i) => {
                      const cx = padL + i * step + step / 2;
                      const x = cx - colW / 2;
                      const hP = pres[i] * sc;
                      const hD = dist[i] * sc;
                      return (
                        <g key={y}>
                          <rect x={x} y={base - hP} width={colW} height={Math.max(hP, 1)} fill={colorPres} />
                          <rect x={x} y={base - hP - hD} width={colW} height={Math.max(hD, 1)} fill={colorDist} />
                          {hP > 5 && (
                            <text x={cx} y={base - hP / 2} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="#333">
                              {Math.round(pres[i])}%
                            </text>
                          )}
                          {hD > 5 && (
                            <text x={cx} y={base - hP - hD / 2} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="white">
                              {Math.round(dist[i])}%
                            </text>
                          )}
                          <text x={cx} y={base + 14} textAnchor="middle" fontSize="22" fill="#333">{y}</text>
                        </g>
                      );
                    })}
                    <rect x={W / 2 - 90} y={H - 15} width={12} height={9} fill={colorPres} />
                    <text x={W / 2 - 70} y={H - 8} fontSize="22" fill="#333">Presencial</text>
                    <rect x={W / 2 + 50} y={H - 15} width={12} height={9} fill={colorDist} />
                    <text x={W / 2 + 64} y={H - 8} fontSize="22" fill="#333">Distancia</text>
                  </svg>
                );
              })()}
            </div>
          </div>

          {/* Panel 3: Líneas */}
          <div
            key={`lineas-${centroId}`}
            style={{ flex: 1.5, display: "flex", flexDirection: "column", background: "white", minWidth: 0, animation: "slideInLeft 0.6s ease forwards" }}
          >
            <Banner text="Proyección estudiantes por modalidad" />
            <div style={{ flex: 1, width: "100%", overflow: "hidden" }}>
              {(() => {
                const yearsNum = [2026, 2027, 2028, 2029, 2030];
                const series = [
                  { label: "Profesional",     color: "#d4af37", values: pageData?.graficaLineas?.profesional     ?? [0,0,0,0,0] },
                  { label: "Maestría",        color: "#00aaff", values: pageData?.graficaLineas?.maestria        ?? [0,0,0,0,0] },
                  { label: "Especialización", color: "#e91e63", values: pageData?.graficaLineas?.especializacion ?? [0,0,0,0,0] },
                  { label: "Doctorado",       color: "#4caf50", values: pageData?.graficaLineas?.doctorado       ?? [0,0,0,0,0] },
                ];

                const W = 900;
                const H = 520;
                const padL = 60;
                const padR = 30;
                const padTop = 30;
                const padBot = 80;

                const plotW = W - padL - padR;
                const plotH = H - padTop - padBot;
                const base = padTop + plotH;

                const allV = series.flatMap(s => s.values);
                const maxV = Math.max(...allV, 1);
                const minV = Math.min(...allV.filter(v => v > 0), 0);

                const xP = (i) => padL + (i / (yearsNum.length - 1)) * plotW;
                const yP = (v) => padTop + plotH - ((v - minV) / (maxV - minV || 1)) * plotH;
                const ticks = 4;

                return (
                  <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", fontFamily: "Inter, sans-serif" }}>
                    {Array.from({ length: ticks + 1 }).map((_, i) => {
                      const y = padTop + (plotH / ticks) * i;
                      const val = Math.round(maxV - (maxV - minV) * (i / ticks));
                      return (
                        <g key={i}>
                          <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e0e0e0" strokeWidth="1.5" />
                          <text x={padL - 8} y={y} textAnchor="end" dominantBaseline="middle" fontSize="18" fill="#666">{val.toLocaleString("es-CO")}</text>
                        </g>
                      );
                    })}
                    {yearsNum.map((_, i) => (
                      <line key={i} x1={xP(i)} y1={padTop} x2={xP(i)} y2={base} stroke="#e8e8e8" strokeWidth="1.5" strokeDasharray="4,4" />
                    ))}
                    {series.map(s => (
                      <polyline key={s.label} points={s.values.map((v, i) => `${xP(i)},${yP(v)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="4" strokeLinejoin="round" />
                    ))}
                    {series.map((s, si) =>
                      s.values.map((v, i) => {
                        const offsetY = si % 2 === 0 ? -16 : 16;
                        return (
                          <g key={`${s.label}-${i}`}>
                            <circle cx={xP(i)} cy={yP(v)} r="5" fill={s.color} stroke="white" strokeWidth="2" />
                            {v > 0 && (
                              <text x={xP(i)} y={yP(v) + offsetY} textAnchor="middle" fontSize="18" fill={s.color} fontWeight="600">
                                {Math.round(v).toLocaleString("es-CO")}
                              </text>
                            )}
                          </g>
                        );
                      })
                    )}
                    {yearsNum.map((y, i) => (
                      <text key={y} x={xP(i)} y={base + 32} textAnchor="middle" fontSize="18" fill="#333">{y}</text>
                    ))}
                    {series.map((s, i) => {
                      const col = i % 2;
                      const row = Math.floor(i / 2);
                      const lx = W / 2 - 200 + col * 200;
                      const ly = H - 32 + row * 26;
                      return (
                        <g key={`leg-${s.label}`}>
                          <line x1={lx} y1={ly} x2={lx + 28} y2={ly} stroke={s.color} strokeWidth="4" />
                          <circle cx={lx + 14} cy={ly} r="5" fill={s.color} />
                          <text x={lx + 42} y={ly + 2} fontSize="18" fill="#000000" dominantBaseline="middle">{s.label}</text>
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