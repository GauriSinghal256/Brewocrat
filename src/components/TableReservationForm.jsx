import React, { useState } from 'react';
import api from '../lib/api';
import { useSearchParams } from 'react-router-dom';
import { FaCalendarDays, FaCheck, FaClock, FaUsers } from 'react-icons/fa6';

function localDateString(date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export default function TableReservationForm() {
  const [searchParams] = useSearchParams();
  const linkedEvent = searchParams.get('event') || '';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    zone: 'Best available',
    event: linkedEvent,
    notes: ''
  });
  const [reservationId, setReservationId] = useState('');
  const [error, setError] = useState('');

  const updateField = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const reservation = {
      id: `RS-${Date.now().toString().slice(-6)}`,
      created: new Date().toISOString(),
      ...formData,
      guests: Number(formData.guests)
    };

    try {
      const saved = await api.post('/reservations', reservation);
      setReservationId(saved.code);
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  if (reservationId) {
    return (
      <div className="rounded-3xl border border-[#D9A441]/35 brew-card p-8 text-center sm:p-12">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 text-[#EBCB86]">
          <FaCheck />
        </span>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D9A441]">Reservation request saved</p>
        <h2 className="mt-2 font-serif text-3xl text-[#F7EFE0]">We’ll save you a seat.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#E6D3B3]/75">
          Reference <strong className="text-[#EBCB86]">{reservationId}</strong>. Our team will confirm your table by phone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-[#D9A441]/25 lg:min-h-full">
        <img src="/interior/interior_seating.jpg" alt="Warmly lit Brewocrat dining room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10] via-[#2A1A10]/35 to-[#2A1A10]/10" />
        <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#EBCB86]">Your evening, your table</span>
          <h2 className="mt-3 max-w-sm font-serif text-4xl leading-tight text-white sm:text-5xl">Make room for a good night.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">A courtyard toast, a rooftop sunset, or a long dinner with your favourite people.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#D9A441]/25 brew-card p-6 sm:p-9">
        <div className="mb-7">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#D9A441]">Online reservation</span>
          <h2 className="mt-2 font-serif text-3xl text-[#F7EFE0] sm:text-4xl">Book your table</h2>
          <p className="mt-2 text-sm text-[#E6D3B3]/65">For a special request, call <a className="text-[#EBCB86] underline-offset-4 hover:underline" href="tel:+917303203535">+91 73032 03535</a>.</p>
        </div>

        {linkedEvent && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#D9A441]/35 bg-[#D9A441]/[0.07] p-4">
            <FaCalendarDays className="mt-0.5 shrink-0 text-[#D9A441]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D9A441]">Event reservation</p>
              <p className="mt-1 text-sm text-[#F7EFE0]">{linkedEvent}</p>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Your name
            <input name="name" value={formData.name} onChange={updateField} required autoComplete="name" className="mt-2 w-full rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm normal-case tracking-normal text-[#F7EFE0] outline-none focus:border-[#D9A441]" placeholder="Full name" />
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Phone number
            <input name="phone" value={formData.phone} onChange={updateField} required type="tel" autoComplete="tel" className="mt-2 w-full rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm normal-case tracking-normal text-[#F7EFE0] outline-none focus:border-[#D9A441]" placeholder="+91" />
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Date
            <span className="relative mt-2 block">
              <FaCalendarDays className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D9A441]" />
              <input name="date" value={formData.date} onChange={updateField} required type="date" min={localDateString(new Date())} className="w-full rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441] [color-scheme:dark]" />
            </span>
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Time
            <span className="relative mt-2 block">
              <FaClock className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D9A441]" />
              <input name="time" value={formData.time} onChange={updateField} required type="time" className="w-full rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441] [color-scheme:dark]" />
            </span>
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Guests
            <span className="relative mt-2 block">
              <FaUsers className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D9A441]" />
              <select name="guests" value={formData.guests} onChange={updateField} className="w-full appearance-none rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((count) => <option key={count} value={count}>{count === 12 ? '12+' : count} guests</option>)}
              </select>
            </span>
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80">
            Preferred zone
            <select name="zone" value={formData.zone} onChange={updateField} className="mt-2 w-full rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm text-[#F7EFE0] outline-none focus:border-[#D9A441]">
              <option>Best available</option>
              <option>Indoor Salon</option>
              <option>Courtyard</option>
              <option>Skybar Terrace</option>
            </select>
          </label>
          <label className="text-xs uppercase tracking-wider text-[#E6D3B3]/80 sm:col-span-2">
            Special notes
            <textarea name="notes" value={formData.notes} onChange={updateField} rows="3" className="mt-2 w-full resize-y rounded-xl border border-[#D9A441]/25 brew-card px-4 py-3 text-sm normal-case tracking-normal text-[#F7EFE0] outline-none focus:border-[#D9A441]" placeholder="Celebration, dietary needs, seating requests…" />
          </label>
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-full bg-gradient-to-r from-[#D9A441] to-[#B07A2E] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1A10] transition hover:brightness-110">
          Request a reservation
        </button>
      </div>
    </form>
  );
}
