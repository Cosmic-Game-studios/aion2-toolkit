import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' so the build works from GitHub Pages sub-paths or a plain static folder
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173, open: false },
});
