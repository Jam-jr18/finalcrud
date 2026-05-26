import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile()
  ],
  preview: {
    allowedHosts: ['finalcrud-7nmd.onrender.com']
  }
})
