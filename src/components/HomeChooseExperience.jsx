import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaWineGlass, FaUsers, FaMusic, FaBeerMugEmpty } from 'react-icons/fa6';

const ZONES = [
  {
    id: 'indoor',
    number: '01',
    name: 'The Indoor Salon',
    type: 'Indoor AC',
    capacity: '100 Guests',
    subtitle: 'Climate-controlled comfort & plush leather dining',
    desc: 'Deep walnut wood, warm ambient booth lighting, intimate acoustic dining, and cold craft pints straight from our conditioning tanks.',
    image: '/interior/interior_seating.jpg',
    tag: 'Comfort & Fine Dining',
    icon: FaUsers,
  },
  {
    id: 'courtyard',
    number: '02',
    name: 'The Courtyard',
    type: 'Open-Air',
    capacity: '90 Guests',
    subtitle: 'Cobblestone terrace beneath fairy-lit pergolas',
    desc: 'Open-air communal tables, live band stage, match screenings on giant displays, and 3-litre craft beer towers shared with your crew.',
    image: '/interior/seating2.jpg',
    tag: 'Live Bands & High Energy',
    icon: FaMusic,
  },
  {
    id: 'terrace',
    number: '03',
    name: 'The Skybar Terrace',
    type: 'Rooftop',
    capacity: '70 Guests',
    subtitle: 'Gurugram skyline & golden hour sundowners',
    desc: 'Unobstructed starry sky views, rooftop evening breezes, artisanal botanical cocktails, and sunset chill sessions above the city.',
    image: '/interior/exterior2.jpg',
    tag: 'Sundowner & Skybar',
    icon: FaWineGlass,
  },
  {
    id: 'microbrewery',
    number: '04',
    name: 'The Microbrewery',
    type: 'Brewhouse',
    capacity: '4 Live Taps',
    subtitle: 'Gleaming copper tanks & tank-to-glass pours',
    desc: 'The beating heart of Brewocrat. European brew kettles, the aroma of toasted Bavarian malt, cold fermentation, and fresh pints poured at 2°C.',
    image: '/interior/bar.jpg',
    tag: 'Tank to Glass · 2°C',
    icon: FaBeerMugEmpty,
  },
];

function ZoneCard({ zone, isActive, onSelect, onOpenBookModal }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const Icon = zone.icon;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onSelect}
      onClick={onSelect}
      className={`group relative h-[480px] sm:h-[540px] md:h-[600px] overflow-hidden rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
        isActive
          ? 'md:flex-[2.8] border-[#D9A441]/70 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
          : 'md:flex-1 border-white/10 opacity-85 hover:opacity-100 hover:border-[#D9A441]/30'
      }`}
    >
      {/* Background Image with Parallax */}
      <motion.img
        src={zone.image}
        alt={zone.name}
        loading="lazy"
        style={{ y, scale: 1.15 }}
        onError={(e) => {
          e.currentTarget.src = '/interior/exterior.jpg';
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-120"
      />

      {/* Cinematic Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140C07]/95 via-[#2A1A10]/50 to-[#2A1A10]/20 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#140C07]/70 to-transparent pointer-events-none" />

      {/* Top Meta Pill */}
      <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1A110B]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] backdrop-blur-md">
          <Icon className="text-xs text-[#D9A441]" />
          <span>{zone.type}</span>
        </span>
        <span className="font-serif text-lg font-light text-[#EBCB86]/70">
          {zone.number}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D9A441] mb-1 block">
          {zone.tag}
        </span>
        
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7EFE0] font-normal leading-tight">
          {zone.name}
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-[#E6D3B3]/90 font-light line-clamp-1">
          {zone.subtitle}
        </p>

        {/* Expanded Description & Reserve Button */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isActive ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-0'
          }`}
        >
          <p className="text-xs text-[#E6D3B3]/80 leading-relaxed font-light mb-4">
            {zone.desc}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
            <span className="text-[11px] text-[#EBCB86] font-medium tracking-wide">
              Capacity: {zone.capacity}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenBookModal();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D9A441] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#2A1A10] transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <span>Reserve Zone</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeChooseExperience({ onOpenBookModal }) {
  const [activeZoneId, setActiveZoneId] = useState('indoor');

  return (
    <section id="experience" className="relative py-20 sm:py-28 brew-wall overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D9A441]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C76B42]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D9A441]/30 bg-[#2A1A10]/60 backdrop-blur-md mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9A441] font-bold">
              02 / CHOOSE YOUR EXPERIENCE
            </span>
          </div>

          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1">
            Every mood has its table
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-tight mt-1 mb-4">
            Four Unique Atmospheres <span className="italic text-[#D9A441]">At One Address.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E6D3B3]/75 font-light leading-relaxed">
            Whether you desire the intimate acoustic warmth of our indoor salon, the lively energy of our open-air courtyard, a sunset sundowner on the skybar terrace, or fresh cold pours right by our brewery tanks — Brewocrat has your table ready.
          </p>
        </div>

        {/* 4 Interactive Zone Cards (Accordion on desktop, responsive grid on mobile) */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
          {ZONES.map((zone) => (
            <ZoneCard
              key={zone.id}
              zone={zone}
              isActive={activeZoneId === zone.id}
              onSelect={() => setActiveZoneId(zone.id)}
              onOpenBookModal={onOpenBookModal}
            />
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#1A110B]/60 p-4 sm:p-5 text-xs text-[#E6D3B3]/75 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3E9B6A]" />
            <span>Valet parking available at Element One Mall entrance</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D9A441] font-semibold">Need custom table arrangements?</span>
            <a
              href="https://wa.me/917303203535"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7EFE0] underline hover:text-[#D9A441] transition"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

      </div>

    </section>
  );
}
