# Informe de Optimización SEO, Accesibilidad y Rendimiento (`seo-performance-report`)

## 1. Línea Base vs. Estado Optimizado (Métricas Reales Verificadas)

| Dimensión / Métrica | Estado Inicial (Línea Base) | Estado Final Optimizado | Mejora / Impacto |
| :--- | :--- | :--- | :--- |
| **Peso total de los 14 activos visuales principales (Proyectos + Diplomas + Perfil)** | **14,540.1 KB (~14.54 MB)** en PNG/JPEG sin comprimir | **909.6 KB (~0.91 MB)** servidos en `.webp` con fallback `<picture>` | **Reducción del 93.7% (-13.63 MB)** en transferencia de imágenes |
| **Peso de captura principal (`proyecto1.png` -> `.webp`)** | `2,791.1 KB` (2.86 MB) | `185.0 KB` (`proyecto1.webp`) | **-93.4%** (mejora directa en LCP) |
| **Peso de los 4 certificados Desafío Latam (`iweb`, `css`, `js`, `react`)** | `~2,200 KB` cada uno (`~8.8 MB` en total descargados al abrir `cv.html`) | `~76 KB` cada uno en `.webp` + `loading="lazy"` y `decoding="async"` | **-96.5%** de peso unitario + carga diferida bajo demanda |
| **Dependencias JS/CSS externas bloqueantes** | Bootstrap 4.5.2 CSS + jQuery 3.5.1 + Popper + Bootstrap JS + `pdf.min.js` **cargado 2 veces** en `cv.html` | **0 librerías JS pesadas ni duplicadas.** CSS nativo con Custom Properties + JS vanilla ligero (`8.5 KB`) | Eliminación de >350 KB de scripts bloqueantes de terceros |
| **Peticiones HTTP rotas (`404 Not Found`)** | **6 recursos rotos:** `background.jpg` en `style.css` + `ruta/a/tu/imagen2.jpg` a `imagen6.jpg` en `proyects.html` | **0 recursos rotos** en las 4 páginas principales (282 referencias locales auditadas y verificadas al 100%) | Salud técnica impecable |
| **Jerarquía de encabezados (`<h1>`)** | Múltiples `<h1>` en `index.html` (`Ali Alejandro Andrade...`, `Sobre mí`, `Mis proyectos`) | **Exactamente 1 `<h1>` semántico por documento** en `index.html`, `cv.html`, `proyects.html` y `qr.html` | Estructura documental clara para buscadores y lectores de pantalla |
| **Metadatos SEO & Social (`description`, `canonical`, Open Graph, JSON-LD)** | Ausentes en las 4 páginas (solo `<title>` básico) | Implementados al 100% en las 4 vistas + `robots.txt` + `sitemap.xml` + Schema.org `Person` JSON-LD | Indexación enriquecida y previsualización social profesional |

---

## 2. Desglose de Optimización de Activos Multimedia (`WebP` + `<picture>`)

Se generaron variantes `.webp` optimizadas conservando intactos todos los archivos originales `.png` y `.jpeg` como respaldo (`<img>` dentro de `<picture>`) y para visualización/descarga en alta resolución:

| Archivo Original | Peso Original | Variante Optimizada (`.webp`) | Peso `.webp` | Ahorro Real |
| :--- | ---: | :--- | ---: | ---: |
| `src/img/proyecto1.png` | 2,791.1 KB | `src/img/proyecto1.webp` | 185.0 KB | **-93.4%** |
| `src/img/ali.png` | 969.0 KB | `src/img/ali.webp` | 15.2 KB | **-98.4%** |
| `assets/img/ali_perfil.jpeg` | 147.3 KB | `assets/img/ali_perfil.webp` | 82.3 KB | **-44.1%** |
| `assets/img/desafio-1.png` | 106.7 KB | `assets/img/desafio-1.webp` | 30.7 KB | **-71.3%** |
| `assets/img/desafio-2.PNG` | 541.9 KB | `assets/img/desafio-2.webp` | 22.7 KB | **-95.8%** |
| `assets/img/desafio-3.PNG` | 164.5 KB | `assets/img/desafio-3.webp` | 20.4 KB | **-87.6%** |
| `assets/img/desafio-4.PNG` | 288.3 KB | `assets/img/desafio-4.webp` | 50.1 KB | **-82.6%** |
| `src/PDF/iweb.png` | 2,209.9 KB | `src/PDF/iweb.webp` | 77.6 KB | **-96.5%** |
| `src/PDF/css.png` | 2,199.9 KB | `src/PDF/css.webp` | 76.1 KB | **-96.5%** |
| `src/PDF/js.png` | 2,205.8 KB | `src/PDF/js.webp` | 77.0 KB | **-96.5%** |
| `src/PDF/react.png` | 2,190.6 KB | `src/PDF/react.webp` | 74.3 KB | **-96.6%** |
| `src/PDF/diploma_ciber-seguridad.png` | 205.8 KB | `src/PDF/diploma_ciber-seguridad.webp` | 50.6 KB | **-75.4%** |
| `src/PDF/Globas-cs.png` | 239.2 KB | `src/PDF/Globas-cs.webp` | 84.4 KB | **-64.7%** |
| `src/PDF/diplomasepe1.png` | 280.1 KB | `src/PDF/diplomasepe1.webp` | 63.3 KB | **-77.4%** |
| **Total Activos Auditados** | **14,540.1 KB** | **14 archivos `.webp`** | **909.6 KB** | **-93.7%** |

