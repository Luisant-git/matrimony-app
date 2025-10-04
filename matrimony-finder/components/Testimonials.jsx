import React from 'react';
import deepaImage from '../assets/deepa.png';
import priyaImage from '../assets/priya.png';
import karthikImage from '../assets/karthik.png';

const testimonials = [
  {
    quote: "Matches felt truly relevant. The verification gave my family confidence, and the communication tools made everything smooth. We're engaged now!",
    name: "Deepa",
    avatar: deepaImage
  },
  {
    quote: "A wonderful platform that helped me find my soulmate. The profiles are genuine, and the interface is so easy to use. Highly recommended for anyone serious about marriage.",
    name: "Priya",
    avatar: priyaImage
  },
  {
    quote: "I was skeptical about online matrimony, but this site changed my perspective. The search filters are powerful, and I connected with someone who shares my values. Thank you!",
    name: "karthik",
    avatar: karthikImage
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
      <p className="text-gray-600 leading-relaxed">"{testimonial.quote}"</p>
      <div className="flex items-center mt-6">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="text-primary">People</span> say
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;