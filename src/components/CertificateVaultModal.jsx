import React, { useState, useEffect } from 'react';
import { CERTIFICATES_DATA } from '../data/portfolioData';

export function CertificateVaultModal({ certificate, onClose, onSelectCertificate }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [certificate]);

  useEffect(() => {
    if (!certificate) return;
    const currentIndex = CERTIFICATES_DATA.findIndex((c) => c.id === certificate.id);

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentIndex !== -1) {
        const next = CERTIFICATES_DATA[(currentIndex + 1) % CERTIFICATES_DATA.length];
        onSelectCertificate(next);
      } else if (e.key === 'ArrowLeft' && currentIndex !== -1) {
        const prev =
          CERTIFICATES_DATA[
            (currentIndex - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length
          ];
        onSelectCertificate(prev);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [certificate, onClose, onSelectCertificate]);

  if (!certificate) return null;

  const currentIndex = CERTIFICATES_DATA.findIndex((c) => c.id === certificate.id);

  const goPrev = () => {
    const prev =
      CERTIFICATES_DATA[
        (currentIndex - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length
      ];
    onSelectCertificate(prev);
  };

  const goNext = () => {
    const next = CERTIFICATES_DATA[(currentIndex + 1) % CERTIFICATES_DATA.length];
    onSelectCertificate(next);
  };

  return (
    <div
      className="qc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificado Oficial: ${certificate.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="qc-vault-dialog">
        <div className="qc-sandbox-topbar">
          <div className="qc-sandbox-meta">
            <span className="qc-sandbox-index">{certificate.code}</span>
            <div>
              <h3 className="qc-sandbox-title">{certificate.title}</h3>
              <span className="qc-sandbox-sub">
                {certificate.issuer} · {certificate.hours} · {certificate.date}
              </span>
            </div>
          </div>

          <div className="qc-sandbox-controls">
            <button
              type="button"
              className="qc-vp-btn"
              onClick={goPrev}
              aria-label="Certificado anterior"
            >
              ← Anterior
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              {currentIndex + 1} / {CERTIFICATES_DATA.length}
            </span>
            <button
              type="button"
              className="qc-vp-btn"
              onClick={goNext}
              aria-label="Siguiente certificado"
            >
              Siguiente →
            </button>
            <button
              type="button"
              className={`qc-vp-btn ${zoomed ? 'is-active' : ''}`}
              onClick={() => setZoomed((z) => !z)}
            >
              {zoomed ? 'Zoom 100%' : 'Zoom 150%'}
            </button>
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qc-btn qc-btn-primary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.72rem' }}
            >
              Original PDF/PNG ↗
            </a>
            <button
              type="button"
              className="qc-modal-close"
              onClick={onClose}
              aria-label="Cerrar visor"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        <div className="qc-vault-body">
          <div
            className={`qc-vault-stage ${zoomed ? 'is-zoomed' : ''}`}
            onClick={() => setZoomed((z) => !z)}
            title="Haz clic para alternar zoom"
          >
            <picture>
              <source srcSet={certificate.thumbWebp} type="image/webp" />
              <img
                src={certificate.fullImage}
                alt={`Diploma oficial ${certificate.title}`}
                className="qc-vault-img"
              />
            </picture>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(15,23,42,0.75)', border: '1px solid var(--border-hairline)' }}>
              <span className="qc-eyebrow">REGISTRO DE VERIFICACIÓN</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
                {certificate.verificationId}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Emitido a favor de: <strong>Ali Alejandro Andrade Godoy</strong>
              </p>
              {certificate.verificationUrl && (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qc-btn qc-btn-secondary"
                  style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.76rem', width: '100%' }}
                >
                  Verificar en Emisor Oficial (4Geeks) ↗
                </a>
              )}
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                MÓDULOS Y COMPETENCIAS EVALUADAS
              </h4>
              <div className="qc-tag-list">
                {certificate.topics.map((t) => (
                  <span key={t} className="qc-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                CAMBIAR DIPLOMA ({CERTIFICATES_DATA.length})
              </h4>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {CERTIFICATES_DATA.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`qc-cmd-item ${item.id === certificate.id ? 'is-selected' : ''}`}
                    style={{ padding: '0.45rem 0.65rem', border: '1px solid var(--border-hairline)' }}
                    onClick={() => onSelectCertificate(item)}
                  >
                    <span className="qc-cmd-cat">{item.code}</span>
                    <span className="qc-cmd-label" style={{ fontSize: '0.78rem' }}>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CertificateVaultModal;
