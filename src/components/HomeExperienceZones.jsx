import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaVolumeHigh,
  FaWind,
  FaWineGlass,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa6';

export default function HomeExperienceZones({ onOpenBookModal }) {
  const [activeZone, setActiveZone] = useState('salon');
  const prefersReducedMotion = useReducedMotion();
  const revealTransition = {
    duration: prefersReducedMotion ? 0 : 0.65,
    ease: [0.22, 1, 0.36, 1]
  };

  const zones = [
    {
      id: 'salon',
      name: 'The Salon',
      subtitle: 'Indoor Dining & Acoustic Jazz',
      capacity: 'Indoor • ~100 Pax',
      tag: 'Conversational & Elegant',
      soundLevel: 'Moderate • Acoustic / Jazz',
      air: 'Air-Conditioned Comfort',
      idealFor: 'Family dinners, corporate lunches, formal date nights & conversational dining',
      description:
        'Air-conditioned, conversational, dinner-forward. Designed for softer jazz, family dinners, corporate lunches and guests who want world-class food and music without losing the intimacy of conversation.',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
      features: [
        'Climate-controlled temperature year-round',
        'Direct view of the gleaming microbrewery vats',
        'Plush velvet & leather booth arrangements',
        'Balanced acoustics for effortless conversations'
      ]
    },
    {
      id: 'courtyard',
      name: 'The Courtyard',
      subtitle: 'The Social Energy Hub',
      capacity: 'Open-Air Courtyard • ~90 Pax',
      tag: 'Electric & Live Acts',
      soundLevel: 'High-Energy • Live Bands & DJs',
      air: 'Open-Air Social Breezes',
      idealFor: 'Weekend crews, live band enthusiasts, match screenings & celebratory toasts',
      description:
        'The social centre of Brewocrat: open-air energy, live band performances, stadium screenings, and groups that want to sit right inside the vibrant pulse of Gurugram nightlife.',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp',
      features: [
        'Central stage for live music & weekend DJ sets',
        'Communal craft beer tasting tables & high-tops',
        'Direct access to the 6 in-house draught beer taps',
        'Electric atmosphere under fairy-lit pergolas'
      ]
    },
    {
      id: 'terrace',
      name: 'The Super Terrace',
      subtitle: 'Rooftop Horizon & Sundowners',
      capacity: 'Elevated Terrace • ~60 Pax',
      tag: 'Open Sky & Twilight',
      soundLevel: 'Lounge Beats & Ambient House',
      air: 'Panoramic Open Sky',
      idealFor: 'Birthdays, sundowner parties, cocktail hours & private social gatherings',
      description:
        'Open sky, elevated privacy, and a looser late-evening feel. Perched on the 2nd floor terrace of Element One, it is the premier spot for golden-hour sundowners, cocktail craft, and private milestone celebrations.',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
      features: [
        'Panoramic views of Gurugram’s skyline',
        'Private lounge pods available for reservation',
        'Bespoke sunset cocktail bar service',
        'Starlit seating with cozy heaters in winter'
      ]
    }
  ];

  const current = zones.find((z) => z.id === activeZone) || zones[0];

  return (
    <section id="experience" className="relative isolate py-20 sm:py-28 brew-wall overflow-hidden text-[#E6D3B3]">
      
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[min(90vw,1000px)] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(217,164,65,0.12),transparent_68%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(199,107,66,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={revealTransition}
          className="flex flex-col mb-10 sm:mb-12 pb-8 border-b border-[#D9A441]/20"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#D9A441]/60" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
                ONE ADDRESS • THREE MOODS
              </span>
              <span className="w-8 h-px bg-[#D9A441]/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] uppercase font-normal tracking-wide leading-[1.08]">
              Choose The Evening <span className="italic text-[#D9A441]">You Want.</span>
            </h2>
          </div>

          <p className="mt-4 max-w-3xl text-sm sm:text-base text-[#E6D3B3]/75 font-light leading-relaxed">
            One venue should never feel like just one room. Brewocrat’s indoor salon, open-air courtyard,
            and elevated super terrace allow you to book the exact atmosphere you desire.
          </p>
        </motion.div>

        {/* Zone Selector Tabs */}
        <div className="grid grid-cols-1 gap-3 mb-6 sm:mb-8 sm:flex sm:overflow-x-auto sm:pb-2 sm:-mx-1 sm:px-1 sm:snap-x sm:snap-mandatory">
          {zones.map((zone, index) => {
            const isSelected = zone.id === activeZone;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                aria-pressed={isSelected}
                className={`relative isolate w-full sm:w-auto sm:shrink-0 sm:snap-start sm:min-w-[250px] text-left px-5 py-4 rounded-2xl border transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                  isSelected
                    ? 'border-[#D9A441]/70 bg-[#D9A441]/[0.08] shadow-[0_12px_36px_rgba(217,164,65,0.12)]'
                    : 'border-[#D9A441]/20 bg-[#2A1A10]/40 hover:border-[#D9A441]/50 hover:bg-[#D9A441]/[0.04]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-zone-glow"
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#D9A441]/[0.09] to-transparent"
                    transition={{ type: 'spring', stiffness: 250, damping: 28 }}
                  />
                )}
                <span className="flex items-center justify-between gap-4">
                  <span className={`font-mono text-xs ${isSelected ? 'text-[#EBCB86]' : 'text-[#E6D3B3]/35'}`}>
                    0{index + 1}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.18em] ${isSelected ? 'text-[#EBCB86]' : 'text-[#E6D3B3]/45'}`}>
                    {zone.capacity.split('•')[1]?.trim() || ''}
                  </span>
                </span>
                <span className={`block mt-2 font-serif text-lg sm:text-xl ${isSelected ? 'text-[#F7EFE0]' : 'text-[#E6D3B3]/75'}`}>
                  {zone.name}
                </span>
                <span className={`block mt-1 text-[10px] uppercase tracking-[0.12em] ${isSelected ? 'text-[#E6D3B3]/70' : 'text-[#E6D3B3]/40'}`}>
                  {zone.tag}
                </span>
                <span className={`absolute left-5 right-5 bottom-0 h-px origin-left transition-transform duration-500 ${isSelected ? 'scale-x-100 bg-gradient-to-r from-[#EBCB86] to-transparent' : 'scale-x-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Active Zone Interactive Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            transition={revealTransition}
            className="relative rounded-3xl bg-gradient-to-br from-[#6B4226] via-[#2A1A10] to-[#2A1A10] border border-[#D9A441]/30 p-5 sm:p-8 lg:p-10 shadow-[0_30px_90px_rgba(42,26,16,0.7)] grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center overflow-hidden"
          >
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#EBCB86]/70 to-transparent" />
            {/* Left: Zone Details */}
            <motion.div
              className="relative z-10 lg:col-span-7 flex flex-col justify-between"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07, delayChildren: prefersReducedMotion ? 0 : 0.08 } }
              }}
            >
              <div>
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-[11px] uppercase tracking-wider font-bold">
                    {current.capacity}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F7EFE0]/[0.06] text-[#F7EFE0]/80 border border-white/[0.08] text-[11px] uppercase tracking-wider font-medium">
                    {current.tag}
                  </span>
                </motion.div>

                <motion.h3 variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EFE0] font-normal mb-2">
                  {current.name}
                </motion.h3>
                <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="text-sm sm:text-base text-[#D9A441] font-medium tracking-wide mb-5">
                  {current.subtitle}
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="text-sm sm:text-base text-[#E6D3B3]/80 leading-relaxed mb-6 font-light max-w-2xl">
                  {current.description}
                </motion.p>

                {/* Key Metrics / Attributes */}
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#2A1A10]/45 border border-[#D9A441]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center text-xs shrink-0">
                      <FaVolumeHigh />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#D9A441] block font-bold">Sound Vibe</span>
                      <span className="text-xs text-[#F7EFE0]">{current.soundLevel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center text-xs shrink-0">
                      <FaWind />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#D9A441] block font-bold">Ambiance</span>
                      <span className="text-xs text-[#F7EFE0]">{current.air}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {current.features.map((feat, i) => (
                    <motion.div key={i} variants={{ hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -8 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-2.5 text-xs text-[#E6D3B3]/85">
                      <FaCheck className="text-[#D9A441] text-[11px] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-5 border-t border-[#D9A441]/15">
                <button
                  onClick={onOpenBookModal}
                  className="w-full sm:w-auto justify-center text-center px-5 sm:px-6 py-3.5 rounded-full bg-gradient-to-r from-[#EBCB86] via-[#D9A441] to-[#B07A2E] text-[#2A1A10] font-bold text-[10px] sm:text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-[0_8px_30px_rgba(217,164,65,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <span>Reserve Table in {current.name}</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <a
                  href="https://wa.me/917303203535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-5 py-3.5 rounded-full bg-transparent hover:bg-[#D9A441]/[0.06] border border-[#D9A441]/30 hover:border-[#D9A441]/70 text-[#E6D3B3] text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
                >
                  Enquire Group Booking
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Immersive Photography */}
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="hidden sm:block lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-[#D9A441]/30 shadow-[0_24px_60px_rgba(42,26,16,0.5)] group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.name}
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={revealTransition}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10] via-[#2A1A10]/10 to-[#2A1A10]/15 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,rgba(42,26,16,0.35)_100%)] pointer-events-none" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2A1A10]/55 border border-[#D9A441]/35 backdrop-blur-md">
                  <FaWineGlass className="text-[10px] text-[#EBCB86]" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#F7EFE0]">{current.name}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-xl bg-[#2A1A10]/65 backdrop-blur-md border border-[#D9A441]/30">
                  <span className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold block">
                    Ideal Occasion
                  </span>
                  <span className="mt-1 block text-xs sm:text-sm text-[#F7EFE0] font-light leading-relaxed">
                    {current.idealFor}
                  </span>
                </div>
              </div>
              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-3 sm:-right-5 px-4 py-2 rounded-full brew-card border border-[#D9A441]/35 shadow-xl text-[9px] uppercase tracking-[0.2em] text-[#EBCB86]"
              >
                Your night, your way
              </motion.div>
            </motion.div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
