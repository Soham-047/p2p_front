import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // 👇 raises warning limit (optional)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // 👇 manually split heavy libs into separate chunks
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: ['lucide-react', 'react-datepicker'],
         
        }
      }
    }
  }
})
