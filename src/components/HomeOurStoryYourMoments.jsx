import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa6';

const MOMENTS_GALLERY = [
  {
    title: 'The Open-Air Courtyard',
    tag: 'Fairy-Lit Pergola',
    image: '/interior/seating2.jpg',
  },
  {
    title: 'Copper Fermenters at 2°C',
    tag: 'Craft Microbrewery',
    image: '/interior/bar.jpg',
  },
  {
    title: 'Skybar Sunset Terrace',
    tag: 'Gurugram Skyline',
    image: '/interior/exterior2.jpg',
  },
  {
    title: 'Artisan Mediterranean Feast',
    tag: 'Wood-Fired & Tapas',
    image: '/images/mediterranean_platter.png',
  },
  {
    title: 'Fresh Draft Pours',
    tag: 'Tank to Glass',
    image: '/images/beers/beer_golden_pour.jpg',
  },
  {
    title: 'The Indoor Salon',
    tag: 'Plush Leather Comfort',
    image: '/interior/interior_seating.jpg',
  },
];

export default function HomeOurStoryYourMoments() {
  return (
    <section id="our-story" className="relative bg-[#0D0805] overflow-hidden border-t border-[#D9A441]/15 py-16 sm:py-24 mediterranean-stucco">
      
      {/* Subtle Mediterranean architectural ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D9A441]/5 blur-[100px] pointer-events-none" />

      {/* 1. SIGNATURE SCRIPT BANNER — FULL PHONE WIDTH */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        <div className="inline-block py-8 px-4 sm:px-12 -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-full rounded-none sm:rounded-3xl md:rounded-t-[4rem] border-y sm:border border-[#D9A441]/25 bg-gradient-to-b from-[#1C1009] via-[#120A06] to-[#0A0503] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* EXACT SCRIPT TITLE MATCHING CLIENT REFERENCE */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-alex text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-[#EFA364] script-gold-shadow leading-none tracking-normal select-none my-2"
          >
            Our story, your moments
          </motion.h2>

          <p className="mt-2 font-serif text-sm sm:text-xl text-[#F7EFE0]/80 font-light italic max-w-xl mx-auto leading-relaxed px-2">
            "Handcrafted grain. Wood-fired sharing. Evenings beneath the open sky."
          </p>
        </div>
      </div>

      {/* 2. PHOTO GALLERY OF REAL MOMENTS — 2 SIDE-BY-SIDE ON PHONE, 3 ON DESKTOP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE0]">
              Moments At Brewocrat
            </h3>
            <span className="text-[11px] text-[#D9A441]/80">Element One, Sector 47</span>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A441] hover:underline"
          >
            <FaInstagram className="text-sm" />
            <span className="hidden sm:inline">Tag @brewocrat.gurgaon</span>
          </a>
        </div>

        {/* Photos side by side: 2 columns on mobile, 3 columns on tablet/desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 md:gap-5">
          {MOMENTS_GALLERY.map((m, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-t-[3rem] border border-[#D9A441]/25 bg-[#120A06] shadow-md hover:shadow-xl cursor-pointer hover:border-[#D9A441]/60 transition-all duration-300"
            >
              <img
                src={m.image}
                alt={m.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/interior/exterior.jpg';
                }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503]/95 via-[#0A0503]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 transform translate-y-0.5 group-hover:translate-y-0 transition-transform">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#D9A441] font-bold block mb-0.5 truncate">
                  {m.tag}
                </span>
                <p className="font-serif text-xs sm:text-base md:text-xl text-[#F7EFE0] font-normal truncate">
                  {m.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
