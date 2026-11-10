# Auditoría Integral del Portafolio (`portfolio-audit`)

## 1. Resumen Ejecutivo y Scorecard Inicial

El proyecto actual (`ali-ajelandrox.github.io`) es un sitio estático multi-página en HTML5, CSS3 y JavaScript vanilla compuesto por cuatro vistas principales (`index.html`, `src/routes/cv.html`, `src/routes/proyects.html`, `src/routes/qr.html`) más cuatro sub-proyectos de práctica alojados en `assets/Routes/`.

Aunque el repositorio contiene **material real muy valioso** (experiencia laboral verificable en informática/sistemas y operaciones, 7 diplomas oficiales de Desafío Latam y SEPE en alta resolución, una web app desplegada en Firebase `sombra-de-valoria.web.app` y 4 desafíos funcionales en `assets/Routes/`), la implementación actual presenta **defectos críticos de credibilidad, enlaces e imágenes rotas, inconsistencia visual severa entre páginas, errores de HTML semántico/accesibilidad y activos sin optimizar (~17.8 MB en `src/PDF/` y `src/img/`)**.

### Scorecard de Diagnóstico (Escala 1–10)

| Categoría Evaluada | Puntuación Inicial | Estado | Resumen de Evidencia |
| :--- | :---: | :---: | :--- |
| **Primera Impresión y Posicionamiento** | **3.5 / 10** | Crítico | Fondo `linear-gradient(to right, #89fffd, #ef32d9)` estridente, iconos flotando sobre el texto y bienvenida genérica de 4 párrafos sin propuesta de valor concreta. |
| **Arquitectura de Información y Navegación** | **3.0 / 10** | Crítico | No existe `<nav>` global; `cv.html` y `proyects.html` son callejones sin salida (no tienen botón ni enlace para volver a `index.html`). |
| **Presentación de Proyectos (Case Studies)** | **2.5 / 10** | Crítico | `proyects.html` muestra 1 proyecto real y **5 tarjetas falsas/vacías ("Proyecto 2"–"Proyecto 6") con imágenes rotas** (`ruta/a/tu/imagen2.jpg`), mientras oculta 4 proyectos reales existentes en `assets/Routes/`. |
| **Consistencia Visual y Sistema de Diseño** | **2.5 / 10** | Crítico | Las 4 páginas parecen sitios web distintos: gradiente neón en `index.html`, azul claro con líneas rojas en `cv.html`, azul Bootstrap primario en `proyects.html` y gris plano en `qr.html`. |
| **Contenido y Copywriting** | **4.5 / 10** | Medio-Bajo | El CV tiene datos reales valiosos, pero el copy de inicio es genérico, hay errores ortográficos (`proyects`, `watsapp`, `Curriculum Vitale`, `ejecuccíón`) y emails inconsistentes (`Andradegali1503@gmail.com` vs `Ajelandrox15@gmail.com`). |
| **Comportamiento Responsivo (Móvil/Desktop)** | **4.0 / 10** | Alto | `.typewriter h2` usa `font-size: 3.5vw` con `white-space: nowrap`, volviéndose ilegible en móvil (~11px) o cortándose; `.aside` fijo en `cv.html` y `proyects.html` se superpone al contenido en pantallas estrechas. |
| **Accesibilidad (WCAG 2.1 AA)** | **3.5 / 10** | Crítico | Anidamiento inválido `<button><span><a href="...">`, modales sin `role="dialog"` ni soporte de tecla `Escape`, múltiples `<h1>` por página, sin `:focus-visible` ni `@media (prefers-reduced-motion)`. |
| **SEO Técnico y Descubribilidad** | **3.0 / 10** | Alto | Sin `<meta name="description">`, sin Open Graph (`og:title`, `og:image`), sin `canonical`, sin favicon en las páginas principales, sin datos estructurados JSON-LD. |
| **Rendimiento y Activos Multimedia** | **4.0 / 10** | Alto | `proyecto1.png` pesa **2.86 MB**, los 4 certificados PNG de Desafío Latam pesan **~2.25 MB cada uno** (~9 MB en total), `ali.png` pesa **992 KB** para mostrarse a `150x150px`, sin `loading="lazy"`. |
| **Mantenibilidad del Código** | **4.5 / 10** | Medio | CSS fragmentado sin variables (`:root`), librerías externas antiguas (Bootstrap 4.5.2 + jQuery en `cv.html`), `pdf.min.js` cargado dos veces en `cv.html`, rutas absolutas `/src/...` mezcladas con relativas `./src/...`. |
| **Promedio Global Inicial** | **3.5 / 10** | **Requiere Transformación** | Base factual rica pero penalizada por ejecución fragmentada y placeholders sin terminar. |

