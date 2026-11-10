/**
 * Ali Alejandro Andrade Godoy — Verified Portfolio Data Store (src/data/portfolioData.js)
 * 100% grounded in verified repository facts, certificates, and real projects.
 */

export function resolveAsset(path) {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const clean = path.replace(/^\/+/, '');
  if (typeof window !== 'undefined' && window.location && window.location.pathname) {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/src/routes/')) {
      return `../../${clean}`;
    }
  }
  return `./${clean}`;
}

export const OWNER_PROFILE = {
  fullName: 'Ali Alejandro Andrade Godoy',
  shortName: 'Ali Andrade',
  handle: '@ali-ajelandrox',
  rolePrimary: 'Front-End & Full-Stack Web Developer',
  roleSecondary: 'TSU en Informática · Cloud Azure/Linux, Ciberseguridad & Operaciones ERP',
  tagline: 'Ingeniería de software e interfaces interactivas con rigor de producción, respaldada por más de 6 años resolviendo infraestructura crítica, redes industriales y logística empresarial.',
  summaryExecutive: 'Desarrollador Web y TSU en Informática con sólida base en arquitecturas React, JavaScript (ES6+), GSAP y APIs RESTful. Diferenciado por más de 6 años de experiencia previa en soporte técnico de sistemas, administración de redes corporativas (PRTG), Cloud Computing (Azure/Linux) y gestión logística ERP (Defontana). Titulado universitario y triple certificado oficial por el SEPE (Gobierno de España) en Desarrollo Web Cliente/Servidor, Cloud Computing y Ciberseguridad Empresarial.',
  location: 'España · Disponible Remoto / Híbrido / Presencial',
  status: 'ONLINE // DISPONIBLE PARA INCORPORACIÓN INMEDIATA',
  phone: '+34 642 83 47 42',
  phoneRaw: '+34642834742',
  emailPrimary: 'Andradegali1503@gmail.com',
  emailSecondary: 'Ajelandrox15@gmail.com',
  githubUrl: 'https://github.com/ali-ajelandrox',
  githubReposUrl: 'https://github.com/ali-ajelandrox?tab=repositories',
  linkedinUrl: 'https://www.linkedin.com/in/alejandro-andrade-1a38a7331',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61566637568962',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=34642834742&text=%C2%A1Hola%20Ali!%20He%20revisado%20tu%20perfil%20profesional%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad.',
  photoRealWebp: resolveAsset('/assets/img/ali_perfil.webp'),
  photoRealFallback: resolveAsset('/assets/img/ali_perfil.jpg'),
  avatarCreativeWebp: resolveAsset('/assets/img/ali_perfil.webp'),
  avatarCreativeFallback: resolveAsset('/assets/img/ali_perfil.jpg'),
  qrSvg: resolveAsset('/src/img/qr-portfolio.svg')
};

export const PERSONA_MODES = [
  {
    id: 'quantum-frontend',
    code: 'MODE_01 // FRONTEND_CRAFT',
    label: 'Front-End & Creative UI',
    accent: '#38bdf8',
    secondary: '#c084fc',
    shaderPreset: 0,
    headline: 'Interfaces React, Animación GSAP & Arquitectura CSS',
    summary: 'Diseño e implementación de experiencias web responsivas, microinteracciones fluidas, maquetación desde Figma y aplicaciones SPA con HTML5, CSS3, JavaScript (ES6+), React, Angular y Bootstrap.'
  },
  {
    id: 'cyber-cloud',
    code: 'MODE_02 // CLOUD_SENTINEL',
    label: 'Cloud, Linux & Ciberseguridad',
    accent: '#60a5fa',
    secondary: '#d8b4fe',
    shaderPreset: 1,
    headline: 'Infraestructura Azure, Administración Linux & Seguridad SEPE',
    summary: 'Formación oficial certificada por el SEPE (España) en Programación Web Cliente/Servidor JS+PHP (IFCT091PO), Cloud Computing Windows Azure & Linux (IFCT026PO) y Gestión de Seguridad Informática Empresarial (IFCT050PO).'
  },
  {
    id: 'systems-maker',
    code: 'MODE_03 // SYSTEMS_MAKER',
    label: 'Sistemas IT, ERP & Maker',
    accent: '#2dd4bf',
    secondary: '#a78bfa',
    shaderPreset: 2,
    headline: 'Monitoreo PRTG, Gestión ERP Defontana & Precisión de Oficio',
    summary: 'Más de 6 años combinando soporte de sistemas e infraestructura de red (Ministerio de Educación, MEGA FRÍO Chile) con control de calidad, logística nacional ERP Defontana, micro-soldadura electrónica y ebanistería técnica.'
  }
];

export const HERO_METRICS = [
  {
    id: 'm1',
    code: 'SYS.EDU // 2014–2018',
    value: 'TSU Informática',
    label: 'Título Universitario (IUGT) + Especialización Full-Stack JS'
  },
  {
    id: 'm2',
    code: 'SYS.EXP // +6 AÑOS',
    value: 'IT & Operaciones',
    label: 'Analista de Sistemas, Auxiliar Informático & Jefe de Almacén'
  },
  {
    id: 'm3',
    code: 'SYS.CERT // 2023–2024',
    value: '07 Diplomas',
    label: 'Credenciales oficiales verificadas (SEPE España & Desafío Latam)'
  },
  {
    id: 'm4',
    code: 'SYS.STACK // CORE',
    value: '14+ Tecnologías',
    label: 'React, Angular, JS, Node, PHP, Azure, Linux, PRTG, Defontana'
  }
];

