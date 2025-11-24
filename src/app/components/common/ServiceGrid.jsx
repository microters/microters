"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const ServiceGridSection = ({ title, description, services }) => {
  return (
    <section className="w-full py-20 bg-[#192138]">
      <div className="container px-4">
        {/* --- Header (Dynamic Content) --- */}
        <div className="mb-10">
          <h2 className="text-white text-4xl md:text-5xl lg:text-[56px] font-extrabold mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-[#eaebef] text-lg lg:text-xl leading-relaxed max-w-5xl">
            {description}
          </p>
        </div>

        {/* --- Grid Layout (Dynamic Loop) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div key={index} className="h-full">
              <ServiceCard 
                service={{
                    title: item.title,
                    color: item.color,
                    url: item.url,
                    description: item.description, 
                    items: []
                }} 
                hasBorder={false} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceGridSection;