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
    // Disable manual chunking to avoid circular dependency issues with MUI
    // Vite will automatically chunk based on dependencies
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only chunk React separately - let Vite handle MUI automatically
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Don't manually chunk MUI - let Vite handle it to avoid circular deps
            // Keep other large libraries separate
            if (id.includes('leaflet')) {
              return 'map-vendor'
            }
            if (id.includes('recharts')) {
              return 'chart-vendor'
            }
            // Everything else goes to vendor (including MUI)
            return 'vendor'
          }
        }
      }
    },
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

