import { Header } from "./components/header";
import { DashboardGrid } from "./components/dashboard-grid";

export default function App() {
  return (
    <div className="min-h-screen relative">

  {/* HEADER con fondo azul */}
  <div
    style={{
      background: "linear-gradient(135deg, #012657 0%, #001a3d 100%)"
    }}
  >
    <Header />
  </div>

  {/* DASHBOARD fondo blanco */}
  <div style={{ background: "#ffffff" }}>
    <DashboardGrid />
  </div>

</div>
  );
}
