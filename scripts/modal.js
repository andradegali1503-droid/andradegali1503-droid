/**
 * Ali Alejandro Andrade — Certificate Modal Compatibility Layer (scripts/modal.js)
 * Preserves legacy openModal/closeModal/openFile API while delegating to the
 * accessible Lightbox controller when present.
 */

function openModal(index) {
  if (typeof window.openPortfolioLightbox === 'function') {
    window.openPortfolioLightbox(typeof index === 'number' ? index : 0);
    return;
  }
  const modal = document.getElementById('lightboxModal') || document.getElementById('modal');
  if (modal) {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal() {
  if (typeof window.closePortfolioLightbox === 'function') {
    window.closePortfolioLightbox();
    return;
  }
  const modal = document.getElementById('lightboxModal') || document.getElementById('modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = '';
    modal.setAttribute('aria-hidden', 'true');
  }
}

function openFile(filePath) {
  if (!filePath) return;
  window.open(filePath, '_blank', 'noopener,noreferrer');
}

function closeFileModal() {
  closeModal();
}
