import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaChampagneGlasses,
  FaBriefcase,
  FaCakeCandles,
  FaWhatsapp,
  FaCheck,
  FaArrowRight,
  FaUsers,
  FaPhone
} from 'react-icons/fa6';

const PACKAGES = [
  {
    id: 'corporate',
    title: 'Corporate Mixers & Team Feasts',
    tag: 'Team Outings & Milestones',
    icon: FaBriefcase,
    capacity: '15 – 150+ Guests',
    desc: 'Reward your team with continuous fresh craft beer towers, a lavish multi-cuisine buffet, dedicated private zone, and seamless GST billing.',
    perks: [
      'In-house fresh craft beer towers at every table',
      'Curated 4-course multi-cuisine buffet',
      'AV screen & microphone setup for speeches',
      'Dedicated event manager & quick GST invoices',
    ],
    accent: '#D9A441',
  },
  {
    id: 'birthday',
    title: 'Birthdays & Anniversaries',
    tag: 'Celebrate Life’s Moments',
    icon: FaCakeCandles,
    capacity: '10 – 80 Guests',
    desc: 'Make birthdays and milestones magical with bespoke table styling, celebratory sparkler presentations, handcrafted cakes, and signature cocktail pitchers.',
    perks: [
      'Complimentary chef-curated celebratory dessert',
      'Themed balloon & fairy light table styling',
      'Signature celebratory cocktail / shooter round',
      'Personalized celebration playlist by our resident DJ',
    ],
    accent: '#C76B42',
  },
  {
    id: 'terrace',
    title: 'Skybar Terrace Private Takeover',
    tag: 'Exclusive Rooftop Soiree',
    icon: FaChampagneGlasses,
    capacity: '50 – 200 Guests',
    desc: 'Take over Gurugram’s most vibrant rooftop under the open sky. Panoramic city views, private mixology bar station, and your choice of live entertainment.',
    perks: [
      'Exclusive private access to our Skybar Terrace',
      'Dedicated flair bartenders & bespoke cocktail menu',
      'Open-air starry sky atmosphere & panoramic skyline',
      'Live acoustic band or DJ curated to your vibe',
    ],
    accent: '#D9A441',
  },
];

export default function HomeCelebrateTogether({ onOpenBookModal }) {
  return (
    <section id="celebrate" className="relative py-20 sm:py-28 brew-wall overflow-hidden border-t border-[#D9A441]/15">
      
      {/* Background accents */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C76B42]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1">
            Unforgettable milestones, crafted with care
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] tracking-tight mt-1 mb-4">
            Birthdays, Corporate Parties & <span className="italic text-[#D9A441]">Private Gatherings.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E6D3B3]/75 font-light leading-relaxed">
            From intimate birthday dinners with family to large-scale corporate mixers and private rooftop sundowners, our dedicated events team handles every single detail with precision.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#24150C]/85 backdrop-blur-md p-7 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D9A441]/60 hover:shadow-[0_20px_50px_rgba(217,164,65,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441]">
                      <Icon className="text-xl" />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EBCB86]">
                      {pkg.capacity}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441] block mb-1">
                    {pkg.tag}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE0] font-normal leading-snug mb-3 group-hover:text-[#D9A441] transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-[#E6D3B3]/75 font-light leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  {/* Bullet perks */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                    {pkg.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#E6D3B3]/90">
                        <FaCheck className="mt-0.5 shrink-0 text-xs text-[#D9A441]" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp & Reserve CTAs */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 mt-auto">
                  <a
                    href={`https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20I%20would%20like%20to%20plan%20a%20${encodeURIComponent(
                      pkg.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] py-3 text-xs font-bold uppercase tracking-wider text-[#143d22] transition-all shadow-md"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Quick WhatsApp Enquiry</span>
                  </a>

                  <button
                    onClick={onOpenBookModal}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-3 text-xs font-bold uppercase tracking-wider text-[#F7EFE0] hover:border-[#D9A441] hover:text-[#D9A441] transition cursor-pointer"
                  >
                    <span>Instant Booking Form</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Concierge Banner */}
        <div className="mt-12 rounded-3xl border border-[#D9A441]/30 bg-[#1A110B]/80 p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl text-[#F7EFE0]">
              Planning a group gathering of 25+ guests?
            </h4>
            <p className="text-xs text-[#E6D3B3]/75 max-w-xl">
              Get customized per-head food & craft beverage packages, dedicated event manager, and special weekday corporate pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+917303203535"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#F7EFE0] hover:border-[#D9A441] transition"
            >
              <FaPhone className="text-xs text-[#D9A441]" />
              <span>Call: +91 73032 03535</span>
            </a>

            <Link
              to="/parties"
              className="inline-flex items-center gap-2 rounded-full bg-[#D9A441] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#2A1A10] hover:brightness-110 transition shadow-md"
            >
              <span>View Corporate Packages</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
