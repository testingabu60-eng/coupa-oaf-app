// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Make __dirname available in ESM config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 👇 Map the package name to your local source folder (case‑sensitive)
      '@coupa/open-assistant-framework-client': path.resolve(
        __dirname,
        'packages/@coupa/open-assistant-framework-client/src'
      ),
    },
  },
  // Make sure Vite doesn't try to prebundle this local package as an external dep
  optimizeDeps: {
    exclude: ['@coupa/open-assistant-framework-client'],
  },
});