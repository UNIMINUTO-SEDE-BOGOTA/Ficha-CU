import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const enrollmentData = [
  { centro: "CUCEI", estudiantes: 8500, nuevos: 1200, egresados: 950 },
  { centro: "CUCS", estudiantes: 7200, nuevos: 1050, egresados: 850 },
  { centro: "CUCEA", estudiantes: 9800, nuevos: 1400, egresados: 1100 },
  { centro: "CUCSH", estudiantes: 6500, nuevos: 900, egresados: 750 },
  { centro: "CUAAD", estudiantes: 5200, nuevos: 750, egresados: 600 },
  { centro: "CUCBA", estudiantes: 4800, nuevos: 680, egresados: 550 },
];

const distributionData = [
  { name: "CUCEI", value: 8500 },
  { name: "CUCS", value: 7200 },
  { name: "CUCEA", value: 9800 },
  { name: "CUCSH", value: 6500 },
  { name: "CUAAD", value: 5200 },
  { name: "CUCBA", value: 4800 },
];

const COLORS = ["#012657", "#00bbff", "#ffc000", "#004080", "#33ccff", "#ffd633"];

export function EnrollmentDashboard() {
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
          <p className="text-sm" style={{ color: "#012657" }}>Total Estudiantes</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#012657" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            42,000
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
          <p className="text-sm" style={{ color: "#012657" }}>Nuevos Ingresos</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#00bbff" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          >
            5,980
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
          <p className="text-sm" style={{ color: "#012657" }}>Egresados</p>
          <motion.p 
            className="text-3xl mt-1" 
            style={{ color: "#ffc000" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
          >
            4,800
          </motion.p>
        </motion.div>
      </div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="mb-4" style={{ color: "#012657" }}>
          Matrícula por Centro Universitario
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="centro" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="estudiantes" fill="#012657" name="Total Estudiantes" />
            <Bar dataKey="nuevos" fill="#00bbff" name="Nuevos Ingresos" />
            <Bar dataKey="egresados" fill="#ffc000" name="Egresados" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="mb-4" style={{ color: "#012657" }}>
          Distribución de Estudiantes
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}