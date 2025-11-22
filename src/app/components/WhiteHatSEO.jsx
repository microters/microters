"use client";

import React from "react";
import Image from "next/image";
import whiteHatSeoImg from "@assets/images/white-hat-seo.png"; 

const WhiteHatSEO = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- Top Row: Text (Left) & Image (Right) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-8">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-8">
            <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] leading-tight mb-8">
              Building Your Brand with <br className="hidden lg:block" />
              <strong className="font-extrabold">White Hat SEO</strong>
            </h2>

            <div className="space-y-6 text-gray-600 text-lg lg:text-[18px] leading-relaxed">
              <p>
                We are 100% committed to helping your business dominate the search engine, 
                and we do it the right way, using <strong>White Hat SEO</strong> techniques.
              </p>
              <p>
                What "<strong>White Hat</strong>" means is optimizing your website ethically, 
                without violating Google’s search engine guidelines. We don’t apply shady 
                techniques like keyword stuffing, link farming or use spammy links for a 
                short-term ranking boost on search engines.
              </p>
            </div>
          </div>

          {/* Right Column: Image (Takes up ~33% on desktop) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              <Image
                src={whiteHatSeoImg}
                alt="White Hat SEO Illustration"
                width={720}
                height={660}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Full Width Text --- */}
        <div className="text-gray-600 text-lg lg:text-[18px] leading-relaxed space-y-6">
          <p>
            Instead, our goal is to help you build a brand with a longer and sustainable strategy. 
            When you apply best practices in Google’s Search Essentials, you reduce the risk of 
            getting flagged by the search engine. Add that with helpful, people-first content, 
            and you set your business up for a sustainable brand.
          </p>
          <p>
            White hat SEO won’t get you immediate results though. But as the saying goes, 
            "slow and steady wins the race", we say our slow and steady approach wins the SERPs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhiteHatSEO;