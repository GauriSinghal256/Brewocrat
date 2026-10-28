import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMusic,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaTicket,
  FaArrowRight,
  FaCheck,
  FaWhatsapp,
  FaFire,
  FaChampagneGlasses
} from 'react-icons/fa6';

export default function Events({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Events & Weekly Live Music | Brewocrat Gurugram";
  }, []);

  const [activeDayFilter, setActiveDayFilter] = useState('all');

  const events = [
    {
      id: 'fri',
      day: 'Friday',
      shortDay: 'Fri',
      title: 'Friday Bollywood & Punjabi Night',
      artist: 'DJ Sumit Live & Guest Percussionist',
      time: '8:00 PM Till Late',
      genre: 'Bollywood Blockbusters • Punjabi Beats • Commercial Club',
      zone: 'Full Venue Dual Zone Experience',
      desc: 'Gurugram’s ultimate Friday celebration: high-energy commercial hits, massive crowd euphoria, and craft cocktails poured under fairy-lit pergolas.',
      badge: 'House Full Headliner',
      featured: true,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
    },
    {
      id: 'wed',
      day: 'Wednesday',
      shortDay: 'Wed',
      title: 'Melodic Sufi & Acoustic Live Band',
      artist: 'Acoustic Soul Project',
      time: '8:30 PM Onwards',
      genre: 'Acoustic • Sufi • Pop Fusion',
      zone: 'The Courtyard Live Stage',
      desc: 'Mid-week unwind featuring soulful unplugged acoustic sessions and melodic dinner arrangements that transition into upbeat sing-alongs.',
      badge: 'Mid-Week Live',
      featured: false,
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp',
    },
    {
      id: 'thu',
      day: 'Thursday',
      shortDay: 'Thu',
      title: 'Mixtape Nostalgia 90s/2000s Night',
      artist: 'DJ Sumit & Guests',
      time: '8:00 PM Onwards',
      genre: 'Retro Pop • 90s/2000s • Commercial Beats',
      zone: 'Courtyard & Skybar Terrace',
      desc: 'Throwback playlist heaven: sing along to all your favourite classic anthems, pop nostalgia, and timeless indie hits with ice-cold craft beer towers.',
      badge: 'Nostalgia Rewind',
      featured: false,
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
    },
    {
      id: 'sat',
      day: 'Saturday',
      shortDay: 'Sat',
      title: 'Saturday Live Euphoria',
      artist: 'Headline Fusion Band + Resident DJ',
      time: '8:30 PM Onwards',
      genre: 'Live Rock • Bollywood Fusion • Late-Night DJ',
      zone: 'Courtyard Live Stage & Terrace',
      desc: 'The biggest night of the week. Kick off with a powerhouse 6-piece live band followed by late-night commercial club beats across the courtyard.',
      badge: 'Weekend Headliner',
      featured: false,
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg',
    },
    {
      id: 'sun',
      day: 'Sunday',
      shortDay: 'Sun',
      title: 'Sunday Sunset Sessions',
      artist: 'Curated Acoustic Duos',
      time: '5:00 PM – 9:00 PM',
      genre: 'Chill Sunset Beats • Acoustic Melodies',
      zone: 'The Super Terrace & Skybar',
      desc: 'Wrap up your weekend with lazy late lunches, golden hour sunset skylines, and soothing acoustic melodies on our open-air terrace.',
      badge: 'Sundowner Vibes',
      featured: false,
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
    },
    {
      id: 'mon-tue',
      day: 'Mon & Tue',
      shortDay: 'Mon-Tue',
      title: 'Craft & Dine Ambient Evenings',
      artist: 'Curated Lounge Sounds',
      time: '12:00 PM – 12:00 AM',
      genre: 'Ambient Lounge • Soft Jazz',
      zone: 'The Indoor Salon (AC)',
      desc: 'Calmer soundtrack, intimate conversations, wood-fired pizzas, and fresh pints straight from our conditioning tanks at 2°C.',
      badge: 'Easy Dining',
      featured: false,
      image: '/interior/interior_seating.jpg',
    },
  ];

  const filteredEvents =
    activeDayFilter === 'all'
      ? events
      : events.filter((e) => e.id === activeDayFilter);

  return (
    <div className="w-full bg-[#160D08] text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10] pt-24 sm:pt-32 pb-24">
      
      {/* 1. Hero Header */}
      <section className="relative pb-16 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-[#D9A441]/30 bg-[#120A06] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D9A441] font-bold">
            WEEKLY LIVE PROGRAMMING
          </span>
        </div>

        <div className="font-alex text-4xl sm:text-6xl md:text-7xl text-[#EFA364] script-gold-shadow leading-tight my-2">
          Where Gurugram gathers after sunset
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EFE0] tracking-tight mb-4">
          What’s On At <span className="italic text-[#D9A441]">Brewocrat.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#E6D3B3]/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          From Wednesday unplugged sufi sets and retro mixtape nights to high-energy Friday Bollywood
          and Saturday live rock, our stage brings Gurugram together every night.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3.5">
          <button
            onClick={onOpenBookModal}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C76B42] via-[#D9A441] to-[#C76B42] text-[#0D0805] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-[0_5px_25px_rgba(217,164,65,0.35)] cursor-pointer"
          >
            Reserve Table For Upcoming Event
          </button>
          
          <a
            href="https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20what%20is%20the%20live%20music%20lineup%20this%20week%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full border border-[#D9A441]/40 bg-[#160E09] text-[#F7EFE0] hover:border-[#D9A441] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
          >
            <FaWhatsapp className="text-[#3E9B6A] text-sm" />
            <span>Enquire Lineup on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* 2. Featured Friday Headliner Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#170E08] via-[#100804] to-[#170E08] border border-[#D9A441]/40 p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D9A441]/10 blur-[90px] pointer-events-none" />

          <div className="lg:col-span-8 relative z-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#D9A441] text-[#0D0805] text-[10px] font-black uppercase tracking-wider">
              <FaFire />
              <span>THIS WEEK’S HEADLINER</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal mb-2">
              Friday Bollywood & Punjabi Night
            </h2>
            
            <p className="text-sm sm:text-base text-[#D9A441] font-semibold mb-4">
              Featuring DJ Sumit Live • 8:00 PM Onwards
            </p>
            
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4 mt-6">
              <button
                onClick={onOpenBookModal}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full bg-[#D9A441] text-[#0D0805] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg text-center justify-center flex items-center gap-1.5"
              >
                <span>Reserve Table</span>
              </button>
              
              <a
                href="https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20I%20would%20like%20to%20reserve%20for%20Friday%20Night"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full border border-white/20 bg-white/5 text-[#F7EFE0] hover:border-[#D9A441] font-bold text-xs uppercase tracking-wider transition text-center justify-center flex items-center gap-1.5"
              >
                <span>Guestlist</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-[#0D0805]/90 border border-[#D9A441]/25 p-6 text-center relative z-10 shadow-2xl">
            <div className="text-3xl font-serif text-[#D9A441] font-bold mb-1">EVERY FRIDAY</div>
            <div className="text-xs text-[#F7EFE0] uppercase tracking-widest font-semibold mb-3">COURTYARD & SKYBAR</div>
            <p className="text-xs text-[#E6D3B3]/70 leading-relaxed mb-4">
              Cover & reservation rules apply after 9:30 PM. Book online to guarantee your table.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#EBCB86] uppercase tracking-wider">
              <FaTicket className="text-xs text-[#D9A441]" /> Free Entry Before 8:30 PM
            </span>
          </div>
        </div>
      </section>

      {/* 3. The Full Weekly Calendar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Day Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {['all', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon-tue'].map((filterId) => (
            <button
              key={filterId}
              onClick={() => setActiveDayFilter(filterId)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeDayFilter === filterId
                  ? 'bg-[#D9A441] text-[#0D0805] shadow-md scale-105'
                  : 'bg-[#120A06] text-[#F7EFE0] border border-[#D9A441]/20 hover:border-[#D9A441]/50'
              }`}
            >
              {filterId === 'all' ? 'Full Week' : filterId.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl bg-[#120A06] border border-[#D9A441]/20 hover:border-[#D9A441]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-xl"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 border border-white/10">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503]/90 via-transparent" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0D0805]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#D9A441] text-[10px] font-bold uppercase tracking-wider">
                      {evt.day}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#D9A441] text-[#0D0805] text-[9px] font-black uppercase tracking-wider">
                      {evt.badge}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-1">
                    {evt.genre}
                  </span>

                  <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-1">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#EBCB86] font-semibold mb-3">
                    {evt.artist} • {evt.time}
                  </p>

                  <div className="text-[11px] text-[#F7EFE0] bg-[#1A110B]/60 p-3 rounded-xl border border-white/10 mb-5">
                    <span className="text-[#D9A441] font-semibold">Zone:</span> {evt.zone}
                  </div>
                </div>

                <button
                  onClick={onOpenBookModal}
                  className="w-full py-3 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FaTicket className="text-xs" />
                  <span>Reserve For {evt.shortDay}</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

    </div>
  );
}
