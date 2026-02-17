import { Header } from "./components/header";
import { DashboardGrid } from "./components/dashboard-grid";

export default function App() {
  return (
    <div 
      className="min-h-screen relative" 
      style={{ background: "linear-gradient(135deg, #012657 0%, #001a3d 100%)" }}
    >
      <div className="relative z-10">
        <Header />
        <DashboardGrid />
      </div>
    </div>
  );
}