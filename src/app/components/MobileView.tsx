import React, { useRef, useEffect, useState } from 'react';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage1 } from '../../models/proyeccionPage1Model';
import { transformarPage2 } from '../../models/proyeccionEsModel';
import { useAnimatedRows } from '../../hooks/useAnimatedRows';

// ─────────────────────────────────────────────
// CONSTANTES DE COLOR
// ─────────────────────────────────────────────
export const BLUE       = '#012657';
export const BLUE_LIGHT = '#C3E0FB';
export const BLUE_MED   = '#AFC4D8';
export const PURPLE     = '#C7B8E7';
export const PURPLE2    = '#9977bd';
export const RED_ROW    = '#FDEDEC';
export const YELLOW     = '#FFFF99';
export const GREEN_HDR  = '#C6EFCE';
export const GRAY_BAN   = '#D9D9D9';

export const STICKY_BG = '#EEF4FB';
export const B = `0.5px solid #b8c8d8`;
export const P = '3px 5px';

// ─────────────────────────────────────────────
// MAPA DE LÍDERES
// ─────────────────────────────────────────────
const NOMBRE_LIDER: Record<string, string> = {
  'centro-engativa':               '',
  'centro-kennedy':                'Edgar Germán Martínez',
  'centro-santa-fe-las-cruces':    'Liliana Milena Castro Bastidas',
  'centro-perdomo-ciudad-bolivar': 'Edgar Germán Martínez',
  'centro-san-cristobal-usaquen':  'Edgar Alirio Aguirre Buenaventura',
};

// ─────────────────────────────────────────────
// MAPAS DE IMÁGENES
// ─────────────────────────────────────────────
const MAPA_IMAGENES: Record<string, string> = {
  'centro-engativa':               '/engativa.png',
  'centro-kennedy':                '/Kennedy.png',
  'centro-santa-fe-las-cruces':    '/cruces.png',
  'centro-perdomo-ciudad-bolivar': '/perdomo.png',
  'centro-san-cristobal-usaquen':  '/sancristobal.png',
};
const CONTEXTO_IMAGENES: Record<string, string> = {
  'centro-engativa':               '/contexto-engativa.png',
  'centro-kennedy':                '/contexto-kennedy.png',
  'centro-santa-fe-las-cruces':    '/contexto-cruces.png',
  'centro-perdomo-ciudad-bolivar': '/contexto-perdomo.png',
  'centro-san-cristobal-usaquen':  '/contexto-sancristobal.png',
};
const EBITDA_IMAGENES: Record<string, string> = {
  'centro-engativa':               '/ebitda_engativa.png',
  'centro-kennedy':                '/ebitda_kennedy.png',
  'centro-santa-fe-las-cruces':    '/ebitda_cruces.png',
  'centro-perdomo-ciudad-bolivar': '/ebitda_perdomo.png',
  'centro-san-cristobal-usaquen':  '/ebitda_usaquen.png',
};

// ─────────────────────────────────────────────
// HELPERS DE ESTILO
// ─────────────────────────────────────────────
export const thBase = (
  bg: string,
  align: 'left' | 'center' | 'right' = 'center',
  color = '#000',
): React.CSSProperties => ({
  border: B, backgroundColor: bg, color, fontWeight: 700,
  fontSize: 9, textAlign: align, padding: P, whiteSpace: 'nowrap',
});

export const tdBase = (
  align: 'left' | 'center' | 'right' = 'right',
  bg = 'white',
  bold = false,
  color = '#000',
): React.CSSProperties => ({
  border: B, backgroundColor: bg, fontWeight: bold ? 700 : 400,
  fontSize: 9, textAlign: align, padding: P, whiteSpace: 'nowrap', color,
});

// ─────────────────────────────────────────────
// HOOK REVEAL
// ─────────────────────────────────────────────
function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.07 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

// ─────────────────────────────────────────────
// COMPONENTES BASE
// ─────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useInView(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        minWidth: 0,
        width: '90%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function MBanner({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: GRAY_BAN,
      clipPath: 'polygon(0.5% 0%, 100% 0%, 99.5% 100%, 0% 100%)',
      padding: '4px 14px',
      marginBottom: 6,
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>{children}</span>
    </div>
  );
}

