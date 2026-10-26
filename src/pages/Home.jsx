import React, { useEffect } from 'react';
import HeroVideoHeader from '../components/HeroVideoHeader';
import HomeVenueImage from '../components/HomeVenueImage';
import CraftBeersShowcaseOneByOne from '../components/CraftBeersShowcaseOneByOne';
import ExperienceSlatsShowcase from '../components/ExperienceSlatsShowcase';
import HomeUniverse from '../components/HomeUniverse';
import FoodPlatesSeriesShowcase from '../components/FoodPlatesSeriesShowcase';
import EditorialReservation from '../components/EditorialReservation';
import EditorialTestimonials from '../components/EditorialTestimonials';

export default function Home({ onOpenBookModal }) {
  useEffect(() => {
    document.title = "Brewocrat — Brewery · Skybar · Kitchen | Element One, Gurugram";
  }, []);

  return (
    <div className="home-page-editorial w-full brew-wall text-[#E6D3B3] overflow-hidden selection:bg-[#D9A441] selection:text-[#2A1A10]">
      
      {/* 1. Full-screen Cinematic Video Header with Just BREWOCRAT */}
      <HeroVideoHeader onOpenBookModal={onOpenBookModal} />

      {/* 2. Venue image */}
      <HomeVenueImage />

      {/* 3. The Signature Pours (Dark Background with Craft Beers Coming One by One Every 2s) */}
      <CraftBeersShowcaseOneByOne onOpenBookModal={onOpenBookModal} />

      {/* 4. Signature Food Plates In Motion (Gourmet Plates Moving One by One In Series) */}
      <FoodPlatesSeriesShowcase onOpenBookModal={onOpenBookModal} />

      {/* 5. Tailored Moments Slats (Family Gathering, Corporate Meeting, DJ Sets, Gatherings, Parties with Hover Booking Reveal) */}
      <ExperienceSlatsShowcase onOpenBookModal={onOpenBookModal} />

      {/* 6. One Address · Three Moods (The Experience: The Salon, The Courtyard, The Super Terrace) */}
      <HomeUniverse onOpenBookModal={onOpenBookModal} />

      {/* 7. Editorial Reservation & Direct Booking Action */}
      <EditorialReservation onOpenBookModal={onOpenBookModal} />

      {/* 8. Patron Voices & Google Reviews */}
      <EditorialTestimonials />

    </div>
  );
}
