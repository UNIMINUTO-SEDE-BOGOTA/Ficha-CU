import { useState } from 'react'
import { Header } from './components/header'
import { DashboardGrid } from './components/dashboard-grid'
import { InstallPWA } from './components/InstallPWA'

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(false)

  return (
    <div
      className="min-h-screen relative"
      style={{
        marginBottom: bannerVisible ? 68 : 0,
        transition: 'margin-bottom 0.3s ease',
      }}
    >
      <div style={{ background: 'linear-gradient(135deg, #012657 0%, #001a3d 100%)' }}>
        <Header />
      </div>

      <div style={{ background: '#ffffff' }}>
        <DashboardGrid bannerVisible={bannerVisible} />
      </div>

      <InstallPWA onBannerChange={setBannerVisible} />
    </div>
  )
}