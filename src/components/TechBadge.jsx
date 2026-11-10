import React from 'react';

/**
 * Registry of official technology logos, brand colors and comic-editorial tokens.
 * Grounded in verified tech stack facts and official brand guidelines.
 */
export const TECH_REGISTRY = {
  react: {
    key: 'react',
    label: 'React 18',
    brandColor: '#00D8FF',
    bgColor: 'rgba(0, 216, 255, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-icon-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="#00D8FF" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#00D8FF" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#00D8FF" strokeWidth="1.5" />
      </svg>
    )
  },
  javascript: {
    key: 'javascript',
    label: 'JavaScript ES6+',
    brandColor: '#F7DF1E',
    bgColor: 'rgba(247, 223, 30, 0.16)',
    textColor: '#18181b',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect width="24" height="24" rx="3.5" fill="#F7DF1E" />
        <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1 0 1.6-.5 1.6-1.3v-5.5h2v5.5c0 2-1.3 3-3.6 3-1.6 0-2.8-.8-3.4-2.1l1.3-.9zm8.2-.2c.6.7 1.4 1.1 2.3 1.1.9 0 1.5-.4 1.5-1 0-.7-.5-1-1.7-1.4l-.6-.2c-1.8-.7-3-1.6-3-3.3 0-1.8 1.4-3.2 3.5-3.2 1.5 0 2.6.5 3.3 1.7l-1.4 1c-.4-.7-1-1-1.9-1-.8 0-1.3.4-1.3 1 0 .6.4.9 1.5 1.3l.6.2c2.1.8 3.2 1.7 3.2 3.5 0 2-1.6 3.3-3.8 3.3-1.9 0-3.1-.7-3.9-2.1l1.2-.9z" fill="#111" />
      </svg>
    )
  },
  html5: {
    key: 'html5',
    label: 'HTML5',
    brandColor: '#E34F26',
    bgColor: 'rgba(227, 79, 38, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#E34F26" d="M3 2l1.6 18.2L12 22.5l7.4-2.3L21 2H3z" />
        <path fill="#EF652A" d="M12 3.8v16.9l5.9-1.8 1.4-15.1H12z" />
        <path fill="#EBEBEB" d="M12 8.4H8l.2 2.3H12V8.4zm0 4.6H8.4l.2 2.3H12v-2.3z" />
        <path fill="#fff" d="M12 8.4h4.3l-.4 4.6H12v2.3h3.7l-.4 3.7-3.3 1v-2.3l1.8-.5.2-1.9H12V8.4z" />
      </svg>
    )
  },
  css3: {
    key: 'css3',
    label: 'CSS3',
    brandColor: '#1572B6',
    bgColor: 'rgba(21, 114, 182, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#1572B6" d="M3 2l1.6 18.2L12 22.5l7.4-2.3L21 2H3z" />
        <path fill="#33A9DC" d="M12 3.8v16.9l5.9-1.8 1.4-15.1H12z" />
        <path fill="#EBEBEB" d="M12 8.4H7.9l.4 4.6H12V8.4zm0 6.9H8.7l.2 2.3 3.1.9v-3.2z" />
        <path fill="#fff" d="M12 8.4h4.3l-.2 2.3H12v2.3h3.9l-.4 4.6-3.5 1v-2.3l1.8-.5.2-2.1H12V8.4z" />
      </svg>
    )
  },
  gsap: {
    key: 'gsap',
    label: 'GSAP 3',
    brandColor: '#0AE448',
    bgColor: 'rgba(10, 228, 72, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#0AE448" />
        <path fill="#0d131f" d="M6 15l4-6h4l-4 6H6zm8-6l4 6h-3l-4-6h3z" />
      </svg>
    )
  },
  bootstrap: {
    key: 'bootstrap',
    label: 'Bootstrap 5',
    brandColor: '#7952B3',
    bgColor: 'rgba(121, 82, 179, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#7952B3" />
        <path fill="#fff" d="M8 6h4.5c1.7 0 2.8.9 2.8 2.3 0 1-.6 1.8-1.6 2.1 1.3.3 2 1.2 2 2.4 0 1.6-1.3 2.7-3.2 2.7H8V6zm2.2 3.8h2.1c.7 0 1.2-.4 1.2-1s-.5-1-1.2-1h-2.1v2zm0 3.9h2.3c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1h-2.3v2.2z" />
      </svg>
    )
  },
  tailwind: {
    key: 'tailwind',
    label: 'Tailwind CSS',
    brandColor: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#06B6D4" className="tech-icon-svg" aria-hidden="true">
        <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.8-2.3 4.5-2 1 .1 1.7.9 2.5 1.7 1.3 1.3 2.8 2.8 6 2.8 3.3 0 5.3-1.7 6-5-1.3 1.7-2.8 2.3-4.5 2-1-.1-1.7-.9-2.5-1.7-1.3-1.3-2.8-2.8-6-2.8zm-6 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.8-2.3 4.5-2 1 .1 1.7.9 2.5 1.7 1.3 1.3 2.8 2.8 6 2.8 3.3 0 5.3-1.7 6-5-1.3 1.7-2.8 2.3-4.5 2-1-.1-1.7-.9-2.5-1.7-1.3-1.3-2.8-2.8-6-2.8z" />
      </svg>
    )
  },
  nodejs: {
    key: 'nodejs',
    label: 'Node.js',
    brandColor: '#5FA04E',
    bgColor: 'rgba(95, 160, 78, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#5FA04E" d="M12 1.5L2 7.3v11.4L12 24.5l10-5.8V7.3L12 1.5zm0 2.3l7.8 4.5v9L12 21.8 4.2 17.3v-9L12 3.8z" />
        <circle cx="12" cy="13" r="3.2" fill="#5FA04E" />
      </svg>
    )
  },
  php: {
    key: 'php',
    label: 'PHP',
    brandColor: '#777BB4',
    bgColor: 'rgba(119, 123, 180, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10.5" ry="6.5" fill="#777BB4" />
        <path fill="#fff" d="M6.5 14V10H9c.8 0 1.4.4 1.4 1.2 0 .8-.6 1.3-1.4 1.3H8V14H6.5zm4.5 0V10h1.5v1.4h1V10h1.5v4H13.5v-1.4h-1V14H11zm5 0V10h2.5c.8 0 1.4.4 1.4 1.2 0 .8-.6 1.3-1.4 1.3h-1V14H16z" />
      </svg>
    )
  },
  azure: {
    key: 'azure',
    label: 'Azure Cloud',
    brandColor: '#0089D6',
    bgColor: 'rgba(0, 137, 214, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#0089D6" d="M5.4 20h13.2a1.4 1.4 0 001.2-.7 1.4 1.4 0 000-1.4L13.2 4.7a1.4 1.4 0 00-2.4 0L4.2 17.9a1.4 1.4 0 000 1.4c.3.5.7.7 1.2.7zm6.6-11.8l4.4 8.8H7.6l4.4-8.8z" />
      </svg>
    )
  },
  linux: {
    key: 'linux',
    label: 'Linux',
    brandColor: '#FCC624',
    bgColor: 'rgba(252, 198, 36, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#18181b" d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1 .3 2 .8 2.8C6.3 10.4 5 12.5 5 15c0 1.7.7 3.2 1.8 4.3L6 21h12l-.8-1.7c1.1-1.1 1.8-2.6 1.8-4.3 0-2.5-1.3-4.6-3.3-5.7.5-.8.8-1.8.8-2.8C16.5 4 14.5 2 12 2z" />
        <ellipse cx="12" cy="14" rx="4" ry="5" fill="#FCC624" />
        <circle cx="10" cy="6" r="1.1" fill="#fff" />
        <circle cx="14" cy="6" r="1.1" fill="#fff" />
        <circle cx="10.3" cy="6" r="0.5" fill="#000" />
        <circle cx="13.7" cy="6" r="0.5" fill="#000" />
        <path d="M10 8h4l-2 2z" fill="#E95420" />
      </svg>
    )
  },
  security: {
    key: 'security',
    label: 'Ciberseguridad',
    brandColor: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#10B981" d="M12 2L4 5v6.5C4 16.5 7.4 21 12 22c4.6-1 8-5.5 8-10.5V5l-8-3z" />
        <path fill="#059669" d="M12 4.2L6 6.5v5c0 3.8 2.6 7.4 6 8.3V4.2z" />
        <path fill="#fff" d="M12 8a2 2 0 00-2 2v1h-.5a.5.5 0 00-.5.5v3c0 .3.2.5.5.5h5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H14v-1a2 2 0 00-2-2zm1 3h-2v-1a1 1 0 112 0v1z" />
      </svg>
    )
  },
  mysql: {
    key: 'mysql',
    label: 'MySQL',
    brandColor: '#00758F',
    bgColor: 'rgba(0, 117, 143, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#00758F" d="M19 12c-1.5-3.5-5-6-8.5-6-4.5 0-7.5 3.5-7.5 7.5 0 3 2 5.5 5 6.5.5-1.5 1.5-2.5 3-3-1.5-.5-2.5-1.5-2.5-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.5-1 2.5-2.5 3 1.5.5 2.5 1.5 3 3 2.5-1 4-3 4-5z" />
        <circle cx="16" cy="10" r="1" fill="#F29111" />
      </svg>
    )
  },
  mongodb: {
    key: 'mongodb',
    label: 'MongoDB',
    brandColor: '#47A248',
    bgColor: 'rgba(71, 162, 72, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#47A248" d="M12 2C11.5 4.5 9 8 9 12c0 3.5 2.5 7 3 9 0-3.5 1-4.5 1-8 0-4-1-6.5-1-11z" />
        <path fill="#499D4A" d="M12 2c.5 2.5 3 6 3 10 0 3.5-2.5 7-3 9V2z" />
      </svg>
    )
  },
  git: {
    key: 'git',
    label: 'Git / GitHub',
    brandColor: '#F05032',
    bgColor: 'rgba(240, 80, 50, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#F05032" d="M21.6 10.7l-8.3-8.3a2.3 2.3 0 00-3.3 0L7.7 4.7 9.8 6.8a2.3 2.3 0 012.7 2.7l2.5 2.5a2.3 2.3 0 11-1.3 1.3l-2.4-2.4a2.3 2.3 0 01-2.9-2.9L6.3 5.9 2.4 9.8a2.3 2.3 0 000 3.3l8.3 8.3a2.3 2.3 0 003.3 0l7.6-7.6a2.3 2.3 0 000-3.1z" />
      </svg>
    )
  },
  prtg: {
    key: 'prtg',
    label: 'PRTG Network Monitor',
    brandColor: '#F5A623',
    bgColor: 'rgba(245, 166, 35, 0.14)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#FFCC00" />
        <path d="M12 4a8 8 0 018 8h-4a4 4 0 00-4-4V4z" fill="#006DB6" />
        <circle cx="12" cy="12" r="3" fill="#0D131F" />
        <path d="M12 12l4-4" stroke="#D32F2F" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  },
  defontana: {
    key: 'defontana',
    label: 'ERP Defontana',
    brandColor: '#E53935',
    bgColor: 'rgba(229, 57, 53, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#E53935" />
        <path fill="#fff" d="M7 6h5c3.3 0 6 2.7 6 6s-2.7 6-6 6H7V6zm3 3v6h2c1.7 0 3-1.3 3-3s-1.3-3-3-3h-2z" />
      </svg>
    )
  },
  hardware: {
    key: 'hardware',
    label: 'Hardware & Redes',
    brandColor: '#0284C7',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="2.5" fill="#0284C7" />
        <rect x="8" y="8" width="8" height="8" fill="#fff" rx="1" />
        <path stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round" d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    )
  },
  soldering: {
    key: 'soldering',
    label: 'Micro-soldadura Electrónica',
    brandColor: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.14)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#F59E0B" d="M19 3l2 2-7 7-1-1 6-8zm-8 8l1 1-6 6H4v-2l6-6zm-4 4l-3 3v2h2l3-3-2-2z" />
      </svg>
    )
  },
  carpentry: {
    key: 'carpentry',
    label: 'Carpintería Técnica',
    brandColor: '#D97706',
    bgColor: 'rgba(217, 119, 6, 0.14)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#D97706" d="M3 3h4v14h14v4H3V3zm6 14h2v-2H9v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM5 7h2V5H5v2zm0 4h2V9H5v2zm0 4h2v-2H5v2z" />
      </svg>
    )
  },
  logistics: {
    key: 'logistics',
    label: 'Logística & Almacén',
    brandColor: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#8B5CF6" d="M20 7l-8-4-8 4 8 4 8-4zm-8 6l-8-4v8l8 4v-8zm2 0v8l8-4v-8l-8 4z" />
      </svg>
    )
  },
  firebase: {
    key: 'firebase',
    label: 'Firebase',
    brandColor: '#FFA000',
    bgColor: 'rgba(255, 160, 0, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#FFA000" d="M4.5 16.5L7 3.5l3.8 6.5-6.3 6.5z" />
        <path fill="#F57C00" d="M19.5 16.5L16 6.5l-2.2 4.2 5.7 5.8z" />
        <path fill="#FFCA28" d="M13.8 10.7L12 2l-1.2 2.5 3 6.2z" />
        <path fill="#FFCA28" d="M3.5 17.5L12 22l8.5-4.5-3.5-3.5L12 18l-5-4-3.5 3.5z" />
      </svg>
    )
  },
  vite: {
    key: 'vite',
    label: 'Vite',
    brandColor: '#BD34FE',
    bgColor: 'rgba(189, 52, 254, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#BD34FE" d="M20.8 4.2L12.5 19 3.2 4.2h17.6z" />
        <path fill="#FFD62E" d="M13.5 3l-6 8h4.5l-2 7 7-9.5h-4.5l1-5.5z" />
      </svg>
    )
  },
  webgl: {
    key: 'webgl',
    label: 'WebGL / GLSL',
    brandColor: '#990000',
    bgColor: 'rgba(153, 0, 0, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#990000" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5l6.5 3.6L12 11.7 5.5 8.1 12 4.5zM5 9.8l6 3.3v6.7L5 16.5V9.8zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
      </svg>
    )
  },
  figma: {
    key: 'figma',
    label: 'Figma',
    brandColor: '#F24E1E',
    bgColor: 'rgba(242, 78, 30, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
        <path fill="#F24E1E" d="M8 2h4v4H8z" />
        <path fill="#A259FF" d="M8 6h4v4H8z" />
        <path fill="#1ABCFE" d="M8 10h4v4H8z" />
        <path fill="#0ACF83" d="M8 14h4v4H8a2 2 0 01-2-2 2 2 0 012-2z" />
        <path fill="#FF7262" d="M12 2h4a2 2 0 012 2 2 2 0 01-2 2h-4V2z" />
      </svg>
    )
  },
  default: {
    key: 'default',
    label: 'Tech',
    brandColor: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tech-icon-svg" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  }
};

