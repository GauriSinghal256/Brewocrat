import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBeerMugEmpty, FaFire, FaCircleInfo, FaArrowRight, FaWineGlass } from 'react-icons/fa6';

export default function CraftTapsShowcase({ onOpenBookModal }) {
  const beers = [
    {
      id: 'tropical-ale',
      name: 'Tropical Ale',
      subtitle: 'Belgian Wheat Style',
      abv: '4.8%',
      ibu: '15',
      temp: '2°C',
      color: '#D9A441',
      badge: 'Bestseller',
      flavor: 'Citrus, Coriander & Mango',
      desc: 'Our flagship brew. Naturally cloudy Belgian-style wheat ale infused with dried Valencian orange peel, Indian coriander, and aromatic tropical hops. Refreshingly smooth with a velvety head.',
      pairing: 'Big Fat Mezze Platter, Margherita Pizza, Citrus Salads',
      price: '₹495',
      metrics: { bitterness: 30, aroma: 92, sweetness: 55, body: 65 }
    },
    {
      id: 'german-lager',
      name: 'German Bavarian Lager',
      subtitle: 'Munich Helles Style',
      abv: '5.0%',
      ibu: '22',
      temp: '2°C',
      color: '#EBCB86',
      badge: 'Classic Heritage',
      flavor: 'Crisp Malt, Honey & Floral Hops',
      desc: 'Brewed strictly adhering to the Bavarian Reinheitsgebot tradition. Cold-conditioned for six weeks for an exceptionally clean, sparkling golden lager with subtle biscuit notes.',
      pairing: 'Smokey Mutton Tikka, Butter Chicken Kulcha, Crispy Wings',
      price: '₹475',
      metrics: { bitterness: 45, aroma: 70, sweetness: 40, body: 60 }
    },
    {
      id: 'pale-ale',
      name: 'Brewocrat Pale Ale',
      subtitle: 'American Craft Pale Ale',
      abv: '5.4%',
      ibu: '34',
      temp: '3°C',
      color: '#B07A2E',
      badge: 'Hop Forward',
      flavor: 'Pine, Grapefruit & Caramel',
      desc: 'Generously dry-hopped with Cascade and Centennial hops. Explodes with aromas of grapefruit zest and resinous pine, anchored by a caramelized Munich malt foundation.',
      pairing: 'Spicy Peri-Peri Wings, Pepperoni Pizza, Barbeque Platter',
      price: '₹475',
      metrics: { bitterness: 85, aroma: 95, sweetness: 35, body: 75 }
    },
    {
      id: 'dark-lager',
      name: 'Smoky German Dark Lager',
      subtitle: 'Bavarian Schwarzbier',
      abv: '5.2%',
      ibu: '20',
      temp: '4°C',
      color: '#A4452A',
      badge: 'Brewmaster Reserve',
      flavor: 'Roasted Cacao, Oak Smoke & Toffee',
      desc: 'A dark, brooding masterpiece that drinks surprisingly light and crisp. Roasted German Carafa malts impart bittersweet dark chocolate notes with a subtle kiss of beechwood smoke.',
      pairing: 'Slow-Cooked Bhuna Gosht, Grilled Lamb Chops, Dark Chocolate Mousse',
      price: '₹475',
      metrics: { bitterness: 50, aroma: 85, sweetness: 60, body: 80 }
    },
    {
      id: 'ale-tower',
      name: 'Tropical Ale Tower (3 Ltr)',
      subtitle: 'Social Table Tap Dispenser',
      abv: '4.8%',
      ibu: '15',
      temp: '1°C',
      color: '#D9A441',
      badge: 'Social Signature',
      flavor: 'Ice-Chilled Social Pour',
      desc: 'The centerpiece of every celebration at Brewocrat. A 3-litre insulated tower with an internal ice core chamber that keeps your beer frost-cold at the table all evening.',
      pairing: 'Grand Non-Veg Mezze Feast, Gathering Sliders & Nachos',
      price: '₹1,895',
      metrics: { bitterness: 30, aroma: 90, sweetness: 55, body: 70 }
    },
    {
      id: 'taster-flight',
      name: 'Brewocrat Taster Flight',
      subtitle: '4 x 150ml Sampler Set',
      abv: 'Mixed',
      ibu: 'Var.',
      temp: '2°C',
      color: '#E6D3B3',
      badge: 'First-Timer Pick',
      flavor: 'All Signature Brews',
      desc: 'Can’t choose? Experience our complete brewing repertoire with a four-glass flight paddle presented with tasting notes from our cellar team.',
      pairing: 'Chef Appetizers Platter, Artisanal Cheese Board',
      price: '₹345',
      metrics: { bitterness: 60, aroma: 90, sweetness: 50, body: 70 }
    }
  ];

  const [activeBeer, setActiveBeer] = useState(beers[0]);

  return (
    <section id="fresh-on-tap" className="relative py-24 sm:py-32 brew-wall overflow-hidden">
      
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#B07A2E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-[#A4452A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Editorial Tengile Style */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-14 sm:mb-20 pb-8 border-b border-[#D9A441]/20">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#D9A441]/40" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              01 / Fresh On Tap
            </span>
            <span className="w-8 h-px bg-[#D9A441]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] uppercase font-normal tracking-wide">
            The Brewmaster's <span className="italic text-[#D9A441]">Taps</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#E6D3B3]/80 max-w-xl font-light leading-relaxed">
            Crafted daily in our microbrewery vats at Element One Gurgaon. Zero preservatives, unpasteurized,
            and served directly from our conditioning tanks at a crisp 2°C.
          </p>
        </div>

        {/* Two-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Beer Selector List (6 Cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {beers.map((beer) => {
              const isSelected = activeBeer.id === beer.id;
              return (
                <motion.div
                  key={beer.id}
                  onClick={() => setActiveBeer(beer)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-400 relative overflow-hidden ${
                    isSelected
                      ? 'brew-card border-2 border-[#D9A441] shadow-[0_12px_32px_rgba(217,164,65,0.22)]'
                      : 'bg-[#2A1A10]/80 hover:bg-[#2A1A10]/70 border border-[#D9A441]/15 hover:border-[#D9A441]/40'
                  }`}
                >
                  {/* Active Indicator Flare */}
                  {isSelected && (
                    <span className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D9A441]/25 to-transparent pointer-events-none rounded-tr-2xl" />
                  )}

                  {/* Card Header: Badge & Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded-full brew-card text-[#D9A441] border border-[#D9A441]/30">
                      {beer.badge}
                    </span>
                    <span className="font-serif text-lg text-[#F7EFE0] font-semibold">
                      {beer.price}
                    </span>
                  </div>

                  {/* Beer Title & Style */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F7EFE0] font-normal mb-1">
                    {beer.name}
                  </h3>
                  <p className="text-xs text-[#D9A441] font-medium tracking-wide uppercase mb-3">
                    {beer.subtitle}
                  </p>

                  {/* Flavor Summary */}
                  <p className="text-xs text-[#E6D3B3]/80 line-clamp-2 mb-4 leading-relaxed">
                    {beer.flavor}
                  </p>

                  {/* ABV, IBU, Temp Badges */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#D9A441]/15 text-[11px] text-[#D8C3A5]">
                    <span className="flex items-center gap-1 font-semibold text-[#F7EFE0]">
                      <span className="text-[#D9A441]">ABV:</span> {beer.abv}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-[#F7EFE0]">
                      <span className="text-[#D9A441]">IBU:</span> {beer.ibu}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="text-[#D9A441]">Temp:</span> {beer.temp}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Active Beer Interactive Tasting Dossier */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBeer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 rounded-3xl brew-card border border-[#D9A441]/30 shadow-2xl relative overflow-hidden"
              >
                {/* Background decorative watermark */}
                <div className="absolute -bottom-10 -right-10 text-[180px] font-serif font-black text-white/[0.02] select-none pointer-events-none">
                  BEER
                </div>

                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#D9A441]/20 mb-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9A441] font-bold block mb-1">
                      Tasting Profile Dossier
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE0] uppercase font-normal">
                      {activeBeer.name}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl brew-card border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] text-xl shadow-inner">
                    <FaBeerMugEmpty />
                  </div>
                </div>

                {/* Narrative Tasting Notes */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold mb-2 flex items-center gap-2">
                    <FaCircleInfo className="text-xs" />
                    Flavor & Character
                  </h4>
                  <p className="text-sm text-[#E6D3B3] leading-relaxed font-light">
                    {activeBeer.desc}
                  </p>
                </div>

                {/* Flavor Metrics Radar Bars */}
                <div className="space-y-3 mb-6 p-4 rounded-2xl bg-[#2A1A10]/80 border border-[#D9A441]/15">
                  <div className="text-[11px] uppercase tracking-wider text-[#D8C3A5] font-semibold mb-2">
                    Sensory Balance Indicators
                  </div>

                  {/* Aroma */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E6D3B3]">Hop Aroma</span>
                      <span className="text-[#D9A441] font-semibold">{activeBeer.metrics.aroma}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full brew-card overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] rounded-full transition-all duration-700"
                        style={{ width: `${activeBeer.metrics.aroma}%` }}
                      />
                    </div>
                  </div>

                  {/* Bitterness */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E6D3B3]">Bitterness (IBU Ratio)</span>
                      <span className="text-[#D9A441] font-semibold">{activeBeer.metrics.bitterness}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full brew-card overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] rounded-full transition-all duration-700"
                        style={{ width: `${activeBeer.metrics.bitterness}%` }}
                      />
                    </div>
                  </div>

                  {/* Malt Sweetness & Body */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E6D3B3]">Malt Richness & Body</span>
                      <span className="text-[#D9A441] font-semibold">{activeBeer.metrics.body}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full brew-card overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] rounded-full transition-all duration-700"
                        style={{ width: `${activeBeer.metrics.body}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recommended Food Pairing */}
                <div className="p-4 rounded-2xl bg-[#A4452A]/25 border border-[#A4452A]/40 mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A441] mb-1">
                    <FaFire className="text-xs text-[#B07A2E]" />
                    Chef Pairing Recommendation
                  </div>
                  <p className="text-xs text-[#F7EFE0]/90">
                    {activeBeer.pairing}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full pill-btn-primary group cursor-pointer justify-center"
                  >
                    <span>Reserve Table To Taste</span>
                    <span className="pill-icon-circle">
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </section>
  );
}
