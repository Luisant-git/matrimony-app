import React, { useState } from 'react';

const faqData = [
  {
    question: "Who is this platform for?",
    answer:
      "We’re built for serious marriage seekers and families. Profiles are reviewed and must follow our community guidelines—no casual dating or spam."
  },
  {
    question: "Are my photos and details private?",
    answer:
      "Yes. You control who sees your photos—public, only to matches, or on request. We also support watermarks and face blur on request."
  },
  {
    question: "Can parents or guardians manage a profile?",
    answer:
      "Absolutely. You can create a profile for your son/daughter and manage it jointly. Family contact details can be added with privacy controls."
  },
  // {
  //   question: "What’s free and what’s premium?",
  //   answer:
  //     "Creating a profile, browsing matches, and shortlisting are free. Premium unlocks direct chat/calls, read receipts, profile boosts, and priority support."
  // },
  {
    question: "How do I contact someone I like?",
    answer:
      "Send an Interest or a Chat Request. If they accept, you can message securely. Phone numbers are shared only when both sides choose to reveal them."
  },
  {
    question: "Do you support horoscope matching?",
    answer:
      "Yes. You can upload kundali/jathagam details or enter birth data for automatic compatibility checks. Enabling this filter is optional."
  },
  {
    question: "Is there customer support?",
    answer:
      "Yes. Chat and email support are available 7 days a week. Premium members get priority response and a callback option in select cities."
  }
];


const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
);

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={`border rounded-lg transition-all duration-300 ${isOpen ? 'border-primary' : 'border-gray-200'}`}>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <h4 className={`font-semibold text-lg ${isOpen ? 'text-primary' : 'text-secondary'}`}>{item.question}</h4>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'text-primary' : 'text-gray-500'}`}>
          {isOpen ? <MinusIcon/> : <PlusIcon/>}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-6 pt-0 text-gray-600">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Frequently asked <span className="text-primary">questions</span></h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            {faqData.slice(0, Math.ceil(faqData.length / 2)).map((item, index) => (
                                <FaqItem
                                    key={index}
                                    item={item}
                                    isOpen={openIndex === index}
                                    onClick={() => handleClick(index)}
                                />
                            ))}
                        </div>
                         <div className="flex flex-col gap-6">
                            {faqData.slice(Math.ceil(faqData.length / 2)).map((item, index) => {
                                const actualIndex = index + Math.ceil(faqData.length / 2);
                                return (
                                    <FaqItem
                                        key={actualIndex}
                                        item={item}
                                        isOpen={openIndex === actualIndex}
                                        onClick={() => handleClick(actualIndex)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;