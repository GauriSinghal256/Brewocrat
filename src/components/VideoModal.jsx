import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';

export default function VideoModal({ isOpen, videoUrl, onClose }) {
  if (!isOpen) return null;

  // Convert standard youtube or youtu.be link to embed link
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl brew-card rounded-2xl overflow-hidden shadow-2xl z-10 aspect-video border border-gold-500/30"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-white hover:text-gold-400 bg-[#2A1A10]/50 p-2 rounded-full backdrop-blur-sm transition-colors"
            aria-label="Close video"
          >
            <FaXmark className="text-xl" />
          </button>

          <iframe
            src={embedUrl}
            title="Restaurant Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
