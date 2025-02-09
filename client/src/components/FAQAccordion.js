import React, { useState } from 'react';

// Accordion data array
const accordionData = [
  { question: 'What is Flavia Hut?', answer: ' Flavia Hut is a snack and food items company offering healthy, nutritious options.' },
  { question: 'What makes Flavia Hut unique?', answer: 'Our focus on using natural ingredients, innovative flavors, and commitment to quality.' },
  { question: 'Where can I buy Flavia Hut products?', answer: 'Online through our website, select retail stores, and through our authorized distributors.' }
];

// Accordion component with Tailwind CSS
export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div>
          <hr />
        </div>
      </div>

      {accordionData?.map((item, index) => (
        <div
          key={index}
          className={`rounded-md shadow-lg mb-4 border-2 transition-all duration-300 ${
            activeIndex === index ? 'border-[#AA0000]' : 'border-transparent'
          }`}
        >
          <div
            className="flex items-center justify-between p-4 bg-white cursor-pointer h-[100px]"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="md:text-lg text-sm font-bold text-gray-700">{item.question}</h3>
            <span
              className={`transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
            >
              <div className="bg-red-700 text-white p-1 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                ▼ {/* Replace with an icon if needed */}
              </div>
            </span>
          </div>
          {activeIndex === index && (
            <div className="p-4 bg-white text-[#6F6C90]">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
