import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBriefcase, FaMusic, FaBeerMugEmpty, FaCakeCandles } from 'react-icons/fa6';

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
      desc: 'Intimate family dining with sharing platters in climate-controlled comfort.',
      icon: FaUsers,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
      buttonText: 'Reserve Family Table'
    },
    {
      id: 'corporate',
      num: '02',
      title: 'CORPORATE MEETING',
      subtitle: 'Productive Mixers & Team Celebrations',
      desc: 'Private lounge zones, fresh craft draught beer on tap, and curated business buffets.',
      icon: FaBriefcase,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/512291b716cdc11a22c515ae092cbdcb.jpg',
      buttonText: 'Book Corporate Event'
    },
    {
      id: 'dj',
      num: '03',
      title: 'DJ SETS',
      subtitle: 'High-Voltage Weekend Nightlife',
      desc: 'Live resident & guest DJs spinning club hits under the starry skybar terrace.',
      icon: FaMusic,
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
      buttonText: 'Reserve Party Lounge'
    },
    {
      id: 'gatherings',
      num: '04',
      title: 'GATHERINGS',
      subtitle: 'Breezy Courtyard Socials & Sundowners',
      desc: 'Open-air courtyard energy, live sports screenings, and 3L craft beer towers.',
      icon: FaBeerMugEmpty,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp',
      buttonText: 'Gather Your Crew'
    },
    {
      id: 'parties',
      num: '05',
      title: 'PARTIES',
      subtitle: 'Birthdays, Anniversaries & Milestones',
      desc: 'Private terrace cabanas, bespoke decor, and custom celebration cake setups.',
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

  return (
    <section id="celebrate" className="relative overflow-hidden bg-[#0D0805] pt-5 pb-6 select-none sm:pt-8 sm:pb-10 border-t border-[#D9A441]/15 mediterranean-stucco">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
          className="mx-auto mb-3 sm:mb-5 max-w-3xl text-center">
          <h2 className="font-alex text-4xl sm:text-5xl md:text-6xl text-[#EFA364] script-gold-shadow leading-tight select-none">
            Moments crafted for celebration
          </h2>
        </motion.div>

        {/* Desktop: smooth accordion with Mediterranean Arch silhouette */}
        <div className="hidden h-[510px] gap-0 md:flex lg:h-[570px] xl:h-[600px] rounded-3xl md:rounded-t-[3.5rem] overflow-hidden border border-[#D9A441]/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {experiences.map((item) => {
            const on = activeId === item.id;
            return (
              <motion.div key={item.id} initial={false} animate={{ flexGrow: on ? 3.6 : 0.8 }} transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                onMouseEnter={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)} style={{ flexBasis: 0 }}
                className="relative h-full min-w-0 cursor-pointer overflow-hidden border-0">
                <motion.img src={item.image} alt={item.title} loading="lazy" decoding="async" initial={false}
                  animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.4 }} transition={{ duration: 1.2, ease }}
                  className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#140C07]/80 to-[#0A0503]/20" />

                <div className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-8 transition-opacity duration-500 ${on ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'}`}>
                  <span className="whitespace-nowrap font-serif text-base font-semibold uppercase tracking-[0.16em] text-[#F7EFE0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] lg:text-lg" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{item.title}</span>
                </div>

                <div className={`absolute inset-y-0 left-0 flex w-[min(560px,46vw)] flex-col justify-end p-8 transition-opacity duration-700 lg:p-12 ${on ? 'opacity-100 delay-300' : 'pointer-events-none opacity-0'}`}>
                  <div className="flex flex-col items-start">
                    <h3 className="mb-1 max-w-md font-display text-3xl font-medium italic uppercase leading-tight tracking-[0.04em] text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] lg:text-5xl">{item.title}</h3>
                    <span className="text-xs uppercase font-medium tracking-[0.2em] text-[#D9A441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] lg:text-sm mt-1">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: full-width moving moments (Unboxed luxury edge-to-edge view) */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden md:hidden">
          <motion.div
            className="flex touch-pan-y"
            animate={{ x: `${-activeIndex * 100}%` }}
            transition={{ duration: 0.9, ease }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {experiences.map((item, idx) => {
              return (
                <div key={item.id} className="relative h-[485px] sm:h-[510px] w-full shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} loading={idx === 0 ? 'eager' : 'lazy'} decoding="async"
                    fetchPriority={idx === 0 ? 'high' : 'auto'} className="absolute inset-0 h-full w-full object-cover" />
                  
                  {/* Deep Dark Mediterranean Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0D0805]/80 to-[#0A0503]/25" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,5,3,0.85)_100%)]" />

                  <div className="relative flex h-full flex-col justify-end p-6 pb-7">
                    {/* Bottom Info: Clean, Visual, Actionable */}
                    <div className="flex flex-col items-start">
                      <h3 className="mb-1 font-display text-3xl font-medium italic uppercase leading-tight tracking-[0.03em] text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#D9A441]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Dots Indicator */}
          <div className="mt-2.5 flex items-center justify-center gap-2 bg-[#0D0805] py-1">
            {experiences.map((item, i) => (
              <button key={item.id} onClick={() => setActiveId(item.id)} aria-label={item.title}
                className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-gradient-to-r from-[#D9A441] to-[#EFA364] shadow-[0_0_10px_rgba(217,164,65,0.6)]' : 'w-2 bg-[#D9A441]/25'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
