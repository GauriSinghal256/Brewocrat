import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLocationDot,
  FaClock,
  FaPhone,
  FaWhatsapp,
  FaCar,
  FaTrainSubway,
  FaCalendarCheck,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa6';

export default function HomeComeOnIn({ onOpenBookModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    zone: 'The Courtyard',
  });
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      onOpenBookModal();
      setIsBooked(false);
    }, 1200);
  };

  return (
    <section id="come-on-in" className="relative py-20 sm:py-28 brew-wall overflow-hidden border-t border-[#D9A441]/15">
      
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#D9A441]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#C76B42]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1">
            Your table beneath the stars is waiting
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-tight mt-1 mb-4">
            Location, Hours & <span className="italic text-[#D9A441]">Direct Reservations.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E6D3B3]/75 font-light leading-relaxed">
            Conveniently situated at Element One Mall in Sector 47 Gurugram. Join us for a midday craft beer lunch, golden hour rooftop sundowner, or late night dinner and music.
          </p>
        </div>

        {/* 2-Column Layout: Left = Location & Actions, Right = Quick Reservation Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Action Pills */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Address Card */}
            <div className="rounded-3xl border border-white/10 bg-[#24150C]/85 backdrop-blur-md p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441]">
                  <FaLocationDot className="text-xl" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#F7EFE0] mb-1">
                    Element One Mall, Gurugram
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E6D3B3]/80 leading-relaxed font-light">
                    2nd Floor, Element One Mall, Sector 47, South City 2, Gurugram, Haryana 122018
                  </p>
                </div>
              </div>

              {/* Transit & Parking Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-[#E6D3B3]/90">
                  <FaCar className="text-[#D9A441] shrink-0" />
                  <span>Complimentary Valet Parking</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#E6D3B3]/90">
                  <FaTrainSubway className="text-[#D9A441] shrink-0" />
                  <span>10 mins from Millennium City Metro</span>
                </div>
              </div>

              {/* Quick Direction Button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Brewocrat+Element+One+Mall+Sector+47+Gurugram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#D9A441] py-3 text-xs font-bold uppercase tracking-wider text-[#2A1A10] shadow-[0_5px_20px_rgba(217,164,65,0.3)] hover:brightness-110 transition"
              >
                <FaLocationDot />
                <span>Open In Google Maps</span>
              </a>
            </div>

            {/* Timings & Direct Phones Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#24150C]/85 backdrop-blur-md p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaClock className="text-[#D9A441]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#EBCB86]">
                    Operating Hours
                  </span>
                </div>
                <p className="font-serif text-lg text-[#F7EFE0]">Daily · 12 PM to 1 AM</p>
                <p className="text-[11px] text-[#E6D3B3]/60 mt-1">Lunch, Sundowners & Dinner</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#24150C]/85 backdrop-blur-md p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaPhone className="text-[#D9A441]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#EBCB86]">
                    Table Hotline
                  </span>
                </div>
                <a
                  href="tel:+917303203535"
                  className="font-serif text-lg text-[#F7EFE0] hover:text-[#D9A441] transition block"
                >
                  +91 73032 03535
                </a>
                <p className="text-[11px] text-[#E6D3B3]/60 mt-1">Direct concierge assistance</p>
              </div>
            </div>

            {/* WhatsApp Direct Concierge Pill */}
            <a
              href="https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20I%20would%20like%20to%20reserve%20a%20table%20today."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 sm:p-5 text-[#F7EFE0] hover:bg-[#25D366]/20 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#25D366]">
                    Instant WhatsApp Concierge
                  </p>
                  <p className="text-xs text-[#E6D3B3]/80">Chat directly for table reservations & private dining</p>
                </div>
              </div>
              <FaArrowRight className="text-xs text-[#25D366]" />
            </a>

          </div>

          {/* Right Column: Embedded Instant Reservation Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#D9A441]/40 bg-gradient-to-br from-[#2E1B0F] via-[#24150C] to-[#1A110B] p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D9A441]/10 blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D9A441] block mb-1">
                  SEAT CONFIRMATION
                </span>
                <h3 className="font-serif text-3xl text-[#F7EFE0] font-normal leading-tight mb-2">
                  Instant Table Reservation
                </h3>
                <p className="text-xs text-[#E6D3B3]/75 font-light mb-6">
                  Reserve online to skip waiting lines, especially during Friday & Saturday live nights.
                </p>

                {isBooked ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center rounded-2xl bg-[#D9A441]/15 border border-[#D9A441]/40 my-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#D9A441] text-[#2A1A10] flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                      <FaCheck />
                    </div>
                    <p className="font-serif text-2xl text-[#F7EFE0]">Opening Reservation System...</p>
                    <p className="text-xs text-[#E6D3B3]/80 mt-1">Locking in your table details now.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Mehta"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7EFE0] placeholder:text-[#E6D3B3]/35 outline-none focus:border-[#D9A441] transition"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7EFE0] placeholder:text-[#E6D3B3]/35 outline-none focus:border-[#D9A441] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                          Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#1A110B] px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]"
                        >
                          {['1 Guest', '2 Guests', '4 Guests', '6 Guests', '8 Guests', '10+ Guests'].map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#1A110B] px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                          Time
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#1A110B] px-3 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]"
                        >
                          {['12:30 PM', '1:30 PM', '3:00 PM', '5:00 PM (Sunset)', '7:30 PM', '8:30 PM', '9:30 PM', '10:30 PM'].map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#EBCB86] block mb-1">
                        Preferred Atmosphere Zone
                      </label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#1A110B] px-4 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]"
                      >
                        <option value="The Courtyard">The Open-Air Courtyard (Fairy lights & live music)</option>
                        <option value="The Skybar Terrace">The Skybar Terrace (Rooftop skyline & sundowners)</option>
                        <option value="The Indoor Salon">The Indoor Salon (AC fine dining & plush booths)</option>
                        <option value="The Microbrewery">The Microbrewery (Right by copper fermentation tanks)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-[#C76B42] via-[#D9A441] to-[#C76B42] py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#2A1A10] shadow-[0_8px_30px_rgba(217,164,65,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer mt-4"
                    >
                      Confirm Table Reservation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
