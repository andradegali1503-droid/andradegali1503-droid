import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import gsap from 'gsap';

export const PageTransitionCurtain = forwardRef(function PageTransitionCurtain(_, ref) {
  const containerRef = useRef(null);
  const [targetLabel, setTargetLabel] = useState('QUANTUM VIEW');

  useImperativeHandle(ref, () => ({
    playTransition(viewName, onMidpoint) {
      const prefersReduced =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || !containerRef.current) {
        if (onMidpoint) onMidpoint();
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const labels = {
        overview: '01 // EXPERIENCIA 360°',
        projects: '02 // PROJECT LAB & SANDBOX',
        cv: '03 // CURRICULUM & TRAYECTORIA',
        vault: '04 // BÓVEDA DE DIPLOMAS SEPE/DL',
        qr: '05 // TARJETA QR & CONTACTO'
      };
      setTargetLabel(labels[viewName] || viewName.toUpperCase());

      const cols = containerRef.current.querySelectorAll('.qc-shutter-col');
      const hud = containerRef.current.querySelector('.qc-shutter-hud');

      gsap.killTweensOf([cols, hud]);

      const tl = gsap.timeline();
      tl.set(containerRef.current, { pointerEvents: 'all' })
        .set(cols, { transformOrigin: 'top center', scaleY: 0 })
        .set(hud, { opacity: 0, y: 16 })
        .to(cols, {
          scaleY: 1,
          duration: 0.62,
          stagger: 0.065,
          ease: 'power3.inOut'
        })
        .to(
          hud,
          {
            opacity: 1,
            y: 0,
            duration: 0.36,
            ease: 'power2.out'
          },
          '-=0.26'
        )
        .add(() => {
          if (onMidpoint) onMidpoint();
          window.scrollTo({ top: 0, behavior: 'auto' });
        })
        .to(hud, {
          opacity: 0,
          y: -14,
          duration: 0.28,
          delay: 0.34,
          ease: 'power2.in'
        })
        .set(cols, { transformOrigin: 'bottom center' })
        .to(cols, {
          scaleY: 0,
          duration: 0.68,
          stagger: 0.065,
          ease: 'power4.inOut'
        })
        .set(containerRef.current, { pointerEvents: 'none' });
    }
  }));

  return (
    <div ref={containerRef} className="qc-shutter-curtain" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((idx) => (
        <div key={idx} className="qc-shutter-col">
          <span className="qc-shutter-col-line" />
        </div>
      ))}
      <div className="qc-shutter-hud">
        <span className="qc-shutter-code">QUANTUM ROUTER // SYNCING STAGE</span>
        <strong className="qc-shutter-label">{targetLabel}</strong>
      </div>
    </div>
  );
});

export default PageTransitionCurtain;
