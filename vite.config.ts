// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const forceIndexLowercase = () => ({
  name: 'force-index-lowercase',
  closeBundle() {
    const distPath = path.resolve(__dirname, 'dist')
    const upper = path.join(distPath, 'Index.html')
    const lower = path.join(distPath, 'index.html')

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
    forceIndexLowercase(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Ficha de Centros Universitarios - Bogotá',
        short_name: 'Ficha CU',
        description: 'Ficha de Centros Universitarios de Bogotá - Información actualizada y detallada',
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
        navigateFallbackAllowlist: [/^(?!\/__).*/],
        navigateFallbackDenylist: [/^\/api/],

        // Incrementá este número en cada deploy importante
        // para forzar invalidación total del cache
        cacheId: 'ficha-cu-v2',

        runtimeCaching: [
          {
            urlPattern: /^\/api/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-css-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 día
              },
            },
          },
          {
            urlPattern: /\.html$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 5,
            },
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