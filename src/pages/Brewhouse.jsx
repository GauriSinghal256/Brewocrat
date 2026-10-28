import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroVideoHeader from '../components/HeroVideoHeader';
import {
  FaBeerMugEmpty,
  FaTemperatureHalf,
  FaWheatAwn,
  FaDroplet,
  FaCheck,
  FaArrowRight,
  FaCircleInfo
} from 'react-icons/fa6';

export default function Brewhouse({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "The Brewhouse — 6 Fresh Taps | Brewocrat Gurugram";
  }, []);

  const [selectedTap, setSelectedTap] = useState('wheat');

  const taps = [
    {
      id: 'wheat',
      name: 'Bavarian Hefeweizen',
      category: 'German Wheat Ale',
      abv: '4.8% ABV',
      ibu: '12 IBU',
      temp: '2°C Pour',
      color: 'Hazy Golden Straw',
      notes: 'Ripe banana, spicy clove, bubblegum aroma, creamy white foamy head',
      flavor: 'Soft, pillowy wheat body with natural carbonation. A classic Munich-style unfiltered wheat ale.',
      pairings: 'Wood-fired sourdough pizza, Cheesy garlic bread, Crispy lotus stem',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg'
    },
    {
      id: 'wit',
      name: 'Belgian Witbier',
      category: 'Spiced Belgian Ale',
      abv: '4.5% ABV',
      ibu: '14 IBU',
      temp: '3°C Pour',
      color: 'Cloudy Pale Yellow',
      notes: 'Curacao orange peel, freshly crushed coriander seeds, subtle chamomile',
      flavor: 'Extremely refreshing, light citrus tartness, smooth zesty finish with herbal elegance.',
      pairings: 'Mediterranean mezze platter, Steamed dim sums, Tandoori broccoli',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp'
    },
    {
      id: 'lager',
      name: 'Munich Premium Lager',
      category: 'Crisp German Lager',
      abv: '4.6% ABV',
      ibu: '18 IBU',
      temp: '2°C Pour',
      color: 'Crystal Clear Bright Amber',
      notes: 'Cracker malt, floral Hallertau noble hops, clean honey undertones',
      flavor: 'Crisp, razor-sharp finish with balanced toasted malt backbone. Easy-drinking all evening.',
      pairings: 'Smoky chicken BBQ wings, Butter chicken kulcha, Handcrafted burgers',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp'
    },
    {
      id: 'ipa',
      name: 'Aromatic India Pale Ale',
      category: 'Hoppy Craft IPA',
      abv: '5.6% ABV',
      ibu: '42 IBU',
      temp: '4°C Pour',
      color: 'Deep Copper Amber',
      notes: 'Grapefruit zest, passionfruit, resinous pine, dry hop aroma',
      flavor: 'Punchy citrus upfront leading into bold, assertive hop bitterness with a clean, dry malt finish.',
      pairings: '24-hour slow mutton curry, Spicy pepperoni pizza, Murg malai tikka',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg'
    },
    {
      id: 'dark',
      name: 'Bohemian Dark Lager',
      category: 'Roasted Schwarzbier',
      abv: '5.0% ABV',
      ibu: '22 IBU',
      temp: '4°C Pour',
      color: 'Rich Roasted Espresso Black',
      notes: 'Roasted coffee beans, bittersweet dark chocolate, caramel malt',
      flavor: 'Surpassingly smooth and light on the palate despite its deep color, with roasted warmth.',
      pairings: 'Charcoal grilled tawa mutton, BBQ pork ribs, Warm chocolate brownie',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg'
    },
    {
      id: 'seasonal',
      name: "Brewer's Seasonal Special",
      category: 'Rotating Tap',
      abv: '5.2% ABV',
      ibu: 'Seasonal',
      temp: '3°C Pour',
      color: 'Varies by Season',
      notes: 'Alphonso Mango Ale in summer / Smoked Winter Porter / Apple Cider',
      flavor: 'Small-batch experimental brew crafted in limited quantities by our master brewmaster.',
      pairings: 'Ask your server for current chef-curated pairings',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp'
    }
  ];

  const currentTap = taps.find((t) => t.id === selectedTap) || taps[0];

  const galleryItems = [
    { image: '/images/craft_beer_tower.png', label: 'Fresh from the brewery' },
    { image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg', label: 'The perfect pour' },
    { image: '/images/maindish1.jpg', label: 'Kitchen craft' },
    { image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp', label: 'Gather around' },
    { image: '/images/meat_platter_wings.png', label: 'Made to share' },
    { image: '/images/cocktails_bar.png', label: 'After-hours energy' },
    { image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg', label: 'Weekend pours' },
    { image: '/images/mediterranean_platter.png', label: 'Big table, bold flavours' },
    { image: '/images/special-dish3.png', label: 'A little indulgence' },
    { image: '/images/slider-1.jpg', label: 'Your kind of night' },
    { image: '/images/spirits_wine_coolers.png', label: 'Raise a glass' },
    { image: '/images/dessert1.jpg', label: 'End on a sweet note' }
  ];

  return (
    <div className="w-full brew-wall text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10]">
      
      {/* 1. Cinematic hero; the video source can be swapped when the final link is ready. */}
      <HeroVideoHeader onOpenBookModal={onOpenBookModal} />

      {/* 2. Pinterest-style visual journal */}
      <section className="relative border-b border-[#D9A441]/20 brew-wall px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]">
                THE BREWOCRAT JOURNAL
              </span>
              <h1 className="font-serif text-4xl font-normal leading-[1.05] text-[#F7EFE0] sm:text-6xl">
                Brewed for <span className="italic text-[#D9A441]">good company.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#E6D3B3]/75 sm:text-base">
                A visual taste of fresh taps, long tables, open kitchens, and the nights that keep Gurugram coming back.
              </p>
            </div>
            <a href="#taps-grid" className="w-fit rounded-full border border-[#D9A441]/35 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F7EFE0] transition hover:border-[#D9A441] hover:text-[#D9A441]">
              Explore the taps
            </a>
          </div>

          <div className="-mx-4 columns-1 gap-4 sm:mx-0 sm:columns-2 lg:columns-3 lg:gap-5">
            {galleryItems.map((item, index) => (
              <motion.figure
                key={`${item.label}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.24) }}
                className="group relative mb-4 break-inside-avoid sm:mb-5"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full object-contain transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/90 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-1 items-end justify-between gap-3 p-4 opacity-90 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-serif text-lg text-[#F7EFE0]">{item.label}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D9A441]/60 text-sm text-[#D9A441]" aria-hidden="true">↗</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 6 Taps Interactive Selector */}
      <section id="taps-grid" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold block mb-2">
            POURING LIVE TODAY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal">
            The Tap Dossier
          </h2>
          <p className="text-sm sm:text-base text-[#E6D3B3]/75 mt-3">
            Select any tap to examine tasting notes, aromatic character, and chef-recommended food pairings.
          </p>
        </div>

        {/* Tap Pill Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {taps.map((tap) => {
            const isSelected = tap.id === selectedTap;
            return (
              <button
                key={tap.id}
                onClick={() => setSelectedTap(tap.id)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#D9A441] text-[#2A1A10] border-[#D9A441] shadow-[0_10px_30px_rgba(217,164,65,0.3)] scale-105'
                    : 'brew-card text-[#F7EFE0] border-[#D9A441]/20 hover:border-[#D9A441]/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${
                  isSelected ? 'brew-card text-[#D9A441]' : 'brew-card text-[#F7EFE0]'
                }`}>
                  <FaBeerMugEmpty />
                </div>
                <div className="font-serif text-base font-semibold leading-tight mb-1">
                  {tap.name.replace('Bavarian ', '').replace('Munich ', '').replace('Bohemian ', '')}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                  isSelected ? 'text-[#2A1A10]' : 'text-[#D9A441]'
                }`}>
                  {tap.abv}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tap Deep Dive Showcase */}
        <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-bold uppercase tracking-wider">
                {currentTap.category}
              </span>
              <span className="px-3 py-1 rounded-full brew-card text-[#F7EFE0] text-xs font-semibold">
                {currentTap.abv}
              </span>
              <span className="px-3 py-1 rounded-full brew-card text-[#F7EFE0] text-xs font-semibold">
                {currentTap.ibu}
              </span>
              <span className="px-3 py-1 rounded-full brew-card text-[#D9A441] text-xs font-semibold">
                {currentTap.temp}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal mb-4">
              {currentTap.name}
            </h3>

            <p className="text-base text-[#E6D3B3]/90 font-light leading-relaxed mb-6">
              {currentTap.flavor}
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl brew-card border border-[#D9A441]/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-1">
                  Aromatic Tasting Notes
                </span>
                <span className="text-sm text-[#F7EFE0]">{currentTap.notes}</span>
              </div>

              <div className="p-4 rounded-xl brew-card border border-[#D9A441]/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-1">
                  Perfect Food Pairings
                </span>
                <span className="text-sm text-[#F7EFE0]">{currentTap.pairings}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenBookModal}
                className="px-7 py-3.5 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Order A Pitcher at Table</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#D9A441]/30 shadow-2xl">
              <img
                src={currentTap.image}
                alt={currentTap.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-transparent to-transparent opacity-80" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Social Formats: Flight Paddles & 3L Table Towers */}
      <section className="relative py-20 sm:py-28 brew-wall border-t border-[#D9A441]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold block mb-2">
              DESIGNED FOR THE TABLE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal">
              Tabletop Social Formats
            </h2>
            <p className="text-sm sm:text-base text-[#E6D3B3]/75 mt-3">
              Craft beer is meant to be shared. Experience our curated social serves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                  THE TASTING RACK
                </span>
                <h3 className="font-serif text-3xl text-[#F7EFE0] font-normal mb-3">
                  Flight Paddles
                </h3>
                <p className="text-sm text-[#E6D3B3]/80 leading-relaxed font-light mb-6">
                  Cannot decide? Order a wooden flight paddle featuring 4 or 6 tasting chalices of each fresh tap,
                  guided by notes from our master brewer.
                </p>
                <ul className="space-y-2 mb-8 text-xs text-[#E6D3B3]/85">
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> 150ml pours of all 6 craft brews</li>
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> Flavour comparison card included</li>
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> Ideal starting point for first-time visitors</li>
                </ul>
              </div>
              <button
                onClick={onOpenBookModal}
                className="py-3 rounded-full brew-card text-[#F7EFE0] border border-[#D9A441]/30 hover:border-[#D9A441] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
              >
                Reserve Tasting Flight
              </button>
            </div>

            <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                  THE GROUP ANCHOR
                </span>
                <h3 className="font-serif text-3xl text-[#F7EFE0] font-normal mb-3">
                  3-Litre Ice-Cored Towers
                </h3>
                <p className="text-sm text-[#E6D3B3]/80 leading-relaxed font-light mb-6">
                  Keep the party pouring straight at your table. Our illuminated 3-litre tabletop beer towers
                  feature an integrated ice core that maintains a 2°C chilled pour down to the final glass.
                </p>
                <ul className="space-y-2 mb-8 text-xs text-[#E6D3B3]/85">
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> Holds full 3 Litres of any fresh tap</li>
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> Central ice tube prevents dilution</li>
                  <li className="flex items-center gap-2"><FaCheck className="text-[#D9A441]" /> Self-serve spigot right at your table</li>
                </ul>
              </div>
              <button
                onClick={onOpenBookModal}
                className="py-3 rounded-full bg-[#D9A441] text-[#2A1A10] hover:brightness-110 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg"
              >
                Book Table With Beer Tower
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
