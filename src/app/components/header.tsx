import { motion } from "motion/react";
import { useState } from "react";

export function Header() {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <>
    <style>{`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');

  .header-root {
    font-family: 'DM Sans', sans-serif;
    width: 100%;
  }

  /* =========================
     BOTÓN INFORMACIÓN
     ========================= */

  .info-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(1, 38, 87, 0.12);
    background: #ffffff;
    color: #012657;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
    margin-left: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .info-btn:hover {
    background: #ffc000;
    color: #012657;
    border-color: #ffc000;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 192, 0, 0.35);
  }

  .info-btn:active {
    transform: scale(0.95);
  }

  /* =========================
     MODAL
     ========================= */

  .info-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px);
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .info-modal-content {
    background: #ffffff;
    border-radius: 20px;
    padding: 32px;
    width: 90%;
    max-width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .info-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 3px solid #ffc000;
  }

  .info-modal-title {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
    color: #012657;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .info-close-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 192, 0, 0.15);
    color: #012657;
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .info-close-btn:hover {
    background: #ffc000;
    transform: rotate(90deg);
  }

  .info-section {
    margin-bottom: 24px;
  }

  .info-section-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #012657;
  }

  .info-section-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.8;
    color: #444;
  }

  .info-section-list {
    margin: 0;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.9;
    color: #444;
  }

  .info-section-list li {
    margin-bottom: 8px;
  }

  .info-footer {
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
    font-size: 12px;
    color: #777;
  }

  /* =========================
     RESPONSIVE
     ========================= */

  @media (max-width: 768px) {
    .info-modal-content {
      padding: 24px;
      width: 95%;
    }

    .info-modal-title {
      font-size: 22px;
    }
  }
`}</style>

      <div className="header-root">

        {/* ── NAVBAR ── */}
        <motion.nav
          className="w-full flex items-center px-4 lg:px-10 py-1"
          style={{
            borderBottom: "none",
            background: "#012657",
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
          <div className="flex items-center gap-2" style={{ minWidth: 0, overflow: "hidden", width: "100%" }}>
            <motion.div>
              <div className="flex items-center" style={{ width: "120px", minWidth: "120px" }}>
              <img
                src="/Logo_Unificado.png"
                alt="Logo"
                style={{
                  width: "auto",
                  height: "100px",
                  objectFit: "contain",
                  display: "block",
                  transform: "scale(1.8)",
                  transformOrigin: "left center",
                }}
              />
              </div>
            </motion.div>
            <div style={{ minWidth: 0, overflow: "hidden", flex: 1 }}>
              
            </div>
            
            {/* Botón de Información */}
            <button
              className="info-btn"
              onClick={() => setInfoOpen(true)}
              title="Información del Sistema"
            >
              ℹ️
            </button>
          </div>

        </motion.nav>

        {/* Modal de Información */}
        {infoOpen && (
          <div
            className="info-modal-backdrop"
            onClick={() => setInfoOpen(false)}
          >
            <div
              className="info-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="info-modal-header">
                <h2 className="info-modal-title">
                  ℹ️ Información del Sistema
                </h2>
                <button
                  className="info-close-btn"
                  onClick={() => setInfoOpen(false)}
                  title="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="info-section">
                <h3 className="info-section-title">Ficha Inteligente de Centros Universitarios</h3>
                <p className="info-section-text">
                  Sistema integral de visualización estratégica de información institucional diseñado para facilitar el análisis y la toma de decisiones académicas y administrativas en los diferentes centros universitarios.
                </p>
              </div>

              <div className="info-section">
                <h3 className="info-section-title">Funcionalidades Principales</h3>
                <ul className="info-section-list">
                  <li>📊 Consolidación de indicadores clave institucionales</li>
                  <li>📈 Visualización de proyecciones estudiantiles (2026-2030)</li>
                  <li>🔄 Análisis comparativo entre centros universitarios</li>
                  <li>📍 Información demográfica y de contexto</li>
                  <li>📄 Exportación de fichas completas en formato PDF</li>
                  <li>📱 Interfaz responsive para dispositivos móviles</li>
                  <li>⚙️ Configuración flexible de centros y vistas</li>
                </ul>
              </div>

              <div className="info-section">
                <h3 className="info-section-title">Centros Disponibles</h3>
                <ul className="info-section-list">
                  <li>Especial Minuto de Dios - Engativá</li>
                  <li>Centro Kennedy</li>
                  <li>Las Cruces - Santa Fe</li>
                  <li>Perdomo - Ciudad Bolívar</li>
                  <li>San Cristóbal Norte - Usaquén</li>
                </ul>
              </div>

              <div className="info-footer">
                <p style={{ margin: 0 }}>
                  © 2026 - Observatorio de Centros Universitarios<br />
                  Universidad Minuto de Dios
                </p>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}
