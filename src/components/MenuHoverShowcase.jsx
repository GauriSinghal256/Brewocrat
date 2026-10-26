import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getItemImage, FALLBACK_IMAGE } from '../data/menuImages';

const ease = [0.22, 1, 0.36, 1];
const pad = (n) => String(n + 1).padStart(2, '0');

function Diet({ type }) {
  if (type === 'alcohol') return <span className="text-[11px]">🍺</span>;
  if (type === 'mocktail') return <span className="text-[11px]">🥤</span>;
  const c = type === 'veg' ? 'border-emerald-500 bg-emerald-500' : 'border-rose-500 bg-rose-500';
  return (
    <span className={`inline-flex items-center justify-center w-3.5 h-3.5 border rounded-sm p-[2px] ${c.split(' ')[0]}`}>
      <span className={`w-full h-full rounded-full ${c.split(' ')[1]}`} />
    </span>
  );
}

// Left: premium sticky preview that follows whatever you hover on the right.
function Preview({ item, index, total, categoryName }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const src = getItemImage(item);
  const key = item.name;

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="mx-frame relative w-full aspect-[16/11] lg:aspect-[4/5] rounded-[4px] overflow-hidden brew-card border border-[#D9A441]/25 shadow-[0_40px_90px_-20px_rgba(42,26,16,0.95),0_0_80px_-30px_rgba(217,164,65,0.35)]"
      >
        {/* Images crossfade with a soft zoom + blur */}
        <AnimatePresence mode="sync">
          <motion.div
            key={key}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.18, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1.06, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.0, filter: 'blur(8px)' }}
            transition={{ duration: 0.9, ease }}
            style={{ x: px, y: py }}
          >
            <img
              src={src}
              alt={item.name}
              draggable={false}
              onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }}
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(1.08) contrast(1.06) brightness(.92)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic grading */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(42,26,16,.96) 0%, rgba(42,26,16,.55) 38%, rgba(42,26,16,.05) 70%, rgba(42,26,16,.45) 100%)' }} />
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(42,26,16,.6) 100%)' }} />
        <div className="mx-sweep" />

        {/* Top meta */}
        <div className="absolute top-6 left-6 right-6 z-[6] flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#EBCB86] font-semibold pl-8 pt-1">{categoryName}</span>
          <span className="text-[10px] tracking-[0.3em] text-[#E6D3B3]/70 font-mono pr-8 pt-1">{pad(index)} / {String(total).padStart(2, '0')}</span>
        </div>

        {/* Giant outlined index */}
        <AnimatePresence mode="wait">
          <motion.div
            key={'n' + key}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease }}
            className="absolute right-5 top-14 z-[3] font-serif leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(90px,12vw,170px)', color: 'transparent', WebkitTextStroke: '1px rgba(217,164,65,.35)' }}
          >
            {pad(index)}
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute left-0 right-0 bottom-0 z-[6] p-6 sm:p-8" style={{ transform: 'translateZ(60px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={'c' + key}
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Diet type={item.type} />
                {item.badge && (
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold px-2 py-1 border border-[#D9A441]/60 text-[#EBCB86]">{item.badge}</span>
                )}
                <span className="h-px flex-1 bg-gradient-to-r from-[#D9A441]/60 to-transparent" />
              </div>
              <h3 className="font-serif text-white leading-[1.02] mb-3" style={{ fontSize: 'clamp(28px,3.2vw,46px)' }}>{item.name}</h3>
              <p className="text-[13px] text-[#E6D3B3]/75 leading-relaxed max-w-md mb-4">{item.desc}</p>
              <div className="font-serif text-[#EBCB86] text-3xl tracking-wide">₹{item.price}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function MenuHoverShowcase({ items, categories, onOpenBookModal }) {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // Reset when the filtered list changes
  useEffect(() => { setActive(0); }, [items]);

  const safe = Math.min(active, items.length - 1);
  const item = items[safe];
  const catName = (categories.find((c) => c.id === item.category) || {}).name || 'Brewocrat';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 lg:gap-16 items-start">
      {/* LEFT — sticky preview */}
      <div className="lg:sticky lg:top-32 z-10">
        <Preview item={item} index={safe} total={items.length} categoryName={catName} />
        <p className="hidden lg:block mt-5 text-[10px] uppercase tracking-[0.35em] text-[#E6D3B3]/40 text-center">
          Hover a dish to preview
        </p>
      </div>

      {/* RIGHT — list */}
      <ul ref={listRef} className="mx-list">
        {items.map((it, i) => (
          <motion.li
            key={it.name + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: Math.min(i % 8, 7) * 0.04 }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            tabIndex={0}
            className={`mx-row cursor-pointer py-4 sm:py-5 outline-none ${i === safe ? 'is-active' : ''}`}
          >
            <div className="flex items-baseline gap-4">
              <span className={`font-mono text-[11px] w-6 shrink-0 transition-colors duration-300 ${i === safe ? 'text-[#EBCB86]' : 'text-[#D9A441]/40'}`}>{pad(i)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <Diet type={it.type} />
                  <h4 className={`font-serif text-lg sm:text-2xl leading-tight transition-all duration-500 ${i === safe ? 'text-[#EBCB86] translate-x-1' : 'text-[#F7EFE0]'}`}>
                    {it.name}
                  </h4>
                  {it.badge && (
                    <span className="hidden sm:inline text-[9px] uppercase tracking-[0.2em] font-bold px-1.5 py-0.5 bg-[#A4452A] text-white">{it.badge}</span>
                  )}
                  <span className="flex-1 border-b border-dotted border-[#D9A441]/25 mx-1 translate-y-[-4px] hidden sm:block" />
                  <span className="font-serif text-lg sm:text-xl text-[#D9A441] shrink-0 ml-auto sm:ml-0">₹{it.price}</span>
                </div>
                <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-out" style={{ gridTemplateRows: i === safe ? '1fr' : '0fr', opacity: i === safe ? 1 : 0 }}>
                  <div className="overflow-hidden">
                    <p className="text-xs text-[#E6D3B3]/60 leading-relaxed pt-2 pr-4 pl-[26px] lg:hidden">{it.desc}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onOpenBookModal && onOpenBookModal(); }}
                      className="mt-2 pl-[26px] text-[10px] uppercase tracking-[0.25em] text-[#D9A441] hover:text-white transition-colors"
                    >
                      Book a table & order →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
