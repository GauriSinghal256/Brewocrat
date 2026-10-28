import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight
} from 'react-icons/fa6';

export default function FoodPlatesSeriesShowcase({ onOpenBookModal }) {
  const dishes = [
    {
      id: 'shahi-paneer',
      title: 'Shahi Paneer Tikka Lababdar',
      category: 'Chef’s Claypot Specialty',
      price: '₹595',
      diet: 'veg',
      image: '/images/plate_shahi_paneer.png',
      pairing: 'Tropical Belgian Wheat Ale & Butter Garlic Naan',
      badge: 'Chef Signature',
      spiciness: 'Mild • Velvety'
    },
    {
      id: 'mutton-rogan-josh',
      title: 'Smokey Mutton Rogan Josh',
      category: 'Signature Tandoor Hearth',
      price: '₹745',
      diet: 'non-veg',
      image: '/images/bhuna_gosht_curry.png',
      pairing: 'Smoky German Dark Lager & Butter Kulcha',
      badge: 'Bestseller',
      spiciness: 'Medium • Rich'
    },
    {
      id: 'zafrani-biryani',
      title: 'Dum Pukht Zafrani Biryani',
      category: 'Heritage Awadhi Handi',
      price: '₹645',
      diet: 'non-veg',
      image: '/images/special-dish3.png',
      pairing: 'Burani Garlic Raita & Golden Craft Pour',
      badge: 'Royal Heritage',
      spiciness: 'Fragrant • Aromatic'
    },
    {
      id: 'truffle-margherita',
      title: 'Wood-Fired Truffle Margherita',
      category: 'Artisan Sourdough Pizza',
      price: '₹625',
      diet: 'veg',
      image: '/images/special-dish4.png',
      pairing: 'Brewocrat Pale Ale & Garlic Dip',
      badge: 'House Favourite',
      spiciness: 'Mild • Truffle Infused'
    },
    {
      id: 'mezze-feast',
      title: 'Big Fat Mezze Feast Platter',
      category: 'Mediterranean Sharing',
      price: '₹695',
      diet: 'veg',
      image: '/images/mediterranean_platter.png',
      pairing: 'Tropical Belgian Wheat Beer',
      badge: 'Crowd Pleaser',
      spiciness: 'Herbaceous & Fresh'
    },
    {
      id: 'mutton-tikka',
      title: 'Charcoal Smokey Mutton Tikkas',
      category: 'Sigri Charcoal Grills',
      price: '₹685',
      diet: 'non-veg',
      image: '/images/special-dish2.png',
      pairing: 'Cold-Conditioned German Lager',
      badge: 'Must Try',
      spiciness: 'Spicy • Charcoal Char'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const prevIndex = (currentIndex - 1 + dishes.length) % dishes.length;
  const nextIndex = (currentIndex + 1) % dishes.length;

  const currentDish = dishes[currentIndex];
  const prevDish = dishes[prevIndex];
  const nextDish = dishes[nextIndex];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
    }, 2300);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dishes.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  return (
    <section id="food-plates-series" className="relative pb-8 pt-5 sm:pb-12 sm:pt-8 bg-[#0D0805] text-[#F7EFE0] overflow-hidden select-none border-t border-b border-[#D9A441]/15 mediterranean-stucco">
      
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 bg-[#160C06]/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#D9A441]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Flow Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3">
          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight select-none">
            Wood-fired & claypot feasts
          </div>
        </div>
        
        {/* 3-Plate Series Stage: Generous Size and Unboxed on Mobile */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[300px] sm:min-h-[340px] md:min-h-[380px] my-0 overflow-hidden sm:overflow-visible">
          
          {/* Left Plate (Gliding out / Previous in series) */}
          <div
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 md:left-8 -translate-x-1/3 sm:translate-x-0 cursor-pointer z-10 opacity-25 sm:opacity-40 hover:opacity-70 transition-all duration-500 scale-75 sm:scale-80 blur-[0.5px] hover:blur-none"
            title={`Previous: ${prevDish.title}`}
          >
            <div className="relative w-44 sm:w-56 md:w-64 aspect-square rounded-full overflow-hidden shadow-2xl border-2 border-[#D9A441]/25">
              <img
                src={prevDish.image}
                alt={prevDish.title}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src = '/images/special-dish1.png';
                }}
              />
              <div className="absolute inset-0 bg-[#0A0503]/50 rounded-full" />
            </div>
          </div>

          {/* Center Plate: The Hero Plate in Spotlight (Larger on Mobile) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentDish.id}
              initial={{ opacity: 0, scale: 0.88, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.88, x: -50 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 flex flex-col items-center justify-center"
            >
              {/* Golden Ambient Halo */}
              <div className="absolute inset-0 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 rounded-full bg-gradient-to-tr from-[#D9A441]/25 via-[#B07A2E]/15 to-transparent blur-2xl -z-10 pointer-events-none" />

              {/* The Photorealistic Round Plate */}
              <div className="relative w-64 sm:w-72 md:w-84 lg:w-96 aspect-square rounded-full p-1.5 bg-gradient-to-br from-[#D9A441]/50 via-[#241309] to-[#D9A441]/25 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0503]">
                  <img
                    src={currentDish.image}
                    alt={currentDish.title}
                    className="w-full h-full object-cover filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                    onError={(e) => {
                      e.target.src = '/images/special-dish1.png';
                    }}
                  />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Plate (Gliding in / Next in series) */}
          <div
            onClick={handleNext}
            className="absolute right-0 sm:right-4 md:right-8 translate-x-1/3 sm:translate-x-0 cursor-pointer z-10 opacity-25 sm:opacity-40 hover:opacity-70 transition-all duration-500 scale-75 sm:scale-80 blur-[0.5px] hover:blur-none"
            title={`Next: ${nextDish.title}`}
          >
            <div className="relative w-44 sm:w-56 md:w-64 aspect-square rounded-full overflow-hidden shadow-2xl border-2 border-[#D9A441]/25">
              <img
                src={nextDish.image}
                alt={nextDish.title}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src = '/images/special-dish1.png';
                }}
              />
              <div className="absolute inset-0 bg-[#0A0503]/50 rounded-full" />
            </div>
          </div>

          {/* Prev / Next Floating Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-1.5 sm:left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#0D0805]/90 hover:bg-[#150E09] border border-[#D9A441]/40 text-[#E6D3B3] hover:text-[#D9A441] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105"
            aria-label="Previous plate"
          >
            <FaChevronLeft className="text-sm -ml-0.5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1.5 sm:right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#0D0805]/90 hover:bg-[#150E09] border border-[#D9A441]/40 text-[#E6D3B3] hover:text-[#D9A441] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105"
            aria-label="Next plate"
          >
            <FaChevronRight className="text-sm ml-0.5" />
          </button>

        </div>

        {/* Accompanying Dish Details Dossier (Below the moving plates) */}
        <div className="max-w-2xl mx-auto text-center mt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              {/* Dish Title */}
              <h3 className="font-serif text-2xl sm:text-4xl text-[#F7EFE0] uppercase font-normal tracking-wide mb-3">
                {currentDish.title}
              </h3>

              {/* Actions: Book Table & View Full Menu */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenBookModal}
                  className="pill-btn-primary cursor-pointer text-xs uppercase tracking-wider group"
                >
                  <span>Book Table To Taste</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <Link
                  to="/menu"
                  className="pill-btn-outline cursor-pointer text-xs uppercase tracking-wider"
                >
                  <span>Full Menu</span>
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Series Dots & Auto-cycle Controls */}
        <div className="flex flex-col items-center justify-center mt-6">
          
          {/* Dish Thumbnails / Dots Track */}
          <div className="flex items-center gap-2">
            {dishes.map((dish, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={dish.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-8 h-2.5 bg-gradient-to-r from-[#D9A441] to-[#B07A2E] shadow-[0_0_12px_rgba(217,164,65,0.6)]'
                      : 'w-2.5 h-2.5 brew-card hover:bg-[#D9A441]/50'
                  }`}
                  aria-label={`Go to plate ${idx + 1}: ${dish.title}`}
                  title={dish.title}
                />
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
