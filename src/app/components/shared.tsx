export interface FinancialRow {
  año: string;
  ingresos: string;
  costos: string;
  pctCostos: string;
  ebitda: string;
  pctEbitda: string;
}

export const UI_COLORS = {
  navy: "#012657",
  yellow: "#ffc000",
  skyBlue: "#C3E0FB",
  lbYellow: "#fff9c4",
};

export const GrayBanner = ({ text }: { text: string }) => (
  <div className="w-full flex justify-center my-1">
    <div
      className="px-8 py-0.5"
      style={{
        backgroundColor: "#D9D9D9",
        clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
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

export const SectionHeader = ({
  showFecha = false,
  subtitle,
}: {
  showFecha?: boolean;
  subtitle: string;
}) => (
  <div className="flex flex-col mb-2 w-full">
    <div className="flex justify-between items-center px-4 py-2 w-full">
      <img src="/Logo UNIMINUTO.png" alt="Logo UNIMINUTO" className="h-16 w-auto object-contain" />
      {showFecha && (
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-400 text-[7px] leading-tight">Fecha de corte:</p>
          <p className="text-gray-600 font-medium text-[8px] leading-tight">20 de febrero de 2026</p>
        </div>
      )}
      <img src="/Logo_Acreditacion.png" alt="Logo Acreditación" className="h-14 w-auto object-contain" />
    </div>
    <div className="relative w-full h-9 flex justify-center items-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: UI_COLORS.skyBlue,
          clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
        }}
      />
      <h2
        className="relative z-10 text-black font-normal text-[13px] tracking-wide whitespace-nowrap"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {subtitle}
      </h2>
    </div>
  </div>
);