export const PROJECTS_DATA = [
  {
    id: 'sombra-de-valoria',
    index: '01',
    featured: true,
    title: 'Sombra de Valoria',
    subtitle: 'Portal Web Inmersivo & Universo RPG Fantasía',
    category: 'produccion',
    categoryLabel: 'Web App en Producción',
    year: '2024',
    status: 'LIVE // FIREBASE HOSTING',
    imageWebp: resolveAsset('/src/img/proyecto1.webp'),
    imageFallback: resolveAsset('/src/img/proyecto1.png'),
    liveUrl: 'https://sombra-de-valoria.web.app/',
    canEmbedSandbox: false,
    accentColor: '#ffb800',
    tagline: 'Del ordinario al legendario: entra y escribe tu propia saga.',
    description:
      'Desarrollo Front-End de una experiencia web inmersiva diseñada para captar la atención de los visitantes desde el primer instante. Combina dirección de arte oscura/épica con navegación intuitiva por módulos (Home, Features, Characters, Pricing, Contact) y animaciones sutiles.',
    challenge:
      'Lograr una atmósfera cinematográfica de alto impacto visual sobre arte conceptual denso sin sacrificar la legibilidad tipográfica, el contraste de los CTAs ni la velocidad de carga en navegadores móviles y de escritorio.',
    architecture: [
      'Estructura modular de 5 secciones con jerarquía visual guiada hacia conversión (Learn More / Play for Free).',
      'Transiciones suaves en CSS3 y lógica interactiva en JavaScript puro para mantener 60fps estables.',
      'Despliegue en producción sobre infraestructura HTTPS de Firebase Web Hosting.'
    ],
    stack: ['HTML5 Semántico', 'CSS3 Animations', 'JavaScript ES6+', 'UI Inmersiva', 'Firebase Hosting']
  },
  {
    id: 'cuppon-platform',
    index: '02',
    featured: false,
    title: 'Cuppon Platform',
    subtitle: 'E-Commerce UI & Catálogo Promocional Responsivo',
    category: 'bootstrap',
    categoryLabel: 'Bootstrap 5 & E-Commerce UI',
    year: '2024',
    status: 'LIVE DEMO // REPO SANDBOX',
    imageWebp: resolveAsset('/assets/img/desafio-4.webp'),
    imageFallback: resolveAsset('/assets/img/desafio-4.PNG'),
    liveUrl: resolveAsset('/assets/Routes/Ali-andrade-desafio-4/index.html'),
    canEmbedSandbox: true,
    accentColor: '#10b981',
    tagline: 'Arquitectura de grillas adaptables y tarjetas comerciales de conversión.',
    description:
      'Plataforma de ofertas y descuentos construida con HTML5, CSS3 y Bootstrap 5.3. Implementa un catálogo comercial multi-categoría (hogar, gastronomía, salud y viajes) con comparativa clara de precios originales vs. promocionales.',
    challenge:
      'Estructurar tarjetas con longitud de texto variable, metadatos de dirección física e indicadores de precio manteniendo alineación perfecta en móvil, tablet y escritorio.',
    architecture: [
      'Sistema de grillas responsivas Bootstrap 5.3 con Navbar colapsable accesible.',
      'Jerarquía tipográfica Raleway + Roboto e iconografía vectorial FontAwesome para geolocalización.',
      'Sección de captación de leads (newsletter de cupones) integrada en el flujo inferior.'
    ],
    stack: ['HTML5', 'CSS3', 'Bootstrap 5.3', 'FontAwesome', 'Responsive Grid']
  },
  {
    id: 'iguana-page',
    index: '03',
    featured: false,
    title: 'Iguana Page',
    subtitle: 'Maquetación Editorial Dark UI desde Especificación Figma',
    category: 'flexbox',
    categoryLabel: 'CSS Flexbox & Figma to Code',
    year: '2023–2024',
    status: 'LIVE DEMO // REPO SANDBOX',
    imageWebp: resolveAsset('/assets/img/desafio-3.webp'),
    imageFallback: resolveAsset('/assets/img/desafio-3.PNG'),
    liveUrl: resolveAsset('/assets/Routes/Ali-andrade-desafio-3/index.html'),
    canEmbedSandbox: true,
    accentColor: '#00f0ff',
    tagline: 'Fidelidad pixel-perfect traduciendo maquetas de diseño a código semántico.',
    description:
      'Landing page documental de estética oscura desarrollada a partir de una maqueta técnica en Figma. Demuestra el dominio de alineación espacial, distribución de bloques y contraste visual con CSS Flexbox.',
    challenge:
      'Reproducir con exactitud las proporciones, espaciados, pesos tipográficos (Raleway 200/300/500) y bloques iconográficos definidos en el sistema de diseño original.',
    architecture: [
      'Maquetación semántica por secciones (Header, Hero Banner, Sinopsis Bi-columna, Características e Iconos, Galería Triple).',
      'Distribución flexible mediante contenedores CSS Flexbox e integración de activos optimizados.'
    ],
    stack: ['HTML5 Semántico', 'CSS3 Flexbox', 'Figma Specs', 'Raleway Typography', 'Dark UI']
  },
  {
    id: 'cosset-muebles',
    index: '04',
    featured: false,
    title: 'Cosset Muebles',
    subtitle: 'Catálogo Digital de Mobiliario y Camas a Medida',
    category: 'fundamentos',
    categoryLabel: 'Landing Comercial · Sector Real',
    year: '2023',
    status: 'LIVE DEMO // REPO SANDBOX',
    imageWebp: resolveAsset('/assets/img/desafio-2.webp'),
    imageFallback: resolveAsset('/assets/img/desafio-2.PNG'),
    liveUrl: resolveAsset('/assets/Routes/Ali_andrade-desafio-2/index.html'),
    canEmbedSandbox: true,
    accentColor: '#f59e0b',
    tagline: 'Conexión directa entre el oficio real de mueblería y el catálogo web.',
    description:
      'Landing comercial inspirada en la experiencia laboral real de Ali en fabricación y acabado de muebles (Cossette Muebles). Presenta líneas de camas hechas a medida (1 plaza, 1.5 plazas y 2 plazas) con precios y enlace social.',
    challenge:
      'Organizar un catálogo claro de productos físicos con sus dimensiones, fotografías de referencia y precios de venta junto a un canal directo de atención en Instagram.',
    architecture: [
      'Hojas de estilo CSS personalizadas con identidad cálida inspirada en madera y taller.',
      'Estructura tabular de catálogo de productos con favicon e integración a redes.'
    ],
    stack: ['HTML5', 'CSS3', 'Catálogo de Productos', 'Identidad Comercial']
  },
  {
    id: 'quantum-portfolio-engine',
    index: '05',
    featured: false,
    title: 'Quantum Craft Portfolio OS',
    subtitle: 'Arquitectura React + GSAP Motion + WebGL Shader Experience',
    category: 'produccion',
    categoryLabel: 'React + GSAP + WebGL',
    year: '2024–2026',
    status: 'ACTIVE // GITHUB PAGES',
    imageWebp: resolveAsset('/src/PDF/diplomasepe1.webp'),
    imageFallback: resolveAsset('/src/PDF/diplomasepe1.png'),
    liveUrl: 'https://github.com/ali-ajelandrox/ali-ajelandrox.github.io',
    canEmbedSandbox: false,
    accentColor: '#00f0ff',
    tagline: 'El propio portafolio como demostración viva de ingeniería creativa.',
    description:
      'Aplicación interactiva construida en React, GSAP y WebGL puro (GLSL Shaders). Integra transiciones de página tipo cortina, tipografía cinética, comando global (Ctrl+K), terminal interactiva de telemetría, visor de diplomas y simulador responsivo de demos.',
    challenge:
      'Transformar un portafolio estático tradicional en una experiencia digital memorable de nivel estudio creativo manteniendo carga instantánea, accesibilidad por teclado y 0 datos inventados.',
    architecture: [
      'Motor de shaders WebGL en tiempo real reactivo a coordenadas del puntero y modo de personalidad.',
      'Coreografía GSAP con física magnética, tarjetas 3D con spotlight radial y cortina de transición entre vistas.',
      'Optimización del 93.7% en activos multimedia mediante conversión a WebP y arquitectura híbrida compatible con Vite y GitHub Pages.'
    ],
    stack: ['React 18', 'GSAP 3', 'WebGL / GLSL Shaders', 'Vite', 'Interactive Terminal']
  },
  {
    id: 'cv-html-foundation',
    index: '06',
    featured: false,
    title: 'CV Semántico Fundacional',
    subtitle: 'Primer Hito de Estructura Documental HTML5',
    category: 'fundamentos',
    categoryLabel: 'Archivo Fundacional HTML',
    year: '2023',
    status: 'ARCHIVE // REPO SANDBOX',
    imageWebp: resolveAsset('/assets/img/desafio-1.webp'),
    imageFallback: resolveAsset('/assets/img/desafio-1.png'),
    liveUrl: resolveAsset('/assets/Routes/Ali_andrade/curriculum%20vitale/index.html'),
    canEmbedSandbox: true,
    accentColor: '#94a3b8',
    tagline: 'El punto de partida que documenta la evolución técnica en el repositorio.',
    description:
      'Primer ejercicio del módulo de Introducción al Desarrollo Web en Academia Desafío Latam. Conservado en el repositorio como testimonio transparente del progreso desde el HTML puro hasta la arquitectura React + WebGL actual.',
    challenge:
      'Comprender la estructura jerárquica del DOM, listas ordenadas/desordenadas, atributos de imagen e hipervínculos relativos entre páginas.',
    architecture: [
      'Documento HTML5 nativo con vinculación a sub-tabla de portafolio inicial.'
    ],
    stack: ['HTML5 Nativo', 'Semántica Documental', 'Rutas Relativas']
  }
];

