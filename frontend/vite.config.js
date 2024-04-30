import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// List all the dependencies from your node_modules folder
const dependencies = [
  '@remix-run',
  'asynckit',
  'axios',
  'combined-stream',
  'delayed-stream',
  'follow-redirects',
  'form-data',
  'js-tokens',
  'jwt-decode',
  'loose-envify',
  'mime-db',
  'mime-types',
  'proxy-from-env',
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'scheduler'
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: dependencies
    }
  }
});
