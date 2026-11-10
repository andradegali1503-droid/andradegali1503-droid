/**
 * Ali Alejandro Andrade — Portfolio Interaction & UI Controller (scripts/index.js)
 * Accessible navigation, filtering, clipboard actions, avatar switch & lightbox.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (window.__QUANTUM_PORTFOLIO_MOUNTED__) return;
    initMobileNav();
    initAvatarSwitch();
    initProjectFilters();
    initCertFilters();
    initClipboardCopy();
    initLightbox();
    initPrintTrigger();
  });

  /* 1. Accessible Mobile Navigation */
  function initMobileNav() {
    const toggleBtn = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('[data-nav-menu]');
    if (!toggleBtn || !navMenu) return;

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  /* 2. Real Photo <-> Creative Avatar Switcher */
  function initAvatarSwitch() {
    const switchBtn = document.querySelector('[data-avatar-switch]');
    const avatarImg = document.querySelector('[data-avatar-img]');
    const avatarSource = document.querySelector('[data-avatar-source]');
    if (!switchBtn || !avatarImg) return;

    let showingCreative = false;
    const realWebp = avatarImg.getAttribute('data-real-webp');
    const realFallback = avatarImg.getAttribute('data-real-src');
    const creativeWebp = avatarImg.getAttribute('data-creative-webp');
    const creativeFallback = avatarImg.getAttribute('data-creative-src');
    const labelSpan = switchBtn.querySelector('[data-avatar-label]');

    switchBtn.addEventListener('click', () => {
      showingCreative = !showingCreative;
      if (showingCreative) {
        if (avatarSource && creativeWebp) avatarSource.srcset = creativeWebp;
        if (creativeFallback) avatarImg.src = creativeFallback;
        avatarImg.alt = 'Ilustración creativa de Ali Alejandro Andrade';
        if (labelSpan) labelSpan.textContent = 'Ver foto real';
        switchBtn.setAttribute('aria-pressed', 'true');
      } else {
        if (avatarSource && realWebp) avatarSource.srcset = realWebp;
        if (realFallback) avatarImg.src = realFallback;
        avatarImg.alt = 'Fotografía profesional de Ali Alejandro Andrade';
        if (labelSpan) labelSpan.textContent = 'Ver avatar creativo';
        switchBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /* 3. Dynamic Project Filtering & Search */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('[data-project-filter]');
    const searchInput = document.querySelector('[data-project-search]');
    const projectCards = document.querySelectorAll('[data-project-card]');
    const countEl = document.querySelector('[data-project-count]');
    const emptyEl = document.querySelector('[data-project-empty]');

    if (!projectCards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    const updateProjects = () => {
      let visibleCount = 0;
      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        const textContent = (card.textContent || '').toLowerCase();
        const matchesCat = activeCategory === 'all' || categories.includes(activeCategory);
        const matchesSearch = !searchQuery || textContent.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.hidden = false;
          visibleCount++;
        } else {
          card.hidden = true;
        }
      });

      if (countEl) {
        countEl.textContent = `Mostrando ${visibleCount} de ${projectCards.length} proyectos verificados`;
      }
      if (emptyEl) {
        emptyEl.hidden = visibleCount > 0;
      }
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-project-filter') || 'all';
        filterBtns.forEach((b) => {
          const isCurrent = b === btn;
          b.setAttribute('aria-pressed', String(isCurrent));
          b.classList.toggle('is-active', isCurrent);
        });
        updateProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        updateProjects();
      });
    }
  }

  /* 4. Dynamic Certifications Filtering */
  function initCertFilters() {
    const filterBtns = document.querySelectorAll('[data-cert-filter]');
    const certCards = document.querySelectorAll('[data-cert-card]');
    const countEl = document.querySelector('[data-cert-count]');
    if (!filterBtns.length || !certCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-cert-filter') || 'all';
        filterBtns.forEach((b) => {
          const isCurrent = b === btn;
          b.setAttribute('aria-pressed', String(isCurrent));
          b.classList.toggle('is-active', isCurrent);
        });

        let visible = 0;
        certCards.forEach((card) => {
          const issuer = (card.getAttribute('data-issuer') || '').toLowerCase();
          const show = filterVal === 'all' || issuer.includes(filterVal);
          card.hidden = !show;
          if (show) visible++;
        });

        if (countEl) {
          countEl.textContent = `Mostrando ${visible} de ${certCards.length} diplomas verificados`;
        }
      });
    });
  }

  /* 5. Copy Email to Clipboard with Live Feedback */
  function initClipboardCopy() {
    const copyBtns = document.querySelectorAll('[data-copy-email]');
    const feedbackEl = document.querySelector('[data-copy-feedback]');

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const email = btn.getAttribute('data-copy-email');
        if (!email) return;

        const originalLabel = btn.innerHTML;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
          } else {
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
          }

          btn.textContent = '¡Correo copiado!';
          if (feedbackEl) {
            feedbackEl.textContent = `Dirección ${email} copiada al portapapeles.`;
          }
          setTimeout(() => {
            btn.innerHTML = originalLabel;
          }, 2200);
        } catch (err) {
          if (feedbackEl) {
            feedbackEl.textContent = `Correo: ${email}`;
          }
        }
      });
    });
  }

  /* 6. Accessible Lightbox Modal for Diplomas & Project Previews */
  function initLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;

    const modalImg = modal.querySelector('[data-lightbox-img]');
    const modalTitle = modal.querySelector('[data-lightbox-title]');
    const modalSubtitle = modal.querySelector('[data-lightbox-subtitle]');
    const modalDownload = modal.querySelector('[data-lightbox-download]');
    const modalCounter = modal.querySelector('[data-lightbox-counter]');
    const closeBtns = modal.querySelectorAll('[data-lightbox-close]');
    const prevBtn = modal.querySelector('[data-lightbox-prev]');
    const nextBtn = modal.querySelector('[data-lightbox-next]');

    const triggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
    if (!triggers.length) return;

    let currentIndex = 0;
    let lastFocusedElement = null;

    const renderSlide = (index) => {
      if (index < 0) index = triggers.length - 1;
      if (index >= triggers.length) index = 0;
      currentIndex = index;

      const trigger = triggers[currentIndex];
      const src = trigger.getAttribute('data-full-src') || '';
      const title = trigger.getAttribute('data-title') || 'Documento verificado';
      const subtitle = trigger.getAttribute('data-subtitle') || '';
      const downloadHref = trigger.getAttribute('data-download') || src;

      if (modalImg) {
        modalImg.src = src;
        modalImg.alt = title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalSubtitle) modalSubtitle.textContent = subtitle;
      if (modalDownload) {
        modalDownload.href = downloadHref;
      }
      if (modalCounter) {
        modalCounter.textContent = `${currentIndex + 1} / ${triggers.length}`;
      }
    };

    const openLightbox = (index, triggerEl) => {
      lastFocusedElement = triggerEl || document.activeElement;
      renderSlide(index);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstClose = closeBtns[0];
      if (firstClose) firstClose.focus();
    };

    const closeLightbox = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    };

    triggers.forEach((trigger, idx) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(idx, trigger);
      });
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', closeLightbox);
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => renderSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => renderSlide(currentIndex + 1));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        renderSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        renderSlide(currentIndex + 1);
      }
    });

    // Expose global helper for legacy/direct calls
    window.openPortfolioLightbox = (index) => openLightbox(index || 0);
    window.closePortfolioLightbox = closeLightbox;
  }

  /* 7. Print / Save CV as PDF button */
  function initPrintTrigger() {
    const printBtns = document.querySelectorAll('[data-print-cv]');
    printBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        window.print();
      });
    });
  }
})();
