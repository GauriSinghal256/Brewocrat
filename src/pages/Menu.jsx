import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCartShopping, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { menuCategories, menuItems } from '../data/menuData';
import { drinksCategories, drinksItems } from '../data/drinksData';
import MenuSplit from '../components/MenuSplit';
import { getItemImage } from '../data/menuImages';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const [menuMode, setMenuMode] = useState('food'); // 'food' or 'drinks'
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDiet, setActiveDiet] = useState('all'); // Food uses 'all'/'veg'; drinks use 'all'/'alcohol'/'mocktail'
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderMode, setOrderMode] = useState('dine-in');
  const [orderData, setOrderData] = useState({
    tableCode: searchParams.get('table') || searchParams.get('tableCode') || '',
    name: '',
    phone: '',
    address: ''
  });
  const [orderConfirmation, setOrderConfirmation] = useState('');
  const [orderError, setOrderError] = useState('');

  // Ref for horizontal Best Seller scroll container on mobile
  const bestSellerScrollRef = useRef(null);

  const addToCart = (item) => {
    setOrderConfirmation('');
    setOrderError('');
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentItems, { name: item.name, price: item.price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (name, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => item.name === name ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isCartOpen]);

  const handleCheckout = (event) => {
    event.preventDefault();
    setOrderError('');
    const order = {
      id: `BC-${Date.now().toString().slice(-6)}`,
      created: new Date().toISOString(),
      mode: orderMode,
      customer: { name: orderData.name, phone: orderData.phone },
      ...(orderMode === 'dine-in'
        ? { tableCode: orderData.tableCode.trim() }
        : { address: orderData.address.trim() }),
      items: cartItems,
      subtotal: cartTotal
    };

    try {
      const savedOrders = JSON.parse(localStorage.getItem('brewocrat_orders') || '[]');
      if (!Array.isArray(savedOrders)) {
        throw new Error('Saved orders are not in the expected format.');
      }
      localStorage.setItem('brewocrat_orders', JSON.stringify([order, ...savedOrders]));
      setOrderConfirmation(order.id);
      setCartItems([]);
      setOrderData((current) => ({ ...current, name: '', phone: '', address: '' }));
    } catch (storageError) {
      setOrderError(`We couldn't save your order on this device. ${storageError.message}`);
    }
  };

  const handleModeChange = (mode) => {
    setMenuMode(mode);
    setActiveCategory('all');
    setActiveDiet('all');
    setSearchQuery('');
  };

  const scrollBestSeller = (direction) => {
    if (bestSellerScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      bestSellerScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Food Best Sellers Data
  const foodBestSellersNonVeg = [
    { name: 'Nutty Moroccan Chicken Wings', price: 745, desc: 'Crispy chicken wings glazed in Moroccan spices & roasted nuts.', badge: 'Bestseller' },
    { name: 'Butter Garlic Prawns', price: 875, desc: 'Tiger prawns sauteed in golden garlic butter sauce.', badge: 'Bestseller' },
    { name: 'Portuguese Stuffed Chicken Sizzler', price: 995, desc: 'Chicken breast stuffed with spinach & cheese with peri-peri sauce.' },
    { name: 'Pepperoni Pizza', price: 795, desc: 'Classic pork pepperoni with rich tomato sauce & cheese.' },
    { name: 'Chicken Ravioli Pasta', price: 845, desc: 'Handcrafted ravioli stuffed with chicken & rich herbs.' },
    { name: 'Chicken Thai Basil Dimsums', price: 635, desc: 'Steamed chicken dumplings fragrant with fresh Thai basil.' },
    { name: 'Murg Malai Tikka', price: 865, desc: 'Creamy cardamom & cashew marinated tender chicken kebab.' },
    { name: 'Tandoori River Sole Fish Tikka', price: 1095, desc: 'Fresh sole fish tikka roasted in traditional tandoor spices.' },
    { name: 'Prawn Chilli Garlic Noodles', price: 575, desc: 'Wok tossed noodles with tiger prawns & light soya.' },
    { name: 'Spanish Fish Tomation', price: 995, desc: 'Fish fillets braised in Spanish plum tomato garlic sauce.' },
    { name: 'Chicken Biryani', price: 795, desc: 'Aromatic long grain basmati rice layered with spiced chicken.' },
    { name: 'Lebanese Shish Taouk', price: 775, desc: 'Garlic & lemon marinated chicken skewers grilled over coals.' },
    { name: 'Cajun Spiced Roasted Fish', price: 985, desc: 'Roast fish fillet dusted with aromatic Cajun seasoning.' }
  ];

  const foodBestSellersVeg = [
    { name: 'Cottage Cheese With Black Beans Bao', price: 645, desc: 'Steamed bao buns filled with black bean glaze paneer.' },
    { name: 'Mix Veg Gyoza', price: 575, desc: 'Pan-seared Japanese style vegetable dumplings.' },
    { name: 'Mexican Veg Roll', price: 655, desc: 'Tortilla wrap stuffed with spicy beans, veggies & salsa.' },
    { name: 'Make Your Own Pasta (Veg)', price: 765, desc: 'Choice of pasta in creamy arrabbiata or Alfredo sauce.' },
    { name: 'Tandoor Stuffed Paneer Tikka', price: 725, desc: 'Paneer blocks stuffed with dry fruits & spiced khoya.' },
    { name: 'Brewocrat Special Dal Makhani', price: 655, desc: 'Slow-cooked black lentils simmered overnight with butter & cream.', badge: 'Must Try' },
    { name: 'Chilli Garlic Noodles (Veg)', price: 415, desc: 'Spicy noodles tossed with burnt garlic & chili flakes.' },
    { name: 'Hot Walnut Brownie With Ice Cream', price: 495, desc: 'Warm fudge walnut brownie served with vanilla ice cream & hot chocolate.', badge: 'Must Try' }
  ];

  // Drinks Best Sellers Data
  const drinksBestSellersCocktailsBeers = [
    { name: 'Tropical Ale Tower (3 Ltr)', price: 1895, desc: 'Freshly brewed house craft beer tower perfect for groups & celebrations.', badge: 'Bestseller' },
    { name: 'Ginger Monkey Cocktail', price: 835, desc: 'Monkey Shoulder whisky, fresh muddled ginger, honey & bitters.', badge: 'Bestseller' },
    { name: 'Breakfast in Jalisco', price: 745, desc: 'Tequila, citrus marmalade, triple sec & orange zest.', badge: 'Bestseller' },
    { name: 'Beer Margarita', price: 655, desc: 'Tequila, fresh lime juice & orange liqueur topped with Belgian Wheat beer.', badge: 'Must Try' },
    { name: 'Fresh Beer Tester (Sample Flight)', price: 75, desc: 'Taste all 4 freshly brewed craft beers on tap before choosing.', badge: 'Bestseller' },
    { name: 'Tropical Ale Craft Beer (500 ml)', price: 495, desc: 'Crispy microbrewery ale with juicy tropical citrus notes.', badge: 'Must Try' },
    { name: 'Blue Paradise Signature', price: 725, desc: 'Blue Curacao, premium vodka, coconut rum & tonic.' },
    { name: 'Very Berry Vodka', price: 725, desc: 'Smirnoff vodka infused with fresh muddled berries & lime juice.' },
    { name: 'The Spy Cocktail', price: 675, desc: 'Dark rum, coffee liqueur, espresso shot & cinnamon syrup.' },
    { name: 'German Lager Craft Beer (500 ml)', price: 475, desc: 'Authentic bavarian style smooth golden dark lager.' }
  ];

  const drinksBestSellersSpiritsWines = [
    { name: 'Corona Extra Beer Pint', price: 725, desc: 'Classic Mexican pale lager served ice cold with fresh lime slice.', badge: 'Bestseller' },
    { name: 'Hoegaarden Belgian Wheat Pint', price: 725, desc: 'Famous Belgian wheat beer naturally cloudy with citrus spice.', badge: 'Bestseller' },
    { name: 'Crystal Bloom Luxury Cocktail', price: 3445, desc: 'Ultra premium craft cocktail served in crystal glass with edible gold leaf.', badge: 'Luxury' },
    { name: 'Royal Ember Reserve Cocktail', price: 2335, desc: 'Aged single malt whisky smoke-infused cocktail with orange bitters.', badge: 'Luxury' },
    { name: 'Sula Shiraz Red Wine (Glass)', price: 695, desc: 'Smooth Indian red wine with rich plum & berry aromas.', badge: 'Bestseller' },
    { name: 'Jacob’s Creek Shiraz Cabernet (Glass)', price: 850, desc: 'Premium Australian red wine with bold cherry & oak notes.', badge: 'Must Try' },
    { name: 'Berry Blast Mocktail', price: 395, desc: 'Fresh muddled mixed berries, mint leaves, lime & sparkling soda.', badge: 'Bestseller' },
    { name: 'Passion Fruit Mint Cooler', price: 395, desc: 'Tropical passion fruit puree, fresh mint, lemon & ginger ale.', badge: 'Must Try' },
    { name: 'Virgin Mojito', price: 345, desc: 'Fresh garden mint, crushed lime, sugar syrup & sparkling soda.' },
    { name: 'Brewocrat Peach Iced Tea', price: 295, desc: 'House-brewed iced tea infused with sweet peach & lemon zest.' }
  ];

  // Get active dataset based on mode
  const currentCategories = menuMode === 'food' ? menuCategories : drinksCategories;
  const currentSourceItems = menuMode === 'food' ? menuItems : drinksItems;

  // Filter items based on active category, diet/bar filter & search query
  const filteredItems = useMemo(() => {
    return currentSourceItems.filter((item) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      // Diet / Bar filter
      const matchesDiet = activeDiet === 'all' || item.type === activeDiet;
      // Search query
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [currentSourceItems, activeCategory, activeDiet, searchQuery]);

  const ease = [0.22, 1, 0.36, 1];
  const bestSellers = menuMode === 'food'
    ? [foodBestSellersVeg[5], foodBestSellersNonVeg[0], foodBestSellersVeg[0], foodBestSellersNonVeg[1]]
    : [...drinksBestSellersCocktailsBeers.slice(0, 3), drinksBestSellersSpiritsWines[6]];
  const bestImage = (item) => {
    const src = (menuMode === 'food' ? menuItems : drinksItems).find((i) => i.name === item.name);
    return getItemImage(src || item);
  };
  const gold = 'bg-gradient-to-r from-[#EBCB86] via-[#D9A441] to-[#B87333] text-[#2A1A10]';

  return (
    <div className="menu-page">
      {/* Inner Banner */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden border-b border-[#D9A441]/20 sm:min-h-[650px]">
        <img
          src="/interior/brewocrat_interior.jpg"
          alt="The warm, atmospheric interior at Brewocrat"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A10]/90 via-[#2A1A10]/55 to-[#2A1A10]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10] via-transparent to-[#2A1A10]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9A441]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#EBCB86]">Brewocrat · Gurugram</span>
            </div>
            <h1 className="max-w-3xl font-serif text-6xl font-light leading-[0.95] tracking-tight text-[#F7EFE0] sm:text-7xl lg:text-8xl">
              Come hungry.<br /><span className="italic text-[#EBCB86]">Stay a little.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#F7EFE0]/75 sm:text-base">
              From first pours to one-more-bite favourites: a menu made for long evenings, shared plates and good company.
            </p>
            <a href="#full-menu" className="mt-8 inline-flex items-center gap-3 border-b border-[#EBCB86]/70 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EBCB86] transition hover:border-[#EBCB86] hover:text-white">
              Explore the menu <FaChevronRight aria-hidden="true" className="text-[9px]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Menu mode switch */}
      <section className="sticky top-0 z-30 border-b border-[#D9A441]/15 bg-[#4A2C18]/95 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-[#E6D3B3]/55 sm:block">The Brewocrat menu</span>
          <div className="relative mx-auto inline-flex rounded-full border border-[#D9A441]/25 brew-card p-1 sm:mx-0">
            {[{ id: 'food', label: 'Food' }, { id: 'drinks', label: 'Drinks & Bar' }].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModeChange(m.id)}
                className="relative z-10 cursor-pointer px-7 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 sm:px-10 sm:text-xs"
                style={{ color: menuMode === m.id ? '#2A1A10' : '#E6D3B3' }}
              >
                {menuMode === m.id && (
                  <motion.span
                    layoutId="modePill"
                    className={`absolute inset-0 rounded-full ${gold}`}
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                  />
                )}
                {m.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setIsCartOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/30 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#EBCB86] transition hover:bg-[#D9A441] hover:text-[#2A1A10]" aria-label={`Open cart with ${cartCount} items`}>
            <FaCartShopping aria-hidden="true" /> <span className="hidden sm:inline">Your order</span> <span>{cartCount}</span>
          </button>
        </div>
      </section>

      {/* BEST SELLERS — image cards */}
      <section className="menu-one alternate section-kt pt-14 pb-10 md:pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
            <motion.div key={menuMode} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-px bg-[#D9A441]/60" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#D9A441] font-semibold">
                  {menuMode === 'food' ? 'Most loved dishes' : 'Top pours & bar favourites'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-wide leading-[1.05]">
                {menuMode === 'food' ? 'The crowd ' : 'A few good '}<span className="italic text-[#D9A441] font-light">favourites</span>
              </h2>
            </motion.div>
            <div className="hidden items-center gap-3 shrink-0 sm:flex">
              {[['left', FaChevronLeft], ['right', FaChevronRight]].map(([dir, Icon]) => (
                <button key={dir} type="button" onClick={() => scrollBestSeller(dir)} aria-label={`Scroll ${dir}`}
                  className="w-11 h-11 rounded-full border border-[#D9A441]/40 text-[#D9A441] flex items-center justify-center hover:bg-[#D9A441] hover:text-[#2A1A10] transition-all duration-500 cursor-pointer">
                  <Icon className="text-xs" />
                </button>
              ))}
            </div>
          </div>

          <div ref={bestSellerScrollRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 scroll-smooth sm:gap-5">
            {bestSellers.map((item, i) => (
              <motion.article
                key={menuMode + item.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: Math.min(i, 6) * 0.07 }}
                className="group relative aspect-[4/3] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#D9A441]/20 brew-card transition-colors duration-700 hover:border-[#D9A441]/80 sm:w-[280px] lg:w-[300px]"
              >
                <img src={bestImage(item)} alt={item.name} loading="lazy" draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  style={{ filter: 'brightness(.8) saturate(1.08)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,26,16,.97) 0%, rgba(42,26,16,.55) 42%, rgba(42,26,16,.1) 75%, rgba(42,26,16,.4) 100%)' }} />
                {item.badge && (
                  <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-[0.22em] font-bold px-2.5 py-1 ${gold}`}>{item.badge}</span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="h-px w-8 bg-[#D9A441] mb-3 transition-all duration-700 group-hover:w-16" />
                  <p className="mb-2 font-serif text-xl leading-tight text-[#F7EFE0]">{item.name}</p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-[#E6D3B3]/80">{item.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-serif text-2xl text-[#EBCB86]">₹{item.price}</span>
                    <button type="button" onClick={(event) => { event.stopPropagation(); addToCart(item); }}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-[#D9A441]/60 bg-[#2A1A10]/80 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#EBCB86] hover:bg-[#D9A441] hover:text-[#2A1A10] transition-colors"
                      aria-label={`Add ${item.name} to cart`}>
                      <FaCartShopping aria-hidden="true" />
                      Add +
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL MENU */}
      <section className="menu-section section-kt pt-10 pb-16 md:pb-28" id="full-menu">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-8">
          <div className="mb-8 flex flex-col items-start border-b border-[#D9A441]/15 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
              <span className="w-10 h-px bg-[#D9A441]/60" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D9A441] font-semibold">
                {menuMode === 'food' ? 'The complete kitchen' : 'The complete skybar'}
              </span>
              <span className="w-10 h-px bg-[#D9A441]/60" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-wide text-[#F7EFE0] sm:text-5xl">
                {menuMode === 'food' ? 'Food, ' : 'Drinks, '}<span className="italic text-[#D9A441]">{menuMode === 'food' ? 'beautifully done.' : 'poured well.'}</span>
              </h2>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#E6D3B3]/60 sm:mt-0">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} · Made to order, best enjoyed together.
            </p>
          </div>

          {/* Search, diet filter and category navigation */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 mb-8">
            <div className="relative w-full md:w-96">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={menuMode === 'food' ? 'Search the menu…' : 'Search drinks…'}
                aria-label="Search menu"
                className="w-full border-0 border-b border-[#D9A441]/40 bg-transparent px-1 py-3 text-sm text-[#F7EFE0] placeholder:text-[#E6D3B3]/35 focus:border-[#D9A441] focus:outline-none focus:ring-0 transition-colors" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-1 top-2.5 text-xs text-[#E6D3B3]/60 hover:text-white">✕</button>
              )}
            </div>
            {menuMode === 'food' ? (
              <button type="button" role="switch" aria-label="Veg only" aria-checked={activeDiet === 'veg'}
                onClick={() => setActiveDiet(activeDiet === 'veg' ? 'all' : 'veg')}
                className="inline-flex cursor-pointer items-center justify-center gap-3 self-start rounded-full border border-[#D9A441]/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E6D3B3] transition hover:border-[#D9A441]">
                <span aria-hidden="true" className={`relative h-5 w-9 rounded-full transition-colors ${activeDiet === 'veg' ? 'bg-[#D9A441]' : 'bg-white/15'}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${activeDiet === 'veg' ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                </span>
                Veg only
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {[['all', 'All'], ['alcohol', 'Alcoholic'], ['mocktail', 'Non-Alcoholic']].map(([id, label]) => (
                  <button key={id} type="button" onClick={() => setActiveDiet(id)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition ${activeDiet === id ? `${gold} border-transparent` : 'border-[#D9A441]/25 text-[#E6D3B3]/80 hover:border-[#D9A441]'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="Menu categories" className="-mx-1 mb-9 flex gap-2 overflow-x-auto px-1 pb-3">
            {currentCategories.map((cat) => (
              <button key={cat.id} type="button" onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition sm:px-5 ${
                  activeCategory === cat.id
                    ? 'border-[#D9A441] bg-[#D9A441] text-[#2A1A10]'
                    : 'border-[#D9A441]/20 bg-white/[0.02] text-[#E6D3B3]/65 hover:border-[#D9A441]/60 hover:text-[#EBCB86]'
                }`}>
                {cat.name}
              </button>
            ))}
          </nav>

          {filteredItems.length > 0 ? (
            <MenuSplit items={filteredItems} categories={currentCategories} onAddToCart={addToCart} />
          ) : (
            <div className="rounded-2xl border border-[#D9A441]/20 brew-card py-16 text-center">
              <div className="mb-3 text-3xl">{menuMode === 'food' ? '✳' : '◉'}</div>
              <h3 className="mb-1 font-serif text-2xl text-white">Nothing on the menu by that name.</h3>
              <p className="mb-5 text-sm text-[#E6D3B3]/60">Try another search or category.</p>
              <button type="button" onClick={() => { setActiveCategory('all'); setActiveDiet('all'); setSearchQuery(''); }}
                className="rounded-full bg-[#D9A441] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2A1A10] hover:bg-[#EBCB86]">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {createPortal(
        <>
          {cartCount > 0 && !isCartOpen && (
            <button type="button" onClick={() => setIsCartOpen(true)}
              className="fixed bottom-6 right-6 z-[10000] inline-flex items-center gap-3 rounded-full border border-[#EBCB86]/60 brew-card px-5 py-3 text-sm font-semibold text-[#EBCB86] shadow-[0_12px_40px_rgba(42,26,16,.7)] transition hover:bg-[#D9A441] hover:text-[#2A1A10]"
              aria-label={`Open cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}>
              <FaCartShopping aria-hidden="true" />
              Cart <span className="rounded-full bg-[#D9A441] px-2 py-0.5 text-xs text-[#2A1A10]">{cartCount}</span>
            </button>
          )}
          {isCartOpen && (
            <div className="fixed inset-0 z-[10001] flex justify-end">
              <button type="button" onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 cursor-default bg-[#2A1A10]/75 backdrop-blur-sm"
                aria-label="Close cart" />
              <section role="dialog" aria-modal="true" aria-labelledby="cart-title"
                className="relative flex h-full w-full max-w-md flex-col border-l border-[#D9A441]/30 brew-card p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between border-b border-[#D9A441]/20 pb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D9A441]">Your selection</p>
                    <h2 id="cart-title" className="mt-1 font-serif text-3xl text-[#F7EFE0]">Cart ({cartCount})</h2>
                  </div>
                  <button type="button" onClick={() => setIsCartOpen(false)}
                    className="rounded-full border border-[#D9A441]/30 px-3 py-2 text-xs uppercase tracking-widest text-[#E6D3B3] hover:border-[#D9A441] hover:text-[#EBCB86]">
                    Close
                  </button>
                </div>
                {orderConfirmation ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 text-xl text-[#EBCB86]">✓</span>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#D9A441]">Order saved</p>
                    <h3 className="mt-2 font-serif text-3xl text-[#F7EFE0]">Thank you for ordering.</h3>
                    <p className="mt-3 text-sm text-[#E6D3B3]/70">Order reference <strong className="text-[#EBCB86]">{orderConfirmation}</strong></p>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-[#E6D3B3]/55">This demo records your order on this device. Payment, taxes and POS/KOT integration would be added in production.</p>
                    <button type="button" onClick={() => { setOrderConfirmation(''); setIsCartOpen(false); }}
                      className="mt-7 rounded-full bg-[#D9A441] px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1A10] hover:bg-[#EBCB86]">
                      Continue exploring
                    </button>
                  </div>
                ) : cartItems.length ? (
                  <>
                    <ul className="max-h-[34vh] space-y-5 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <li key={item.name} className="flex items-center justify-between gap-4 border-b border-[#D9A441]/15 pb-4">
                          <div className="min-w-0">
                            <h3 className="font-serif text-lg leading-tight text-[#F7EFE0]">{item.name}</h3>
                            <p className="mt-1 text-sm text-[#D9A441]">₹{item.price} each</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <button type="button" onClick={() => updateCartQuantity(item.name, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A441]/40 text-[#EBCB86] hover:bg-[#D9A441] hover:text-[#2A1A10]"
                              aria-label={`Remove one ${item.name}`}>−</button>
                            <span className="min-w-4 text-center text-sm text-[#F7EFE0]">{item.quantity}</span>
                            <button type="button" onClick={() => updateCartQuantity(item.name, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A441]/40 text-[#EBCB86] hover:bg-[#D9A441] hover:text-[#2A1A10]"
                              aria-label={`Add one ${item.name}`}>+</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={handleCheckout} className="mt-5 flex-1 overflow-y-auto border-t border-[#D9A441]/25 pt-5">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#D9A441]">How would you like it?</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {[['dine-in', 'Dine-in · QR'], ['delivery', 'Direct delivery']].map(([mode, label]) => (
                          <button key={mode} type="button" onClick={() => setOrderMode(mode)}
                            aria-pressed={orderMode === mode}
                            className={`rounded-xl border px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${orderMode === mode ? 'border-[#D9A441] bg-[#D9A441]/10 text-[#EBCB86]' : 'border-[#D9A441]/20 text-[#E6D3B3]/65 hover:border-[#D9A441]/60'}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-[11px] leading-5 text-[#E6D3B3]/55">
                        {orderMode === 'dine-in' ? 'Scan the QR at your table to prefill its code, or enter your table code below.' : 'We’ll deliver to the address you provide in Gurugram.'}
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <input required value={orderData.name} onChange={(event) => setOrderData({ ...orderData, name: event.target.value })}
                          autoComplete="name" aria-label="Your name" placeholder="Your name"
                          className="w-full rounded-lg border border-[#D9A441]/25 brew-card px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]" />
                        <input required type="tel" value={orderData.phone} onChange={(event) => setOrderData({ ...orderData, phone: event.target.value })}
                          autoComplete="tel" aria-label="Phone number" placeholder="Phone number"
                          className="w-full rounded-lg border border-[#D9A441]/25 brew-card px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]" />
                        {orderMode === 'dine-in' ? (
                          <input required value={orderData.tableCode} onChange={(event) => setOrderData({ ...orderData, tableCode: event.target.value })}
                            aria-label="Table code" placeholder="Table code" className="w-full rounded-lg border border-[#D9A441]/25 brew-card px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441] sm:col-span-2" />
                        ) : (
                          <textarea required rows="2" value={orderData.address} onChange={(event) => setOrderData({ ...orderData, address: event.target.value })}
                            autoComplete="street-address" aria-label="Delivery address" placeholder="Full delivery address"
                            className="w-full resize-y rounded-lg border border-[#D9A441]/25 brew-card px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441] sm:col-span-2" />
                        )}
                      </div>
                      {orderError && <p role="alert" className="mt-3 text-xs leading-5 text-red-300">{orderError}</p>}
                      <div className="mt-5 border-t border-[#D9A441]/25 pt-4">
                        <div className="flex items-center justify-between font-serif text-xl text-[#F7EFE0]">
                          <span>Subtotal</span><span className="text-[#EBCB86]">₹{cartTotal}</span>
                        </div>
                        <p className="mt-2 text-[11px] leading-5 text-[#E6D3B3]/55">Payment, taxes and POS/KOT integration would be added in production.</p>
                        <button type="submit" className="mt-4 w-full rounded-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2A1A10] transition hover:brightness-110">
                          Place order · ₹{cartTotal}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <p className="py-8 text-center text-sm text-[#E6D3B3]/65">Your cart is empty.</p>
                )}
              </section>
            </div>
          )}
        </>,
        document.body
      )}

      <section className="relative overflow-hidden border-y border-[#D9A441]/20 py-16 sm:py-24">
        <div className="absolute inset-0">
          <img src="/interior/seating2.jpg" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A10] via-[#2A1A10]/90 to-[#2A1A10]/60" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D9A441]">Make an evening of it</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-[#F7EFE0] sm:text-5xl">The table is better when it’s yours.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#E6D3B3]/65">Reserve your spot for dinner, or join us for Friday Bollywood & Punjabi Night.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book-table" className="rounded-full bg-[#D9A441] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#2A1A10] transition hover:bg-[#EBCB86]">Reserve a table</Link>
            <Link to="/book-table?event=Friday%20Bollywood%20Night" className="rounded-full border border-[#D9A441]/45 bg-[#2A1A10]/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#EBCB86] transition hover:border-[#D9A441]">Reserve for Friday night</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
