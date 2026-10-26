import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMagnifyingGlass, FaBagShopping, FaXmark, FaPlus, FaMinus, FaCheck } from 'react-icons/fa6';
import { menuCategories, menuItems } from '../data/menuData';
import { drinksCategories, drinksItems } from '../data/drinksData';
import { getItemImage, FALLBACK_IMAGE } from '../data/menuImages';
import api from '../lib/api';

const PAGE = 24;
const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
const DIETS = {
  food: [['all', 'All'], ['veg', 'Veg'], ['non-veg', 'Non-veg']],
  drinks: [['all', 'All'], ['alcohol', 'Alcohol'], ['mocktail', 'Zero proof']],
};

function Dot({ veg }) {
  const c = veg ? '#3E9B6A' : '#C0504D';
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border" style={{ borderColor: c }}>
      <span className="h-2 w-2 rounded-full" style={{ background: c }} />
    </span>
  );
}

function Card({ item, qty, onAdd, onMinus, isFood, index }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -6 }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 brew-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={getItemImage(item)} alt={item.name} loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/70 via-transparent" />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-[#2A1A10]/60 p-1 backdrop-blur">
          <Dot veg={isFood ? item.type === 'veg' : item.type === 'mocktail'} />
        </span>
        {item.badge && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-[#D9A441] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2A1A10]">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 font-serif text-[15px] leading-snug text-[#F7EFE0] sm:text-lg">{item.name}</h3>
        <p className="mt-1 hidden line-clamp-2 text-xs text-[#E6D3B3]/60 sm:block">{item.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-[#EBCB86]">{inr(item.price)}</span>
          {qty ? (
            <div className="flex items-center gap-2 rounded-full border border-[#D9A441]/50 px-1 py-0.5">
              <button onClick={onMinus} aria-label="Remove one" className="grid h-8 w-8 place-items-center text-[#D9A441] active:scale-75 transition"><FaMinus size={10} /></button>
              <span className="w-4 text-center text-sm text-white">{qty}</span>
              <button onClick={onAdd} aria-label="Add one" className="grid h-8 w-8 place-items-center text-[#D9A441] active:scale-75 transition"><FaPlus size={10} /></button>
            </div>
          ) : (
            <button onClick={onAdd} className="rounded-full border border-[#D9A441] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D9A441] transition hover:bg-[#D9A441] hover:text-[#2A1A10] active:scale-90">
              Add
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState('food');
  const [cat, setCat] = useState('all');
  const [diet, setDiet] = useState('all');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ mode: 'dine', location: params.get('table') || '', phone: '' });
  const [status, setStatus] = useState({ s: 'idle' });

  const isFood = mode === 'food';
  const cats = isFood ? menuCategories : drinksCategories;
  const items = isFood ? menuItems : drinksItems;

  useEffect(() => { document.title = 'Menu — Brewocrat'; }, []);
  useEffect(() => { setLimit(PAGE); }, [mode, cat, diet, q]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) =>
      (cat === 'all' || i.category === cat) &&
      (diet === 'all' || (isFood ? (diet === 'veg') === (i.type === 'veg') : i.type === diet)) &&
      (!term || `${i.name} ${i.desc || ''}`.toLowerCase().includes(term)));
  }, [items, cat, diet, q, isFood]);

  const lines = Object.values(cart);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
  const change = (item, d) => setCart((c) => {
    const qty = (c[item.name]?.qty || 0) + d;
    const next = { ...c };
    if (qty <= 0) delete next[item.name]; else next[item.name] = { item, qty };
    return next;
  });
  const switchMode = (m) => { setMode(m); setCat('all'); setDiet('all'); };

  const place = async (e) => {
    e.preventDefault();
    setStatus({ s: 'sending' });
    try {
      const r = await api.post('/orders', { ...form, items: lines.map((l) => ({ name: l.item.name, qty: l.qty })) });
      setCart({});
      setStatus({ s: 'done', code: r.code });
    } catch (err) { setStatus({ s: 'error', msg: err.message }); }
  };

  const field = 'w-full rounded-xl border border-white/15 bg-[#2A1A10]/40 px-4 py-3 text-[#F7EFE0] outline-none focus:border-[#D9A441]';

  return (
    <div className="relative isolate min-h-screen overflow-hidden brew-card pb-28 pt-24 text-[#E6D3B3] md:pt-32">
      <motion.div aria-hidden className="pointer-events-none fixed -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-[#D9A441]/10 blur-[110px]" animate={{ x: [0, 90, 0], y: [0, 60, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="pointer-events-none fixed -right-32 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#B07A2E]/10 blur-[110px]" animate={{ x: [0, -90, 0], y: [0, -60, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D9A441]">Brewocrat</p>
            <h1 className="mt-1 overflow-hidden font-serif text-5xl text-[#F7EFE0] md:text-7xl">{'Menu'.split('').map((l, i) => <motion.span key={i} className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>)}</h1>
          </div>
          <div className="flex rounded-full border border-white/15 p-1">
            {[['food', 'Food'], ['drinks', 'Drinks']].map(([k, label]) => (
              <button key={k} onClick={() => switchMode(k)}
                className={`relative rounded-full px-7 py-2.5 text-xs font-bold uppercase tracking-widest transition ${mode === k ? 'text-[#2A1A10]' : 'text-[#E6D3B3]'}`}>
                {mode === k && <motion.span layoutId="modepill" className="absolute inset-0 rounded-full bg-[#D9A441]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-[64px] z-30 mt-6 border-y border-white/10 bg-[#2A1A10]/90 backdrop-blur-md md:top-[76px]">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-full border border-white/15 px-4">
              <FaMagnifyingGlass className="text-[#D9A441]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full bg-transparent py-2.5 text-base outline-none" />
            </label>
            <div className="flex gap-2">
              {DIETS[mode].map(([k, label]) => (
                <button key={k} onClick={() => setDiet(k)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold ${diet === k ? 'border-[#D9A441] bg-[#D9A441]/15 text-[#EBCB86]' : 'border-white/15'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {cats.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${cat === c.id ? 'text-[#2A1A10]' : 'bg-white/5 text-[#E6D3B3]'}`}>
                {cat === c.id && <motion.span layoutId="catpill" className="absolute inset-0 rounded-full bg-[#EBCB86]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-8">
        <p className="mb-4 text-xs text-[#E6D3B3]/50">{list.length} items</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.slice(0, limit).map((i, idx) => (
            <Card key={i.category + i.name} index={idx} item={i} isFood={isFood} qty={cart[i.name]?.qty || 0}
              onAdd={() => change(i, 1)} onMinus={() => change(i, -1)} />
          ))}
        </div>
        {!list.length && <p className="py-20 text-center text-[#E6D3B3]/50">Nothing found.</p>}
        {limit < list.length && (
          <div className="mt-10 text-center">
            <button onClick={() => setLimit((l) => l + PAGE)} className="rounded-full border border-[#D9A441] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#D9A441] hover:bg-[#D9A441] hover:text-[#2A1A10]">
              Show more
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} whileTap={{ scale: 0.96 }}
            onClick={() => { setStatus({ s: 'idle' }); setOpen(true); }}
            className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-gradient-to-r from-[#B07A2E] to-[#D9A441] px-6 py-4 font-bold text-[#2A1A10] shadow-2xl md:inset-x-auto md:right-8 md:w-[380px]">
            <span className="flex items-center gap-3"><FaBagShopping /> <motion.b key={count} initial={{ scale: 1.6 }} animate={{ scale: 1 }}>{count}</motion.b> item{count > 1 ? 's' : ''}</span>
            <span>{inr(total)} · View</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-[#2A1A10]/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.35 }}
              className="fixed inset-x-0 bottom-0 z-[61] flex max-h-[88vh] flex-col rounded-t-3xl border border-white/10 brew-card md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[440px] md:rounded-none">
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <h2 className="font-serif text-2xl text-[#F7EFE0]">Your order</h2>
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><FaXmark /></button>
              </div>
              {status.s === 'done' ? (
                <div className="p-10 text-center">
                  <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#D9A441]/15 text-[#EBCB86]"><FaCheck /></span>
                  <p className="font-serif text-2xl text-[#F7EFE0]">Order placed</p>
                  <p className="mt-2 text-sm">Ref <b className="text-[#EBCB86]">{status.code}</b></p>
                </div>
              ) : (
                <form onSubmit={place} className="flex min-h-0 flex-1 flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto p-5">
                    {lines.map(({ item, qty }) => (
                      <div key={item.name} className="flex items-center justify-between gap-3">
                        <div className="min-w-0"><p className="truncate text-[#F7EFE0]">{item.name}</p><p className="text-xs text-[#E6D3B3]/60">{inr(item.price)}</p></div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => change(item, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-white/20"><FaMinus size={10} /></button>
                          <span className="w-5 text-center">{qty}</span>
                          <button type="button" onClick={() => change(item, 1)} className="grid h-8 w-8 place-items-center rounded-full border border-white/20"><FaPlus size={10} /></button>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {[['dine', 'Dine-in'], ['delivery', 'Delivery']].map(([k, label]) => (
                        <button type="button" key={k} onClick={() => setForm({ ...form, mode: k })}
                          className={`rounded-xl border py-3 text-sm ${form.mode === k ? 'border-[#D9A441] text-[#EBCB86]' : 'border-white/15'}`}>{label}</button>
                      ))}
                    </div>
                    <input required className={field} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder={form.mode === 'dine' ? 'Table number' : 'Delivery address'} />
                    <input required inputMode="tel" className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile number" />
                    {status.s === 'error' && <p className="text-sm text-red-400">{status.msg}</p>}
                  </div>
                  <div className="border-t border-white/10 p-5">
                    <div className="mb-3 flex justify-between text-lg"><span>Total</span><b className="text-[#EBCB86]">{inr(total)}</b></div>
                    <button disabled={status.s === 'sending'} className="w-full rounded-full bg-gradient-to-r from-[#B07A2E] to-[#D9A441] py-4 text-sm font-bold uppercase tracking-widest text-[#2A1A10] disabled:opacity-60">
                      {status.s === 'sending' ? 'Placing…' : 'Place order'}
                    </button>
                  </div>
                </form>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
