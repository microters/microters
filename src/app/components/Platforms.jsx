"use client";

import React from "react";
import Image from "next/image";
import { platformsData } from "app/data/services/platformsData";

const PlatformsSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container px-4 max-w-7xl">
        
        {/* --- Header --- */}
        <div className="mb-16">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-normal leading-tight mb-6">
            We Thrive on <br className="hidden md:block" />
            <strong>Every cCommerce Platform</strong>
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-5xl">
            We aren’t new in this field. We’ve been serving our eCommerce clients successfully across every major platform. From WooCommerce to Shopify, you name it and we’ll deliver the most effective eCommerce SEO, guaranteed.
          </p>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {platformsData.map((platform) => (
            <div
              key={platform.id}
              className="group bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-default h-[250px]"
            >
              {/* Icon Wrapper with Animation */}
              <div className="w-[120px] h-[120px] flex items-center justify-center mb-4 relative">
                 <div className="animate-jump">
                    <Image
                      src={platform.icon}
                      alt={platform.title}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                 </div>
              </div>

              {/* Title */}
              <h3 className="text-[#15151e] text-lg lg:text-xl font-bold text-center">
                {platform.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;