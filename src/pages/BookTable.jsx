import React, { useEffect } from 'react';
import { TextReveal } from '../components/AnimatedComponents';
import TableReservationForm from '../components/TableReservationForm';

export default function BookTable() {
  useEffect(() => {
    document.title = 'Reserve a Table | Brewocrat Gurugram';
  }, []);

  return (
    <main className="min-h-screen brew-wall text-[#E6D3B3]">
      <section className="inner-banner relative overflow-hidden">
        <div className="image-layer" style={{ backgroundImage: "linear-gradient(90deg, rgba(42,26,16,.65), rgba(42,26,16,.25)), url('/interior/bar.jpg')" }} />
        <div className="auto-container">
          <TextReveal className="inner">
            <h1>Reserve a Table</h1>
            <div className="sub_text">
              <p>Good food, good company, <span className="primary-color">your kind of evening.</span></p>
            </div>
          </TextReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <TableReservationForm />
      </section>
    </main>
  );
}
