import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import BackgroundImage from '../assets/bg.png'

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                            Discover <span className="text-primary">25K+</span> Profiles Waiting to Connect
                        </h1>
                        <p className="mt-4 text-base sm:text-lg">Find Your Perfect Match Today</p>
                        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0">
                            Explore thousands of genuine profiles and connect with like-minded individuals.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="w-full max-w-md">
                            <RegistrationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;