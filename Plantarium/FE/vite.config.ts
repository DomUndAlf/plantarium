import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  return {
    base: '/dev14/',
    plugins: [react(), tailwindcss(),],
    server: {
        host: '0.0.0.0',
        port: 3000,
         proxy: {
        '/users': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
        '/me': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
      },
       esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  }
  }
})