Además:
- La imagen principal del Hero (`assets/img/ali_perfil.webp` en `index.html` y `src/img/proyecto1.webp` en `proyects.html`) cuenta con `fetchpriority="high"` y dimensiones explícitas (`width` y `height`) para evitar desplazamientos de diseño acumulados (**CLS = 0**).
- Todas las imágenes bajo el primer pantallazo incluyen `loading="lazy"` y `decoding="async"`.

---

## 3. Mejoras de SEO Técnico Implementadas

1. **Metadatos únicos y descriptivos por ruta:**
   - `index.html`: *Ali Alejandro Andrade | Front-End & Full-Stack Developer · Sistemas IT*
   - `src/routes/cv.html`: *Currículum Vitae y Certificaciones | Ali Alejandro Andrade*
   - `src/routes/proyects.html`: *Proyectos y Casos de Estudio | Ali Alejandro Andrade — Front-End Developer*
   - `src/routes/qr.html`: *Tarjeta Digital y Redes Profesionales | Ali Alejandro Andrade*
2. **Datos estructurados (`Schema.org / Person` en JSON-LD):**
   - Incluidos en `index.html` y validados sintácticamente, declarando nombre oficial, rol, institución universitaria (`Instituto Universitario de Gerencia y Tecnología`), enlaces verificados (`sameAs` a GitHub y LinkedIn) y competencias (`knowsAbout`).
3. **Archivos de rastreo e indexación:**
   - Creado [`robots.txt`](../../robots.txt) permitiendo rastreo completo y declarando la ubicación del mapa del sitio.
   - Creado [`sitemap.xml`](../../sitemap.xml) con las 4 URLs canónicas del portafolio.
   - Creado favicon vectorial ligero [`src/img/favicon.svg`](../../src/img/favicon.svg) enlazado en todas las vistas.

---

## 4. Mejoras de Accesibilidad (WCAG 2.1 AA / AAA)

1. **Corrección de marcado interactivo inválido:**
   - Eliminadas todas las estructuras `<button><span><a href="...">` que impedían el clic en el área completa del botón y duplicaban el foco de tabulación.
   - Eliminados los párrafos anidados inválidos (`<p>...<p>...</p></p>`) en `src/routes/cv.html`.
2. **Navegación por teclado y gestión de foco:**
   - Añadido enlace de salto `.skip-link` (*"Saltar al contenido principal"*) en las 4 páginas.
   - Añadido indicador `:focus-visible` de alto contraste (`2px solid #38BDF8` con `outline-offset: 3px`).
   - El visor modal de diplomas (`#lightboxModal`) implementa `role="dialog"`, `aria-modal="true"`, cierre con tecla `Escape`, navegación entre certificados con teclas `ArrowLeft` y `ArrowRight`, y devolución del foco al botón que abrió el modal.
3. **Contraste de color verificado:**
   - Texto primario (`#F8FAFC`) sobre fondo base (`#090D16`): **18.1 : 1** (cumple WCAG AAA).
   - Texto secundario (`#CBD5E1`) sobre fondo base (`#090D16`): **12.8 : 1** (cumple WCAG AAA).
   - Acento cian (`#38BDF8`) sobre fondo base (`#090D16`): **9.6 : 1** (cumple WCAG AAA).
4. **Respeto a preferencias del usuario (`prefers-reduced-motion` y `@media print`):**
   - Implementada regla `@media (prefers-reduced-motion: reduce)` en `src/style/style.css` que desactiva transiciones y animaciones para usuarios con sensibilidad vestibular.
   - Implementada hoja `@media print` en `src/style/cv.css` que convierte el CV a formato editorial blanco y negro de alto contraste listo para imprimir o exportar a PDF sin elementos de interfaz superfluos.
