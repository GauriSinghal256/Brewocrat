import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getItemImage, categoryImages, FALLBACK_IMAGE } from '../data/menuImages';

const ease = [0.22, 1, 0.36, 1];

function Diet({ type }) {
  if (type === 'alcohol') return <span className="text-[10px] leading-none">🍺</span>;
  if (type === 'mocktail') return <span className="text-[10px] leading-none">🥤</span>;
  const c = type === 'veg' ? '#22c55e' : '#f43f5e';
  return (
    <span className="inline-flex items-center justify-center w-3 h-3 border rounded-[2px] p-[2px] shrink-0" style={{ borderColor: c }}>
      <span className="w-full h-full rounded-full" style={{ background: c }} />
    </span>
  );
}

// Left = one big sticky image. Right = the menu, scrolling.
export default function MenuSplit({ items, categories, onAddToCart }) {
  const [hovered, setHovered] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const sectionRefs = useRef({});
  const listRef = useRef(null);

  const groups = useMemo(() => {
    const out = [];
    categories.filter((c) => c.id !== 'all').forEach((c) => {
      const list = items.filter((i) => i.category === c.id);
      if (list.length) out.push({ ...c, list });
    });
    return out;
  }, [items, categories]);

  // Keep the featured image in sync with the category currently in view.
  useEffect(() => {
    setActiveCat(groups[0]?.id || null);
    setHovered(null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveCat(entry.target.dataset.cat)),
      { root: window.matchMedia('(min-width:1024px)').matches ? listRef.current : null, rootMargin: '-8% 0px -72% 0px' }
    );
    Object.values(sectionRefs.current).forEach((element) => element && io.observe(element));
    return () => io.disconnect();
  }, [groups]);

  const activeGroup = groups.find((g) => g.id === activeCat) || groups[0];
  const bigSrc = hovered
    ? getItemImage(hovered)
    : (activeGroup && (categoryImages[activeGroup.id] || FALLBACK_IMAGE)) || FALLBACK_IMAGE;
  const bigKey = hovered ? 'i-' + hovered.name : 'c-' + (activeGroup?.id || '');

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-16">
      <div className="z-10">
        <div className="relative h-[220px] overflow-hidden rounded-2xl border border-[#D9A441]/20 brew-card shadow-[0_30px_80px_-35px_rgba(42,26,16,.9)] sm:h-[300px] lg:h-[min(72vh,720px)]">
          <AnimatePresence mode="sync">
            <motion.img
              key={bigKey}
              src={bigSrc}
              alt=""
              draggable={false}
              onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000"
              style={{ filter: 'brightness(.72) contrast(1.06) saturate(1.04)' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(42,26,16,.9) 0%, rgba(42,26,16,.2) 45%, rgba(42,26,16,.45) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(42,26,16,.55) 100%)' }} />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span className="inline-flex rounded-full border border-[#EBCB86]/40 bg-[#2A1A10]/35 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[#EBCB86] backdrop-blur-md">
              {activeGroup?.name || 'Brewocrat'}
            </span>
            <AnimatePresence mode="wait">
              <motion.div key={hovered?.name || activeGroup?.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p className="mt-4 max-w-md font-serif text-3xl leading-tight text-[#F7EFE0] sm:text-4xl">
                  {hovered?.name || 'Made for the middle of the table.'}
                </p>
                {hovered &&                 <p className="mt-2 text-sm text-[#F7EFE0]/80">₹{hovered.price} <span className="text-[#D9A441]">·</span> {hovered.desc}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-3 hidden text-[9px] uppercase tracking-[0.22em] text-[#E6D3B3]/40 lg:block">A little something for every kind of appetite</p>
      </div>

      <div
        ref={listRef}
        data-lenis-prevent
        className="min-w-0 lg:h-[min(72vh,720px)] lg:overflow-y-auto lg:overscroll-contain lg:py-3 lg:pr-4 lg:[scrollbar-width:thin] lg:[scrollbar-color:#D39333_transparent] lg:[mask-image:linear-gradient(to_bottom,transparent,black_18px,black_calc(100%-28px),transparent)]"
      >
        {groups.map((g) => (
          <section key={g.id} ref={(element) => { sectionRefs.current[g.id] = element; }} data-cat={g.id} className="mb-12 last:mb-0 sm:mb-16">
            <div className="mb-5 flex items-center justify-between border-b border-[#D9A441]/25 pb-3 sm:mb-6">
              <p className="font-serif text-2xl text-[#F7EFE0] sm:text-3xl">{g.name}</p>
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#E6D3B3]/55">{g.list.length} selections</span>
            </div>

            <ul className="divide-y divide-[#D9A441]/[0.12]">
              {g.list.map((it, i) => {
                const on = hovered && hovered.name === it.name;
                return (
                  <motion.li
                    key={it.name + i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, ease, delay: Math.min(i % 5, 4) * 0.025 }}
                    onMouseEnter={() => setHovered(it)}
                    className={`group flex items-center gap-3 py-4 transition-colors sm:gap-4 ${on ? 'bg-[#D9A441]/[0.035]' : ''}`}
                  >
                    <div className={`relative h-[66px] w-[78px] shrink-0 overflow-hidden rounded-lg brew-card border transition-all duration-500 sm:h-[76px] sm:w-[92px] ${on ? 'border-[#D9A441]/70' : 'border-[#D9A441]/10'}`}>
                      <img src={getItemImage(it)} alt={it.name} loading="lazy" draggable={false}
                        onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: 'brightness(.88) saturate(1.02)' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Diet type={it.type} />
                            <span className={`font-serif text-base leading-tight transition-colors duration-300 sm:text-lg ${on ? 'text-[#EBCB86]' : 'text-[#F7EFE0]'}`}>
                              {it.name}
                            </span>
                          </div>
                          {it.badge && (
                            <span className="ml-5 mt-1.5 inline-block text-[8px] font-semibold uppercase tracking-[0.16em] text-[#D9A441]/80">{it.badge}</span>
                          )}
                        </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="font-serif text-base text-[#EBCB86] sm:text-lg">₹{it.price}</span>
                        <button type="button" onClick={() => onAddToCart(it)} aria-label={`Add ${it.name} to cart`}
                          className="rounded-full border border-[#D9A441]/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#EBCB86] transition hover:bg-[#D9A441] hover:text-[#2A1A10]">
                          Add +
                        </button>
                      </div>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-[#E6D3B3]/75 sm:text-xs">{it.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
