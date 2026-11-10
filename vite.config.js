import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  esbuild: {
    jsx: 'automatic'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/boot-dev.jsx',
      output: {
        format: 'iife',
        name: 'QuantumPortfolioApp',
        entryFileNames: 'assets/portfolio-bundle.js',
        assetFileNames: 'assets/portfolio-bundle[extname]'
      }
    }
  }
});
