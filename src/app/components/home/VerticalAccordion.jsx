"use client";

import { faqData } from "app/data/faqData";
import { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const VerticalAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleClick = (id) => {
    setActiveIndex((currentId) => (currentId === id ? currentId : id));
  };

  return (
    <div className="px-5">
       <div className="container py-16 md:py-20">
      {/* --- Header --- */}
      <h2 className="text-4xl md:text-6xl font-bold text-[#15151e]">
        People Find Us The Best!
        <br />
        <strong className="font-extrabold">See Why?</strong>
      </h2>
      <div className="mt-4 max-w-2xl">
        <p className="app-paragraph">
          Don’t just take our word for it. Discover why people consider us the
          cream of the crop in digital marketing. Our results speak louder than
          any claim we could make.
        </p>
      </div>

      <div className="hidden lg:flex mt-10 h-[650px] gap-4">
        {faqData.map((item) => {
          const isActive = item.id === activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                relative flex transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
                ${item.bgColor} 
                ${isActive ? "flex-2 max-w-[80%]" : "flex-1 max-w-[10%]"}
              `}
            >
              {/* === ACTIVE CONTENT (Expanded Panel) === */}
              {isActive && (
                <div
                    className={`
                      flex flex-col justify-center items-start border-r border-[#949bae1a]
                      transition-all duration-700 ease-in-out
                      ${isActive ? "opacity-100 translate-x-0 max-w-[620px] px-16" : "opacity-0 translate-x-6 max-w-0 px-0"} 
                      overflow-hidden
                    `}
                  >
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      width={120}
                      height={120}
                      className="w-[120px] h-[120px] mb-6"
                    />

                    <h3 className={`text-3xl font-bold mb-4 ${item.textHeading}`}>
                      {item.title}
                    </h3>

                    <p className={`text-xl leading-relaxed ${item.textColor}`}>
                      {item.content}
                    </p>
                  </div>
              )}
              {/* --- 1. COMMON ELEMENTS CONTAINER --- */}
              <div
                className={`flex flex-col h-full 
                  ${
                    isActive
                      ? "absolute right-0 top-0 w-[20%]"
                      : "w-full justify-center items-center"
                  }
                `}
              >
                {/* --- 1a. ACTIVE STATE: Top Number Pin --- */}
                {isActive && (
                  <div
                    className={`absolute top-5 right-10 text-6xl font-extrabold z-10 ${
                      item.inactiveTextColor || item.textColor
                    }`}
                  >
                    {item.number}
                  </div>
                )}

                {/* --- 1b. COLLAPSED STATE: Centered and Rotated Number & Arrow --- */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center h-full py-5">
                    <div
                      className={`text-6xl font-extrabold ${
                        item.inactiveTextColor || item.textColor
                      }`}
                    >
                      {item.number}
                    </div>

                    {/* Arrow Button - Centered in Collapsed State */}
                    <div
                      className={`p-3 rounded-full bg-white bg-opacity-10 transition-colors duration-300 hover:bg-opacity-20 mt-4`}
                    >
                      <FaChevronRight
                        size={24}
                        className={`w-6 h-6 text-[#15151e]`}
                      />
                    </div>
                  </div>
                )}

                {/* --- 1c. ACTIVE STATE: Bottom Arrow Pin --- */}
                {isActive && (
                  <div
                    className={`absolute bottom-5 right-14 p-3 rounded-full bg-white bg-opacity-10 transition-colors duration-300 hover:bg-opacity-20 z-20`}
                  >
                    <FaChevronRight
                      size={24}
                      className={`w-6 h-6 text-[#15151e]`}
                    />
                  </div>
                )}
              </div>
              {/* END of INACTIVE/COMMON ELEMENTS */}
            </div>
          );
        })}
      </div>

      {/* --- MOBILE VIEW ACCORDION (Vertical FAQ) --- */}
    <div className="lg:hidden mt-10 space-y-4">
      {faqData.map((item) => {
        const isActive = item.id === activeIndex;

        return (
          <div
            key={item.id}
            className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${item.bgColor} ${item.textColor}`}
          >
            {/* Header/Title Bar */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl font-extrabold">{item.number}</span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>

              {/* Arrow icon */}
              <FaChevronDown
                size={20}
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Content Section (smooth animation) */}
            <div
              className={`
                grid transition-[grid-template-rows] duration-500 ease-in-out
                ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
              `}
            >
              <div
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${isActive ? "opacity-100 translate-y-0 p-4 pt-0" : "opacity-0 -translate-y-3 p-0"}
                `}
              >
                <div className="pt-4 border-t border-opacity-20 mt-4">
                  <Image
                    src={item.iconUrl}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 mb-4"
                  />
                  <p className="text-lg opacity-90">{item.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
    </div>
  );
};

export default VerticalAccordion;