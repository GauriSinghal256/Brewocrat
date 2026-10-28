import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToTarget } from '../components/AnimatedComponents';
import {
  FaChampagneGlasses,
  FaBuilding,
  FaCheck,
  FaCalendarDays,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaArrowLeft,
  FaPhone,
  FaWhatsapp,
  FaUtensils,
  FaBeerMugEmpty,
  FaWineBottle,
  FaCrown
} from 'react-icons/fa6';

export default function PartiesAndCorporate({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Parties & Corporate Celebrations | Brewocrat Gurugram";
  }, []);

  // 4-Step Party Lead Wizard State
  const [partyStep, setPartyStep] = useState(0);
  const [partyData, setPartyData] = useState({
    date: '',
    time: '19:00',
    pax: 25,
    occasion: 'Birthday / Celebration',
    package: 'Brewhouse',
    zone: 'Courtyard',
    budget: 1500,
    notes: '',
    name: '',
    phone: '',
    email: '',
    company: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState('');
  const [partyPriority, setPartyPriority] = useState('');
  const [partyError, setPartyError] = useState('');

  // Corporate Modal / Quick Enquiry State
  const [corpData, setCorpData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    type: 'Team Outing / Dinner',
    pax: 30,
    brief: ''
  });
  const [corpSubmitted, setCorpSubmitted] = useState(false);
  const [corpError, setCorpError] = useState('');

  // Packages Definition
  const packages = [
    {
      id: 'Feast',
      title: 'Feast',
      tag: 'Food-Led Celebration',
      price: '₹1,000–1,200',
      unit: 'per guest',
      icon: FaUtensils,
      image: '/interior/interior_seating.jpg',
      color: 'border-[#D9A441]/30',
      features: [
        'Curated 3-course gourmet dining menu',
        'Chef’s signature starters & wood-fired pizzas',
        'Unlimited soft beverages & welcome mocktails',
        'Vegetarian & Non-Vegetarian variants',
        'Dedicated service captain for your party'
      ]
    },
    {
      id: 'Brewhouse',
      title: 'Brewhouse',
      tag: 'Most Popular Choice',
      price: '₹1,300–1,600',
      unit: 'per guest',
      icon: FaBeerMugEmpty,
      image: '/interior/bar.jpg',
      featured: true,
      color: 'border-[#D9A441] shadow-[0_10px_35px_rgba(217,164,65,0.2)]',
      features: [
        'Unlimited fresh craft beer from our 6 in-house taps',
        'Full 3-course dining & global appetiser spread',
        'Curated mocktails, fresh juices & soft bar',
        'Flexible allocation in Salon, Courtyard or Terrace',
        'Custom celebration cake cutting setup'
      ]
    },
    {
      id: 'IMFL',
      title: 'IMFL',
      tag: 'Spirits & Craft Beer',
      price: '₹1,400–1,800',
      unit: 'per guest',
      icon: FaWineBottle,
      image: '/interior/brewocrat_interior.jpg',
      color: 'border-[#B07A2E]/50',
      features: [
        'House whisky, vodka, gin & rum pours',
        'Unlimited fresh craft beer + signature mocktails',
        'Lavish wood-fired barbecue & tandoori platters',
        'Main-course artisanal curry bowls & breads',
        'Manager-led custom bar package setup'
      ]
    },
    {
      id: 'Premium',
      title: 'Premium',
      tag: 'Luxury Bespoke VIP',
      price: 'Custom quote',
      unit: 'customised allocation',
      icon: FaCrown,
      image: '/interior/exterior2.jpg',
      color: 'border-[#F7EFE0]/30',
      features: [
        'Imported premium single malts, scotch & gins',
        'Bespoke culinary menu curated by Executive Chef',
        'Exclusive buyout or semi-private zone reservation',
        'Custom lighting, sound & live artist coordination',
        'Valet parking assistance for all guests'
      ]
    }
  ];

  // Submit Party Enquiry
  const handlePartySubmit = (e) => {
    e.preventDefault();
    setPartyError('');
    if (!partyData.name || !partyData.phone) {
      setPartyError('Please enter your name and contact phone number.');
      return;
    }
    if (!partyData.date) {
      setPartyError('Please choose your event date before continuing.');
      setPartyStep(0);
      return;
    }
    const leadId = 'PL-' + String(Date.now()).slice(-5);
    const eventDate = new Date(`${partyData.date}T${partyData.time || '19:00'}`);
    const hoursUntilEvent = (eventDate.getTime() - Date.now()) / (60 * 60 * 1000);
    const priority = hoursUntilEvent >= 0 && hoursUntilEvent <= 48 ? 'P1' : 'P2';
    const lead = {
      id: leadId,
      created: new Date().toISOString(),
      ...partyData,
      priority,
      owner: 'Party Desk',
      nextAction: priority === 'P1' ? 'Call immediately to confirm availability and quote' : 'Call within one business day to discuss the event'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('brewocrat_parties') || '[]');
      if (!Array.isArray(existing)) throw new Error('Saved party enquiries are not in the expected format.');
      localStorage.setItem('brewocrat_parties', JSON.stringify([lead, ...existing]));
      setCreatedLeadId(leadId);
      setPartyPriority(priority);
      setLeadSubmitted(true);
    } catch (storageError) {
      setPartyError(`We couldn't save your party enquiry on this device. ${storageError.message}`);
    }
  };

  // Submit Corporate Enquiry
  const handleCorpSubmit = async (e) => {
    e.preventDefault();
    setCorpError('');
    if (!corpData.name || !corpData.phone || !corpData.company) {
      setCorpError('Please complete the contact name, phone, and company.');
      return;
    }
    try {
      await api.post('/corporate', corpData);
      setCorpSubmitted(true);
    } catch (apiError) {
      setCorpError(apiError.message);
    }
  };

  return (
    <div className="w-full brew-wall text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10]">
      
      {/* 1. Hero Header */}
      <section className="relative py-24 sm:py-32 brew-wall overflow-hidden border-b border-[#D9A441]/20">
        <img src="/interior/exterior.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0805]/75 via-[#0D0805]/85 to-[#0D0805]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full brew-card border border-[#D9A441]/30">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              PARTIES • CELEBRATIONS • CORPORATE OUTINGS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7EFE0] font-normal tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6">
            From First Enquiry To <span className="italic text-[#D9A441]">Unforgettable Night.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#E6D3B3]/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Whether you are hosting an intimate 15-guest birthday, a 60-pax sunset terrace mixer,
            or a 150-guest corporate banquet with tax invoices, Brewocrat gives you transparent packages,
            dedicated event managers, and crafted indulgence.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="#party-wizard"
              className="px-7 py-3.5 rounded-full bg-[#D9A441] text-[#0D0805] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_5px_25px_rgba(217,164,65,0.35)]"
            >
              Instant Party Cost Calculator
            </a>
            <a
              href="#corporate-funnel"
              className="px-7 py-3.5 rounded-full brew-card text-[#F7EFE0] border border-[#D9A441]/30 hover:border-[#D9A441] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Corporate & Bulk Funnel
            </a>
          </div>
        </div>
      </section>

      {/* 2. Four Tailored Packages */}
      <section className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold block mb-2">
            TRANSPARENT PACKAGES • ZERO GUESSWORK
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal">
            Curated Party Packages
          </h2>
          <p className="text-sm sm:text-base text-[#E6D3B3]/75 mt-3">
            Choose the package that fits your group. All packages include food spreads, customizable variants,
            and dedicated zone service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`overflow-hidden rounded-3xl bg-[#140C07]/90 p-7 sm:p-8 border ${pkg.color} flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1 backdrop-blur-md`}
              >
                <img src={pkg.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#140C07]/80 via-[#100804]/90 to-[#0A0503]" />
                {pkg.featured && (
                  <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D9A441] text-[#0D0805] text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl brew-card border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] mb-5">
                    <Icon className="text-xl" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold block mb-1">
                    {pkg.tag}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-3">
                    {pkg.title}
                  </h3>
                  <div className="mb-6">
                    <div className="text-2xl sm:text-3xl text-[#F7EFE0] font-serif font-semibold">
                      {pkg.price}
                    </div>
                    <span className="text-xs text-[#E6D3B3]/60">{pkg.unit}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#E6D3B3]/85">
                        <FaCheck className="text-[#D9A441] text-[11px] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setPartyData((prev) => ({ ...prev, package: pkg.id }));
                    const el = document.getElementById('party-wizard');
                    if (el) scrollToTarget(el);
                  }}
                  className={`relative z-10 w-full py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    pkg.featured
                      ? 'bg-[#D9A441] text-[#2A1A10] hover:brightness-110 shadow-lg'
                      : 'brew-card text-[#F7EFE0] border border-[#D9A441]/30 hover:border-[#D9A441]'
                  }`}
                >
                  Select This Package
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive 4-Step Party Lead Wizard */}
      <section id="party-wizard" className="relative py-20 sm:py-28 brew-wall border-y border-[#D9A441]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold block mb-2">
              INSTANT EVENT PLANNER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] font-normal">
              Build Your Party In 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#E6D3B3]/75 mt-2">
              Select your date, guest count, and package. Receive instant capacity validation and an executive quote.
            </p>
          </div>

          <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-6 sm:p-10 lg:p-12 shadow-2xl">
            
            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#D9A441]/20">
              {['Group Basics', 'Select Package', 'Zone & Budget', 'Contact Details'].map((stepName, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i <= partyStep
                        ? 'bg-[#D9A441] text-[#2A1A10]'
                        : 'brew-card text-[#E6D3B3]/50 border border-[#D9A441]/20'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs hidden md:inline font-medium ${i === partyStep ? 'text-[#F7EFE0]' : 'text-[#E6D3B3]/50'}`}>
                    {stepName}
                  </span>
                </div>
              ))}
            </div>

            {leadSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center text-3xl mx-auto mb-4 border border-[#D9A441]/40">
                  <FaCheck />
                </div>
                <h3 className="font-serif text-3xl text-[#F7EFE0] font-normal mb-2">
                  Party Enquiry Confirmed!
                </h3>
                <p className="text-sm text-[#E6D3B3]/80 max-w-md mx-auto mb-6">
                  Reference code: <span className="font-bold text-[#D9A441]">{createdLeadId}</span>.
                  Our senior events manager will call you within 30 minutes with table layout options and tasting menus.
                </p>
                <div className="mx-auto mb-6 max-w-lg rounded-2xl border border-[#D9A441]/25 bg-[#D9A441]/[0.06] p-4 text-left">
                  <p className="text-xs text-[#F7EFE0]">Priority <strong className="text-[#EBCB86]">{partyPriority}</strong> · Owner <strong className="text-[#EBCB86]">Party Desk</strong></p>
                  <p className="mt-1 text-xs leading-relaxed text-[#E6D3B3]/70">
                    Next action: {partyPriority === 'P1' ? 'Call immediately to confirm availability and quote.' : 'Call within one business day to discuss the event.'}
                  </p>
                </div>
                {partyError && <p role="alert" className="mb-5 text-sm text-red-300">{partyError}</p>}
                <div className="flex justify-center gap-4">
                  <a
                    href="https://wa.me/917303203535"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#D9A441] text-[#2A1A10] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <FaWhatsapp className="text-sm" />
                    Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={() => {
                      setLeadSubmitted(false);
                      setPartyStep(0);
                    }}
                    className="px-6 py-3 rounded-full brew-card text-[#F7EFE0] border border-[#D9A441]/30 text-xs uppercase tracking-wider"
                  >
                    Plan Another Event
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step 1: Basics */}
                {partyStep === 0 && (
                  <div>
                    <h4 className="font-serif text-2xl text-[#F7EFE0] mb-6">Step 1: Tell us what you’re planning</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Event Date</label>
                        <input
                          type="date"
                          min={new Date().toLocaleDateString('en-CA')}
                          value={partyData.date}
                          onChange={(e) => { setPartyData({ ...partyData, date: e.target.value }); setPartyError(''); }}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Start Time</label>
                        <input
                          type="time"
                          value={partyData.time}
                          onChange={(e) => setPartyData({ ...partyData, time: e.target.value })}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Number of Guests (Pax)</label>
                        <input
                          type="number"
                          min="10"
                          max="250"
                          value={partyData.pax}
                          onChange={(e) => setPartyData({ ...partyData, pax: Number(e.target.value) })}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Occasion</label>
                        <select
                          value={partyData.occasion}
                          onChange={(e) => setPartyData({ ...partyData, occasion: e.target.value })}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        >
                          <option>Birthday / Celebration</option>
                          <option>Corporate Outing / Dinner</option>
                          <option>Cocktail Evening / Mixer</option>
                          <option>Anniversary Celebration</option>
                          <option>Kitty / Social Gathering</option>
                          <option>Other Private Event</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Package */}
                {partyStep === 1 && (
                  <div>
                    <h4 className="font-serif text-2xl text-[#F7EFE0] mb-6">Step 2: Choose the starting package</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setPartyData({ ...partyData, package: pkg.id })}
                          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                            partyData.package === pkg.id
                              ? 'bg-[#D9A441]/15 border-[#D9A441] shadow-[0_4px_20px_rgba(217,164,65,0.2)]'
                              : 'brew-card border-[#D9A441]/20 hover:border-[#D9A441]/50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-serif text-xl text-[#F7EFE0] font-medium">{pkg.title}</span>
                            <span className="text-xs font-bold text-[#D9A441]">{pkg.price}</span>
                          </div>
                          <p className="text-xs text-[#E6D3B3]/70">{pkg.tag}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Zone & Budget */}
                {partyStep === 2 && (
                  <div>
                    <h4 className="font-serif text-2xl text-[#F7EFE0] mb-6">Step 3: Space preference & requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Preferred Atmosphere Zone</label>
                        <select
                          value={partyData.zone}
                          onChange={(e) => setPartyData({ ...partyData, zone: e.target.value })}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        >
                          <option value="Salon">Indoor Salon (AC, Dinner-forward • ~100 pax)</option>
                          <option value="Courtyard">Courtyard (Open-Air, Live stage • ~90 pax)</option>
                          <option value="Terrace">Super Terrace (Rooftop skyline • ~60 pax)</option>
                          <option value="Best Available">Best Available Allocation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Approx Budget / Guest (₹)</label>
                        <input
                          type="number"
                          value={partyData.budget}
                          onChange={(e) => setPartyData({ ...partyData, budget: Number(e.target.value) })}
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Special Requests / Requirements</label>
                        <textarea
                          rows="3"
                          value={partyData.notes}
                          onChange={(e) => setPartyData({ ...partyData, notes: e.target.value })}
                          placeholder="Mic setup, DJ preference, birthday cake cutting, vegetarian requirements..."
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl p-4 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl brew-card border border-[#D9A441]/20 mb-8 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D9A441] shrink-0" />
                      <span className="text-xs text-[#E6D3B3]">
                        Capacity check: For <strong className="text-[#F7EFE0]">{partyData.pax} guests</strong>,{' '}
                        {partyData.pax <= 60 ? 'all three zones are suitable for private allocation.' : 'Courtyard or Indoor Salon buyout is recommended.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {partyStep === 3 && (
                  <div>
                    <h4 className="font-serif text-2xl text-[#F7EFE0] mb-6">Step 4: Who should we send the quote to?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={partyData.name}
                          onChange={(e) => setPartyData({ ...partyData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={partyData.phone}
                          onChange={(e) => setPartyData({ ...partyData, phone: e.target.value })}
                          placeholder="10-digit phone number"
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Email (Optional)</label>
                        <input
                          type="email"
                          value={partyData.email}
                          onChange={(e) => setPartyData({ ...partyData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Company Name (If applicable)</label>
                        <input
                          type="text"
                          value={partyData.company}
                          onChange={(e) => setPartyData({ ...partyData, company: e.target.value })}
                          placeholder="Company or Organisation"
                          className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl brew-card border border-[#D9A441]/30 mb-8">
                      <div className="text-xs uppercase tracking-wider text-[#D9A441] font-bold mb-1">Enquiry Summary</div>
                      <div className="text-sm text-[#F7EFE0]">
                        {partyData.pax} Guests • {partyData.package} Package • {partyData.zone} Zone • Approx. ₹{partyData.budget * partyData.pax} Est. Total
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {partyError && <p role="alert" className="mt-5 text-sm text-red-300">{partyError}</p>}
                <div className="flex justify-between items-center pt-6 border-t border-[#D9A441]/20">
                  {partyStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setPartyStep((prev) => prev - 1)}
                      className="px-5 py-2.5 rounded-full brew-card hover:bg-[#4A2C18] text-[#F7EFE0] text-xs uppercase tracking-wider font-semibold border border-[#D9A441]/30 flex items-center gap-2 cursor-pointer"
                    >
                      <FaArrowLeft className="text-xs" /> Back
                    </button>
                  ) : <div />}

                  {partyStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (partyStep === 0 && !partyData.date) {
                          setPartyError('Please choose your event date to continue.');
                          return;
                        }
                        setPartyError('');
                        setPartyStep((prev) => prev + 1);
                      }}
                      className="px-7 py-3 rounded-full bg-[#D9A441] text-[#2A1A10] text-xs uppercase tracking-wider font-bold hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      Continue <FaArrowRight className="text-xs" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePartySubmit}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] text-[#2A1A10] text-xs uppercase tracking-wider font-black hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-xl"
                    >
                      Submit Party Enquiry
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4. Corporate & Bulk Funnel */}
      <section id="corporate-funnel" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D9A441]/20">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
                CORPORATE & B2B SERVICES
              </span>
              <span className="w-8 h-px bg-[#D9A441]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F7EFE0] uppercase font-normal">
              A Dedicated Funnel For <span className="italic text-[#D9A441]">Business Needs.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#E6D3B3]/80 max-w-md font-light leading-relaxed">
            Team lunches, project milestones, tax invoices, bulk kitchen catering, and venue tie-ups
            with dedicated account managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                TEAM OUTINGS & MIXERS
              </span>
              <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-3">Corporate Dining</h3>
              <p className="text-xs sm:text-sm text-[#E6D3B3]/75 leading-relaxed mb-6 font-light">
                Host team rewards, client lunches, and festival celebrations with GST invoice compliance,
                AV screen facilities, and fixed beverage packages.
              </p>
            </div>
            <a
              href="#corp-form"
              className="text-xs font-bold text-[#D9A441] hover:text-[#F7EFE0] flex items-center gap-2"
            >
              Start Team Enquiry →
            </a>
          </div>

          <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                OFFICE & OFF-SITE CATERING
              </span>
              <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-3">Bulk Food Delivery</h3>
              <p className="text-xs sm:text-sm text-[#E6D3B3]/75 leading-relaxed mb-6 font-light">
                Hot, freshly packaged meals prepared from the Brewocrat kitchen delivered directly
                to your corporate offices or offsite locations in Gurugram.
              </p>
            </div>
            <a
              href="#corp-form"
              className="text-xs font-bold text-[#D9A441] hover:text-[#F7EFE0] flex items-center gap-2"
            >
              Request Bulk Quote →
            </a>
          </div>

          <div className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9A441] block mb-2">
                ANNUAL TIE-UPS & REWARDS
              </span>
              <h3 className="font-serif text-2xl text-[#F7EFE0] font-normal mb-3">Channel Partnerships</h3>
              <p className="text-xs sm:text-sm text-[#E6D3B3]/75 leading-relaxed mb-6 font-light">
                Become an approved F&B partner for nearby corporate parks, serviced residences,
                and coworking campuses with corporate member privileges.
              </p>
            </div>
            <a
              href="#corp-form"
              className="text-xs font-bold text-[#D9A441] hover:text-[#F7EFE0] flex items-center gap-2"
            >
              Talk To Business Desk →
            </a>
          </div>
        </div>

        {/* Corporate Direct Form */}
        <div id="corp-form" className="rounded-3xl brew-card border border-[#D9A441]/30 p-8 sm:p-12 max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE0] font-normal mb-2">
            Submit Corporate & B2B Enquiry
          </h3>
          <p className="text-xs sm:text-sm text-[#E6D3B3]/75 mb-8">
            Our Business Development team will revert with customized menus and corporate rate contracts.
          </p>

          {corpSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/30 text-center">
              <FaCheck className="text-3xl text-[#D9A441] mx-auto mb-3" />
              <h4 className="font-serif text-2xl text-[#F7EFE0] mb-2">Corporate Request Received</h4>
              <p className="text-xs text-[#E6D3B3]/80">
                A corporate sales director has been assigned to your brief and will call within business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCorpSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={corpData.name}
                  onChange={(e) => setCorpData({ ...corpData, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Company Name *</label>
                <input
                  type="text"
                  required
                  value={corpData.company}
                  onChange={(e) => setCorpData({ ...corpData, company: e.target.value })}
                  placeholder="e.g. Google / Zomato / DLF"
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={corpData.phone}
                  onChange={(e) => setCorpData({ ...corpData, phone: e.target.value })}
                  placeholder="Official phone number"
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Corporate Email</label>
                <input
                  type="email"
                  value={corpData.email}
                  onChange={(e) => setCorpData({ ...corpData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Requirement Type</label>
                <select
                  value={corpData.type}
                  onChange={(e) => setCorpData({ ...corpData, type: e.target.value })}
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                >
                  <option>Team Outing / Party</option>
                  <option>Corporate Lunch / Dinner</option>
                  <option>Bulk Food Office Delivery</option>
                  <option>Annual Corporate Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Estimated Guests / Qty</label>
                <input
                  type="number"
                  value={corpData.pax}
                  onChange={(e) => setCorpData({ ...corpData, pax: Number(e.target.value) })}
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl px-4 py-3 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-bold text-[#D9A441] mb-2 tracking-wider">Brief / Specific Instructions</label>
                <textarea
                  rows="3"
                  value={corpData.brief}
                  onChange={(e) => setCorpData({ ...corpData, brief: e.target.value })}
                  placeholder="Date preferences, AV requirements, tax invoice details, dietary restrictions..."
                  className="w-full brew-card border border-[#D9A441]/30 rounded-xl p-4 text-sm text-[#F7EFE0] focus:outline-none focus:border-[#D9A441]"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#D9A441] text-[#2A1A10] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-xl"
                >
                  Create Business Enquiry
                </button>
              </div>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
