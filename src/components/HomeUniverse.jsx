import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const ease = [0.22, 1, 0.36, 1];

const UNIVERSES = [
  {
    name: 'The Salon',
    zone: 'Indoor AC',
    line: 'Intimate acoustic dining',
    img: '/interior/interior_seating.jpg',
  },
  {
    name: 'The Courtyard',
    zone: 'Open-Air Pergola',
    line: 'Live music & open skies',
    img: '/interior/seating2.jpg',
  },
  {
    name: 'The Terrace',
    zone: 'Rooftop Skybar',
    line: 'Skyline views & sundowners',
    img: '/interior/exterior2.jpg',
  },
  {
    name: 'The Microbrewery',
    zone: 'In-House Taps',
    line: 'Fresh draught poured at 2°C',
    img: '/interior/bar.jpg',
  },
];

function Photo({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0A0503]">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.15 }}
        onError={(e) => {
          e.currentTarget.src = '/interior/exterior.jpg';
        }}
        className="h-full w-full object-cover transition duration-700 group-hover:brightness-110"
      />
    </div>
  );
}

export default function HomeUniverse({ onOpenBookModal }) {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#0D0805] pt-[38px] sm:pt-[62px] pb-2 sm:pb-6 border-t border-[#D9A441]/15 mediterranean-pattern">
      {/* Mediterranean subtle amber glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D9A441]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Clean, Visual Header with full comfortable space */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="font-alex text-4xl sm:text-6xl text-[#EFA364] script-gold-shadow leading-tight mt-0.5 mb-1 select-none">
            Every mood has its table
          </div>
          <h2 className="font-display text-[28px] sm:text-[40px] font-semibold text-[#F7EFE0] tracking-[0.02em] mt-1">
            Choose Your <span className="italic font-normal text-[#D9A441]">Atmosphere</span>
          </h2>
        </div>

        {/* 4 Atmospheric Realms: Full Phone Width on Mobile, Expandable Slats on Desktop */}
        <div className="flex flex-col gap-4 sm:gap-6 md:h-[580px] md:flex-row md:gap-4">
          {UNIVERSES.map((u, i) => (
            <motion.button
              key={u.name}
              onClick={onOpenBookModal}
              aria-label={`Reserve — ${u.name}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className={`group relative -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto h-[340px] sm:h-[420px] md:h-auto overflow-hidden rounded-none sm:rounded-3xl md:rounded-t-[3.5rem] md:rounded-b-2xl border-t sm:border border-[#D9A441]/30 ${
                i === UNIVERSES.length - 1 ? 'border-b-0 sm:border-b' : 'border-b'
              } text-left transition-[flex] duration-700 ease-out md:flex-1 md:hover:flex-[2.5] cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)]`}
            >
              <Photo src={u.img} alt={u.name} />
              
              {/* Deep dark Mediterranean vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503]/95 via-[#120A06]/45 to-[#0A0503]/25" />
              
              {/* Mediterranean Arch Highlight Border on top */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D9A441]/50 to-transparent" />

              {/* Bottom Info: Clean, Minimal, Visual */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-7 z-10">
                  <div>
                    <h3 className="font-display text-[26px] sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
                      {u.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-light text-[#E6D3B3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-700 md:group-hover:max-h-12 md:group-hover:opacity-100">
                      {u.line}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full bg-[#D9A441] text-[#0D0805] transition duration-500 group-hover:-rotate-45 shadow-lg group-hover:scale-110">
                    <FaArrowRight className="text-xs sm:text-sm" />
                  </span>
                </div>
              </motion.button>
            ))}
        </div>

      </div>
    </section>
  );
}
