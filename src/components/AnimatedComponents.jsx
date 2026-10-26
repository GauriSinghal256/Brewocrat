import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';

let activeLenis = null;

export function scrollToTarget(target, options = {}) {
  if (activeLenis) {
    activeLenis.scrollTo(target, options);
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
  } else if (target && typeof target.scrollIntoView === 'function') {
    target.scrollIntoView({
      behavior: options.immediate ? 'auto' : 'smooth',
      block: 'start'
    });
  }
}

/**
 * Global Lenis Smooth Scroll Provider Component
 */
export function LenisSmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });
    activeLenis = lenis;
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Text Reveal Animation Component (Word by Word / Line Fade Up)
 */
export function TextReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade Left Animation Component (Slides in from Left to Right)
 */
export function FadeLeft({ children, className = '', delay = 0, distance = 50 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade Right Animation Component (Slides in from Right to Left)
 */
export function FadeRight({ children, className = '', delay = 0, distance = 50 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale Reveal Animation Component (Grows Small to Big)
 */
export function ScaleReveal({ children, className = '', delay = 0, startScale = 0.85 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: startScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image Shine Reveal Component (Adds luxury light sweep overlay + scale animation)
 */
export function ImageShineReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 25 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden group ${className}`}
    >
      {children}
      {/* Glossy Diagonal Light Shine Sweep */}
      <span className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-out pointer-events-none z-10" />
    </motion.div>
  );
}

/**
 * Stagger Container & Child Items
 */
export function StaggerContainer({ children, className = '', staggerDelay = 0.15 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', variant = 'fadeUp' }) {
  const itemVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    },
    fadeRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    }
  };

  return (
    <motion.div variants={itemVariants[variant] || itemVariants.fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
