// App.tsx
import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { DashboardGrid } from './components/dashboard-grid'
import { InstallPWA } from './components/InstallPWA'
import { WithOTPAuth } from './components/OTPLogin'  

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    const handleControllerChange = () => { window.location.reload() }
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)
    return () => { navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange) }
  }, [])

  return (
    <WithOTPAuth appName="Ficha CU">  {/* 👈 envolver todo */}
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
    </WithOTPAuth>
  )
}