---

## 2. Hallazgos Priorizados (Defectos Objetivos vs. Oportunidades de Diseño)

### A. Defectos Objetivos (Errores Técnicos, Rotos, Semánticos y de Accesibilidad)

#### [CRÍTICO-01] 5 tarjetas de proyectos con imágenes rotas (`404`), enlaces muertos (`href="#"`) y enlace duplicado en `src/routes/proyects.html`
- **Evidencia / Ubicación:** `src/routes/proyects.html` (líneas 31–86) y `README.md` (línea 3: *"en los siguientes commit se añadiran los proyectos al los links"*).
- **Detalle:**
  - Los proyectos 2, 3, 4, 5 y 6 apuntan a imágenes inexistentes: `src="ruta/a/tu/imagen2.jpg"` hasta `imagen6.jpg`.
  - Los títulos dicen literalmente `"Proyecto 2"` a `"Proyecto 6"` y el texto dice `"Descripción breve del proyecto. Incluye tecnologías utilizadas, objetivos y logros alcanzados."`
  - El Proyecto 1 tiene una clase inválida `class="https://sombra-de-valoria.web.app/"` (línea 26), y el Proyecto 5 repite el enlace `https://sombra-de-valoria.web.app/` (línea 72) mientras los demás tienen `href="#"`.
- **Impacto en el usuario:** Destruye inmediatamente la confianza de cualquier reclutador o cliente al mostrar imágenes rotas y plantillas sin rellenar.
- **Solución recomendada:** Eliminar todos los placeholders falsos. Promover **Sombra de Valoria** como caso de estudio principal e incorporar los **4 proyectos reales que ya existen dentro del repositorio** (`assets/Routes/Ali-andrade-desafio-4/index.html` [Cuppon], `assets/Routes/Ali-andrade-desafio-3/index.html` [Iguana Page], `assets/Routes/Ali_andrade-desafio-2/index.html` [Cosset Muebles], y el propio ecosistema del portafolio/CV), usando sus capturas reales (`src/img/proyecto1.png`, `assets/img/desafio-4.PNG`, `assets/img/desafio-3.PNG`, `assets/img/desafio-2.PNG`).
- **Esfuerzo:** Medio.

#### [CRÍTICO-02] Callejones sin salida en la navegación (`cv.html` y `proyects.html` no permiten regresar al inicio ni navegar entre sí)
- **Evidencia / Ubicación:** `src/routes/cv.html` (líneas 12–333) y `src/routes/proyects.html` (líneas 10–105).
- **Detalle:** Ninguna de las dos páginas incluye una barra de navegación ni un enlace de retorno a `index.html` o hacia la otra sección. El usuario queda atrapado y depende del botón "Atrás" del navegador.
- **Impacto en el usuario:** Frustración severa en la experiencia de usuario y pérdida de flujo entre la presentación, el CV y los proyectos.
- **Solución recomendada:** Implementar un header/navegación global consistente y accesible en todas las páginas (`index.html`, `src/routes/cv.html`, `src/routes/proyects.html`, `src/routes/qr.html`), además de integrar una experiencia completa y fluida en la página principal.
- **Esfuerzo:** Medio.

#### [CRÍTICO-03] HTML interactivo inválido: enlaces `<a>` anidados dentro de `<button>` en `index.html`
- **Evidencia / Ubicación:** `index.html` (líneas 84–90 y 100–106).
- **Detalle:** Se utiliza `<button><span><a href="./src/routes/cv.html">Ver mi CV</a></span><svg>...</svg></button>`. Según la especificación HTML5, un elemento `<button>` no puede contener elementos interactivos descendientes como `<a>`. Además, si el usuario hace clic en el área de padding del botón fuera del texto, la navegación no se activa, y al navegar con `Tab` se generan dos paradas de foco confusas.
- **Impacto en el usuario:** Fallo de accesibilidad por teclado, lectores de pantalla y clics fallidos en los dos CTAs principales de la portada.
- **Solución recomendada:** Reemplazar por enlaces semánticos `<a class="btn ..." href="...">` estilizados como botones, con área clicable completa y estados `:focus-visible` claros.
- **Esfuerzo:** Bajo.

