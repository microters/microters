"use client";

import React from "react";

const ToolFeaturesSection = ({ title, description, features }) => {
  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <div className="container px-4">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h2 className="text-[#15151e] text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group relative border border-[#f35d36] rounded-none p-8 overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
            >
              {/* Hover Background Animation Layer */}
              <div className="absolute top-0 right-0 bottom-0 w-0 bg-[#f35d36] transition-all duration-500 ease-out group-hover:w-full group-hover:left-0 z-0"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-[#15151e] text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolFeaturesSection;