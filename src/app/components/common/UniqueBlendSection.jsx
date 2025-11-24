"use client";

import React from "react";
import Image from "next/image";
import defaultSeoImage from "@assets/images/Traditional-SEO-2.png";

const UniqueBlendSection = ({
  title,
  subtitle,
  description,
  imageSrc = defaultSeoImage,
  imageAlt = "SEO Illustration",
}) => {
  return (
    <section className="w-full bg-white pb-16 lg:pb-24">
      <div className="container px-4">
        {/* --- Header Section --- */}
        <div className="mb-4">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-normal leading-tight mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* --- Split Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[400px] lg:max-w-full h-auto">
              <Image
                src={imageSrc}
                alt={imageAlt}
                placeholder="blur"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6 text-gray-600 text-lg lg:text-xl leading-relaxed">
              {Array.isArray(description) ? (
                description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <div>{description}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueBlendSection;