#### [ALTO-04] Ruta de imagen de fondo inexistente (`404`) en `src/style/style.css`
- **Evidencia / Ubicación:** `src/style/style.css` (línea 20): `background: url('./src/img/background.jpg') no-repeat center center fixed;`.
- **Detalle:** Primero, desde `src/style/style.css`, la ruta `./src/img/background.jpg` resolvería a `src/style/src/img/background.jpg`. Segundo, `background.jpg` no existe en ninguna carpeta del repositorio.
- **Impacto en el usuario:** Petición HTTP `404` innecesaria en cada carga de la portada y caída al gradiente de reserva (`#89fffd` a `#ef32d9`).
- **Solución recomendada:** Eliminar la referencia al archivo inexistente y construir el fondo con CSS puro (superficies oscuras técnicas, grillas sutiles e iluminación ambiental controlada por variables CSS).
- **Esfuerzo:** Bajo.

#### [ALTO-05] HTML malformado y etiquetas duplicadas en `src/routes/cv.html`
- **Evidencia / Ubicación:**
  - `src/routes/cv.html` líneas 168–181: `<p><strong>Cossette Muebles</strong><br><p>Manejo de herramientas...</p>` anida múltiples `<p>` dentro de otro `<p>`, lo cual es inválido en HTML y provoca que el navegador cierre prematuramente el párrafo padre y deje nodos de texto huérfanos.
  - `src/routes/cv.html` líneas 305 y 331: Se incluye dos veces el mismo script `<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>`.
  - `src/style/cv.css` líneas 183–196 y 219–232, y líneas 272–295 y 320–335: Reglas CSS duplicadas y contradictorias para `.view-certificates-btn`, `.modal-content` y `.close`.
- **Impacto en el usuario:** DOM inconsistente, sobrecarga de scripts externos duplicados y estilos difíciles de mantener.
- **Solución recomendada:** Limpiar el marcado HTML usando listas semánticas (`<ul>`/`<li>`) o tarjetas estructuradas para cada puesto laboral, eliminar scripts duplicados y unificar el CSS.
- **Esfuerzo:** Medio.

#### [ALTO-06] Visor modal de diplomas inaccesible por teclado y sin contexto de cada certificado
- **Evidencia / Ubicación:** `src/routes/cv.html` (líneas 271–301) y `scripts/modal.js` (líneas 1–78).
- **Detalle:**
  - Las miniaturas usan `<img onclick="openFile(...)">` con `alt="Diploma 1"`, `alt="Diploma 2"`, etc., por lo que no son enfocables con `Tab`, no responden a `Enter`/`Space`, y los usuarios o reclutadores no saben qué diploma es cada uno sin abrirlos uno por uno.
  - El modal no tiene `role="dialog"`, `aria-modal="true"`, bloqueo de scroll del body, ni cierre con la tecla `Escape`.
  - Además, en `src/PDF/` hay 7 diplomas reales en PNG (`iweb.png`, `css.png`, `js.png`, `react.png`, `diploma_ciber-seguridad.png`, `Globas-cs.png`, `diplomasepe1.png`) que tampoco tienen enlace directo a sus versiones PDF cuando aplica.
- **Impacto en el usuario:** Inaccesible para usuarios de teclado/lectores de pantalla y experiencia torpe al inspeccionar las credenciales.
- **Solución recomendada:** Construir una galería de certificaciones etiquetada con el nombre real del título, institución (Desafío Latam / SEPE), horas y fecha de emisión, con botones reales (`<button>`) y un visor modal accesible (`Escape`, clic fuera, controles Anterior/Siguiente y opción de ver/descargar a tamaño completo).
- **Esfuerzo:** Medio.

#### [ALTO-07] Inconsistencias en datos de contacto y canales sociales entre páginas
- **Evidencia / Ubicación:**
  - Correo electrónico en botones flotantes (`index.html` línea 32, `cv.html` línea 314, `proyects.html` línea 92, `qr.html` línea 48): `Andradegali1503@gmail.com`.
  - Correo electrónico escrito en el texto de `cv.html` (línea 29): `Ajelandrox15@gmail.com`.
  - Enlace de WhatsApp en `index.html` (línea 42): `https://api.whatsapp.com/send?phone=34642834742...` vs `cv.html` / `proyects.html`: `https://wa.me/+34642834742`.
- **Impacto en el usuario:** Confusión sobre cuál es el correo principal activo de contacto.
- **Solución recomendada:** Destacar el correo principal (`Andradegali1503@gmail.com`) en todos los botones de acción primaria y mantener el correo secundario (`Ajelandrox15@gmail.com`) claramente identificado o accesible como alternativo, con botón de "Copiar correo" con confirmación visual.
- **Esfuerzo:** Bajo.

