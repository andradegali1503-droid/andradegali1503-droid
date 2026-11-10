import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    const onMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const interactiveEl = e.target.closest('[data-cursor], a, button');
      if (interactiveEl) {
        setIsActive(true);
        const customText = interactiveEl.getAttribute('data-cursor') || '';
        setCursorLabel(customText);
      } else {
        setIsActive(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div ref={dotRef} className={`cursor-dot ${isActive ? 'is-active' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${isActive ? 'is-active' : ''} ${cursorLabel ? 'has-label' : ''}`}>
        {cursorLabel && <span className="cursor-ring-label">{cursorLabel}</span>}
      </div>
    </div>
  );
}
