import React from 'react';
import { Image as ImageIcon, MapPin, BarChart3, PieChart } from "lucide-react";

const UI_COLORS = {
  navy: "#012657",
  yellow: "#ffc000",
  skyBlue: "#C3E0FB", 
  lbYellow: "#fff9c4",
};

const financialData = [
  { año: "LB 2024", ingresos: "136,53", costos: "119,65", pctCostos: "87,6", ebitda: "21,31", pctEbitda: "15,61" },
  { año: "2025", ingresos: "138,45", costos: "115,82", pctCostos: "83,7", ebitda: "23,50", pctEbitda: "16,97" },
  { año: "2026", ingresos: "142,45", costos: "118,79", pctCostos: "83,4", ebitda: "24,94", pctEbitda: "17,51" },
  { año: "2027", ingresos: "150,64", costos: "127,29", pctCostos: "84,5", ebitda: "29,62", pctEbitda: "19,66" },
  { año: "2028", ingresos: "164,70", costos: "135,88", pctCostos: "82,5", ebitda: "36,56", pctEbitda: "22,20" },
  { año: "2029", ingresos: "179,45", costos: "145,71", pctCostos: "81,2", ebitda: "42,79", pctEbitda: "23,85" },
  { año: "2030", ingresos: "195,55", costos: "156,44", pctCostos: "80,0", ebitda: "48,84", pctEbitda: "24,98" },
];