#### [ALTO-08] Peso excesivo de imágenes sin carga diferida (`lazy loading`) ni dimensiones declaradas
- **Evidencia / Ubicación:**
  - `src/img/proyecto1.png`: **2,858,096 bytes (2.86 MB)**
  - `src/PDF/iweb.png`: **2,262,899 bytes (2.26 MB)**
  - `src/PDF/js.png`: **2,258,710 bytes (2.26 MB)**
  - `src/PDF/css.png`: **2,252,667 bytes (2.25 MB)**
  - `src/PDF/react.png`: **2,243,170 bytes (2.24 MB)**
  - `src/img/ali.png`: **992,254 bytes (~1 MB)** mostrada en un círculo de `150x150px` mediante `background-image`.
- **Impacto en el usuario:** En `cv.html`, las 7 imágenes de diplomas se descargan inmediatamente al abrir la página aunque el modal esté oculto (`display: none`), consumiendo **más de 10 MB de datos** en segundo plano desde el primer segundo.
- **Solución recomendada:** Añadir `loading="lazy"`, `decoding="async"`, `width` y `height` explícitos, y cargar las imágenes de alta resolución del visor bajo demanda o con carga diferida para no penalizar el LCP ni el consumo de datos móviles.
- **Esfuerzo:** Bajo-Medio.

#### [MEDIO-09] Problemas de superposición y legibilidad en dispositivos móviles
- **Evidencia / Ubicación:**
  - `src/style/style.css` (líneas 25–79): `.circles li` posiciona 8 iconos de `80x80px` con `opacity: 0.8` flotando detrás/alrededor de `.principal-container`, sin `z-index` ni `pointer-events: none`, distrayendo visualmente en pantallas pequeñas.
  - `src/style/style.css` (línea 165): `.typewriter h2 { font-size: 3.5vw; white-space: nowrap; }` hace que en un móvil de `360px` el título mida apenas `12.6px` y en pantallas grandes crezca descontroladamente.
  - `src/style/cv.css` (líneas 122–129) y `src/style/proyects.css` (líneas 129–138): `.aside` tiene `position: fixed; top: 50%;` (`right: 15px` en CV y `left: 10px` en Proyectos), tapando el texto de las tarjetas en móviles.
- **Impacto en el usuario:** Lectura incómoda en smartphones y botones sociales que pisan el contenido.
- **Solución recomendada:** Usar tipografía fluida con `clamp()`, convertir la barra social flotante en elementos integrados en el header/footer o un dock responsivo que nunca tape el texto, y asegurar que los elementos decorativos de fondo tengan `pointer-events: none` y `aria-hidden="true"`.
- **Esfuerzo:** Medio.

#### [MEDIO-10] Uso de rutas absolutas (`/src/...`, `/scripts/...`) riesgosas para portabilidad local y subdirectorios
- **Evidencia / Ubicación:** `src/routes/cv.html` (líneas 9, 37–61, 277–286, 315–327), `src/routes/proyects.html` (líneas 8, 93–102) y `src/routes/qr.html` (línea 7).
- **Detalle:** Mientras `index.html` usa rutas relativas (`./src/...`), las páginas en `src/routes/` usan rutas absolutas a la raíz (`/src/...`). Si el repositorio se sirve desde una subcarpeta o entorno de previsualización local con prefijo, todas las rutas `/src/...` fallan.
- **Impacto en el usuario:** Fragilidad de despliegue fuera de la raíz exacta del dominio.
- **Solución recomendada:** Estandarizar todas las rutas a relativas (`../style/...`, `../img/...`, `../../scripts/...`) para que el sitio funcione de manera idéntica en GitHub Pages raíz, subdirectorios y servidores locales de prueba.
- **Esfuerzo:** Bajo.

---

### B. Oportunidades de Diseño y Posicionamiento (Subjetivas / Estratégicas)

1. **Articular la narrativa única de Ali Alejandro Andrade:**
   - Actualmente, la portada no cuenta quién es Ali. Sin embargo, al auditar `cv.html` descubrimos un perfil sumamente interesante y auténtico:
     - **Formación académica formal:** Técnico Superior Universitario en Informática (IUGT, 2014–2018).
     - **Especialización Web Full Stack reciente (2023–2024):** Desafío Latam (Introducción Web, CSS Avanzado, JavaScript para la Web, React I), Master en Webs Full Stack y 3 certificaciones oficiales SEPE en España (Programación Web JS/PHP `IFCT091PO`, Cloud Computing Azure/Linux `IFCT026PO` y Seguridad Informática `IFCT050PO`).
     - **Experiencia real en TI y Operaciones:** Analista de Sistemas (Ministerio de Educación, 2017–2019), Auxiliar Informático durante casi 4 años y luego promovido a Jefe de Almacén en MEGA FRÍO Chile (2020–2024), más gestión logística con ERP Defontana y monitoreo de redes con PRTG Network Monitor.
     - **Mentalidad *Maker* y precisión manual:** Micro-soldadura electrónica, administración Linux y carpintería/ebanistería fina (*Cossette Muebles*).
   - **Oportunidad:** Transformar esta combinación en su mayor diferencial competitivo: **"Desarrollador Front-End & Full Stack con base sólida en Sistemas, Redes y Operaciones Reales"**.

