import React from 'react';
import breadcrumbImage from '../assets/breadcrumb.png';

const PageHero = ({ title, breadcrumb }) => (
    <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: `url(${breadcrumbImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="text-gray-300 mt-1">{breadcrumb}</p>
        </div>
    </section>
);

const LocationPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

const ContactPage = () => {
    const contactInfo = [
        { icon: <LocationPinIcon />, title: 'Our Location', details: '10221 Salem, Tamil Nadu, India' },
        { icon: <PhoneIcon />, title: 'Call Us', details: '(+99) 012345678' },
        { icon: <MailIcon />, title: 'Email Us', details: 'matrimony@gmail.com' },
    ];
    return (
        <div className="bg-white">
            <PageHero title="Contact Us" breadcrumb="Home / Contact" />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600">{item.details}</p>
                                    </div>
                                </div>
                            ))}
                             {/* <div className="pt-4">
                                <img src="https://i.imgur.com/2s0sJbM.png" alt="Map" className="rounded-lg shadow-md w-full" />
                            </div> */}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl shadow-lg">
                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                             <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="your.email@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" id="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="How can we help?" />
                                </div>
                                <div>
                                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                     <textarea id="message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your message..."></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors shadow-lg">
                                        Send Message
                                    </button>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;