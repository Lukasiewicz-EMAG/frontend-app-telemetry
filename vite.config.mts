import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
  return {
              plugins: [
            react(),
        ],
        base: './',
        build: {
          target: 'esnext',
          commonjsOptions: {
                include: [/cal-heatmap/, /node_modules/],
            },
    },
        
        optimizeDeps: {
            include: ['cal-heatmap', 'eventemitter3'],
        },
      resolve: {
          preserveSymlinks: true,
            alias: {
              "@": path.resolve(__dirname, "./src"),
                "env.config": path.resolve(__dirname, "./env.config.js"),
            },
        },  
        server: {
            cors: false,
            host: true,
            port: 2003,
            proxy: {
                 "/token": {
                    target: 'http://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/token/, ''),  
                    secure: false,  
                    ws: true,
                },
                "/api": {
                    target: 'http://tools.dev.cudzoziemiec.emag.lukasiewicz.local:9081',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''), 
                    secure: false,
                    ws: true,
                },

            },
        },
        define: {
            'process.env': env,
        },
    };
});