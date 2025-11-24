"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const defaultFaqItems = [
  {
    question: "What services does your digital marketing agency offer?",
    answer:
      "Euismod nibh sed hendrerit eleifend. Mauris tellus nisl, porta sit amet maximus ac, consequat sed arcu. Curabitur quis diam rutrum, ultricies nibh quis, imperdiet elit. Ut malesuada aliquet velit, vel pellentesque turpis imperdiet in.",
  },
  {
    question: "How can digital marketing benefit my business?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What makes your agency unique in digital marketing?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How do you tailor digital strategies for my business?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What results can I anticipate from your campaigns?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const defaultTitle = "FAQ";
const defaultDescription = "Morbi commodo quam vitae tellus convallis, et sagittis magna mattis. Aliquam ipsum nisi, fermentum sed placerat at, lacinia et orci. Sed varius orci eu risus faucibus dapibus.";

// --- 2. Single Accordion Item Component ---
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={`border-b border-gray-200 last:border-0`}>
      <button
        className={`w-full flex items-center gap-4 py-6 px-6 text-left transition-all duration-300 hover:bg-[#FEF0EC] 
        ${isOpen ? "bg-[#FEF0EC]" : "bg-white"}`}
        onClick={onClick}
      >
        {/* Icon Wrapper */}
        <span className="shrink-0 text-[#15151e] text-xl">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>

        {/* Question Text */}
        <span className="text-[#15151e] font-medium text-xl">
          {item.question}
        </span>
      </button>

      {/* Answer Content (Animated Height) */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={`overflow-hidden ${isOpen ? "bg-[#FEF0EC]" : "bg-white"}`}>
          <div className="px-6 pb-6 pt-0 text-gray-600 text-lg leading-relaxed">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = ({ 
  title = defaultTitle, 
  description = defaultDescription, 
  items = defaultFaqItems 
}) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full">
      {/* --- Part 1: Dark Header Background --- */}
     <div className="relative z-10 bg-[#192138] pt-24 pb-48 px-4">
        <div className="container mx-auto max-w-4xl text-center lg:text-left">
          <h2 className="text-white text-5xl lg:text-[88px] font-bold mb-6">
            {title}
          </h2>
          <p className="text-[#eaebef] text-lg lg:text-xl leading-relaxed max-w-[800px] mx-auto lg:mx-0">
            {description}
          </p>
        </div>
      </div>

      {/* --- Part 2: The Accordion List  --- */}
      <div className="px-4 bg-white pb-24">
        <div className="container mx-auto max-w-5xl -mt-32 relative z-10 shadow-xl rounded-lg overflow-hidden bg-white">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;