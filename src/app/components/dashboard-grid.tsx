import { motion } from "motion/react";
import { UniversityProfileDashboard } from "./university-profile-dashboard";

export function DashboardGrid() {
  return (
    <div id="fichas" className="px-6 pb-12 lg:px-12 lg:pb-16">
      <div className="max-w-7xl mx-auto grid gap-6 lg:gap-8">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <UniversityProfileDashboard />
        </motion.div>

      </div>
    </div>
  );
}