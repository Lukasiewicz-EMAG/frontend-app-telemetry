import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
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
        '@': path.resolve(__dirname, './src'),
        'env.config': path.resolve(__dirname, './env.config.js'),
      },
    },
    server: {
      cors: false,
      host: true,
      port: 2003,
      proxy: {
        '/': {
          target: 'https://tools.dev.cudzoziemiec.emag.lukasiewicz.local',
          changeOrigin: true,
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
