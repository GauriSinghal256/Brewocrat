import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Gold scroll-progress bar + soft cursor spotlight
export default function GlobalFX() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glow = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = null;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (raf === null) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (glow.current) glow.current.style.transform = `translate(${x}px,${y}px)`;
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
        raf = null;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div ref={glow} className="cursor-glow" />
    </>
  );
}
