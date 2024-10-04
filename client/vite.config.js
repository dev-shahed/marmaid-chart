// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://marmaid-chart.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