export const SKILL_CLUSTERS = [
  {
    id: 'cluster-frontend',
    code: '01 // FRONTEND_ENGINE',
    title: 'Desarrollo Web Front-End & UI',
    subtitle: 'Arquitectura de interfaces reactivas, accesibilidad y maquetación avanzada',
    accent: '#38bdf8',
    items: [
      { name: 'HTML5 Semántico & Accesible', icon: '/src/img/html5.png', level: 'Avanzado / WCAG 2.1 AA' },
      { name: 'CSS3 / CSS Grid & Flexbox', icon: '/src/img/css.png', level: 'Avanzado / Responsive' },
      { name: 'JavaScript Moderno (ES6+)', icon: '/src/img/JavaScript-logo.png', level: 'Avanzado / Asincronía' },
      { name: 'React 18 & Vite', icon: '/src/img/react.png', level: 'Certificado Desafío Latam' },
      { name: 'GSAP 3 & Animaciones UI', icon: null, level: 'ScrollTrigger & Microinteracciones' },
      { name: 'Bootstrap 5 & Tailwind CSS', icon: '/src/img/bootstrap-framework-logo-D45BDEC73C-seeklogo.com.png', level: 'Avanzado / Componentes' }
    ],
    highlights: [
      'Traducción fiel de especificaciones Figma a código modular, semántico y accesible.',
      'Coreografía de animaciones 60fps con GSAP respetando estrictamente prefers-reduced-motion.',
      'Optimización de activos web (reducción de -93.7% en payload de imágenes con WebP).'
    ]
  },
  {
    id: 'cluster-backend-cloud',
    code: '02 // CLOUD_SEC_BACKEND',
    title: 'Cloud Azure, Linux & Ciberseguridad',
    subtitle: 'Triple Certificación Oficial SEPE (Gobierno de España, 2024)',
    accent: '#818cf8',
    items: [
      { name: 'Programación Web JS & PHP', icon: null, level: 'SEPE IFCT091PO (65h Oficiales)' },
      { name: 'Cloud Computing Azure & Linux', icon: null, level: 'SEPE IFCT026PO (30h Oficiales)' },
      { name: 'Seguridad Informática en Empresa', icon: null, level: 'SEPE IFCT050PO (Certificación)' },
      { name: 'Node.js & APIs RESTful', icon: '/src/img/nodejs.png', level: 'Servicios Backend' },
      { name: 'Bases de Datos MySQL & MongoDB', icon: '/src/img/mongodb.png', level: 'Relacional & NoSQL' },
      { name: 'Git, GitHub & Flujos CI/CD', icon: '/src/img/gitbash.png', level: 'Control de Versiones' }
    ],
    highlights: [
      'Administración de máquinas virtuales y servicios en la nube con Windows Azure y Linux.',
      'Fundamentos de auditoría de seguridad, políticas de cifrado, firewall y protección de redes.',
      'Desarrollo e integración de endpoints de backend y gestión de datos transaccionales.'
    ]
  },
  {
    id: 'cluster-systems-erp',
    code: '03 // SYSTEMS_OPS_MAKER',
    title: 'Sistemas IT, Redes PRTG & ERP Defontana',
    subtitle: '+6 años de experiencia resolutiva manteniendo infraestructuras operativas',
    accent: '#c084fc',
    items: [
      { name: 'Automatización PLC Siemens', icon: null, level: 'Supervisión & Control Industrial' },
      { name: 'ERP Defontana (Gestión Integral)', icon: '/src/img/defontana.png', level: 'Inventarios & Facturación' },
      { name: 'PRTG Network Monitor', icon: '/src/img/PRTG-Network-Monitor.jpg', level: 'Supervisión de Redes LAN' },
      { name: 'Soporte Técnico de Sistemas & HW', icon: null, level: 'Nivel 1 y 2 / Diagnóstico' },
      { name: 'Micro-soldadura Electrónica', icon: null, level: 'Reparación a Nivel Placa' },
      { name: 'Carpintería Técnica & Planos', icon: null, level: 'Meticulosidad & Ensamble' },
      { name: 'Liderazgo de Almacén & Logística', icon: null, level: 'Control de Calidad' }
    ],
    highlights: [
      'Detección y contención de incidencias de red industrial en tiempo real mediante PRTG.',
      'Control de trazabilidad de stock, guías de despacho y distribución con ERP Defontana.',
      'Cultura de pulcritud y atención milimétrica al detalle adquirida en taller de manufactura técnica.'
    ]
  }
];

