"use client";

import React from "react";
import Image from "next/image";
import { confidenceData } from "app/data/services/confidenceData"; 

const defaultTitle = (
  <>
    Why We’re Confident About <br />
    <strong>Our Professional SEO</strong> Services
  </>
);

const defaultDescription = "Don’t just take our word for it. Discover why people consider us the cream of the crop in digital marketing. Our results speak louder than any claim we could make.";

// --- 2. Background Shape ---
const BgShape = () => (
  <div className="absolute top-0 right-0 z-0 pointer-events-none hidden lg:block">
    <svg width="467" height="465" viewBox="0 0 467 465" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M350.948 114.503L313.699 449.723C463.191 501.207 756.306 443.47 836.268 136.711C755.87 145.913 681.752 122.054 659.977 117.031C629.164 224.166 536.318 272.429 493.747 283.168C498.909 236.993 511.158 125.142 518.858 47.1328C511.484 -28.5333 450.459 -49.6852 420.868 -50.8028C382.344 -46.8989 280.842 -36.749 183.025 -27.3799C222.381 -129.493 283.933 -170.921 354.28 -198.539C333.843 -246.417 330.963 -330.369 332.077 -366.36C4.46016 -285.356 -23.8295 19.4809 16.7958 153.823L350.948 114.503Z" fill="#F4F5F7"/>
      <path d="M248.781 218.286L51.9747 241.712C91.8437 330.437 185.561 395.589 227.436 417.075L248.781 218.286Z" fill="#F4F5F7"/>
      <path d="M722.767 -255.434C620.254 -357.89 487.708 -380.441 434.249 -378.91C419.876 -321.854 434.261 -164.635 533.089 -65.8625C646.658 47.6424 790.62 48.6828 848.406 35.0149C849.24 -19.1116 825.281 -152.979 722.767 -255.434Z" fill="#F4F5F7"/>
    </svg>
  </div>
);

const ConfidenceSection = ({
  title = defaultTitle,
  description = defaultDescription,
  features = confidenceData
}) => {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
      
      <BgShape />
      
      <div className="container px-4 relative z-10">
        
        {/* --- Header (Dynamic) --- */}
        <div className="mb-16">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-normal leading-tight mb-6">
            {title}
          </h2>
          <p className="text-gray-600 text-lg lg:text-[18px] leading-relaxed max-w-5xl">
            {description}
          </p>
        </div>

        {/* --- Grid Layout (Dynamic Data) --- */}
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((item, index) => (
            <div 
              key={item.id || index}
              className={`
                w-full md:w-[calc(50%-16px)]
                ${index >= 3 ? "lg:w-[calc(50%-16px)]" : "lg:w-[calc(33.333%-22px)]"}
                `}
            >
              <div 
                className="group h-full bg-[#feefeb33] border border-[#ff8b6d] rounded-[10px] p-8 text-center transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#ff8b6d]"
              >
                {/* Icon Wrapper */}
                <div className="w-[100px] h-[100px] mx-auto mb-6 rounded-full bg-white flex items-center justify-center transition-all duration-300
                  border-4 border-[#ff643b30] outline-[3px] outline-white outline-offset-2
                  group-hover:border-[#F35D36] group-hover:outline-[#fda68f]"
                >
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    className="object-contain w-[60px] h-[60px]"
                  />
                </div>

                {/* Content */}
                <h3 className="text-[#15151e] text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
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

export default ConfidenceSection;