import { Download, Printer } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface DashboardCardProps {
  title: string;
  id: string;
  children: ReactNode;
}

export function DashboardCard({ title, id, children }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePrint = () => {
    const printContent = document.getElementById(id);
    if (!printContent) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    printWindow.document.write('<html><head><title>' + title + '</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { 
        font-family: Arial, sans-serif; 
        padding: 20px;
        background: white;
      }
      h1 {
        color: #012657;
        margin-bottom: 20px;
        font-size: 24px;
      }
      .no-print {
        display: none;
      }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>' + title + '</h1>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleDownload = () => {
    // Crear un reporte en formato de texto para descarga
    const reportData = {
      titulo: title,
      fecha: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      dashboard: id
    };

    const reportText = `
REPORTE DE ANÁLISIS
===================

Título: ${reportData.titulo}
Fecha de generación: ${reportData.fecha}

Este reporte contiene información del dashboard: ${reportData.dashboard}

Para visualizar los gráficos completos, por favor utilice la función de impresión.
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${id}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: "linear-gradient(90deg, #012657 0%, #00bbff 100%)" }}
        animate={{ 
          background: isHovered 
            ? "linear-gradient(90deg, #00bbff 0%, #012657 100%)" 
            : "linear-gradient(90deg, #012657 0%, #00bbff 100%)"
        }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl lg:text-2xl text-white">
          {title}
        </h2>
        <div className="flex gap-3">
          <motion.button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-md transition-all"
            style={{ backgroundColor: "#ffc000", color: "#012657" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Printer className="w-4 h-4" />
            <span className="text-sm font-medium">Imprimir</span>
          </motion.button>
          <motion.button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-md transition-all"
            style={{ color: "#012657" }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Descargar</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div id={id} className="p-6">
        {children}
      </div>
    </motion.div>
  );
}