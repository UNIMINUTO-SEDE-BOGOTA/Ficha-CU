import React, { useRef, useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';

const TOTAL_PAGES = 2;

// Lista de centros disponibles
const CENTROS = [
  { id: 'centro-engativa', nombre: 'Engativá' },
  { id: 'centro-kennedy', nombre: 'Kennedy' },
  { id: 'centro-santa-fe-las-cruces', nombre: 'Las Cruces Santa Fé' },
  { id: 'centro-perdomo-ciudad-bolivar', nombre: 'Perdomo - Ciudad Bolívar' },
  { id: 'centro-san-cristobal-usaquen', nombre: 'San Cristóbal Norte - Usaquén' },
];

export function UniversityProfileDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [centroSeleccionado, setCentroSeleccionado] = useState(CENTROS[0].id);
  const [zoomLevel, setZoomLevel] = useState(1);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  // ── Imprime AMBAS hojas ──
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
      <!DOCTYPE html>
      <html>
        <head>
          <title></title>
          <style>
            @page { size: A4 landscape; margin: 0; }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
            }
            html, body { margin: 0; padding: 0; background: white; }
            .page-break { page-break-after: always; }
            ${styles}
          </style>
          <link rel="stylesheet" href="/index.css" />
        </head>
        <body>
          <div class="page-break">${el1.outerHTML}</div>
          <div>${el2.outerHTML}</div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1500);
    }, 600);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  const navBtn = (dir: 'prev' | 'next') => {
    const disabled = dir === 'prev' ? currentPage === 1 : currentPage === TOTAL_PAGES;
    return (
      <button
        onClick={() => setCurrentPage(p => (dir === 'prev' ? p - 1 : p + 1))}
        disabled={disabled}
        aria-label={dir === 'prev' ? 'Hoja anterior' : 'Hoja siguiente'}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: 'none',
          fontSize: 26,
          lineHeight: 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled ? '#d0d0d0' : '#012657',
          color: disabled ? '#fff' : '#ffc000',
          boxShadow: disabled ? 'none' : '0 3px 10px rgba(1,38,87,0.35)',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dir === 'prev' ? '‹' : '›'}
      </button>
    );
  };

  // Estimación de la altura real de la hoja en píxeles (210mm ≈ 793.7px a 96dpi)
  // Usamos un factor de escala para calcular el margen inferior necesario
  const baseHeight = 800; // altura aproximada en píxeles
  const extraHeight = (zoomLevel - 1) * baseHeight;
  const bottomMargin = Math.max(20, 20 + extraHeight); // margen mínimo de 20px

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen" style={{ padding: '20px 0 40px 0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* ── Barra superior ── */}
      <div className="no-print w-full max-w-5xl mb-4 flex justify-between items-center px-4">
        <div>
          <label htmlFor="centro-select" className="sr-only">Escoger centro universitario</label>
          <select
            id="centro-select"
            value={centroSeleccionado}
            onChange={(e) => setCentroSeleccionado(e.target.value)}
            style={{
              backgroundColor: '#012657',
              color: '#ffc000',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.5rem 2rem 0.5rem 1rem',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23ffc000\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'/></svg>")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.7rem center',
              backgroundSize: '14px',
            }}
          >
            {CENTROS.map(centro => (
              <option key={centro.id} value={centro.id}>
                {centro.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#012657',
            color: '#ffc000',
            border: 'none',
            borderRadius: '0.25rem',
            padding: '0.5rem 1.75rem',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(1,38,87,0.35)',
            letterSpacing: '0.03em',
          }}
        >
          Imprimir Ficha
        </button>
      </div>

      {/* Contenedor con scroll horizontal para la hoja escalada */}
      <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s',
            marginBottom: `${bottomMargin}px`, // margen dinámico
          }}
        >
          <div style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            {currentPage === 1
              ? <Page1 innerRef={ref1} centroId={centroSeleccionado} />
              : <Page2 innerRef={ref2} centroId={centroSeleccionado} />}
          </div>
        </div>
      </div>

      {/* Hoja oculta para referencias */}
      <div style={{ position: 'absolute', top: '-99999px', left: '-99999px', pointerEvents: 'none' }}>
        {currentPage === 1
          ? <Page2 innerRef={ref2} centroId={centroSeleccionado} />
          : <Page1 innerRef={ref1} centroId={centroSeleccionado} />}
      </div>

      {/* ── Controles debajo de la hoja (en flujo normal) ── */}
      <div className="no-print w-full max-w-5xl mt-4 px-4 flex justify-between items-center">
        <p style={{ fontSize: 11, color: '#78909c', fontFamily: 'Inter, sans-serif', margin: 0 }}>
          Hoja {currentPage} de {TOTAL_PAGES}
        </p>

        <div className="flex items-center gap-3">
          {/* Zoom */}
          <button
            onClick={zoomOut}
            aria-label="Alejar"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              fontSize: 20,
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#012657',
              color: '#ffc000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(1,38,87,0.3)',
            }}
          >
            −
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#012657', minWidth: 45, textAlign: 'center' }}>
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={zoomIn}
            aria-label="Acercar"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              fontSize: 20,
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#012657',
              color: '#ffc000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(1,38,87,0.3)',
            }}
          >
            +
          </button>

          <div style={{ width: 1, height: 30, backgroundColor: '#ccc', margin: '0 8px' }} />

          {/* Navegación */}
          {navBtn('prev')}
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                aria-label={`Ir a hoja ${i + 1}`}
                style={{
                  width: currentPage === i + 1 ? 14 : 10,
                  height: currentPage === i + 1 ? 14 : 10,
                  borderRadius: '50%',
                  border: currentPage === i + 1 ? '2.5px solid #ffc000' : '2px solid transparent',
                  backgroundColor: currentPage === i + 1 ? '#012657' : '#90a4ae',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: currentPage === i + 1 ? '0 0 0 3px rgba(1,38,87,0.15)' : 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>
          {navBtn('next')}
        </div>
      </div>
    </div>
  );
}