/**
 * Normalizes any tech string (e.g. "React 18 & Vite", "HTML5 Semántico", "CSS3 Flexbox")
 * and matches the corresponding official technology configuration.
 */
export function getTechInfo(name) {
  if (!name || typeof name !== 'string') return TECH_REGISTRY.default;
  const n = name.toLowerCase().trim();

  if (n.includes('react')) return TECH_REGISTRY.react;
  if (n.includes('javascript') || n.includes('es6') || n === 'js') return TECH_REGISTRY.javascript;
  if (n.includes('html')) return TECH_REGISTRY.html5;
  if (n.includes('css') || n.includes('grid') || n.includes('flexbox')) return TECH_REGISTRY.css3;
  if (n.includes('gsap') || n.includes('scrolltrigger') || n.includes('animacion')) return TECH_REGISTRY.gsap;
  if (n.includes('bootstrap')) return TECH_REGISTRY.bootstrap;
  if (n.includes('tailwind')) return TECH_REGISTRY.tailwind;
  if (n.includes('node') || n.includes('restful') || n.includes('api')) return TECH_REGISTRY.nodejs;
  if (n.includes('php')) return TECH_REGISTRY.php;
  if (n.includes('azure') || n.includes('cloud')) return TECH_REGISTRY.azure;
  if (n.includes('linux')) return TECH_REGISTRY.linux;
  if (n.includes('seguridad') || n.includes('ciberseguridad') || n.includes('cifrado')) return TECH_REGISTRY.security;
  if (n.includes('mysql') || n.includes('sql') || n.includes('relacional')) return TECH_REGISTRY.mysql;
  if (n.includes('mongo')) return TECH_REGISTRY.mongodb;
  if (n.includes('git') || n.includes('github') || n.includes('ci/cd')) return TECH_REGISTRY.git;
  if (n.includes('prtg') || n.includes('telemetría') || n.includes('redes')) return TECH_REGISTRY.prtg;
  if (n.includes('defontana') || n.includes('erp')) return TECH_REGISTRY.defontana;
  if (n.includes('hardware') || n.includes('soporte') || n.includes('hw')) return TECH_REGISTRY.hardware;
  if (n.includes('soldadura') || n.includes('smd') || n.includes('electrónica')) return TECH_REGISTRY.soldering;
  if (n.includes('carpintería') || n.includes('planos') || n.includes('madera')) return TECH_REGISTRY.carpentry;
  if (n.includes('almacén') || n.includes('logística') || n.includes('stock')) return TECH_REGISTRY.logistics;
  if (n.includes('firebase')) return TECH_REGISTRY.firebase;
  if (n.includes('vite')) return TECH_REGISTRY.vite;
  if (n.includes('webgl') || n.includes('glsl') || n.includes('shader')) return TECH_REGISTRY.webgl;
  if (n.includes('figma')) return TECH_REGISTRY.figma;

  return TECH_REGISTRY.default;
}

