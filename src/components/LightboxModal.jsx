import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function LightboxModal({ isOpen, images, currentIndex, onClose, onPrev, onNext }) {
  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2A1A10]/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-5xl max-h-[90vh] z-10 flex flex-col items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gold-400 p-2 text-2xl transition-colors"
            aria-label="Close image lightbox"
          >
            <FaXmark />
          </button>

          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-dark-900">
            <img
              src={images[currentIndex]?.src || images[currentIndex]}
              alt={images[currentIndex]?.alt || "Gallery preview"}
              className="max-h-[80vh] w-auto object-contain"
            />
            {images[currentIndex]?.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-[#2A1A10]/70 backdrop-blur-sm p-4 text-center text-sm text-gold-300 font-serif">
                {images[currentIndex].caption}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-800/80 border border-gold-500/30 hover:border-gold-500 text-gold-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-800/80 border border-gold-500/30 hover:border-gold-500 text-gold-400 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Next image"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
