import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMusic,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaTicket,
  FaArrowRight,
  FaCheck,
  FaGuitar,
  FaRecordVinyl
} from 'react-icons/fa6';

export default function Events({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Events & Weekly Live Music | Brewocrat Gurugram";
  }, []);

  const [activeDayFilter, setActiveDayFilter] = useState('all');

  const events = [
    {
      id: 'wed',
      day: 'Wednesday',
      shortDay: 'Wed',
      title: 'Melodic Dinner Live Band',
      artist: 'Acoustic Soul Project',
      time: '8:30 PM Onwards',
      genre: 'Acoustic • Sufi • Pop Fusion',
      zone: 'The Courtyard Stage',
      desc: 'Mid-week unwind featuring soulful unplugged acoustic sessions and melodic dinner arrangements that transition into upbeat sing-alongs.',
      badge: 'Mid-Week Live',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/7cbf0f9e69ab18ec07dea52f3766ab4a.jpg?output-format=webp'
    },
    {
      id: 'thu',
      day: 'Thursday',
      shortDay: 'Thu',
      title: 'Mixtape Nostalgia Night',
      artist: 'DJ Sumit & Guests',
      time: '8:00 PM Onwards',
      genre: 'Retro Pop • 90s/2000s • Commercial Beats',
      zone: 'Courtyard & Skybar Terrace',
      desc: 'Throwback playlist heaven: sing along to all your favourite classic anthems, pop nostalgia, and timeless indie hits with ice-cold craft beer towers.',
      badge: 'Nostalgia Rewind',
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg'
    },
    {
      id: 'fri',
      day: 'Friday',
      shortDay: 'Fri',
      title: 'Friday Bollywood & Punjabi Night',
      artist: 'DJ Sumit Live',
      time: '8:00 PM Till Late',
      genre: 'Bollywood Blockbusters • Punjabi Beats • Commercial Club',
      zone: 'Full Venue Dual Zone Experience',
      desc: 'Gurugram’s ultimate Friday celebration: high-energy commercial hits, massive crowd euphoria, and craft cocktails poured under fairy-lit pergolas.',
      featured: true,
      badge: 'House Full Energy',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp'
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
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/a6cef196266bc7353481d501e90503fe.jpeg'
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
      image: 'https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg'
    },
    {
      id: 'mon-tue',
      day: 'Mon & Tue',
      shortDay: 'Mon-Tue',
      title: 'Craft & Dine Evenings',
      artist: 'Curated Ambient Lounge Sound',
      time: '12:00 PM – 12:00 AM',
      genre: 'Ambient Lounge • Soft Jazz',
      zone: 'The Salon (Indoor AC)',
      desc: 'Calmer soundtrack, intimate conversations, wood-fired pizzas, and fresh pints straight from the conditioning tanks at 2°C.',
      badge: 'Easy Dining',
      image: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp'
    }
  ];

  const filteredEvents = activeDayFilter === 'all'
    ? events
    : events.filter((e) => e.id === activeDayFilter);

  return (
    <div className="w-full brew-wall text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10]">
      
      {/* 1. Hero Header */}
      <section className="relative py-24 sm:py-32 brew-wall border-b border-[#D9A441]/20">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full brew-card border border-[#D9A441]/30">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              WEEKLY LIVE PROGRAMMING
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7EFE0] font-normal tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6">
            What's On At <span className="italic text-[#D9A441]">Brewocrat.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#E6D3B3]/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            From Wednesday unplugged sufi sets and retro mixtape nights to high-energy Friday Bollywood
            and Saturday live euphoria, our stage brings Gurugram together every night.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onOpenBookModal}
              className="px-7 py-3.5 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_5px_25px_rgba(217,164,65,0.35)] cursor-pointer"
            >
              Reserve Table For Upcoming Event
            </button>
            <a
              href="https://wa.me/917303203535"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full brew-card text-[#F7EFE0] border border-[#D9A441]/30 hover:border-[#D9A441] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Enquire Live Lineup on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. Featured Friday Event Banner */}
      <section className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#4A2C18] via-[#4A2C18] to-[#4A2C18] border border-[#D9A441]/40 p-8 sm:p-12 shadow-[0_20px_60px_rgba(42,26,16,0.6)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#D9A441] text-[#2A1A10] text-[10px] font-black uppercase tracking-wider">
              THIS WEEK'S HEADLINER
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal mb-3">
              Friday Bollywood & Punjabi Night
            </h2>
            <p className="text-base text-[#D9A441] font-semibold mb-3">
              Featuring DJ Sumit Live • 8:00 PM Onwards
            </p>
            <p className="text-sm text-[#E6D3B3]/80 max-w-2xl font-light leading-relaxed mb-6">
              Our biggest weekly night. Full venue energy across the open-air courtyard and skybar terrace.
              Table reservations are strongly recommended as seating reaches capacity early.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/book-table?event=Friday%20Bollywood%20Night"
                className="px-6 py-3 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg"
              >
                Reserve For Friday Night
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 text-center p-6 rounded-2xl bg-[#2A1A10]/80 border border-[#D9A441]/20">
            <div className="text-3xl font-serif text-[#D9A441] font-bold mb-1">EVERY FRIDAY</div>
            <div className="text-xs text-[#F7EFE0] uppercase tracking-widest font-semibold mb-4">COURTYARD & SKYBAR</div>
            <p className="text-xs text-[#E6D3B3]/70">Cover / reservation rules apply after 9:30 PM. Book online to guarantee your table.</p>
          </div>
        </div>
      </section>

      {/* 3. The Full Weekly Calendar Grid */}
      <section className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Day Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {['all', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon-tue'].map((filterId) => (
            <button
              key={filterId}
              onClick={() => setActiveDayFilter(filterId)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeDayFilter === filterId
                  ? 'bg-[#D9A441] text-[#2A1A10] shadow-md scale-105'
                  : 'brew-card text-[#F7EFE0] border border-[#D9A441]/20 hover:border-[#D9A441]/50'
              }`}
            >
              {filterId === 'all' ? 'Full Week' : filterId.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-3xl brew-card border border-[#D9A441]/20 hover:border-[#D9A441]/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 border border-[#D9A441]/20">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2A1A10]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#D9A441] text-[10px] font-bold uppercase tracking-wider">
                    {evt.day}
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-1">
                  {evt.badge}
                </span>

                <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-1">
                  {evt.title}
                </h3>

                <p className="text-xs text-[#D9A441] font-semibold mb-3">
                  {evt.artist} • {evt.time}
                </p>

                <p className="text-xs text-[#E6D3B3]/75 leading-relaxed font-light mb-5">
                  {evt.desc}
                </p>

                <div className="text-[11px] text-[#F7EFE0] brew-card p-3 rounded-xl border border-[#D9A441]/15 mb-6">
                  <span className="text-[#D9A441] font-semibold">Zone:</span> {evt.zone}
                </div>
              </div>

              <Link
                to={`/book-table?event=${encodeURIComponent(evt.title)}`}
                className="w-full py-3 rounded-full brew-card hover:bg-[#D9A441] text-[#F7EFE0] hover:text-[#2A1A10] border border-[#D9A441]/30 hover:border-[#D9A441] text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Reserve For {evt.shortDay}</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