2. **Unificar la experiencia en una portada de alto impacto + vistas especializadas:**
   - En lugar de que `index.html` sea solo una tarjeta de bienvenida vacía con dos botones que obligan a salir de la página para ver cualquier dato, `index.html` debe ofrecer un recorrido completo (Hero con posicionamiento y stack -> Proyectos destacados con casos de estudio -> Trayectoria híbrida Desarrollo + Sistemas -> Certificaciones verificables con visor interactivo -> Contacto directo), manteniendo además `cv.html` (como vista de CV detallado optimizado también para impresión/PDF), `proyects.html` (como catálogo filtrable de proyectos y laboratorio Front-End) y `qr.html` (como tarjeta digital / Link-in-bio con código QR real generado dinámicamente) perfectamente sincronizados.

3. **Reemplazar el retrato IA de Iron Man (`src/img/ali.png`) o contextualizarlo adecuadamente con su foto real (`assets/img/ali_perfil.jpeg`):**
   - En `index.html` se usa `src/img/ali.png` (un retrato estilizado con armadura tipo Iron Man), mientras que en `assets/img/ali_perfil.jpeg` existe una fotografía real de Ali. Podemos usar un tratamiento visual elegante o permitir alternar/mostrar una presentación profesional que transmita cercanía y autenticidad.

---

## 3. Fortalezas a Preservar

1. **Veracidad documental:** Los 7 certificados en `src/PDF/` son reales, verificables (con código QR y número de expediente/certificado) y demuestran formación continua intensa entre 2023 y 2024 en Chile y España.
2. **Proyecto en producción (*Sombra de Valoria*):** `https://sombra-de-valoria.web.app` es un proyecto real desplegado con una estética inmersiva que merece presentarse como *Featured Project* con análisis técnico.
3. **Proyectos de evolución Front-End en `assets/Routes/`:** Los desafíos alojados en el repositorio (*Cuppon*, *Iguana Page*, *Cosset Muebles*) funcionan y muestran su progresión real en HTML semántico, Flexbox, Bootstrap 5 y maquetación a partir de Figma.
4. **Simplicidad de despliegue:** Al ser HTML/CSS/JS estático puro, no requiere compiladores complejos para publicarse en GitHub Pages y puede alcanzar puntuaciones sobresalientes de rendimiento y accesibilidad.

---

## 4. Plan de Acción Priorizado y Criterios de Aceptación

### Fase 1 — Estrategia de Contenido, UX y Dirección de Arte
- [ ] Documentar `content-plan.md`, `ux-plan.md`, `creative-direction.md`, `asset-audit.md` y `motion-spec.md`.
- [ ] Establecer tokens de diseño unificados en un sistema CSS compartido.

### Fase 2 — Reingeniería de Estructura, Contenido y Componentes (`index.html`, `cv.html`, `proyects.html`, `qr.html`)
- [ ] Eliminar todas las tarjetas placeholder con imágenes rotas (`ruta/a/tu/imagen2.jpg`...`6.jpg`) e integrar los proyectos reales verificados.
- [ ] Crear navegación global consistente y accesible entre todas las páginas.
- [ ] Rediseñar el visor modal de certificados con soporte de teclado (`Escape`, `Tab`, flechas), títulos reales, metadatos y carga diferida (`loading="lazy"`).
- [ ] Corregir todos los errores de validación HTML (`<button><a>`, `<p><p>`, múltiples `<h1>`, scripts duplicados, rutas absolutas frágiles).

### Fase 3 — Optimización SEO, Accesibilidad, Rendimiento y QA
- [ ] Añadir metadatos completos (title, description, Open Graph, JSON-LD `Person`, favicon, `robots.txt`, `sitemap.xml`).
- [ ] Garantizar soporte completo para `@media (prefers-reduced-motion: reduce)` y `@media print` en la vista de CV.
- [ ] Verificar en navegador headless (escritorio `1440x900` y móvil `390x844`) que existan **0 errores 404**, **0 errores de consola**, **0 desbordamientos horizontales** y que todos los enlaces y modales funcionen correctamente.
