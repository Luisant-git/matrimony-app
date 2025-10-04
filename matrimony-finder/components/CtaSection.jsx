import React from 'react';
import ctaImage from '../assets/cta.png';

const CtaSection = () => {
  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl font-bold leading-tight">
              Find your perfect match—made for you
            </h2>
            <p className="mt-6 text-gray-100 max-w-lg">
              Join lakhs of verified profiles from your community. Private, safe, and guided by smart matching to help you meet the right person faster.
            </p>
            <button className="mt-10 bg-white text-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors shadow-lg">
              <a href="#">Start Now</a>
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src={ctaImage}
              alt="Happy Couple"
              className="max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;