import React from 'react';
import { FinancialRow, GrayBanner, SectionHeader } from './shared';

const financialData: FinancialRow[] = [
  { año: "LB 2024", ingresos: "136,53", costos: "119,65", pctCostos: "87,6",  ebitda: "21,31", pctEbitda: "15,61" },
  { año: "2025",    ingresos: "138,45", costos: "115,82", pctCostos: "83,7",  ebitda: "23,50", pctEbitda: "16,97" },
  { año: "2026",    ingresos: "142,45", costos: "118,79", pctCostos: "83,4",  ebitda: "24,94", pctEbitda: "17,51" },
  { año: "2027",    ingresos: "150,64", costos: "127,29", pctCostos: "84,5",  ebitda: "29,62", pctEbitda: "19,66" },
  { año: "2028",    ingresos: "164,70", costos: "135,88", pctCostos: "82,5",  ebitda: "36,56", pctEbitda: "22,20" },
  { año: "2029",    ingresos: "179,45", costos: "145,71", pctCostos: "81,2",  ebitda: "42,79", pctEbitda: "23,85" },
  { año: "2030",    ingresos: "195,55", costos: "156,44", pctCostos: "80,0",  ebitda: "48,84", pctEbitda: "24,98" },
];

const indicadores = [
  ["Deserción Distancia",           "10%",   "12,1%",  "10%",   "10%",   "10%",   "10%",   "11%"  ],
  ["Deserción Presencial",          "8%",    "10,04%", "8%",    "8%",    "8%",    "8%",    "8%"   ],
  ["Diversificación de Ingresos",   "5%",    "6%",     "6%",    "7%",    "8%",    "9%",    "10%"  ],
  ["EBITDA",                        "17%",   "16,97%", "15,5%", "19,7%", "22,2%", "23,8%", "25%"  ],
  ["Educación Continua",            "4615",  "",       "5896",  "7404",  "9021",  "10706", "12430"],
  ["Estudiantes Centro Universitario","18244","205",   "19038", "19592", "20245", "20847", "21372"],
  ["Matrícula Nuevos",              "7700",  "0",      "8195",  "8560",  "8730",  "8770",  "8775" ],
  ["Saber PRO Presencial",          "135",   "",       "136",   "137",   "137",   "138",   "138"  ],
  ["Tasa de Conversión",            "58%",   "",       "60%",   "62%",   "64%",   "66%",   "68%"  ],
  ["Tipología Centro Universitario","A",     "A",      "A",     "A",     "A",     "A",     "A"    ],
];

const SUBTITLE = "Centro Universitario Especial Minuto de Dios - Engativá";

interface Props {
  innerRef?: React.Ref<HTMLDivElement>;
}

export function Page1({ innerRef }: Props) {
  return (
    <div
      ref={innerRef}
      className="bg-white overflow-hidden flex flex-row"
      style={{ width: "297mm", height: "210mm", padding: "2mm 8mm 6mm 8mm" }}
    >
      {/* ── IZQUIERDA ── */}
      <div className="flex flex-col h-full border-r pr-3" style={{ width: "50%", borderColor: "#e0e0e0" }}>
        <SectionHeader subtitle={SUBTITLE} />
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
              {indicadores.map((row, i) => (
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
        <SectionHeader showFecha subtitle={SUBTITLE} />

        <h2 className="text-[13px] font-semibold text-gray-800 text-center -mt-1 mb-0">
          Ficha Centro Universitario
        </h2>
        <p className="text-[10px] text-gray-700 text-center" style={{ marginBottom: 0, lineHeight: 1 }}>Líder:</p>

        <div className="w-full flex justify-center items-center -mt-10" style={{ height: "80mm" }}>
          <img
            src="/engativa.png"
            alt="Mapa Engativá"
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
                  <td className="border px-2 py-0.5 text-right">4.643</td>
                  <td className="border px-2 py-0.5 text-right">12.669</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">17.312</td>
                </tr>
                <tr>
                  <td className="border px-2 py-0.5">2. Posgrado</td>
                  <td className="border px-2 py-0.5 text-right">617</td>
                  <td className="border px-2 py-0.5 text-right">412</td>
                  <td className="border px-2 py-0.5 text-right font-bold bg-[#C7B8E7]">1.029</td>
                </tr>
                <tr className="bg-[#C7B8E7] font-semibold">
                  <td className="border px-2 py-0.5">Total</td>
                  <td className="border px-2 py-0.5 text-right">5.260</td>
                  <td className="border px-2 py-0.5 text-right">13.081</td>
                  <td className="border px-2 py-0.5 text-right">18.341</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ width: "45%" }} className="flex flex-row items-center justify-evenly px-2 border-l border-gray-200">
            {[
              { label: "Total población", src: "/poblacion.png", value: "18.341" },
              { label: "Hombres",         src: "/hombre.png",    value: "7.986"  },
              { label: "Mujeres",         src: "/mujer.png",     value: "10.355" },
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
          <img
            src="/contextoCU.png"
            alt="Contexto Centro Universitario"
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}