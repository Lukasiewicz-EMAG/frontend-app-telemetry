import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = mode === 'development';
  // const devProxy = {
  //   '/api': {
  //     target: 'http://tools.dev.cudzoziemiec.emag.lukasiewicz.local/telemetry-dashboard-api',
  //     changeOrigin: true,
  //     secure: false,
  //     ws: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   },
  // };

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
      cors: true,
      host: true,
      port: 3000,
      // proxy: isDev ? devProxy : undefined
    },
    define: {
      'process.env': env,
    },
  };
});
