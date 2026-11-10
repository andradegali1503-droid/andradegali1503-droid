# Especificación de Movimiento y Microinteracciones (`motion-spec`)

## 1. Auditoría de Animaciones Actuales y Problemas Detectados

| Ubicación Actual | Animación Actual | Problema Detectado | Acción Correctiva |
| :--- | :--- | :--- | :--- |
| `src/style/style.css` (`.circles li`) | `float-random 20s infinite ease-in-out` en 8 iconos de `80x80px` | Los iconos flotan encima/detrás del contenedor de texto continuamente, compitiendo con la lectura y consumiendo repintados en móvil. | **Eliminar los iconos flotantes invasivos.** Sustituir por una atmósfera de fondo estática/sutil (retícula de ingeniería + resplandor radial suave) y presentar los iconos del stack dentro de tarjetas estructuradas. |
| `src/style/style.css` (`.typewriter h2`) | `typing 4s steps(40, end)` + `blink-caret .75s infinite` con `font-size: 3.5vw` | Retrasa 4 segundos la lectura de un título genérico, obliga a `white-space: nowrap` y rompe la legibilidad en pantallas móviles. | **Eliminar el efecto typewriter bloqueante.** Mostrar el titular principal inmediatamente con una entrada suave (`fade-up` de `450ms`) que no trunca el texto en ningún ancho de pantalla. |
| `src/style/proyects.css` (`body:hover`) | `body:hover { background-color: #e0eafc; }` | Hace parpadear todo el color de fondo de la página cada vez que el ratón entra o sale de la ventana. | **Eliminar por completo.** |
| `src/style/cv.css` y `proyects.css` (`.profile-header h1`) | `slideInLeft 1.5s` desde `translateX(-100%)` | Desplazamiento lateral exagerado (`1.5s`) que provoca sensación de lentitud y posible scroll horizontal transitorio. | Reemplazar por una transición de entrada corta y refinada (`400ms`, `translateY(12px)`). |
| `scripts/index.js` | Añade/quita clases `.hovered` / `.not-hovered` vía JS para algo que ninguna regla CSS usa | Código JavaScript redundante sin efecto real en `style.css`. | Reemplazar por controladores interactivos con valor real para el usuario: filtrado dinámico de proyectos/certificados, visor modal accesible, menú móvil, copiado de email con feedback y alternador de retrato. |

---

## 2. Sistema de Tokens de Movimiento

Definimos un conjunto acotado y consistente de duraciones y curvas de aceleración en `:root`:

```css
:root {
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 160ms;
  --duration-base: 260ms;
  --duration-slow: 450ms;
}
```

---

## 3. Catálogo de Microinteracciones con Propósito

1. **Tarjetas de Proyectos y Certificados (`Card Hover & Focus`):**
   - **Trigger:** `:hover` y `:focus-within`.
   - **Comportamiento:** Elevación sutil `transform: translateY(-4px)` en `var(--duration-base) var(--ease-out-expo)`, transición del borde de `var(--border-subtle)` a `var(--border-highlight)` y ligero zoom óptico (`scale(1.025)`) en la imagen del proyecto dentro de su contenedor con `overflow: hidden`.
   - **Propósito:** Confirmar que la tarjeta es interactiva y dirigir la mirada hacia la vista previa del proyecto o certificado.

2. **Filtrado Dinámico de Proyectos y Certificados:**
   - **Trigger:** Clic o `Enter`/`Space` en los botones de filtro (`Todos`, `Front-End & UI`, `Full-Stack / Web App`, `SEPE Oficial`, `Desafío Latam`).
   - **Comportamiento:** Actualización de `aria-pressed="true"`, transición de opacidad y escala sutil (`opacity: 0 -> 1`, `transform: translateY(6px) -> translateY(0)`) en `220ms`, actualizando además un contador accesible (`aria-live="polite"`).
   - **Propósito:** Permitir a un reclutador filtrar en un clic las credenciales de programación web, cloud/seguridad o proyectos específicos.

3. **Visor Modal de Diplomas y Vistas Previas (`Accessible Lightbox`):**
   - **Trigger:** Clic o teclado sobre cualquier tarjeta de certificado o botón `"Ver Diploma"`.
   - **Comportamiento:** Apertura fluida del backdrop (`opacity: 0 -> 1` en `180ms`) y del contenedor del documento (`scale(0.96) -> scale(1)` en `240ms var(--ease-out-expo)`). Incluye navegación con teclado (`ArrowLeft` / `ArrowRight` para cambiar de diploma, `Escape` para cerrar) y contador `1 / 7`.
   - **Propósito:** Inspeccionar los 7 certificados oficiales sin salir de la página ni perder el contexto de lectura.

4. **Acción "Copiar Correo" con Confirmación Instantánea (`Toast / Inline Feedback`):**
   - **Trigger:** Clic en el botón `"Copiar correo"` junto a `Andradegali1503@gmail.com`.
   - **Comportamiento:** Copia al portapapeles (`navigator.clipboard.writeText`), cambia temporalmente el icono y etiqueta a `"¡Correo copiado!"` en color esmeralda (`--accent-emerald`) durante `2.2s` y anuncia el estado mediante una región `aria-live="polite"`.
   - **Propósito:** Eliminar la fricción de los enlaces `mailto:` que en muchos navegadores de escritorio abren clientes de correo no configurados.

5. **Conmutador de Identidad en el Avatar (`Real Photo <-> Creative Avatar`):**
   - **Trigger:** Botón interactivo bajo la foto de perfil (`"Alternar vista: Foto Real / Avatar Geek"`).
   - **Comportamiento:** Transición suave entre la fotografía profesional real de Ali (`assets/img/ali_perfil.jpeg`) y su retrato ilustrado original (`src/img/ali.png`), conservando el toque personal del repositorio original sin comprometer la seriedad de la primera impresión.

---

## 4. Accesibilidad y Respeto a `prefers-reduced-motion`

Toda animación o transición se desactiva o reduce a cambios instantáneos de opacidad cuando el sistema operativo del usuario solicita movimiento reducido:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Además, ningún contenido depende de JavaScript ni de animaciones CSS para ser visible: si JavaScript está deshabilitado, todos los proyectos, el CV, los enlaces a los diplomas y los canales de contacto permanecen 100% visibles y funcionales.
