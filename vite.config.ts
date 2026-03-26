import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Plugin para forzar index.html en minúscula en el output
const forceIndexLowercase = () => ({
  name: 'force-index-lowercase',
  closeBundle() {
    const distPath = path.resolve(__dirname, 'dist')
    const upper = path.join(distPath, 'Index.html')
    const lower = path.join(distPath, 'index.html')

    // Si existe Index.html con mayúscula, lo renombra
    if (fs.existsSync(upper)) {
      fs.renameSync(upper, lower)
      console.log('✓ Renombrado: Index.html → index.html')
    }
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    forceIndexLowercase(),  // ← aquí
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Mi Tablero',
        short_name: 'Tablero',
        description: 'Tablero de control',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#012657',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^\/api/,
            handler: 'NetworkOnly',
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-cu.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://api-cu.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})