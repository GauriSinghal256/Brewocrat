import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaLocationDot, FaClock, FaArrowRight, FaWhatsapp } from 'react-icons/fa6';

export default function EditorialReservation({ onOpenBookModal }) {
  return (
    <section id="editorial-reservation" className="relative overflow-hidden bg-[#0D0805] py-12 sm:py-20 border-t border-[#D9A441]/20 mediterranean-pattern">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#D9A441]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Editorial Headline & Perks */}
            <div className="lg:col-span-7 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <div className="font-alex text-4xl sm:text-6xl text-[#EFA364] script-gold-shadow leading-tight my-1 select-none">
                Your table is waiting
              </div>
              <h2 className="font-serif text-3xl font-normal tracking-tight text-[#F7EFE0] sm:text-5xl md:text-6xl mt-1 mb-6">
                Reserve Your Table <br className="hidden sm:inline" />
                <span className="italic text-[#D9A441]">Beneath The Stars.</span>
              </h2>

              {/* Action Buttons: Balanced 2-Col Grid on Mobile, Inline Row on Desktop */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-4 max-w-md mx-auto lg:mx-0 lg:justify-start">
                <button
                  onClick={onOpenBookModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EFA364] px-3.5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0D0805] shadow-[0_6px_25px_rgba(217,164,65,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
                >
                  <FaCalendarCheck className="text-xs shrink-0" />
                  <span className="sm:hidden">Book Table</span>
                  <span className="hidden sm:inline">Instant Table Booking</span>
                  <FaArrowRight className="hidden sm:inline text-xs shrink-0" />
                </button>

                <a
                  href="tel:+917303203535"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#D9A441]/40 bg-[#160D08] px-3.5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E6D3B3] hover:border-[#D9A441] hover:text-[#D9A441] transition cursor-pointer"
                >
                  <FaPhone className="text-xs text-[#D9A441] shrink-0" />
                  <span className="sm:hidden">Call Us</span>
                  <span className="hidden sm:inline">Call: +91 73032 03535</span>
                </a>
              </div>
            </div>

            {/* Right Column: Mediterranean Arched Details Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              <div className="mediterranean-card rounded-3xl md:rounded-t-[3.5rem] p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                
                {/* Mediterranean Arch Top Highlight */}
                <div className="flex items-center justify-center mb-6 pb-4 border-b border-white/10">
                  <span className="font-alex text-3xl sm:text-4xl text-[#EFA364] script-gold-shadow leading-tight select-none">Brewocrat</span>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30">
                      <FaLocationDot className="text-sm" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#F7EFE0] font-semibold">Location & Valet</h4>
                      <p className="text-xs text-[#D8C3A5] mt-0.5 leading-relaxed">
                        2nd Floor, Element One Mall, Sector 47, South City 2, Gurugram (Complimentary Valet Parking)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30">
                      <FaClock className="text-sm" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#F7EFE0] font-semibold">Operating Hours</h4>
                      <p className="text-xs text-[#D8C3A5] mt-0.5 leading-relaxed">
                        Monday – Sunday · 12:00 PM Afternoon to 01:00 AM Midnight
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:justify-between sm:gap-3">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Brewocrat+Element+One+Mall+Sector+47+Gurugram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-[17px] sm:px-[21px] py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EBCB86] hover:bg-[#D9A441] hover:text-[#0D0805] transition"
                    >
                      <FaLocationDot className="text-xs shrink-0" />
                      <span>Directions</span>
                    </a>
                    <a
                      href="https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20I%20would%20like%20to%20reserve%20a%20table"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-[17px] sm:px-[21px] py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366] hover:text-[#0D0805] transition"
                    >
                      <FaWhatsapp className="text-sm shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

        </div>

      </div>

    </section>
  );
}
