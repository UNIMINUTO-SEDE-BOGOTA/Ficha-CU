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
  
  const SectionHeader = () => (
    <div className="flex flex-col mb-6 w-full">
      {/* Fila de Logos: UNIMINUTO h-32 y Acreditación h-16 alineados a la base */}
      <div className="flex justify-between items-end pb-4 px-2 w-full min-h-[130px]">
        <div className="flex-shrink-0">
          <img 
            src="/Logo UNIMINUTO.png" 
            alt="Logo UNIMINUTO" 
            className="h-40 w-auto object-contain object-left" 
          />
        </div>
        
        <div className="flex-shrink-0 mb-1"> 
          <img 
            src="/Logo_Acreditacion.png" 
            alt="Logo Acreditación" 
            className="h-16 w-auto object-contain object-right" 
          />
        </div>
      </div>
      
      {/* Rectángulo Azul Cielo: Punta izquierda abajo y derecha arriba */}
      <div className="relative w-full h-10 flex justify-center items-center">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: UI_COLORS.skyBlue,
            // polygon(superior-izq, superior-der, inferior-der, inferior-izq)
            // 2% 0% desplaza el inicio superior a la derecha
            // 0% 100% lleva el final inferior al extremo izquierdo (punta abajo)
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
          <div className="flex flex-col gap-4 flex-1">
            <div className="border rounded-sm overflow-hidden shadow-sm">
              <div className="p-1.5 text-white font-bold text-[10px] uppercase text-center" style={{ backgroundColor: UI_COLORS.navy }}>
                Resumen Ejecutivo Financiero
              </div>
              <table className="w-full text-[10px] border-collapse">
                <thead className="bg-gray-50 text-gray-500 border-b font-normal">
                  <tr>
                    <th className="p-1.5 text-left border-r">Año</th>
                    <th className="p-1.5 text-right border-r">Ingresos</th>
                    <th className="p-1.5 text-right border-r">Costos</th>
                    <th className="p-1.5 text-right border-r">% C/G</th>
                    <th className="p-1.5 text-right border-r" style={{ color: UI_COLORS.navy }}>EBITDA</th>
                    <th className="p-1.5 text-right" style={{ color: UI_COLORS.navy }}>% EBT</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.map((row, i) => (
                    <tr key={i} className="border-b last:border-0" style={{ backgroundColor: row.año.includes("LB") ? UI_COLORS.lbYellow : "transparent" }}>
                      <td className="p-1.5 border-r font-bold">{row.año}</td>
                      <td className="p-1.5 border-r text-right">{row.ingresos}</td>
                      <td className="p-1.5 border-r text-right">{row.costos}</td>
                      <td className="p-1.5 border-r text-right text-gray-400">{row.pctCostos}%</td>
                      <td className="p-1.5 border-r text-right font-black" style={{ color: UI_COLORS.navy }}>{row.ebitda}</td>
                      <td className="p-1.5 text-right font-black" style={{ color: UI_COLORS.navy }}>{row.pctEbitda}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MITAD DERECHA */}
        <div className="w-1/2 flex flex-col h-full">
          <SectionHeader />
          <div className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Población", val: "18.341", color: UI_COLORS.navy },
                { label: "Masculino", val: "48,3%", color: UI_COLORS.skyBlue },
                { label: "Femenino", val: "51,7%", color: UI_COLORS.yellow }
              ].map((kpi, i) => (
                <div key={i} className="p-3 border rounded-sm bg-white border-t-4 shadow-sm" style={{ borderTopColor: kpi.color }}>
                  <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">{kpi.label}</p>
                  <p className="text-xl font-black" style={{ color: UI_COLORS.navy }}>{kpi.val}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 p-4 rounded-sm text-white flex flex-col gap-3 shadow-lg" style={{ backgroundColor: UI_COLORS.navy }}>
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <MapPin size={18} style={{ color: UI_COLORS.yellow }} />
                <h3 className="text-[12px] font-black uppercase tracking-wider">Perfil Territorial</h3>
              </div>
              <div className="flex-1 bg-white/5 border border-dashed border-white/20 rounded flex flex-col items-center justify-center">
                <ImageIcon size={32} className="text-white/10" />
                <span className="text-[9px] font-bold mt-2 text-white/30 uppercase tracking-[0.2em]">Mapa de Influencia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}