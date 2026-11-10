import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GLYPHS = '01/#%&*<>[]{}—+=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function ScrambleText({ text, className = '' }) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 26;
    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setOutput(text);
        clearInterval(interval);
        return;
      }
      const progress = frame / totalFrames;
      const scrambled = text
        .split('')
        .map((ch, idx) => {
          if (ch === ' ') return ' ';
          if (idx / text.length < progress) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setOutput(scrambled);
    }, 36);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{output}</span>;
}

export function KineticHeadline({ text, highlightText, as: Tag = 'h1', className = '' }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const chars = el.querySelectorAll('.k-char');
    if (!chars || chars.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 15, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.015,
          ease: 'power3.out'
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text, highlightText]);

  const renderWords = (str, isHighlight = false) =>
    str.split(' ').map((word, wIdx, arr) => (
      <React.Fragment key={`${word}-${wIdx}`}>
        <span className="k-word">
          {word.split('').map((ch, cIdx) => (
            <span
              key={`${cIdx}-${ch}`}
              className={`k-char ${isHighlight ? 'k-char--highlight' : ''}`}
            >
              {ch}
            </span>
          ))}
        </span>
        {wIdx < arr.length - 1 ? ' ' : null}
      </React.Fragment>
    ));

  return (
    <Tag ref={rootRef} className={`kinetic-headline ${className}`}>
      <span className="k-line">{renderWords(text, false)}</span>
      {highlightText && <span className="k-line">{renderWords(highlightText, true)}</span>}
    </Tag>
  );
}

export function VelocityMarquee({ items }) {
  return (
    <div className="velocity-marquee" aria-hidden="true">
      <div className="velocity-marquee-track">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="velocity-marquee-item">
            <span className="velocity-dot">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
