"use client";

import React from "react";
import Image from "next/image";
import { processSteps } from "app/data/services/processData";

const WorkProcess = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#192138] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- Header --- */}
        <div className="mb-16">
          <h2 className="text-white text-4xl md:text-5xl lg:text-[72px] font-extrabold mb-6">
            Our Work Process
          </h2>
          <p className="text-white text-lg lg:text-[22px] leading-relaxed max-w-4xl opacity-90">
            Here at Microters, we lay out a clear plan for our clients on how we'll handle their SEO projects from day one. You can either hand us your website or invite us to be your SEO partner from scratch.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20 border border-white/20">
          {processSteps.map((step) => (
            <div 
              key={step.id}
              className="group relative p-10 bg-[#192138] transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  
                  {/* Icon Box */}
                  <div className="w-[100px] h-[100px] bg-white rounded-[5px] flex items-center justify-center transition-all duration-300 outline outline-transparent outline-offset-4 group-hover:outline-[#F35D36] origin-top icon-swing">
                    <div className="w-[60px] h-[60px] relative">
                      <Image 
                        src={step.icon} 
                        alt={step.title} 
                        width={100} 
                        height={100}
                        className="object-contain w-full h-full"
                        placeholder="blur" 
                      />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="text-[56px] font-bold leading-none stroke-number">
                    {step.id}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-white text-2xl font-bold mb-4 mt-8">
                  {step.title}
                </h3>
                <p className="text-[#eaebef] text-base leading-relaxed opacity-80">
                  {step.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;