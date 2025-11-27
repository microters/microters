"use client";

import React from "react";
import Image from "next/image";

const ToolIntroSection = ({ 
  title, 
  description, 
  image, 
  useCasesTitle, 
  useCasesIntro, 
  useCases 
}) => {
  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <div className="container px-4">
        {/* --- Part 1: What Is It? --- */}
        <div className="mb-10">
          <h2 className="text-[#15151e] text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            {description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>

        {/* --- Part 2: Tool Image --- */}
       <div className="mb-16 relative w-full h-auto rounded-xl overflow-hidden border border-gray-100">
            <Image 
                src={image}
                alt={title}
                width={1200}
                height={800}
                quality={100}
                unoptimized={true} 
                className="w-full h-auto"
            />
        </div>

        {/* --- Part 3: Use Cases --- */}
        <div>
          <h2 className="text-[#15151e] text-3xl md:text-4xl font-bold mb-6">
            {useCasesTitle}
          </h2>
          
          {useCasesIntro && (
            <p className="text-gray-600 text-lg mb-8 italic border-l-4 border-[#f35d36] pl-4">
              {useCasesIntro}
            </p>
          )}

          <div className="space-y-10">
            {useCases.map((item, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-bold text-[#15151e] mb-3 group-hover:text-[#f35d36] transition-colors flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#feefeb] text-[#f35d36] text-sm">
                    {index + 1}
                  </span>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed pl-11">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolIntroSection;