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
        
      </div>
    </>
  );
}
