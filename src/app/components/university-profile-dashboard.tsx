import React, { useRef, useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';

const TOTAL_PAGES = 2;

const CENTROS = [
  { id: 'centro-engativa',              nombre: 'Especial Minuto de Dios - Engativá' },
  { id: 'centro-kennedy',               nombre: 'Kennedy' },
  { id: 'centro-santa-fe-las-cruces',   nombre: 'Las Cruces - Santa Fe' },
  { id: 'centro-perdomo-ciudad-bolivar',nombre: 'Perdomo - Ciudad Bolívar' },
  { id: 'centro-san-cristobal-usaquen', nombre: 'San Cristóbal Norte - Usaquén' },
];

// Dimensiones reales de la hoja A4 horizontal en px a 96 dpi
const PAGE_W_PX = 1122; // 297 mm
const PAGE_H_PX = 794;  // 210 mm

export function UniversityProfileDashboard() {
  const [currentPage, setCurrentPage]         = useState(1);
  const [centroSeleccionado, setCentro]        = useState(CENTROS[0].id);
  const [zoomLevel, setZoomLevel]              = useState(0.85);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  /* ── Impresión ── */
  const handlePrint = () => {
    const el1 = ref1.current;
    const el2 = ref2.current;
    if (!el1 || !el2) return;

    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try { return Array.from(sheet.cssRules).map(r => r.cssText).join('\n'); }
        catch { return ''; }
      })
      .join('\n');

    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      position: 'fixed', top: '-9999px', left: '-9999px',
      width: '297mm', height: '210mm', border: 'none',
    });
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html><html><head><title></title>
      <style>
        @page { size: A4 landscape; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: white; }
        .page-break { page-break-after: always; }
        ${styles}
      </style>
      <link rel="stylesheet" href="/index.css" />
      </head><body>
        <div class="page-break">${el1.outerHTML}</div>
        <div>${el2.outerHTML}</div>
      </body></html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1500);
    }, 600);
  };

  /* ── Zoom ── */
  const ZOOM_MIN  = 0.4;
  const ZOOM_MAX  = 1.5;
  const ZOOM_STEP = 0.05;
  const zoomIn  = () => setZoomLevel(z => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX));
  const zoomOut = () => setZoomLevel(z => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN));

  // El contenedor debe tener exactamente el tamaño visual de la hoja escalada
  const scaledW = PAGE_W_PX * zoomLevel;
  const scaledH = PAGE_H_PX * zoomLevel;

  /* ── Botón navegación ── */
  const NavBtn = ({ dir }: { dir: 'prev' | 'next' }) => {
    const disabled = dir === 'prev' ? currentPage === 1 : currentPage === TOTAL_PAGES;
    return (
      <button
        onClick={() => setCurrentPage(p => dir === 'prev' ? p - 1 : p + 1)}
        disabled={disabled}
        aria-label={dir === 'prev' ? 'Hoja anterior' : 'Hoja siguiente'}
        style={{
          width: 34, height: 34, borderRadius: '50%', border: 'none',
          fontSize: 22, lineHeight: 1, cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled ? '#8a9bb5' : '#ffc000',
          color: '#012657',
          boxShadow: disabled ? 'none' : '0 2px 8px rgba(255,192,0,0.4)',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
        }}
      >
        {dir === 'prev' ? '‹' : '›'}
      </button>
    );
  };

  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{ background: '#e8ecf0', padding: '20px 0 0', overflow: 'hidden' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* ── Barra superior ── */}
      <div
        className="no-print mb-4 flex items-center gap-3 px-4 py-2 rounded-lg"
        style={{
          backgroundColor: '#012657',
          boxShadow: '0 4px 16px rgba(1,38,87,0.3)',
          width: 'fit-content',
        }}
      >
        {/* Select centro */}
        <select
          value={centroSeleccionado}
          onChange={e => setCentro(e.target.value)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: '#ffc000',
            border: '1px solid rgba(255,192,0,0.3)',
            borderRadius: '0.25rem',
            padding: '0.4rem 2rem 0.4rem 0.75rem',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffc000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.6rem center',
            backgroundSize: '12px',
          }}
        >
          {CENTROS.map(c => (
            <option key={c.id} value={c.id} style={{ backgroundColor: '#012657' }}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Separador */}
        <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Navegación páginas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavBtn dir="prev" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  width:  currentPage === i + 1 ? 28 : 22,
                  height: currentPage === i + 1 ? 28 : 22,
                  borderRadius: '50%',
                  border: currentPage === i + 1 ? '2px solid #ffc000' : '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: currentPage === i + 1 ? '#ffc000' : 'transparent',
                  color: currentPage === i + 1 ? '#012657' : 'rgba(255,255,255,0.6)',
                  fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <NavBtn dir="next" />
        </div>

        {/* Separador */}
        <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={zoomOut}
            aria-label="Alejar"
            style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffc000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >−</button>

          <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', minWidth: 38, textAlign: 'center' }}>
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={zoomIn}
            aria-label="Acercar"
            style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffc000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >+</button>
        </div>

        {/* Separador */}
        <div style={{ width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Imprimir */}
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#ffc000', color: '#012657',
            border: 'none', borderRadius: '0.25rem',
            padding: '0.4rem 1.25rem',
            fontSize: '13px', fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(255,192,0,0.35)',
            letterSpacing: '0.02em', transition: 'opacity 0.2s',
          }}
        >
          🖨 Imprimir
        </button>
      </div>

      {/* ── Hoja con zoom + scroll ── */}
      <div
        style={{
          width: '100%',
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '16px 24px 32px',
          // Scrollbar sutil
          scrollbarWidth: 'thin',
          scrollbarColor: '#012657 #dde2e8',
        }}
      >
        {/* Tamaño real escalado para que el scroll sepa hasta dónde llegar */}
        <div
          style={{
            width:     scaledW,
            height:    scaledH,
            minWidth:  scaledW,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              width:  PAGE_W_PX,
              height: PAGE_H_PX,
              boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
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

      {/* Hoja oculta para imprimir la que NO está visible */}
      <div style={{ position: 'absolute', top: '-99999px', left: '-99999px', pointerEvents: 'none' }}>
        {currentPage === 1
          ? <Page2 innerRef={ref2} centroId={centroSeleccionado} />
          : <Page1 innerRef={ref1} centroId={centroSeleccionado} />}
      </div>
    </div>
  );
}