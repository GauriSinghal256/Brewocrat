import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroVideoHeader({ onOpenBookModal }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="hero-video-section relative flex w-full items-center justify-center overflow-hidden bg-[#2A1A10]" style={{ minHeight: 0, margin: 0, padding: 0 }}>
      
      {/* 1. Fullscreen Cinematic Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/wdpnzbti/video/upload/v1791346129/beaurocrat.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-30'
          }`}
          style={{ filter: 'brightness(0.95) contrast(1.05)' }}
        />

        {/* 2. Cinematic Video Overlay (Deep espresso vignette & warm ambient amber glow) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2A1A10]/35 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" />
      </div>

      <motion.img
        src="/Logopng-02.png"
        alt="Brewocrat"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 h-auto w-[min(46vw,230px)] object-contain drop-shadow-[0_8px_35px_rgba(42,26,16,0.75)]"
      />

      {/* 3. Video CTAs */}
      <div className="absolute bottom-8 left-1/2 z-30 flex w-[min(90vw,430px)] -translate-x-1/2 items-center justify-between gap-3">
        <Link
          to="/menu"
          className="whitespace-nowrap rounded-full border border-[#F7EFE0]/45 bg-[#2A1A10]/55 px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] !text-[#F7EFE0]/90 backdrop-blur-sm transition-all duration-300 hover:border-[#F7EFE0]/80 hover:bg-[#2A1A10]/75 sm:px-4 sm:text-xs lg:px-6 lg:py-3.5"
        >
          Explore the menu
        </Link>
        <button
          onClick={onOpenBookModal}
          className="whitespace-nowrap rounded-full border border-[#D9A441]/60 bg-[#2A1A10]/65 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F7EFE0]/90 backdrop-blur-sm transition-all duration-300 hover:border-[#D9A441] hover:bg-[#2A1A10]/80 hover:text-[#D9A441] sm:px-5 sm:text-xs lg:px-7 lg:py-3.5"
        >
          Book a table
        </button>
      </div>

    </section>
  );
}
