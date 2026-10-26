import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRotateRight } from 'react-icons/fa6';

export default function AnimatedSignature({ onComplete }) {
  // Animation states: 'signing' (writing name) -> 'flourish' (drawing loop underline) -> 'finished'
  const [animStage, setAnimStage] = useState('signing');
  const [key, setKey] = useState(0); // For resetting animation
  const [isFontReady, setIsFontReady] = useState(false);

  // Ensure Google Fonts are ready before starting animation
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setIsFontReady(true);
      }).catch(() => {
        setIsFontReady(true);
      });
    } else {
      setIsFontReady(true);
    }
  }, []);

  // Sequence the signing stages
  useEffect(() => {
    if (!isFontReady) return;

    setAnimStage('signing');

    // Stage 1: Writing letters "Brewocrat" (0 to 1.8s)
    const flourishTimer = setTimeout(() => {
      setAnimStage('flourish');
    }, 1850);

    // Stage 2: Drawing the flourish underline (1.85s to 2.8s)
    const finishTimer = setTimeout(() => {
      setAnimStage('finished');
      if (onComplete) onComplete();
    }, 2850);

    return () => {
      clearTimeout(flourishTimer);
      clearTimeout(finishTimer);
    };
  }, [key, isFontReady, onComplete]);

  const handleReplay = (e) => {
    e.stopPropagation();
    setKey((prev) => prev + 1);
  };

  // Coordinates for the signature:
  // Center is x=500, baseline y=175. "Brewocrat" spans roughly from x=145 to x=855
  // Flourish underline path (dynamic swoosh beneath letters with cursive loops)
  const flourishPath = "M 855 170 C 825 220 710 255 520 258 C 340 260 160 250 95 230 C 55 215 50 185 85 180 C 125 174 165 210 230 236 C 360 270 560 258 780 234 C 840 228 900 216 935 204";

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2 sm:py-4 select-none group">
      
      {/* 1. Master Signature SVG Canvas */}
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        <svg
          key={key}
          viewBox="0 0 1000 300"
          className="w-full h-auto max-h-[180px] sm:max-h-[220px] md:max-h-[270px] lg:max-h-[310px] overflow-visible drop-shadow-[0_8px_35px_rgba(42,26,16,0.85)] cursor-pointer"
          onClick={handleReplay}
          title="Click to replay signature animation"
        >
          <defs>
            {/* Primary Golden Malt Gradient for Signature */}
            <linearGradient id="goldSignatureGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFF7E6" />
              <stop offset="25%" stopColor="#F5D79E" />
              <stop offset="55%" stopColor="#D9A441" />
              <stop offset="85%" stopColor="#B07A2E" />
              <stop offset="100%" stopColor="#E6D3B3" />
            </linearGradient>

            {/* Glowing Amber Ink Gradient for Stroke and Flourish */}
            <linearGradient id="inkGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9A441" />
              <stop offset="50%" stopColor="#FFF2D6" />
              <stop offset="100%" stopColor="#B07A2E" />
            </linearGradient>

            {/* Ambient Golden Halo Filter */}
            <filter id="goldHalo" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.85   0 1 0 0 0.64   0 0 1 0 0.25  0 0 0 1 0"
                result="coloredBlur"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dynamic ClipPath for Progressive Handwriting Reveal */}
            <clipPath id={`signatureClip-${key}`}>
              <motion.rect
                x="60"
                y="0"
                height="300"
                initial={{ width: 0 }}
                animate={{ width: animStage === 'signing' ? 880 : 880 }}
                transition={{
                  duration: 1.85,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
            </clipPath>
          </defs>

          {/* BACKGROUND AMBIENT GLOW AURA (Grows as signature completes) */}
          <motion.ellipse
            cx="500"
            cy="170"
            rx="360"
            ry="75"
            fill="radial-gradient(circle, rgba(217,164,65,0.18) 0%, transparent 70%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: animStage === 'finished' ? 0.35 : 0.15 }}
            transition={{ duration: 1 }}
            className="pointer-events-none"
          />

          {/* MAIN SIGNATURE LETTERS (Revealed smoothly under clipPath) */}
          <g clipPath={`url(#signatureClip-${key})`}>
            {/* Soft Ambient Shadow Layer */}
            <text
              x="504"
              y="179"
              textAnchor="middle"
              className="font-signature font-normal tracking-wide fill-black/60 select-none"
              style={{ fontSize: '165px' }}
            >
              Brewocrat
            </text>

            {/* Glowing Golden Stroke Underlayer */}
            <text
              x="500"
              y="175"
              textAnchor="middle"
              className="font-signature font-normal tracking-wide fill-transparent select-none"
              stroke="#D9A441"
              strokeWidth="3.5"
              strokeOpacity="0.4"
              filter="url(#goldHalo)"
              style={{ fontSize: '165px' }}
            >
              Brewocrat
            </text>

            {/* Radiant Master Signature Fill */}
            <text
              x="500"
              y="175"
              textAnchor="middle"
              className={`font-signature font-normal tracking-wide select-none ${
                animStage === 'finished' ? 'signature-shimmer-active' : ''
              }`}
              fill="url(#goldSignatureGrad)"
              style={{
                fontSize: '165px',
                filter: 'drop-shadow(0 2px 10px rgba(217,164,65, 0.45))'
              }}
            >
              Brewocrat
            </text>
          </g>

          {/* SIGNATURE FLOURISH UNDERLINE (Animated SVG Path with loop and flick) */}
          <motion.path
            d={flourishPath}
            fill="none"
            stroke="url(#inkGlowGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldHalo)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: animStage !== 'signing' ? 1 : 0,
              opacity: animStage !== 'signing' ? 1 : 0
            }}
            transition={{
              duration: 0.95,
              ease: [0.34, 1.25, 0.64, 1],
              delay: 0.05
            }}
          />

          {/* Final Flourish Accent Dot (The confident artist signature period) */}
          <motion.circle
            cx="948"
            cy="198"
            r="4"
            fill="#F4E3B4"
            filter="url(#goldHalo)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: animStage === 'finished' ? [0, 1.4, 1] : 0,
              opacity: animStage === 'finished' ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        </svg>

        {/* Subtle Interactive Replay Button (Appears gracefully on completion) */}
        <AnimatePresence>
          {animStage === 'finished' && (
            <motion.button
              onClick={handleReplay}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute -bottom-3 right-4 sm:right-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A1A10]/70 hover:bg-[#2A1A10]/90 border border-[#D9A441]/30 hover:border-[#D9A441] text-[#E6D3B3] hover:text-[#D9A441] text-[11px] font-medium tracking-wider uppercase backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer opacity-70 hover:opacity-100"
              title="Watch signature sign again"
              aria-label="Replay signature animation"
            >
              <FaRotateRight className="text-[10px] group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">Re-Sign</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Accessible Title for SEO & Screen Readers */}
      <h1 className="sr-only">
        Brewocrat - Brewery, Skybar & Kitchen Element One Gurgaon
      </h1>
    </div>
  );
}
