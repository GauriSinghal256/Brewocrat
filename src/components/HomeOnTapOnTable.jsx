import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBeerMugEmpty, FaUtensils, FaArrowRight, FaWineGlass, FaFire, FaLeaf } from 'react-icons/fa6';

const BEERS_AND_DRINKS = [
  {
    id: 'tropical-ale',
    title: 'Tropical Belgian Mango Ale',
    category: 'Craft Ale on Tap',
    price: '₹495 (500ml)',
    abv: '4.8% ABV',
    ibu: '15 IBU',
    notes: 'Belgian wheat base, juicy mango, citrus coriander aroma',
    temp: '2°C Frost Cold',
    badge: 'House Bestseller',
    image: '/images/beers/beer_tropical_ale.jpg',
    color: '#D9A441',
  },
  {
    id: 'golden-lager',
    title: 'Bavarian Golden Lager',
    category: 'Craft Lager on Tap',
    price: '₹475 (500ml)',
    abv: '5.0% ABV',
    ibu: '22 IBU',
    notes: 'Classic Munich malt profile, crisp clean finish, golden honey hue',
    temp: '2°C Frost Cold',
    badge: 'Brewmaster Select',
    image: '/images/beers/beer_golden_pour.jpg',
    color: '#E0A21C',
  },
  {
    id: 'pale-ale',
    title: 'Hoppy American Pale Ale',
    category: 'Craft Ale on Tap',
    price: '₹475 (500ml)',
    abv: '5.4% ABV',
    ibu: '34 IBU',
    notes: 'Cascade & Citra hops, vibrant pine and grapefruit notes',
    temp: '3°C Cold Poured',
    badge: 'Hop Lover’s Choice',
    image: '/images/beers/beer_pale_ale.jpg',
    color: '#C76B42',
  },
  {
    id: 'dark-lager',
    title: 'Smoky German Dark Lager',
    category: 'Craft Lager on Tap',
    price: '₹475 (500ml)',
    abv: '5.2% ABV',
    ibu: '20 IBU',
    notes: 'Toasted Munich malts, roasted coffee beans & dark chocolate hint',
    temp: '4°C Conditioned',
    badge: 'Rich & Velvety',
    image: '/images/beers/beer_dark_lager.jpg',
    color: '#6B3D2E',
  },
  {
    id: 'beer-tower',
    title: '3-Litre Ice-Core Beer Tower',
    category: 'Group Specialty',
    price: '₹1,895 (3000ml)',
    abv: 'Any Draft Beer',
    ibu: 'Tabletop Tap',
    notes: 'Sub-zero frozen central core keeps your draft icy cold for 3 hours',
    temp: 'Sub-Zero Core',
    badge: 'Party Magnet',
    image: '/images/craft_beer_tower.png',
    color: '#D9A441',
  },
  {
    id: 'cocktail-sapphire',
    title: 'Indian Sapphire Cocktail',
    category: 'Artisanal Mixology',
    price: '₹755',
    abv: 'Signature',
    ibu: 'Botanical',
    notes: 'Bombay Sapphire gin, green cardamom elixir, tonic & edible gold glitter',
    temp: 'Shaken Over Ice',
    badge: 'Skybar Special',
    image: '/images/cocktails_bar.png',
    color: '#4A6FA5',
  },
];

