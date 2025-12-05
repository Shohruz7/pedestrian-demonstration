import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base path is root
  server: {
    port: 3000,
  },
  build: {
    // Let Vite handle chunking automatically to avoid circular dependency issues
    // Disable manual chunking entirely
    // Enable minification - using esbuild (default) instead of terser to avoid initialization errors
    minify: 'esbuild',
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // CommonJS options to help with module resolution
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', 'leaflet', 'react-leaflet'],
    exclude: ['react-router-dom']
  }
})

