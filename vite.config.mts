import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    
    console.log(env);
    
    return {
        base: '/',
        plugins: [react()],
        optimizeDeps: {
            include: ['cal-heatmap', 'eventemitter3'],
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "env.config": path.resolve(__dirname, "./env.config.js"),
            },
        },
        build: {
            commonjsOptions: {
                include: [/cal-heatmap/, /node_modules/],
            },
        },
        server: {
            cors: false,
            host: true,
            port: 2003,
            proxy: {
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