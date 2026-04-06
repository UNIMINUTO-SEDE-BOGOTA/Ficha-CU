import React, { useRef, useState, useEffect } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { MobileContent } from './MobileView';
import { BLUE, BLUE_LIGHT, BLUE_MED } from './MobileView';

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
const PADDING      = 48;

const TOOLBAR_H            = 64;
const TOOLBAR_MARGIN_TOP   = 16;
const TOOLBAR_MARGIN_BOTTOM= 16;
const TOOLBAR_TOTAL        = TOOLBAR_H + TOOLBAR_MARGIN_TOP + TOOLBAR_MARGIN_BOTTOM;

function NavBtn({
  dir, currentPage, onNavigate,
}: {
  dir: 'prev' | 'next'; currentPage: number; onNavigate: (page: number) => void;
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

interface Props {
  bannerVisible?: boolean;
}

export function UniversityProfileDashboard({ bannerVisible = false }: Props) {
  const [currentPage, setCurrentPage]           = useState(1);
  const [centroSeleccionado, setCentro]         = useState(CENTROS[0].id);
  const [zoomLevel, setZoomLevel]               = useState(0.70);
  const [mobileBubbleOpen, setMobileBubbleOpen] = useState(false);

  // Altura disponible para el scroll-area (calculada dinámicamente)
  const [desktopH, setDesktopH]   = useState(0);
  const [areaW, setAreaW]         = useState(0);
  const [areaH, setAreaH]         = useState(0);

  const wrapperRef    = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const fabBottom = bannerVisible ? 24 + 68 : 24;

  /*
   * Mide la altura real disponible para el wrapper desktop.
   * Busca el offsetTop del wrapper (distancia desde el top del viewport)
   * y calcula cuánto queda: vh - offsetTop.
   * Esto funciona sin importar qué tan alto sea el Header externo.
   */
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        const top = wrapperRef.current.getBoundingClientRect().top;
        setDesktopH(window.innerHeight - top);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Mide el scroll-area real con ResizeObserver
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setAreaW(entry.contentRect.width);
      setAreaH(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ZOOM_MIN = 0.4, ZOOM_MAX = 1.5, ZOOM_STEP = 0.05;
  const zoomIn  = () => setZoomLevel((z) => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX));
  const zoomOut = () => setZoomLevel((z) => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN));

  const scaledW = PAGE_W_PX * zoomLevel;
  const scaledH = PAGE_H_PX * zoomLevel;

  const contentW = scaledW + PADDING;
  const contentH = scaledH + PADDING;

  const offsetX = (areaW > 0 && contentW <= areaW) ? (areaW - scaledW) / 2 : PADDING / 2;
  const offsetY = (areaH > 0 && contentH <= areaH) ? (areaH - scaledH) / 2 : PADDING / 2;

  const innerW = Math.max(contentW, areaW || contentW);
  const innerH = Math.max(contentH, areaH || contentH);

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
    doc.write(`<!DOCTYPE html><html><head><title></title>
      <style>
        @page { size: 297mm 210mm; margin: 0mm; }
        @page :first { margin: 0mm; }
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

  // Altura del scroll-area = altura total del wrapper - toolbar
  const scrollAreaH = desktopH > 0 ? desktopH - TOOLBAR_TOTAL : '100%';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { width: 100%; }
        body {
          font-family: 'Inter', sans-serif;
          margin: 0; padding: 0;
          background: #011a3d;
          min-width: 0; width: 100%;
        }
        #root, [data-reactroot] { width: 100%; min-width: 0; }
        @media print { .no-print { display: none !important; } }

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
          max-width: 100dvw;
          overflow-x: hidden;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .scroll-area::-webkit-scrollbar          { width: 6px; height: 6px; }
        .scroll-area::-webkit-scrollbar-track    { background: #f0f4f8; }
        .scroll-area::-webkit-scrollbar-thumb    { background: #012657; border-radius: 3px; }

        .scroll-table-wrap::-webkit-scrollbar       { height: 4px; }
        .scroll-table-wrap::-webkit-scrollbar-track { background: #f0f4f8; border-radius: 2px; }
        .scroll-table-wrap::-webkit-scrollbar-thumb { background: ${BLUE_MED}; border-radius: 2px; }
        .scroll-table-wrap::-webkit-scrollbar-thumb:hover { background: ${BLUE}; }

        .fab-container {
          position: fixed; right: 18px; z-index: 1000;
          display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
          transform: translateZ(0); will-change: transform;
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
        .row-animated { animation: rowIn 0.35s ease forwards; }
        .row-hidden   { opacity: 0; transform: translateX(-12px); }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .refresh-btn {
          width: 100%; background: rgba(255,192,0,0.12); color: #ffc000;
          border: 1px solid rgba(255,192,0,0.3); border-radius: 8px;
          padding: 8px 10px; font-size: 12px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s ease;
        }
        .refresh-btn:hover { background: rgba(255,192,0,0.22); }
        .refresh-btn:active { transform: scale(0.97); }
      `}</style>

      {/* ══ DESKTOP ══ */}
      <div
        ref={wrapperRef}
        className="vista-desktop"
        style={{
          flexDirection: 'column',
          alignItems: 'stretch',
          /*
           * La altura se calcula dinámicamente: desde el top del wrapper
           * hasta el bottom del viewport. Así no importa cuánto mida el Header.
           * Mientras desktopH no está listo usamos 100vh como fallback seguro.
           */
          height: desktopH > 0 ? desktopH : '100vh',
          background: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {/* Toolbar */}
        <div
          className="no-print"
          style={{
            marginTop: TOOLBAR_MARGIN_TOP,
            marginBottom: TOOLBAR_MARGIN_BOTTOM,
            marginLeft: 24,
            marginRight: 24,
            display: 'flex', alignItems: 'center',
            gap: 12, padding: '8px 16px', borderRadius: 8,
            backgroundColor: '#012657',
            boxShadow: '0 4px 16px rgba(1,38,87,0.3)',
            flexWrap: 'wrap',
            height: TOOLBAR_H,
            flexShrink: 0,
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
            <button onClick={zoomIn} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', fontSize: 18, fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffc000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>

          <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <button
            onClick={handlePrint}
            style={{ backgroundColor: '#ffc000', color: '#012657', border: 'none', borderRadius: 4, padding: '0.4rem 1.25rem', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,192,0,0.35)' }}
          >
            🖨 Imprimir
          </button>
        </div>

        {/*
         * SCROLL AREA
         * La altura es explícita: desktopH - TOOLBAR_TOTAL
         * Así el scroll-area tiene un tamaño real y overflow:auto funciona.
         */}
        <div
          ref={scrollAreaRef}
          className="scroll-area"
          style={{
            width: '100%',
            height: scrollAreaH,
            overflow: 'auto',
            background: '#FFFFFF',
            scrollbarWidth: 'thin',
            scrollbarColor: '#012657 #f0f4f8',
          }}
        >
          <div style={{ width: innerW, height: innerH, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: offsetX,
                top: offsetY,
                width: scaledW,
                height: scaledH,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  width: PAGE_W_PX,
                  height: PAGE_H_PX,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                {currentPage === 1
                  ? <Page1 innerRef={ref1} centroId={centroSeleccionado} />
                  : <Page2 innerRef={ref2} centroId={centroSeleccionado} />}
              </div>
            </div>
          </div>
        </div>

        {/* Página oculta para impresión */}
        <div style={{ position: 'absolute', top: '-99999px', left: '-99999px', pointerEvents: 'none' }}>
          {currentPage === 1
            ? <Page2 innerRef={ref2} centroId={centroSeleccionado} />
            : <Page1 innerRef={ref1} centroId={centroSeleccionado} />}
        </div>
      </div>

      {/* ══ MÓVIL ══ */}
      <div
        className="vista-movil"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minHeight: '100vh',
          background: '#eef1f7',
          padding: '12px 0 100px 0',
          width: '100%',
          maxWidth: '100dvw',
          minWidth: 0,
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <div style={{
          width: '100%', minWidth: 0, boxSizing: 'border-box',
          paddingLeft: 'clamp(8px, 3vw, 16px)',
          paddingRight: 'clamp(8px, 3vw, 16px)',
          overflowX: 'hidden',
        }}>
          <MobileContent centroId={centroSeleccionado} />
        </div>

        {mobileBubbleOpen && (
          <div className="bubble-backdrop" onClick={() => setMobileBubbleOpen(false)} />
        )}

        <div className="fab-container no-print" style={{ bottom: fabBottom, transition: 'bottom 0.3s ease' }}>
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
              <div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>Datos</p>
                <button className="refresh-btn" onClick={() => window.location.reload()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffc000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6"/>
                    <path d="M1 20v-6h6"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                  Actualizar datos
                </button>
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