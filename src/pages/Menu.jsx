import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaMagnifyingGlass,
  FaBagShopping,
  FaXmark,
  FaPlus,
  FaMinus,
  FaCheck,
  FaUtensils,
  FaBeerMugEmpty,
  FaFire,
  FaWineGlass
} from 'react-icons/fa6';
import { menuCategories, menuItems } from '../data/menuData';
import { drinksCategories, drinksItems } from '../data/drinksData';
import { getItemImage, FALLBACK_IMAGE } from '../data/menuImages';

const PAGE_SIZE = 24;
const formatInr = (n) => '₹' + Number(n).toLocaleString('en-IN');

function DietBadge({ type, isFood }) {
  if (!isFood) {
    if (type === 'alcohol') {
      return (
        <span className="flex items-center gap-1 rounded-md bg-[#2A1A10]/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#D9A441] backdrop-blur-md border border-[#D9A441]/30">
          <FaBeerMugEmpty className="text-[10px]" /> Craft Brew
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-md bg-[#2A1A10]/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#3E9B6A] backdrop-blur-md border border-[#3E9B6A]/30">
        <FaWineGlass className="text-[10px]" /> Zero Proof
      </span>
    );
  }

  const isVeg = type === 'veg';
  const color = isVeg ? '#3E9B6A' : '#C0504D';
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[#2A1A10]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10" style={{ color }}>
      <span className="inline-flex h-3 w-3 items-center justify-center rounded-[2px] border" style={{ borderColor: color }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      </span>
      <span>{isVeg ? 'Veg' : 'Non-Veg'}</span>
    </span>
  );
}

function MenuCard({ item, qty, onAdd, onMinus, isFood, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl md:rounded-t-[2.5rem] border border-[#D9A441]/20 bg-[#120A06] backdrop-blur-md shadow-[0_16px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#D9A441]/50 hover:shadow-[0_20px_45px_rgba(217,164,65,0.18)]"
    >
      {/* 1. Large Appetizing Image Showcase */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0503]">
          <img
            src={getItemImage(item)}
            alt={item.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120A06] via-transparent to-transparent pointer-events-none" />

          {/* Top-Left Diet Pill */}
          <div className="absolute top-3 left-3 z-10">
            <DietBadge type={item.type} isFood={isFood} />
          </div>

          {/* Top-Right Badge (e.g. Bestseller, Chef Signature) */}
          {item.badge && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-gradient-to-r from-[#C76B42] to-[#D9A441] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#2A1A10] shadow-md">
              {item.badge}
            </span>
          )}
        </div>

        {/* 2. Text Details */}
        <div className="p-4 sm:p-5">
          <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug text-[#F7EFE0] group-hover:text-[#D9A441] transition-colors line-clamp-2">
            {item.name}
          </h3>

          <p className="mt-1 text-xs text-[#E6D3B3]/70 font-light leading-relaxed line-clamp-2">
            {item.desc || 'Prepared fresh with signature ingredients & culinary craft.'}
          </p>
        </div>
      </div>

      {/* 3. Bottom Price & Quantity Controls */}
      <div className="flex items-center justify-between p-4 sm:p-5 pt-0 mt-auto border-t border-white/5">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#E6D3B3]/50 block">Price</span>
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#EBCB86]">
            {formatInr(item.price)}
          </span>
        </div>

        <div>
          {qty > 0 ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 rounded-full border border-[#D9A441] bg-[#D9A441]/10 px-2 py-1 shadow-md"
            >
              <button
                onClick={onMinus}
                aria-label="Remove item"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9A441] text-[#2A1A10] transition-transform active:scale-75"
              >
                <FaMinus size={9} />
              </button>
              <span className="w-5 text-center font-bold text-sm text-[#F7EFE0]">{qty}</span>
              <button
                onClick={onAdd}
                aria-label="Add one more"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9A441] text-[#2A1A10] transition-transform active:scale-75"
              >
                <FaPlus size={9} />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D9A441] bg-[#D9A441]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EBCB86] transition-all duration-300 hover:bg-[#D9A441] hover:text-[#2A1A10] active:scale-95 cursor-pointer shadow-sm"
            >
              <FaPlus size={9} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [params] = useSearchParams();
  const initialMode = params.get('tab') === 'drinks' ? 'drinks' : 'food';
  const [mode, setMode] = useState(initialMode);
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  // Cart & Order State
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    mode: 'dine-in',
    table: params.get('table') || '',
    phone: '',
    name: '',
  });
  const [orderStatus, setOrderStatus] = useState({ status: 'idle', code: '' });

  const isFood = mode === 'food';
  const currentCategories = isFood ? menuCategories : drinksCategories;
  const currentItems = isFood ? menuItems : drinksItems;

  useEffect(() => {
    document.title = 'Artisan Menu & Craft Bar — Brewocrat Gurugram';
  }, []);

  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [mode, activeCategory, dietFilter, searchQuery]);

  // Filtered List
  const filteredList = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return currentItems.filter((item) => {
      // Category Match
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      
      // Diet / Type Match
      let matchDiet = true;
      if (dietFilter !== 'all') {
        if (isFood) {
          matchDiet = item.type === dietFilter;
        } else {
          matchDiet = item.type === dietFilter;
        }
      }

      // Search Query
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.desc && item.desc.toLowerCase().includes(query));

      return matchCat && matchDiet && matchSearch;
    });
  }, [currentItems, activeCategory, dietFilter, searchQuery, isFood]);

  // Cart Calculations
  const cartLines = Object.values(cart);
  const cartItemCount = cartLines.reduce((acc, l) => acc + l.qty, 0);
  const cartTotalPrice = cartLines.reduce((acc, l) => acc + l.qty * l.item.price, 0);

  const handleItemQuantityChange = (item, delta) => {
    setCart((prev) => {
      const currentQty = prev[item.name]?.qty || 0;
      const newQty = currentQty + delta;
      const next = { ...prev };
      if (newQty <= 0) {
        delete next[item.name];
      } else {
        next[item.name] = { item, qty: newQty };
      }
      return next;
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderStatus({ status: 'sending', code: '' });
    setTimeout(() => {
      const code = `BC-${Date.now().toString().slice(-5)}`;
      setCart({});
      setOrderStatus({ status: 'done', code });
    }, 1200);
  };

  return (
    <div className="relative isolate min-h-screen bg-[#0D0805] text-[#E6D3B3] pt-24 sm:pt-32 pb-32 overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10] mediterranean-pattern">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-[#D9A441]/10 blur-[140px] -z-10" />
      <div className="pointer-events-none fixed bottom-10 -right-40 h-[500px] w-[500px] rounded-full bg-[#C76B42]/10 blur-[140px] -z-10" />

      {/* 1. Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D9A441] font-bold block mb-1">
              BREWOCRAT MICROBREWERY & KITCHEN
            </span>
            
            <div className="font-alex text-4xl sm:text-5xl md:text-6xl text-[#EFA364] script-gold-shadow leading-tight my-1">
              Plated with love, poured with soul
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-tight">
              Culinary Delights & <span className="italic text-[#D9A441]">Craft Bar.</span>
            </h1>
          </div>

          {/* Food vs Drinks Mode Switcher */}
          <div className="inline-flex self-center sm:self-end rounded-full border border-white/15 bg-[#1A110B]/80 p-1.5 backdrop-blur-md shadow-2xl">
            {[
              { id: 'food', label: 'Food Menu', icon: FaUtensils },
              { id: 'drinks', label: 'Bar & Brewery', icon: FaBeerMugEmpty },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setActiveCategory('all');
                    setDietFilter('all');
                  }}
                  className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected ? 'text-[#2A1A10]' : 'text-[#E6D3B3] hover:text-[#F7EFE0]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="menuModePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EBCB86] shadow-md"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className="relative z-10 text-sm" />
                  <span className="relative z-10">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Sticky Filter & Category Ribbon */}
      <div className="sticky top-[68px] sm:top-[78px] z-30 border-y border-[#D9A441]/20 bg-[#0D0805]/95 backdrop-blur-xl shadow-xl py-3.5 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          {/* Search & Dietary Filters Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-[#F7EFE0] focus-within:border-[#D9A441] transition">
              <FaMagnifyingGlass className="text-[#D9A441] mr-3 shrink-0" />
              <input
                type="text"
                placeholder={`Search ${isFood ? 'dimsums, tikkas, pizzas, curries...' : 'craft beers, cocktails, single malts...'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#E6D3B3]/40 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#E6D3B3]/60 hover:text-white"
                >
                  <FaXmark />
                </button>
              )}
            </div>

            {/* Diet Filter Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 [scrollbar-width:none]">
              {isFood ? (
                <>
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'veg', label: 'Pure Veg', color: '#3E9B6A' },
                    { id: 'non-veg', label: 'Non-Veg', color: '#C0504D' },
                  ].map((df) => (
                    <button
                      key={df.id}
                      onClick={() => setDietFilter(df.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        dietFilter === df.id
                          ? 'bg-[#D9A441] text-[#2A1A10] font-bold shadow-md'
                          : 'bg-white/5 border border-white/10 text-[#E6D3B3] hover:border-white/30'
                      }`}
                    >
                      {df.label}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { id: 'all', label: 'All Drinks' },
                    { id: 'alcohol', label: 'Craft Brews & Spirits' },
                    { id: 'mocktail', label: 'Zero-Proof' },
                  ].map((df) => (
                    <button
                      key={df.id}
                      onClick={() => setDietFilter(df.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        dietFilter === df.id
                          ? 'bg-[#D9A441] text-[#2A1A10] font-bold shadow-md'
                          : 'bg-white/5 border border-white/10 text-[#E6D3B3] hover:border-white/30'
                      }`}
                    >
                      {df.label}
                    </button>
                  ))}
                </>
              )}
            </div>

          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {currentCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'text-[#2A1A10] font-bold shadow-sm'
                      : 'bg-white/5 text-[#E6D3B3]/80 hover:bg-white/10'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="catPill"
                      className="absolute inset-0 rounded-full bg-[#EBCB86]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. Visual Menu Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Count Note */}
        <div className="flex items-center justify-between text-xs text-[#E6D3B3]/60 mb-6">
          <span>Showing {Math.min(displayLimit, filteredList.length)} of {filteredList.length} items</span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-[#D9A441] hover:underline"
            >
              Reset category filter
            </button>
          )}
        </div>

        {/* The Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredList.slice(0, displayLimit).map((item, idx) => (
            <MenuCard
              key={item.category + item.name}
              item={item}
              index={idx}
              isFood={isFood}
              qty={cart[item.name]?.qty || 0}
              onAdd={() => handleItemQuantityChange(item, 1)}
              onMinus={() => handleItemQuantityChange(item, -1)}
            />
          ))}
        </div>

        {/* Empty Search State */}
        {filteredList.length === 0 && (
          <div className="py-24 text-center rounded-3xl border border-white/10 bg-[#24150C]/60 p-8">
            <FaUtensils className="mx-auto text-4xl text-[#D9A441]/40 mb-4" />
            <p className="font-serif text-2xl text-[#F7EFE0]">No culinary matches found</p>
            <p className="text-xs text-[#E6D3B3]/60 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or dietary filters to discover more dishes.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietFilter('all');
              }}
              className="mt-6 rounded-full bg-[#D9A441] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#2A1A10]"
            >
              Show Full Menu
            </button>
          </div>
        )}

        {/* Load More Button */}
        {displayLimit < filteredList.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
              className="rounded-full border border-[#D9A441] bg-[#D9A441]/10 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#EBCB86] hover:bg-[#D9A441] hover:text-[#2A1A10] transition-all cursor-pointer shadow-lg"
            >
              Load More Selections ({filteredList.length - displayLimit} Remaining)
            </button>
          </div>
        )}

      </div>

      {/* 4. Floating Cart Pill Button (When items are in cart) */}
      <AnimatePresence>
        {cartItemCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed inset-x-4 bottom-5 z-40 flex justify-center pointer-events-none"
          >
            <button
              onClick={() => {
                setOrderStatus({ status: 'idle', code: '' });
                setIsCartOpen(true);
              }}
              className="pointer-events-auto flex items-center justify-between gap-6 rounded-full bg-gradient-to-r from-[#C76B42] via-[#D9A441] to-[#C76B42] bg-[length:200%_auto] px-7 py-4 font-bold text-[#2A1A10] shadow-[0_12px_40px_rgba(217,164,65,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer max-w-md w-full"
            >
              <div className="flex items-center gap-3">
                <FaBagShopping className="text-base" />
                <motion.span key={cartItemCount} initial={{ scale: 1.5 }} animate={{ scale: 1 }}>
                  {cartItemCount} item{cartItemCount > 1 ? 's' : ''}
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <span>{formatInr(cartTotalPrice)}</span>
                <span>•</span>
                <span className="uppercase text-xs tracking-wider">Review Order →</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Slide-out Order Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-[#0D0805] border-l border-[#D9A441]/25 shadow-2xl text-[#F7EFE0]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <h2 className="font-serif text-2xl text-[#F7EFE0]">Your Order Summary</h2>
                  <p className="text-xs text-[#E6D3B3]/60">Brewocrat Kitchen & Taproom</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#E6D3B3] hover:text-white"
                  aria-label="Close cart"
                >
                  <FaXmark />
                </button>
              </div>

              {/* Order Placed Confirmation */}
              {orderStatus.status === 'done' ? (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D9A441]/20 text-[#D9A441] mb-4 text-2xl border border-[#D9A441]">
                    <FaCheck />
                  </div>
                  <h3 className="font-serif text-3xl text-[#F7EFE0] mb-2">Order Confirmed!</h3>
                  <p className="text-xs text-[#E6D3B3]/80 max-w-xs mb-6">
                    Your selections have been sent to our kitchen & bar team.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-[#1A110B] p-4 w-full mb-8">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#EBCB86] block">
                      Order Reference
                    </span>
                    <span className="font-mono text-2xl text-[#D9A441] font-bold">
                      {orderStatus.code}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="rounded-full bg-[#D9A441] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#2A1A10]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="flex min-h-0 flex-1 flex-col">
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cartLines.map(({ item, qty }) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 p-3.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-base text-[#F7EFE0] truncate">{item.name}</p>
                          <p className="text-xs text-[#EBCB86]">{formatInr(item.price)} each</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/15 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleItemQuantityChange(item, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[#D9A441]"
                          >
                            <FaMinus size={8} />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-white">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleItemQuantityChange(item, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[#D9A441]"
                          >
                            <FaPlus size={8} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Dining Mode Toggle */}
                    <div className="pt-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-2">
                        Service Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'dine-in', label: 'Dine-In Table' },
                          { id: 'takeaway', label: 'Takeaway / Delivery' },
                        ].map((sm) => (
                          <button
                            type="button"
                            key={sm.id}
                            onClick={() => setOrderForm({ ...orderForm, mode: sm.id })}
                            className={`rounded-xl border py-2.5 text-xs font-semibold transition ${
                              orderForm.mode === sm.id
                                ? 'border-[#D9A441] bg-[#D9A441]/15 text-[#EBCB86]'
                                : 'border-white/15 text-[#E6D3B3]/70'
                            }`}
                          >
                            {sm.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <input
                      type="text"
                      required
                      placeholder={orderForm.mode === 'dine-in' ? 'Table Number (e.g. Table 14 or Courtyard)' : 'Delivery Address'}
                      value={orderForm.table}
                      onChange={(e) => setOrderForm({ ...orderForm, table: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7EFE0] placeholder:text-[#E6D3B3]/40 outline-none focus:border-[#D9A441]"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (e.g. +91 98765 43210)"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7EFE0] placeholder:text-[#E6D3B3]/40 outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  {/* Drawer Footer */}
                  <div className="border-t border-white/10 p-5 bg-[#1A110B]/80">
                    <div className="flex items-center justify-between text-base mb-4">
                      <span className="text-[#E6D3B3]/75">Subtotal ({cartItemCount} items)</span>
                      <span className="font-serif text-2xl font-bold text-[#EBCB86]">
                        {formatInr(cartTotalPrice)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={orderStatus.status === 'sending'}
                      className="w-full rounded-full bg-gradient-to-r from-[#C76B42] via-[#D9A441] to-[#C76B42] py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#2A1A10] shadow-[0_8px_25px_rgba(217,164,65,0.4)] disabled:opacity-60 cursor-pointer hover:brightness-110 transition"
                    >
                      {orderStatus.status === 'sending' ? 'Sending to Kitchen...' : 'Place Order'}
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
