import { motion } from "motion/react";

export function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          background: #012657;
          color: #ffffff;
          padding: 24px 20px;
          box-sizing: border-box;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-text {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .footer-title {
          margin: 0 0 4px;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-accent {
          color: #ffc000;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-text {
            font-size: 12px;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-content">
          <div>
            <p className="footer-title">
              Observatorio de Centros Universitarios
            </p>

            <p className="footer-text">
              Universidad <span className="footer-accent">Minuto de Dios</span>
            </p>
          </div>

          <p className="footer-text">
            © 2026 Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  );
}