const SIGNATURE_FOOD = [
  {
    id: 'mezze-feast',
    title: 'Big Fat Mediterranean Mezze Feast',
    category: 'Sharing Feast',
    price: '₹695',
    diet: 'veg',
    spiciness: 'Herbaceous & Fresh',
    pairing: 'Tropical Belgian Ale',
    badge: 'Crowd Favourite',
    desc: 'Crispy falafels, smoked babaganoush, silky beetroot hummus, tzatziki, marinated olives, and freshly baked pita bread.',
    image: '/images/mediterranean_platter.png',
  },
  {
    id: 'moroccan-wings',
    title: 'Nutty Moroccan Chicken Wings',
    category: 'Starters & Grills',
    price: '₹745',
    diet: 'non-veg',
    spiciness: 'Sweet & Spicy Glaze',
    pairing: 'Hoppy Pale Ale',
    badge: 'Chef Signature',
    desc: 'Flame-roasted chicken wings glazed in Moroccan spices, pomegranate molasses, and roasted crushed pistachio crunch.',
    image: '/images/meat_platter_wings.png',
  },
  {
    id: 'truffle-pizza',
    title: 'Wood-Fired Truffle Margherita',
    category: 'Artisan Sourdough Pizza',
    price: '₹625',
    diet: 'veg',
    spiciness: 'Aromatic Truffle',
    pairing: 'Bavarian Golden Lager',
    badge: 'House Special',
    desc: '48-hour fermented sourdough crust, San Marzano tomato sugo, fior di latte mozzarella, and cold-pressed white truffle oil drizzle.',
    image: '/images/special-dish4.png',
  },
  {
    id: 'shahi-paneer',
    title: 'Shahi Paneer Tikka Lababdar',
    category: 'Tandoor & Claypot',
    price: '₹595',
    diet: 'veg',
    spiciness: 'Velvety Mild',
    pairing: 'Tropical Wheat Beer',
    badge: 'Awadhi Heritage',
    desc: 'Charcoal-grilled cottage cheese steeped in rich butter tomato gravy infused with cashews and fragrant fenugreek leaves.',
    image: '/images/plate_shahi_paneer.png',
  },
  {
    id: 'rogan-josh',
    title: 'Smokey Mutton Rogan Josh',
    category: 'Slow-Cooked Handi',
    price: '₹745',
    diet: 'non-veg',
    spiciness: 'Rich & Aromatic',
    pairing: 'Smoky Dark Lager',
    badge: 'Royal Recipe',
    desc: 'Tender baby mutton pieces slow-cooked for 6 hours in Kashmiri red chili, caramelized onions, and whole aromatic spices.',
    image: '/images/bhuna_gosht_curry.png',
  },
  {
    id: 'zafrani-biryani',
    title: 'Dum Pukht Zafrani Biryani',
    category: 'Heritage Awadhi Handi',
    price: '₹645',
    diet: 'non-veg',
    spiciness: 'Aromatic Saffron',
    pairing: 'Burani Garlic Raita & Lager',
    badge: 'Must Try',
    desc: 'Fragrant long-grain aged basmati rice sealed in earthen claypot with marinated mutton, saffron milk, and fried shallots.',
    image: '/images/special-dish3.png',
  },
];

