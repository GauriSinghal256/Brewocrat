import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaCalendarCheck,
  FaChampagneGlasses,
  FaTicket,
  FaWhatsapp,
  FaArrowRight
} from 'react-icons/fa6';

export default function HomeIntentStrip({ onOpenBookModal }) {
  const intents = [
    {
      eyebrow: "I'M HUNGRY",
      title: 'Menu & Order',
      desc: 'Dine-in craft plates & direct delivery',
      icon: FaUtensils,
      link: '/menu',
      isExternal: false
    },
    {
      eyebrow: "I'M COMING OVER",
      title: 'Reserve Table',
      desc: 'Choose time, party size & zone',
      icon: FaCalendarCheck,
      action: onOpenBookModal
    },
    {
      eyebrow: "I'M CELEBRATING",
      title: 'Plan a Party',
      desc: 'Packages, spaces & quick quote',
      icon: FaChampagneGlasses,
      link: '/parties',
      isExternal: false
    },
    {
      eyebrow: "WHAT'S ON?",
      title: 'Events & Bands',
      desc: 'Live gigs, DJs & weekly calendar',
      icon: FaTicket,
      link: '/events',
      isExternal: false
    },
    {
      eyebrow: "DIRECT HELP",
      title: 'WhatsApp Concierge',
      desc: 'One tap direct chat with team',
      icon: FaWhatsapp,
      link: 'https://wa.me/917303203535',
      isExternal: true
    }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {intents.map((item, index) => {
          const Icon = item.icon;
          const cardContent = (
            <div className="h-full p-5 sm:p-6 rounded-2xl bg-[#2A1A10]/80 hover:bg-[#2A1A10]/80 border border-[#D9A441]/20 hover:border-[#D9A441]/50 backdrop-blur-md transition-all duration-300 group shadow-[0_10px_30px_rgba(42,26,16,0.4)] hover:shadow-[0_15px_40px_rgba(217,164,65,0.15)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D9A441] group-hover:text-[#F7EFE0] transition-colors">
                    {item.eyebrow}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/20 group-hover:bg-[#D9A441] group-hover:text-[#2A1A10] text-[#D9A441] flex items-center justify-center transition-all duration-300">
                    <Icon className="text-xs" />
                  </div>
                </div>
                
                <h4 className="font-serif text-lg sm:text-xl text-[#F7EFE0] group-hover:text-[#D9A441] transition-colors font-medium">
                  {item.title}
                </h4>
                <p className="text-xs text-[#E6D3B3]/70 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9A441]/10 flex items-center gap-1.5 text-[11px] font-semibold text-[#D9A441] group-hover:translate-x-1 transition-transform duration-300">
                <span>Explore</span>
                <FaArrowRight className="text-[9px]" />
              </div>
            </div>
          );

          if (item.action) {
            return (
              <motion.button
                key={index}
                onClick={item.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-left w-full h-full cursor-pointer"
              >
                {cardContent}
              </motion.button>
            );
          }

          if (item.isExternal) {
            return (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="block h-full cursor-pointer"
              >
                {cardContent}
              </motion.a>
            );
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <Link to={item.link} className="block h-full cursor-pointer">
                {cardContent}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
