import React, { useRef } from 'react';
import gsap from 'gsap';

export function SpotlightCard({
  children,
  className = '',
  accentColor = 'var(--accent-primary)',
  onClick,
  cursorLabel = 'EXPLORE',
  tiltIntensity = 5.5
}) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--spot-x', `${x}px`);
    el.style.setProperty('--spot-y', `${y}px`);
    el.style.setProperty('--spot-opacity', '1');

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 900) return;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    gsap.to(el, {
      rotateY: normX * tiltIntensity,
      rotateX: -normY * tiltIntensity,
      transformPerspective: 1000,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');

    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  return (
    <div
      ref={cardRef}
      className={`qc-spotlight-card ${className}`}
      style={{ '--card-accent': accentColor }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      data-cursor={cursorLabel}
    >
      <div className="qc-spotlight-glow" aria-hidden="true" />
      <span className="qc-corner qc-corner-tl" aria-hidden="true" />
      <span className="qc-corner qc-corner-tr" aria-hidden="true" />
      <span className="qc-corner qc-corner-bl" aria-hidden="true" />
      <span className="qc-corner qc-corner-br" aria-hidden="true" />
      <div className="qc-spotlight-content">{children}</div>
    </div>
  );
}

export default SpotlightCard;
