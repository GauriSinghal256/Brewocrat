import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaWheatAwn, FaSeedling, FaLandmark, FaPeopleGroup, FaMusic } from 'react-icons/fa6';

export default function BrandPhilosophy({ onOpenBookModal }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.28, 1]);

  const brandPillars = [
    {
      icon: FaWheatAwn,
      title: 'Craft Beer',
      desc: 'Brewed fresh on-site without artificial preservatives or additives.'
    },
    {
      icon: FaSeedling,
      title: 'Pure Nature',
      desc: 'Bavarian grains, imported Czech noble hops & mineral brewing water.'
    },
    {
      icon: FaLandmark,
      title: 'Architecture',
      desc: 'Chic rooftop skybar, warm terracotta accents, open terrace views.'
    },
    {
      icon: FaPeopleGroup,
      title: 'Community',
      desc: 'Where friends, families & colleagues gather over shared plates & laughter.'
    },
    {
      icon: FaMusic,
      title: 'Good Vibes',
      desc: 'Curated playlists, live DJ weekends & twilight skyline match screenings.'
    }
  ];

  return (
    <section ref={sectionRef} id="brand-story" className="relative isolate py-24 sm:py-32 brew-wall overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.img
          src="/home/home.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: prefersReducedMotion ? 1 : imageScale }}
        />
        <motion.div
          className="absolute inset-0 brew-card"
          style={{ opacity: prefersReducedMotion ? 0.72 : overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A1A10]/35 via-transparent to-[#2A1A10]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A10]/25 via-transparent to-[#2A1A10]/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Suptitle & Main Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D9A441]/70" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              02 / The Golden Malt Ethos
            </span>
            <span className="w-8 h-px bg-[#D9A441]/70" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] uppercase font-normal tracking-wide leading-[1.15] [text-shadow:0_4px_28px_rgba(42,26,16,0.8)]">
            Where Golden Hops, Wood Fire <br className="hidden sm:inline" />
            <span className="italic text-[#D9A441] font-light">& Rooftop Skylines</span> Meet
          </h2>

          <div className="font-script text-2xl sm:text-3xl text-[#EBCB86] mt-4 drop-shadow-[0_2px_14px_rgba(42,26,16,0.9)]">
            Fresh Beer. Great Food. Better Together.
          </div>

          <p className="mt-6 text-sm sm:text-base text-[#F7EFE0]/90 max-w-3xl mx-auto font-light leading-relaxed [text-shadow:0_2px_12px_rgba(42,26,16,0.95)]">
            Perched atop Element One in Sector 47, Brewocrat was founded on a simple truth:
            extraordinary craft beer brings people closer. Our microbrewery celebrates the alchemy
            of traditional brewing methods, honest ingredients, and vibrant social warmth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: prefersReducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center items-center gap-4 mb-16 sm:mb-20"
        >
          <button
            onClick={onOpenBookModal}
            className="pill-btn-primary group cursor-pointer"
          >
            <span>Reserve An Evening</span>
            <span className="pill-icon-circle">
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </button>

          <Link
            to="/about"
            className="pill-btn-outline group cursor-pointer"
          >
            <span>Our Heritage & Team</span>
          </Link>
        </motion.div>

        {/* Brand Elements 5 Pillars Row (From User's Brand Board) */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-10 rounded-3xl bg-[#2A1A10]/55 border border-[#D9A441]/30 backdrop-blur-sm shadow-[0_25px_80px_rgba(42,26,16,0.4)]"
        >
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold block mb-1">
              Core Brand Elements
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F7EFE0] uppercase font-normal">
              What Defines The Brewocrat Experience
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            {brandPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2A1A10]/80 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] text-xl mb-3 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#D9A441] group-hover:bg-[#D9A441]/10">
                    <IconComp />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#F7EFE0] uppercase font-medium mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-[#D8C3A5] leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

    </section>
  );
}
