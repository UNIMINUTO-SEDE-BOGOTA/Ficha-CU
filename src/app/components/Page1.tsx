import React from 'react';
import { GrayBanner, SectionHeader } from './shared';
import { useObservatorio } from '../../hooks/useObservatorio';
import { transformarPage1 } from '../../models/proyeccionPage1Model';

// Mapeo de IDs de centro a nombres (según la lista CENTROS)
const CENTRO_NOMBRES: Record<string, string> = {
  'centro-engativa': 'Engativá',
  'centro-kennedy': 'Kennedy',
  'centro-santa-fe-las-cruces': 'Las Cruces Santa Fé',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-san-cristobal-usaquen': 'San Cristóbal Norte - Usaquén',
};

// Mapeo de imágenes de mapa
const MAPA_IMAGENES: Record<string, string> = {
  'centro-engativa': '/engativa.png',
  'centro-kennedy': '/Kennedy.png',
  'centro-santa-fe-las-cruces': '/cruces.png',
  'centro-perdomo-ciudad-bolivar': '/perdomo.png',
  'centro-san-cristobal-usaquen': '/sancristobal.png',
};

// NUEVO: Mapeo de imágenes de contexto para cada centro
const CONTEXTO_IMAGENES: Record<string, string> = {
  'centro-engativa': '/contexto-engativa.png',
  'centro-kennedy': '/contexto-kennedy.png',
  'centro-santa-fe-las-cruces': '/contexto-cruces.png',
  'centro-perdomo-ciudad-bolivar': '/contexto-perdomo.png',
  'centro-san-cristobal-usaquen': '/contexto-sancristobal.png',
};

interface Props {
  innerRef?: React.Ref<HTMLDivElement>;
  centroId?: string;
}

export function Page1({ innerRef, centroId = 'centro-engativa' }: Props) {
  const { data, loading } = useObservatorio(centroId, {});
  const pageData = transformarPage1(data);

  const centroNombre = CENTRO_NOMBRES[centroId] || 'Desconocido';
  const subtitle = `Centro Universitario ${centroNombre}`;
  const mapaSrc = MAPA_IMAGENES[centroId] || '/mapa-engativa.png';
  // NUEVO: Ruta de la imagen de contexto, con fallback por si falta
  const contextoSrc = CONTEXTO_IMAGENES[centroId] || '/contexto-cu.png';

  if (loading) {
    return <div>Cargando...</div>;
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
              {pageData.financialRows.map((row, i) => (
                <tr
                  key={i}
                  style={row.año.includes("LB") ? { backgroundColor: "#F0E199" } : {}}
                  className={!row.año.includes("LB") && i % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="border px-1 py-[2px] font-semibold">{row.año}</td>
                  <td className="border px-1 py-[2px] text-right">{row.ingresos} {row.ingresos !== '-' ? 'mil M' : ''}</td>
                  <td className="border px-1 py-[2px] text-right">{row.costos} {row.costos !== '-' ? 'mil M' : ''}</td>
                  <td className="border px-1 py-[2px] text-right">{row.pctCostos} {row.pctCostos !== '-' ? '%' : ''}</td>
                  <td className="border px-1 py-[2px] text-right font-semibold">{row.ebitda} {row.ebitda !== '-' ? 'mil M' : ''}</td>
                  <td className="border px-1 py-[2px] text-right font-semibold">{row.pctEbitda} {row.pctEbitda !== '-' ? '%' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <GrayBanner text="PROYECCIÓN INDICADORES CENTRO UNIVERSITARIO" />
        </div>

        <div className="border shadow-sm mt-0.5">
          <table className="w-full text-[7.5px] border-collapse leading-tight">
            <thead>
              <tr className="bg-[#C3E0FB] text-black">
                <th className="border px-1 py-[3px] text-left">Nombre Corto</th>
                {["2025","2025 Real","2026","2027","2028","2029","2030"].map(h => (
                  <th key={h} className="border px-1 py-[3px] text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.indicatorsRows.map((row, i) => (
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

      {/* ── DERECHA ── */}
      <div className="flex flex-col h-full bg-white pl-3" style={{ width: "50%" }}>
        <SectionHeader showFecha subtitle={subtitle} />

        <h2 className="text-[13px] font-semibold text-gray-800 text-center -mt-1 mb-0">
          Ficha Centro Universitario
        </h2>
        <p className="text-[10px] text-gray-700 text-center" style={{ marginBottom: 0, lineHeight: 1 }}>Líder:</p>

        <div className="w-full flex justify-center items-center -mt-10" style={{ height: "80mm" }}>
          <img
            src={mapaSrc}
            style={{ height: "100%", maxWidth: "85%", objectFit: "contain", display: "block" }}
          />
        </div>

        <div className="w-full flex justify-center -mt-10" style={{ marginBottom: 2 }}>
          <div
            className="px-8 py-0.5"
            style={{
              backgroundColor: "#D9D9D9",
              clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
            }}
          >
            <h3 className="text-black font-medium text-[12px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>
              ESTUDIANTES CENTRO UNIVERSITARIO 2026 S1-Q1
            </h3>
          </div>
        </div>

        <div className="w-full flex flex-row border shadow-sm mt-0.5" style={{ alignItems: "stretch" }}>
          {/* TABLA DE ESTUDIANTES CON BORDES AÑADIDOS */}
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
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.pregradoDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.pregradoPresencial}</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">{pageData.studentSummary.pregradoTotal}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-0.5">2. Posgrado</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.posgradoDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.posgradoPresencial}</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">{pageData.studentSummary.posgradoTotal}</td>
                </tr>
                <tr className="bg-[#C7B8E7] font-semibold">
                  <td className="border px-2 py-0.5">Total</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.totalGeneralDistancia}</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.totalGeneralPresencial}</td>
                  <td className="border px-2 py-0.5 text-right">{pageData.studentSummary.totalGeneral}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ width: "45%" }} className="flex flex-row items-center justify-evenly px-2 border-l border-gray-200">
            {[
              { label: "Total población", src: "/poblacion.png", value: pageData.studentSummary.totalGeneral },
              { label: "Hombres",         src: "/hombre.png",    value: pageData.studentSummary.hombres },
              { label: "Mujeres",         src: "/mujer.png",     value: pageData.studentSummary.mujeres },
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
          <div
            className="px-8 py-0.5"
            style={{
              backgroundColor: "#D9D9D9",
              clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
            }}
          >
            <h3 className="text-black font-medium text-[12px] text-center whitespace-nowrap" style={{ fontFamily: '"Inter", sans-serif' }}>
              CONTEXTO CENTRO UNIVERSITARIO
            </h3>
          </div>
        </div>

        <div className="w-full flex-1 mt-0.5 flex items-start justify-center overflow-hidden">
          {/* NUEVO: imagen de contexto dinámica */}
          <img
            src={contextoSrc}
            alt="Contexto Centro Universitario"
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}