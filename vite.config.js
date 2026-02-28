// trigger vercel redeploy
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  // 👉 Make the production output explicit so Vercel serves /dist
  build: {
    outDir: 'dist',
    // (Optional) make builds deterministic:
    sourcemap: false,
    emptyOutDir: true
  },

  resolve: {
    alias: [
      // Map the Coupa client package to your local stub so build never breaks
      {
        find: /^@coupa\/open-assistant-framework-client$/,
        replacement: path.resolve(__dirname, 'src/stubs/coupa-oaf/index.js'),
      },
      {
        find: /^@coupa\/open-assistant-framework-client\//,
        replacement: path.resolve(__dirname, 'src/stubs/coupa-oaf/'),
      },
    ],
  },
});