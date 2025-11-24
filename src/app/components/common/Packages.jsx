"use client";

import { pricingData } from "app/data/services/pricingData";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const PricingCard = ({ data }) => (
  <div className="bg-white border border-[#bfc3cf] p-8 lg:p-10 h-full flex flex-col">
    <h4 className="text-[#192138] text-2xl lg:text-[32px] font-bold text-center mb-5">
      {data.title}
    </h4>

    <p className="text-[#29375d] text-center text-4xl lg:text-[40px] font-bold mb-5">
      {data.price}
      <sub className="text-lg font-normal bottom-0">{data.period}</sub>
    </p>

    <p className="text-[#545f7d] text-center mb-6 text-sm lg:text-base">
      {data.subtitle}
    </p>

    {/* Features List */}
    <div className="space-y-3 mb-8 grow">
      {data.features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3 text-[#545f7d]">
          <span className="mt-1 shrink-0">
            <FaCheck className="w-4 h-4 text-[#545f7d]" />
          </span>
          <span className="text-sm lg:text-base">{feature}</span>
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="text-center mt-auto">
      <a
        href={data.buttonLink}
        className="inline-block bg-[#f35d36] text-white font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        {data.buttonText}
      </a>
    </div>
  </div>
);

// --- Main Component ---
const PackagesSection = () => {
  return (
    <section className="w-full py-20 lg:py-[100px]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-[70px] font-extrabold mb-4 leading-tight">
            Packages
          </h2>
          <p className="text-[#15151e] text-lg lg:text-xl bg-white/5 inline-block rounded p-2 md:bg-transparent md:p-0 max-w-3xl">
            All Website are not same, So we will develop SEO proposal and
            planning based on website. Please contact us for get free proposal.
          </p>
        </div>

        {/* Grid Layout: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 border border-[#bfc3cf]/20 lg:border-none">
          {/* Column 1: Contractual Plans (White Card) */}
          <div className="lg:border-r border-[#bfc3cf]/50">
            <PricingCard data={pricingData.contractual} />
          </div>

          {/* Column 2: Custom Plans (White Card) */}
          <div className="lg:border-r border-[#bfc3cf]/50">
            <PricingCard data={pricingData.custom} />
          </div>

          {/* Column 3: Included Features (Dark Blue Background) */}
          <div className="bg-[#29375d] p-8 lg:p-10 border border-[#bfc3cf]/20 lg:border-none h-full flex flex-col justify-center">
            {/* Block 1: Each pack includes */}
            <div className="mb-10">
              <h4 className="text-white text-2xl lg:text-[28px] font-bold mb-6">
                {pricingData.includes.title}
              </h4>
              <div className="space-y-3">
                {pricingData.includes.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-white"
                  >
                    <span className="mt-1 shrink-0">
                      <FaCheck className="w-4 h-4" />
                    </span>
                    <span className="text-sm lg:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 2: Additional Derivables */}
            <div>
              <h4 className="text-white text-2xl lg:text-[28px] font-bold mb-6">
                {pricingData.additional.title}
              </h4>
              <div className="space-y-3">
                {pricingData.additional.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-white"
                  >
                    <span className="mt-1 shrink-0">
                      <FaCheck className="w-4 h-4" />
                    </span>
                    <span className="text-sm lg:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
