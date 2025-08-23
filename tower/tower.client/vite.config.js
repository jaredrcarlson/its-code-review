import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../tower/client',
    sourcemap: false
  },
  server: {
    host: true,
    port: 8083,
    strictPort: true,
    hmr: false
  },
  base: '/tower/'
})
