import React from 'react';
import breadcrumbImage from '../assets/breadcrumb.png';
import aboutUsImage from '../assets/about-us.png';

const PageHero = ({ title, breadcrumb }) => (
    <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: `url(${breadcrumbImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="text-gray-300 mt-1">{breadcrumb}</p>
        </div>
    </section>
);

const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-9.984z" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L15 12l-1.293-1.293a1 1 0 010-1.414L16 7m-5 10l2.293 2.293a1 1 0 010 1.414L15 22l-1.293-1.293a1 1 0 010-1.414L16 17m-5-5l2.293 2.293a1 1 0 010 1.414L15 17l-1.293-1.293a1 1 0 010-1.414L16 12m-5-5l2.293 2.293a1 1 0 010 1.414L15 12l-1.293-1.293a1 1 0 010-1.414L16 7" /></svg>;

const AboutUsPage = () => {
    const values = [
        { icon: <HeartIcon />, title: 'Genuine Connections', description: 'We believe in fostering authentic relationships built on trust and compatibility.' },
        { icon: <ShieldCheckIcon />, title: 'Safety & Privacy', description: 'Your security is our top priority. We employ advanced measures to protect your data.' },
        { icon: <SparklesIcon />, title: 'Success Stories', description: 'Our greatest achievement is the countless happy couples who found their soulmate on our platform.' },
    ];

    return (
        <div className="bg-white">
            <PageHero title="About Us" breadcrumb="Home / About" />
            
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission: Bringing Hearts Together</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded on the principle of creating lasting relationships, Matrimony is more than just a matchmaking service. We are a dedicated team of professionals committed to helping you find not just a partner, but a soulmate. Our platform combines traditional values with modern technology to provide a safe, secure, and successful matchmaking experience.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We understand the importance of this life-changing decision and strive to make the journey of finding your perfect match a beautiful and memorable one. With thousands of verified profiles, advanced search filters, and personalized support, we are here to guide you every step of the way.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img 
                                src={aboutUsImage} 
                                alt="Happy couple" 
                                width="400"
                                height="400"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Core Values</h2>
                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto">We are guided by principles that ensure a trustworthy and effective service for everyone seeking their life partner.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                                <div className="flex justify-center mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;