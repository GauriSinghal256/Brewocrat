import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaClock,
  FaLocationDot,
  FaMusic,
  FaTicket,
  FaWhatsapp,
  FaFire,
  FaCalendarDays
} from 'react-icons/fa6';

const DAYS = [
  { id: 'wed', label: 'Wed', day: 'Wednesday' },
  { id: 'thu', label: 'Thu', day: 'Thursday' },
  { id: 'fri', label: 'Fri', day: 'Friday' },
  { id: 'sat', label: 'Sat', day: 'Saturday' },
  { id: 'sun', label: 'Sun', day: 'Sunday' },
];

const EVENTS_BY_DAY = {
  fri: {
    id: 'fri',
    day: 'Friday',
    title: 'Friday Bollywood & Punjabi Night',
    artist: 'DJ Sumit Live',
    time: '8:00 PM Till Late',
    genre: 'Bollywood • Punjabi Club Anthems',
    zone: 'Courtyard & Skybar Terrace',
    badge: 'House Full Headliner',
    image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp',
    desc: 'Gurugram’s ultimate Friday celebration: high-energy commercial hits, massive crowd euphoria, and craft beers on tap under fairy-lit pergolas.',
    highlight: 'House Full Expected • Early Reservation Recommended',
  },
  wed: {
    id: 'wed',
    day: 'Wednesday',
    title: 'Melodic Sufi & Acoustic Live Band',
    artist: 'Acoustic Soul Project',
    time: '8:30 PM Onwards',
    genre: 'Unplugged Sufi • Acoustic Pop Fusion',
    zone: 'Courtyard Live Stage',
    badge: 'Mid-Week Live',
    image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp',
    desc: 'Soulful mid-week acoustic session featuring melodic unplugged sufi tunes transitioning into upbeat acoustic sing-alongs.',
    highlight: 'Acoustic Ambience • Dinner & Craft Beer Pairing',
  },
  thu: {
    id: 'thu',
    day: 'Thursday',
    title: 'Mixtape Nostalgia 90s/2000s Night',
    artist: 'DJ Sumit & Guests',
    time: '8:00 PM Onwards',
    genre: 'Retro Pop • 90s/2000s Classics',
    zone: 'Skybar Terrace',
    badge: 'Retro Rewind',
    image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
    desc: 'Throwback playlist heaven: timeless sing-alongs and iconic retro hits with chilled 3L craft beer towers under the starry sky.',
    highlight: 'Beer Tower Specials • Retro Sing-Along',
  },
  sat: {
    id: 'sat',
    day: 'Saturday',
    title: 'Saturday Live Euphoria',
    artist: '6-Piece Headline Fusion Band',
    time: '8:30 PM Onwards',
    genre: 'Live Rock • Bollywood Fusion • Late-Night DJ',
    zone: 'Courtyard Live Stage & Terrace',
    badge: 'Weekend Peak',
    image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg',
    desc: 'The peak night of Gurugram nightlife. A high-voltage 6-piece live band followed by late-night commercial sets and rooftop energy.',
    highlight: 'Peak Weekend Energy • Dual Zone Stage',
  },
  sun: {
    id: 'sun',
    day: 'Sunday',
    title: 'Sunday Sunset Sessions',
    artist: 'Curated Acoustic Duos',
    time: '5:00 PM – 9:00 PM',
    genre: 'Chill Sunset Beats • Acoustic Melodies',
    zone: 'The Super Terrace Skybar',
    badge: 'Sundowner Vibes',
    image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg',
    desc: 'Wrap up your weekend with golden hour sunsets, wood-fired Mediterranean tapas, and gentle acoustic rhythms on the skybar terrace.',
    highlight: 'Sunset Golden Hour • Open-Air Sundowner',
  },
};

