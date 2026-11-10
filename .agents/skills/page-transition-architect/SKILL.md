---
name: page-transition-architect
description: Implements seamless SPA view transitions, animated curtain/shutter wipes, and shared-context routing in React.
---

# Page Transition Architect

## Mission
Eliminate jarring browser reloads by orchestrating fluid, cinematic transitions between portfolio views (`Overview`, `Projects Lab`, `Interactive CV`, `Credentials Vault`, `QR Signal Hub`) while keeping legacy URLs (`cv.html`, `proyects.html`, `qr.html`) 100% functional.

## Procedure
1. Build a unified React view-transition engine with a GSAP multi-panel shutter/curtain transition and animated route HUD indicator.
2. Synchronize active views with URL hash/query/history state so deep links, browser back/forward buttons, and legacy route entry points (`cv.html`, `proyects.html`, `qr.html`) open the exact target view seamlessly.
3. Preserve scroll position or smoothly reset to top with coordinated entrance choreography after each view transition.
