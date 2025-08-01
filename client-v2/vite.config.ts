import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
 server: {
    host: 'localhost',
    port: 5173,
    allowedHosts: [
      'localhost',
      "4b1ed5ea0e7e.ngrok-free.app"
    ],
  },
})
