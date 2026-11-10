# Dirección de Arte y Sistema de Diseño (`creative-direction`)

## 1. Exploración de Territorios Creativos

Para reemplazar la estética fragmentada actual (gradiente cian/magenta en inicio, azul Bootstrap en proyectos, azul celeste con bordes rojos en CV), evaluamos tres territorios visuales fundamentados en la identidad real de Ali Alejandro Andrade:

### Territorio A — *Precision Systems & Craft* (Ingeniería de Interfaces y Sistemas) — **SELECCIONADO**
- **Concepto:** Inspirado en la intersección real del perfil de Ali: **desarrollo Front-End moderno + administración de sistemas/redes (Linux, Azure, PRTG) + precisión artesanal**. Combina superficies oscuras de pizarra técnica (`#0B0F17` / `#111827`), una retícula arquitectónica sutil, tipografía geométrica contundente (*Space Grotesk*), cuerpo de lectura ultra legible (*Plus Jakarta Sans*) y detalles técnicos en monoespaciada (*JetBrains Mono*), con acentos en **Cian Eléctrico (`#38BDF8`)** y **Ámbar Cálido (`#F59E0B`)** que evocan tanto terminales de monitoreo de red como calidez humana.
- **Por qué encaja mejor:** Unifica su faceta de desarrollador web con su solidez en infraestructura IT y operaciones, proyecta madurez técnica inmediata ante reclutadores y ofrece un marco de alto contraste donde las capturas de sus proyectos (*Sombra de Valoria*, *Cuppon*, *Iguana Page*) y sus diplomas destacan con máxima nitidez.

### Territorio B — *Editorial Brutalist Light* (Papel Técnico y Tinta)
- **Concepto:** Fondo crema cálido tipo papel de plano técnico con bordes negros marcados y acentos naranja industrial.
- **Por qué se descarta como principal:** Aunque atractivo para estudios de diseño gráfico, resta impacto visual a proyectos con estética oscura como *Sombra de Valoria* e *Iguana Page*. (No obstante, adoptaremos una variante clara de alto contraste para el modo de impresión `@media print` del CV).

### Territorio C — *Cyber Fantasy Neon*
- **Concepto:** Estética inspirada exclusivamente en videojuegos RPG y luces de neón.
- **Por qué se descarta:** Restaría seriedad a su perfil institucional y corporativo (certificaciones SEPE de Ciberseguridad/Cloud y experiencia en sistemas/ERP).

---

## 2. Especificación de Tokens del Sistema de Diseño (`:root`)

Todos los estilos del portafolio se centralizarán mediante variables CSS nativas para garantizar coherencia absoluta entre `index.html`, `src/routes/cv.html`, `src/routes/proyects.html` y `src/routes/qr.html`.

### A. Paleta de Colores y Contraste (WCAG 2.1 AA / AAA)

| Token CSS | Valor Hex / RGBA | Uso Semántico | Ratio de Contraste |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#090D16` | Fondo base principal (Obsidiana técnica) | Base |
| `--bg-surface` | `#111827` | Superficie de tarjetas y contenedores primarios | Elevación 1 |
| `--bg-surface-elevated` | `#1E293B` | Tarjetas en hover, cabeceras de tabla, badges y modales | Elevación 2 |
| `--bg-glass` | `rgba(17, 24, 39, 0.82)` | Barra de navegación superior con `backdrop-filter: blur(12px)` | Superficie translúcida |
| `--text-primary` | `#F8FAFC` | Titulares y texto principal | **18.1 : 1** sobre `--bg-canvas` (AAA) |
| `--text-secondary` | `#CBD5E1` | Párrafos descriptivos y narrativa de casos de estudio | **12.8 : 1** sobre `--bg-canvas` (AAA) |
| `--text-muted` | `#94A3B8` | Metadatos, fechas, etiquetas secundarias | **6.7 : 1** sobre `--bg-canvas` (AA) |
| `--accent-primary` | `#38BDF8` | Acento principal (Cian Técnico: enlaces, foco, badges activos) | **9.6 : 1** sobre `--bg-canvas` (AAA) |
| `--accent-secondary` | `#F59E0B` | Acento secundario (Ámbar Precisión: hitos, certificados, destacados) | **9.2 : 1** sobre `--bg-canvas` (AAA) |
| `--accent-emerald` | `#10B981` | Indicador de disponibilidad activa y estados de éxito | **8.1 : 1** sobre `--bg-canvas` (AAA) |
| `--border-subtle` | `rgba(148, 163, 184, 0.16)` | Bordes de retícula y tarjetas en reposo (`1px solid`) | Estructural |
| `--border-highlight` | `rgba(56, 189, 248, 0.45)` | Borde activo en `:hover` y `:focus-visible` | Interactivo |

