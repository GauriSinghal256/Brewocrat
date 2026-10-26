import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const ease = [0.22, 1, 0.36, 1];
const Z = 'https://b.zmtcdn.com/data/pictures/';
// Edit text / images here
const UNIVERSES = [
  { name: 'The Kitchen', zone: 'The Salon · Indoor', line: 'Wood-fired plates, soft jazz', img: Z + 'chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp' },
  { name: 'The Brewery', zone: 'The Courtyard · Open-air', line: 'Fresh taps, live energy', img: Z + '8/18953618/a6cef196266bc7353481d501e90503fe.jpeg' },
  { name: 'The Skybar', zone: 'The Terrace · Rooftop', line: 'Sundowners above the skyline', img: Z + '8/18953618/800dea653d01ee7809661aa6055d96ca.jpg' },
];

function Photo({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.18 }}
        className="h-full w-full object-cover transition duration-700 group-hover:brightness-110" />
    </div>
  );
}

export default function HomeUniverse({ onOpenBookModal }) {
  return (
    <section id="universes" className="relative overflow-hidden brew-card brew-wall pt-6 pb-8 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="font-serif text-3xl uppercase tracking-wide text-[#F7EFE0] sm:text-5xl md:text-6xl"
          >
            Choose The Evening <span className="italic text-[#D9A441]">You Want.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4 md:h-[560px] md:flex-row md:gap-5">
          {UNIVERSES.map((u, i) => (
            <motion.button key={u.name} onClick={onOpenBookModal} aria-label={`Reserve — ${u.name}`}
              initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
              className="group relative h-72 overflow-hidden rounded-3xl border border-[#D9A441]/15 text-left transition-[flex] duration-700 ease-out md:h-auto md:flex-1 md:hover:flex-[2.3]">
              <Photo src={u.img} alt={u.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/95 via-[#2A1A10]/40 to-[#2A1A10]/15" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <h3 className="mt-1 font-serif text-3xl font-semibold text-[#FFF9EC] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] md:text-4xl">{u.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-700 md:group-hover:max-h-10 md:group-hover:opacity-100">{u.line}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#D9A441] text-[#2A1A10] transition duration-500 group-hover:-rotate-45"><FaArrowRight /></span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
