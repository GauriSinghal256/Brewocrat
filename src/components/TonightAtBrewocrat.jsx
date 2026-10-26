import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaArrowRight, FaCalendarDay } from 'react-icons/fa6';

export default function TonightAtBrewocrat({ onOpenBookModal }) {
  const day = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  
  const schedule = {
    0: { title: 'Sunday Sessions', desc: 'Melodic acoustic sets & sundowner cocktails', time: '5:00 PM onwards', zone: 'Courtyard & Terrace', tag: 'Acoustic & Sunset' },
    1: { title: 'Easy Monday', desc: 'Chill lounge soundtrack & craft brews on tap', time: 'All evening', zone: 'Indoor Salon', tag: 'Unwind & Dine' },
    2: { title: 'Mid-Week Social', desc: 'Direct order offers & corporate catch-ups', time: '12:00 PM – 12:00 AM', zone: 'Salon & Courtyard', tag: 'Craft & Dine' },
    3: { title: 'Wednesday Live Band', desc: 'Soulful dinner sets moving into energetic pop', time: '8:30 PM onwards', zone: 'Courtyard Live Stage', tag: 'Live Band' },
    4: { title: 'Thursday Mixtape Night', desc: 'Indie pop, 90s & 2000s sing-along energy with DJ Sumit', time: '8:00 PM onwards', zone: 'Terrace & Skybar', tag: 'DJ & Nostalgia' },
    5: { title: 'Friday Bollywood Night', desc: 'High-octane commercial Bollywood & Punjabi sets with DJ Sumit', time: '8:00 PM onwards', zone: 'Courtyard & Indoor', tag: 'House Full Energy' },
    6: { title: 'Saturday Live Euphoria', desc: 'High-energy live rock & fusion band followed by late night DJ', time: '8:30 PM onwards', zone: 'Full Venue Celebration', tag: 'Weekend Big Night' },
  };

  const today = schedule[day];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-20 max-w-5xl mx-auto px-4 mt-10 sm:mt-16 mb-10"
    >
      <div className="rounded-2xl sm:rounded-3xl bg-[#2A1A10]/95 border border-[#D9A441]/40 p-5 sm:p-7 shadow-[0_20px_60px_rgba(42,26,16,0.7)] backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          {/* Left: Indicator & Info */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D9A441]/20 to-[#B07A2E]/10 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] shrink-0 shadow-inner">
              <FaMusic className="text-xl animate-pulse" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D9A441]/20 border border-[#D9A441]/40 text-[#F7EFE0] text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-ping" />
                  Tonight at Brewocrat
                </span>
                <span className="text-[11px] text-[#D9A441] font-medium tracking-wide">
                  {today.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7EFE0] font-normal tracking-wide">
                {today.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E6D3B3]/75 mt-0.5 line-clamp-1">
                {today.desc} • <span className="text-[#D9A441]">{today.time}</span> • {today.zone}
              </p>
            </div>
          </div>

          {/* Right: Instant Reserve for Tonight */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenBookModal}
              className="w-full md:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 shadow-[0_4px_20px_rgba(217,164,65,0.3)] flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Reserve For Tonight</span>
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
