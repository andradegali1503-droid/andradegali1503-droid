import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import {
  OWNER_PROFILE,
  PERSONA_MODES,
  HERO_METRICS,
  PROJECTS_DATA,
  SKILL_CLUSTERS,
  EXPERIENCE_TIMELINE,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  COMPLEMENTARY_CRAFT,
  ATS_PLAINTEXT_CV
} from './data/portfolioData';
import WebGLShaderCanvas from './components/WebGLShaderCanvas';
import CustomCursor from './components/CustomCursor';
import { PageTransitionCurtain } from './components/PageTransitionCurtain';
import { ScrambleText, KineticHeadline, VelocityMarquee } from './components/KineticText';
import { SpotlightCard } from './components/SpotlightCard';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CommandPalette } from './components/CommandPalette';
import { ProjectSandboxModal } from './components/ProjectSandboxModal';
import { CertificateVaultModal } from './components/CertificateVaultModal';
import MangaCVExperience from './components/MangaCVExperience';
import { TechTag } from './components/TechBadge';

function detectInitialView() {
  if (typeof window === 'undefined') return 'overview';
  const path = (window.location.pathname || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase();
  if (path.includes('cv.html') || hash.includes('view=cv')) return 'cv';
  if (path.includes('proyects.html') || hash.includes('view=projects')) return 'projects';
  if (path.includes('qr.html') || hash.includes('view=qr')) return 'qr';
  if (hash.includes('view=vault')) return 'vault';
  return 'overview';
}

const MARQUEE_ITEMS = [
  'REACT 18 ARCHITECTURE',
  'GSAP 3 MOTION CHOREOGRAPHY',
  'WEBGL GLSL QUANTUM SHADERS',
  'SEPE CLOUD AZURE & LINUX (IFCT026PO)',
  'SEPE CYBERSECURITY (IFCT050PO)',
  'JAVASCRIPT & PHP FULL-STACK (IFCT091PO)',
  'PRTG NETWORK TELEMETRY',
  'ERP DEFONTANA LOGISTICS',
  'SOMBRA DE VALORIA LIVE ON FIREBASE'
];

export default function App() {
  const [activeView, setActiveView] = useState(detectInitialView);
  const [personaIndex, setPersonaIndex] = useState(0);
  const [portraitMode, setPortraitMode] = useState('real'); // 'real' | 'avatar'
  const [projectFilter, setProjectFilter] = useState('todos');
  const [certFilter, setCertFilter] = useState('todos');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedSignal, setCopiedSignal] = useState('');
  const [cvMode, setCvMode] = useState('editorial'); // 'editorial' | 'ats'

  const handleCopyAts = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(ATS_PLAINTEXT_CV).then(() => {
        setCopiedSignal('¡CV en formato ATS copiado con éxito!');
        setTimeout(() => setCopiedSignal(''), 3200);
      }).catch(() => {
        setCopiedSignal('Error al copiar al portapapeles');
        setTimeout(() => setCopiedSignal(''), 3200);
      });
    } else {
      setCopiedSignal('Copia no soportada en este entorno');
      setTimeout(() => setCopiedSignal(''), 3200);
    }
  };

  const shutterRef = useRef(null);
  const mainStageRef = useRef(null);

  const currentPersona = PERSONA_MODES[personaIndex] || PERSONA_MODES[0];

  // Sync CSS custom properties with active Persona Mode
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', currentPersona.accent);
    root.style.setProperty('--accent-secondary', currentPersona.secondary);
  }, [currentPersona]);

  // Global scroll progress & Ctrl+K shortcut & legacy modal compatibility
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setScrollProgress(pct);
    };

    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };

    window.openModal = (certIndex = 0) => {
      const target = CERTIFICATES_DATA[certIndex] || CERTIFICATES_DATA[0];
      setSelectedCert(target);
    };
    window.openProjectModal = (projIndex = 0) => {
      const target = PROJECTS_DATA[projIndex] || PROJECTS_DATA[0];
      setSelectedProject(target);
    };
    window.closeModal = () => {
      setSelectedCert(null);
      setSelectedProject(null);
      setCmdOpen(false);
    };
    window.__QUANTUM_TEST_HOOKS__ = {
      setActiveView,
      setCmdOpen,
      setSelectedProject,
      setSelectedCert,
      setPersonaIndex
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Choreographed view transition with PageTransitionCurtain
  const handleViewChange = (targetView, sectionAnchor = null) => {
    if (targetView === activeView && !sectionAnchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const applySwitch = () => {
      setActiveView(targetView);
      if (sectionAnchor) {
        setTimeout(() => {
          const el = document.getElementById(sectionAnchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 90);
      }
    };

    if (shutterRef.current && shutterRef.current.playTransition) {
      shutterRef.current.playTransition(targetView, applySwitch);
    } else {
      applySwitch();
    }
  };

  // Animate cards when view changes
  useEffect(() => {
    if (!mainStageRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const blocks = mainStageRef.current.querySelectorAll('.qc-anim-reveal');
    if (blocks.length > 0) {
      gsap.fromTo(
        blocks,
        { y: 12, opacity: 1 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' }
      );
    }
  }, [activeView, projectFilter, certFilter]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'todos') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const filteredCerts = useMemo(() => {
    if (certFilter === 'todos') return CERTIFICATES_DATA;
    return CERTIFICATES_DATA.filter((c) => c.issuerGroup === certFilter);
  }, [certFilter]);

  const flagshipProject = PROJECTS_DATA[0];

  const handleCopyText = (text, label) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedSignal(label);
    setTimeout(() => setCopiedSignal(''), 2500);
  };

  return (
    <div className="qc-app-shell" data-persona={currentPersona.id} data-view={activeView}>
      <a href="#main-content" className="skip-to-main">
        Saltar al contenido principal
      </a>

      {/* 1. Real-time WebGL GLSL Quantum Shader (Only in legacy view) */}
      {activeView === 'legacy' && <WebGLShaderCanvas shaderPreset={personaIndex} />}

      {/* 2. Magnetic Custom Cursor */}
      <CustomCursor accentColor={currentPersona.accent} />

      {/* 3. Multi-column GSAP Shutter Curtain */}
      <PageTransitionCurtain ref={shutterRef} />

      {/* 4. Top HUD Navigation Bar (Only for non-comic fallback views) */}
      {activeView !== 'overview' && activeView !== 'cv' && (
        <header className="qc-topbar" role="banner">
          <div className="qc-topbar-inner">
            <button
              type="button"
              className="qc-brand"
              onClick={() => handleViewChange('overview')}
              data-cursor="HOME"
              aria-label="Ir a vista general de Ali Alejandro Andrade Godoy"
            >
              <div className="qc-brand-monogram">AA</div>
              <div className="qc-brand-meta">
                <span className="qc-brand-name">{OWNER_PROFILE.shortName}</span>
                <span className="qc-brand-status">
                  <span className="qc-status-dot" />
                  DISPONIBLE // ESPAÑA & REMOTO
                </span>
              </div>
            </button>

            <nav className="qc-nav-links" aria-label="Navegación principal del portafolio">
              {[
                { id: 'overview', idx: '01', label: 'Experiencia 360°' },
                { id: 'projects', idx: '02', label: 'Project Lab (6)' },
                { id: 'cv', idx: '03', label: 'CV & Trayectoria' },
                { id: 'vault', idx: '04', label: 'Diplomas Oficiales (8)' },
                { id: 'qr', idx: '05', label: 'QR & Contacto' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`qc-nav-btn ${activeView === item.id ? 'is-active' : ''}`}
                  onClick={() => handleViewChange(item.id)}
                  data-cursor="VIEW"
                >
                  <span className="qc-nav-index">{item.idx}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="qc-topbar-actions">
              <button
                type="button"
                className="qc-cmd-trigger"
                onClick={() => setCmdOpen(true)}
                data-cursor="CMD+K"
                aria-label="Abrir paleta de comandos (Ctrl+K)"
              >
                <span>Comandos</span>
                <kbd>Ctrl+K</kbd>
              </button>
            </div>
          </div>
          <div
            className="qc-scroll-progress"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </header>
      )}

      {/* 5. Main Interactive Stage */}
      <main id="main-content" className="qc-main" ref={mainStageRef}>
        {/* ================================================================
            MANGA EDITORIAL CV EXPERIENCE (CHAINZOKU REFERENCE SYSTEM)
            Default primary experience across Overview and CV
            ================================================================ */}
        {(activeView === 'overview' || activeView === 'cv') && (
          <MangaCVExperience
            onOpenCert={(cert) => setSelectedCert(cert)}
            onOpenProject={(proj) => {
              if (typeof proj === 'number') {
                setSelectedProject(PROJECTS_DATA[proj] || PROJECTS_DATA[0]);
              } else {
                setSelectedProject(proj);
              }
            }}
            onOpenTerminal={() => setCmdOpen(true)}
            onOpenCommandPalette={() => setCmdOpen(true)}
          />
        )}

        {/* ================================================================
            LEGACY FALLBACK VIEWS (ONLY SHOWN IF EXPLICITLY SWITCHED TO 'legacy')
            ================================================================ */}
        {activeView === 'legacy' && (
          <>
            <section className="qc-hero qc-anim-reveal" aria-label="Presentación Principal">
              <div className="qc-hero-copy">
                <div className="qc-persona-bar" role="tablist" aria-label="Modo de Especialidad Técnica">
                  {PERSONA_MODES.map((mode, idx) => (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={personaIndex === idx}
                      className={`qc-persona-btn ${personaIndex === idx ? 'is-active' : ''}`}
                      onClick={() => setPersonaIndex(idx)}
                      data-cursor="SHADER"
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                <div className="qc-eyebrow">
                  <ScrambleText text={currentPersona.code} triggerKey={currentPersona.id} />
                </div>

                <KineticHeadline
                  as="h1"
                  text={OWNER_PROFILE.fullName}
                  className="qc-hero-title"
                />

                <p className="qc-hero-role-sub">
                  <ScrambleText text={currentPersona.headline} triggerKey={personaIndex} />
                </p>

                <p className="qc-hero-summary">{currentPersona.summary}</p>

                <div className="qc-hero-ctas">
                  <button
                    type="button"
                    className="qc-btn qc-btn-primary"
                    onClick={() => handleViewChange('projects')}
                    data-cursor="LAB"
                  >
                    Explorar Proyectos & Demos ↗
                  </button>
                  <button
                    type="button"
                    className="qc-btn qc-btn-gold"
                    onClick={() => setSelectedProject(flagshipProject)}
                    data-cursor="RPG"
                  >
                    Caso Estudio: Sombra de Valoria
                  </button>
                  <button
                    type="button"
                    className="qc-btn qc-btn-secondary"
                    onClick={() => handleViewChange('cv')}
                    data-cursor="CV"
                  >
                    Ver CV Interactivo / PDF
                  </button>
                  <button
                    type="button"
                    className="qc-btn qc-btn-secondary"
                    onClick={() => setSelectedCert(CERTIFICATES_DATA[0])}
                    data-cursor="VAULT"
                  >
                    Bóveda de Diplomas Oficiales ({CERTIFICATES_DATA.length})
                  </button>
                </div>
              </div>

              {/* Hero Identity Portrait Capsule */}
              <div className="qc-portrait-stage">
                <div className="qc-portrait-card">
                  <div className="qc-portrait-header">
                    <span>ID // ALI-ANDRADE-TSU</span>
                    <span>{portraitMode === 'real' ? 'RETRATO REAL' : 'AVATAR DIGITAL'}</span>
                  </div>
                  <div className="qc-portrait-frame">
                    <picture key={portraitMode}>
                      <source
                        srcSet={
                          portraitMode === 'real'
                            ? OWNER_PROFILE.photoRealWebp
                            : OWNER_PROFILE.avatarCreativeWebp
                        }
                        type="image/webp"
                      />
                      <img
                        src={
                          portraitMode === 'real'
                            ? OWNER_PROFILE.photoRealFallback
                            : OWNER_PROFILE.avatarCreativeFallback
                        }
                        alt={`${OWNER_PROFILE.fullName} — ${
                          portraitMode === 'real' ? 'Fotografía profesional' : 'Ilustración creativa'
                        }`}
                        className="qc-portrait-img"
                        width="520"
                        height="560"
                      />
                    </picture>
                  </div>
                  <div className="qc-portrait-toggle-bar">
                    <button
                      type="button"
                      className={`qc-portrait-toggle-btn ${portraitMode === 'real' ? 'is-active' : ''}`}
                      onClick={() => setPortraitMode('real')}
                      data-cursor="PHOTO"
                    >
                      01 · Fotografía Real
                    </button>
                    <button
                      type="button"
                      className={`qc-portrait-toggle-btn ${portraitMode === 'avatar' ? 'is-active' : ''}`}
                      onClick={() => setPortraitMode('avatar')}
                      data-cursor="AVATAR"
                    >
                      02 · Avatar Digital
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Verified Metrics */}
            <div className="qc-metrics-grid qc-anim-reveal">
              {HERO_METRICS.map((m) => (
                <div key={m.id} className="qc-metric-box">
                  <span className="qc-metric-code">{m.code}</span>
                  <strong className="qc-metric-value">{m.value}</strong>
                  <span className="qc-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Kinetic Velocity Marquee */}
            <VelocityMarquee items={MARQUEE_ITEMS} />
          </>
        )}

        {/* ================================================================
            ACT II: PROJECT LAB & INTERACTIVE SANDBOX (Overview + Projects View)
            ================================================================ */}
        {activeView === 'legacy' && (
          <section id="projects-section" className="qc-section qc-anim-reveal" aria-label="Laboratorio de Proyectos">
            <div className="qc-section-header">
              <span className="qc-eyebrow">02 // ARQUITECTURA DE PROYECTOS & DEMOS VIVAS</span>
              <h2 className="qc-section-title">Ingeniería Web Aplicada y Casos de Estudio</h2>
              <p className="qc-section-lead">
                Cada proyecto documenta el reto técnico real, la arquitectura implementada y ofrece acceso directo
                a su despliegue en producción o al simulador interactivo multipantalla integrado.
              </p>
            </div>

            {/* Flagship Showcase Card: Sombra de Valoria */}
            <SpotlightCard
              className="qc-flagship-card"
              accentColor={flagshipProject.accentColor}
              cursorLabel="FLAGSHIP"
              style={{ position: 'relative' }}
            >
              <div className="qc-flagship-banner">
                <div className="qc-flagship-media">
                  <picture>
                    <source srcSet={flagshipProject.imageWebp} type="image/webp" />
                    <img
                      src={flagshipProject.imageFallback}
                      alt={flagshipProject.title}
                      loading="eager"
                    />
                  </picture>
                </div>
                <div className="qc-flagship-content">
                  <div className="qc-project-badge-row">
                    <span>PROYECTO DESTACADO // {flagshipProject.index}</span>
                    <span>{flagshipProject.status}</span>
                  </div>
                  <h3 className="qc-flagship-title">
                    {flagshipProject.title}
                  </h3>
                  <p className="qc-project-sub">{flagshipProject.subtitle}</p>
                  <p className="qc-project-desc">{flagshipProject.description}</p>
                  <div className="qc-tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {flagshipProject.stack.map((t) => (
                      <TechTag key={t} name={t} size="sm" />
                    ))}
                  </div>
                  <div className="qc-card-actions">
                    <a
                      href={flagshipProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qc-btn qc-btn-primary"
                      data-cursor="LIVE"
                    >
                      Visitar Web App en Producción ↗
                    </a>
                    <button
                      type="button"
                      className="qc-btn qc-btn-secondary"
                      onClick={() => setSelectedProject(flagshipProject)}
                      data-cursor="CASE"
                    >
                      Inspeccionar Arquitectura
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Category Filter Chips */}
            <div className="qc-filter-bar" role="tablist" aria-label="Filtrar proyectos por tecnología">
              {[
                { id: 'todos', label: 'Todos los Proyectos (6)' },
                { id: 'fullstack', label: 'Full-Stack Apps (3)' },
                { id: 'frontend', label: 'Front-End & Retro Apps (2)' },
                { id: 'produccion', label: 'Producción Web (1)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === cat.id}
                  className={`qc-filter-chip ${projectFilter === cat.id ? 'is-active' : ''}`}
                  onClick={() => setProjectFilter(cat.id)}
                  data-cursor="FILTER"
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 3D Spotlight Project Grid */}
            <div className="qc-projects-grid">
              {filteredProjects.map((project) => (
                <SpotlightCard
                  key={project.id}
                  accentColor={project.accentColor}
                  cursorLabel={project.canEmbedSandbox ? 'SANDBOX' : 'INSPECT'}
                >
                  <div className="qc-project-thumb">
                    <picture>
                      <source srcSet={project.imageWebp} type="image/webp" />
                      <img src={project.imageFallback} alt={project.title} loading="lazy" />
                    </picture>
                  </div>
                  <div className="qc-project-badge-row">
                    <span>{project.index} // {project.categoryLabel}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="qc-project-title">{project.title}</h3>
                  <p className="qc-project-sub">{project.subtitle}</p>
                  <p className="qc-project-desc">{project.description}</p>
                  <div className="qc-tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {project.stack.map((tech) => (
                      <TechTag key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                  <div className="qc-card-actions">
                    <button
                      type="button"
                      className="qc-btn qc-btn-primary"
                      onClick={() => setSelectedProject(project)}
                      data-cursor="STUDIO"
                    >
                      {project.canEmbedSandbox ? 'Abrir Sandbox + Caso Estudio' : 'Ver Caso de Estudio'}
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qc-btn qc-btn-secondary"
                      data-cursor="OPEN"
                    >
                      Abrir Demo ↗
                    </a>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
            ACT III: HYBRID SKILLS MATRIX & INTERACTIVE TERMINAL (Overview View)
            ================================================================ */}
        {activeView === 'legacy' && (
          <section id="skills-section" className="qc-section qc-anim-reveal" aria-label="Matriz de Habilidades y Terminal">
            <div className="qc-section-header">
              <span className="qc-eyebrow">03 // CONVERGENCIA FULL-STACK, CLOUD & OPERACIONES IT</span>
              <h2 className="qc-section-title">Arquitectura Técnica & Terminal de Telemetría</h2>
              <p className="qc-section-lead">
                Combinación verificada de desarrollo Front-End/Full-Stack moderno con administración Cloud Azure,
                seguridad informática SEPE, monitoreo de redes PRTG y sistemas ERP Defontana.
              </p>
            </div>

            <div className="qc-skills-grid">
              {SKILL_CLUSTERS.map((cluster) => (
                <SpotlightCard key={cluster.id} accentColor={cluster.accent} cursorLabel="STACK">
                  <div className="qc-project-badge-row">
                    <span>{cluster.code}</span>
                  </div>
                  <h3 className="qc-project-title">{cluster.title}</h3>
                  <p className="qc-cluster-sub">
                    {cluster.subtitle}
                  </p>
                  <div className="qc-skill-bars">
                    {(cluster.items || []).map((item) => (
                      <div key={item.name} className="qc-skill-row">
                        <div className="qc-skill-item-top">
                          <strong>{item.name}</strong>
                          <span className="qc-skill-level-badge">{item.level}</span>
                        </div>
                        <div className="qc-skill-track">
                          <div
                            className="qc-skill-fill"
                            style={{ width: typeof item.level === 'number' ? `${item.level}%` : '88%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {cluster.highlights && cluster.highlights.length > 0 && (
                    <ul className="qc-cluster-highlights">
                      {cluster.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              ))}
            </div>

            {/* Interactive CLI Terminal & Simulated PRTG Network Monitor */}
            <InteractiveTerminal
              onNavigateView={(view) => handleViewChange(view)}
              onOpenCert={(cert) => setSelectedCert(cert)}
            />
          </section>
        )}

        {/* ================================================================
            ACT IV: CURRICULUM VITAE, EXPERIENCE TIMELINE & EDUCATION (Overview View)
            ================================================================ */}
        {activeView === 'legacy' && (
          <section id="cv-section" className="qc-section qc-anim-reveal" aria-label="Experiencia Laboral y Educación">
            <div className="qc-section-header">
              <div className="qc-section-header-row">
                <div>
                  <span className="qc-eyebrow">04 // TRAYECTORIA VERIFICADA (2014 – PRESENTE)</span>
                  <h2 className="qc-section-title">Experiencia Profesional & Formación Académica</h2>
                </div>
                <button
                  type="button"
                  className="qc-btn qc-btn-gold"
                  onClick={() => window.print()}
                  data-cursor="PRINT"
                >
                  Imprimir / Guardar CV en PDF ⎙
                </button>
              </div>
              <p className="qc-section-lead">
                Más de 6 años resolviendo problemas reales en infraestructura de redes, mantenimiento de sistemas,
                control de calidad industrial y gestión logística ERP antes y durante el salto al desarrollo web.
              </p>
            </div>

            <div className="qc-timeline-list">
              {EXPERIENCE_TIMELINE.map((exp) => (
                <article key={exp.id} className="qc-timeline-item">
                  <div className="qc-timeline-meta">
                    <span className="qc-timeline-period">{exp.period}</span>
                    <strong className="qc-timeline-company">{exp.company}</strong>
                    {exp.badge && (
                      <span className="qc-tag qc-timeline-tag">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="qc-timeline-content">
                    <h3 className="qc-project-title">{exp.role}</h3>
                    <ul className="qc-timeline-bullets">
                      {(exp.points || exp.highlights || []).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            {/* Academic & Bootcamp Education */}
            <div className="qc-edu-block">
              <div className="qc-section-header" style={{ marginBottom: '1.25rem' }}>
                <span className="qc-eyebrow">FORMACIÓN ACADÉMICA & CERTIFICACIONES ESTATALES</span>
                <h3 className="qc-subsection-title">
                  Educación Formal Universitaria & Especialización Técnica
                </h3>
              </div>
              <div className="qc-edu-grid">
                {EDUCATION_DATA.map((edu) => (
                  <SpotlightCard key={edu.id} cursorLabel="EDU">
                    <div className="qc-project-badge-row">
                      <span>{edu.period}</span>
                      <span>{edu.badge}</span>
                    </div>
                    <h4 className="qc-project-title">{edu.title || edu.degree}</h4>
                    <p className="qc-project-sub">{edu.institution}</p>
                    <p className="qc-project-desc" style={{ marginBottom: 0 }}>{edu.details}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Complementary & Maker Craftsmanship */}
            <div className="qc-edu-block" style={{ marginTop: '2.5rem' }}>
              <div className="qc-section-header" style={{ marginBottom: '1.25rem' }}>
                <span className="qc-eyebrow">DIFERENCIADORES TÉCNICOS & CULTURA MAKER</span>
                <h3 className="qc-subsection-title">
                  Competencias Técnicas y Oficios Complementarios
                </h3>
              </div>
              <div className="qc-craft-grid">
                {COMPLEMENTARY_CRAFT.map((craft) => (
                  <SpotlightCard key={craft.id} cursorLabel="MAKER">
                    <div className="qc-craft-item-inner">
                      <span className="qc-craft-emoji" aria-hidden="true">{craft.icon}</span>
                      <div>
                        <h4 className="qc-project-title" style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                          {craft.title}
                        </h4>
                        <p className="qc-project-desc" style={{ marginBottom: 0 }}>
                          {craft.desc}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================
            ACT V: OFFICIAL DIPLOMA VAULT (Overview + Vault View)
            ================================================================ */}
        {activeView === 'legacy' && (
          <section id="vault-section" className="qc-section qc-anim-reveal" aria-label="Bóveda de Certificados Oficiales">
            <div className="qc-section-header">
              <span className="qc-eyebrow">05 // CREDENCIALES AUDITABLES (4GEEKS, SEPE ESPAÑA & DESAFÍO LATAM)</span>
              <h2 className="qc-section-title">Bóveda Interactiva de Diplomas Oficiales ({CERTIFICATES_DATA.length})</h2>
              <p className="qc-section-lead">
                Haz clic en cualquier certificado para abrir el visor de alta resolución con zoom interactivo,
                código de registro oficial y descarga del documento original en PDF/PNG.
              </p>
            </div>

            <div className="qc-filter-bar" role="tablist" aria-label="Filtrar certificados por entidad emisora">
              {[
                { id: 'todos', label: `Todos los Certificados (${CERTIFICATES_DATA.length})` },
                { id: '4geeks', label: '4Geeks Academy · Full Stack 360h (1)' },
                { id: 'sepe', label: 'SEPE España · Cloud, Cyber & JS/PHP (3)' },
                { id: 'desafio-latam', label: 'Academia Desafío Latam · Front-End & React (4)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={certFilter === tab.id}
                  className={`qc-filter-chip ${certFilter === tab.id ? 'is-active' : ''}`}
                  onClick={() => setCertFilter(tab.id)}
                  data-cursor="FILTER"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="qc-certs-grid">
              {filteredCerts.map((cert) => (
                <SpotlightCard
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  cursorLabel="INSPECT"
                >
                  <div className="qc-cert-thumb">
                    <picture>
                      <source srcSet={cert.thumbWebp} type="image/webp" />
                      <img src={cert.fullImage} alt={cert.title} loading="lazy" />
                    </picture>
                  </div>
                  <div className="qc-project-badge-row">
                    <span>{cert.code}</span>
                    <span>{cert.hours}</span>
                  </div>
                  <h3 className="qc-cert-title">{cert.title}</h3>
                  <p className="qc-project-sub">{cert.issuer}</p>
                  <p className="qc-cert-verify-meta">
                    {cert.verificationId} · {cert.date}
                  </p>
                  <div className="qc-tag-list">
                    {cert.topics.map((topic) => (
                      <span key={topic} className="qc-tag">{topic}</span>
                    ))}
                  </div>
                  <div className="qc-card-actions">
                    <button
                      type="button"
                      className="qc-btn qc-btn-primary"
                      style={{ width: '100%' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                    >
                      Inspeccionar Diploma + Zoom
                    </button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
            ACT VI: QR SIGNAL & DIRECT CONTACT HUB (Overview + QR View)
            ================================================================ */}
        {activeView === 'legacy' && (
          <section id="contact-section" className="qc-section qc-anim-reveal" aria-label="Contacto Directo y Tarjeta QR">
            <div className="qc-section-header">
              <span className="qc-eyebrow">06 // CANAL DIRECTO & TARJETA QR VECTORIAL</span>
              <h2 className="qc-section-title">Iniciemos una Conversación Técnica</h2>
              <p className="qc-section-lead">
                Disponible en España para posiciones Front-End, Full-Stack Jr., Soporte IT / Cloud y proyectos freelance.
                Respuesta directa por WhatsApp, correo electrónico o LinkedIn.
              </p>
            </div>

            <div className="qc-contact-grid">
              <SpotlightCard cursorLabel="CONTACT">
                <div className="qc-project-badge-row">
                  <span>ESTADO // DISPONIBILIDAD INMEDIATA</span>
                  <span>ESPAÑA · REMOTO / HÍBRIDO</span>
                </div>
                <h3 className="qc-flagship-title">
                  {OWNER_PROFILE.fullName}
                </h3>
                <p className="qc-project-desc">
                  ¿Buscas un desarrollador capaz de maquetar interfaces modernas en React/GSAP y al mismo tiempo
                  comprender la infraestructura Cloud, Linux y las operaciones reales de tu empresa?
                </p>

                <div className="qc-contact-info-list">
                  <div className="qc-contact-row">
                    <span>Correo Principal: <strong>{OWNER_PROFILE.emailPrimary}</strong></span>
                    <button
                      type="button"
                      className="qc-term-chip"
                      onClick={() => handleCopyText(OWNER_PROFILE.emailPrimary, 'email')}
                    >
                      {copiedSignal === 'email' ? '¡Copiado!' : 'Copiar Email'}
                    </button>
                  </div>
                  <div className="qc-contact-row">
                    <span>Teléfono / WhatsApp: <strong>{OWNER_PROFILE.phone}</strong></span>
                    <button
                      type="button"
                      className="qc-term-chip"
                      onClick={() => handleCopyText(OWNER_PROFILE.phone, 'phone')}
                    >
                      {copiedSignal === 'phone' ? '¡Copiado!' : 'Copiar Teléfono'}
                    </button>
                  </div>
                </div>

                <div className="qc-card-actions">
                  <a
                    href={OWNER_PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qc-btn qc-btn-primary"
                    data-cursor="WHATSAPP"
                  >
                    Escribir por WhatsApp ↗
                  </a>
                  <a
                    href={`mailto:${OWNER_PROFILE.emailPrimary}`}
                    className="qc-btn qc-btn-secondary"
                    data-cursor="EMAIL"
                  >
                    Enviar Correo Directo
                  </a>
                  <a
                    href={OWNER_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qc-btn qc-btn-secondary"
                    data-cursor="LINKEDIN"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={OWNER_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qc-btn qc-btn-secondary"
                    data-cursor="GITHUB"
                  >
                    GitHub ↗
                  </a>
                </div>
              </SpotlightCard>

              {/* Scannable ISO QR Card */}
              <SpotlightCard cursorLabel="SCAN QR">
                <div className="qc-qr-panel">
                  <span className="qc-eyebrow">QR ISO/IEC 18004 VERIFICADO</span>
                  <div className="qc-qr-frame">
                    <img
                      src={OWNER_PROFILE.qrSvg}
                      alt="Código QR oficial hacia https://ali-ajelandrox.github.io"
                      width="180"
                      height="180"
                    />
                  </div>
                  <h3 className="qc-project-title" style={{ marginBottom: 0 }}>
                    Tarjeta Digital para Móvil
                  </h3>
                  <p className="qc-project-desc" style={{ marginBottom: '0.5rem' }}>
                    Escanea con la cámara de tu teléfono para abrir{' '}
                    <strong>ali-ajelandrox.github.io</strong> o compartir el portafolio en entrevistas presenciales.
                  </p>
                  <button
                    type="button"
                    className="qc-btn qc-btn-secondary"
                    onClick={() => handleCopyText('https://ali-ajelandrox.github.io/', 'url')}
                  >
                    {copiedSignal === 'url' ? '¡Enlace Copiado!' : 'Copiar URL del Portafolio'}
                  </button>
                </div>
              </SpotlightCard>
            </div>
          </section>
        )}
      </main>

      {/* 6. Global Footer */}
      <footer className="qc-footer" role="contentinfo">
        <div className="qc-footer-inner">
          <div>
            <strong>{OWNER_PROFILE.fullName}</strong> · TSU en Informática & Front-End / Cloud Developer
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="./index.html" onClick={(e) => { e.preventDefault(); handleViewChange('overview'); }}>Inicio</a>
            <a href="./src/routes/proyects.html" onClick={(e) => { e.preventDefault(); handleViewChange('projects'); }}>Proyectos</a>
            <a href="./src/routes/cv.html" onClick={(e) => { e.preventDefault(); handleViewChange('cv'); }}>CV</a>
            <a href="./src/routes/qr.html" onClick={(e) => { e.preventDefault(); handleViewChange('qr'); }}>QR</a>
            <a href={OWNER_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={OWNER_PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div>REACT 18 · GSAP 3 · WEBGL SHADERS</div>
        </div>
      </footer>

      {/* 7. Global Overlays & Modals */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigateView={(view) => handleViewChange(view)}
        onSwitchPersona={(idx) => setPersonaIndex(idx)}
        onOpenProject={(proj) => setSelectedProject(proj)}
        onOpenCert={(cert) => setSelectedCert(cert)}
      />

      <ProjectSandboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateVaultModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
        onSelectCertificate={(cert) => setSelectedCert(cert)}
      />
    </div>
  );
}
