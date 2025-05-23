import { defineConfig as defineViteConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineViteConfig({
  plugins: [react(), tailwindcss()],
  // no `test` here
})