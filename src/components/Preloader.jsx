import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';

/*
  Preloader: one brass tap pours a mug of Brewocrat Golden Pour.
  The % counter IS the fill level of the mug, so loading and animation are one thing.

  Smoothness notes
  - One rAF clock drives everything. No React state changes per frame (percent, bar, label,
    handle and liquid are all written straight to the DOM through refs).
  - Stream falls under gravity (accelerates) instead of a constant speed, and tapers in/out.
  - Fill level uses a gentle ease so the pour starts soft and settles softly.
  - Tap handle is eased from the same clock, not toggled by a CSS transition.
  - Curtain exit: content fades first, then the curtain lifts with a curved lip.
  - Scroll is blocked with listeners (no overflow:hidden), so the page never jumps when the
    scrollbar disappears/reappears.
  - After the pour, the curtain waits (max 2.5s) for window "load" so it never lifts onto a
    half-loaded page.
*/
const POUR_START = 600;
const POUR_MS = 2300;
const POUR_S = POUR_MS / 1000;
const RELEASE_T = POUR_S * 0.86;     // seconds into the pour when the tap closes
const G = 9000;                      // stream gravity (svg units / s^2)
const TOTAL_MS = POUR_START + POUR_MS + 700;
const LOAD_CAP_MS = 2500;

const FLOOR = 16, IN_W = 43, MUG_H = 150, H_IN = MUG_H - FLOOR;
const MUG_BASE = 404;          // mug sits here (svg units)
const SPOUT_Y = 196;           // nozzle tip
const SPOUT_LOCAL = SPOUT_Y - MUG_BASE;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const smooth = (t) => t * t * (3 - 2 * t);

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  x: -30 + ((i * 37) % 60), r: 0.9 + ((i * 13) % 10) / 9, d: -((i * 0.47) % 3), s: 2 + ((i * 29) % 15) / 8,
}));