export const EXPERIENCE_TIMELINE = [
  {
    id: 'exp-cosentino',
    isCurrent: true,
    period: '12/2025 – Presente (Actual)',
    company: 'Cosentino Industries',
    location: 'Cantoria (Almería), España',
    role: 'Operario de Producción',
    badge: 'Automatización Industrial & PLC Siemens',
    accent: '#10b981',
    summary: 'Operación, monitorización y control de calidad en líneas de producción industrial automatizadas mediante PLC Siemens, supervisando parámetros de proceso y fórmulas de fabricación de alta precisión.',
    points: [
      'Operación, supervisión y control de maquinaria industrial mediante sistemas de automatización basados en PLC Siemens.',
      'Monitorización de procesos productivos, supervisando parámetros de funcionamiento y asegurando la continuidad y eficiencia de la producción.',
      'Control de calidad del producto, verificando especificaciones técnicas y detectando posibles desviaciones durante el proceso.',
      'Supervisión y seguimiento de fórmulas de fabricación, prestando especial atención a la precisión de las proporciones, parámetros y composición del producto.',
      'Identificación y resolución inicial de incidencias operativas, aplicando un enfoque analítico y orientado a la mejora continua.',
      'Adaptación a entornos tecnológicos e industriales, combinando conocimientos de programación, lógica computacional y pensamiento estructurado con procesos de producción automatizados.'
    ]
  },
  {
    id: 'exp-megafrio',
    period: 'Enero 2020 – Marzo 2024 (4 años 3 meses)',
    company: 'MEGA FRÍO Chile',
    location: 'Santiago, Chile',
    role: 'Jefe de Almacén & Auxiliar de Informática y Sistemas',
    badge: 'Sistemas IT + Gestión Operativa',
    accent: '#38bdf8',
    summary: 'Doble rol progresivo combinando soporte de infraestructura tecnológica y continuidad operativa de redes con posterior liderazgo de equipos de almacén y control de calidad.',
    points: [
      'Auxiliar de Informática y Redes (2020–2023): Mantenimiento integral preventivo y correctivo de hardware, estaciones de trabajo y servidores, garantizando disponibilidad 24/7 en operaciones logísticas críticas.',
      'Monitoreo activo de switches, routers y tráfico de red local con PRTG Network Monitor para detección temprana y resolución de incidencias en tiempo real.',
      'Despliegue de actualizaciones de software, configuración de políticas de acceso, inventario tecnológico y soporte técnico presencial y remoto a usuarios.',
      'Jefe de Almacén y Calidad (2023–2024): Promovido para coordinar recepción, clasificación y despacho masivo, liderando equipos en piso e implementando flujos de trazabilidad optimizados.'
    ]
  },
  {
    id: 'exp-bravo',
    period: 'Marzo 2019 – Diciembre 2019',
    company: 'Sociedad Bravo y Hermanos',
    location: 'Santiago, Chile',
    role: 'Jefe de Bodega, Control de Calidad y Especialista ERP',
    badge: 'ERP Defontana & Logística',
    accent: '#818cf8',
    summary: 'Dirección operativa de almacén de distribución de alimentos para grandes cadenas de supermercados y canal HORECA a nivel nacional.',
    points: [
      'Administración avanzada de ERP Defontana: emisión y control de guías de despacho, órdenes de compra, facturación electrónica y conciliación de stock en tiempo real.',
      'Supervisión de protocolos de control de calidad, fechas de caducidad, condiciones de almacenamiento y empaque bajo estándares de inocuidad alimentaria.',
      'Optimización de rutas de reparto logístico y coordinación con transporte para cumplimiento de entregas en plazos estrictos.'
    ]
  },
  {
    id: 'exp-mineduc',
    period: 'Septiembre 2017 – Febrero 2019',
    company: 'Ministerio de Educación',
    location: 'Caracas, Venezuela',
    role: 'Analista de Soporte Técnico y Sistemas',
    badge: 'Infraestructura & Soporte Corporativo',
    accent: '#c084fc',
    summary: 'Soporte técnico de nivel 1 y 2 en sede gubernamental, prestando servicio a cientos de usuarios y manteniendo la plataforma tecnológica operativa.',
    points: [
      'Atención y resolución de tickets de soporte técnico de hardware, sistemas operativos Windows/Linux y aplicaciones ofimáticas.',
      'Ensamblaje, clonación de imágenes de disco, mantenimiento y renovación de parque informático y periféricos.',
      'Configuración de puntos de red estructurada LAN, cableado UTP, conectividad TCP/IP e impresoras en red corporativa.'
    ]
  },
  {
    id: 'exp-cossette',
    period: '2015 – 2017',
    company: 'Cossette Muebles',
    location: 'Caracas, Venezuela',
    role: 'Especialista en Fabricación, Acabados Técnicos y Lectura de Planos',
    badge: 'Manufactura de Precisión & Oficio',
    accent: '#94a3b8',
    summary: 'Formación de oficio técnico y meticulosidad artesanal en taller de ebanistería y tapicería de mobiliario de alta gama.',
    points: [
      'Interpretación rigurosa de planos de despiece, tolerancias dimensionales milimétricas y ensamblaje de estructuras complejas.',
      'Manejo seguro de maquinaria industrial (sierras de banco, fresadoras, cepillos, pistolas neumáticas y calibradores).',
      'Aplicación de barnices, lacas de alta durabilidad y tapizado técnico, consolidando una cultura de pulcritud, paciencia y atención extrema al detalle.'
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: 'edu-4geeks-fullstack',
    period: '2026',
    title: 'Full Stack Software Developer (360 Horas)',
    institution: '4Geeks Academy Madrid · GeekTALKS Program (Florida Department of Education)',
    badge: 'Bootcamp Internacional Full-Stack',
    details: 'Programa intensivo de 360 horas de formación profesional en ingeniería de software: desarrollo web full stack moderno (React, Python/Node, APIs RESTful, bases de datos SQL y arquitectura cloud).'
  },
  {
    id: 'edu-tsu',
    period: '2014 – 2018',
    title: 'Técnico Superior Universitario en Informática',
    institution: 'Instituto Universitario de Gerencia y Tecnología (IUGT) · Caracas, Venezuela',
    badge: 'Título Universitario',
    details: 'Formación superior en desarrollo de software, lógica algorítmica, bases de datos, redes de computadores y administración de sistemas.'
  },
  {
    id: 'edu-fullstack-master',
    period: '2023 – 2024',
    title: 'Master en Webs Full Stack & Carrera Full Stack JavaScript',
    institution: 'Academia Desafío Latam & Formación Especializada',
    badge: 'Especialización Web',
    details: 'Angular, Node.js, Laravel, Symfony, APIs RESTful, HTML5, CSS3 Avanzado, JavaScript para la Web, React-Vite y MySQL.'
  },
  {
    id: 'edu-sepe',
    period: 'Septiembre – Noviembre 2024',
    title: 'Triple Certificación Oficial SEPE (España): Web JS/PHP, Cloud Azure/Linux & Ciberseguridad',
    institution: 'SEPE · Fundación Estatal · Coremsa Online · Aula Directa · Skillsoft Global Knowledge',
    badge: 'Formación Oficial España',
    details: 'Acciones formativas estatales IFCT091PO (65h), IFCT026PO (30h) e IFCT050PO en teleformación.'
  },
  {
    id: 'edu-bachiller',
    period: '2009 – 2013',
    title: 'Bachiller en Ciencias',
    institution: 'Unidad Educativa Nacional Anzoátegui · Caracas, Venezuela',
    badge: 'Educación Secundaria',
    details: 'Formación en ciencias exactas y fundamentos analíticos.'
  }
];

export const CERTIFICATES_DATA = [
  {
    id: 'cert-4geeks-fullstack',
    code: '4GEEKS-360H',
    title: 'Full Stack Software Developer',
    issuer: '4Geeks Academy Madrid · GeekTALKS Program · Florida Dept. of Education',
    issuerGroup: '4geeks',
    hours: '360 horas',
    date: '03 Agosto 2026',
    verificationId: 'Cert ID: 28562ada22a0e701b04ac28dbf2320712e0bcd87',
    verificationUrl: 'https://certificate.4geeks.com/28562ada22a0e701b04ac28dbf2320712e0bcd87',
    thumbWebp: resolveAsset('/src/PDF/diploma-4geeks-fullstack.webp'),
    fullImage: resolveAsset('/src/PDF/diploma-4geeks-fullstack.png'),
    pdfUrl: resolveAsset('/src/PDF/diploma-4geeks-fullstack.pdf'),
    topics: ['Full Stack Software Engineering', 'React & Frontend Moderno', 'APIs RESTful & Backend', 'Bases de Datos & Arquitectura', 'Metodologías Ágiles']
  },
  {
    id: 'cert-sepe-web',
    code: 'IFCT091PO',
    title: 'Programación de Páginas Web JavaScript y PHP',
    issuer: 'SEPE · Fundación Estatal / Coremsa Online',
    issuerGroup: 'sepe',
    hours: '65 horas',
    date: '30 Octubre 2024',
    verificationId: 'Exp. F220174AA · Reg. 6xijBxKOKL',
    thumbWebp: resolveAsset('/src/PDF/diplomasepe1.webp'),
    fullImage: resolveAsset('/src/PDF/diplomasepe1.png'),
    pdfUrl: resolveAsset('/src/PDF/Diploma-ALI_ALEJANDRO_ANDRADE_GODOY.pdf'),
    topics: ['Programación Cliente (JS)', 'Programación Servidor (PHP)', 'Bases de Datos']
  },
  {
    id: 'cert-sepe-cloud',
    code: 'IFCT026PO',
    title: 'Cloud Computing (Windows Azure & Linux)',
    issuer: 'SEPE · Aula Directa',
    issuerGroup: 'sepe',
    hours: '30 horas',
    date: '31 Octubre 2024',
    verificationId: 'Exp. F220468AA · Acción 006 / Grupo 003',
    thumbWebp: resolveAsset('/src/PDF/diploma_ciber-seguridad.webp'),
    fullImage: resolveAsset('/src/PDF/diploma_ciber-seguridad.png'),
    pdfUrl: resolveAsset('/src/PDF/diploma-ciber.pdf'),
    topics: ['Windows Azure Admin', 'Virtualización Cloud', 'Linux en la Nube', 'Bases de Datos Cloud']
  },
  {
    id: 'cert-sepe-cyber',
    code: 'IFCT050PO',
    title: 'Gestión de la Seguridad Informática en la Empresa',
    issuer: 'SEPE · Skillsoft Global Knowledge Spain',
    issuerGroup: 'sepe',
    hours: 'Certificación Oficial',
    date: '07 Noviembre 2024',
    verificationId: 'Exp. F220582AA-476/21 · Cód. 1033059',
    thumbWebp: resolveAsset('/src/PDF/Globas-cs.webp'),
    fullImage: resolveAsset('/src/PDF/Globas-cs.png'),
    pdfUrl: resolveAsset('/src/PDF/diploma,cs.pdf'),
    topics: ['Auditoría y Normativa', 'Exploración de Redes', 'Criptografía', 'Autenticación']
  },
  {
    id: 'cert-dl-js',
    code: 'N° 28921',
    title: 'JavaScript para la Web',
    issuer: 'Academia Desafío Latam',
    issuerGroup: 'desafio-latam',
    hours: '60 horas',
    date: '22 Abril 2024',
    verificationId: 'Certificado N° 28921 (QR Verificable)',
    thumbWebp: resolveAsset('/src/PDF/js.webp'),
    fullImage: resolveAsset('/src/PDF/js.png'),
    pdfUrl: resolveAsset('/src/PDF/js.png'),
    topics: ['DOM & Eventos', 'ES6+ & Arrays', 'Asincronía & APIs', 'Lógica Funcional']
  },
  {
    id: 'cert-dl-react',
    code: 'N° 29706',
    title: 'React I — Interfaces SPA & Componentes',
    issuer: 'Academia Desafío Latam',
    issuerGroup: 'desafio-latam',
    hours: '40 horas',
    date: '06 Marzo 2024',
    verificationId: 'Certificado N° 29706 (QR Verificable)',
    thumbWebp: resolveAsset('/src/PDF/react.webp'),
    fullImage: resolveAsset('/src/PDF/react.png'),
    pdfUrl: resolveAsset('/src/PDF/react.png'),
    topics: ['Componentes & JSX', 'Estado & Hooks', 'Props & Eventos', 'Renderizado Dinámico']
  },
  {
    id: 'cert-dl-css',
    code: 'N° 27384',
    title: 'CSS Avanzado — Layouts & Animación',
    issuer: 'Academia Desafío Latam',
    issuerGroup: 'desafio-latam',
    hours: '40 horas',
    date: '01 Febrero 2024',
    verificationId: 'Certificado N° 27384 (QR Verificable)',
    thumbWebp: resolveAsset('/src/PDF/css.webp'),
    fullImage: resolveAsset('/src/PDF/css.png'),
    pdfUrl: resolveAsset('/src/PDF/css.png'),
    topics: ['CSS Grid', 'Flexbox Avanzado', 'Media Queries', 'Transiciones & Keyframes']
  },
  {
    id: 'cert-dl-intro',
    code: 'N° 26488',
    title: 'Introducción al Desarrollo Web',
    issuer: 'Academia Desafío Latam',
    issuerGroup: 'desafio-latam',
    hours: '14 horas',
    date: '30 Octubre 2023',
    verificationId: 'Certificado N° 26488 (QR Verificable)',
    thumbWebp: resolveAsset('/src/PDF/iweb.webp'),
    fullImage: resolveAsset('/src/PDF/iweb.png'),
    pdfUrl: resolveAsset('/src/PDF/iweb.png'),
    topics: ['HTML5 Semántico', 'CSS3 Base', 'Bootstrap', 'Git & GitHub']
  }
];

export const COMPLEMENTARY_CRAFT = [
  {
    id: 'craft-linux',
    icon: '🐧',
    iconType: 'linux',
    accentColor: '#FCC624',
    title: 'Sistemas Operativos Linux & Servidores',
    desc: 'Administración, comandos CLI, particionamiento, servicios SSH/Web y manipulación de entornos Linux tanto en servidores locales como en nube Azure (IFCT026PO).'
  },
  {
    id: 'craft-electronics',
    icon: '🔧',
    iconType: 'soldering',
    accentColor: '#F59E0B',
    title: 'Micro-soldadura & Diagnóstico Electrónico',
    desc: 'Diagnóstico a nivel de placa base, soldadura de precisión SMD, reemplazo de componentes electrónicos y reparación de hardware con instrumental técnico.'
  },
  {
    id: 'craft-woodwork',
    icon: '🪑',
    iconType: 'carpentry',
    accentColor: '#D97706',
    title: 'Carpintería Técnica, Lectura de Planos & Ensambles',
    desc: 'Lectura de planos técnicos milimétricos, corte con maquinaria de precisión, ensamble de estructuras complejas y acabados de alta durabilidad.'
  },
  {
    id: 'craft-pressure',
    icon: '⚡',
    iconType: 'logistics',
    accentColor: '#38BDF8',
    title: 'Gestión Operativa Bajo Presión & Liderazgo',
    desc: 'Capacidad demostrada para resolver incidentes en tiempo real, priorizar tareas críticas y mantener la compostura y calidad en entornos de alta exigencia.'
  }
];

export const ATS_PLAINTEXT_CV = `ALI ALEJANDRO ANDRADE GODOY
TSU en Informática | Desarrollador Web Front-End & Full-Stack | Sistemas IT & Cloud
España | Tel: +34 642 83 47 42 | Email: Andradegali1503@gmail.com / Ajelandrox15@gmail.com
LinkedIn: linkedin.com/in/alejandro-andrade-1a38a7331 | GitHub: github.com/ali-ajelandrox

================================================================================
PERFIL PROFESIONAL
================================================================================
Técnico Superior Universitario en Informática con formación universitaria reglada y triple certificación oficial emitida por el SEPE (Gobierno de España) en Desarrollo Web Cliente/Servidor (JavaScript + PHP), Cloud Computing (Azure + Linux) y Ciberseguridad Empresarial. Más de 6 años de experiencia resolutiva en soporte técnico corporativo, administración de redes industriales con telemetría PRTG, gestión logística con ERP Defontana y desarrollo de aplicaciones web con React, JavaScript (ES6+), CSS3/SASS, Node.js y APIs RESTful.

================================================================================
HABILIDADES TÉCNICAS Y HERRAMIENTAS
================================================================================
* Desarrollo Web: HTML5 Semántico, CSS3, JavaScript (ES6+), React 18, Angular, Node.js, PHP, Bootstrap 5, Tailwind CSS, REST APIs, JSON.
* Cloud, Infraestructura y Redes: Windows Azure Cloud, Linux Administration, PRTG Network Monitor, Cableado estructurado LAN, TCP/IP, DNS, DHCP.
* Seguridad y Sistemas: Ciberseguridad Empresarial (SEPE), Auditoría de Sistemas, Criptografía, Firewalls, ERP Defontana (Inventario/Facturación).
* Herramientas y Oficio: Git, GitHub, VS Code, Figma, Micro-soldadura electrónica SMD, Lectura de planos técnicos.

================================================================================
EXPERIENCIA PROFESIONAL
================================================================================
Cosentino Industries | Cantoria (Almería), España
Operario de Producción | 12/2025 – Presente (Actual / Principal)
- Operación, supervisión y control de maquinaria industrial mediante sistemas de automatización basados en PLC Siemens.
- Monitorización de procesos productivos, supervisando parámetros de funcionamiento y asegurando la continuidad y eficiencia de la producción.
- Control de calidad del producto, verificando especificaciones técnicas y detectando posibles desviaciones durante el proceso.
- Supervisión y seguimiento de fórmulas de fabricación, prestando especial atención a la precisión de las proporciones, parámetros y composición del producto.
- Identificación y resolución inicial de incidencias operativas, aplicando un enfoque analítico y orientado a la mejora continua.
- Adaptación a entornos tecnológicos e industriales, combinando conocimientos de programación, lógica computacional y pensamiento estructurado con procesos de producción automatizados.

MEGA FRÍO Chile | Santiago, Chile
Jefe de Almacén y Control de Calidad | Diciembre 2023 – Marzo 2024
Auxiliar de Informática y Redes | Enero 2020 – Noviembre 2023 (Total: 4 años 3 meses)
- Mantenimiento preventivo y correctivo de hardware, servidores y estaciones de trabajo, asegurando disponibilidad 24/7 en operaciones logísticas críticas.
- Monitoreo continuo de switches, routers y tráfico de red local con PRTG Network Monitor, reduciendo tiempos de caída y detectando alertas en tiempo real.
- Despliegue de actualizaciones de software, políticas de acceso y soporte técnico de nivel 1 y 2 presencial y remoto.
- Promovido a Jefe de Almacén para liderar la recepción, almacenamiento y despacho masivo, optimizando procesos de inventario y trazabilidad.

Sociedad Bravo y Hermanos | Santiago, Chile
Jefe de Bodega, Control de Calidad y Especialista ERP | Marzo 2019 – Diciembre 2019
- Dirección operativa de almacén de distribución alimentaria a grandes cadenas de supermercados a nivel nacional.
- Uso avanzado del ERP Defontana para gestión de inventarios, órdenes de compra, guías de despacho y facturación electrónica.
- Optimización de rutas de reparto logístico y supervisión de estándares de control de calidad.

Ministerio de Educación | Caracas, Venezuela
Analista de Soporte Técnico y Sistemas | Septiembre 2017 – Febrero 2019
- Soporte técnico presencial y remoto a usuarios corporativos, diagnóstico de hardware y software Windows/Linux.
- Ensamblaje, mantenimiento, clonación de imágenes de disco y renovación de parque tecnológico.
- Configuración de puntos de red local LAN, cableado estructurado UTP e impresoras compartidas en red corporativa.

Cossette Muebles | Caracas, Venezuela
Especialista en Fabricación, Acabados Técnicos y Lectura de Planos | 2015 – 2017
- Interpretación rigurosa de planos técnicos y ensamblaje de estructuras complejas con tolerancias milimétricas.
- Operación segura de maquinaria industrial (sierras, fresadoras, cepillos) y acabados de alta durabilidad.

================================================================================
EDUCACIÓN REGLADA
================================================================================
* Técnico Superior Universitario en Informática (2014 – 2018)
  Instituto Universitario de Gerencia y Tecnología (IUGT) · Caracas, Venezuela.
* Bachiller en Ciencias (2009 – 2013)
  Unidad Educativa Nacional Anzoátegui · Caracas, Venezuela.

================================================================================
CERTIFICACIONES OFICIALES Y FORMACIÓN CONTINUA
================================================================================
* Full Stack Software Developer (360h) | 4Geeks Academy Madrid · GeekTALKS Program (2026)
  Florida Department of Education (fldoe.org) · ID: 28562ada22a0e701b04ac28dbf2320712e0bcd87
  Verificación Oficial: https://certificate.4geeks.com/28562ada22a0e701b04ac28dbf2320712e0bcd87
* IFCT091PO: Programación de Páginas Web JavaScript y PHP (65h) | SEPE España (2024)
  Expediente F220174AA · Registro Oficial 6xijBxKOKL.
* IFCT026PO: Cloud Computing: Windows Azure y Linux (30h) | SEPE España (2024)
  Expediente F220468AA.
* IFCT050PO: Gestión de la Seguridad Informática en la Empresa | SEPE España (2024)
  Expediente F220582AA-476/21 · Código 1033059.
* Carrera Full Stack JavaScript (154h) | Academia Desafío Latam (2023–2024)
  - React I (40h) · Certificado N° 29706.
  - JavaScript para la Web (60h) · Certificado N° 28921.
  - CSS Avanzado (40h) · Certificado N° 27384.
  - Introducción al Desarrollo Web (14h) · Certificado N° 26488.
`;
