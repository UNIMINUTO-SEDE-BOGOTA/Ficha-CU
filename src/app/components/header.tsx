import { motion } from "motion/react";

export function Header() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .header-root { font-family: 'DM Sans', sans-serif; }
        .brand-title  { font-family: 'Playfair Display', serif; }

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
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #ffc000;
          transition: width 0.3s ease;
        }
        .nav-link:hover            { color: #ffc000; }
        .nav-link:hover::after     { width: 100%; }

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
          display: inline-block;
          white-space: normal;
          word-break: break-word;
          text-align: center;
        }

        .diagonal-stripe {
          background: repeating-linear-gradient(
            -45deg,
            transparent, transparent 4px,
            rgba(255,192,0,0.06) 4px, rgba(255,192,0,0.06) 8px
          );
        }

        /* ── Hero base (desktop) ── */
        .hero-section { min-height: 520px; }

        .hero-inner {
          padding: 64px 48px 80px;
        }

        .hero-flex {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 80px;
        }

        .hero-image-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-image-size {
          width: 220px;
          height: 220px;
        }

        .hero-title {
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          color: #ffffff;
        }

        .hero-desc {
          font-size: 1.05rem;
          max-width: 520px;
        }

        .hero-subdesc {
          font-size: 0.9rem;
          max-width: 480px;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .bottom-fade { display: block; }

        .nav-brand-text { font-size: 1.15rem; }
        .nav-brand-sub  { display: block; }

        /* ── Tablet / móvil grande ── */
        @media (max-width: 900px) {
          .hero-section   { min-height: unset !important; }
          .hero-inner     { padding: 24px 16px 32px !important; }

          .hero-flex {
            flex-direction: column !important;
            gap: 16px !important;
            align-items: center !important;
          }

          .hero-image-wrap { order: -1; }

          .hero-image-size {
            width: 140px !important;
            height: 140px !important;
          }

          .orbit-dot {
            transform-origin: 50% 62px !important;
          }

          .hero-title {
            font-size: 2rem !important;
            text-align: center;
          }

          .hero-desc {
            font-size: 0.9rem !important;
            text-align: center;
            max-width: 100% !important;
          }

          .hero-subdesc {
            font-size: 0.8rem !important;
            text-align: center;
            max-width: 100% !important;
          }

          .hero-text-block {
            align-items: center;
          }

          .bottom-fade    { display: none !important; }
          .nav-brand-text { font-size: 0.95rem !important; }
          .nav-brand-sub  { display: none; }

          .nav-hex {
            width: 38px !important;
            height: 38px !important;
          }
        }

        /* ── Móvil pequeño (< 400px) ── */
        @media (max-width: 400px) {
          .hero-inner { padding: 18px 12px 24px !important; }

          .hero-image-size {
            width: 110px !important;
            height: 110px !important;
          }

          .orbit-dot {
            transform-origin: 50% 47px !important;
          }

          .hero-title   { font-size: 1.7rem !important; }
          .hero-desc    { font-size: 0.82rem !important; }
          .hero-subdesc { font-size: 0.75rem !important; }

          .pill-tag {
            font-size: 0.6rem !important;
            letter-spacing: 0.06em !important;
          }
        }
      `}</style>

      <div className="header-root">

        {/* ── NAVBAR ── */}
        <motion.nav
          className="w-full flex items-center px-4 lg:px-10 py-1"
          style={{
            borderBottom: "none",
            background: "linear-gradient(60deg, #ffc000 0%, #012657 50%, #012657 100%)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            overflow: "hidden",
            minWidth: 0,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2" style={{ minWidth: 0, overflow: "hidden" }}>
            <motion.div>
              <div className="flex items-center" style={{ width: "120px", minWidth: "120px" }}>
              <img
                src="/Logo UNIMINUTO.png"
                alt="Logo"
                style={{ 
                  width: "auto", 
                  height: "100px", 
                  objectFit: "contain",
                  display: "block"
                }}
              />
              </div>
            </motion.div>
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              
            </div>
          </div>

        </motion.nav>

        {/* ── HERO ── */}
        <div className="hero-section relative overflow-hidden">

          {/* Fondos decorativos */}
          <div className="absolute inset-0 grid-dot" />
          <div className="absolute top-0 right-0 w-1/3 h-full diagonal-stripe opacity-60" />

          <motion.div
            className="absolute rounded-full"
            style={{
              width: 500, height: 500,
              top: -150, right: -100,
              background: "radial-gradient(circle, rgba(0,187,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300, height: 300,
              bottom: -80, left: "20%",
              background: "radial-gradient(circle, rgba(255,192,0,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{ top: "50%", height: 1, background: "rgba(255,192,0,0.08)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          {/* Contenido */}
          <div className="hero-inner relative z-10 max-w-7xl mx-auto">
            <div className="hero-flex">

              {/* Texto */}
              <div className="flex-1 hero-text-block">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <span className="pill-tag">Ficha Analítica De La Sede</span>
                </motion.div>

                <motion.h1
                  className="brand-title hero-title mt-5 leading-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                >
                  Fichas de Centros Universitarios - {" "}
                  <span style={{ color: "#ffc000", textShadow: "0 0 40px rgba(255,192,0,0.3)" }}>
                    Bogotá
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
                  className="hero-desc mt-6"
                  style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  Plataforma de{" "}
                  <strong style={{ color: "#fff" }}>inteligencia de la Sede</strong> para el
                  análisis y seguimiento de los Centros Universitarios en Bogotá. Consulta fichas de
                  datos, indicadores académicos y proyecciones financieras en tiempo real.
                </motion.p>

                <motion.p
                  className="hero-subdesc mt-3"
                  style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  Cada ficha integra información de matrícula, deserción, indicadores de calidad,
                  proyecciones EBITDA y contexto territorial — todo en un solo lugar.
                </motion.p>
              </div>

              <motion.button
  onClick={() =>
    document.getElementById("fichas")?.scrollIntoView({ behavior: "smooth" })
  }
  className="flex flex-col items-center gap-1 mt-8"
  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ffc000" }}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.9 }}
  whileHover={{ y: 4 }}
>
  <span style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
    Ver Fichas
  </span>
  <motion.svg
    width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#ffc000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </motion.svg>
</motion.button>
              {/* Imagen / logo */}
              <motion.div
                className="hero-image-wrap"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 80 }}
              >
                <div className="hero-image-size" style={{ position: "relative" }}>
                  <motion.div
                    className="rounded-full absolute inset-0"
                    style={{ border: "1px solid rgba(255,192,0,0.2)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="rounded-full absolute"
                    style={{ inset: 16, border: "1px dashed rgba(0,187,255,0.2)" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div
                    className="hex-badge relative z-10 flex items-center justify-center overflow-hidden hero-image-size"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(1,38,87,0.9), rgba(0,64,128,0.8))",
                      border: "2px solid rgba(255,192,0,0.3)",
                    }}
                  >
                    <img
                      src="/logo.png"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <motion.div
                    className="orbit-dot absolute rounded-full"
                    style={{
                      width: 10, height: 10,
                      background: "#ffc000",
                      top: 8, left: "50%", marginLeft: -5,
                      boxShadow: "0 0 12px #ffc000",
                      transformOrigin: "50% 102px",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

            </div>
          </div>

          {/* Fade inferior — solo desktop */}
          <div
            className="bottom-fade absolute bottom-0 left-0 right-0 h-16"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(1,26,61,0.6))",
            }}
          />
        </div>

      </div>
    </>
  );
}