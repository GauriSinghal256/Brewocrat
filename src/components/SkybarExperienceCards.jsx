import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

export default function SkybarExperienceCards({ onOpenBookModal }) {
  const experiences = [
    {
      id: 'skybar-terrace',
      title: 'The Sunset Skybar Terrace',
      subtitle: 'Where Golden Hour Meets Gurugram',
      pill: 'Open-Air Skyline',
      desc: 'Perched on the 2nd floor terrace of Element One. Sip freshly tapped Tropical Ale while watching twilight paint the horizon in amber and rose.',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg'
    },
    {
      id: 'brewery-vault',
      title: 'The Copper Brewery Lounge',
      subtitle: 'The Heart of Handcrafted Beer',
      pill: 'Microbrewery Vats',
      desc: 'Plush velvet and leather seating right beside our gleaming copper brewing kettles. An intimate, aromatic atmosphere bathed in warm amber glow.',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp'
    },
    {
      id: 'live-evenings',
      title: 'Live Evenings & Sports Arena',
      subtitle: 'Electric Beats & Big Screen Thrills',
      pill: 'DJ & Match Nights',
      desc: 'From weekend DJ sets and soulful acoustic sessions to stadium-like live sports screenings, Brewocrat is where Gurgaon celebrates every victory.',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 brew-wall overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 pb-8 border-b border-[#D9A441]/20">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
                04 / The Spaces
              </span>
              <span className="w-8 h-px bg-[#D9A441]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] uppercase font-normal tracking-wide">
              Three Spaces. <span className="italic text-[#D9A441]">One Vibe.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#E6D3B3]/80 max-w-md font-light leading-relaxed">
            Whether you seek an intimate candlelit dinner on the open terrace or high-energy celebrations
            with your crew, Brewocrat adapts to your evening.
          </p>
        </div>

        {/* 3 Action Cards (Tengile MalaMala Inspired) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onClick={onOpenBookModal}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Media Card with Parallax Image & Floating Pill Label */}
              <div className="relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#D9A441]/20 group-hover:border-[#D9A441]/60 transition-all duration-500 shadow-2xl mb-6">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108"
                />
                
                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C18] via-[#2A1A10]/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Tengile-Style Floating Pill Group */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0D0805]/90 text-[#EBCB86] border border-[#D9A441]/35 text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                    {exp.pill}
                  </span>

                  <span className="w-9 h-9 rounded-full bg-[#D9A441] text-[#0D0805] flex items-center justify-center text-xs shadow-md transition-colors">
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* Bottom Overlay Description */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase font-bold tracking-[0.18em] text-[#D9A441] block mb-1">
                    {exp.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE0] uppercase font-normal leading-tight group-hover:text-[#D9A441] transition-colors">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Caption under card */}
              <p className="text-xs sm:text-sm text-[#E6D3B3]/80 font-light leading-relaxed">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
