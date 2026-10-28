import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaPhone, FaLocationDot, FaClock } from 'react-icons/fa6';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Brewhouse', path: '/brewhouse' },
  { name: 'Menu', path: '/menu' },
  { name: 'Reserve a table', path: '/book-table' },
  { name: 'Events', path: '/events' },
  { name: 'Parties & corporate', path: '/parties' },
  { name: 'Visit', path: '/visit' },
];

export default function Navbar({ onOpenBookModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Lock page scroll, close on Escape, move focus into the menu and back out
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 60);
    const opener = openBtnRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(focusTimer);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, [isMenuOpen]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const D = reduceMotion ? 0 : 1;

  return (
    <>
      {/* ───────────── Header: logo, quick links, and menu icon ───────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0D0805]/95 backdrop-blur-xl border-b border-[#D9A441]/20 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-[#0D0805]/90 via-[#0D0805]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transition-transform duration-300 hover:scale-105"
              title="Brewocrat - Brewery Skybar & Kitchen"
            >
              <img
                src="/images/logo.png"
                alt="Brewocrat"
                className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(42,26,16,0.6)] sm:h-12 lg:h-14"
              />
            </Link>

            {/* Desktop Center Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.16em] text-[#E6D3B3]">
              <Link to="/" className="hover:text-[#D9A441] transition">Home</Link>
              <Link to="/menu" className="hover:text-[#D9A441] transition">Menu</Link>
              <Link to="/brewhouse" className="hover:text-[#D9A441] transition">The Brewhouse</Link>
              <Link to="/events" className="hover:text-[#D9A441] transition">Events</Link>
              <Link to="/parties" className="hover:text-[#D9A441] transition">Parties</Link>
              <Link to="/visit" className="hover:text-[#D9A441] transition">Visit</Link>
            </nav>

            {/* Right CTAs: Reserve Table & Hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenBookModal}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C76B42] via-[#D9A441] to-[#C76B42] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#2A1A10] shadow-[0_4px_16px_rgba(217,164,65,0.35)] hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <span>Reserve Table</span>
              </button>

              <button
                ref={openBtnRef}
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className="group flex h-10 w-10 cursor-pointer flex-col items-end justify-center gap-[6px] rounded-full border border-white/10 bg-white/5 p-2 hover:border-[#D9A441] transition"
              >
                <span className="block h-[2px] w-6 rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:bg-[#D9A441]" />
                <span className="block h-[2px] w-4 rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:w-5 group-hover:bg-[#D9A441]" />
                <span className="block h-[2px] w-2.5 rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:w-4 group-hover:bg-[#D9A441]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ───────────── Full-screen menu page ───────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu-page"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#0D0805] text-[#F7EFE0] lg:overflow-hidden mediterranean-pattern"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7 * D, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between bg-[#0D0805] px-4 py-4 sm:px-6 sm:py-5 lg:px-8 border-b border-[#D9A441]/20">
              <div className="flex w-full items-center justify-between">
                <Link to="/" onClick={closeMenu}>
                  <img src="/images/logo.png" alt="Brewocrat" className="h-10 sm:h-12 w-auto" />
                </Link>
                <button
                  ref={closeBtnRef}
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="group relative h-10 w-10 cursor-pointer"
                >
                  <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 rotate-45 rounded-full bg-[#D9A441] transition-colors duration-300 group-hover:bg-[#F7EFE0]" />
                  <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 -rotate-45 rounded-full bg-[#D9A441] transition-colors duration-300 group-hover:bg-[#F7EFE0]" />
                </button>
              </div>

            </div>

            <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
              {/* Colour bands */}
              <nav className="flex flex-1 flex-col lg:basis-[62%]" aria-label="Site menu">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      className="flex min-h-[72px] flex-1 origin-left transition-[flex-grow] duration-500 lg:hover:flex-[1.7_1_0%]"
                      style={{ backgroundColor: '#0D0805' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 * D, delay: (0.3 + i * 0.06) * D, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className="group flex w-full items-center px-7 sm:px-12 lg:px-16"
                        style={{
                          color: '#F7EFE0',
                          boxShadow: isActive ? 'inset 10px 0 0 0 #D9A441' : 'none',
                        }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="font-display italic leading-tight transition-transform duration-300 group-hover:translate-x-2 text-[clamp(1.9rem,5.4vw,3.4rem)] group-hover:text-[#D9A441]">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Visit panel */}
              <motion.aside
                className="flex flex-col justify-center gap-7 bg-[#120A06] border-l border-[#D9A441]/20 px-7 py-9 sm:px-12 lg:basis-[38%] lg:px-12"
                initial={{ opacity: 0, y: 24 * D }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 * D, delay: 0.6 * D, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="/images/cocktails_bar.png"
                  alt="Cocktails at the Brewocrat skybar"
                  className="hidden aspect-[16/10] w-full rounded-2xl object-cover lg:block border border-[#D9A441]/30 shadow-2xl"
                />

                <ul className="space-y-4 text-[15px] text-[#F7EFE0]">
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30"><FaLocationDot /></span>
                    <span className="text-sm">2nd Floor, Element One, Sector 47, Gurugram</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30"><FaClock /></span>
                    <span className="text-sm">Daily, 12:00 PM to 1:00 AM</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30"><FaPhone /></span>
                    <a href="tel:+917303203535" className="transition-colors hover:text-[#D9A441] text-sm">+91 73032 03535</a>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenBookModal();
                  }}
                  className="hidden w-full items-center justify-center rounded-full bg-[#D9A441] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0D0805] shadow-[0_4px_20px_rgba(217,164,65,0.35)] transition-all duration-300 hover:brightness-110 lg:flex cursor-pointer"
                >
                  Reserve a table
                </button>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
