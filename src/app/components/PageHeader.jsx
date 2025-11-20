"use client";

import React from "react";
const SHAPES = {
  triangle: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='258' height='181' viewBox='0 0 258 181' fill='none'%3E%3Cpath d='M130.539 181L258 19.7682C163.421 -16.0339 46.5919 4.85063 1.45139e-05 19.7682L130.539 181Z' fill='%23FEEFEB'/%3E%3C/svg%3E\")",
  bottomLeft: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1026 318' fill='none'%3E%3Ccircle opacity='0.7' cx='513.09' cy='513.089' r='512.016' transform='rotate(-165 513.09 513.089)' fill='url(%23paint0_linear_385_14)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_385_14' x1='258.25' y1='104.365' x2='1174.42' y2='-195.117' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FEEFEB' stop-opacity='0.8'/%3E%3Cstop offset='1' stop-color='%23FEEFEB' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E\")",
  topRight: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 314 523' fill='none'%3E%3Ccircle opacity='0.7' cx='354' cy='169' r='354' fill='url(%23paint0_linear_363_4158)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_363_4158' x1='177.5' y1='472.5' x2='180' y2='-209' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FEEFEB'/%3E%3Cstop offset='1' stop-color='%23FEEFEB' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E\")"
};

const PageHeader = ({ title, highlight, description }) => {
  return (
    <section className="relative bg-[#fef7f5] py-16 lg:py-[150px] overflow-hidden group w-full">
      {/* 1. Bottom Left Circle */}
      <div 
        className="absolute left-[10%] bottom-0 w-full h-[318px] bg-no-repeat pointer-events-none transition-transform duration-1000 ease-in-out group-hover:-translate-x-[15%]"
        style={{ backgroundImage: SHAPES.bottomLeft }}
      />
      {/* 2. Top Right Circle */}
      <div 
        className="absolute right-0 top-0 w-[314px] h-[523px] bg-no-repeat z-10 pointer-events-none transition-transform duration-1000 ease-in-out group-hover:translate-y-[25%]"
        style={{ backgroundImage: SHAPES.topRight }}
      />
      {/* --- Main Content --- */}
      <div className="container px-4 relative z-20">
             {/* Heading Wrapper */}
          <div className="relative mb-6">
            {/* 3. Spinning Triangle (The Animated Element) */}
            <div className="absolute -left-[100px] lg:-left-[150px] top-0 w-[150px] lg:w-[258px] h-[100px] lg:h-[181px] bg-no-repeat -z-10 animate-spin-y"
                 style={{ backgroundImage: SHAPES.triangle }}
            />

            {/* Title Text */}
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl font-extrabold leading-tight">
              {title}{" "}<br/>
              <span className="text-[#f35d36]">{highlight}</span>
            </h1>
          </div>

          {/* Description Text */}
          <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl">
            {description}
          </p>
        </div>
    </section>
  );
};

export default PageHeader;