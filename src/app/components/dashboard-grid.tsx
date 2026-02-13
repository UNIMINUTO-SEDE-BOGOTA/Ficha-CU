import { motion } from "motion/react";
import { DashboardCard } from "./dashboard-card";
import { EnrollmentDashboard } from "./enrollment-dashboard";
import { PerformanceDashboard } from "./performance-dashboard";
import { UniversityProfileDashboard } from "./university-profile-dashboard"; // <-- Línea agregada

export function DashboardGrid() {
  return (
    <div className="px-6 pb-12 lg:px-12 lg:pb-16">
      <div className="max-w-7xl mx-auto grid gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DashboardCard 
            title="Dashboard de Matrícula por Centro Universitario"
            id="enrollment-dashboard"
          >
            <EnrollmentDashboard />
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DashboardCard 
            title="Dashboard de Rendimiento Académico"
            id="performance-dashboard"
          >
            <PerformanceDashboard />
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <DashboardCard
            title="Ficha y Contexto del Centro Universitario"
            id="university-profile"
          >
            <UniversityProfileDashboard /> {/* Ahora sí está definido */}
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}