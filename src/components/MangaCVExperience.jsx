import React, { useState, useEffect } from 'react';
import {
  OWNER_PROFILE,
  EXPERIENCE_TIMELINE,
  SKILL_CLUSTERS,
  PROJECTS_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  COMPLEMENTARY_CRAFT,
  ATS_PLAINTEXT_CV
} from '../data/portfolioData';
import { MangaArsenalSkillChip, TechTag, TECH_REGISTRY } from './TechBadge';

export default function MangaCVExperience({ onOpenCert, onOpenProject, onOpenTerminal, onOpenCommandPalette }) {
  const [activeArc, setActiveArc] = useState('arc1');
  const [cvViewMode, setCvViewMode] = useState('manga'); // 'manga' | 'ats'
  const [copyFeedback, setCopyFeedback] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle URL params on load (arc, view=ats, scrollY)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'ats') {
        setCvViewMode('ats');
      }
      const arcParam = params.get('arc') || (window.location.hash ? window.location.hash.replace('#', '') : null);
      if (arcParam) {
        setTimeout(() => {
          const el = document.getElementById(arcParam);
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            setActiveArc(arcParam);
          }
        }, 200);
      }
      const scrollYParam = params.get('scrollY') || params.get('y');
      if (scrollYParam) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(scrollYParam, 10), behavior: 'instant' });
        }, 150);
      }
    }
  }, []);

  // Handle scroll spy to highlight active Arc on sidebar
  useEffect(() => {
    const arcIds = ['arc1', 'arc2', 'arc3', 'arc4', 'arc5', 'arc6', 'arc7'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (const id of arcIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveArc(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToArc = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveArc(id);
    }
  };

  const handleCopyAtsText = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(ATS_PLAINTEXT_CV).then(() => {
        setCopyFeedback('¡CV en texto plano ATS copiado con éxito!');
        setTimeout(() => setCopyFeedback(''), 3500);
      }).catch(() => {
        setCopyFeedback('Error al copiar al portapapeles');
        setTimeout(() => setCopyFeedback(''), 3500);
      });
    } else {
      setCopyFeedback('Copia no soportada en este navegador');
      setTimeout(() => setCopyFeedback(''), 3500);
    }
  };

  const flagshipProject = PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];
  const megaFrioExp = EXPERIENCE_TIMELINE.find((e) => e.id === 'exp-megafrio') || EXPERIENCE_TIMELINE[0];
  const otherExperiences = EXPERIENCE_TIMELINE.filter((e) => e.id !== 'exp-megafrio');

  return (
    <div className="manga-canvas-root">
      {/* 4-point shock-pink star sparkle in the bottom left (ChainZoku signature) */}
      <div className="manga-canvas-sparkle" aria-hidden="true">✦</div>

      {/* 1. Left Vertical Chapter Spine Navigation (ChainZoku Bracket Style) */}
      <aside className="manga-spine-nav" aria-label="Navegación capitular manga">
        <div className="manga-spine-brand">ARC INDEX</div>
        <div className="manga-spine-bracket">
          <nav className="manga-spine-ticks">
            {[
              { id: 'arc1', label: '01 // COVER', title: 'Cover & Perfil' },
              { id: 'arc2', label: '02 // ORIGEN', title: 'Origen & Misión' },
              { id: 'arc3', label: '03 // JUMPS', title: 'Weekly Jumps 1 to 6' },
              { id: 'arc4', label: '04 // ARSENAL', title: 'Arsenal Técnico' },
              { id: 'arc5', label: '05 // PROYECTOS', title: 'Historias / Demos' },
              { id: 'arc6', label: '06 // BÓVEDA', title: 'Bóveda Diplomas' },
              { id: 'arc7', label: '07 // CONTACTO', title: 'Transmisión / Fin' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`manga-spine-tick ${activeArc === item.id ? 'is-active' : ''}`}
                onClick={() => scrollToArc(item.id)}
                title={item.title}
              >
                <span className="manga-spine-dash" aria-hidden="true" />
                <span className="manga-spine-label">{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              className={`manga-spine-tick ${cvViewMode === 'ats' ? 'is-active' : ''}`}
              onClick={() => setCvViewMode(cvViewMode === 'ats' ? 'manga' : 'ats')}
              title="Modo texto estructurado ATS"
            >
              <span className="manga-spine-dash" aria-hidden="true" />
              <span className="manga-spine-label">ATS TEXT</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* 2. Manga Main Editorial Container */}
      <div className="manga-stage-container">
        {/* ChainZoku-style Topbar: Brand, Centered Floating Pills, Right Social Icons & Mobile Menu */}
        <header className="manga-topbar" role="banner">
          <div className="manga-topbar-head">
            <div
              className="manga-topbar-brand"
              onClick={() => scrollToArc('arc1')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') scrollToArc('arc1'); }}
            >
              <div className="manga-brand-monogram">AA</div>
              <div className="manga-brand-text-col">
                <span className="manga-logo-text">ANDRADE</span>
                <span className="manga-logo-sub">VOL. 01 // FRONT-END & SYSTEMS</span>
              </div>
            </div>

            {/* Mobile Actions: WhatsApp Pill & Menu Toggle */}
            <div className="manga-mobile-actions">
              <a
                href={OWNER_PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="manga-mobile-wa-btn"
                title="WhatsApp Directo"
                aria-label="WhatsApp de Ali Andrade"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.123.554 4.185 1.608 6.008L.062 24l6.123-1.608A11.97 11.97 0 0012.03 24c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm0 22.016c-1.846 0-3.646-.492-5.23-1.43l-.369-.216-3.877 1.015 1.03-3.784-.246-.385a10.01 10.01 0 01-1.538-5.185c0-5.523 4.492-10.015 10.015-10.015 5.523 0 10.015 4.492 10.015 10.015 0 5.523-4.492 10.015-10.015 10.015z" />
                </svg>
                <span>Chat</span>
              </a>

              <button
                type="button"
                className={`manga-mobile-menu-btn ${mobileMenuOpen ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileMenuOpen}
              >
                <span className="manga-burger-line" />
                <span className="manga-burger-line" />
                <span className="manga-burger-line" />
              </button>
            </div>
          </div>

          <div className="manga-topbar-center">
            <nav className="manga-topbar-pills" aria-label="Navegación principal">
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc1' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc1'); }}
              >
                Home
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc2' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc2'); }}
              >
                Manga CV
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc3' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc3'); }}
              >
                Jumps
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc4' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc4'); }}
              >
                Arsenal
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc5' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc5'); }}
              >
                Proyectos
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc6' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc6'); }}
              >
                Bóveda Diplomas
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${activeArc === 'arc7' && cvViewMode === 'manga' ? 'is-active' : ''}`}
                onClick={() => { setCvViewMode('manga'); scrollToArc('arc7'); }}
              >
                Contacto / QR
              </button>
              <button
                type="button"
                className={`manga-pill-btn ${cvViewMode === 'ats' ? 'is-active' : ''}`}
                onClick={() => setCvViewMode(cvViewMode === 'ats' ? 'manga' : 'ats')}
              >
                Modo ATS
              </button>
            </nav>
          </div>

          <div className="manga-topbar-social">
            <span className="manga-social-label">social</span>
            <a
              href={OWNER_PROFILE.githubReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="manga-social-link"
              title="GitHub Repositorios"
              aria-label="GitHub de Ali Andrade"
            >
              <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a
              href={OWNER_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="manga-social-link"
              title="LinkedIn Perfil"
              aria-label="LinkedIn de Ali Andrade"
            >
              <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a
              href={`mailto:${OWNER_PROFILE.emailPrimary}`}
              className="manga-social-link"
              title="Email Directo"
              aria-label="Email de Ali Andrade"
            >
              <svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </a>
            <button
              type="button"
              onClick={() => {
                if (onOpenTerminal) onOpenTerminal();
                else if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              className="manga-social-link"
              title="Terminal de Comandos"
              aria-label="Abrir Terminal"
            >
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-12-3l4-3-4-3v6zm6 0h4v-2h-4v2z"/></svg>
            </button>
          </div>

          {/* Fullscreen / Dropdown Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="manga-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menú principal móvil">
              <div className="manga-drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
              <div className="manga-drawer-sheet">
                <div className="manga-drawer-header">
                  <div>
                    <span className="manga-drawer-tag">NAVEGACIÓN</span>
                    <h3 className="manga-drawer-h3">Índice del Portafolio</h3>
                  </div>
                  <button
                    type="button"
                    className="manga-drawer-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                  >
                    ✕
                  </button>
                </div>

                <nav className="manga-drawer-nav">
                  {[
                    { id: 'arc1', num: '01', title: 'Portada & Perfil Profesional' },
                    { id: 'arc2', num: '02', title: 'El Origen & Dualidad Técnica' },
                    { id: 'arc3', num: '03', title: 'Crónicas de Experiencia (Jumps 1-6)' },
                    { id: 'arc4', num: '04', title: 'El Arsenal Técnico & Oficios' },
                    { id: 'arc5', num: '05', title: 'Historias de Proyectos & Demos' },
                    { id: 'arc6', num: '06', title: 'Formación & Bóveda de Diplomas' },
                    { id: 'arc7', num: '07', title: 'Contacto & Transmisión Final' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`manga-drawer-link ${activeArc === item.id && cvViewMode === 'manga' ? 'is-active' : ''}`}
                      onClick={() => {
                        setCvViewMode('manga');
                        scrollToArc(item.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="manga-drawer-num">{item.num}</span>
                      <span className="manga-drawer-title">{item.title}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    className={`manga-drawer-link manga-drawer-link-ats ${cvViewMode === 'ats' ? 'is-active' : ''}`}
                    onClick={() => {
                      setCvViewMode(cvViewMode === 'ats' ? 'manga' : 'ats');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="manga-drawer-num">⚡</span>
                    <span className="manga-drawer-title">Modo Texto Plano ATS (Para Portales)</span>
                  </button>
                </nav>

                <div className="manga-drawer-footer">
                  <div className="manga-drawer-actions">
                    <button
                      type="button"
                      className="manga-btn-secondary"
                      onClick={() => { window.print(); setMobileMenuOpen(false); }}
                    >
                      Descargar CV en PDF (A4) ⎙
                    </button>
                    <a
                      href={OWNER_PROFILE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="manga-btn-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Escribir por WhatsApp ↗
                    </a>
                  </div>
                  <div className="manga-drawer-socials">
                    <a href={OWNER_PROFILE.githubReposUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={OWNER_PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href={`mailto:${OWNER_PROFILE.emailPrimary}`}>Email</a>
                    <a href={`tel:${OWNER_PROFILE.phoneRaw}`}>Teléfono</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {copyFeedback && (
          <div className="manga-toast-banner" role="status">
            <span>⚡ {copyFeedback}</span>
          </div>
        )}

        {/* ATS Viewport Overlay if selected */}
        {cvViewMode === 'ats' ? (
          <div className="manga-ats-container">
            <div className="manga-ats-header">
              <div>
                <h2>FORMATO ESTANDARIZADO ATS (TEXTO PLANO)</h2>
                <p>Texto plano sin estilos complejos, optimizado para ser parseado por sistemas ATS y portales de empleo.</p>
              </div>
              <button
                type="button"
                className="manga-action-bubble"
                onClick={handleCopyAtsText}
              >
                Copiar Todo el CV
              </button>
            </div>
            <pre className="manga-ats-pre">{ATS_PLAINTEXT_CV}</pre>
          </div>
        ) : (
          <div className="manga-editorial-flow">
            {/* ================================================================
                ARC 01 // THE OPENING (COVER PANEL & IDENTITY)
                ================================================================ */}
            <section id="arc1" className="manga-arc-section" aria-label="Capítulo 01: Portada y Perfil">
              <div className="manga-panel-hero">
                {/* Vertical Heavy Title "ARC 1" */}
                <div className="manga-arc-spine-block">
                  <span className="manga-vertical-title">ARC1</span>
                </div>

                {/* Overlapping Circle Sticker (ChainZoku Motif) */}
                <div className="manga-sticker-circle">
                  <span>THAT'S WHERE IT STARTS!</span>
                </div>

                {/* Main Hero Panel Content */}
                <div className="manga-panel-inner manga-hero-grid">
                  <div className="manga-hero-avatar-frame">
                    <picture>
                      <source srcSet={OWNER_PROFILE.photoRealWebp} type="image/webp" />
                      <img
                        src={OWNER_PROFILE.photoRealFallback}
                        alt={OWNER_PROFILE.fullName}
                        className="manga-avatar-img"
                        width="340"
                        height="380"
                      />
                    </picture>
                    <div className="manga-halftone-accent" aria-hidden="true" />
                    <span className="manga-status-tag">STATUS: ONLINE · ESPAÑA</span>
                  </div>

                  <div className="manga-hero-narrative">
                    <div className="manga-chapter-badge">CHAPTER 01 // ORIGIN COVER</div>
                    <h1 className="manga-hero-name">{OWNER_PROFILE.fullName}</h1>
                    <p className="manga-hero-role-title">
                      {OWNER_PROFILE.rolePrimary} · {OWNER_PROFILE.roleSecondary}
                    </p>

                    <div className="manga-badges-cloud">
                      <span className="manga-badge-tag manga-badge-neon">TSU en Informática (IUGT)</span>
                      <span className="manga-badge-tag manga-badge-pink">Triple Certificación Oficial SEPE (2024)</span>
                      <span className="manga-badge-tag manga-badge-white">6+ Años IT & Operaciones</span>
                    </div>

                    <p className="manga-hero-lead">
                      {OWNER_PROFILE.summaryExecutive}
                    </p>

                    <div className="manga-hero-cta-strip">
                      <button
                        type="button"
                        className="manga-btn-primary"
                        onClick={() => scrollToArc('arc3')}
                      >
                        Explorar Crónicas de Exp. ↓
                      </button>
                      <button
                        type="button"
                        className="manga-btn-secondary"
                        onClick={() => window.print()}
                      >
                        Descargar CV en PDF (A4) ⎙
                      </button>
                      <a
                        href={OWNER_PROFILE.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manga-btn-ghost"
                      >
                        LinkedIn ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                ARC 02 // PROFILE CHAPTER (EL ORIGEN & DUALIDAD)
                ================================================================ */}
            <section id="arc2" className="manga-arc-section" aria-label="Capítulo 02: Perfil y Fortalezas">
              <div className="manga-section-tag">
                <span className="manga-sparkle" aria-hidden="true">✦</span>
                <span>CHAPTER 02 // EL ORIGEN & LA CONVERGENCIA</span>
              </div>

              <div className="manga-grid-dual">
                <div className="manga-panel manga-panel-tilt-left">
                  <div className="manga-panel-label">[ARCH.02-A // PERFIL ESTRATÉGICO]</div>
                  <h2 className="manga-panel-title">Ingeniería Front-End & Meticulosidad</h2>
                  <p className="manga-panel-text">
                    Formación universitaria sólida como <strong>Técnico Superior Universitario en Informática (IUGT)</strong>,
                    potenciada por el Master Full Stack JavaScript y especialización avanzada en React, arquitectura de componentes,
                    animaciones fluidas a 60fps con GSAP y diseño adaptable a cualquier pantalla.
                  </p>
                  <ul className="manga-check-list">
                    <li>Dominio riguroso de HTML5 semántico, CSS3, JavaScript ES6+ y React 18.</li>
                    <li>Traducción fiel y milimétrica de diseños Figma a código accesible y modular.</li>
                    <li>Obsesión por la performance: tiempos de carga optimizados y cero bloqueos.</li>
                  </ul>
                </div>

                <div className="manga-panel manga-panel-tilt-right" style={{ position: 'relative' }}>
                  <div className="manga-panel-label">[ARCH.02-B // INFRAESTRUCTURA REAL]</div>
                  <h2 className="manga-panel-title">6+ Años Resolviendo en Planta & Nube</h2>
                  <p className="manga-panel-text">
                    A diferencia del desarrollador promedio, mi trayectoria está forjada en entornos reales de alta exigencia:
                    soporte de sistemas corporativos, telemetría de redes LAN con <strong>PRTG</strong>, administración de <strong>Linux & Azure</strong>,
                    y control logístico con <strong>ERP Defontana</strong>.
                  </p>
                  <ul className="manga-check-list">
                    <li>Diagnóstico y contención de incidentes técnicos en tiempo real bajo presión.</li>
                    <li>Compromiso de calidad heredado de la ebanistería y micro-soldadura electrónica.</li>
                    <li>Visión integral de negocio: del servidor al usuario final.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ================================================================
                ARC 03 // WEEKLY JUMPS 1 TO 6 (SHOCK PINK TRAPEZOID VIÑETA)
                ================================================================ */}
            <section id="arc3" className="manga-arc-section" aria-label="Capítulo 03: Experiencia Laboral y Weekly Jumps">
              <div className="manga-section-tag">
                <span className="manga-sparkle" aria-hidden="true">✦</span>
                <span>CHAPTER 03 // CRÓNICAS PROFESIONALES & WEEKLY JUMPS</span>
              </div>

              {/* Shock Pink Trapezoid Panel (ChainZoku Signature Viñeta) */}
              <div className="manga-panel-shock-pink" style={{ position: 'relative' }}>
                <div className="manga-shock-header">
                  <div>
                    <span className="manga-shock-badge">DESTACADO // JUMPS 1 TO 6</span>
                    <h2 className="manga-shock-title">Weekly Jumps 1 to 6</h2>
                    <p className="manga-shock-sub">Crónicas Profesionales · Cosentino Industries, Mega Frío Chile, Telemetría PRTG &amp; Arquitectura Web</p>
                  </div>
                  <span className="manga-shock-dates">6+ AÑOS IT &amp; DEV</span>
                </div>

                <div className="manga-shock-body">
                  <div className="manga-shock-content">
                    <p className="manga-shock-summary">
                      Cada salto profesional consolida rigor de ingeniería: desde la operación de maquinaria automatizada con PLC Siemens en Cosentino Industries,
                      pasando por la telemetría 24/7 con PRTG y ERP Defontana (4 años y 3 meses en Mega Frío Chile), hasta el desarrollo front-end avanzado con React 18, GSAP y WebGL.
                    </p>
                    <ul className="manga-shock-bullets">
                      <li><strong>Jump 01-02:</strong> TSU en Informática (IUGT) &amp; Soporte Crítico de Hardware/Redes.</li>
                      <li><strong>Jump 03-04:</strong> Mega Frío Chile: PRTG Network Monitor, Administración Linux, Azure &amp; Logística ERP Defontana.</li>
                      <li><strong>Jump 05:</strong> Master Full Stack JS, Triple Certificación Oficial SEPE (IFCT) y 4Geeks Academy.</li>
                      <li><strong>Jump 06 (Principal · Actual):</strong> Cosentino Industries: Operación y control de maquinaria industrial con PLC Siemens.</li>
                    </ul>
                  </div>

                  {/* Fanned 3D Comic Volumes Stack (Weekly Jumps 1 to 6 Showcase) */}
                  <div className="manga-floating-cards-stack" aria-hidden="true">
                    <div className="manga-comic-card manga-card-1">
                      <div className="manga-card-top">VOL. 01 // ORIGEN</div>
                      <strong>TSU IUGT</strong>
                      <span>Informática & Sistemas</span>
                    </div>
                    <div className="manga-comic-card manga-card-2">
                      <div className="manga-card-top">VOL. 02 // TELEMETRÍA</div>
                      <strong>PRTG 24/7</strong>
                      <span>Azure, Linux & ERP</span>
                    </div>
                    <div className="manga-comic-card manga-card-3">
                      <div className="manga-card-top">VOL. 03 // REACT 18</div>
                      <strong>FULL STACK</strong>
                      <span>GSAP & WebGL Craft</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Experiences Grid */}
              <div className="manga-grid-triple">
                {otherExperiences.map((exp) => (
                  <article
                    key={exp.id}
                    className={`manga-panel manga-panel-comic ${exp.isCurrent ? 'manga-panel--featured-current' : ''}`}
                    style={exp.isCurrent ? { borderTop: '3px solid #10b981', boxShadow: '0 0 25px rgba(16, 185, 129, 0.18)' } : {}}
                  >
                    <div className="manga-panel-meta-row">
                      <span
                        className="manga-panel-badge"
                        style={exp.isCurrent ? { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' } : {}}
                      >
                        {exp.isCurrent ? '⚡ PRINCIPAL · EN CURSO // ' : ''}{exp.badge}
                      </span>
                      <span className="manga-panel-period" style={exp.isCurrent ? { color: '#10b981', fontWeight: 'bold' } : {}}>{exp.period}</span>
                    </div>
                    <h3 className="manga-panel-card-title">{exp.company}</h3>
                    <p className="manga-panel-card-role">{exp.role} · {exp.location}</p>
                    <p className="manga-panel-card-summary">{exp.summary}</p>
                    <ul className="manga-panel-bullets">
                      {exp.points.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* ================================================================
                ARC 04 // THE ARSENAL (POWER PANELS & OFICIOS)
                ================================================================ */}
            <section id="arc4" className="manga-arc-section" aria-label="Capítulo 04: Habilidades y Herramientas">
              <div className="manga-section-tag">
                <span className="manga-sparkle" aria-hidden="true">✦</span>
                <span>CHAPTER 04 // EL ARSENAL TÉCNICO & MAKER</span>
              </div>

              <div className="manga-grid-arsenal">
                {SKILL_CLUSTERS.map((cluster, idx) => (
                  <div
                    key={cluster.id}
                    className="manga-panel manga-panel-skill"
                    style={{ position: 'relative' }}
                  >
                    <div className="manga-panel-label">
                      {cluster.code}
                    </div>
                    <h3 className="manga-panel-skill-title">
                      {cluster.title}
                    </h3>
                    <p className="manga-panel-skill-sub">
                      {cluster.subtitle}
                    </p>

                    <div className="manga-skill-tags-cloud">
                      {cluster.items.map((item) => (
                        <MangaArsenalSkillChip key={item.name} item={item} />
                      ))}
                    </div>

                    {cluster.highlights && (
                      <ul className="manga-panel-bullets" style={{ marginTop: '0.85rem' }}>
                        {cluster.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Complementary & Craft Box */}
              <div className="manga-craft-box">
                <div className="manga-craft-header">
                  <span className="manga-craft-badge">OFICIOS & PRECISIÓN</span>
                  <h3>Competencias Técnicas y Disciplinas Complementarias</h3>
                </div>
                <div className="manga-craft-grid">
                  {COMPLEMENTARY_CRAFT.map((craft) => {
                    const craftTech = TECH_REGISTRY[craft.iconType] || TECH_REGISTRY.default;
                    return (
                      <div
                        key={craft.id}
                        className="manga-craft-item"
                        style={{ '--craft-accent': craft.accentColor || craftTech.brandColor }}
                      >
                        <div className="manga-craft-icon-wrap" aria-hidden="true">
                          {craftTech.svg}
                        </div>
                        <div>
                          <h4>{craft.title}</h4>
                          <p>{craft.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ================================================================
                ARC 05 // PROJECT STORIES (CASOS DE ESTUDIO EN VIÑETAS)
                ================================================================ */}
            <section id="arc5" className="manga-arc-section" aria-label="Capítulo 05: Proyectos y Casos de Estudio">
              <div className="manga-section-tag">
                <span className="manga-sparkle" aria-hidden="true">✦</span>
                <span>CHAPTER 05 // HISTORIAS DE PROYECTO & DEMOS</span>
              </div>

              {/* Flagship Project Card: Sombra de Valoria */}
              <div className="manga-flagship-panel" style={{ position: 'relative' }}>
                <div className="manga-flagship-media">
                  <picture>
                    <source srcSet={flagshipProject.imageWebp} type="image/webp" />
                    <img src={flagshipProject.imageFallback} alt={flagshipProject.title} />
                  </picture>
                  <span className="manga-flagship-status">LIVE // FIREBASE HOSTING</span>
                </div>
                <div className="manga-flagship-info">
                  <div className="manga-panel-label" style={{ color: '#ffb703' }}>PROYECTO DESTACADO // {flagshipProject.year}</div>
                  <h3 className="manga-flagship-title">{flagshipProject.title}</h3>
                  <p className="manga-flagship-sub">{flagshipProject.subtitle}</p>
                  <p className="manga-flagship-desc">{flagshipProject.description}</p>

                  <div className="manga-tag-list">
                    {flagshipProject.stack.map((t) => (
                      <TechTag key={t} name={t} size="md" />
                    ))}
                  </div>

                  <div className="manga-flagship-actions">
                    <a
                      href={flagshipProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="manga-btn-primary"
                    >
                      Visitar Web App en Producción ↗
                    </a>
                    <button
                      type="button"
                      className="manga-btn-ghost"
                      onClick={() => onOpenProject && onOpenProject(0)}
                    >
                      Inspeccionar Caso de Estudio
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid of Other Projects */}
              <div className="manga-grid-projects">
                {PROJECTS_DATA.filter((p) => !p.featured).map((proj, idx) => (
                  <div key={proj.id} className="manga-panel manga-panel-proj">
                    <div className="manga-proj-thumb">
                      <picture>
                        <source srcSet={proj.imageWebp} type="image/webp" />
                        <img src={proj.imageFallback} alt={proj.title} loading="lazy" />
                      </picture>
                    </div>
                    <div className="manga-panel-meta-row">
                      <span className="manga-panel-badge">{proj.categoryLabel}</span>
                      <span className="manga-panel-period">{proj.year}</span>
                    </div>
                    <h4 className="manga-panel-card-title">{proj.title}</h4>
                    <p className="manga-panel-card-role">{proj.subtitle}</p>
                    <p className="manga-panel-card-summary">{proj.description}</p>
                    <div className="manga-tag-list" style={{ marginTop: 'auto', paddingTop: '0.65rem' }}>
                      {proj.stack.map((s) => (
                        <TechTag key={s} name={s} size="sm" />
                      ))}
                    </div>
                    <div className="manga-card-actions" style={{ marginTop: '0.75rem' }}>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manga-btn-primary manga-btn-sm"
                      >
                        Abrir Demo ↗
                      </a>
                      <button
                        type="button"
                        className="manga-btn-ghost manga-btn-sm"
                        onClick={() => onOpenProject && onOpenProject(idx + 1)}
                      >
                        Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================
                ARC 06 // EDUCATION & OFFICIAL VAULT
                ================================================================ */}
            <section id="arc6" className="manga-arc-section" aria-label="Capítulo 06: Formación y Diplomas">
              <div className="manga-section-tag">
                <span className="manga-sparkle" aria-hidden="true">✦</span>
                <span>CHAPTER 06 // FORMACIÓN & BÓVEDA DE CREDENCIALES</span>
              </div>

              <div className="manga-grid-dual">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="manga-panel manga-panel-edu">
                    <div className="manga-panel-meta-row">
                      <span className="manga-panel-badge manga-badge-neon">{edu.badge}</span>
                      <span className="manga-panel-period">{edu.period}</span>
                    </div>
                    <h3 className="manga-panel-card-title">{edu.title}</h3>
                    <p className="manga-panel-card-role">{edu.institution}</p>
                    <p className="manga-panel-card-summary">{edu.details}</p>
                  </div>
                ))}
              </div>

              {/* Official Diplomas Vault Grid */}
              <div className="manga-vault-box">
                <div className="manga-vault-top">
                  <div>
                    <span className="manga-shock-badge">{CERTIFICATES_DATA.length} DOCUMENTOS OFICIALES</span>
                    <h3>Bóveda de Credenciales Verificadas</h3>
                    <p>Haz clic en cualquier diploma oficial para abrir el visor interactivo de alta resolución.</p>
                  </div>
                  <button
                    type="button"
                    className="manga-btn-primary"
                    onClick={() => onOpenCert && onOpenCert(CERTIFICATES_DATA[0])}
                  >
                    Abrir Visor de Diplomas ({CERTIFICATES_DATA.length})
                  </button>
                </div>

                <div className="manga-vault-grid">
                  {CERTIFICATES_DATA.map((cert) => (
                    <div
                      key={cert.id}
                      className="manga-cert-card"
                      onClick={() => onOpenCert && onOpenCert(cert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') onOpenCert && onOpenCert(cert);
                      }}
                    >
                      <div className="manga-cert-thumb">
                        <picture>
                          <source srcSet={cert.thumbWebp} type="image/webp" />
                          <img src={cert.fullImage} alt={cert.title} loading="lazy" />
                        </picture>
                      </div>
                      <div className="manga-cert-info">
                        <span className="manga-cert-code">{cert.code}</span>
                        <h4>{cert.title}</h4>
                        <p>{cert.issuer} · {cert.hours}</p>
                        <small>{cert.verificationId}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ================================================================
                ARC 07 // TRANSMISSION & FINAL CONTACT
                ================================================================ */}
            <section id="arc7" className="manga-arc-section" aria-label="Capítulo 07: Contacto y Cierre">
              <div className="manga-panel-hero manga-final-panel">
                <div className="manga-arc-spine-block">
                  <span className="manga-vertical-title">FIN</span>
                </div>

                <div className="manga-sticker-circle manga-sticker-neon">
                  <span>DISPONIBLE INMEDIATO!</span>
                </div>

                <div className="manga-panel-inner manga-final-content">
                  <div className="manga-chapter-badge">CHAPTER 07 // TRANSMISSION COMPLETE</div>
                  <h2 className="manga-hero-name">¿Construimos el Próximo Proyecto?</h2>
                  <p className="manga-hero-lead">
                    Disponible para incorporación inmediata en España (presencial, híbrido o remoto).
                    Experiencia contrastada uniendo interfaces creativas, solidez de sistemas y rigor operativo.
                  </p>

                  <div className="manga-contact-grid">
                    <a href={`tel:${OWNER_PROFILE.phoneRaw}`} className="manga-contact-pill">
                      <span>📞</span> {OWNER_PROFILE.phone}
                    </a>
                    <a href={`mailto:${OWNER_PROFILE.emailPrimary}`} className="manga-contact-pill">
                      <span>✉️</span> {OWNER_PROFILE.emailPrimary}
                    </a>
                    <a href={OWNER_PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="manga-contact-pill">
                      <span>💼</span> LinkedIn Perfil
                    </a>
                    <a href={OWNER_PROFILE.githubReposUrl} target="_blank" rel="noopener noreferrer" className="manga-contact-pill">
                      <span>🐙</span> GitHub Repositorios
                    </a>
                  </div>

                  <div className="manga-hero-cta-strip" style={{ marginTop: '1.5rem' }}>
                    <button
                      type="button"
                      className="manga-btn-primary"
                      onClick={() => window.print()}
                    >
                      Imprimir / Guardar CV en PDF (A4) ⎙
                    </button>
                    <button
                      type="button"
                      className="manga-btn-secondary"
                      onClick={handleCopyAtsText}
                    >
                      Copiar Formato ATS al Portapapeles 📋
                    </button>
                    <button
                      type="button"
                      className="manga-btn-ghost"
                      onClick={() => scrollToArc('arc1')}
                    >
                      Volver al Inicio (ARC 01) ↑
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* 3. Floating Quick Action Bubble (PDF & ATS Utilities) */}
      <div className="manga-floating-widget" role="complementary" aria-label="Acciones rápidas">
        <button
          type="button"
          className="manga-play-pill"
          onClick={() => window.print()}
          title="Imprimir / Exportar a PDF (A4)"
        >
          <span className="manga-play-icon" aria-hidden="true">⎙</span>
          <span className="manga-play-text">PDF A4</span>
        </button>
        <button
          type="button"
          className="manga-play-pill manga-pill-ats"
          onClick={handleCopyAtsText}
          title="Copiar CV en texto estructurado ATS"
        >
          <span className="manga-play-icon" aria-hidden="true">📋</span>
          <span className="manga-play-text">ATS</span>
        </button>
      </div>

      {/* 4. Floating Mobile Quick Action Bar (Bottom Thumb Ergonomics) */}
      <nav className="manga-mobile-quickbar" aria-label="Contacto rápido móvil">
        <a
          href={OWNER_PROFILE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="manga-quickbar-btn manga-quickbar-whatsapp"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.123.554 4.185 1.608 6.008L.062 24l6.123-1.608A11.97 11.97 0 0012.03 24c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm0 22.016c-1.846 0-3.646-.492-5.23-1.43l-.369-.216-3.877 1.015 1.03-3.784-.246-.385a10.01 10.01 0 01-1.538-5.185c0-5.523 4.492-10.015 10.015-10.015 5.523 0 10.015 4.492 10.015 10.015 0 5.523-4.492 10.015-10.015 10.015z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <a
          href={`tel:${OWNER_PROFILE.phoneRaw}`}
          className="manga-quickbar-btn"
          aria-label="Llamar directamente"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span>Llamar</span>
        </a>
        <a
          href={`mailto:${OWNER_PROFILE.emailPrimary}`}
          className="manga-quickbar-btn"
          aria-label="Enviar correo electrónico"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>Email</span>
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="manga-quickbar-btn manga-quickbar-cv"
          aria-label="Descargar CV en PDF"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>
          <span>CV PDF</span>
        </button>
      </nav>
    </div>
  );
}
