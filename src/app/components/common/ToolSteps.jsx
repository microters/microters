"use client";

import React from "react";

const ToolStepsSection = ({ title, description, steps }) => {
  return (
    <section className="w-full py-16 lg:py-20 bg-[#192138]">
      <div className="container px-4">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-[#d9d9d9] text-lg lg:text-xl leading-relaxed opacity-90">
            {description}
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const stepNumber = `0${index + 1}`;

            return (
              <div 
                key={step.id || index} 
                className="group relative bg-white p-8 lg:p-10 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-b-[6px] border-transparent hover:border-[#f35d36] h-full flex flex-col"
              >
                {/* Big Stylized Number */}
                <div className="mb-6">
                  <span className="text-5xl lg:text-6xl font-extrabold text-gray-200 group-hover:text-[#f35d36] transition-colors duration-300">
                    {stepNumber}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-[#15151e] text-xl lg:text-2xl font-bold mb-4 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-base leading-relaxed grow">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ToolStepsSection;