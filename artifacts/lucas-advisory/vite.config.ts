import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const appRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: appRoot,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: path.resolve(appRoot, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    fs: {
      strict: true,
    },
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
  },
});