export function UniversityProfileDashboard() {
 const SectionHeader = () => {
  return (
    <div className="flex flex-col mb-6 w-full">

      {/* Fila de logos */}
      <div className="flex justify-between items-center px-4 py-3 w-full">
        
        {/* Logo UNIMINUTO */}
        <img 
          src="/Logo UNIMINUTO.png"
          alt="Logo UNIMINUTO"
          className="h-20 w-auto object-contain"
        />

        {/* Logo Acreditación */}
        <img 
          src="/Logo_Acreditacion.png"
          alt="Logo Acreditación"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Rectángulo Azul Cielo */}
      <div className="relative w-full h-10 flex justify-center items-center -mt-3">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: UI_COLORS.skyBlue,
            clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)"
          }}
        />
        <h2 
          className="relative z-10 text-black font-normal text-[15px] tracking-wide whitespace-nowrap"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Centro Universitario Especial Minuto de Dios - Engativá
        </h2>
      </div>

    </div>
  );
};
  

  return (
    <div className="flex flex-col items-center bg-gray-200 py-10 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; }
          .print-container { 
            width: 297mm !important; 
            height: 210mm !important; 
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div 
        className="print-container bg-white shadow-2xl overflow-hidden flex flex-row gap-8"
        style={{ 
          width: "297mm", 
          height: "210mm", 
          paddingTop: "2mm",    
          paddingLeft: "10mm", 
          paddingRight: "10mm", 
          paddingBottom: "10mm" 
        }}
      >

        {/* MITAD IZQUIERDA */}
<div className="w-1/2 flex flex-col h-full border-r pr-4" style={{ borderColor: '#f0f0f0' }}>
  <SectionHeader />
  
        {/* Subtítulo Gris */}
      <div className="relative w-full flex justify-center -mt-3">
        <div
          className="relative px-10 py-1"
          style={{
            backgroundColor: "#D9D9D9",
            clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
          }}
        >
          <h3
            className="text-black font-medium text-[14px] text-center"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Proyección INGRESOS - COSTOS Y GASTOS - EBITDA
          </h3>
        </div>
      </div>

  <div className="flex flex-col gap-6 flex-1">

    {/* ================= TABLA 1: PROYECCIÓN FINANCIERA ================= */}
<div className="border shadow-sm">

  <table className="w-full text-[8.5px] border-collapse leading-tight mt-1">
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
            className="even:bg-gray-50"
            style={
              row.año.includes("LB")
                ? { backgroundColor: "#F0E199" }
                : {}
            }
          >
          <td className={`border px-1 py-[2px] font-semibold ${
            row.año.includes("LB") ? "bg-[#F0E199]" : ""
          }`}>
            {row.año}
          </td>

          <td className="border px-1 py-[2px] text-right">
            {row.ingresos} mil M
          </td>

          <td className="border px-1 py-[2px] text-right">
            {row.costos} mil M
          </td>

          <td className="border px-1 py-[2px] text-right">
            {row.pctCostos} %
          </td>

          <td className="border px-1 py-[2px] text-right font-semibold">
            {row.ebitda} mil M
          </td>

          <td className="border px-1 py-[2px] text-right font-semibold">
            {row.pctEbitda} %
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    {/* ================= TABLA 2: PROYECCIÓN INDICADORES ================= */}
    <div className="relative w-full flex justify-center -mt-2 ">
        <div
          className="relative px-10 py-1"
          style={{
            backgroundColor: "#D9D9D9",
            clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
          }}
        >
          <h3
            className="text-black-800 font-medium text-[14px] text-center"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            PROYECCIÓN INDICADORES CENTRO UNIVERSITARIO
          </h3>
        </div>
      </div>
<div className="border shadow-sm">
  <table className="w-full text-[8px] border-collapse leading-tight -mt-4 ">
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
        <tr key={i} className="even:bg-gray-50">
          {row.map((cell, j) => (
            <td
              key={j}
              className={`border px-1 py-[2px] ${
                j === 0
                  ? "text-left font-medium"
                  : "text-center"
              }`}
              style={ j === 0 ? { backgroundColor: "#FDEDEC" } : {} }
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
</div>

        {/* MITAD DERECHA */}
        <div className="w-1/2 flex flex-col h-full bg-white">
          <SectionHeader />
          <div className="flex flex-col flex-1 items-center px-8 pt-6">
            {/* Título */}
            <h2 className="text-xl font-semibold text-gray-800 -mt-10">
              Ficha Centro Universitario
            </h2>
            {/* Líder */}
            <p className="text-sm text-gray-700 mt-2 mb-4">
              Líder:
            </p>
            {/* MAPA */}
            <div className="w-full flex justify-center items-center -mt-16">
              <img
                src="/engativa.png"
                alt="Mapa Engativá"
                className="h-[300px] object-contain"
              />
            </div>
            {/* FIGURA ESTUDIANTES */}
            <div className="w-full flex justify-center -mt-10">
              <div
                className="relative px-10 py-1"
                style={{
                  backgroundColor: "#D9D9D9",
                  clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                }}
              >
                <h3
                  className="text-black font-medium text-[14px] text-center"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  ESTUDIANTES CENTRO UNIVERSITARIO 2026 S1-Q1
                </h3>
              </div>
            </div>
            {/* BLOQUE ESTUDIANTES COMPLETO - alineado a la izquierda y sin bordes en la tabla */}
            <div className="w-full mt-1 bg-white border shadow-sm self-start -ml-16">
              <div className="flex">
                {/* TABLA IZQUIERDA - más ancha y sin bordes */}
                <div className="w-3/5">
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-[#AFC4D8] text-black">
                        <th className="px-3 py-0.5 text-left"></th>
                        <th className="px-3 py-0.5 text-center">Distancia</th>
                        <th className="px-3 py-0.5 text-center">Presencial</th>
                        <th className="px-3 py-0.5 text-center font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-1 py-0.5">1.Pregrado</td>
                        <td className="px-5 py-0.5 text-right">4.643</td>
                        <td className="px-5 py-0.5 text-right">12.669</td>
                        <td className="px-5 py-0.5 text-right font-bold bg-[#C7B8E7]">
                          17.312
                        </td>
                      </tr>
                      <tr>
                        <td className="px-1 py-0.5">2.Posgrado</td>
                        <td className="px-5 py-0.5 text-right">617</td>
                        <td className="px-5 py-0.5 text-right">412</td>
                        <td className="px-5 py-0.5 text-right font-bold bg-[#C7B8E7]">
                          1.029
                        </td>
                      </tr>
                      <tr className="bg-[#C7B8E7] font-semibold">
                        <td className="px-1 py-0.5">Total</td>
                        <td className="px-5 py-0.5 text-right">5.260</td>
                        <td className="px-5 py-0.5 text-right">13.081</td>
                        <td className="px-5 py-0.5 text-right">18.341</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-2/5 flex items-center justify-end gap-6 pr-2">
                {/* Total población */}
                <div className="text-right">
                  <p className="text-blue-800 font-semibold text-[10px] mb-0.5">Total población</p>
                  <div className="flex items-center gap-1 justify-end">
                    <img src="/poblacion.png" className="h-5 object-contain" />
                    <span className="text-base font-bold">18.341</span>
                  </div>
                </div>
                {/* Hombres */}
                <div className="text-right">
                  <p className="text-blue-800 font-semibold text-[10px] mb-0.5">Hombres</p>
                  <div className="flex items-center gap-1 justify-end">
                    <img src="/hombre.png" className="h-5 object-contain" />
                    <span className="text-sm font-semibold">7.986</span>
                  </div>
                </div>
                {/* Mujeres */}
                <div className="text-right">
                  <p className="text-blue-800 font-semibold text-[10px] mb-0.5">Mujeres</p>
                  <div className="flex items-center gap-1 justify-end">
                    <img src="/mujer.png" className="h-5 object-contain" />
                    <span className="text-sm font-semibold">10.355</span>
                    </div>
                  </div>
                </div>
              </div> {/* cierra flex */}
            </div> {/* cierra bloque estudiantes */}
          </div> {/* cierra contenido derecha (flex-col) */}
        </div> {/* cierra mitad derecha */}
      </div> {/* cierra print-container */}
    </div>
  );
}