export default function HomeCalendar({ onOpenBookModal }) {
  const [selectedDay, setSelectedDay] = useState('fri');

  const activeEvent = EVENTS_BY_DAY[selectedDay] || EVENTS_BY_DAY.fri;

  return (
    <section id="calendar" className="relative py-14 sm:py-20 bg-[#0D0805] overflow-hidden border-t border-[#D9A441]/15 mediterranean-pattern">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#D9A441]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="font-alex text-3xl sm:text-5xl text-[#EFA364] script-gold-shadow leading-tight my-1 select-none">
            Where Gurugram gathers after sunset
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-[#F7EFE0] tracking-tight mt-1 mb-0 font-normal">
            Weekly Live Sets & <span className="italic text-[#D9A441]">DJ Euphoria</span>
          </h2>

          {/* Day Tabs — Click day to view single event */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-2.5">
            {DAYS.map((d) => {
              const active = selectedDay === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDay(d.id)}
                  aria-pressed={active}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-[#D9A441] text-[#0D0805] shadow-[0_4px_18px_rgba(217,164,65,0.4)] scale-105'
                      : 'bg-[#150E09] text-[#E6D3B3]/80 border border-white/10 hover:border-[#D9A441]/40 hover:text-[#F7EFE0]'
                  }`}
                >
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SINGLE EVENT SPOTLIGHT — Shows exactly one event for the selected day */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Event Image: Increased Width & Height */}
              <div className="lg:col-span-7 relative h-[300px] sm:h-[400px] lg:h-[460px] w-full rounded-3xl border border-[#D9A441]/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                <img
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503]/90 via-[#0A0503]/30 to-transparent" />
                
                <span className="absolute top-4 left-4 rounded-full bg-[#0D0805]/90 border border-[#D9A441]/40 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D9A441] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <FaCalendarDays className="text-xs" />
                  {activeEvent.day}
                </span>

                <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EFA364] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#0D0805] shadow-lg">
                  {activeEvent.badge}
                </span>

                <div className="absolute bottom-3.5 inset-x-4 text-center sm:text-left">
                  <span className="inline-block text-[11px] uppercase font-bold tracking-widest text-[#EBCB86] bg-[#0D0805]/85 border border-[#D9A441]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    {activeEvent.highlight}
                  </span>
                </div>
              </div>

              {/* Event Details: Clean, Organized & Managed */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-3 self-start px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/35 text-[#D9A441] text-[10px] font-bold uppercase tracking-wider">
                  <FaFire className="text-xs text-[#EFA364]" />
                  <span>{activeEvent.day} Live Spotlight</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7EFE0] font-normal leading-tight mb-2">
                  {activeEvent.title}
                </h3>

                <p className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold mb-4">
                  {activeEvent.genre}
                </p>

                {/* Event Metadata Chips */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#E6D3B3] mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180E09] border border-[#D9A441]/25 text-[#F7EFE0]">
                    <FaMusic className="text-[#D9A441] text-xs shrink-0" />
                    <span>{activeEvent.artist}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180E09] border border-[#D9A441]/25 text-[#F7EFE0]">
                    <FaClock className="text-[#D9A441] text-xs shrink-0" />
                    <span>{activeEvent.time}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180E09] border border-[#D9A441]/25 text-[#F7EFE0]">
                    <FaLocationDot className="text-[#D9A441] text-xs shrink-0" />
                    <span>{activeEvent.zone}</span>
                  </span>
                </div>

                {/* Action CTAs */}
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-3.5">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9A441] to-[#EFA364] px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D0805] shadow-[0_6px_25px_rgba(217,164,65,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    <FaTicket className="text-xs shrink-0" />
                    <span>Reserve Table</span>
                  </button>

                  <a
                    href={`https://wa.me/917303203535?text=Hi%20Brewocrat%2C%20I%20would%20like%20to%20reserve%20for%20${encodeURIComponent(activeEvent.day)}%20(${encodeURIComponent(activeEvent.title)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#160D08] px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-[#F7EFE0] hover:border-[#D9A441] hover:text-[#D9A441] transition"
                  >
                    <FaWhatsapp className="text-sm text-[#25D366] shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </section>
  );
}
