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
    // Optimize bundle size - simplified chunking to avoid circular dependency issues
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Manual chunking for better code splitting
          if (id.includes('node_modules')) {
            // Keep React separate
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Keep MUI and Emotion together but separate from other vendors
            // This helps avoid circular dependency issues
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui-vendor'
            }
            // Keep other large libraries separate
            if (id.includes('leaflet')) {
              return 'map-vendor'
            }
            if (id.includes('recharts')) {
              return 'chart-vendor'
            }
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

