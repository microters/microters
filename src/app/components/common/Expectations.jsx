"use client";

import { expectationsData } from "app/data/services/expectationsData";
import React from "react";
import { FaCheck } from "react-icons/fa6";
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 64 61"
    fill="none"
    className="w-10 h-10 text-[#FD451C] animate-spin-slow"
  >
    <path
      d="M31.6667 48.355L51.2367 60.1667L46.0433 37.905L63.3333 22.9267L40.565 20.995L31.6667 0L22.7683 20.995L0 22.9267L17.29 37.905L12.0967 60.1667L31.6667 48.355Z"
      fill="currentColor"
    />
  </svg>
);

const ExpectationsSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-5 max-w-4xl">
          <h2 className="text-[#0c0c1d] text-4xl md:text-5xl lg:text-[72px] font-normal mb-6 leading-tight">
            What To Expect With Our <br className="hidden lg:block" />
            <strong>eCommerce SEO Services?</strong>
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-4xl">
            Ready to kick start your new online venture? Before we get started,
            let's set some realistic expectations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pt-12">
          
          {/* Dashed Line */}
          <div className="absolute top-12 left-0 w-full border-t-2 border-dashed border-[#D4D7DF] z-0 hidden lg:block"></div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {expectationsData.map((item, index) => (
              <div
                key={item.id}
                className="group relative p-6 pt-12 transition-all duration-300 bg-white
                  border border-[#d4d7df]
                  hover:-translate-y-10 hover:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.1)] 
                  hover:border-[#FCCFC3]! hover:z-20"
              >
                
                {/* --- TIMELINE NODE --- */}
                <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 z-10 hidden lg:flex items-center justify-center w-[60px] h-[60px]">
                  
                  {/* Default: Orange Dot */}
                  <div className="w-5 h-5 bg-[#F35D36] rounded-full outline outline-[#FDDFD7] outline-offset-4 transition-all duration-300 group-hover:opacity-0 group-hover:scale-0"></div>

                </div>

                {/* --- HOVER STAR (Attached to Card) --- */}
                <div className="bg-white absolute -top-[30px] left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center justify-center w-[60px] h-[60px] opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                   <div className="p-1.5 rounded-full outline-1 outline-[#FDDFD7] outline-offset-4">
                      <div className="animate-spin-slow group-hover:rotate-142 transition-transform duration-500">
                        <StarIcon />
                      </div>
                   </div>
                </div>

                {/* Content */}
                <h4 className="text-[#15151e] text-2xl md:text-[32px] font-extrabold mb-4 text-center lg:text-left">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-[16px] mb-6 leading-relaxed text-center lg:text-left">
                  {item.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {item.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#15151e]"
                    >
                      <span className="mt-1 text-[#f35d36] shrink-0">
                        <FaCheck />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectationsSection;
