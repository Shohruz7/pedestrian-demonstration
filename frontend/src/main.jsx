import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('🚀 Application starting...')
console.log('✅ Imports loaded')

// Global error handler
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error)
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason)
})

// Ensure root element exists
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement ? 'Found ✅' : 'Not found ❌')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif; background: #f0f0f0;"><h1>Error</h1><p>Root element not found. Please check the HTML structure.</p></div>'
} else {
  console.log('🎨 Rendering React app...')
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    console.log('✅ React app rendered successfully')
  } catch (error) {
    console.error('❌ Error rendering React app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; background: #fff3cd; border: 2px solid #ffc107; border-radius: 4px; margin: 20px;">
        <h1 style="color: #856404;">React Render Error</h1>
        <p style="color: #856404;"><strong>Error:</strong> ${error.message}</p>
        <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow: auto;">${error.stack || String(error)}</pre>
      </div>
    `
  }
}



