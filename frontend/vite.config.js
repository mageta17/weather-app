import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,             // Required so Vite listens on all network interfaces
    watch: {
      usePolling: true,     // Enables polling so file changes inside Docker are detected
      interval: 200,        // Optional: milliseconds between polling
    },
  },
})
