import { defineConfig } from 'vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  preview: {
    allowedHosts: true
  },
  plugins: [
    tailwindcss(),
    svelte({
      preprocess: vitePreprocess()
    }),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      },
      manifest: {
        name: "Yamb",
        description: "Point tracking app for the Yamb dice game",
        short_name: "Yamb",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "logo-mask.svg",
            sizes: "any",
            type: "image/svg",
            purpose: "any maskable"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
      }
    })
  ]
})
