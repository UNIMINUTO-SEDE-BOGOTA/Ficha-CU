// pages/Page1.tsx
import React from 'react';
import { GrayBanner, SectionHeader } from './shared';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage1 } from '../../models/proyeccionPage1Model';
 
// Mapeo de imágenes (ajusta las rutas según tu proyecto)
const MAPA_IMAGENES: Record<string, string> = {
  'centro-engativa': '/engativa.png',
  'centro-kennedy': '/Kennedy.png',
  'centro-santa-fe-las-cruces': '/cruces.png',
  'centro-perdomo-ciudad-bolivar': '/perdomo.png',
  'centro-san-cristobal-usaquen': '/sancristobal.png',
};
 
const CONTEXTO_IMAGENES: Record<string, string> = {
  'centro-engativa': '/contexto-engativa.png',
  'centro-kennedy': '/contexto-kennedy.png',
  'centro-santa-fe-las-cruces': '/contexto-cruces.png',
  'centro-perdomo-ciudad-bolivar': '/contexto-perdomo.png',
  'centro-san-cristobal-usaquen': '/contexto-sancristobal.png',
};
 
const EBITDA_IMAGENES: Record<string, string> = {
  'centro-engativa': '/ebitda_engativa.png',
  'centro-kennedy': '/ebitda_kennedy.png',
  'centro-santa-fe-las-cruces': '/ebitda_cruces.png',
  'centro-perdomo-ciudad-bolivar': '/ebitda_perdomo.png',
  'centro-san-cristobal-usaquen': '/ebitda_usaquen.png',
};
 
interface Props {
  innerRef?: React.Ref<HTMLDivElement>;
  centroId?: string;
}
 
