import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa6';

export default function EditorialTestimonials() {
  const testimonials = [
    {
      text: "Brewocrat is hands down the best microbrewery in Gurgaon! The Belgian Tropical Ale was poured frost cold and had the most incredible citrus aroma. The Smokey Mutton Tikka paired with the rooftop breeze made it an unforgettable evening.",
      author: "Rohan Verma",
      role: "Verified Google Patron",
      rating: 5,
      date: "February 2025"
    },
    {
      text: "The aesthetic of this rooftop is unmatched. Warm amber lighting, copper brewery tanks, and plush seating. Loved the Big Fat Mezze Platter and the wood-fired pizza. Great live DJ and cricket screening vibe!",
      author: "Priya Sharma",
      role: "Gurgaon Food & Nightlife Critic",
      rating: 5,
      date: "January 2025"
    },
    {
      text: "Outstanding hospitality from start to finish. We booked a 3L beer tower for our team gathering — the ice core kept it cold for hours. The craft cocktails like Indian Sapphire are works of art.",
      author: "Amit Gupta",
      role: "Regular Guest",
      rating: 5,
      date: "March 2025"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="editorial-testimonials"
      className="relative overflow-hidden bg-[#2E1B0F] py-24 sm:py-32"
      style={{ backgroundImage: "url('/interior/exterior2.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#160D08]/84 via-[#160D08]/92 to-[#160D08]/96" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Suptitle */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
            06 / Patron Voices
          </span>
        </div>

        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full brew-card border border-[#D9A441]/30 mb-8">
          <div className="flex text-[#D9A441] text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#F7EFE0]">4.8 / 5 on Google Reviews</span>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative min-h-[220px] sm:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
            >
              <FaQuoteLeft className="text-[#D9A441]/25 text-3xl sm:text-4xl mx-auto mb-4" />
              
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F7EFE0] font-light leading-relaxed italic mb-6">
                "{testimonials[activeIndex].text}"
              </blockquote>

              <div>
                <cite className="not-italic font-serif text-lg text-[#D9A441] uppercase tracking-wider font-medium block">
                  {testimonials[activeIndex].author}
                </cite>
                <span className="text-xs text-[#D8C3A5]">
                  {testimonials[activeIndex].role} • {testimonials[activeIndex].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots & Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full brew-card border border-[#D9A441]/30 hover:border-[#D9A441] text-[#E6D3B3] hover:text-[#D9A441] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous review"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-[#D9A441]' : 'w-2 bg-[#D9A441]/30 hover:bg-[#D9A441]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full brew-card border border-[#D9A441]/30 hover:border-[#D9A441] text-[#E6D3B3] hover:text-[#D9A441] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next review"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>

      </div>

    </section>
  );
}
