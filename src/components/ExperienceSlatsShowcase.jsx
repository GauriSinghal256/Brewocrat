import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBriefcase, FaMusic, FaBeerMugEmpty, FaCakeCandles, FaArrowRight, FaCalendarCheck, FaCheck } from 'react-icons/fa6';

const ease = [0.22, 1, 0.36, 1];

export default function ExperienceSlatsShowcase({ onOpenBookModal }) {
  const [activeId, setActiveId] = useState('corporate');
  const touchStartX = useRef(null);

  const experiences = [
    {
      id: 'family',
      num: '01',
      title: 'FAMILY GATHERING',
      subtitle: 'Warm Comfort & Multi-Cuisine Feasts',
      desc: 'Generous dining tables, kid-friendly multi-cuisine favourites, intimate acoustics, and wood-fired sharing platters in our climate-controlled salon.',
      highlights: ['Spacious Family Booths', 'Kid-Friendly Menu Options', 'Intimate Acoustic Dining'],
      icon: FaUsers,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
      buttonText: 'Reserve Family Table'
    },
    {
      id: 'corporate',
      num: '02',
      title: 'CORPORATE MEETING',
      subtitle: 'Productive Mixers & Team Celebrations',
      desc: 'High-speed Wi-Fi, private lounge zones, fresh craft draught beer on flow, and curated multi-course business buffets for company celebrations & mixers.',
      highlights: ['AV Presentation Support', 'Curated Corporate Packages', 'GST Billing Ready'],
      icon: FaBriefcase,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/512291b716cdc11a22c515ae092cbdcb.jpg',
      buttonText: 'Book Corporate Event'
    },
    {
      id: 'dj',
      num: '03',
      title: 'DJ SETS',
      subtitle: 'High-Voltage Weekend Nightlife',
      desc: 'Live resident & guest DJs spinning commercial Bollywood, Punjabi club hits & electronic house under Gurugram’s starry skybar terrace.',
      highlights: ['Weekend Live DJs', 'Concert-Grade Acoustics', 'Signature Cocktail Pitchers'],
      icon: FaMusic,
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
      buttonText: 'Reserve Party Lounge'
    },
    {
      id: 'gatherings',
      num: '04',
      title: 'GATHERINGS',
      subtitle: 'Breezy Courtyard Socials & Sundowners',
      desc: 'Open-air courtyard energy, 3-litre craft beer towers at the table, live sports screenings on giant displays, and casual high-top tables for your crew.',
      highlights: ['Fairy-Lit Pergola Seating', 'Live Match Screenings', 'Ice-Cored Beer Towers'],
      icon: FaBeerMugEmpty,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp',
      buttonText: 'Gather Your Crew'
    },
    {
      id: 'parties',
      num: '05',
      title: 'PARTIES',
      subtitle: 'Birthdays, Anniversaries & Milestones',
      desc: 'Bespoke party decor, dedicated bar team, custom celebration cake presentation, and private terrace cabanas for your unforgettable milestone.',
      highlights: ['Private Terrace Cabanas', 'Dedicated Service Butler', 'Tailored Celebration Menus'],
      icon: FaCakeCandles,
      image: '/images/slider-1.jpg',
      buttonText: 'Plan A Celebration'
    }
  ];

  const activeIndex = experiences.findIndex((item) => item.id === activeId);

  useEffect(() => {
    if (window.innerWidth >= 768) return undefined;

    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = experiences.findIndex((item) => item.id === currentId);
        return experiences[(currentIndex + 1) % experiences.length].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const swipeDistance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 50) return;

    setActiveId((currentId) => {
      const currentIndex = experiences.findIndex((item) => item.id === currentId);
      const nextIndex = swipeDistance < 0
        ? (currentIndex + 1) % experiences.length
        : (currentIndex - 1 + experiences.length) % experiences.length;
      return experiences[nextIndex].id;
    });
  };

  const BookBtn = ({ item, className = '' }) => (
    <button onClick={(e) => { e.stopPropagation(); onOpenBookModal(); }}
      className={`group/btn relative inline-flex items-center gap-2 rounded-xl border border-[#EBCB86]/55 bg-[#D9A441]/65 font-bold uppercase tracking-wide text-[#2A1A10] shadow-[0_4px_18px_rgba(42,26,16,0.25)] transition active:scale-95 md:gap-3 md:rounded-full md:tracking-wider ${className}`}>
      <FaCalendarCheck className="relative text-xs" />
      <span className="relative">{item.buttonText}</span>
      <FaArrowRight className="relative text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
    </button>
  );

  return (
    <section id="experience-slats" className="relative overflow-hidden brew-card brew-wall pt-12 pb-16 select-none sm:pt-16 sm:pb-24 md:pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          className="mx-auto mb-0 max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-normal uppercase tracking-wide text-[#F7EFE0] sm:text-5xl md:text-6xl">
            Moments At <span className="italic text-[#D9A441]">Brewocrat</span>
          </h2>
        </motion.div>

        {/* Desktop: smooth accordion */}
        <div className="hidden h-[580px] gap-0 md:flex lg:h-[640px]">
          {experiences.map((item) => {
            const on = activeId === item.id;
            const Icon = item.icon;
            return (
              <motion.div key={item.id} initial={false} animate={{ flexGrow: on ? 3.6 : 0.8 }} transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                onMouseEnter={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)} style={{ flexBasis: 0 }}
                className="relative h-full min-w-0 cursor-pointer overflow-hidden border-0">
                <motion.img src={item.image} alt={item.title} loading="lazy" decoding="async" initial={false}
                  animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.4 }} transition={{ duration: 1.2, ease }}
                  className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-[#2A1A10]/80 to-[#160D08]/20" />

                <div className={`absolute inset-0 flex flex-col items-center justify-between px-2 py-8 transition-opacity duration-500 ${on ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'}`}>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#D9A441]">{item.num}</span>
                  <span className="whitespace-nowrap font-serif text-base font-semibold uppercase tracking-[0.16em] text-[#F7EFE0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] lg:text-lg" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{item.title}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9A441]/30 brew-card text-[#D9A441]"><Icon className="text-xs" /></span>
                </div>

                <div className={`absolute inset-y-0 left-0 flex w-[min(560px,46vw)] flex-col justify-between p-8 transition-opacity duration-700 lg:p-12 ${on ? 'opacity-100 delay-300' : 'pointer-events-none opacity-0'}`}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#D9A441]/35 bg-[#2A1A10]/90 px-3 py-1 font-mono text-sm font-bold text-[#D9A441]">{item.num}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9A441]/40 bg-[#D9A441]/20 text-[#D9A441]"><Icon className="text-sm" /></span>
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="mb-1 max-w-md font-display text-2xl font-medium italic uppercase leading-tight tracking-[0.04em] text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] lg:text-4xl">{item.title}</h3>
                    <p className="mb-6 max-w-lg text-xs font-normal leading-relaxed text-[#FFF9EC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] lg:text-sm">{item.desc}</p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {item.highlights.map((chip) => (
                        <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-[#D9A441]/30 bg-[#2A1A10]/80 px-3 py-1 text-[10px] font-medium text-[#F7EFE0] lg:text-[11px]">
                          <FaCheck className="text-[9px] text-[#D9A441]" />{chip}
                        </span>
                      ))}
                    </div>
                    <BookBtn item={item} className="self-start min-w-[210px] justify-center px-5 py-3.5 text-xs" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: full-width moving moments */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden md:hidden">
          <motion.div
            className="flex touch-pan-y"
            animate={{ x: `${-activeIndex * 100}%` }}
            transition={{ duration: 0.9, ease }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {experiences.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative h-[540px] w-full shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} loading={idx === 0 ? 'eager' : 'lazy'} decoding="async"
                    fetchPriority={idx === 0 ? 'high' : 'auto'} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-[#2A1A10]/85 to-[#160D08]/20" />
                  <div className="relative flex h-full flex-col justify-between px-5 py-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold tracking-widest text-[#D9A441]">{item.num}</span>
                      <Icon className="text-base text-[#D9A441]" />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="mb-1 max-w-[17rem] font-display text-[1.35rem] font-medium italic uppercase leading-[1.15] tracking-[0.03em] text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] sm:text-2xl">{item.title}</h3>
                      <p className="mb-5 max-w-[22rem] text-[13px] font-normal leading-[1.55] text-[#FFF9EC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">{item.desc}</p>
                      <BookBtn item={item} className="self-start min-w-0 px-4 py-3 text-[10px] sm:min-w-[190px]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
          <div className="mt-2 flex items-center justify-center gap-2 bg-[#160D08] py-1">
            {experiences.map((item, i) => (
              <button key={item.id} onClick={() => setActiveId(item.id)} aria-label={item.title}
                className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-gradient-to-r from-[#D9A441] to-[#B07A2E]' : 'w-2 bg-[#A4452A]/25'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
