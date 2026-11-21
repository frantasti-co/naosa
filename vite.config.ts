import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH lo pone la Action de GitHub Pages ("/nombre-del-repo/"). En local es "/".
// CAPACITOR=1 construye para el APK: los archivos ya van dentro de la app,
// así que no hace falta service worker (y así no se queda una versión vieja en caché).
const capacitor = process.env.CAPACITOR === '1';

export default defineConfig({
  base: capacitor ? '/' : (process.env.BASE_PATH ?? '/'),
  plugins: [
    !capacitor &&
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icono.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'NAOSA - Not Another Obscure Sober Companion App',
        short_name: 'NAOSA - Not Another Obscure Sober Companion App',
        description: 'Contador de días sin alcohol, logros de salud y medallas.',
        lang: 'es',
        theme_color: '#2f7d5b',
        background_color: '#f6f4ef',
        display: 'standalone',
        icons: [
          { src: 'icono-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icono-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
