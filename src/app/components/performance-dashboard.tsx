import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const performanceData = [
  { periodo: "2020-A", promedio: 82, aprobacion: 78, eficiencia: 85 },
  { periodo: "2020-B", promedio: 84, aprobacion: 80, eficiencia: 87 },
  { periodo: "2021-A", promedio: 83, aprobacion: 79, eficiencia: 86 },
  { periodo: "2021-B", promedio: 85, aprobacion: 82, eficiencia: 88 },
  { periodo: "2022-A", promedio: 86, aprobacion: 84, eficiencia: 90 },
  { periodo: "2022-B", promedio: 87, aprobacion: 85, eficiencia: 91 },
  { periodo: "2023-A", promedio: 88, aprobacion: 86, eficiencia: 92 },
];

const centrosPerformance = [
  { centro: "CUCEI", promedio: 86, aprobacion: 83, desercion: 8 },
  { centro: "CUCS", promedio: 88, aprobacion: 85, desercion: 7 },
  { centro: "CUCEA", promedio: 84, aprobacion: 81, desercion: 9 },
  { centro: "CUCSH", promedio: 87, aprobacion: 84, desercion: 8 },
  { centro: "CUAAD", promedio: 89, aprobacion: 86, desercion: 6 },
  { centro: "CUCBA", promedio: 85, aprobacion: 82, desercion: 9 },
];

export function PerformanceDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="p-4 rounded-lg" 
          style={{ backgroundColor: "#f0f8ff", borderLeft: "4px solid #012657" }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05, x: 10 }}
        >
          <p className="text-sm" style={{ color: "#012657" }}>Promedio General</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#012657" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            86.5
          </motion.p>
        </motion.div>
        <motion.div 
          className="p-4 rounded-lg" 
          style={{ backgroundColor: "#e6f7ff", borderLeft: "4px solid #00bbff" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <p className="text-sm" style={{ color: "#012657" }}>Tasa de Aprobación</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#00bbff" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          >
            83.5%
          </motion.p>
        </motion.div>
        <motion.div 
          className="p-4 rounded-lg" 
          style={{ backgroundColor: "#fff9e6", borderLeft: "4px solid #ffc000" }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05, x: -10 }}
        >
          <p className="text-sm" style={{ color: "#012657" }}>Eficiencia Terminal</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#ffc000" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
          >
            88.1%
          </motion.p>
        </motion.div>
      </div>

      {/* Line Chart - Tendencias */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="mb-4" style={{ color: "#012657" }}>
          Tendencias de Rendimiento Histórico
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periodo" />
            <YAxis domain={[70, 100]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="promedio" 
              stroke="#012657" 
              strokeWidth={2}
              name="Promedio General"
            />
            <Line 
              type="monotone" 
              dataKey="aprobacion" 
              stroke="#00bbff" 
              strokeWidth={2}
              name="Tasa Aprobación %"
            />
            <Line 
              type="monotone" 
              dataKey="eficiencia" 
              stroke="#ffc000" 
              strokeWidth={2}
              name="Eficiencia Terminal %"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Area Chart - Comparativa por Centro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="mb-4" style={{ color: "#012657" }}>
          Comparativa de Rendimiento por Centro Universitario
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={centrosPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="centro" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="promedio" 
              stackId="1"
              stroke="#012657" 
              fill="#012657"
              fillOpacity={0.6}
              name="Promedio"
            />
            <Area 
              type="monotone" 
              dataKey="aprobacion" 
              stackId="2"
              stroke="#00bbff" 
              fill="#00bbff"
              fillOpacity={0.6}
              name="Aprobación %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Table with data */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="mb-4" style={{ color: "#012657" }}>
          Tabla Detallada de Indicadores
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#012657" }}>
                <th className="px-4 py-3 text-left text-white border border-gray-300">Centro</th>
                <th className="px-4 py-3 text-left text-white border border-gray-300">Promedio</th>
                <th className="px-4 py-3 text-left text-white border border-gray-300">Aprobación %</th>
                <th className="px-4 py-3 text-left text-white border border-gray-300">Deserción %</th>
              </tr>
            </thead>
            <tbody>
              {centrosPerformance.map((centro, index) => (
                <motion.tr 
                  key={centro.centro}
                  style={{ backgroundColor: index % 2 === 0 ? "#f0f8ff" : "white" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "#e6f7ff", x: 5 }}
                >
                  <td className="px-4 py-2 border border-gray-300" style={{ color: "#012657" }}>
                    {centro.centro}
                  </td>
                  <td className="px-4 py-2 border border-gray-300" style={{ color: "#012657" }}>
                    {centro.promedio}
                  </td>
                  <td className="px-4 py-2 border border-gray-300" style={{ color: "#012657" }}>
                    {centro.aprobacion}%
                  </td>
                  <td className="px-4 py-2 border border-gray-300" style={{ color: "#012657" }}>
                    {centro.desercion}%
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}