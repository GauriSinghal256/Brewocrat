import React from 'react';
import { scrollToTarget } from './AnimatedComponents';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBeerMugEmpty, FaCloudSun, FaUtensils, FaArrowRight, FaCheck } from 'react-icons/fa6';

export default function ThreeServicesShowcase({ onOpenBookModal }) {
  const services = [
    {
      id: 'brewery',
      number: '01',
      title: 'The Brewery',
      subtitle: 'Artisanal Microbrewery & Fresh Taps',
      tagline: 'Poured Straight From The Vats at 2°C',
      quote: '“Bavarian Purity standards brewed daily with imported malts & noble hops.”',
      desc: 'Our on-site microbrewery crafts small-batch Bavarian lagers, Belgian wheat ales, and aromatic pale ales using imported malts and noble hops. Unpasteurized, unfiltered, and deeply refreshing — served directly from conditioning tanks to your glass.',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg',
      secondaryImage: '/images/craft_beer_tower.png',
      badge: 'Microbrewery',
      icon: FaBeerMugEmpty,
      highlights: [
        '6+ Fresh Artisanal Brews Poured Daily',
        'Traditional Bavarian Reinheitsgebot Purity Standard',
        'Ice-Cored 3-Litre Social Towers For Tables',
        'Flight Paddles For Tasting The Whole Repertoire'
      ],
      actionText: 'Explore Craft Taps',
      actionLink: '#fresh-on-tap'
    },
    {
      id: 'skybar',
      number: '02',
      title: 'The Skybar',
      subtitle: 'Rooftop Terrace & Twilight Lounge',
      tagline: 'Where Sunset Meets Gurugram’s Skyline',
      quote: '“Twilight breezes, plush lounges, and electric starlight celebrations.”',
      desc: 'Perched on the 2nd floor terrace of Element One, our open-air skybar combines panoramic skyline horizons with ambient firelit warmth. Unwind to curated sunset soundtracks, soulful acoustic live acts, DJ weekends, and stadium-grade live sports screenings.',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
      secondaryImage: '/images/slider-2.jpg',
      badge: 'Rooftop Skybar',
      icon: FaCloudSun,
      highlights: [
        'Open-Air Rooftop Sunset Terrace & Seating',
        'Signature Botanical Craft Cocktails & Shooters',
        'Weekend Live Acoustic Sessions & High-Energy DJ Nights',
        'Private Lounge Pods For Birthdays & Corporate Mixers'
      ],
      actionText: 'Reserve Skybar Table',
      actionModal: true
    },
    {
      id: 'kitchen',
      number: '03',
      title: 'The Kitchen',
      subtitle: 'Wood-Fired Hearth & Global Cuisine',
      tagline: 'Flavours Crafted For Celebration',
      quote: '“From 450°C blistered crusts to tender 24-hour slow-smoked mutton.”',
      desc: 'Our culinary kitchen complements our beers with bold, unapologetic flavours. Feast on hand-stretched 48-hour fermented Neapolitan sourdough pizzas, clay-oven butter chicken kulchas, 24-hour marinated charcoal mutton tikkas, and grand Mediterranean mezze spreads.',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
      secondaryImage: '/images/mediterranean_platter.png',
      badge: 'Gourmet Kitchen',
      icon: FaUtensils,
      highlights: [
        '450°C Wood-Fired Neapolitan Sourdough Pizzas',
        'Charcoal Tandoori Smokey Mutton & Tender Kebabs',
        'Big Fat Mediterranean Mezze & Grills Sharing Platters',
        'Curated Food & Beer Pairing Recommendations'
      ],
      actionText: 'Discover The Menu',
      actionLink: '/menu'
    }
  ];

  const handleAction = (service) => {
    if (service.actionModal) {
      onOpenBookModal();
    } else if (service.actionLink && service.actionLink.startsWith('#')) {
      const el = document.querySelector(service.actionLink);
      if (el) scrollToTarget(el);
    }
  };

  return (
    <section id="three-services" className="relative py-28 sm:py-36 brew-wall overflow-hidden">
      
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-20 sm:mb-28 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3.5">
            <span className="w-8 h-px bg-[#D9A441]/40" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              Our Three Universes
            </span>
            <span className="w-8 h-px bg-[#D9A441]/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] uppercase font-normal tracking-wide leading-[1.12]">
            Brewery. Skybar. <span className="italic text-[#D9A441] font-light">Kitchen.</span>
          </h2>

          <div className="font-script text-2xl sm:text-3xl text-[#D9A441] mt-2">
            Three distinct atmospheres, unified under one rooftop.
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#E6D3B3]/85 font-light leading-relaxed max-w-2xl">
            Each space at Brewocrat is curated with its own rhythm, aesthetic, and culinary philosophy.
            Explore our three pillars below.
          </p>
        </div>

        {/* Full-Width Stacked Experience Rows (Each Service Takes Full Width) */}
        <div className="space-y-24 sm:space-y-36">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative rounded-3xl bg-[#2A1A10]/90 border border-[#D9A441]/25 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group hover:border-[#D9A441]/50 transition-all duration-700"
              >
                {/* Background Large Number Watermark */}
                <div className="absolute -bottom-10 right-4 sm:right-10 text-[140px] sm:text-[220px] font-serif font-black text-white/[0.02] select-none pointer-events-none leading-none">
                  {service.number}
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  
                  {/* Visual Column (Full Width in mobile, 7 cols in desktop) */}
                  <div
                    className={`lg:col-span-7 relative ${
                      isEven ? 'lg:col-start-6' : ''
                    }`}
                  >
                    <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D9A441]/30 shadow-2xl group/img">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-108"
                      />

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/80 via-[#2A1A10]/20 to-transparent opacity-90 group-hover/img:opacity-75 transition-opacity" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2A1A10]/85 border border-[#D9A441]/40 text-[#D9A441] text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
                          <Icon className="text-xs" />
                          <span>{service.badge}</span>
                        </span>
                      </div>

                      {/* Bottom Floating Highlight on Image */}
                      <div className="absolute bottom-6 left-6 right-6 z-10">
                        <p className="font-serif text-lg sm:text-xl text-[#F7EFE0] italic font-light drop-shadow-md">
                          {service.quote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Text Column (5 cols in desktop) */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between ${
                      isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                    }`}
                  >
                    <div>
                      {/* Top Section Tag */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-serif text-2xl sm:text-3xl font-light text-[#D9A441]/70">
                          {service.number}
                        </span>
                        <span className="h-px w-8 bg-[#D9A441]/40" />
                        <span className="text-xs uppercase font-bold tracking-[0.22em] text-[#D9A441]">
                          {service.tagline}
                        </span>
                      </div>

                      {/* Grand Title */}
                      <h3 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] uppercase font-normal tracking-wide leading-tight mb-2">
                        {service.title}
                      </h3>

                      <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D8C3A5] font-medium mb-5">
                        {service.subtitle}
                      </div>

                      {/* Narrative Paragraph */}
                      <p className="text-sm sm:text-base text-[#E6D3B3]/90 font-light leading-relaxed mb-6">
                        {service.desc}
                      </p>

                      {/* Highlights Checklist */}
                      <div className="space-y-2.5 mb-8">
                        {service.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7EFE0]">
                            <span className="w-5 h-5 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/35 flex items-center justify-center text-[#D9A441] shrink-0 mt-0.5">
                              <FaCheck className="text-[9px]" />
                            </span>
                            <span className="font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#D9A441]/15">
                      {service.actionLink && !service.actionLink.startsWith('#') ? (
                        <Link
                          to={service.actionLink}
                          className="pill-btn-primary group cursor-pointer inline-flex"
                        >
                          <span>{service.actionText}</span>
                          <span className="pill-icon-circle">
                            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAction(service)}
                          className="pill-btn-primary group cursor-pointer inline-flex"
                        >
                          <span>{service.actionText}</span>
                          <span className="pill-icon-circle">
                            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
