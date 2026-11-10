# Auditoría y Curaduría de Activos Visuales (`asset-audit`)

## 1. Inventario Completo de Activos Existentes en el Repositorio

### A. Fotografías de Perfil e Identidad
| Archivo | Tamaño Actual | Uso Actual | Diagnóstico | Acción Curatorial |
| :--- | :---: | :--- | :--- | :--- |
| `assets/img/ali_perfil.jpeg` | 150 KB | Usado solo en `assets/Routes/Ali_andrade/...` y commits antiguos | Fotografía real y auténtica del propietario; peso razonable. | **Promover a retrato principal** en el Hero de `index.html`, `cv.html` y `qr.html` con `width`/`height` explícitos y `object-fit: cover`. |
| `src/img/ali.png` | 992 KB | Avatar en `index.html` vía `background-image` | Retrato generado por IA estilo armadura Iron Man; casi 1 MB para un recuadro de `150x150px`. | Mantener disponible como avatar secundario/alternativo con carga diferida (`loading="lazy"`), evitando que bloquee la carga inicial de la portada. |

### B. Capturas de Proyectos Reales
| Archivo | Tamaño Actual | Proyecto Asociado | Diagnóstico | Acción Curatorial |
| :--- | :---: | :--- | :--- | :--- |
| `src/img/proyecto1.png` | 2,858 KB (2.86 MB) | **Sombra de Valoria** (`https://sombra-de-valoria.web.app`) | Captura real de alta resolución (1919×1031), incluye la barra superior del navegador Edge. | Usar en el *Featured Case Study* con recorte óptico limpio (`object-fit: cover; object-position: center 42px`), atributos `width="1919" height="1031"` y `decoding="async"`. |
| `assets/img/desafio-4.PNG` | 295 KB | **Cuppon Platform** (`assets/Routes/Ali-andrade-desafio-4/index.html`) | Captura completa vertical nítida del proyecto Bootstrap 5. | Integrar en tarjeta del proyecto **Cuppon** en `index.html` y `proyects.html` (reemplazando los `ruta/a/tu/imagen*.jpg` rotos). |
| `assets/img/desafio-3.PNG` | 168 KB | **Iguana Page** (`assets/Routes/Ali-andrade-desafio-3/index.html`) | Captura completa vertical nítida del proyecto Flexbox. | Integrar en tarjeta del proyecto **Iguana Page** con `loading="lazy"`. |
| `assets/img/desafio-2.PNG` | 555 KB | **Cosset Muebles** (`assets/Routes/Ali_andrade-desafio-2/index.html`) | Captura horizontal real de la landing de mueblería. | Integrar en tarjeta del proyecto **Cosset Muebles** con recorte limpio (`object-position: left top`) y `loading="lazy"`. |
| `assets/img/desafio-1.png` | 109 KB | **CV en HTML Semántico** (`assets/Routes/Ali_andrade/curriculum vitale/index.html`) | Captura del primer ejercicio fundacional de HTML. | Incluir en el archivo completo de `proyects.html` como parte de la evolución documentada en el repositorio. |
| `assets/img/desafio-5.PNG` | 30 KB | Captura de terminal Git Bash (`ls` en escritorio personal) | Muestra nombres de archivos locales de escritorio que no aportan como proyecto web. | No usar como proyecto público; mantener el archivo intacto en el repositorio por seguridad histórica. |
| `assets/img/DESAFIO-6.png` / `Desafio-6.a.png` | 449 KB / 213 KB | Captura de versión antigua del portafolio (con RUT expuesto en la imagen) | **Riesgo de privacidad:** la captura muestra el número de RUT en texto grande sobre fondo naranja. | **No mostrar en las páginas públicas** para proteger la privacidad documental de Ali. |

