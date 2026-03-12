import React, { useRef, useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { MobileContent } from './MobileView';
import { BLUE, BLUE_LIGHT, BLUE_MED } from './MobileView';

// ─────────────────────────────────────────────
// CENTROS
// ─────────────────────────────────────────────
const CENTROS = [
  { id: 'centro-engativa',               nombre: 'Especial Minuto de Dios - Engativá' },
  { id: 'centro-kennedy',                nombre: 'Kennedy' },
  { id: 'centro-santa-fe-las-cruces',    nombre: 'Las Cruces - Santa Fe' },
  { id: 'centro-perdomo-ciudad-bolivar', nombre: 'Perdomo - Ciudad Bolívar' },
  { id: 'centro-san-cristobal-usaquen',  nombre: 'San Cristóbal Norte - Usaquén' },
];

const TOTAL_PAGES = 2;
const PAGE_W_PX   = 1122;
const PAGE_H_PX   = 794;

// ─────────────────────────────────────────────
// HELPERS DESKTOP
// ─────────────────────────────────────────────
function NavBtn({
  dir,
  currentPage,
  onNavigate,
}: {
  dir: 'prev' | 'next';
  currentPage: number;
  onNavigate: (page: number) => void;
}) {
  const disabled = dir === 'prev' ? currentPage === 1 : currentPage === TOTAL_PAGES;
  return (
    <button
      onClick={() => onNavigate(dir === 'prev' ? currentPage - 1 : currentPage + 1)}
      disabled={disabled}
      style={{
        width: 34, height: 34, borderRadius: '50%', border: 'none', fontSize: 22,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? '#8a9bb5' : '#ffc000',
        color: '#012657', fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: disabled ? 'none' : '0 2px 8px rgba(255,192,0,0.4)',
      }}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export function UniversityProfileDashboard() {
  const [currentPage, setCurrentPage]           = useState(1);
  const [centroSeleccionado, setCentro]         = useState(CENTROS[0].id);
  const [zoomLevel, setZoomLevel]               = useState(0.85);
  const [mobileBubbleOpen, setMobileBubbleOpen] = useState(false);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  // ── Print ──
  const handlePrint = () => {
    const el1 = ref1.current, el2 = ref2.current;
    if (!el1 || !el2) return;
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try { return Array.from(sheet.cssRules).map((r) => r.cssText).join('\n'); }
        catch { return ''; }
      })
      .join('\n');
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      position: 'fixed', top: '0', left: '0',
      width: '297mm', height: '210mm',
      border: 'none', visibility: 'hidden', zIndex: '-1',
    });
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><title>Impresión</title>
      <style>
        @page { size: 297mm 210mm; margin: 0; }
        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-sizing: border-box;
        }
        html, body { margin: 0; padding: 0; background: white; }
        .sheet { width: 297mm; height: 210mm; overflow: hidden; page-break-after: always; page-break-inside: avoid; }
        .sheet:last-child { page-break-after: avoid; }
        .sheet-inner { width: 297mm; height: 210mm; transform-origin: top left; }
        ${styles}
      </style>
      <link rel="stylesheet" href="/index.css"/>
    </head><body>
      <div class="sheet"><div class="sheet-inner">${el1.outerHTML}</div></div>
      <div class="sheet"><div class="sheet-inner">${el2.outerHTML}</div></div>
    </body></html>`);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 2000);
    }, 800);
  };

  // ── Zoom ──
  const ZOOM_MIN = 0.4, ZOOM_MAX = 1.5, ZOOM_STEP = 0.05;
  const zoomIn  = () => setZoomLevel((z) => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX));
  const zoomOut = () => setZoomLevel((z) => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN));
  const scaledW = PAGE_W_PX * zoomLevel;
  const scaledH = PAGE_H_PX * zoomLevel;

  return (
    <>
      {/* ══ ESTILOS GLOBALES ══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html {
          overflow-x: hidden;
          width: 100%;
        }
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background: #011a3d;
          overflow-x: hidden;
          min-width: 0;
          width: 100%;
        }
        #root, [data-reactroot] {
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
        }
        @media print { .no-print { display: none !important; } }

        /*
          ── Breakpoint móvil / desktop ──
          Bajado de 900px → 640px para que el desborde de tablas anchas
          nunca ocurra en la vista móvil (tablas horizontalmente scrolleables).
          Por encima de 640px el usuario ya tiene espacio para la vista desktop.
        */
        @media screen and (max-width: 640px) {
          .vista-desktop { display: none !important; }
          .vista-movil   { display: flex !important; }
        }
        @media screen and (min-width: 641px) {
          .vista-movil   { display: none !important; }
          .vista-desktop { display: flex !important; }
        }
        .vista-movil {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        /* ── Scrollbars ── */
        .scroll-area::-webkit-scrollbar          { width: 6px; height: 6px; }
        .scroll-area::-webkit-scrollbar-track    { background: #011a3d; }
        .scroll-area::-webkit-scrollbar-thumb    { background: #012657; border-radius: 3px; }

        .scroll-table-wrap::-webkit-scrollbar       { height: 4px; }
        .scroll-table-wrap::-webkit-scrollbar-track { background: #f0f4f8; border-radius: 2px; }
        .scroll-table-wrap::-webkit-scrollbar-thumb { background: ${BLUE_MED}; border-radius: 2px; }
        .scroll-table-wrap::-webkit-scrollbar-thumb:hover { background: ${BLUE}; }

        /* ── FAB móvil ── */
        .fab-container {
          position: fixed;
          bottom: 24px;
          right: 18px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          transform: translateZ(0);
          will-change: transform;
        }
        .bubble-trigger { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .bubble-trigger:active { transform: scale(0.91) !important; }
        .bubble-panel {
          animation: bubbleUp 0.28s cubic-bezier(0.16,1,0.3,1) both;
          transform-origin: bottom right;
        }
        @keyframes bubbleUp {
          from { opacity: 0; transform: translateY(14px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bubble-backdrop {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.4);
          animation: fadeIn 0.2s ease both;
          transform: translateZ(0);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── Animación de filas ── */
        .row-animated { animation: rowIn 0.35s ease forwards; }
        .row-hidden   { opacity: 0; transform: translateX(-12px); }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* ══════════════════════════════════════
          DESKTOP
      ══════════════════════════════════════ */}
      <div
        className="vista-desktop"
        style={{
          flexDirection: 'column', alignItems: 'center',
          minHeight: '100vh', background: '#FFFFFF',
          padding: '20px 0 0', overflow: 'hidden',
        }}
      >
        {/* ── Barra de controles ── */}
        <div
          className="no-print"
          style={{
            marginBottom: 16, display: 'flex', alignItems: 'center',
            gap: 12, padding: '8px 16px', borderRadius: 8,
            backgroundColor: '#012657',
            boxShadow: '0 4px 16px rgba(1,38,87,0.3)',
            flexWrap: 'wrap',
          }}
        >
          <select
            value={centroSeleccionado}
            onChange={(e) => setCentro(e.target.value)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffc000',
              border: '1px solid rgba(255,192,0,0.3)', borderRadius: 4,
              padding: '0.4rem 2rem 0.4rem 0.75rem', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffc000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.6rem center', backgroundSize: 12,
            }}
          >
            {CENTROS.map((c) => (
              <option key={c.id} value={c.id} style={{ backgroundColor: '#012657' }}>{c.nombre}</option>
            ))}
          </select>

          <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NavBtn dir="prev" currentPage={currentPage} onNavigate={setCurrentPage} />
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  width: currentPage === i + 1 ? 28 : 22,
                  height: currentPage === i + 1 ? 28 : 22,
                  borderRadius: '50%',
                  border: currentPage === i + 1 ? '2px solid #ffc000' : '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: currentPage === i + 1 ? '#ffc000' : 'transparent',
                  color: currentPage === i + 1 ? '#012657' : 'rgba(255,255,255,0.6)',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {i + 1}
              </button>
            ))}
            <NavBtn dir="next" currentPage={currentPage} onNavigate={setCurrentPage} />
          </div>

          <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={zoomOut} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', fontSize: 18, fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffc000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', minWidth: 38, textAlign: 'center' }}>{Math.round(zoomLevel * 100)}%</span>
            <button onClick={zoomIn}  style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', fontSize: 18, fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffc000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>

          <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <button
            onClick={handlePrint}
            style={{ backgroundColor: '#ffc000', color: '#012657', border: 'none', borderRadius: 4, padding: '0.4rem 1.25rem', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,192,0,0.35)' }}
          >
            🖨 Imprimir
          </button>
        </div>

        <div
          className="scroll-area"
          style={{
            width: '100%', flex: 1, overflow: 'auto',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            padding: '16px 24px 32px', background: '#FFFFFF',
            scrollbarWidth: 'thin', scrollbarColor: '#012657 #FFFFFF',
          }}
        >
          <div style={{ width: scaledW, height: scaledH, minWidth: scaledW, flexShrink: 0, position: 'relative' }}>
            <div style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              width: PAGE_W_PX, height: PAGE_H_PX,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              borderRadius: 2, overflow: 'hidden',
            }}>
              {currentPage === 1
                ? <Page1 innerRef={ref1} centroId={centroSeleccionado} />
                : <Page2 innerRef={ref2} centroId={centroSeleccionado} />}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '-99999px', left: '-99999px', pointerEvents: 'none' }}>
          {currentPage === 1
            ? <Page2 innerRef={ref2} centroId={centroSeleccionado} />
            : <Page1 innerRef={ref1} centroId={centroSeleccionado} />}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MÓVIL  (≤ 640px)
      ══════════════════════════════════════ */}
      <div
        className="vista-movil"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minHeight: '100vh',
          background: '#eef1f7',
          padding: '12px 0 100px 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100vw',
          minWidth: 0,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/*
          Wrapper con padding simétrico.
          width:100% + boxSizing:border-box = nunca desborda el viewport.
          Sin translateX ni margin negativo.
        */}
        <div style={{
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
          <MobileContent centroId={centroSeleccionado} />
        </div>

        {mobileBubbleOpen && (
          <div className="bubble-backdrop" onClick={() => setMobileBubbleOpen(false)} />
        )}

        <div className="fab-container no-print">
          {mobileBubbleOpen && (
            <div
              className="bubble-panel"
              style={{
                backgroundColor: '#012657', borderRadius: 18, padding: '18px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,192,0,0.2)',
                display: 'flex', flexDirection: 'column', gap: 14, minWidth: 240,
              }}
            >
              <div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>Centro</p>
                <select
                  value={centroSeleccionado}
                  onChange={(e) => setCentro(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffc000', border: '1px solid rgba(255,192,0,0.3)', borderRadius: 8, padding: '8px 10px', fontSize: 12, fontWeight: 600 }}
                >
                  {CENTROS.map((c) => (
                    <option key={c.id} value={c.id} style={{ backgroundColor: '#012657' }}>{c.nombre}</option>
                  ))}
                </select>
              </div>

            </div>
          )}

          <button
            className="bubble-trigger"
            onClick={() => setMobileBubbleOpen((o) => !o)}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              backgroundColor: '#ffc000', border: 'none', cursor: 'pointer',
              boxShadow: mobileBubbleOpen ? '0 4px 24px rgba(255,192,0,0.7)' : '0 4px 20px rgba(255,192,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, color: '#012657', fontWeight: 800,
              transform: mobileBubbleOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease',
            }}
          >
            {mobileBubbleOpen ? '✕' : '⚙️'}
          </button>
        </div>
      </div>
    </>
  );
}