export function Card({ children, mb = 10 }: { children: React.ReactNode; mb?: number }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      padding: '10px',
      marginBottom: mb,
      border: `1.5px solid ${BLUE}`,
      boxShadow: '0 2px 10px rgba(1,38,87,0.12)',
      minWidth: 0,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// STICKY TABLE
// ─────────────────────────────────────────────
export function StickyScrollTable({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="scroll-table-wrap"
      style={{
        position: 'relative',
        overflowX: 'auto',
        overflowY: 'visible',
        WebkitOverflowScrolling: 'touch' as any,
        width: '100%',
        display: 'block',
      }}
    >
      <table style={{
        borderCollapse: 'separate',
        borderSpacing: 0,
        tableLayout: 'auto',
        whiteSpace: 'nowrap',
        fontSize: 8,
      }}>
        {children}
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// ESTILOS STICKY
// ─────────────────────────────────────────────
export const SC_P  = '2px 4px';
export const SC_FS = 8;
export const STICKY_W      = 90;
export const STICKY_W1     = 36;
export const STICKY_SHADOW = '3px 0 8px rgba(1,38,87,0.18)';

export const scTd = (
  align: 'left' | 'center' | 'right' = 'right',
  bg = 'white',
  bold = false,
  color = '#000',
): React.CSSProperties => ({
  border: B, backgroundColor: bg, fontWeight: bold ? 700 : 400,
  fontSize: SC_FS, textAlign: align, padding: SC_P,
  whiteSpace: 'nowrap', color, position: 'relative', zIndex: 0,
});

export const stickyThBlock = (bg = STICKY_BG): React.CSSProperties => ({
  border: B, backgroundColor: bg, fontWeight: 700, fontSize: SC_FS,
  padding: 0, whiteSpace: 'nowrap', position: 'sticky', left: 0,
  zIndex: 12, boxShadow: STICKY_SHADOW, minWidth: STICKY_W, width: STICKY_W,
});

export const stickyTdBlock = (
  bg = STICKY_BG,
  color = BLUE,
): React.CSSProperties => ({
  border: B, backgroundColor: bg, fontSize: SC_FS, padding: 0,
  whiteSpace: 'nowrap', position: 'sticky', left: 0, zIndex: 11,
  boxShadow: STICKY_SHADOW, minWidth: STICKY_W, width: STICKY_W,
  verticalAlign: 'middle', color,
});

export function StickyInner({
  nivel, modalidad,
  nivelBg = STICKY_BG, nivelColor = BLUE,
  modBg = STICKY_BG, modColor = BLUE, modBold = false,
}: {
  nivel?: React.ReactNode; modalidad?: React.ReactNode;
  nivelBg?: string; nivelColor?: string;
  modBg?: string; modColor?: string; modBold?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '100%', minHeight: 22 }}>
      {nivel !== undefined && (
        <div style={{
          width: STICKY_W1, minWidth: STICKY_W1, backgroundColor: nivelBg,
          color: nivelColor, fontWeight: 700, fontSize: SC_FS, padding: SC_P,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRight: `0.5px solid rgba(1,38,87,0.18)`,
          textAlign: 'center', lineHeight: 1.2,
        }}>
          {nivel}
        </div>
      )}
      <div style={{
        flex: 1, backgroundColor: modBg, color: modColor,
        fontWeight: modBold ? 700 : 400, fontSize: SC_FS,
        padding: SC_P, display: 'flex', alignItems: 'center',
      }}>
        {modalidad}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-COMPONENTES DE TABLA
// ─────────────────────────────────────────────
const YEARS5 = ['2026', '2027', '2028', '2029', '2030'];

function YC({ d, color = '#000', bg = 'white' }: {
  d: { nuevos: string; continuos: string; totales: string };
  color?: string; bg?: string;
}) {
  return (
    <>
      <td style={scTd('right', bg, false, color)}>{d.nuevos}</td>
      <td style={scTd('right', bg, false, color)}>{d.continuos}</td>
      <td style={scTd('right', bg, false, color)}>{d.totales}</td>
    </>
  );
}

const dataTh: React.CSSProperties = {
  border: B, backgroundColor: BLUE_LIGHT, fontWeight: 700,
  fontSize: SC_FS, textAlign: 'center', padding: SC_P,
  position: 'relative', zIndex: 0,
};

function TableHead() {
  return (
    <thead>
      <tr>
        <th rowSpan={2} style={{ ...stickyThBlock(), verticalAlign: 'middle' }}>
          <StickyInner nivel="Nivel" modalidad="Period." modBold />
        </th>
        {YEARS5.map((y) => <th key={y} colSpan={3} style={dataTh}>{y}</th>)}
      </tr>
      <tr>
        {YEARS5.map((y) => (
          <React.Fragment key={y}>
            {['Nvo', 'Cont', 'Tot'].map((s) => (
              <th key={s} style={{ ...dataTh, fontSize: 7 }}>{s}</th>
            ))}
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
}

function SeparatorRow() {
  return (
    <tr style={{ height: 3 }}>
      <td colSpan={16} style={{ padding: 0, backgroundColor: BLUE_LIGHT, height: 3 }} />
    </tr>
  );
}

// ─────────────────────────────────────────────
// CELDAS MATRÍCULAS 2026
// ─────────────────────────────────────────────
const FONT_D = '9px';
const RED    = '#C00000';
const GREEN2 = '#107C10';

const mc = (align: 'left' | 'right' | 'center' = 'right', bg = 'white'): React.CSSProperties => ({
  border: B, fontSize: FONT_D, padding: P, textAlign: align,
  fontWeight: 400, backgroundColor: bg, color: '#000',
});
const mcY = (): React.CSSProperties => ({
  border: B, fontSize: FONT_D, padding: P, textAlign: 'right',
  fontWeight: 400, backgroundColor: YELLOW, color: '#000',
});
const mcT = (align: 'left' | 'right' | 'center' = 'right'): React.CSSProperties => ({
  border: B, fontSize: FONT_D, padding: P, textAlign: align,
  fontWeight: 700, backgroundColor: YELLOW, color: '#000',
});

function MatCells({ d, isTotalRow = false, isYellow = false }: {
  d: any; isTotalRow?: boolean; isYellow?: boolean;
}) {
  if (!d || typeof d !== 'object')
    return <><td style={mc()}>-</td><td style={mc()}>-</td><td style={mc()}>-</td><td style={mc()}>-</td></>;
  const { proyectado = '-', matriculado = '-', variacion = '-', porcentaje = '-' } = d;
  const colorVar = d.esPositivo ? GREEN2 : RED;
  const colorPct = parseFloat(String(porcentaje)) >= 0 ? GREEN2 : RED;
  return (
    <>
      <td style={isTotalRow ? mcT() : isYellow ? mcY() : mc()}>{proyectado}</td>
      <td style={isTotalRow ? mcT() : isYellow ? mcY() : mc()}>{matriculado}</td>
      <td style={{ ...(isTotalRow ? mcT() : mc()), color: colorVar }}>{variacion}</td>
      <td style={{ ...(isTotalRow ? mcT() : mc()), color: colorPct }}>{porcentaje}</td>
    </>
  );
}

// ─────────────────────────────────────────────
// GRÁFICAS
// ─────────────────────────────────────────────
function DesercionChart({ data }: { data: any }) {
  const toN = (v: any) => { const n = Number(v); return isNaN(n) ? 0 : n; };
  const años = ['2026', '2027', '2028', '2029', '2030'];
  const pres = (data.presencial || []).slice(0, 5).map(toN);
  const dist = (data.distancia  || []).slice(0, 5).map(toN);
  const maxVal = Math.max(...pres.map((p: number, i: number) => p + dist[i]), 1);
  const W = 900, H = 400, pL = 20, pR = 20, pT = 40, pB = 70;
  const plotW = W - pL - pR, plotH = H - pT - pB, base = pT + plotH;
  const step = plotW / años.length, colW = step * 0.6, sc = plotH / maxVal;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {años.map((y, i) => {
        const cx = pL + i * step + step / 2, x = cx - colW / 2;
        const hP = pres[i] * sc, hD = dist[i] * sc;
        return (
          <g key={y}>
            <rect x={x} y={base - hP}      width={colW} height={Math.max(hP, 1)} fill="#F5D97A" />
            <rect x={x} y={base - hP - hD} width={colW} height={Math.max(hD, 1)} fill="#4A86C8" />
            {hP > 5 && <text x={cx} y={base - hP / 2}      textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="#333">{Math.round(pres[i])}%</text>}
            {hD > 5 && <text x={cx} y={base - hP - hD / 2} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="white">{Math.round(dist[i])}%</text>}
            <text x={cx} y={base + 14} textAnchor="middle" fontSize="22" fill="#333">{y}</text>
          </g>
        );
      })}
      <rect x={W / 2 - 90} y={H - 15} width={12} height={9} fill="#F5D97A" />
      <text x={W / 2 - 70} y={H - 8} fontSize="22" fill="#333">Presencial</text>
      <rect x={W / 2 + 50} y={H - 15} width={12} height={9} fill="#4A86C8" />
      <text x={W / 2 + 64} y={H - 8} fontSize="22" fill="#333">Distancia</text>
    </svg>
  );
}

function LineasChart({ data }: { data: any }) {
  const yearsNum = [2026, 2027, 2028, 2029, 2030];
  const series = [
    { label: 'Profesional',     color: '#d4af37', values: data.profesional     ?? [] },
    { label: 'Maestría',        color: '#00aaff', values: data.maestria        ?? [] },
    { label: 'Especialización', color: '#e91e63', values: data.especializacion ?? [] },
    { label: 'Doctorado',       color: '#4caf50', values: data.doctorado       ?? [] },
  ];
  const W = 900, H = 520, pL = 60, pR = 30, pT = 30, pB = 80;
  const plotW = W - pL - pR, plotH = H - pT - pB, base = pT + plotH;
  const allV = series.flatMap((s) => s.values);
  const maxV = Math.max(...allV, 1), minV = Math.min(...allV.filter((v: any) => v > 0), 0);
  const xP = (i: number) => pL + (i / (yearsNum.length - 1)) * plotW;
  const yP = (v: number) => pT + plotH - ((v - minV) / (maxV - minV || 1)) * plotH;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block', fontFamily: 'Inter,sans-serif' }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = pT + (plotH / 4) * i, val = Math.round(maxV - (maxV - minV) * (i / 4));
        return (
          <g key={i}>
            <line x1={pL} y1={y} x2={W - pR} y2={y} stroke="#e0e0e0" strokeWidth="1.5" />
            <text x={pL - 8} y={y} textAnchor="end" dominantBaseline="middle" fontSize="18" fill="#666">{val.toLocaleString('es-CO')}</text>
          </g>
        );
      })}
      {yearsNum.map((_, i) => <line key={i} x1={xP(i)} y1={pT} x2={xP(i)} y2={base} stroke="#e8e8e8" strokeWidth="1.5" strokeDasharray="4,4" />)}
      {series.map((s) => <polyline key={s.label} points={s.values.map((v: any, i: number) => `${xP(i)},${yP(v)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="4" strokeLinejoin="round" />)}
      {series.map((s, si) => s.values.map((v: any, i: number) => {
        const offsetY = si % 2 === 0 ? -16 : 16;
        return (
          <g key={`${s.label}-${i}`}>
            <circle cx={xP(i)} cy={yP(v)} r="5" fill={s.color} stroke="white" strokeWidth="2" />
            {v > 0 && <text x={xP(i)} y={yP(v) + offsetY} textAnchor="middle" fontSize="18" fill={s.color} fontWeight="600">{Math.round(v).toLocaleString('es-CO')}</text>}
          </g>
        );
      }))}
      {yearsNum.map((y, i) => <text key={y} x={xP(i)} y={base + 32} textAnchor="middle" fontSize="18" fill="#333">{y}</text>)}
      {series.map((s, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const lx = W / 2 - 200 + col * 200, ly = H - 32 + row * 26;
        return (
          <g key={`leg-${s.label}`}>
            <line x1={lx} y1={ly} x2={lx + 28} y2={ly} stroke={s.color} strokeWidth="4" />
            <circle cx={lx + 14} cy={ly} r="5" fill={s.color} />
            <text x={lx + 42} y={ly + 2} fontSize="18" fill="#000" dominantBaseline="middle">{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
// VISTA MÓVIL PRINCIPAL
// ─────────────────────────────────────────────
interface MobileContentProps { centroId: string; }

export function MobileContent({ centroId }: MobileContentProps) {
  const { data, loading, centroNombre } = useObservatorio(centroId);
  const p1 = transformarPage1(data);
  const p2 = transformarPage2(data);

  const visibleIndicators = useAnimatedRows(centroId, p1.indicatorsRows.length, 80);
  const visibleStudents   = useAnimatedRows(centroId, 3, 100);
  const visibleT1         = useAnimatedRows(centroId, 7, 70);
  const visibleT2         = useAnimatedRows(centroId, 3, 80);
  const visibleT3         = useAnimatedRows(centroId, 7, 60);
  const visibleT4         = useAnimatedRows(centroId, 7, 70);

  const ss = p1.studentSummary ?? {
    pregradoDistancia: '-', pregradoPresencial: '-', pregradoTotal: '-',
    posgradoDistancia: '-', posgradoPresencial: '-', posgradoTotal: '-',
    totalGeneralDistancia: '-', totalGeneralPresencial: '-', totalGeneral: '-',
    hombres: '-', mujeres: '-',
  };

  const años6       = ['2025', '2026', '2027', '2028', '2029', '2030 '];
  const mapaSrc     = MAPA_IMAGENES[centroId]     || '/engativa.png';
  const contextoSrc = CONTEXTO_IMAGENES[centroId] || '/contexto-engativa.png';
  const ebitdaSrc   = EBITDA_IMAGENES[centroId]   || '/ebitda_engativa.png';
  const subtitle    = `Centro Universitario ${centroNombre}`;
  const lider       = NOMBRE_LIDER[centroId] || '';

  const FullTable = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', ...style }}>
        {children}
      </table>
    </div>
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
      <span style={{ color: '#999', fontSize: 13 }}>Cargando datos...</span>
    </div>
  );

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box',
    }}>

      {/* ══ HEADER PAGE 1 ══ */}
      <Reveal delay={0}>
        <Card mb={10}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="/Logo UNIMINUTO.png" alt="Logo" style={{ height: 36, objectFit: 'contain' }} />
            <div style={{ flex: 1, margin: '0 8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: BLUE_LIGHT, clipPath: 'polygon(2% 0%,100% 0%,98% 100%,0% 100%)', padding: '4px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: BLUE, textAlign: 'center', lineHeight: 1.4 }}>
                  Centro Universitario<br />
                  {centroNombre}
                </span>
              </div>
            </div>
            <img src="/Logo_Acreditacion.png" alt="Acreditación" style={{ height: 30, objectFit: 'contain' }} />
          </div>
          <p style={{ textAlign: 'center', fontWeight: 700, fontSize: 12, color: '#222', margin: '8px 0 1px' }}>
            Ficha Centro Universitario
          </p>
          <p style={{ textAlign: 'center', fontSize: 10, color: '#555', margin: 0 }}>
            Líder: <strong style={{ color: BLUE }}>{lider}</strong>
          </p>
        </Card>
      </Reveal>

      {/* ══ MAPA ══ */}
      <Reveal delay={60}>
        <Card mb={10}>
          <img src={mapaSrc} alt="Mapa centro"
            style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 230 }} />
        </Card>
      </Reveal>

      {/* ══ ESTUDIANTES 2026 S1-Q1 ══ */}
      <Reveal delay={80}>
        <Card mb={10}>
          <MBanner>ESTUDIANTES CENTRO UNIVERSITARIO 2026 S1-Q1</MBanner>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>

            {/* Tabla izquierda */}
            <div style={{ flex: '0 0 58%', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thBase(BLUE_MED, 'left')}></th>
                    <th style={thBase(BLUE_MED)}>Dist.</th>
                    <th style={thBase(BLUE_MED)}>Presenc.</th>
                    <th style={thBase(BLUE_MED)}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={visibleStudents[0] ? 'row-animated' : 'row-hidden'}>
                    <td style={tdBase('left')}>1. Pregrado</td>
                    <td style={tdBase('right')}>{ss.pregradoDistancia}</td>
                    <td style={tdBase('right')}>{ss.pregradoPresencial}</td>
                    <td style={tdBase('right', PURPLE, true)}>{ss.pregradoTotal}</td>
                  </tr>
                  <tr className={visibleStudents[1] ? 'row-animated' : 'row-hidden'}>
                    <td style={tdBase('left')}>2. Posgrado</td>
                    <td style={tdBase('right')}>{ss.posgradoDistancia}</td>
                    <td style={tdBase('right')}>{ss.posgradoPresencial}</td>
                    <td style={tdBase('right', PURPLE, true)}>{ss.posgradoTotal}</td>
                  </tr>
                  <tr className={visibleStudents[2] ? 'row-animated' : 'row-hidden'}
                    style={{ backgroundColor: PURPLE, fontWeight: 600 }}>
                    <td style={tdBase('left', PURPLE, true)}>Total</td>
                    <td style={tdBase('right', PURPLE)}>{ss.totalGeneralDistancia}</td>
                    <td style={tdBase('right', PURPLE)}>{ss.totalGeneralPresencial}</td>
                    <td style={tdBase('right', PURPLE)}>{ss.totalGeneral}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              ── Bloque derecho: Total población / Hombres / Mujeres ──
              FIX: reducimos fontSize del label (8px), icono (14px) y
              número (11px) para que todo entre en el espacio disponible.
              minWidth:0 + overflow:hidden evitan que el flex desborde.
            */}
            <div style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderLeft: `1px solid ${BLUE}`,
              paddingLeft: 4,
              gap: 2,
            }}>
              {[
                { label: 'Total\npoblación', src: '/poblacion.png', value: ss.totalGeneral },
                { label: 'Hombres',          src: '/hombre.png',    value: ss.hombres },
                { label: 'Mujeres',          src: '/mujer.png',     value: ss.mujeres },
              ].map((item, idx, arr) => (
                <React.Fragment key={item.label}>
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 1,
                    minWidth: 0, overflow: 'hidden',
                  }}>
                    {/* Label reducido a 8px y sin whiteSpace forzado */}
                    <span style={{
                      color: BLUE, fontWeight: 600,
                      fontSize: 8,
                      textAlign: 'center',
                      lineHeight: 1.2,
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word',
                    }}>
                      {item.label}
                    </span>
                    {/* Icono más pequeño */}
                    <img src={item.src} style={{ height: 14, objectFit: 'contain' }} alt={item.label} />
                    {/* Número reducido a 11px */}
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: '#111',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.value}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div style={{ width: 1, height: 24, flexShrink: 0, backgroundColor: `${BLUE}44` }} />
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        </Card>
      </Reveal>

      {/* ══ CONTEXTO ══ */}
      <Reveal delay={80}>
        <Card mb={10}>
          <MBanner>CONTEXTO CENTRO UNIVERSITARIO</MBanner>
          <img src={contextoSrc} alt="Contexto"
            style={{ width: '100%', objectFit: 'contain', display: 'block', maxHeight: 270 }} />
        </Card>
      </Reveal>

      {/* ══ EBITDA ══ */}
      <Reveal delay={80}>
        <Card mb={10}>
          <MBanner>PROYECCIÓN INGRESOS – COSTOS Y GASTOS – EBITDA</MBanner>
          <img src={ebitdaSrc} alt="EBITDA" style={{ width: '100%', objectFit: 'contain', display: 'block' }} />
        </Card>
      </Reveal>

      {/* ══ INDICADORES ══ */}
      {p1.indicatorsRows.length > 0 && (
        <Reveal delay={60}>
          <Card mb={10}>
            <MBanner>PROYECCIÓN INDICADORES CENTRO UNIVERSITARIO</MBanner>
            <FullTable>
              <thead>
                <tr>
                  <th style={{ ...thBase(BLUE_LIGHT, 'left'), width: '32%' }}>Indicador</th>
                  {años6.map((a) => (
                    <th key={a} style={{ ...thBase(BLUE_LIGHT), width: `${68 / 6}%` }}>{a}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p1.indicatorsRows.map((row, i) => (
                  <tr key={i}
                    className={visibleIndicators[i] ? 'row-animated' : 'row-hidden'}
                    style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f5f7fb' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        ...tdBase(j === 0 ? 'left' : 'center', j === 0 ? RED_ROW : (i % 2 === 0 ? 'white' : '#f5f7fb'), j === 0),
                        overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </FullTable>
          </Card>
        </Reveal>
      )}

      {/* ══ HEADER PAGE 2 ══ */}
      <Reveal delay={0}>
        <Card mb={10}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="/Logo UNIMINUTO.png" alt="Logo" style={{ height: 36, objectFit: 'contain' }} />
            <div style={{ flex: 1, margin: '0 8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: BLUE_LIGHT, clipPath: 'polygon(2% 0%,100% 0%,98% 100%,0% 100%)', padding: '4px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: BLUE, whiteSpace: 'nowrap' }}>{subtitle}</span>
              </div>
            </div>
            <img src="/Logo_Acreditacion.png" alt="Acreditación" style={{ height: 30, objectFit: 'contain' }} />
          </div>
          <div style={{ marginTop: 5, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', backgroundColor: GRAY_BAN, clipPath: 'polygon(1% 0%,100% 0%,99% 100%,0% 100%)', padding: '3px 16px' }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#111' }}>Proyección estudiantes 2026–2030 S1/Q1 por Nivel Académico y Modalidad</span>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* ══ TABLA 1 — Nivel / Modalidad ══ */}
      <Reveal delay={60}>
        <Card mb={10}>
          <StickyScrollTable>
            <thead>
              <tr>
                <th rowSpan={2} style={{ ...stickyThBlock(), verticalAlign: 'middle' }}>
                  <StickyInner nivel="Nivel" modalidad="Modalidad" modBold />
                </th>
                {YEARS5.map((y) => <th key={y} colSpan={3} style={dataTh}>{y}</th>)}
              </tr>
              <tr>
                {YEARS5.map((y) => (
                  <React.Fragment key={y}>
                    {['Nvo', 'Cont', 'Tot'].map((s) => (
                      <th key={s} style={{ ...dataTh, fontSize: 7 }}>{s}</th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={visibleT1[0] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="1.Preg." modalidad="Presenc." /></td>
                {p2?.t1_pregPresencial?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[1] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Distancia" /></td>
                {p2?.t1_pregDistancia?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[2] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Total" modBold /></td>
                {p2?.t1_pregTotal?.map((d: any, i: number) => <YC key={i} d={d} color="#C00000" />)}
              </tr>
              <SeparatorRow />
              <tr className={visibleT1[3] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="2.Posg." modalidad="Presenc." /></td>
                {p2?.t1_posPresencial?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[4] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Distancia" /></td>
                {p2?.t1_posDistancia?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT1[5] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Total" modBold /></td>
                {p2?.t1_posTotal?.map((d: any, i: number) => <YC key={i} d={d} color="#C00000" />)}
              </tr>
              <tr className={visibleT1[6] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock(PURPLE2, '#fff')}>
                  <StickyInner nivel="Tot." modalidad="Total" nivelBg={PURPLE2} nivelColor="#fff" modBg={PURPLE2} modColor="#fff" modBold />
                </td>
                {p2?.t1_grandTotal?.map((d: any, i: number) => <YC key={i} d={d} bg={PURPLE2} color="#fff" />)}
              </tr>
            </tbody>
          </StickyScrollTable>
        </Card>
      </Reveal>

      {/* ══ TABLA 2 — Por Modalidad ══ */}
      <Reveal delay={60}>
        <Card mb={10}>
          <StickyScrollTable>
            <thead>
              <tr>
                <th rowSpan={2} style={{ ...stickyThBlock(), verticalAlign: 'middle', textAlign: 'center', padding: SC_P }}>
                  Modalidad
                </th>
                {YEARS5.map((y) => <th key={y} colSpan={3} style={dataTh}>{y}</th>)}
              </tr>
              <tr>
                {YEARS5.map((y) => (
                  <React.Fragment key={y}>
                    {['Nvo', 'Cont', 'Tot'].map((s) => (
                      <th key={s} style={{ ...dataTh, fontSize: 7 }}>{s}</th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Presencial', data: p2?.t2_modPresencial, vis: visibleT2[0] },
                { label: 'Distancia',  data: p2?.t2_modDistancia,  vis: visibleT2[1] },
              ].map(({ label, data, vis }) => (
                <tr key={label} className={vis ? 'row-animated' : 'row-hidden'}>
                  <td style={{ ...stickyTdBlock(), textAlign: 'center', padding: SC_P, fontWeight: 700 }}>{label}</td>
                  {data?.map((d: any, i: number) => <YC key={i} d={d} />)}
                </tr>
              ))}
              <tr className={visibleT2[2] ? 'row-animated' : 'row-hidden'}>
                <td style={{ ...stickyTdBlock(PURPLE2, '#fff'), textAlign: 'center', padding: SC_P, fontWeight: 700 }}>Total</td>
                {p2?.t2_modTotal?.map((d: any, i: number) => <YC key={i} d={d} bg={PURPLE2} color="#fff" />)}
              </tr>
            </tbody>
          </StickyScrollTable>
        </Card>
      </Reveal>

      {/* ══ TABLA 3 — Matrículas 2026 ══ */}
      <Reveal delay={60}>
        <Card mb={10}>
          <MBanner>Matrículas 2026 S1/Q1 — Nivel Académico y Modalidad</MBanner>
          {(['nuevos', 'continuos', 'totales'] as const).map((tipo) => (
            <div key={tipo} style={{ marginBottom: 8 }}>
              <div style={{ backgroundColor: BLUE_LIGHT, border: B, borderRadius: 3, padding: '2px 8px', marginBottom: 4, display: 'inline-block' }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: BLUE, textTransform: 'capitalize' }}>
                  Estudiantes {tipo}
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...thBase(GREEN_HDR, 'left'), width: '28%' }}>Nivel</th>
                    <th style={{ ...thBase(GREEN_HDR, 'left'), width: '20%' }}></th>
                    <th style={thBase(GREEN_HDR)}>Proy.</th>
                    <th style={thBase(GREEN_HDR)}>Matr.</th>
                    <th style={thBase(GREEN_HDR)}>Var.</th>
                    <th style={thBase(GREEN_HDR)}>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={visibleT3[0] ? 'row-animated' : 'row-hidden'}>
                    <td rowSpan={2} style={{ ...tdBase('left', 'white', true), verticalAlign: 'middle' }}>1.Pregrado</td>
                    <td style={mc('left')}>Presencial</td>
                    <MatCells d={p2?.t3_matriculas2026?.pregradoPresencial?.[tipo]} isYellow={tipo === 'totales'} />
                  </tr>
                  <tr className={visibleT3[1] ? 'row-animated' : 'row-hidden'}>
                    <td style={mc('left')}>Distancia</td>
                    <MatCells d={p2?.t3_matriculas2026?.pregradoDistancia?.[tipo]} isYellow={tipo === 'totales'} />
                  </tr>
                  <tr className={visibleT3[2] ? 'row-animated' : 'row-hidden'}>
                    <td colSpan={2} style={mcT('left')}>Total Preg.</td>
                    <MatCells d={p2?.t3_matriculas2026?.pregradoTotal?.[tipo]} isTotalRow />
                  </tr>
                  <tr className={visibleT3[3] ? 'row-animated' : 'row-hidden'}>
                    <td rowSpan={2} style={{ ...tdBase('left', 'white', true), verticalAlign: 'middle' }}>2.Posgrado</td>
                    <td style={mc('left')}>Presencial</td>
                    <MatCells d={p2?.t3_matriculas2026?.posgradoPresencial?.[tipo]} isYellow={tipo === 'totales'} />
                  </tr>
                  <tr className={visibleT3[4] ? 'row-animated' : 'row-hidden'}>
                    <td style={mc('left')}>Distancia</td>
                    <MatCells d={p2?.t3_matriculas2026?.posgradoDistancia?.[tipo]} isYellow={tipo === 'totales'} />
                  </tr>
                  <tr className={visibleT3[5] ? 'row-animated' : 'row-hidden'}>
                    <td colSpan={2} style={mcT('left')}>Total Posg.</td>
                    <MatCells d={p2?.t3_matriculas2026?.posgradoTotal?.[tipo]} isTotalRow />
                  </tr>
                  <tr className={visibleT3[6] ? 'row-animated' : 'row-hidden'}>
                    <td colSpan={2} style={{ ...mcT('left'), backgroundColor: PURPLE2, color: '#fff' }}>Total</td>
                    <MatCells d={p2?.t3_matriculas2026?.totalGeneral?.[tipo]} isTotalRow />
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </Card>
      </Reveal>

      {/* ══ TABLA 4 — Periodicidad ══ */}
      <Reveal delay={60}>
        <Card mb={10}>
          <MBanner>Proyección estudiantes 2026–2030 por Nivel y Periodicidad</MBanner>
          <StickyScrollTable>
            <TableHead />
            <tbody>
              <tr className={visibleT4[0] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="1.Preg." modalidad="Semestral" /></td>
                {p2?.t4_pregSemestral?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[1] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Cuatrim." /></td>
                {p2?.t4_pregCuatrimestral?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[2] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Total" modBold /></td>
                {p2?.t4_pregTotal?.map((d: any, i: number) => <YC key={i} d={d} color="#C00000" />)}
              </tr>
              <SeparatorRow />
              <tr className={visibleT4[3] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="2.Posg." modalidad="Semestral" /></td>
                {p2?.t4_posSemestral?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[4] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Cuatrim." /></td>
                {p2?.t4_posCuatrimestral?.map((d: any, i: number) => <YC key={i} d={d} />)}
              </tr>
              <tr className={visibleT4[5] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock()}><StickyInner nivel="" modalidad="Total" modBold /></td>
                {p2?.t4_posTotal?.map((d: any, i: number) => <YC key={i} d={d} color="#C00000" />)}
              </tr>
              <tr className={visibleT4[6] ? 'row-animated' : 'row-hidden'}>
                <td style={stickyTdBlock(PURPLE2, '#fff')}>
                  <StickyInner nivel="Tot." modalidad="Total" nivelBg={PURPLE2} nivelColor="#fff" modBg={PURPLE2} modColor="#fff" modBold />
                </td>
                {p2?.t4_grandTotal?.map((d: any, i: number) => <YC key={i} d={d} bg={PURPLE2} color="#fff" />)}
              </tr>
            </tbody>
          </StickyScrollTable>
        </Card>
      </Reveal>

      {/* ══ OFERTA ACADÉMICA ══ */}
      {p2?.graficaOferta && (
        <Reveal delay={60}>
          <Card mb={10}>
            <MBanner>Proyección Oferta Académica</MBanner>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...thBase(BLUE_LIGHT, 'left'), width: '30%' }}>Periodicidad</th>
                  {YEARS5.map((y) => <th key={y} style={thBase(BLUE_LIGHT)}>{y}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: '⊟ 1.Pregrado', data: p2.graficaOferta.pregrado,             bold: true },
                  { label: '  Presencial',  data: p2.graficaOferta.pregradoSemestral,     bold: false },
                  { label: '  Distancia',   data: p2.graficaOferta.pregradoCuatrimestral, bold: false },
                  { label: '⊟ 2.Posgrado', data: p2.graficaOferta.posgrado,             bold: true },
                  { label: '  Presencial',  data: p2.graficaOferta.posgradoSemestral,     bold: false },
                  { label: '  Distancia',   data: p2.graficaOferta.posgradoCuatrimestral, bold: false },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f5f7fb' }}>
                    <td style={{ ...tdBase('left', 'inherit', row.bold), whiteSpace: 'pre' }}>{row.label}</td>
                    {(row.data || []).map((v: any, j: number) => (
                      <td key={j} style={tdBase('center', 'inherit', row.bold)}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
      )}

      {/* ══ DESERCIÓN ══ */}
      {p2?.graficaDesercion && (
        <Reveal delay={60}>
          <Card mb={10}>
            <MBanner>Proyección Deserción por Centro Universitario</MBanner>
            <DesercionChart data={p2.graficaDesercion} />
          </Card>
        </Reveal>
      )}

      {/* ══ LÍNEAS ══ */}
      {p2?.graficaLineas && (
        <Reveal delay={60}>
          <Card mb={10}>
            <MBanner>Proyección estudiantes por modalidad S1-Q1</MBanner>
            <LineasChart data={p2.graficaLineas} />
          </Card>
        </Reveal>
      )}

      <div style={{ height: 16 }} />
    </div>
  );
}