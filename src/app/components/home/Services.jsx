"use client";

import React from "react";
import ServiceCard from "../common/ServiceCard";
import { SERVICES } from "app/data/serviceData";

const SERVICES_BG_SHAPE = `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="580" height="698" viewBox="0 0 580 698" fill="none"%3E%3Cpath d="M527.88 345.114L93.8693 692.822C207.98 927.231 616.633 1201.69 1067.22 936.998C962.866 853.978 904.348 739.703 884.842 708.449C724.111 797.524 559.74 745.564 497.646 708.449C557.464 660.59 702.069 544.362 801.941 462.319C881.526 365.43 835.101 269.582 801.941 233.77C752.525 193.399 622.485 86.8732 497.646 -16.267C662.472 -89.5199 782.435 -66.079 896.545 -16.267C928.535 -95.9662 1023.01 -197.283 1066.25 -237.979C590.299 -525.522 202.128 -202.818 92.894 1.31366L527.88 345.114Z" fill="%231E2843"/%3E%3C/svg%3E')`;

const ServicesSection = () => {
  const seoServices = SERVICES[0];
  const otherServices = SERVICES.slice(1);

  return (
    <section className="relative bg-[#192138] text-white overflow-hidden px-5 pt-[100px] pb-[100px]">
      {/* background shape */}
      <div
        className="absolute top-0 right-0 h-full w-full bg-no-repeat bg-contain bg-right z-10 hidden lg:block"
        style={{
          backgroundImage: SERVICES_BG_SHAPE,
          backgroundSize: "700px 100%",
          backgroundPosition: "right top",
        }}
      ></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl lg:text-[72px] font-extrabold mb-4 leading-tight text-white">
          Discover Our
          <br />
          <strong className="font-extrabold">Impressive Service Offerings</strong>
        </h2>

        <div className="max-w-4xl mb-20">
          <p className="text-lg lg:text-xl text-white">
            Boost your brand with our data-driven digital marketing. We deliver
            proven results, even if you don’t have the expertise or resources.
          </p>
        </div>

        {/* Cards layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* Left tall card */}
          <div className="flex flex-col h-full">
            <ServiceCard service={seoServices} hasBorder={true} />
          </div>

          {/* Right 2x2 grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
            {otherServices.map((service, index) => (
              <ServiceCard key={index} service={service} hasBorder={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;