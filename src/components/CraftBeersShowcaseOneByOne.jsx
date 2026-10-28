import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';

/* ------------------------------------------------------------------ */
/*  Beer data                                                          */
/* ------------------------------------------------------------------ */
const BEERS = [
  {
    id: 'golden-pour',
    title: 'GOLDEN POUR',
    label: ['GOLDEN', 'POUR'],
    abv: '5.0%', ibu: '22', temp: '2°C',
    badge: ['#E7B44A', '#B9822A'], badgeInk: '#2A1A10',
    liquid: ['#F6D25E', '#E0A21C', '#C77F0C'],
    foam: ['#FFFDF4', '#F6E9C6'],
    accent: 'rgba(217,164,65,0.30)',
  },
  {
    id: 'tropical-ale',
    title: 'TROPICAL ALE',
    label: ['TROPICAL', 'ALE'],
    abv: '4.8%', ibu: '15', temp: '2°C',
    badge: ['#F0963A', '#C2621A'], badgeInk: '#2A1A10',
    liquid: ['#F8CE7A', '#EDA23A', '#D9822A'],
    foam: ['#FFFAF0', '#F8E8CC'],
    accent: 'rgba(238,145,34,0.30)',
  },
  {
    id: 'pale-ale',
    title: 'CRAFT PALE ALE',
    label: ['PALE', 'ALE'],
    abv: '5.4%', ibu: '34', temp: '3°C',
    badge: ['#C9683A', '#8E3A1C'], badgeInk: '#FFF3DF',
    liquid: ['#E59A3C', '#C26A1C', '#A04E10'],
    foam: ['#FFF8EA', '#F2DDB8'],
    accent: 'rgba(199,107,66,0.32)',
  },
  {
    id: 'dark-lager',
    title: 'SMOKY DARK LAGER',
    label: ['DARK', 'LAGER'],
    abv: '5.2%', ibu: '20', temp: '4°C',
    badge: ['#4A2A1A', '#22110A'], badgeInk: '#E9BE63',
    liquid: ['#5A2A14', '#31150A', '#1B0A04'],
    foam: ['#EBD3A8', '#CDA876'],
    accent: 'rgba(120,64,40,0.38)',
  },
];

/* ------------------------------------------------------------------ */
/*  Stage geometry (SVG user units)                                    */
/* ------------------------------------------------------------------ */
const TAP_X = [175, 325, 475, 625];
const BAR_Y = 384;          // counter edge, pillars stand here
const SPOUT_Y = 300;        // tip of the nozzle
const PIVOT_Y = 236;        // handle pivot
const HOSE_Y = 346;         // python line height
const MUG_BASE = 556;       // mug sits on the drip tray here
const MUG_H = 150;
const FLOOR = 16;           // thick glass base
const IN_W = 43;            // half inner width
const H_IN = MUG_H - FLOOR; // fillable height
const SPOUT_LOCAL = SPOUT_Y - MUG_BASE;

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */
const FADE_MS = 380;
const ENTER_MS = 700;
const POUR_MS = 3600;
const REST_MS = 2600;
const RELEASE_AT = 0.9;     // handle is released here
const FULL_AT = 0.82;       // beer + foam reach the rim here; froth then domes over
const CYCLE_MS = FADE_MS + ENTER_MS + POUR_MS + REST_MS;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  x: -32 + ((i * 37) % 64),
  r: 0.9 + ((i * 13) % 10) / 9,
  delay: -((i * 0.47) % 3.2),
  dur: 2.2 + ((i * 29) % 15) / 8,
}));

const DROPS = [
  [-38, -112, 2.3], [-31, -72, 1.8], [-40, -42, 2.6], [20, -122, 1.6],
  [35, -92, 2.3], [27, -54, 1.8], [-12, -100, 1.4], [8, -30, 2.1], [-24, -128, 1.5],
];

function foamPath(yL, yS, k) {
  if (yL - yS < 0.6) return '';
  const xs = [-IN_W, -25.8, -8.6, 8.6, 25.8, IN_W];
  const off = [0, -3.5, -1, -4, -1.5, -2.5];
  let d = `M${-IN_W},${yL + 1} L${-IN_W},${yS + off[0] * k}`;
  for (let i = 1; i < xs.length; i++) {
    const py = yS + off[i - 1] * k;
    const cy = yS + off[i] * k;
    d += ` Q${(xs[i - 1] + xs[i]) / 2},${Math.min(py, cy) - 4 * k} ${xs[i]},${cy}`;
  }
  return `${d} L${IN_W},${yL + 1} Z`;
}

