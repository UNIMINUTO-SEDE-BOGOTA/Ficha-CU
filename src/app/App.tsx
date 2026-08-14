// App.tsx
import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { DashboardGrid } from './components/dashboard-grid'
import { InstallPWA } from './components/InstallPWA'

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [infoModalOpen, setInfoModalOpen] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    const handleControllerChange = () => { window.location.reload() }
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)
    return () => { navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange) }
  }, [])

  return (
    <div
      className="min-h-screen relative"
      style={{
        marginBottom: bannerVisible ? 68 : 0,
        transition: 'margin-bottom 0.3s ease',
      }}
    >
      <style>{`
        .info-fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffc000 0%, #ff9500 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          box-shadow: 0 8px 32px rgba(255, 192, 0, 0.6);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 500;
        }

        .info-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 12px 48px rgba(255, 192, 0, 0.8);
        }

        .info-fab:active {
          transform: scale(0.96);
        }

        .info-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .info-modal-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: auto;
          max-height: 80vh;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #ffc000;
        }

        .info-modal-title {
          font-size: 26px;
          font-weight: 800;
          color: #012657;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-close-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(255, 192, 0, 0.1);
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          color: #012657;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .info-close-btn:hover {
          background: rgba(255, 192, 0, 0.2);
          transform: scale(1.1);
        }

        .info-section {
          margin-bottom: 20px;
        }

        .info-section-title {
          font-size: 16px;
          font-weight: 700;
          color: #012657;
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .info-section-text {
          font-size: 14px;
          color: #333;
          line-height: 1.7;
          margin: 0;
        }

        .info-section-list {
          font-size: 14px;
          color: #333;
          line-height: 1.8;
          padding-left: 20px;
          margin: 0;
        }

        .info-section-list li {
          margin-bottom: 8px;
        }

        .info-footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #999;
          text-align: center;
        }

        @media (max-width: 768px) {
          .info-fab {
            bottom: 140px;
            right: 24px;
            width: 56px;
            height: 56px;
            font-size: 24px;
          }

          .info-modal-content {
            padding: 24px;
          }

          .info-modal-title {
            font-size: 22px;
          }
        }
      `}</style>

      <div style={{ background: 'linear-gradient(135deg, #012657 0%, #001a3d 100%)' }}>
        <Header />
      </div>

      <div style={{ background: '#ffffff' }}>
        <DashboardGrid bannerVisible={bannerVisible} />
      </div>

      {/* Botón Flotante de Información */}
      <button
        className="info-fab"
        onClick={() => setInfoModalOpen(true)}
        title="Información del Sistema"
      >
        ℹ️
      </button>

      {/* Modal de Información */}
      {infoModalOpen && (
        <div
          className="info-modal-backdrop"
          onClick={() => setInfoModalOpen(false)}
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
                onClick={() => setInfoModalOpen(false)}
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

      <InstallPWA onBannerChange={setBannerVisible} />
    </div>
  )
}