// App.tsx
import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { DashboardGrid } from './components/dashboard-grid'
import { InstallPWA } from './components/InstallPWA'
import { Footer } from './components/footer'

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const handleControllerChange = () => {
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange
    )

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleControllerChange
      )
    }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        marginBottom: bannerVisible ? 68 : 0,
        transition: 'margin-bottom 0.3s ease',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background:
            'linear-gradient(135deg, #012657 0%, #001a3d 100%)',
        }}
      >
        <Header />
      </div>

      {/* CONTENIDO */}
      <main
        className="flex-1"
        style={{
          background: '#ffffff',
        }}
      >
        <DashboardGrid bannerVisible={bannerVisible} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* INSTALACIÓN PWA */}
      <InstallPWA onBannerChange={setBannerVisible} />
    </div>
  )
}