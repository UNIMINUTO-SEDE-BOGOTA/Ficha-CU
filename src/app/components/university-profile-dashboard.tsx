import React, { useRef, useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';

const TOTAL_PAGES = 2;

export function UniversityProfileDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  // ── Imprime AMBAS hojas en una sola ventana de impresión ──
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

  const navBtn = (dir: 'prev' | 'next') => {
    const disabled = dir === 'prev' ? currentPage === 1 : currentPage === TOTAL_PAGES;
    return (
      <button
        onClick={() => setCurrentPage(p => dir === 'prev' ? p - 1 : p + 1)}
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

  return (
    <div className="flex flex-col items-center bg-gray-200 py-10 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* ── Botón imprimir ── */}
      <button
        onClick={handlePrint}
        className="no-print mb-5 px-7 py-2 rounded font-semibold text-sm shadow-lg"
        style={{
          backgroundColor: '#012657',
          color: '#ffc000',
          cursor: 'pointer',
          letterSpacing: '0.03em',
        }}
      >
        🖨 Imprimir ambas hojas
      </button>

      {/* ── Hoja activa (visible en pantalla) ── */}
      <div style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        {currentPage === 1
          ? <Page1 innerRef={ref1} />
          : <Page2 innerRef={ref2} />}
      </div>

      {/*
        La hoja que NO está visible se renderiza fuera de pantalla
        para que su ref esté listo al momento de imprimir.
      */}
      <div style={{ position: 'absolute', top: '-99999px', left: '-99999px', pointerEvents: 'none' }}>
        {currentPage === 1
          ? <Page2 innerRef={ref2} />
          : <Page1 innerRef={ref1} />}
      </div>

      {/* ── Navegación ── */}
      <div className="no-print mt-6 flex items-center gap-5" style={{ userSelect: 'none' }}>
        {navBtn('prev')}

        {/* Puntos indicadores */}
        <div className="flex items-center gap-3">
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

      {/* Contador */}
      <p
        className="no-print mt-2"
        style={{ fontSize: 11, color: '#78909c', fontFamily: 'Inter, sans-serif' }}
      >
        Hoja {currentPage} de {TOTAL_PAGES}
      </p>
    </div>
  );
}
