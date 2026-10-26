import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BookTableModal from './components/BookTableModal';
import ScrollToTop from './components/ScrollToTop';
import { LenisSmoothScroll, scrollToTarget } from './components/AnimatedComponents';
import GlobalFX from './components/GlobalFX';
import { motion } from 'framer-motion';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Brewhouse from './pages/Brewhouse';
import Events from './pages/Events';
import PartiesAndCorporate from './pages/PartiesAndCorporate';
import Visit from './pages/Visit';
import About from './pages/About';
import Chefs from './pages/Chefs';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import BookTable from './pages/BookTable';
import HomeNew from './pages/HomeNew';
import MenuNew from './pages/MenuNew';

// Scroll to top on route change
function ScrollToTopOnNavigation() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [pathname]);

  return null;
}

// Soft fade on every route change
function PageFade({ children }) {
  const { pathname } = useLocation();
  return (
    <motion.div key={pathname} className="page-fade"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  return (
    <LenisSmoothScroll>
      <Router>
        <ScrollToTopOnNavigation />
        <div className="page-wrapper">
          {/* Animated Preloader */}
          <Preloader />
          <GlobalFX />

          {/* Global Navigation Header */}
          <Navbar onOpenBookModal={() => setIsBookModalOpen(true)} />

          {/* Route Views */}
          <main className="main-content">
            <PageFade>
            <Routes>
              {/* Core System Pages */}
              <Route path="/" element={<Home onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/brewhouse" element={<Brewhouse onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/menu" element={<Menu onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/events" element={<Events onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/parties" element={<PartiesAndCorporate onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/corporate" element={<PartiesAndCorporate onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/visit" element={<Visit onOpenBookModal={() => setIsBookModalOpen(true)} />} />

              {/* Supporting Pages */}
              <Route path="/about" element={<About onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/chefs" element={<Chefs onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Visit onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/book-table" element={<BookTable />} />

              <Route path="/home-new" element={<HomeNew onOpenBookModal={() => setIsBookModalOpen(true)} />} />
              <Route path="/menu-new" element={<MenuNew />} />
              {/* Fallback route */}
              <Route path="*" element={<Home onOpenBookModal={() => setIsBookModalOpen(true)} />} />
            </Routes>
            </PageFade>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Table Booking Modal */}
          <BookTableModal
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
          />

          {/* Scroll To Top floating button */}
          <ScrollToTop />
        </div>
      </Router>
    </LenisSmoothScroll>
  );
}
