import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/dev1/',git add FE/vite.config.ts
      server: {
        host: '0.0.0.0',
        port: 3000
      }
  }
})