export default function HomeOnTapOnTable({ onOpenBookModal }) {
  const [activeTab, setActiveTab] = useState('tap'); // 'tap' | 'table'

  return (
    <section id="on-tap-and-table" className="relative py-20 sm:py-28 brew-wall overflow-hidden border-t border-[#D9A441]/15">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#D9A441]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#C76B42]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D9A441]/30 bg-[#2A1A10]/60 backdrop-blur-md mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9A441] font-bold">
              03 / ON TAP & ON THE TABLE
            </span>
          </div>

          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1">
            Crafted by the Brewmaster, Plated by the Chef
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-tight mt-1 mb-4">
            Fresh Brews, Botanical Cocktails & <span className="italic text-[#D9A441]">Artisan Food.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E6D3B3]/75 font-light leading-relaxed">
            Every pint is cold-conditioned right on our 2nd floor brewhouse and poured directly to your glass. Every dish is cooked fresh from scratch to complement our craft beer flights.
          </p>

          {/* Interactive Switcher Pill */}
          <div className="mt-8 inline-flex rounded-full border border-white/15 bg-[#1A110B]/80 p-1.5 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setActiveTab('tap')}
              className={`relative flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'tap'
                  ? 'text-[#2A1A10]'
                  : 'text-[#E6D3B3] hover:text-[#F7EFE0]'
              }`}
            >
              {activeTab === 'tap' && (
                <motion.span
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EBCB86] shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <FaBeerMugEmpty className="relative z-10 text-sm" />
              <span className="relative z-10">On Tap & Cocktails</span>
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`relative flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'table'
                  ? 'text-[#2A1A10]'
                  : 'text-[#E6D3B3] hover:text-[#F7EFE0]'
              }`}
            >
              {activeTab === 'table' && (
                <motion.span
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EBCB86] shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <FaUtensils className="relative z-10 text-sm" />
              <span className="relative z-10">On The Table (Kitchen)</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: ON TAP & COCKTAILS */}
        <AnimatePresence mode="wait">
          {activeTab === 'tap' && (
            <motion.div
              key="tap-view"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {BEERS_AND_DRINKS.map((drink, idx) => (
                <div
                  key={drink.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#24150C]/80 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#D9A441]/50 hover:shadow-[0_20px_45px_rgba(217,164,65,0.18)]"
                >
                  {/* Top Image Showcase */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-5 border border-white/10">
                      <img
                        src={drink.image}
                        alt={drink.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/craft_beer_tower.png';
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/85 via-transparent" />

                      {/* Badge */}
                      <span className="absolute top-3 left-3 rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#2A1A10] shadow-md">
                        {drink.badge}
                      </span>

                      {/* Temperature pill */}
                      <span className="absolute bottom-3 right-3 rounded-md bg-[#1A110B]/80 px-2.5 py-1 text-[10px] font-semibold text-[#EBCB86] backdrop-blur-md border border-white/10">
                        {drink.temp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
                        {drink.category}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-[#EBCB86] font-semibold">
                        <span>{drink.abv}</span>
                        <span>•</span>
                        <span>{drink.ibu}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal leading-snug mb-2 group-hover:text-[#D9A441] transition-colors">
                      {drink.title}
                    </h3>

                    <p className="text-xs text-[#E6D3B3]/75 font-light leading-relaxed mb-5">
                      {drink.notes}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#E6D3B3]/60 block">Price</span>
                      <span className="font-semibold text-lg text-[#EBCB86]">{drink.price}</span>
                    </div>

                    <Link
                      to="/menu?tab=drinks"
                      className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/50 bg-[#D9A441]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#EBCB86] transition-all hover:bg-[#D9A441] hover:text-[#2A1A10]"
                    >
                      <span>Details</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab Content 2: ON THE TABLE (KITCHEN) */}
          {activeTab === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SIGNATURE_FOOD.map((dish, idx) => (
                <div
                  key={dish.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#24150C]/80 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#D9A441]/50 hover:shadow-[0_20px_45px_rgba(217,164,65,0.18)]"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-5 border border-white/10">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/maindish1.jpg';
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/85 via-transparent" />

                      {/* Dietary Dot */}
                      <span className="absolute top-3 left-3 rounded-md bg-[#1A110B]/80 p-1.5 backdrop-blur-md border border-white/10">
                        <span
                          className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                            dish.diet === 'veg' ? 'border-[#3E9B6A]' : 'border-[#C0504D]'
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              dish.diet === 'veg' ? 'bg-[#3E9B6A]' : 'bg-[#C0504D]'
                            }`}
                          />
                        </span>
                      </span>

                      {/* Badge */}
                      <span className="absolute top-3 right-3 rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#2A1A10] shadow-md">
                        {dish.badge}
                      </span>

                      {/* Spiciness / Style */}
                      <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-[#1A110B]/80 px-2.5 py-1 text-[10px] font-semibold text-[#EBCB86] backdrop-blur-md border border-white/10">
                        <FaFire className="text-xs text-[#C76B42]" />
                        <span>{dish.spiciness}</span>
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441] block mb-1">
                      {dish.category}
                    </span>

                    <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal leading-snug mb-2 group-hover:text-[#D9A441] transition-colors">
                      {dish.title}
                    </h3>

                    <p className="text-xs text-[#E6D3B3]/75 font-light leading-relaxed mb-4">
                      {dish.desc}
                    </p>

                    <div className="rounded-xl border border-white/10 bg-[#1A110B]/60 p-2.5 mb-4 text-[11px] text-[#EBCB86]">
                      <span className="text-[#D9A441] font-semibold">Suggested Pairing: </span>
                      <span>{dish.pairing}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#E6D3B3]/60 block">Price</span>
                      <span className="font-semibold text-lg text-[#EBCB86]">{dish.price}</span>
                    </div>

                    <Link
                      to="/menu?tab=food"
                      className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/50 bg-[#D9A441]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#EBCB86] transition-all hover:bg-[#D9A441] hover:text-[#2A1A10]"
                    >
                      <span>Full Menu</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Full Menu CTA Button */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#B07A2E] via-[#D9A441] to-[#B07A2E] px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1A10] shadow-[0_8px_30px_rgba(217,164,65,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore All 100+ Selections</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>

    </section>
  );
}