function foamPath(yL, yS, k) {
  if (yL - yS < 0.6) return '';
  const xs = [-IN_W, -25.8, -8.6, 8.6, 25.8, IN_W];
  const off = [0, -3.5, -1, -4, -1.5, -2.5];
  let d = `M${-IN_W},${yL + 1} L${-IN_W},${yS}`;
  for (let i = 1; i < xs.length; i++) {
    const py = yS + off[i - 1] * k, cy = yS + off[i] * k;
    d += ` Q${(xs[i - 1] + xs[i]) / 2},${Math.min(py, cy) - 4 * k} ${xs[i]},${cy}`;
  }
  return `${d} L${IN_W},${yL + 1} Z`;
}
function domePath(d) {
  if (d < 0.6) return '';
  const r = -150;
  return `M-47,-145 C-50,${r - d * 0.55} -40,${r - d * 0.95} -26,${r - d} C-16,${r - d * 1.28} 2,${r - d * 1.2} 12,${r - d * 1.05} C24,${r - d * 1.18} 42,${r - d * 0.85} 47,-145 Z`;
}

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  const root = useRef(null), pctEl = useRef(null), barEl = useRef(null), labelEl = useRef(null);
  const handle = useRef(null);
  const liq = useRef(null), shade = useRef(null), clip = useRef(null);
  const foam = useRef(null), foamP = useRef(null), dome = useRef(null), domeP = useRef(null);
  const dripA = useRef(null), dripB = useRef(null);
  const stream = useRef(null), hi = useRef(null), splash = useRef(null), drops = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const set = (r, o) => { const n = r.current; if (n) for (const k in o) n.setAttribute(k, o[k]); };
    const setLabel = (t) => { if (labelEl.current) labelEl.current.textContent = t; };
    const cleanups = [];

    /* ---- block page scroll without overflow:hidden (no scrollbar jump) ---- */
    const node = root.current;
    if (node) {
      const stop = (e) => e.preventDefault();
      const stopKeys = (e) => { if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) e.preventDefault(); };
      node.addEventListener('wheel', stop, { passive: false });
      node.addEventListener('touchmove', stop, { passive: false });
      window.addEventListener('keydown', stopKeys);
      cleanups.push(() => {
        node.removeEventListener('wheel', stop);
        node.removeEventListener('touchmove', stop);
        window.removeEventListener('keydown', stopKeys);
      });
    }

    /* p = fill progress 0..1, T = seconds since tap opened, e = ms since mount */
    const draw = (p, T, e) => {
      const a = clamp(p / 0.82, 0, 1);
      const l = H_IN * 0.8 * Math.pow(a, 0.92);
      const f = H_IN * 0.2 * Math.pow(a, 1.25);
      const yL = -FLOOR - l, yS = yL - f;
      const dp = clamp((p - 0.82) / 0.18, 0, 1);
      const k = clamp(f / 8, 0, 1);
      set(liq, { y: yL, height: Math.max(l, 0) });
      set(shade, { y: yL, height: Math.max(l, 0) });
      set(clip, { y: yL, height: Math.max(l, 0) });
      const fp = foamPath(yL, yS, k);
      set(foam, { d: fp }); set(foamP, { d: fp });
      const dm = domePath(15 * easeOut(dp));
      set(dome, { d: dm }); set(domeP, { d: dm });
      const la = easeOut(clamp((dp - 0.1) / 0.9, 0, 1)) * 44;
      const lb = easeOut(clamp((dp - 0.35) / 0.65, 0, 1)) * 28;
      set(dripA, { height: Math.max(la, 0), opacity: la > 1 ? 1 : 0 });
      set(dripB, { height: Math.max(lb, 0), opacity: lb > 1 ? 1 : 0 });

      /* stream: leading edge falls under gravity, tail follows once the tap closes */
      const Tr = Math.max(0, T - RELEASE_T);
      const head = SPOUT_LOCAL + 0.5 * G * T * T;
      const top = SPOUT_LOCAL + 0.5 * G * Tr * Tr;
      const bottom = Math.min(head, yS + 2);
      const len = bottom - top, on = T > 0 && len > 1;
      const w = 9 * (0.45 + 0.55 * easeOut(clamp(T / 0.14, 0, 1))) * (1 - 0.5 * clamp(Tr / 0.2, 0, 1));
      set(stream, { x: -w / 2, width: w, y: top, height: on ? len : 0, opacity: on ? 1 : 0 });
      set(hi, { y1: top, y2: bottom, opacity: on ? 0.55 : 0 });
      set(splash, { cy: bottom, opacity: on && head >= yS ? 0.75 * (1 - clamp(Tr / 0.25, 0, 1)) : 0 });
      set(drops, { opacity: clamp(p * 1.3, 0, 1) });

      /* tap handle: eased pull down, eased release */
      const pull = smooth(clamp((e - 450) / 380, 0, 1)) - smooth(clamp((e - (POUR_START + RELEASE_T * 1000)) / 450, 0, 1));
      set(handle, { transform: `scale(1 ${1 - 0.16 * pull})` });
    };

    let lastPct = -1;
    const paint = (p) => {
      if (barEl.current) barEl.current.style.transform = `scaleX(${p})`;
      const n = Math.round(p * 100);
      if (n !== lastPct) { lastPct = n; if (pctEl.current) pctEl.current.textContent = n + '%'; }
    };

    draw(0, 0, 0); paint(0);

    if (reduced) {
      draw(1, POUR_S, 0); paint(1); setLabel('Ready. Cheers.');
      const t = setTimeout(() => setLoading(false), 700);
      cleanups.push(() => clearTimeout(t));
      return () => cleanups.forEach((fn) => fn());
    }

    const t0 = performance.now();
    const tick = (now) => {
      const e = Math.max(0, now - t0);
      const T = clamp((e - POUR_START) / 1000, 0, POUR_S);
      const lin = T / POUR_S;
      const p = lin * 0.55 + 0.45 * (0.5 - 0.5 * Math.cos(Math.PI * lin));   // gentle ease in/out
      draw(p, T, e);
      paint(p);
      if (e < TOTAL_MS) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const timers = [
      setTimeout(() => setLabel('Pouring'), 450),
      setTimeout(() => setLabel('Ready. Cheers.'), POUR_START + POUR_MS),
    ];

    /* lift the curtain once the pour is done AND the page has actually loaded (capped) */
    const finish = () => setLoading(false);
    timers.push(setTimeout(() => {
      if (document.readyState === 'complete') { finish(); return; }
      const cap = setTimeout(finish, LOAD_CAP_MS);
      window.addEventListener('load', finish, { once: true });
      cleanups.push(() => { clearTimeout(cap); window.removeEventListener('load', finish); });
    }, TOTAL_MS));

    cleanups.push(() => { timers.forEach(clearTimeout); cancelAnimationFrame(rafRef.current); });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    if (!loading) { cancelAnimationFrame(rafRef.current); window.__brewDone = true; }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          ref={root}
          data-lenis-prevent
          className="fixed inset-0 z-[99999]"
          style={{ background: '#2E1B0F', willChange: 'transform', touchAction: 'none' }}
          exit={{ y: '-100%', transition: { duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* curved lip that trails the curtain as it lifts */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-full w-full"
            style={{ height: 'min(12vh, 90px)', background: '#2E1B0F', borderRadius: '0 0 50% 50% / 0 0 100% 100%' }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
          >
          <style>{`
            @keyframes plRise{0%{transform:translateY(0);opacity:0}12%{opacity:.85}88%{opacity:.4}100%{transform:translateY(-125px);opacity:0}}
            @keyframes plLetter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
            @keyframes plDrip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(66px);opacity:0}}
            @keyframes plGlow{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
            @keyframes plPulse{0%,100%{opacity:.2;transform:scale(.88)}50%{opacity:.58;transform:scale(1.08)}}
            @keyframes plStream{0%,100%{transform:scaleX(.94)}50%{transform:scaleX(1.06)}}
            .pl-bub{animation:plRise 2.6s linear infinite}
            .pl-letter{opacity:0;animation:plLetter .5s ease forwards}
            .pl-drip{opacity:0;animation:plDrip .7s ease-in ${(POUR_START + POUR_MS) / 1000 + 0.1}s forwards}
            .pl-glow{opacity:0;animation:plGlow ${POUR_MS}ms ease-out ${POUR_START}ms forwards}
            .pl-pulse{transform-box:fill-box;transform-origin:center;animation:plPulse 2.8s ease-in-out infinite}
            .pl-stream{animation:plStream .75s ease-in-out infinite}
            @media (prefers-reduced-motion:reduce){.pl-bub,.pl-letter,.pl-drip,.pl-glow,.pl-pulse,.pl-stream{animation:none;opacity:1}}
          `}</style>

          <div
            className="pl-glow pointer-events-none absolute rounded-full"
            style={{ width: 'min(120vw,760px)', height: 'min(120vw,760px)', background: 'radial-gradient(circle, rgba(217,164,65,.26), transparent 62%)' }}
          />

          <button
            onClick={() => setLoading(false)}
            aria-label="Skip"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9A441]/40 text-[#E6D3B3] transition-colors hover:border-[#D9A441] hover:text-[#D9A441]"
          >
            <FaXmark />
          </button>

          <svg viewBox="30 0 240 440" className="relative h-auto w-[min(42vw,185px)] md:w-[240px]" aria-hidden="true">
            <defs>
              <linearGradient id="plBrass" x1="0" x2="1">
                <stop offset="0" stopColor="#59390F" /><stop offset=".22" stopColor="#C79B45" /><stop offset=".42" stopColor="#F8E3A0" />
                <stop offset=".62" stopColor="#C08F35" /><stop offset="1" stopColor="#4A300C" />
              </linearGradient>
              <linearGradient id="plChrome" x1="0" x2="1">
                <stop offset="0" stopColor="#5E5E5E" /><stop offset=".3" stopColor="#F4F4F4" /><stop offset=".55" stopColor="#A9A9A9" />
                <stop offset=".75" stopColor="#fff" /><stop offset="1" stopColor="#555" />
              </linearGradient>
              <linearGradient id="plWood" x1="0" x2="1">
                <stop offset="0" stopColor="#24120A" /><stop offset=".45" stopColor="#7A4522" /><stop offset="1" stopColor="#24120A" />
              </linearGradient>
              <linearGradient id="plBadge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#E7B44A" /><stop offset="1" stopColor="#B9822A" />
              </linearGradient>
              <linearGradient id="plBeer" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F6D25E" /><stop offset=".55" stopColor="#E0A21C" /><stop offset="1" stopColor="#C77F0C" />
              </linearGradient>
              <linearGradient id="plFoam" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FFFDF4" /><stop offset="1" stopColor="#F6E9C6" />
              </linearGradient>
              <linearGradient id="plShade" x1="0" x2="1">
                <stop offset="0" stopColor="#000" stopOpacity=".38" /><stop offset=".25" stopColor="#fff" stopOpacity=".12" />
                <stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".4" />
              </linearGradient>
              <pattern id="plFoamPat" width="16" height="14" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2.6" fill="rgba(255,255,255,.55)" stroke="rgba(120,80,20,.2)" strokeWidth=".6" />
                <circle cx="12" cy="9" r="3.4" fill="rgba(255,255,255,.45)" stroke="rgba(120,80,20,.18)" strokeWidth=".6" />
                <circle cx="6" cy="12" r="1.7" fill="rgba(255,255,255,.5)" />
              </pattern>
              <clipPath id="plInner">
                <path d={`M${-IN_W},-152 L${-IN_W},-24 Q${-IN_W},-${FLOOR} ${-IN_W + 8},-${FLOOR} L${IN_W - 8},-${FLOOR} Q${IN_W},-${FLOOR} ${IN_W},-24 L${IN_W},-152 Z`} />
              </clipPath>
              <clipPath id="plLiq"><rect ref={clip} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" /></clipPath>
            </defs>

            <ellipse className="pl-pulse" cx="150" cy="405" rx="72" ry="12" fill="#D9A441" opacity=".25" />

            {/* ---------- brass tap with badge handle ---------- */}
            <g transform="translate(150 0)">
              <g transform="translate(0 130)">
                <g ref={handle}>
                  <g transform="translate(0 -130)">
                    <rect x="-7" y="72" width="14" height="62" rx="3" fill="url(#plWood)" />
                    {[88, 106].map((y) => <ellipse key={y} cx="0" cy={y} rx="10" ry="4.5" fill="url(#plWood)" stroke="#120804" strokeOpacity=".5" strokeWidth=".8" />)}
                    <rect x="-9" y="68" width="18" height="8" rx="3" fill="url(#plBrass)" />
                    <path d="M-30,30 Q-30,6 0,6 Q30,6 30,30 L30,62 Q30,78 12,78 L-12,78 Q-30,78 -30,62 Z" fill="url(#plBadge)" stroke="#F4DFA6" strokeOpacity=".7" strokeWidth="1.5" />
                    <path d="M-24,30 Q-24,12 0,12 Q24,12 24,30 L24,61 Q24,72 11,72 L-11,72 Q-24,72 -24,61 Z" fill="none" stroke="#2A1A10" strokeOpacity=".4" strokeWidth="1" />
                    <path d="M-21,20 Q-14,12 -3,12" stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </g>
                </g>
              </g>
              {/* head, faucet, nozzle */}
              <path d="M-36,150 L-36,124 Q-36,100 0,100 Q36,100 36,124 L36,150 Z" fill="url(#plBrass)" />
              <rect x="-38" y="140" width="76" height="10" rx="5" fill="url(#plBrass)" />
              <path d="M-26,116 Q-24,108 -12,106" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
              <rect x="-13" y="124" width="26" height="46" rx="5" fill="url(#plChrome)" />
              <rect x="-16" y="162" width="32" height="8" rx="4" fill="url(#plChrome)" />
              <path d={`M-9,170 L9,170 L6.5,${SPOUT_Y} L-6.5,${SPOUT_Y} Z`} fill="url(#plChrome)" />
              <rect x="-7" y={SPOUT_Y - 2} width="14" height="3.5" rx="1.7" fill="#2a2a2a" />
              <circle className="pl-drip" cx="0" cy={SPOUT_Y + 3} r="3" fill="#F6D25E" />
            </g>

            {/* ---------- mug ---------- */}
            <g transform={`translate(150 ${MUG_BASE})`}>
              <ellipse cx="2" cy="4" rx="60" ry="8" fill="#000" opacity=".5" />
              <path d="M48,-122 C102,-132 104,-30 48,-30" fill="none" stroke="rgba(214,232,255,.30)" strokeWidth="13" strokeLinecap="round" />
              <path d="M48,-122 C102,-132 104,-30 48,-30" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="6" strokeLinecap="round" />
              <path d="M52,-126 C94,-132 96,-34 52,-34" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round" />
              <path d={`M-50,-${MUG_H} L-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L50,-${MUG_H} Z`} fill="rgba(210,230,255,.07)" />

              <g clipPath="url(#plInner)">
                <rect ref={liq} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" fill="url(#plBeer)" />
                <rect ref={shade} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" fill="url(#plShade)" />
                <g clipPath="url(#plLiq)">
                  {BUBBLES.map((b, i) => (
                    <circle key={i} className="pl-bub" cx={b.x} cy={-FLOOR - 4} r={b.r} fill="rgba(255,255,255,.8)" style={{ animationDelay: `${b.d}s`, animationDuration: `${b.s}s` }} />
                  ))}
                </g>
                <path ref={foam} d="" fill="url(#plFoam)" />
                <path ref={foamP} d="" fill="url(#plFoamPat)" opacity=".8" />
              </g>

              <rect ref={stream} className="pl-stream" x="-4.5" y={SPOUT_LOCAL} width="9" height="0" rx="3" fill="#F6D25E" opacity="0" />
              <line ref={hi} x1="-1.2" x2="-1.2" y1={SPOUT_LOCAL} y2={SPOUT_LOCAL} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 9" opacity="0" />
              <ellipse ref={splash} cx="0" cy="-20" rx="11" ry="3" fill="#FFFDF4" opacity="0" />

              <path ref={dome} d="" fill="url(#plFoam)" />
              <path ref={domeP} d="" fill="url(#plFoamPat)" opacity=".8" />
              <rect ref={dripA} x="-21" y="-152" width="7" height="0" rx="3.5" fill="#FFFDF4" stroke="rgba(120,80,20,.25)" strokeWidth=".8" opacity="0" />
              <rect ref={dripB} x="30" y="-152" width="6" height="0" rx="3" fill="#FFFDF4" stroke="rgba(120,80,20,.25)" strokeWidth=".8" opacity="0" />

              <path d={`M-50,-${MUG_H} L-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L50,-${MUG_H}`} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2.6" strokeLinejoin="round" />
              <path d={`M-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L${IN_W},-24 Q${IN_W},-${FLOOR} ${IN_W - 8},-${FLOOR} L${-IN_W + 8},-${FLOOR} Q${-IN_W},-${FLOOR} ${-IN_W},-24 Z`} fill="rgba(235,245,255,.20)" />
              <rect x="-37" y="-136" width="7" height="104" rx="3.5" fill="rgba(255,255,255,.26)" />
              <rect x="30" y="-130" width="3" height="76" rx="1.5" fill="rgba(255,255,255,.15)" />
              <rect x="-50" y="-154" width="7" height="4" rx="2" fill="rgba(255,255,255,.65)" />
              <rect x="43" y="-154" width="7" height="4" rx="2" fill="rgba(255,255,255,.65)" />
              <g ref={drops} opacity="0">
                {[[-38, -112, 2.3], [-31, -72, 1.8], [-40, -42, 2.6], [35, -92, 2.3], [27, -54, 1.8], [8, -30, 2.1]].map(([x, y, r], i) => (
                  <g key={i}><circle cx={x} cy={y} r={r} fill="rgba(255,255,255,.28)" /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.35} fill="rgba(255,255,255,.9)" /></g>
                ))}
              </g>
            </g>
          </svg>

          <div className="relative mt-3 flex gap-[0.18em] font-serif text-3xl tracking-[0.18em] text-[#EBCB86] sm:text-4xl">
            {'BREWOCRAT'.split('').map((l, i) => (
              <span key={i} className="pl-letter" style={{ animationDelay: `${0.2 + i * 0.06}s` }}>{l}</span>
            ))}
          </div>

          <div className="relative mt-5 flex w-[min(70vw,280px)] items-center gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
              <div ref={barEl} className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#B07A2E] to-[#EBCB86]" style={{ transform: 'scaleX(0)', willChange: 'transform' }} />
            </div>
            <span ref={pctEl} className="w-9 text-right font-mono text-xs tabular-nums text-[#D9A441]">0%</span>
          </div>
          <p ref={labelEl} className="relative mt-3 min-h-4 text-center text-xs text-[#E6D3B3]/70" aria-live="polite">Loading Brewocrat</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
