"use client";

import React from "react";
import Image from "next/image";

const WhyChooseSection = ({ title, description, features }) => {
  return (
    <section className="relative w-full py-16 md:py-28 overflow-hidden bg-white">
      {/* --- 1. THE BACKGROUND SHAPE --- */}
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-normal leading-tight mb-6">
            {title}
          </h2>
          <div className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            {description}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-10">
          {features.map((item, index) => (
            <div key={index} className="relative mt-12">
              <div 
                className="absolute right-[-50%] -top-[110px] w-[850px] h-[800px] rounded-[50%] -z-10 pointer-events-none hidden lg:block"
                style={{ backgroundColor: "#FEF7F5" }}
              />
              {/* --- 3. THE CARD CONTENT --- */}
              <div 
                className="group relative bg-white p-8 pt-16 shadow-[0_0_30px_rgba(0,0,0,0.05)] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-lg text-left border border-transparent h-full flex flex-col"
              >
                
                {/* Floating Icon Box */}
                <div className="absolute -top-[50px] left-8 w-[100px] h-[100px] bg-white rounded-[5px] shadow-[0_0_5px_#efefef] flex items-center justify-center transition-transform duration-300 icon-swing origin-top">
                  
                  <div className="w-[60px] h-[60px] relative">
                    <Image 
                      src={item.icon} 
                      alt={item.title} 
                      width={60} 
                      height={60} 
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[#15151e] text-2xl font-bold mb-4 mt-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;