export function Page1({ innerRef, centroId = 'centro-engativa' }: Props) {
  const { data, loading, centroNombre } = useObservatorio(centroId);
  const pageData = transformarPage1(data);
 
  console.log('pageData en Page1:', pageData);
 
  // Función para formatear números con separador de miles (puntos)
  const formatNumber = (num: number | undefined | null): string => {
    if (num === undefined || num === null) return '-';
    return num.toLocaleString('es-CO');
  };
 
  const studentSummary = pageData.studentSummary;
  const indicatorsRows = pageData.indicatorsRows;
  // Si necesitas mostrar financialRows, puedes agregarlos en otra sección
  // const financialRows = pageData.financialRows;
 
  const años = ['2025', '2026', '2027', '2028', '2029', '2030 ']; // Coincide con ANIOS
  const subtitle = `Centro Universitario ${centroNombre}`;
  const mapaSrc = MAPA_IMAGENES[centroId] || '/mapa-engativa.png';
  const contextoSrc = CONTEXTO_IMAGENES[centroId] || '/contexto-cu.png';
  const ebitdaSrc = EBITDA_IMAGENES[centroId] || '/ebitda_engativa.png';
 
  if (loading) {
    return <div className="flex items-center justify-center h-full">Cargando datos del observatorio...</div>;
  }
 
  return (
    <div
      ref={innerRef}
      className="bg-white overflow-hidden flex flex-row"
      style={{ width: "297mm", height: "210mm", padding: "2mm 8mm 6mm 8mm" }}
    >
      {/* ── IZQUIERDA ── */}
      <div className="flex flex-col h-full border-r pr-3" style={{ width: "50%", borderColor: "#e0e0e0" }}>
        <SectionHeader subtitle={subtitle} />
        <GrayBanner text="Proyección INGRESOS - COSTOS Y GASTOS - EBITDA" />
 
        <div className="w-full flex justify-center items-center" style={{ marginTop: "-3px" }}>
          <img src={ebitdaSrc} alt="Proyección EBITDA" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
 
        <div className="mt-2">
          <GrayBanner text="PROYECCIÓN INDICADORES CENTRO UNIVERSITARIO" />
        </div>
 
        <div className="border shadow-sm mt-0.5">
          <table className="w-full text-[7.5px] border-collapse leading-tight">
            <thead>
              <tr className="bg-[#C3E0FB] text-black">
                <th className="border px-1 py-[3px] text-left">Nombre Corto</th>
                {años.map(h => (
                  <th key={h} className="border px-1 py-[3px] text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {indicatorsRows.length > 0 ? (
                indicatorsRows.map((row, i) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={años.length + 1} className="text-center py-4 text-gray-500">
                    No hay indicadores disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* ── DERECHA ── */}
      <div className="flex flex-col h-full bg-white pl-3" style={{ width: "50%" }}>
        <SectionHeader showFecha subtitle={subtitle} />
 
        <h2 className="text-[13px] font-semibold text-gray-800 text-center -mt-1 mb-0">Ficha Centro Universitario</h2>
        <p className="text-[10px] text-gray-700 text-center" style={{ marginBottom: 0, lineHeight: 1 }}>Líder:</p>
 
        <div className="w-full flex justify-center items-center -mt-10" style={{ height: "80mm" }}>
          <img src={mapaSrc} style={{ height: "100%", maxWidth: "85%", objectFit: "contain" }} />
        </div>
 
        <div className="w-full flex justify-center -mt-10" style={{ marginBottom: 2 }}>
          <div className="px-8 py-0.5" style={{ backgroundColor: "#D9D9D9", clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", boxShadow: "0px 3px 6px rgba(0,0,0,0.15)" }}>
            <h3 className="text-black font-medium text-[12px] text-center whitespace-nowrap">ESTUDIANTES CENTRO UNIVERSITARIO 2026 S1-Q1</h3>
          </div>
        </div>
 
        <div className="w-full flex flex-row border shadow-sm mt-0.5" style={{ alignItems: "stretch" }}>
          <div style={{ width: "55%" }}>
            <table className="w-full text-[9px] border-collapse">
              <thead>
                <tr className="bg-[#AFC4D8] text-black">
                  <th className="border px-2 py-0.5 text-left"></th>
                  <th className="border px-2 py-0.5 text-center">Distancia</th>
                  <th className="border px-2 py-0.5 text-center">Presencial</th>
                  <th className="border px-2 py-0.5 text-center font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-0.5">1. Pregrado</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.pregradoDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.pregradoPresencial}</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">{studentSummary.pregradoTotal}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-0.5">2. Posgrado</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.posgradoDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.posgradoPresencial}</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">{studentSummary.posgradoTotal}</td>
                </tr>
                <tr className="bg-[#C7B8E7] font-semibold">
                  <td className="border px-2 py-0.5">Total</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.totalGeneralDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.totalGeneralPresencial}</td>
                  <td className="border px-2 py-0.5 text-right">{studentSummary.totalGeneral}</td>
                </tr>
              </tbody>
            </table>
          </div>
 
          <div style={{ width: "45%" }} className="flex flex-row items-center justify-evenly px-2 border-l border-gray-200">
            {[
              { label: "Total población", src: "/poblacion.png", value: studentSummary.totalGeneral },
              { label: "Hombres",         src: "/hombre.png",    value: studentSummary.hombres },
              { label: "Mujeres",         src: "/mujer.png",     value: studentSummary.mujeres },
            ].map((item, idx, arr) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center gap-0.5">
                  <p className="text-blue-800 font-semibold text-[8px] text-center leading-tight">{item.label}</p>
                  <img src={item.src} className="h-6 w-auto object-contain" alt={item.label} />
                  <span className="text-[11px] font-bold">{item.value}</span>
                </div>
                {idx < arr.length - 1 && <div className="h-10 w-px bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
 
        <div className="w-full flex justify-center mt-1">
          <div className="px-8 py-0.5" style={{ backgroundColor: "#D9D9D9", clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)", boxShadow: "0px 3px 6px rgba(0,0,0,0.15)" }}>
            <h3 className="text-black font-medium text-[12px] text-center whitespace-nowrap">CONTEXTO CENTRO UNIVERSITARIO</h3>
          </div>
        </div>
 
        <div className="w-full flex-1 mt-0.5 flex items-start justify-center overflow-hidden">
          <img src={contextoSrc} alt="Contexto Centro Universitario" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
        </div>
      </div>
    </div>
  );
}