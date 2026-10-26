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

export default function Navbar() {
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
      {/* ───────────── Header: logo and menu icon ───────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#2A1A10]/95 backdrop-blur-xl border-b border-[#F7EFE0]/20 py-3 shadow-[0_12px_40px_rgba(42,26,16,0.6)]'
            : 'bg-gradient-to-b from-[#2A1A10]/80 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <button
                ref={openBtnRef}
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className="group order-2 ml-auto flex h-10 w-10 cursor-pointer flex-col items-end justify-center gap-[6px]"
              >
                <span className="block h-[2px] w-7 rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:bg-[#F7EFE0]/75" />
                <span className="block h-[2px] w-5 rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:w-6 group-hover:bg-[#F7EFE0]/75" />
                <span className="block h-[2px] w-[11px] rounded-full bg-[#F7EFE0] transition-all duration-300 group-hover:w-4 group-hover:bg-[#F7EFE0]/75" />
              </button>

              <Link
                to="/"
                className="order-1 flex -translate-x-2 items-center transition-transform duration-300 hover:scale-105 lg:-translate-x-3"
                title="Brewocrat - Brewery Skybar & Kitchen"
              >
                <img
                  src="/images/logo.png"
                  alt="Brewocrat"
                  className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(42,26,16,0.6)] sm:h-12 lg:h-16"
                />
              </Link>
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
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#2A1A10] text-[#F7EFE0] lg:overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7 * D, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between bg-[#2A1A10] px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
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
                  <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 rotate-45 rounded-full bg-[#F7EFE0] transition-colors duration-300 group-hover:bg-[#F7EFE0]/75" />
                  <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 -rotate-45 rounded-full bg-[#F7EFE0] transition-colors duration-300 group-hover:bg-[#F7EFE0]/75" />
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
                      style={{ backgroundColor: '#2A1A10' }}
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
                          boxShadow: isActive ? 'inset 10px 0 0 0 currentColor' : 'none',
                        }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="font-display italic leading-tight transition-transform duration-300 group-hover:translate-x-2 text-[clamp(1.9rem,5.4vw,3.4rem)]">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Visit panel */}
              <motion.aside
                className="flex flex-col justify-center gap-7 bg-[#2A1A10] px-7 py-9 sm:px-12 lg:basis-[38%] lg:px-12"
                initial={{ opacity: 0, y: 24 * D }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 * D, delay: 0.6 * D, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="/images/cocktails_bar.png"
                  alt="Cocktails at the Brewocrat skybar"
                  className="hidden aspect-[16/10] w-full rounded-md object-cover lg:block"
                />

                <ul className="space-y-4 text-[15px] text-[#F7EFE0]">
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F7EFE0] text-[#2A1A10]"><FaLocationDot /></span>
                    <span>2nd Floor, Element One, Sector 47, Gurgaon</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F7EFE0] text-[#2A1A10]"><FaClock /></span>
                    <span>Daily, 12:00 PM to 1:00 AM</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F7EFE0] text-[#2A1A10]"><FaPhone /></span>
                    <a href="tel:+917303203535" className="transition-colors hover:text-[#F7EFE0]/75">+91 73032 03535</a>
                  </li>
                </ul>

                <Link
                  to="/book-table"
                  onClick={closeMenu}
                  className="hidden w-full items-center justify-center rounded-full bg-[#F7EFE0] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#2A1A10] transition-colors duration-300 hover:bg-[#F7EFE0]/85 lg:flex"
                >
                  Reserve a table
                </Link>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
