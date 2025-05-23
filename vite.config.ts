import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,            // so you can use `it()` and `expect()` without imports
    environment: 'jsdom',     // simulate a browser DOM
    setupFiles: './src/tests/setupTests.ts',
     },
})
