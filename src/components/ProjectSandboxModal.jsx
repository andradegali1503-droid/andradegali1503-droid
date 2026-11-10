import React, { useState, useEffect } from 'react';
import { TechTag } from './TechBadge';

export function ProjectSandboxModal({ project, onClose }) {
  const [viewport, setViewport] = useState('desktop');
  const [activeTab, setActiveTab] = useState('case');

  useEffect(() => {
    if (project) {
      setActiveTab(project.canEmbedSandbox ? 'sandbox' : 'case');
      setViewport('desktop');
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px'
  };

  return (
    <div
      className="qc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Estudio de Proyecto: ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="qc-sandbox-dialog">
        <div className="qc-sandbox-topbar">
          <div className="qc-sandbox-meta">
            <span className="qc-sandbox-index">{project.index}</span>
            <div>
              <h3 className="qc-sandbox-title">{project.title}</h3>
              <span className="qc-sandbox-sub">{project.subtitle}</span>
            </div>
          </div>

          <div className="qc-sandbox-controls">
            <div className="qc-sandbox-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'case'}
                className={`qc-tab-btn ${activeTab === 'case' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('case')}
              >
                Caso de Estudio & Arquitectura
              </button>
              {project.canEmbedSandbox && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'sandbox'}
                  className={`qc-tab-btn ${activeTab === 'sandbox' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('sandbox')}
                >
                  Simulador Interactivo en Vivo
                </button>
              )}
            </div>

            {activeTab === 'sandbox' && project.canEmbedSandbox && (
              <div className="qc-viewport-switcher" aria-label="Cambiar tamaño de pantalla">
                {[
                  { id: 'desktop', label: 'Desktop 100%' },
                  { id: 'tablet', label: 'Tablet 768px' },
                  { id: 'mobile', label: 'Móvil 390px' }
                ].map((vp) => (
                  <button
                    key={vp.id}
                    type="button"
                    className={`qc-vp-btn ${viewport === vp.id ? 'is-active' : ''}`}
                    onClick={() => setViewport(vp.id)}
                  >
                    {vp.label}
                  </button>
                ))}
              </div>
            )}

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qc-btn qc-btn-primary"
              style={{ padding: '0.42rem 0.85rem', fontSize: '0.75rem' }}
            >
              Abrir en Pestaña ↗
            </a>

            <button
              type="button"
              className="qc-modal-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        <div className="qc-sandbox-body">
          {activeTab === 'sandbox' && project.canEmbedSandbox ? (
            <div className="qc-sandbox-iframe-stage">
              <div
                className="qc-iframe-wrapper"
                style={{ width: viewportWidths[viewport] }}
              >
                <iframe
                  src={project.liveUrl}
                  title={`Demo interactiva de ${project.title}`}
                  className="qc-sandbox-iframe"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="qc-case-visual">
                <picture>
                  <source srcSet={project.imageWebp} type="image/webp" />
                  <img
                    src={project.imageFallback}
                    alt={project.title}
                    className="qc-case-img"
                    style={{ borderRadius: '12px', border: '1px solid var(--border-hairline)' }}
                  />
                </picture>
                <div className="qc-tag-list" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {project.stack.map((tech) => (
                    <TechTag key={tech} name={tech} size="sm" />
                  ))}
                </div>
              </div>

              <div className="qc-case-details" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <span className="qc-eyebrow">{project.status} · {project.year}</span>
                  <h4 className="qc-project-title" style={{ marginTop: '0.35rem' }}>{project.tagline}</h4>
                  <p className="qc-project-desc">{project.description}</p>
                </div>

                <div>
                  <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-secondary)', marginBottom: '0.35rem' }}>
                    RETO DE INGENIERÍA & DISEÑO
                  </h5>
                  <p className="qc-project-desc">{project.challenge}</p>
                </div>

                <div>
                  <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-primary)', marginBottom: '0.35rem' }}>
                    DECISIONES DE ARQUITECTURA
                  </h5>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'grid', gap: '0.35rem' }}>
                    {project.architecture.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="qc-card-actions">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qc-btn qc-btn-primary"
                  >
                    Ejecutar Demo / Producción ↗
                  </a>
                  {project.canEmbedSandbox && (
                    <button
                      type="button"
                      className="qc-btn qc-btn-secondary"
                      onClick={() => setActiveTab('sandbox')}
                    >
                      Probar en Simulador Integrado
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectSandboxModal;
