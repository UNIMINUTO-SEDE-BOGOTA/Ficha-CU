import { motion } from "motion/react";
export function Header() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .header-root { font-family: 'DM Sans', sans-serif; }
        .brand-title { font-family: 'Playfair Display', serif; }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.75);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffc000;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #ffc000; }
        .nav-link:hover::after { width: 100%; }

        .hex-badge {
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        }

        .grid-dot {
          background-image: radial-gradient(circle, rgba(255,192,0,0.15) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .stat-card {
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s, background 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(255,192,0,0.4);
          background: rgba(255,192,0,0.06);
        }

        .pill-tag {
          background: rgba(255,192,0,0.12);
          border: 1px solid rgba(255,192,0,0.3);
          color: #ffc000;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
        }

        .diagonal-stripe {
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 4px,
            rgba(255,192,0,0.06) 4px,
            rgba(255,192,0,0.06) 8px
          );
        }
      `}</style>

      <div className="header-root">

        {/* ===== NAVBAR ===== */}
        <motion.nav
          className="w-full flex items-center justify-between px-6 lg:px-12 py-4"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(1,38,87,0.6)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            {/* Logo placeholder hexagonal */}
            <motion.div
              className="hex-badge flex items-center justify-center"
              style={{
                width: 42,
                height: 42,
                background: "linear-gradient(135deg, #ffc000, #e6a800)",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                  src="/profile.png"
                  alt="Logo"
                  style={{ width: "90%", height: "90%", objectFit: "contain" }}
                />
            </motion.div>

            <div>
              <p className="brand-title text-white font-black leading-none" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                Ecosistema <span style={{ color: "#ffc000" }}>360</span>
              </p>
              <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Observatorio Analítico
              </p>
            </div>
          </div>

          {/* CTA button */}
          <motion.button
            onClick={() => document.getElementById('fichas')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold uppercase tracking-widest"
            style={{ background: "#ffc000", color: "#012657" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,192,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Ver Fichas</span>
            <span style={{ fontSize: 14 }}>→</span>
          </motion.button>

        </motion.nav>

        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>

          {/* Dot grid background */}
          <div className="absolute inset-0 grid-dot" />

          {/* Diagonal stripe accent */}
          <div className="absolute top-0 right-0 w-1/3 h-full diagonal-stripe opacity-60" />

          {/* Glowing orb */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              top: -150,
              right: -100,
              background: "radial-gradient(circle, rgba(0,187,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              bottom: -80,
              left: "20%",
              background: "radial-gradient(circle, rgba(255,192,0,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Thin horizontal accent line */}
          <motion.div
            className="absolute left-0 right-0"
            style={{ top: "50%", height: 1, background: "rgba(255,192,0,0.08)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* LEFT — Text content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <span className="pill-tag">Observatorio · Analítico · Institucional</span>
                </motion.div>

                <motion.h1
                  className="brand-title mt-5 leading-none"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", color: "#ffffff" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                >
                  Ecosistema{" "}
                  <span
                    style={{
                      color: "#ffc000",
                      textShadow: "0 0 40px rgba(255,192,0,0.3)",
                    }}
                  >
                    360
                  </span>
                </motion.h1>

                <motion.div
                  className="mt-2"
                  style={{ width: 60, height: 3, background: "#ffc000", borderRadius: 2 }}
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />

                <motion.p
                  className="mt-6"
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 520, fontFamily: "'DM Sans', sans-serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  Plataforma de <strong style={{ color: "#fff" }}>inteligencia institucional</strong> para el análisis y seguimiento
                  de el Centro Universitario Sede Bogotá. Consulta fichas de datos, indicadores
                  académicos y proyecciones financieras en tiempo real.
                </motion.p>

                <motion.p
                  className="mt-3"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 480 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  Cada ficha integra información de matrícula, deserción, indicadores de calidad,
                  proyecciones EBITDA y contexto territorial — todo en un solo lugar.
                </motion.p>

                {/* Stats row */}
                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  {[
                    { value: "18.341", label: "Estudiantes activos" },
                    { value: "7", label: "Años proyectados" },
                    { value: "10+", label: "Indicadores clave" },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-card rounded-lg px-5 py-3 min-w-[130px]">
                      <p className="brand-title" style={{ color: "#ffc000", fontSize: "1.6rem", lineHeight: 1 }}>
                        {stat.value}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — Logo / Image placeholder */}
              <motion.div
                className="flex-shrink-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 80 }}
              >
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    className="rounded-full absolute inset-0"
                    style={{ border: "1px solid rgba(255,192,0,0.2)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Inner ring */}
                  <motion.div
                    className="rounded-full absolute"
                    style={{ inset: 16, border: "1px dashed rgba(0,187,255,0.2)" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Logo container */}
                  <div
                    className="hex-badge relative z-10 flex items-center justify-center overflow-hidden"
                    style={{
                      width: 220,
                      height: 220,
                      background: "linear-gradient(135deg, rgba(1,38,87,0.9), rgba(0,64,128,0.8))",
                      border: "2px solid rgba(255,192,0,0.3)",
                    }}
                  >
                    {/* Bloque de imagen*/}
                      <img
                          src="/logo.png"
                          alt="Ecosistema 360"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>

                  {/* Orbiting dot */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: 10, height: 10, background: "#ffc000", top: 8, left: "50%", marginLeft: -5, boxShadow: "0 0 12px #ffc000", transformOrigin: "50% 102px" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(1,26,61,0.6))" }}
          />
        </div>
      </div>
    </>
  );
}