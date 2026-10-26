import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaLocationDot,
  FaClock,
  FaPhone,
  FaSquareParking,
  FaStar,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope,
  FaCheck
} from 'react-icons/fa6';

export default function Visit({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Visit Brewocrat — Location, Hours & Directions | Gurugram";
  }, []);

  // Smart Feedback State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('Please select a star rating first.');
      return;
    }
    const existing = JSON.parse(localStorage.getItem('brewocrat_feedback') || '[]');
    const id = 'FB-' + String(Date.now()).slice(-5);
    existing.unshift({
      id,
      rating,
      comment: feedbackText,
      phone: feedbackPhone,
      created: new Date().toISOString(),
      status: rating <= 3 ? 'Needs Review' : 'Captured'
    });
    localStorage.setItem('brewocrat_feedback', JSON.stringify(existing));
    setFeedbackSubmitted(true);
  };

  return (
    <div className="w-full brew-wall text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10]">
      
      {/* 1. Hero Header */}
      <section className="relative py-24 sm:py-32 brew-wall border-b border-[#D9A441]/20">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full brew-card border border-[#D9A441]/30">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              FIND US • PARK • COME UP
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7EFE0] font-normal tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6">
            Visit <span className="italic text-[#D9A441]">Brewocrat.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#E6D3B3]/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Located on the 2nd Floor of Element One Mall, Sector 47, Gurugram.
            Ample multi-level mall parking, swift elevator access, and a skyline terrace awaiting your arrival.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Brewocrat+Element+One+Sector+47+Gurugram"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_5px_25px_rgba(217,164,65,0.35)] flex items-center gap-2"
            >
              <FaLocationDot className="text-sm" />
              Open In Google Maps
            </a>
            <a
              href="tel:+917303203535"
              className="px-7 py-3.5 rounded-full brew-card text-[#F7EFE0] border border-[#D9A441]/30 hover:border-[#D9A441] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <FaPhone className="text-xs" />
              Call +91 73032 03535
            </a>
          </div>
        </div>
      </section>

      {/* 2. Location & Venue Dossier Grid */}
      <section className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Key Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 shadow-xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                EXACT ADDRESS
              </span>
              <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-3">
                Element One Mall, Sector 47
              </h3>
              <p className="text-sm text-[#E6D3B3]/85 leading-relaxed font-light mb-6">
                2nd Floor, Element One Mall, Block A, Sector 47, Gurugram, Haryana 122018 (Near Good Earth City Centre / Subhash Chowk).
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Brewocrat+Element+One+Sector+47+Gurugram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#D9A441] text-[#2A1A10] text-xs font-bold uppercase tracking-wider"
                >
                  Get Driving Directions
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl brew-card border border-[#D9A441]/20 p-6">
                <div className="w-10 h-10 rounded-xl brew-card border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] mb-3">
                  <FaClock />
                </div>
                <h4 className="font-serif text-lg text-[#F7EFE0] mb-1">Hours of Service</h4>
                <p className="text-xs text-[#E6D3B3]/75 leading-relaxed">
                  Monday – Sunday<br />
                  <strong className="text-[#F7EFE0]">12:00 PM – 12:00 AM</strong><br />
                  Kitchen closes at 11:30 PM
                </p>
              </div>

              <div className="rounded-2xl brew-card border border-[#D9A441]/20 p-6">
                <div className="w-10 h-10 rounded-xl brew-card border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] mb-3">
                  <FaSquareParking />
                </div>
                <h4 className="font-serif text-lg text-[#F7EFE0] mb-1">Parking & Access</h4>
                <p className="text-xs text-[#E6D3B3]/75 leading-relaxed">
                  Element One Mall basement multi-level parking.<br />
                  Direct express elevator to 2nd Floor.
                </p>
              </div>
            </div>

            <div className="rounded-2xl brew-card border border-[#D9A441]/20 p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A441] block">Hotline & Enquiries</span>
                <span className="font-serif text-xl text-[#F7EFE0] font-semibold">+91 73032 03535</span>
              </div>
              <a
                href="https://wa.me/917303203535"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full brew-card border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive View & Table Booking */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[#D9A441]/30 h-[380px] shadow-2xl relative">
              <iframe
                title="Brewocrat Location Map"
                src="https://maps.google.com/maps?q=Brewocrat%20Element%20One%20Sector%2047%20Gurugram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
              />
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-[#4A2C18] to-[#4A2C18] border border-[#D9A441]/40 p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-1">
                  PLANNING A VISIT TODAY?
                </span>
                <h4 className="font-serif text-2xl text-[#F7EFE0] font-normal">
                  Reserve Your Table in Advance
                </h4>
                <p className="text-xs text-[#E6D3B3]/70 mt-1">Guarantees seating in your preferred zone (Salon / Courtyard / Terrace).</p>
              </div>
              <button
                onClick={onOpenBookModal}
                className="px-6 py-3.5 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 shrink-0 cursor-pointer shadow-lg"
              >
                Book Table
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Smart Private Feedback Loop */}
      <section className="relative py-20 brew-wall border-t border-[#D9A441]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              GUEST EXPERIENCE & RECOVERY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal mb-3">
            How Was Your Recent Visit?
          </h2>

          <p className="text-sm text-[#E6D3B3]/75 max-w-lg mx-auto mb-10 font-light">
            We review every comment personally. High ratings help others discover us, while constructive feedback
            is sent straight to our Duty Manager for immediate service recovery.
          </p>

          <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 sm:p-12 shadow-2xl">
            
            {feedbackSubmitted ? (
              <div className="py-8">
                <div className="w-16 h-16 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center text-3xl mx-auto mb-4 border border-[#D9A441]/40">
                  <FaCheck />
                </div>
                <h3 className="font-serif text-3xl text-[#F7EFE0] mb-2">Thank You For Your Feedback</h3>
                {rating >= 4 ? (
                  <div>
                    <p className="text-sm text-[#E6D3B3]/80 max-w-md mx-auto mb-6">
                      We are thrilled you had a 5-star experience! Would you take 30 seconds to support our team with a public Google review?
                    </p>
                    <a
                      href="https://www.google.com/search?q=Brewocrat+Sector+47+Gurugram+reviews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-7 py-3 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider shadow-lg"
                    >
                      Post Review On Google
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-[#E6D3B3]/80 max-w-md mx-auto">
                    Your notes have been sent directly to our General Manager and Beverage Director to address immediately. Thank you for helping us improve.
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="max-w-xl mx-auto">
                {/* 5-Star Rating Buttons */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isLit = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="text-3xl sm:text-4xl transition-all duration-150 cursor-pointer p-1"
                        style={{ color: isLit ? '#D9A441' : '#2A1A10' }}
                      >
                        <FaStar />
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4 mb-6 text-left">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">
                      Anything we should know? (Food, beer, music, ambience, waiting time...)
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us what you loved or where we can do better..."
                      className="w-full brew-card border border-[#D9A441]/30 rounded-xl p-4 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">
                      Mobile Number (Optional, for service recovery)
                    </label>
                    <input
                      type="tel"
                      value={feedbackPhone}
                      onChange={(e) => setFeedbackPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#D9A441] text-[#2A1A10] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-xl"
                >
                  Submit Private Feedback
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