### B. Sistema Tipográfico y Escala Fluida

- **`--font-display`:** `'Space Grotesk', system-ui, -apple-system, sans-serif` — Titulares (`h1`, `h2`, `h3`), métricas y navegación. Carácter técnico, geométrico y contemporáneo.
- **`--font-sans`:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` — Cuerpo de lectura, descripciones de proyectos y experiencia laboral.
- **`--font-mono`:** `'JetBrains Mono', 'Fira Code', monospace` — Etiquetas de código, códigos de diplomas SEPE (`IFCT091PO`), fechas y badges tecnológicos.

#### Escala Tipográfica Responsiva (`clamp()`)
- `--text-hero`: `clamp(2.25rem, 4.5vw + 1rem, 4rem)` (`line-height: 1.08`, `letter-spacing: -0.03em`)
- `--text-h1`: `clamp(1.85rem, 3vw + 0.8rem, 2.75rem)` (`line-height: 1.15`, `letter-spacing: -0.02em`)
- `--text-h2`: `clamp(1.45rem, 2vw + 0.6rem, 2rem)` (`line-height: 1.2`)
- `--text-h3`: `clamp(1.15rem, 1.2vw + 0.5rem, 1.35rem)` (`line-height: 1.3`)
- `--text-body-lg`: `clamp(1.05rem, 0.5vw + 0.9rem, 1.2rem)` (`line-height: 1.65`)
- `--text-body`: `1rem` (`16px`, `line-height: 1.65`, ancho de lectura óptimo `60ch–72ch`)
- `--text-sm`: `0.875rem` (`14px`, `line-height: 1.5`)
- `--text-xs`: `0.75rem` (`12px`, `letter-spacing: 0.04em`)

### C. Espaciado, Retícula, Bordes y Sombras

- **Contenedor máximo (`--container-max`):** `1200px` con padding lateral fluido `clamp(1.25rem, 4vw, 2.5rem)`.
- **Espaciado de secciones (`--section-py`):** `clamp(3.5rem, 7vw, 6rem)`.
- **Radios de borde:**
  - `--radius-sm`: `8px` (botones, badges, inputs)
  - `--radius-md`: `14px` (tarjetas de proyectos, experiencia y certificados)
  - `--radius-lg`: `22px` (contenedor de caso de estudio destacado y visor modal)
  - `--radius-full`: `9999px` (píldoras de estado y avatares)
- **Sombras y profundidad:**
  - `--shadow-card`: `0 12px 32px -8px rgba(2, 6, 23, 0.55)`
  - `--shadow-glow`: `0 0 0 1px rgba(56, 189, 248, 0.3), 0 16px 40px -10px rgba(56, 189, 248, 0.18)`

---

## 3. Tratamiento Visual de Imágenes y Componentes

1. **Retrato de Perfil:**
   - Utilizaremos la fotografía auténtica de Ali (`assets/img/ali_perfil.jpeg`) como imagen principal de identidad profesional, con encuadre limpio (`object-fit: cover`), borde técnico sutil e indicador de estado activo, permitiendo además alternar o mostrar su ilustración creativa (`src/img/ali.png`) como detalle de personalidad geek/gamer en la tarjeta interactiva si el usuario pasa el cursor o pulsa sobre el avatar.
2. **Tarjetas de Proyectos (*Browser Frame Mockup*):**
   - Cada captura de proyecto (`proyecto1.png`, `desafio-4.PNG`, `desafio-3.PNG`, `desafio-2.PNG`) se presenta dentro de un marco superior estilo ventana de navegador minimalista (con tres puntos sutiles y la URL/ruta del proyecto en fuente monoespaciada) y relación de aspecto consistente `16 / 10` con `object-fit: cover` y `object-position: top center`.
3. **Tarjetas de Certificados Oficiales:**
   - Cada diploma muestra una miniatura con `aspect-ratio: 4 / 3`, insignia de la entidad emisora (**SEPE España** en ámbar / **Desafío Latam** en cian), horas certificadas, código de verificación y botón explícito de inspección a pantalla completa.
