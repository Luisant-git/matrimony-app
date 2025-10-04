import React from 'react';
import Hero from './Hero';
import FeaturedProfiles from './FeaturedProfiles';
import SearchSection from './SearchSection';
import CtaSection from './CtaSection';
import Testimonials from './Testimonials';
import Faq from './Faq';

const HomePage = ({ onNavigateToProfile }) => {
  return (
    <>
      <Hero />
      <FeaturedProfiles onNavigateToProfile={onNavigateToProfile} />
      <SearchSection onNavigateToProfile={onNavigateToProfile} />
      <CtaSection />
      <Testimonials />
      <Faq />
    </>
  );
};

export default HomePage;