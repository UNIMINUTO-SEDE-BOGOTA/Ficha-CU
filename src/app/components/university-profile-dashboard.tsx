import React, { useRef, useState } from 'react';

interface FinancialRow {
  año: string;
  ingresos: string;
  costos: string;
  pctCostos: string;
  ebitda: string;
  pctEbitda: string;
}

interface GrayBannerProps {
  text: string;
}

const UI_COLORS = {
  navy: "#012657",
  yellow: "#ffc000",
  skyBlue: "#C3E0FB", 
  lbYellow: "#fff9c4",
};

const financialData: FinancialRow[] = [
  { año: "LB 2024", ingresos: "136,53", costos: "119,65", pctCostos: "87,6", ebitda: "21,31", pctEbitda: "15,61" },
  { año: "2025", ingresos: "138,45", costos: "115,82", pctCostos: "83,7", ebitda: "23,50", pctEbitda: "16,97" },
  { año: "2026", ingresos: "142,45", costos: "118,79", pctCostos: "83,4", ebitda: "24,94", pctEbitda: "17,51" },
  { año: "2027", ingresos: "150,64", costos: "127,29", pctCostos: "84,5", ebitda: "29,62", pctEbitda: "19,66" },
  { año: "2028", ingresos: "164,70", costos: "135,88", pctCostos: "82,5", ebitda: "36,56", pctEbitda: "22,20" },
  { año: "2029", ingresos: "179,45", costos: "145,71", pctCostos: "81,2", ebitda: "42,79", pctEbitda: "23,85" },
  { año: "2030", ingresos: "195,55", costos: "156,44", pctCostos: "80,0", ebitda: "48,84", pctEbitda: "24,98" },
];

