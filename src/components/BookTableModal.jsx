import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaUser, FaCalendarDays, FaClock, FaPhone, FaCircleCheck, FaUtensils } from 'react-icons/fa6';

export default function BookTableModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Person',
    date: '',
    time: '07 : 00 pm',
    zone: 'Best available',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const reservation = {
      id: `RS-${Date.now().toString().slice(-6)}`,
      created: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      guests: Number.parseInt(formData.guests, 10),
      date: formData.date,
      time: formData.time,
      zone: formData.zone,
      event: '',
      notes: formData.message
    };
    try {
      const saved = await api.post('/reservations', reservation);
      setReservationId(saved.code);
      setSubmitted(true);
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      guests: '2 Person',
      date: '',
      time: '07 : 00 pm',
      zone: 'Best available',
      message: ''
    });
    setReservationId('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto p-2 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Book a table">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A1A10]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            
            className="relative z-10 my-2 min-w-0 max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border-2 border-[#D9A441] bg-[#2E1B0F] p-4 shadow-2xl outline outline-1 outline-[#A4452A] -outline-offset-4 sm:my-0 sm:max-h-[calc(100dvh-2rem)] sm:p-6 md:p-8"
          >
            {/* Top decorative glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-2 top-2 z-10 p-2 text-gray-400 transition-colors hover:text-gold-400 sm:right-5 sm:top-5"
              aria-label="Close modal"
            >
              <FaXmark className="text-xl" />
            </button>

            {!submitted ? (
              <div>
                <div className="mb-4 pr-8 text-center sm:mb-6 sm:pr-0">
                  <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold">
                    Online Reservation
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
                    Book A Table
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                    For direct assistance call <a href="tel:+917303203535" className="text-gold-400 hover:underline">+91 73032 03535</a>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="min-w-0 space-y-3 sm:space-y-4">
                  <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-w-0 rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+91 73032 03535"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full min-w-0 rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 pr-10 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-gold-500"
                        />
                        <FaPhone className="absolute right-3.5 top-3 text-xs text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Guests</label>
                      <div className="relative">
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 pr-10 text-sm text-white outline-none transition-all focus:border-gold-500"
                        >
                          <option value="1 Person">1 Person</option>
                          <option value="2 Person">2 Person</option>
                          <option value="3 Person">3 Person</option>
                          <option value="4 Person">4 Person</option>
                          <option value="5 Person">5 Person</option>
                          <option value="6+ Person">6+ Person</option>
                        </select>
                        <FaUser className="absolute right-3.5 top-3 text-xs text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Preferred Zone</label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                        className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 text-sm text-white outline-none transition-all focus:border-gold-500"
                      >
                        <option>Best available</option>
                        <option>Indoor Salon</option>
                        <option>Courtyard</option>
                        <option>Skybar Terrace</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full min-w-0 rounded-lg border border-[#5B3A22] bg-[#1F120B] px-3 py-3 text-sm text-white outline-none transition-all focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Time</label>
                      <div className="relative">
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 pr-10 text-sm text-white outline-none transition-all focus:border-gold-500"
                        >
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:30 PM">01:30 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                          <option value="08:30 PM">08:30 PM</option>
                          <option value="10:00 PM">10:00 PM</option>
                          <option value="11:30 PM">11:30 PM</option>
                          <option value="12:00 AM">12:00 AM</option>
                        </select>
                        <FaClock className="absolute right-3.5 top-3 text-xs text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Special Request / Message</label>
                    <textarea
                      rows="3"
                      placeholder="Any dietary preferences or seating requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-w-0 resize-none rounded-lg border border-[#5B3A22] bg-[#1F120B] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-gold-500"
                    ></textarea>
                  </div>

                  {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
                  <button
                    type="submit"
                    className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-gradient px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#2A1A10] shadow-lg shadow-gold-500/20 transition-all hover:opacity-95 active:scale-[0.99] sm:px-6 sm:tracking-[0.2em]"
                  >
                    <FaUtensils /> Confirm Reservation
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <FaCircleCheck className="text-5xl text-gold-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-serif text-white font-bold">
                  Reservation Received!
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Thank you <span className="text-gold-400 font-semibold">{formData.name}</span>. Your reservation request for <span className="text-gold-400 font-semibold">{formData.guests}</span> on <span className="text-gold-400 font-semibold">{formData.date || 'your requested date'}</span> at <span className="text-gold-400 font-semibold">{formData.time}</span> has been confirmed.
                </p>
                <p className="text-xs text-gray-400">Reference: <span className="text-gold-400">{reservationId}</span></p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-gold-gradient text-[#2A1A10] font-semibold uppercase text-xs tracking-wider rounded-lg transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
