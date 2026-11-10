/**
 * Dual-Mode Bootloader (src/main.js)
 * - In Vite Dev Server (`npm run dev`): loads `./boot-dev.jsx` with HMR.
 * - In Static Server / GitHub Pages / file://: `dist/assets/portfolio-bundle.js` mounts automatically.
 */
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
  import('./boot-dev.jsx');
} else if (typeof window !== 'undefined' && !window.__QUANTUM_PORTFOLIO_MOUNTED__) {
  import('../dist/assets/portfolio-bundle.js').catch(() => {});
}