function surfacePath(yS, wobble) {
  return `M-${IN_W},${yS} Q-22,${yS - wobble} -10,${yS} T${IN_W},${yS}`;
}

function domePath(d) {
  if (d < 0.6) return '';
  const r = -150;
  return (
    `M-47,-145 C-50,${r - d * 0.55} -40,${r - d * 0.95} -26,${r - d} ` +
    `C-16,${r - d * 1.28} 2,${r - d * 1.2} 12,${r - d * 1.05} ` +
    `C24,${r - d * 1.18} 42,${r - d * 0.85} 47,-145 Z`
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function CraftBeersShowcaseOneByOne({ onOpenBookModal }) {
  const [idx, setIdx] = useState(0);          // selected tap (drives the info panel)
  const [run, setRun] = useState(0);          // bump to replay the pour
  const [mugIdx, setMugIdx] = useState(0);    // tap the mug is currently under
  const [mugUp, setMugUp] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [dripping, setDripping] = useState(false);
  const [status, setStatus] = useState('Choose a handle');
  const [isPlaying, setIsPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const camRef = useRef(0);
  const playingRef = useRef(true);
  const phaseRef = useRef('idle');

  const liqRef = useRef(null);
  const shadeRef = useRef(null);
  const liqClipRef = useRef(null);
  const foamRef = useRef(null);
  const foamPatRef = useRef(null);
  const domeRef = useRef(null);
  const domePatRef = useRef(null);
  const dripARef = useRef(null);
  const dripBRef = useRef(null);
  const streamRef = useRef(null);
  const streamHiRef = useRef(null);
  const splashRef = useRef(null);
  const surfaceRef = useRef(null);
  const dropsRef = useRef(null);
  const glowRef = useRef(null);

  const mugBeer = BEERS[mugIdx];

  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);

  /* media queries */
  useEffect(() => {
    const mqN = window.matchMedia('(max-width: 640px)');
    const mqR = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setNarrow(mqN.matches); setReduced(mqR.matches); };
    sync();
    mqN.addEventListener('change', sync);
    mqR.addEventListener('change', sync);
    return () => { mqN.removeEventListener('change', sync); mqR.removeEventListener('change', sync); };
  }, []);

  /* start pouring only once the stage is on screen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------------- imperative drawing of the mug ---------------- */
  const setA = (ref, attrs) => {
    const n = ref.current;
    if (!n) return;
    for (const k in attrs) n.setAttribute(k, attrs[k]);
  };

  const draw = useCallback((p) => {
    const a = clamp(p / FULL_AT, 0, 1);
    const liq = H_IN * 0.8 * Math.pow(a, 0.92);
    const foam = H_IN * 0.2 * Math.pow(a, 1.25);
    const yL = -FLOOR - liq;
    const yS = yL - foam;
    const dp = clamp((p - FULL_AT) / (1 - FULL_AT), 0, 1);
    const dome = 15 * easeOut(dp);
    const k = clamp(foam / 8, 0, 1);

    setA(liqRef, { y: yL, height: Math.max(liq, 0) });
    setA(shadeRef, { y: yL, height: Math.max(liq, 0) });
    setA(liqClipRef, { y: yL, height: Math.max(liq, 0) });
    const fp = foamPath(yL, yS, k);
    setA(foamRef, { d: fp });
    setA(foamPatRef, { d: fp });
    setA(surfaceRef, { d: surfacePath(yS, 1.5 + Math.sin(p * Math.PI * 8) * 1.5), opacity: a > 0.08 ? 0.7 : 0 });
    const dm = domePath(dome);
    setA(domeRef, { d: dm });
    setA(domePatRef, { d: dm });

    const la = easeOut(clamp((dp - 0.1) / 0.9, 0, 1)) * 44;
    const lb = easeOut(clamp((dp - 0.35) / 0.65, 0, 1)) * 28;
    setA(dripARef, { height: Math.max(la, 0), opacity: la > 1 ? 1 : 0 });
    setA(dripBRef, { height: Math.max(lb, 0), opacity: lb > 1 ? 1 : 0 });

    /* the stream */
    const t = (p * POUR_MS) / 1000;
    const head = SPOUT_LOCAL + 1500 * t;
    const bottom = Math.min(head, yS + 2);
    const top = p > RELEASE_AT ? SPOUT_LOCAL + 1500 * ((p - RELEASE_AT) * POUR_MS) / 1000 : SPOUT_LOCAL;
    const len = bottom - top;
    const streamWidth = 7.5 + Math.sin(p * Math.PI * 14) * 1.2;
    const on = p > 0 && len > 1;
    setA(streamRef, { x: -streamWidth / 2, y: top, width: streamWidth, height: on ? len : 0, opacity: on ? 1 : 0 });
    setA(streamHiRef, { y1: top, y2: bottom, opacity: on ? 0.55 : 0 });
    setA(splashRef, {
      cy: bottom,
      rx: 8 + Math.sin(p * Math.PI * 18) * 3,
      ry: 2.5 + Math.abs(Math.sin(p * Math.PI * 12)) * 2,
      opacity: on && head >= yS ? 0.85 : 0,
    });

    setA(dropsRef, { opacity: clamp(p * 1.3, 0, 1) });
    setA(glowRef, { opacity: clamp((p - 0.5) * 0.7, 0, 0.35) });
  }, []);

  /* ---------------- pour sequence ---------------- */
  useEffect(() => {
    if (!inView) return undefined;
    let dead = false;
    let raf = 0;
    const timers = [];
    const T = (fn, ms) => timers.push(setTimeout(() => { if (!dead) fn(); }, ms));

    setPulling(false);
    setDripping(false);

    if (reduced) {
      setMugIdx(idx); setMugUp(true); draw(1);
      setStatus('Poured. Cheers.');
      phaseRef.current = 'rest';
      return () => { dead = true; };
    }

    phaseRef.current = 'enter';
    setMugUp(false);
    T(() => { draw(0); setMugIdx(idx); setMugUp(true); setStatus('Placing the mug'); }, FADE_MS);
    T(() => {
      setPulling(true);
      setStatus('Pouring');
      phaseRef.current = 'pour';
      const t0 = performance.now();
      const tick = (now) => {
        if (dead) return;
        const p = Math.min((now - t0) / POUR_MS, 1);
        draw(p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, FADE_MS + ENTER_MS);
    T(() => setPulling(false), FADE_MS + ENTER_MS + POUR_MS * RELEASE_AT);
    T(() => { setDripping(true); setStatus('Poured. Cheers.'); phaseRef.current = 'rest'; }, FADE_MS + ENTER_MS + POUR_MS);
    T(() => { if (playingRef.current) setIdx((i) => (i + 1) % BEERS.length); }, CYCLE_MS);

    return () => { dead = true; timers.forEach(clearTimeout); cancelAnimationFrame(raf); };
  }, [idx, run, inView, reduced, draw]);

  /* ---------------- camera: pan along the tower on phones ---------------- */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    if (!narrow) { svg.setAttribute('viewBox', '0 20 800 590'); return undefined; }
    const target = clamp(TAP_X[idx] - 210, 0, 380);
    const from = camRef.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (now) => {
      const k = clamp((now - t0) / 700, 0, 1);
      camRef.current = from + (target - from) * easeOut(k);
      svg.setAttribute('viewBox', `${camRef.current} 20 420 590`);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [idx, narrow]);

  const select = (i) => { setIdx(i); setRun((r) => r + 1); };

  const togglePlay = () => {
    if (isPlaying) { setIsPlaying(false); return; }
    setIsPlaying(true);
    playingRef.current = true;
    if (phaseRef.current === 'rest') setIdx((i) => (i + 1) % BEERS.length);
  };

  const hosePath = `M${TAP_X[0]},${HOSE_Y} H730 Q760,${HOSE_Y} 760,${HOSE_Y + 30} V${BAR_Y + 10}`;
  const flowPath = `M760,${BAR_Y + 10} V${HOSE_Y + 30} Q760,${HOSE_Y} 730,${HOSE_Y} H${TAP_X[mugIdx]}`;
  const mugX = TAP_X[mugIdx];

  return (
    <section
      id="craft-beers-spotlight"
      ref={sectionRef}
      className="relative w-full bg-[#0D0805] text-[#F7EFE0] overflow-hidden border-t border-b border-[#D9A441]/15 mediterranean-pattern"
    >
      <style>{`
        @keyframes btsRise{0%{transform:translateY(0);opacity:0}12%{opacity:.85}88%{opacity:.45}100%{transform:translateY(-128px);opacity:0}}
        @keyframes btsFlow{to{stroke-dashoffset:-24}}
        @keyframes btsDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes btsStream{0%,100%{filter:brightness(1);transform:scaleX(.92)}50%{filter:brightness(1.25);transform:scaleX(1.08)}}
        @keyframes btsGlowPulse{0%,100%{opacity:.28;transform:scale(.94)}50%{opacity:.62;transform:scale(1.04)}}
        @keyframes btsSurface{0%,100%{stroke-dashoffset:0;opacity:.45}50%{stroke-dashoffset:-12;opacity:.9}}
        @keyframes btsDrip{0%{transform:translateY(0);opacity:0}12%{opacity:1}80%{opacity:1}100%{transform:translateY(70px);opacity:0}}
        @keyframes btsProg{from{width:0}to{width:100%}}
        @keyframes btsIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .bts-bub{animation:btsRise 3s linear infinite}
        .bts-flow{animation:btsFlow .5s linear infinite}
        .bts-bokeh{animation:btsDrift 9s ease-in-out infinite}
        .bts-stream{animation:btsStream .8s ease-in-out infinite}
        .bts-glow-pulse{transform-box:fill-box;transform-origin:center;animation:btsGlowPulse 3.2s ease-in-out infinite}
        .bts-surface{animation:btsSurface 1.15s ease-in-out infinite}
        .bts-dripdrop{animation:btsDrip 1.1s ease-in forwards}
        .bts-handle{cursor:pointer;outline:none}
        .bts-hov{transition:transform .25s ease}
        .bts-handle:hover .bts-hov,.bts-handle:focus-visible .bts-hov{transform:translateY(-6px)}
        .bts-handle:focus-visible .bts-ring{opacity:1}
        @media (prefers-reduced-motion:reduce){
            .bts-bub,.bts-flow,.bts-bokeh,.bts-stream,.bts-glow-pulse,.bts-surface,.bts-dripdrop{animation:none}
        }
      `}</style>

      {/* warm light behind the tower, tinted by the beer in the mug */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-[1400ms] ease-out"
        style={{ background: `radial-gradient(ellipse 55% 45% at 50% 42%, ${mugBeer.accent} 0%, transparent 72%)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 pt-3 sm:pt-8 pb-4 sm:pb-8">
        {/* Header: Pure Visual Focus */}
        <div className="text-center max-w-2xl mx-auto mb-1 sm:mb-3 px-2">
          <h2 className="font-alex text-2xl xs:text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1 select-none">
            Four Signature Drafts. Poured Fresh.
          </h2>
        </div>

        {/* ---------------- Stage ---------------- */}
        <div className="relative mt-2 sm:mt-6 mx-auto w-[85%] sm:w-full max-w-[330px] sm:max-w-[520px] md:max-w-[700px] select-none">
          <svg
            ref={svgRef}
            viewBox={narrow ? '0 20 420 590' : '0 20 800 590'}
            className="w-full h-auto block touch-pan-y"
            role="group"
            aria-label="Beer tap tower with four taps and a mug being filled"
          >
            <defs>
              <linearGradient id="btsBrass" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#59390F" />
                <stop offset=".22" stopColor="#C79B45" />
                <stop offset=".42" stopColor="#F8E3A0" />
                <stop offset=".62" stopColor="#C08F35" />
                <stop offset="1" stopColor="#4A300C" />
              </linearGradient>
              <linearGradient id="btsChrome" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#5E5E5E" />
                <stop offset=".3" stopColor="#F4F4F4" />
                <stop offset=".55" stopColor="#A9A9A9" />
                <stop offset=".75" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#555" />
              </linearGradient>
              <linearGradient id="btsWood" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#24120A" />
                <stop offset=".45" stopColor="#7A4522" />
                <stop offset="1" stopColor="#24120A" />
              </linearGradient>
              <radialGradient id="btsGlow">
                <stop offset="0" stopColor="#FFC85A" stopOpacity=".55" />
                <stop offset="1" stopColor="#FFC85A" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="btsBokeh">
                <stop offset="0" stopColor="#FFBE5A" stopOpacity=".5" />
                <stop offset=".6" stopColor="#FFAA46" stopOpacity=".18" />
                <stop offset="1" stopColor="#FFAA46" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="btsBar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#4A2D18" />
                <stop offset=".08" stopColor="#2C1A0E" />
                <stop offset="1" stopColor="#140A04" />
              </linearGradient>
              <linearGradient id="btsReflFade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="btsReflMask" maskUnits="userSpaceOnUse" x="0" y={BAR_Y} width="800" height="130">
                <rect x="0" y={BAR_Y} width="800" height="130" fill="url(#btsReflFade)" />
              </mask>
              <linearGradient id="btsTray" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#3A3A3A" />
                <stop offset="1" stopColor="#151515" />
              </linearGradient>
              <pattern id="btsGrille" width="9" height="10" patternUnits="userSpaceOnUse">
                <rect width="9" height="10" fill="#1C1C1C" />
                <rect x="0" width="4.5" height="10" fill="#4A4A4A" />
              </pattern>
              <pattern id="btsFoamPat" width="16" height="14" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2.6" fill="rgba(255,255,255,.55)" stroke="rgba(120,80,20,.2)" strokeWidth=".6" />
                <circle cx="12" cy="9" r="3.4" fill="rgba(255,255,255,.45)" stroke="rgba(120,80,20,.18)" strokeWidth=".6" />
                <circle cx="6" cy="12" r="1.7" fill="rgba(255,255,255,.5)" />
              </pattern>
              <linearGradient id="btsShade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity=".38" />
                <stop offset=".25" stopColor="#fff" stopOpacity=".12" />
                <stop offset=".6" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity=".4" />
              </linearGradient>
              <linearGradient id="btsBeer" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={mugBeer.liquid[0]} />
                <stop offset=".55" stopColor={mugBeer.liquid[1]} />
                <stop offset="1" stopColor={mugBeer.liquid[2]} />
              </linearGradient>
              <linearGradient id="btsFoam" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={mugBeer.foam[0]} />
                <stop offset="1" stopColor={mugBeer.foam[1]} />
              </linearGradient>
              <clipPath id="btsInner">
                <path d={`M${-IN_W},-152 L${-IN_W},-24 Q${-IN_W},-${FLOOR} ${-IN_W + 8},-${FLOOR} L${IN_W - 8},-${FLOOR} Q${IN_W},-${FLOOR} ${IN_W},-24 L${IN_W},-152 Z`} />
              </clipPath>
              <clipPath id="btsLiqClip">
                <rect ref={liqClipRef} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" />
              </clipPath>

              {BEERS.map((b, i) => (
                <linearGradient key={b.id} id={`btsBadge${i}`} x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor={b.badge[0]} />
                  <stop offset="1" stopColor={b.badge[1]} />
                </linearGradient>
              ))}

              {/* one polished brass tap column, centred on x = 0 */}
              <g id="btsColShape">
                {/* base flare */}
                <path d={`M-46,${BAR_Y} L-46,${BAR_Y - 12} Q-46,${BAR_Y - 24} -30,${BAR_Y - 24} L30,${BAR_Y - 24} Q46,${BAR_Y - 24} 46,${BAR_Y - 12} L46,${BAR_Y} Z`} fill="url(#btsBrass)" />
                {/* baluster neck */}
                <path d={`M-22,270 L22,270 C20,298 13,318 26,346 L32,${BAR_Y - 24} L-32,${BAR_Y - 24} L-26,346 C-13,318 -20,298 -22,270 Z`} fill="url(#btsBrass)" />
                <rect x="-30" y="332" width="60" height="7" rx="3.5" fill="url(#btsBrass)" />
                <rect x="-27" y="344" width="54" height="5" rx="2.5" fill="url(#btsBrass)" opacity=".85" />
                {/* head */}
                <path d="M-36,272 L-36,246 Q-36,220 0,220 Q36,220 36,246 L36,272 Z" fill="url(#btsBrass)" />
                <rect x="-38" y="262" width="76" height="10" rx="5" fill="url(#btsBrass)" />
                <path d="M-26,236 Q-24,228 -12,226" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* faucet */}
                <rect x="-13" y="244" width="26" height="42" rx="5" fill="url(#btsChrome)" />
                <rect x="-16" y="278" width="32" height="8" rx="4" fill="url(#btsChrome)" />
                <path d={`M-9,286 L9,286 L6.5,${SPOUT_Y} L-6.5,${SPOUT_Y} Z`} fill="url(#btsChrome)" />
                <rect x="-7" y={SPOUT_Y - 2} width="14" height="3.5" rx="1.7" fill="#2a2a2a" />
              </g>
            </defs>

            {/* ---- bokeh behind the tower ---- */}
            <g>
              {[
                [90, 120, 46, 0], [250, 60, 30, 1.5], [410, 90, 38, 3], [560, 50, 28, 2], [700, 130, 52, 4.5],
                [60, 290, 34, 2.5], [740, 280, 40, 1], [520, 190, 22, 5.5],
              ].map(([x, y, r, d], i) => (
                <circle key={i} className="bts-bokeh" cx={x} cy={y} r={r} fill="url(#btsBokeh)" style={{ animationDelay: `${-d}s` }} />
              ))}
            </g>

            {/* ---- bar top ---- */}
            <rect x="0" y={BAR_Y} width="800" height="260" fill="url(#btsBar)" />
            <rect x="0" y={BAR_Y} width="800" height="3" fill="#C9965A" opacity=".35" />
            <g mask="url(#btsReflMask)" opacity=".55">
              {TAP_X.map((cx) => (
                <g key={cx} transform={`translate(${cx} ${BAR_Y * 2}) scale(1 -1)`}>
                  <use href="#btsColShape" />
                </g>
              ))}
            </g>

            {/* ---- the python line ---- */}
            <g>
              <path d={hosePath} fill="none" stroke="#17100B" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
              <path d={hosePath} fill="none" stroke="#4A382A" strokeWidth="24" strokeDasharray="2 4" strokeOpacity=".75" />
              <path d={hosePath} fill="none" stroke="#FFE6BE" strokeOpacity=".18" strokeWidth="4" transform="translate(-4 -5)" />
              {[250, 400, 550, 690].map((x) => (
                <rect key={x} x={x} y={HOSE_Y - 14} width="9" height="28" rx="3" fill="url(#btsBrass)" />
              ))}
              <path
                className="bts-flow"
                d={flowPath}
                fill="none"
                stroke={mugBeer.liquid[0]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="10 14"
                style={{ opacity: pulling ? 0.95 : 0, transition: 'opacity .35s' }}
              />
              <ellipse cx="760" cy={BAR_Y + 10} rx="19" ry="6" fill="url(#btsBrass)" />
            </g>

            {/* ---- the four taps ---- */}
            {BEERS.map((b, i) => {
              const cx = TAP_X[i];
              const active = idx === i;
              const pulled = pulling && mugIdx === i;
              return (
                <g key={b.id} transform={`translate(${cx} 0)`}>
                  {/* handle: pivots forward when pulled */}
                  <g
                    className="bts-handle"
                    role="button"
                    tabIndex={0}
                    aria-label={`Pour ${b.title}`}
                    aria-pressed={active}
                    onClick={() => select(i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); } }}
                  >
                    <g transform={`translate(0 ${PIVOT_Y})`}>
                      <g style={{ transform: pulled ? 'scaleY(.84)' : 'none', transition: 'transform .35s cubic-bezier(.3,1.5,.5,1)' }}>
                        <g transform={`translate(0 ${-PIVOT_Y})`}>
                          <g className="bts-hov">
                            <ellipse cx="0" cy="86" rx="62" ry="78" fill="url(#btsGlow)" style={{ opacity: active ? 1 : 0, transition: 'opacity .5s' }} />
                            {/* hit area */}
                            <rect x="-40" y="30" width="80" height={PIVOT_Y - 20} fill="transparent" />
                            {/* turned wooden pole */}
                            <rect x="-7" y="128" width="14" height={PIVOT_Y - 126} rx="3" fill="url(#btsWood)" />
                            {[148, 170, 194].map((y) => (
                              <ellipse key={y} cx="0" cy={y} rx="10" ry="4.5" fill="url(#btsWood)" stroke="#120804" strokeOpacity=".5" strokeWidth=".8" />
                            ))}
                            <rect x="-9" y="124" width="18" height="8" rx="3" fill="url(#btsBrass)" />
                            <rect x="-9" y={PIVOT_Y - 12} width="18" height="8" rx="3" fill="url(#btsBrass)" />
                            {/* badge */}
                            <path
                              d="M-35,60 Q-35,34 0,34 Q35,34 35,60 L35,112 Q35,132 14,132 L-14,132 Q-35,132 -35,112 Z"
                              fill={`url(#btsBadge${i})`}
                              stroke="#F4DFA6"
                              strokeOpacity=".7"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M-29,60 Q-29,40 0,40 Q29,40 29,60 L29,111 Q29,126 13,126 L-13,126 Q-29,126 -29,111 Z"
                              fill="none"
                              stroke={b.badgeInk}
                              strokeOpacity=".4"
                              strokeWidth="1"
                            />
                            <path d="M-26,50 Q-18,40 -4,40" stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" fill="none" />
                            <circle cx="0" cy="56" r="3.6" fill={b.badgeInk} opacity=".75" />
                            <text x="0" y="83" textAnchor="middle" textLength="42" lengthAdjust="spacingAndGlyphs" fontSize="6.8" fontWeight="800" letterSpacing=".1" fill={b.badgeInk} style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>{b.label[0]}</text>
                            <text x="0" y="101" textAnchor="middle" textLength={b.id === 'dark-lager' ? 27 : 18} lengthAdjust="spacingAndGlyphs" fontSize={b.id === 'dark-lager' ? 7.8 : 6.8} fontWeight="800" letterSpacing=".1" fill={b.badgeInk} style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>{b.label[1]}</text>
                            <text x="0" y="119" textAnchor="middle" fontSize="4.8" fontWeight="700" letterSpacing=".2" fill={b.badgeInk} opacity=".8" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>{b.abv}</text>
                            <rect className="bts-ring" x="-40" y="29" width="80" height="108" rx="26" fill="none" stroke="#F7EFE0" strokeWidth="2" strokeDasharray="5 5" style={{ opacity: 0 }} />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>

                  {/* column in front of the handle foot */}
                  <use href="#btsColShape" />

                  {/* last drip off the nozzle */}
                  {dripping && mugIdx === i && (
                    <circle className="bts-dripdrop" cx="0" cy={SPOUT_Y + 3} r="3" fill={b.liquid[0]} />
                  )}
                </g>
              );
            })}

            {/* ---- drip tray ---- */}
            <g>
              <path d="M105,546 L695,546 L712,574 L88,574 Z" fill="url(#btsGrille)" stroke="#555" strokeWidth="1.5" />
              <rect x="88" y="574" width="624" height="12" rx="3" fill="url(#btsTray)" />
              <rect x="88" y="574" width="624" height="2" fill="#fff" opacity=".18" />
            </g>

            {/* ---- the mug ---- */}
            <g transform={`translate(${mugX} ${MUG_BASE})`}>
              <g
                style={{
                  opacity: mugUp ? 1 : 0,
                  transform: `translateY(${mugUp ? 0 : 34}px)`,
                  transition: `transform ${mugUp ? ENTER_MS : FADE_MS}ms cubic-bezier(.2,.9,.25,1), opacity ${FADE_MS}ms ease`,
                }}
              >
                {/* shadow + warm glow on the tray */}
                <ellipse cx="2" cy="4" rx="60" ry="8" fill="#000" opacity=".5" />
                <ellipse ref={glowRef} className="bts-glow-pulse" cx="0" cy="4" rx="70" ry="10" fill={mugBeer.liquid[0]} opacity="0" />

                {/* handle (thick glass) */}
                <path d="M48,-122 C102,-132 104,-30 48,-30" fill="none" stroke="rgba(214,232,255,.30)" strokeWidth="13" strokeLinecap="round" />
                <path d="M48,-122 C102,-132 104,-30 48,-30" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="6" strokeLinecap="round" />
                <path d="M52,-126 C94,-132 96,-34 52,-34" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round" />

                {/* glass body, tinted */}
                <path d={`M-50,-${MUG_H} L-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L50,-${MUG_H} Z`} fill="rgba(210,230,255,.07)" />

                {/* contents */}
                <g clipPath="url(#btsInner)">
                  <rect ref={liqRef} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" fill="url(#btsBeer)" />
                  <rect ref={shadeRef} x={-IN_W} y={-FLOOR} width={IN_W * 2} height="0" fill="url(#btsShade)" />
                  <g clipPath="url(#btsLiqClip)">
                    {BUBBLES.map((bb, i) => (
                      <circle
                        key={i}
                        className="bts-bub"
                        cx={bb.x}
                        cy={-FLOOR - 4}
                        r={bb.r}
                        fill="rgba(255,255,255,.8)"
                        style={{ animationDelay: `${bb.delay}s`, animationDuration: `${bb.dur}s` }}
                      />
                    ))}
                  </g>
                  <path ref={foamRef} d="" fill="url(#btsFoam)" />
                  <path ref={foamPatRef} d="" fill="url(#btsFoamPat)" opacity=".8" />
                  <path ref={surfaceRef} className="bts-surface" d="" fill="none" stroke="rgba(255,250,220,.85)" strokeWidth="1.5" strokeDasharray="7 7" strokeLinecap="round" />
                </g>

                {/* the stream from the nozzle */}
                <rect ref={streamRef} className="bts-stream" x="-4.5" y={SPOUT_LOCAL} width="9" height="0" rx="3" fill={mugBeer.liquid[0]} opacity="0" />
                <line ref={streamHiRef} x1="-1.2" x2="-1.2" y1={SPOUT_LOCAL} y2={SPOUT_LOCAL} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 9" className="bts-flow" opacity="0" />
                <ellipse ref={splashRef} cx="0" cy="-20" rx="11" ry="3" fill={mugBeer.foam[0]} opacity="0" />

                {/* froth rising over the rim */}
                <path ref={domeRef} d="" fill="url(#btsFoam)" />
                <path ref={domePatRef} d="" fill="url(#btsFoamPat)" opacity=".8" />
                <rect ref={dripARef} x="-21" y="-152" width="7" height="0" rx="3.5" fill={mugBeer.foam[0]} stroke="rgba(120,80,20,.25)" strokeWidth=".8" opacity="0" />
                <rect ref={dripBRef} x="30" y="-152" width="6" height="0" rx="3" fill={mugBeer.foam[0]} stroke="rgba(120,80,20,.25)" strokeWidth=".8" opacity="0" />

                {/* glass edges and highlights */}
                <path d={`M-50,-${MUG_H} L-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L50,-${MUG_H}`} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2.6" strokeLinejoin="round" />
                <path d={`M${-IN_W},-${MUG_H} L${-IN_W},-24 Q${-IN_W},-${FLOOR} ${-IN_W + 8},-${FLOOR} L${IN_W - 8},-${FLOOR} Q${IN_W},-${FLOOR} ${IN_W},-24 L${IN_W},-${MUG_H}`} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
                <path d={`M-50,-8 Q-50,0 -42,0 L42,0 Q50,0 50,-8 L${IN_W},-24 Q${IN_W},-${FLOOR} ${IN_W - 8},-${FLOOR} L${-IN_W + 8},-${FLOOR} Q${-IN_W},-${FLOOR} ${-IN_W},-24 Z`} fill="rgba(235,245,255,.20)" />
                <rect x="-37" y="-136" width="7" height="104" rx="3.5" fill="rgba(255,255,255,.26)" />
                <rect x="30" y="-130" width="3" height="76" rx="1.5" fill="rgba(255,255,255,.15)" />
                <rect x="-50" y="-154" width="7" height="4" rx="2" fill="rgba(255,255,255,.65)" />
                <rect x="43" y="-154" width="7" height="4" rx="2" fill="rgba(255,255,255,.65)" />

                {/* condensation: it is 2°C in there */}
                <g ref={dropsRef} opacity="0">
                  {DROPS.map(([x, y, r], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r={r} fill="rgba(255,255,255,.28)" />
                      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.35} fill="rgba(255,255,255,.9)" />
                    </g>
                  ))}
                </g>
              </g>
            </g>
          </svg>

          {/* status line */}
          <div className="flex items-center justify-center gap-3 -mt-1 text-xs sm:text-sm text-[#E6D3B3]/85" aria-live="polite">
            <span className="inline-flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${status === 'Pouring' ? 'bg-[#D9A441] animate-pulse' : 'bg-[#D9A441]/50'}`} />
              {status}
            </span>
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-[#D9A441]/30 text-[#D9A441] hover:bg-[#D9A441]/15 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause auto-pour' : 'Resume auto-pour'}
              aria-label={isPlaying ? 'Pause auto-pour' : 'Resume auto-pour'}
            >
              {isPlaying ? <FaPause className="text-[9px]" /> : <FaPlay className="text-[9px] ml-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
