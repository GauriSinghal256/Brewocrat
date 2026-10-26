import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaLocationDot, FaClock, FaArrowRight } from 'react-icons/fa6';

export default function EditorialReservation({ onOpenBookModal }) {
  return (
    <section id="editorial-reservation" className="relative overflow-hidden bg-[#2E1B0F] py-10 sm:py-16">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Editorial Headline & Perks */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="font-display text-3xl font-medium uppercase leading-[1.08] tracking-wide text-[#F7EFE0] sm:text-5xl md:text-6xl">
                Reserve Your Table <br />
                <span className="italic font-light text-[#D9A441]">Beneath The Stars</span>
              </h2>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <button
                  onClick={onOpenBookModal}
                  className="pill-btn-primary group cursor-pointer !rounded-full !bg-[#D9A441]/80 !px-5 !py-3 !text-[#2A1A10]"
                >
                  <FaCalendarCheck className="text-xs" />
                  <span>Instant Table Booking</span>
                  <span className="pill-icon-circle">
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </button>

                <a
                  href="tel:+917303203535"
                  className="pill-btn-outline group cursor-pointer !rounded-full !border-[#D9A441]/45 !px-5 !py-3 !text-[#E6D3B3]"
                >
                  <FaPhone className="text-xs text-[#D9A441]" />
                  <span>Call: +91 73032 03535</span>
                </a>
              </div>
            </div>

            {/* Right Column: Key Details Card */}
            <div className="lg:col-span-5">
              <div className="space-y-4 rounded-2xl border border-[#D9A441]/20 bg-[#24150C]/75 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.2)] sm:p-7">
                
                <div>
                  <span className="mb-1 block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441] lg:text-left">
                    Location & Valet
                  </span>
                  <div className="flex flex-col items-center gap-2 text-center text-sm text-[#F7EFE0]">
                    <FaLocationDot className="shrink-0 text-[#D9A441]" />
                    <div>
                      <p className="font-serif text-base text-[#F7EFE0]">Brewocrat Brewery Skybar & Kitchen</p>
                      <p className="text-xs text-[#D8C3A5] mt-0.5">
                        2nd Floor, Element One Mall, Sector 47, South City 2, Gurgaon (Valet Parking Available)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9A441]/15">
                  <span className="mb-1 block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441] lg:text-left">
                    Operating Hours
                  </span>
                  <div className="flex flex-col items-center gap-2 text-center text-sm text-[#F7EFE0]">
                    <FaClock className="shrink-0 text-[#D9A441]" />
                    <div>
                      <p className="font-medium">Monday – Sunday</p>
                      <p className="text-xs text-[#D8C3A5] mt-0.5">
                        12:00 PM Afternoon to 01:00 AM Midnight (Daily)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9A441]/15">
                  <span className="mb-1 block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441] lg:text-left">
                    Direct Contact
                  </span>
                  <p className="mt-1 text-center text-xs text-[#D8C3A5]">
                    Phone: <a href="tel:+917303203535" className="text-[#F7EFE0] hover:text-[#D9A441] font-medium">+91 73032 03535</a> / <a href="tel:+911243789363" className="text-[#F7EFE0] hover:text-[#D9A441] font-medium">+91 124 378 9363</a>
                  </p>
                </div>

              </div>
          </div>

        </div>

      </div>

    </section>
  );
}