export function UniversityProfileDashboard() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const element = printRef.current;
    if (!element) return;

    // Obtener todos los estilos de la página actual
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch { return ''; }
      })
      .join('\n');

    // Crear iframe oculto — no tiene URL, elimina localhost del footer
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '297mm';
    iframe.style.height = '210mm';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.open();
    iframeDoc.write(`
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
            html, body {
              margin: 0;
              padding: 0;
              width: 297mm;
              height: 210mm;
              overflow: hidden;
              background: white;
            }
            ${styles}
          </style>
          <link rel="stylesheet" href="/index.css" />
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 500);
  };

  const SectionHeader = ({ showFecha = false }: { showFecha?: boolean }) => (
    <div className="flex flex-col mb-2 w-full">
      <div className="flex justify-between items-center px-4 py-2 w-full">
        <img 
          src="/Logo UNIMINUTO.png"
          alt="Logo UNIMINUTO"
          className="h-16 w-auto object-contain"
        />
        {showFecha && (
          <div className="flex flex-col items-center text-center">
            <p className="text-gray-400 text-[7px] leading-tight">Fecha de corte: </p>
            <p className="text-gray-600 font-medium text-[8px] leading-tight">20 de febrero de 2026</p>
          </div>
        )}
        <img 
          src="/Logo_Acreditacion.png"
          alt="Logo Acreditación"
          className="h-14 w-auto object-contain"
        />
      </div>
      <div className="relative w-full h-9 flex justify-center items-center">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: UI_COLORS.skyBlue,
            clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)"
          }}
        />
        <h2 
          className="relative z-10 text-black font-normal text-[13px] tracking-wide whitespace-nowrap"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Centro Universitario Especial Minuto de Dios - Engativá
        </h2>
      </div>
    </div>
  );

  const GrayBanner = ({ text }: GrayBannerProps) => (
    <div className="w-full flex justify-center my-1">
      <div
        className="px-8 py-0.5"
        style={{
          backgroundColor: "#D9D9D9",
          clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
        }}
      >
        <h3
          className="text-black font-medium text-[12px] text-center whitespace-nowrap"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {text}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-200 py-10 min-h-screen">
      {/* BOTÓN IMPRIMIR */}
      <button
        onClick={handlePrint}
        className="no-print mb-4 px-6 py-2 rounded font-semibold text-sm shadow"
        style={{ backgroundColor: "#012657", color: "#ffc000", cursor: 'pointer' }}
      >
        Imprimir Ficha
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @page { size: A4 landscape; margin: 0; }
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <div 
        ref={printRef}
        className="print-container bg-white shadow-2xl overflow-hidden flex flex-row"
        style={{ 
          width: "297mm", 
          height: "210mm", 
          padding: "2mm 8mm 6mm 8mm"
        }}
      >

        {/* =================== MITAD IZQUIERDA =================== */}
        <div 
          className="flex flex-col h-full border-r pr-3" 
          style={{ width: "50%", borderColor: '#e0e0e0' }}
        >
          <SectionHeader />
          <GrayBanner text="Proyección INGRESOS - COSTOS Y GASTOS - EBITDA" />

          {/* TABLA 1: PROYECCIÓN FINANCIERA */}
          <div className="border shadow-sm mt-1">
            <table className="w-full text-[8px] border-collapse leading-tight">
              <thead>
                <tr className="bg-[#C3E0FB] text-black font-medium">
                  <th className="border px-1 py-[3px] text-left">Año</th>
                  <th className="border px-1 py-[3px] text-center">Ingresos Netos</th>
                  <th className="border px-1 py-[3px] text-center">Costos y Gastos</th>
                  <th className="border px-1 py-[3px] text-center">% Costos y Gastos</th>
                  <th className="border px-1 py-[3px] text-center">EBITDA</th>
                  <th className="border px-1 py-[3px] text-center">%EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((row, i) => (
                  <tr
                    key={i}
                    style={row.año.includes("LB") ? { backgroundColor: "#F0E199" } : {}}
                    className={!row.año.includes("LB") && i % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border px-1 py-[2px] font-semibold">{row.año}</td>
                    <td className="border px-1 py-[2px] text-right">{row.ingresos} mil M</td>
                    <td className="border px-1 py-[2px] text-right">{row.costos} mil M</td>
                    <td className="border px-1 py-[2px] text-right">{row.pctCostos} %</td>
                    <td className="border px-1 py-[2px] text-right font-semibold">{row.ebitda} mil M</td>
                    <td className="border px-1 py-[2px] text-right font-semibold">{row.pctEbitda} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <GrayBanner text="PROYECCIÓN INDICADORES CENTRO UNIVERSITARIO" />
          </div>

          {/* TABLA 2: PROYECCIÓN INDICADORES */}
          <div className="border shadow-sm mt-0.5">
            <table className="w-full text-[7.5px] border-collapse leading-tight">
              <thead>
                <tr className="bg-[#C3E0FB] text-black">
                  <th className="border px-1 py-[3px] text-left">Nombre Corto</th>
                  <th className="border px-1 py-[3px] text-center">2025</th>
                  <th className="border px-1 py-[3px] text-center">2025 Real</th>
                  <th className="border px-1 py-[3px] text-center">2026</th>
                  <th className="border px-1 py-[3px] text-center">2027</th>
                  <th className="border px-1 py-[3px] text-center">2028</th>
                  <th className="border px-1 py-[3px] text-center">2029</th>
                  <th className="border px-1 py-[3px] text-center">2030</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Deserción Distancia","10%","12,1%","10%","10%","10%","10%","11%"],
                  ["Deserción Presencial","8%","10,04%","8%","8%","8%","8%","8%"],
                  ["Diversificación de Ingresos","5%","6%","6%","7%","8%","9%","10%"],
                  ["EBITDA","17%","16,97%","15,5%","19,7%","22,2%","23,8%","25%"],
                  ["Educación Continua","4615","","5896","7404","9021","10706","12430"],
                  ["Estudiantes Centro Universitario","18244","205","19038","19592","20245","20847","21372"],
                  ["Matrícula Nuevos","7700","0","8195","8560","8730","8770","8775"],
                  ["Saber PRO Presencial","135","","136","137","137","138","138"],
                  ["Tasa de Conversión","58%","","60%","62%","64%","66%","68%"],
                  ["Tipología Centro Universitario","A","A","A","A","A","A","A"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`border px-1 py-[2px] ${j === 0 ? "text-left font-medium" : "text-center"}`}
                        style={j === 0 ? { backgroundColor: "#FDEDEC" } : {}}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =================== MITAD DERECHA =================== */}
        <div 
          className="flex flex-col h-full bg-white pl-3"
          style={{ width: "50%" }}
        >
          <SectionHeader showFecha />

          {/* Título ficha */}
          <h2 className="text-[13px] font-semibold text-gray-800 text-center -mt-1 mb-0">
            Ficha Centro Universitario
          </h2>
          <p className="text-[10px] text-gray-700 text-center" style={{ marginBottom: 0, lineHeight: 1 }}>Líder:</p>

          {/* MAPA — pegado al título y al banner */}
          <div className="w-full flex justify-center items-center -mt-10" style={{ height: "80mm", marginBottom: 0, padding: 0 }}>
            <img
              src="/engativa.png"
              alt="Mapa Engativá"
              style={{ height: "100%", maxWidth: "85%", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* BANNER ESTUDIANTES — pegado al mapa */}
          <div className="w-full flex justify-center -mt-10" style={{ marginBottom: 2 }}>
            <div
              className="px-8 py-0.5"
              style={{
                backgroundColor: "#D9D9D9",
                clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
              }}
            >
              <h3
                className="text-black font-medium text-[12px] text-center whitespace-nowrap"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                ESTUDIANTES CENTRO UNIVERSITARIO 2026 S1-Q1
              </h3>
            </div>
          </div>

          {/* BLOQUE ESTUDIANTES: tabla izquierda + iconos derecha en una sola fila */}
          <div 
            className="w-full flex flex-row border shadow-sm mt-0.5"
            style={{ alignItems: "stretch" }}
          >
            {/* TABLA — ocupa el extremo izquierdo */}
            <div style={{ width: "55%" }}>
              <table className="w-full text-[9px] border-collapse">
                <thead>
                  <tr className="bg-[#AFC4D8] text-black">
                    <th className="px-2 py-0.5 text-left"></th>
                    <th className="px-2 py-0.5 text-center">Distancia</th>
                    <th className="px-2 py-0.5 text-center">Presencial</th>
                    <th className="px-2 py-0.5 text-center font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-0.5">1. Pregrado</td>
                    <td className="px-2 py-0.5 text-right">4.643</td>
                    <td className="px-2 py-0.5 text-right">12.669</td>
                    <td className="px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">17.312</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-0.5">2. Posgrado</td>
                    <td className="px-2 py-0.5 text-right">617</td>
                    <td className="px-2 py-0.5 text-right">412</td>
                    <td className="px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">1.029</td>
                  </tr>
                  <tr className="bg-[#C7B8E7] font-semibold">
                    <td className="px-2 py-0.5">Total</td>
                    <td className="px-2 py-0.5 text-right">5.260</td>
                    <td className="px-2 py-0.5 text-right">13.081</td>
                    <td className="px-2 py-0.5 text-right">18.341</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ICONOS — se extienden hasta el extremo derecho */}
            <div 
              style={{ width: "45%" }}
              className="flex flex-row items-center justify-evenly px-2 border-l border-gray-200"
            >
              {/* Total población */}
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-blue-800 font-semibold text-[8px] text-center leading-tight">Total población</p>
                <div className="flex flex-col items-center gap-0.5">
                  <img src="/poblacion.png" className="h-6 w-auto object-contain" alt="población" />
                  <span className="text-[11px] font-bold">18.341</span>
                </div>
              </div>

              {/* Separador */}
              <div className="h-10 w-px bg-gray-200" />

              {/* Hombres */}
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-blue-800 font-semibold text-[8px] text-center leading-tight">Hombres</p>
                <div className="flex flex-col items-center gap-0.5">
                  <img src="/hombre.png" className="h-6 w-auto object-contain" alt="hombres" />
                  <span className="text-[11px] font-semibold">7.986</span>
                </div>
              </div>

              {/* Separador */}
              <div className="h-10 w-px bg-gray-200" />

              {/* Mujeres */}
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-blue-800 font-semibold text-[8px] text-center leading-tight">Mujeres</p>
                <div className="flex flex-col items-center gap-0.5">
                  <img src="/mujer.png" className="h-6 w-auto object-contain" alt="mujeres" />
                  <span className="text-[11px] font-semibold">10.355</span>
                </div>
              </div>

            </div>
          </div>

          {/* BANNER CONTEXTO */}
          <div className="w-full flex justify-center mt-1">
            <div
              className="px-8 py-0.5"
              style={{
                backgroundColor: "#D9D9D9",
                clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
              }}
            >
              <h3
                className="text-black font-medium text-[12px] text-center whitespace-nowrap"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                CONTEXTO CENTRO UNIVERSITARIO
              </h3>
            </div>
          </div>

          {/* IMAGEN CONTEXTO*/}
          <div className="w-full flex-1 mt-0.5 flex items-start justify-center overflow-hidden">
            <img
              src="/contextoCU.png"
              alt="Contexto Centro Universitario"
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}