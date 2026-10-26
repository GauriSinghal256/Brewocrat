import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaCalendarCheck, FaUtensils, FaChampagneGlasses, FaTicket, FaArrowRight, FaLocationDot, FaClock, FaWhatsapp } from 'react-icons/fa6';
import HeroVideoHeader from '../components/HeroVideoHeader';
import EditorialTestimonials from '../components/EditorialTestimonials';

// Edit images / names here
const TAPS = [
  { name: 'Tropical Ale', note: 'Fruity · Citrus', img: '/images/beers/beer_tropical_ale.jpg' },
  { name: 'German Lager', note: 'Crisp · Clean', img: '/images/beers/beer_golden_pour.jpg' },
  { name: 'Pale Ale', note: 'Hoppy · Balanced', img: '/images/beers/beer_pale_ale.jpg' },
  { name: 'Dark Lager', note: 'Smoky · Roasted', img: '/images/beers/beer_dark_lager.jpg' },
];
const ZONES = [
  { name: 'The Salon', note: 'Indoor · ~100', img: '/images/spirits_wine_coolers.png' },
  { name: 'The Courtyard', note: 'Open-air · ~90', img: '/images/cocktails_bar.png' },
  { name: 'The Terrace', note: 'Skybar · ~60', img: '/images/craft_beer_tower.png' },
];
const ROW1 = ['special-dish1.png', 'meat_platter_wings.png', 'mediterranean_platter.png', 'dessert1.jpg', 'bhuna_gosht_curry.png'];
const ROW2 = ['cocktails_bar.png', 'special-dish2.png', 'craft_beer_tower.png', 'plate_shahi_paneer.png', 'appetizers1.jpg'];
const WEEK = ['Sunday Sessions', 'Easy Monday', 'Easy Tuesday', 'Live Band', 'Mixtape Night', 'Bollywood Night', 'Saturday Live'];
const WORDS = ['Fresh Beer', 'Live Music', 'Skybar', 'Kitchen', 'Gurugram'];
const ease = [0.22, 1, 0.36, 1];
const wrap = 'mx-auto max-w-7xl px-5 sm:px-8';
const sec = 'py-16 md:py-28';
const fallback = (e) => { e.currentTarget.src = '/images/maindish1.jpg'; };

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
);
const Title = ({ children }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span className="block" initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>{children}</motion.span>
  </span>
);
const Head = ({ eyebrow, title, to, cta }) => (
  <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
    <div>
      <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-[11px] uppercase tracking-[0.35em] text-[#D9A441]">{eyebrow}</motion.p>
      <h2 className="mt-2 font-serif text-4xl text-[#F7EFE0] md:text-6xl"><Title>{title}</Title></h2>
    </div>
    {to && <Link to={to} className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D9A441] md:flex">{cta} <FaArrowRight /></Link>}
  </div>
);

// image that drifts as you scroll
function PCard({ src, alt, className = '', children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  return (
    <div ref={ref} className={`group relative overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" onError={fallback} style={{ y, scale: 1.2 }}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:brightness-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/90 via-[#2A1A10]/10 to-transparent" />
      {children}
    </div>
  );
}
// 3D tilt on hover (desktop only — touch never fires mousemove)
function Tilt({ children, className = '' }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 16 }), sy = useSpring(ry, { stiffness: 180, damping: 16 });
  return (
    <motion.div className={className} style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 14); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}>{children}</motion.div>
  );
}
function Marquee({ children, reverse = false, duration = 32 }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div className="flex shrink-0 items-center" style={{ width: 'max-content' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {children}{children}
      </motion.div>
    </div>
  );
}

export default function Home({ onOpenBookModal }) {
  useEffect(() => { document.title = 'Brewocrat — Brewery · Skybar · Kitchen | Gurugram'; }, []);
  const { scrollYProgress } = useScroll();
  const tonight = WEEK[new Date().getDay()];
  const quick = [
    { icon: FaCalendarCheck, label: 'Reserve', onClick: onOpenBookModal },
    { icon: FaUtensils, label: 'Menu', to: '/menu' },
    { icon: FaChampagneGlasses, label: 'Parties', to: '/parties' },
    { icon: FaTicket, label: 'Events', to: '/events' },
  ];
  const tile = 'group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#2A1A10]/90 px-2 py-5 text-center backdrop-blur transition hover:-translate-y-1 hover:border-[#D9A441]/70 active:scale-95 md:py-8';
  const plate = (n, i) => (
    <div key={n + i} className="group relative mr-4 aspect-[4/5] w-44 shrink-0 overflow-hidden rounded-3xl sm:w-56 md:mr-6 md:w-72">
      <img src={'/images/' + n} alt="" loading="lazy" onError={fallback} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/60 to-transparent" />
    </div>
  );

  return (
    <div className="w-full overflow-hidden brew-card text-[#E6D3B3] selection:bg-[#D9A441] selection:text-[#2A1A10]">
      <motion.div className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-[#B07A2E] to-[#EBCB86]" style={{ scaleX: scrollYProgress }} />
      <HeroVideoHeader onOpenBookModal={onOpenBookModal} />

      <section className={`${wrap} relative z-10 -mt-10`}>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {quick.map(({ icon: Icon, label, to, onClick }, i) => {
            const inner = (<><Icon className="text-xl text-[#D9A441] transition group-hover:scale-125 md:text-2xl" /><span className="text-[11px] font-bold uppercase tracking-wider text-[#F7EFE0] md:text-xs">{label}</span></>);
            return (
              <motion.div key={label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease }}>
                {to ? <Link to={to} className={tile}>{inner}</Link> : <button onClick={onClick} className={`${tile} w-full`}>{inner}</button>}
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="mt-14 border-y border-white/10 py-5 md:mt-24 md:py-8">
        <Marquee duration={28}>
          {WORDS.map((w, i) => (
            <span key={i} className="mr-8 flex items-center gap-8 whitespace-nowrap font-serif text-4xl uppercase text-transparent [-webkit-text-stroke:1px_#D9A441] md:text-7xl">
              {w}<span className="text-2xl text-[#D9A441] md:text-4xl">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className={sec}>
        <div className={wrap}>
          <Head eyebrow="Brewed in-house" title="On tap" to="/brewhouse" cta="The brewhouse" />
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {TAPS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12} className="min-w-[74%] snap-center sm:min-w-[46%] md:min-w-0">
                <Tilt>
                  <Link to="/menu">
                    <PCard src={t.img} alt={t.name} className="aspect-[3/4] rounded-3xl">
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-serif text-2xl text-[#F7EFE0] md:text-3xl">{t.name}</h3>
                        <p className="text-xs uppercase tracking-widest text-[#EBCB86]">{t.note}</p>
                      </div>
                    </PCard>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sec} brew-card`}>
        <div className={wrap}>
          <Head eyebrow="One address" title="Three moods" />
          <div className="flex flex-col gap-4 md:h-[580px] md:flex-row md:gap-5">
            {ZONES.map((z, i) => (
              <motion.button key={z.name} onClick={onOpenBookModal}
                initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.9, delay: i * 0.12, ease }}
                className="relative h-72 overflow-hidden rounded-3xl text-left transition-[flex] duration-700 ease-out md:h-auto md:flex-1 md:hover:flex-[2.4]">
                <PCard src={z.img} alt={z.name} className="absolute inset-0">
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                    <div>
                      <h3 className="font-serif text-3xl text-[#F7EFE0] md:text-4xl">{z.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-[#EBCB86]">{z.note}</p>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#D9A441] text-[#2A1A10] transition group-hover:rotate-45"><FaArrowRight /></span>
                  </div>
                </PCard>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sec} overflow-hidden`}>
        <div className={wrap}><Head eyebrow="The kitchen" title="Made to share" to="/menu" cta="Full menu" /></div>
        <div className="space-y-4 md:space-y-6">
          <Marquee duration={40}>{ROW1.map(plate)}</Marquee>
          <Marquee duration={46} reverse>{ROW2.map(plate)}</Marquee>
        </div>
        <div className="mt-10 text-center">
          <Link to="/menu" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#B07A2E] to-[#D9A441] px-9 py-4 text-xs font-bold uppercase tracking-widest text-[#2A1A10] transition hover:gap-5 active:scale-95">See the menu <FaArrowRight /></Link>
        </div>
      </section>

      <section className={`${sec} brew-card`}>
        <div className={`${wrap} grid gap-5 md:grid-cols-2 md:gap-8`}>
          <Reveal className="relative overflow-hidden rounded-3xl border border-[#D9A441]/30 bg-gradient-to-br from-[#6B4226] to-[#2A1A10] p-8 md:p-12">
            <motion.div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D9A441]/25 blur-[80px]" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />
            {[12, 30, 48, 66, 84].map((l, i) => (
              <motion.span key={l} aria-hidden className="absolute bottom-0 h-2 w-2 rounded-full bg-[#EBCB86]/60" style={{ left: l + '%' }}
                animate={{ y: [0, -260], opacity: [0, 0.9, 0] }} transition={{ duration: 3.5 + i * 0.4, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }} />
            ))}
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#D9A441]">Tonight</p>
              <h2 className="mt-3 font-serif text-4xl text-[#F7EFE0] md:text-6xl">{tonight}</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={onOpenBookModal} className="rounded-full bg-gradient-to-r from-[#B07A2E] to-[#D9A441] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2A1A10] active:scale-95">Reserve</button>
                <Link to="/events" className="rounded-full border border-white/25 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#F7EFE0] active:scale-95">This week</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 brew-card p-8 md:p-12">
            <div className="space-y-5 text-lg">
              <p className="flex items-start gap-4"><FaLocationDot className="mt-1.5 shrink-0 text-[#D9A441]" /><span>2nd Floor, Element One Mall, Sector 47, Gurugram</span></p>
              <p className="flex items-center gap-4"><FaClock className="shrink-0 text-[#D9A441]" /><span>Daily · 12 PM – 12 AM</span></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.google.com/maps/search/?api=1&query=Brewocrat%20Sector%2047%20Gurugram" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#D9A441] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#D9A441] active:scale-95">Directions</a>
              <a href="https://wa.me/917303203535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#F7EFE0] active:scale-95"><FaWhatsapp /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialTestimonials />
    </div>
  );
}
