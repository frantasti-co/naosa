import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH lo pone la Action de GitHub Pages ("/nombre-del-repo/"). En local es "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icono.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sobriedad',
        short_name: 'Sobriedad',
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
