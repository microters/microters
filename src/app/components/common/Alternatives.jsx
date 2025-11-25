"use client";

import React from "react";
import Image from "next/image";
import { alternativesData } from "app/data/services/alternativesData";

// --- 1. Define Defaults ---
const defaultTitle = (
  <>
    HARO <strong>Alternatives</strong>
  </>
);

const defaultDescription = "Here are the platforms we use for our high-DA link-building strategies:";
const AlternativesSection = ({ 
  title = defaultTitle, 
  description = defaultDescription, 
  items = alternativesData
}) => {
  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <div className="container px-4">
        
        {/* --- Header --- */}
        <div className="mb-16">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-bold mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 text-lg lg:text-xl">
              {description}
            </p>
          )}
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, index) => (
            <div key={item.id || index} className="group">
              <div className="w-[100px] h-[100px] bg-white rounded-[5px] flex items-center justify-center mb-6 ml-1 transition-all duration-300 shadow-[0_0_5px_#c5c5c5] outline outline-3 outline-transparent outline-offset-[5px] group-hover:outline-[#E6531B]">
                <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                  <Image 
                    src={item.icon} 
                    alt={item.title} 
                    placeholder="blur"
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
              </div>
              {/* Content */}
              <h3 className="text-[#15151e] text-2xl font-bold mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-[16px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AlternativesSection;