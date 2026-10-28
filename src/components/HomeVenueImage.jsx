import React from 'react';

export default function HomeVenueImage() {
  return (
    <section className="m-0 w-full overflow-hidden bg-[#0A0503] px-0 pb-0 pt-0 leading-none" aria-label="Brewocrat venue">
      <div className="relative h-[70vh] min-h-[520px] w-full lg:h-[88vh]">
        <img
          src="/home_1.jpg"
          alt="The Brewocrat venue ambience"
          className="block h-full w-full object-cover"
        />
        {/* Dark Mediterranean Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0805] via-transparent to-[#0D0805]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(13,8,5,0.7)_100%)]" />

        <div className="absolute inset-x-0 bottom-8 sm:bottom-14 px-6 text-center z-10">
          <p className="font-display text-sm sm:text-xl md:text-2xl font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#F7EFE0] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
            Brewery · Skybar · Kitchen
          </p>
          <div className="font-alex text-2xl sm:text-4xl md:text-5xl text-[#D9A441] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] mt-1 select-none">
            Gurugram's Premier Rooftop Microbrewery
          </div>
        </div>
      </div>
    </section>
  );
}
