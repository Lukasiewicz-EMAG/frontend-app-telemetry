import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    console.log(env)
  return {
  plugins: [react()],
  resolve: {
    alias: {
          "@": path.resolve(__dirname, "./src"),
        "env.config":  path.resolve(__dirname, "./env.config.js"),
    },
  },
      server: {
        cors: false,
      host: true,
        port: 2003,
        proxy: {
          "/api": "https://dev.cudzoziemiec.emag.lukasiewicz.local",
        }  
      },
      
    define: {
      'process.env': env
    },
}
})