### C. Certificados y Diplomas Oficiales (`src/PDF/`)
| Archivo Imagen | Archivo PDF Asociado | Tamaño PNG | Certificado Verificado | Acción Curatorial |
| :--- | :--- | :---: | :--- | :--- |
| `src/PDF/diplomasepe1.png` | `src/PDF/Diploma-ALI_ALEJANDRO_ANDRADE_GODOY.pdf` (1.1 MB) | 287 KB | **IFCT091PO Programación Web JS y PHP** (SEPE, 65h, Oct 2024) | Mostrar con título oficial, metadatos, `loading="lazy"` y opción de ver imagen o descargar PDF. |
| `src/PDF/diploma_ciber-seguridad.png` | `src/PDF/diploma-ciber.pdf` (474 KB) | 211 KB | **IFCT026PO Cloud Computing: Azure & Linux** (SEPE, 30h, Oct 2024) | *(Nota: el nombre del archivo dice `ciber-seguridad`, pero la imagen y el PDF corresponden al diploma de **Cloud Computing Azure/Linux**).* Etiquetar con su título real verificado (**Cloud Computing Azure/Linux**) para total exactitud. |
| `src/PDF/Globas-cs.png` | `src/PDF/diploma,cs.pdf` (4.18 MB) | 245 KB | **IFCT050PO Gestión de la Seguridad Informática en la Empresa** (SEPE / Global Knowledge, Nov 2024) | Mostrar con título oficial de **Seguridad Informática en la Empresa**, `loading="lazy"` y enlace a imagen/PDF. |
| `src/PDF/js.png` | — | 2,259 KB | **JavaScript para la Web** (Desafío Latam, 60h, Abr 2024) | Añadir `loading="lazy"` y `decoding="async"`; describir con `alt` completo incluyendo código `N° 28921`. |
| `src/PDF/react.png` | — | 2,243 KB | **React I** (Desafío Latam, 40h, Mar 2024) | Añadir `loading="lazy"` y `decoding="async"`; describir con `alt` completo incluyendo código `N° 29706`. |
| `src/PDF/css.png` | — | 2,253 KB | **CSS Avanzado** (Desafío Latam, 40h, Feb 2024) | Añadir `loading="lazy"` y `decoding="async"`; describir con `alt` completo incluyendo código `N° 27384`. |
| `src/PDF/iweb.png` | — | 2,263 KB | **Introducción al Desarrollo Web** (Desafío Latam, 14h, Oct 2023) | Añadir `loading="lazy"` y `decoding="async"`; describir con `alt` completo incluyendo código `N° 26488`. |

### D. Iconografía de Tecnologías y Redes Sociales (`src/img/`)
- **Activos existentes:** `html5.png`, `css.png`, `JavaScript-logo.png`, `react.png`, `angular.png`, `bootstrap-framework-logo-D45BDEC73C-seeklogo.com.png`, `nodejs.png`, `mongodb.png`, `gitbash.png`, `defontana.png`, `PRTG-Network-Monitor.jpg`, `gmail.png`, `github.png`, `linkedin.png`, `watsapp.png`, `home-svgrepo-com.svg`.
- **Diagnóstico:** En el diseño actual, los iconos PNG de tecnologías (`80x80px`) flotan caóticamente sobre el texto en `index.html`, y los iconos de redes sociales (`gmail.png`, `watsapp.png`, etc.) tienen estilos heterogéneos (algunos con fondo circular, otros cuadrados, distinta resolución). Además, `defontana.png` y `PRTG-Network-Monitor.jpg` existen en `src/img/` pero ni siquiera se estaban aprovechando en `cv.html`.
- **Acción curatorial:**
  1. Integrar los logos reales de technologies (`html5.png`, `css.png`, `JavaScript-logo.png`, `react.png`, `angular.png`, `nodejs.png`, `mongodb.png`, `gitbash.png`, `bootstrap...png`) y los de herramientas empresariales (`defontana.png`, `PRTG-Network-Monitor.jpg`) dentro de **píldoras técnicas uniformes (`28x28px` / `32x32px`)** con contenedor consistente, `object-fit: contain` y `loading="lazy"`.
  2. Acompañar los botones de navegación, contacto y acciones de interfaz con **iconos SVG inline limpios, nítidos y accesibles (`aria-hidden="true"`)** para garantizar nitidez vectorial en pantallas Retina y cero peticiones HTTP extra.
