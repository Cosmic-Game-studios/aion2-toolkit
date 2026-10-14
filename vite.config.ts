import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' so the build works from GitHub Pages sub-paths or a plain static folder.
// In development, /api is forwarded to the community server (npm run server / npm run dev:all).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: false,
    proxy: { '/api': { target: `http://127.0.0.1:${process.env.API_PORT || 8787}`, changeOrigin: false } },
  },
});
