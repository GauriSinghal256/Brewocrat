import React, { useEffect } from 'react';
import HeroVideoHeader from '../components/HeroVideoHeader';
import HomeVenueImage from '../components/HomeVenueImage';
import HomeUniverse from '../components/HomeUniverse';
import CraftBeersShowcaseOneByOne from '../components/CraftBeersShowcaseOneByOne';
import FoodPlatesSeriesShowcase from '../components/FoodPlatesSeriesShowcase';
import HomeCalendar from '../components/HomeCalendar';
import ExperienceSlatsShowcase from '../components/ExperienceSlatsShowcase';
import EditorialReservation from '../components/EditorialReservation';
import EditorialTestimonials from '../components/EditorialTestimonials';

export default function Home({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Brewocrat — Brewery · Skybar · Kitchen | Element One, Gurugram";
  }, []);

  return (
    <div className="home-page-editorial w-full bg-[#0D0805] text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10] mediterranean-pattern">
      
      {/* 01. A Cinematic Welcome (Brewocrat Crest, Video Visual, Script Accent, Reserve & Explore) */}
      <HeroVideoHeader onOpenBookModal={onOpenBookModal} />

      {/* 01b. Venue Ambience Spotlight */}
      <HomeVenueImage />

      {/* 02. Choose Your Experience (Indoor • Courtyard • Terrace • Microbrewery Slats) */}
      <HomeUniverse onOpenBookModal={onOpenBookModal} />

      {/* 03a. On Tap (The Signature Pours - Craft Beers Coming One by One with SVG Pour Animation) */}
      <CraftBeersShowcaseOneByOne onOpenBookModal={onOpenBookModal} />

      {/* 03b. On The Table (Signature Food Plates In Motion - Moving Series Animation) */}
      <FoodPlatesSeriesShowcase onOpenBookModal={onOpenBookModal} />

      {/* 04. The Brewocrat Calendar (Upcoming Live Bands, DJ Nights & Weekly Lineup) */}
      <HomeCalendar onOpenBookModal={onOpenBookModal} />

      {/* 05. Celebrate Together (Tailored Moments Slats: Corporate, DJ Sets, Gatherings, Parties, Family) */}
      <ExperienceSlatsShowcase onOpenBookModal={onOpenBookModal} />

      {/* 07. Come On In (Location, Directions, Hours & Direct Table Booking) */}
      <EditorialReservation onOpenBookModal={onOpenBookModal} />

      {/* 08. Patron Voices & Google Reviews */}
      <EditorialTestimonials />

    </div>
  );
}