/**
 * MangaArsenalSkillChip
 * Used in ARC 04 (Chapter 04 // El Arsenal Técnico & Maker)
 * Presents each skill as a collectible comic inventory power chip with:
 * - Official vector logo
 * - Official brand color accent indicator
 * - Bold display typography and clear level indicator
 * - Uneven comic borders and tactile drop shadow
 */
export function MangaArsenalSkillChip({ item }) {
  const tech = getTechInfo(item.name);

  return (
    <div
      className="manga-tech-chip"
      style={{
        '--tech-accent': tech.brandColor,
        '--tech-bg-tint': tech.bgColor
      }}
      title={`${item.name} (${item.level || 'Dominio Técnico'})`}
    >
      <div className="manga-tech-chip-icon" aria-hidden="true">
        {tech.svg}
      </div>
      <div className="manga-tech-chip-content">
        <span className="manga-tech-chip-name">{item.name}</span>
        {item.level && <span className="manga-tech-chip-level">{item.level}</span>}
      </div>
      <span className="manga-tech-chip-indicator" aria-hidden="true" />
    </div>
  );
}

/**
 * TechTag
 * Used in ARC 05 (Projects, Flagship, Demos) and Modals.
 * Displays a compact comic pill with the technology's mini logo and brand accent.
 */
export function TechTag({ name, size = 'sm' }) {
  const tech = getTechInfo(name);

  return (
    <span
      className={`manga-tech-tag manga-tech-tag-${size}`}
      style={{
        '--tech-accent': tech.brandColor,
        '--tech-bg-tint': tech.bgColor
      }}
    >
      <span className="manga-tech-tag-icon" aria-hidden="true">
        {tech.svg}
      </span>
      <span className="manga-tech-tag-label">{name}</span>
    </span>
  );
}
