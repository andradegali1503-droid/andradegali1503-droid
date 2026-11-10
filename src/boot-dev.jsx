import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/quantum-craft.css';
import './styles/manga-editorial.css';

class PortfolioErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error ? String(error.message || error) : 'Error de renderizado' };
  }

  componentDidCatch(error, info) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Quantum Portfolio ErrorBoundary:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#f8fafc', background: '#05070c', fontFamily: 'monospace' }}>
          <h2>Recuperando interfaz del portafolio...</h2>
          <p>{this.state.errorMsg}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, errorMsg: '' })}
            style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#00f0ff', color: '#05070c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function mountPortfolioApp() {
  if (typeof window !== 'undefined' && window.__QUANTUM_PORTFOLIO_MOUNTED__) {
    return;
  }
  if (typeof window !== 'undefined') {
    window.__QUANTUM_PORTFOLIO_MOUNTED__ = true;
  }

  let rootEl = document.getElementById('root');
  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = 'root';
    document.body.prepend(rootEl);
  } else {
    rootEl.innerHTML = '';
  }

  const root = createRoot(rootEl);
  root.render(
    <PortfolioErrorBoundary>
      <App />
    </PortfolioErrorBoundary>
  );
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountPortfolioApp);
  } else {
    mountPortfolioApp();
  }
}
