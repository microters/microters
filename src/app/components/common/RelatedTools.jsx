"use client";

import React from "react";

const RelatedToolsSection = ({ title, tools }) => {
  return (
    <section className="w-full pb-16 lg:pb-20 bg-white">
      <div className="container px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#15151e] text-2xl md:text-3xl font-bold mb-4">
            {title}
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={tool.link}
              target="_self" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-100 bg-white transition-all duration-300 hover:border-[#f35d36] hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f35d36]/10 text-[#f35d36] transition-colors duration-300 group-hover:bg-[#f35d36] group-hover:text-white">
                {tool.icon}
              </div>

              {/* Title */}
              <h5 className="text-center text-[#15151e] font-semibold text-base md:text-lg transition-colors duration-300 group-hover:text-[#f35d36]">
                {tool.title}
              </h5>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedToolsSection;