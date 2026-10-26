import React from 'react';

export default function HomeVenueImage() {
  return (
    <section className="m-0 w-full overflow-hidden bg-gradient-to-b from-[#000000] via-[#100806] to-[#000000] px-0 pb-0 pt-4 leading-none" aria-label="Brewocrat venue">
      <div className="relative h-[70vh] min-h-[520px] w-full lg:h-[88vh]">
        <img
          src="/home_1.jpg"
          alt="The Brewocrat dining room and live music stage"
          className="block h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A1A10]/55 via-transparent to-[#2A1A10]/85" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000000]/75 via-[#100806]/35 to-transparent" />

        <div className="absolute inset-x-0 top-12 px-6 text-center sm:top-16">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.24em] text-[#F7EFE0] drop-shadow-[0_2px_8px_rgba(42,26,16,0.9)] sm:text-2xl md:text-3xl">
            Brewery. Skybar. Kitchen.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0705]/90 via-[#170C08]/55 to-transparent px-6 pb-10 pt-24 text-center font-serif text-base italic leading-[0.35] tracking-normal text-[#F7EFE0] drop-shadow-[0_2px_8px_rgba(42,26,16,0.95)] sm:leading-[0.82] sm:pb-14 sm:text-lg md:text-xl">
          <p className="mx-auto max-w-4xl">
            Brewocrat is Gurugram&rsquo;s rooftop brewery, skybar and kitchen, serving fresh beer brewed on-site with no preservatives. Come for the taps, stay for the live music, the open skyline and good company.
          </p>
        </div>
      </div>
    </section>
  );
}
