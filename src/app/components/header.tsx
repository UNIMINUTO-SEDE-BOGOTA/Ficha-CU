import { motion } from "motion/react";

export function Header() {
  return (
    <header className="px-6 py-8 lg:px-12 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-3xl lg:text-4xl xl:text-5xl mb-3"
          style={{ color: "#ffc000" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Tableros de Análisis
        </motion.h1>
        <motion.p 
          className="text-lg lg:text-xl mb-6"
          style={{ color: "#00bbff" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Aquí puedes visualizar los tableros de fichas centros universitarios
        </motion.p>
        
        {/* Introduction Text */}
        <motion.div 
          className="mt-8 p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        >
          <motion.p 
            className="text-base lg:text-lg leading-relaxed mb-4"
            style={{ color: "#ffffff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Bienvenido al sistema de visualización de datos de centros universitarios. Esta plataforma 
            ha sido diseñada para proporcionar información detallada y actualizada sobre el rendimiento 
            académico y la matrícula de nuestros centros educativos.
          </motion.p>
          <motion.p 
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: "#ffffff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            A continuación, encontrarás dos dashboards interactivos que presentan indicadores clave 
            de desempeño, tendencias históricas y comparativas entre los diferentes centros universitarios. 
            Cada dashboard cuenta con opciones para imprimir o descargar los reportes según tus necesidades. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}