"use client";

import React from "react";
import { FaBalanceScale, FaBuilding, FaFileInvoiceDollar, FaLaptopCode, FaTruck, FaUserNurse, FaUserTie } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const industries = [
  { name: "Law Firms", icon: <FaBalanceScale /> },
  { name: "Health Professionals", icon: <FaUserDoctor /> },
  { name: "Medical Professionals", icon: <FaUserNurse /> },
  { name: "IT Professionals", icon: <FaUserTie /> },
  { name: "Transport Companies", icon: <FaTruck /> },
  { name: "Construction Firms", icon: <FaBuilding /> },
  { name: "Accounting Firms", icon: <FaFileInvoiceDollar /> },
  { name: "Software Firms", icon: <FaLaptopCode /> },
];

// --- 2. Background SVG (Extracted from your CSS) ---
const BgShape = () => (
  <div className="absolute right-0 top-0 w-full h-full z-0 pointer-events-none overflow-hidden">
    <svg 
      className="absolute right-0 top-0 h-full w-auto max-w-none opacity-100"
      viewBox="0 0 580 698" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M527.88 345.114L93.8693 692.822C207.98 927.231 616.633 1201.69 1067.22 936.998C962.866 853.978 904.348 739.703 884.842 708.449C724.111 797.524 559.74 745.564 497.646 708.449C557.464 660.59 702.069 544.362 801.941 462.319C881.526 365.43 835.101 269.582 801.941 233.77C752.525 193.399 622.485 86.8732 497.646 -16.267C662.472 -89.5199 782.435 -66.079 896.545 -16.267C928.535 -95.9662 1023.01 -197.283 1066.25 -237.979C590.299 -525.522 202.128 -202.818 92.894 1.31366L527.88 345.114Z" fill="#1E2843"/>
      <path d="M287.955 347.068L31.4493 144.89C-25.5085 294.912 7.71693 480.225 31.4493 554.129L287.955 347.068Z" fill="#1E2843"/>
      <path d="M1392 347.068C1392 107.97 1263.91 -72.9159 1199.86 -133.472C1116.64 -83.6597 950.187 116.565 950.187 347.068C950.187 611.95 1116.64 781.051 1199.86 832.491C1263.91 770.307 1392 586.165 1392 347.068Z" fill="#1E2843"/>
    </svg>
  </div>
);

// --- 3. Main Component ---
const IndustrySpecializations = () => {
  return (
    <section className="relative bg-[#192138] py-16 lg:py-28 overflow-hidden">
      {/* Background Graphic */}
      <BgShape />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl lg:text-[48px] font-normal leading-tight">
            Our Industry <strong className="font-extrabold">Specializations</strong>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 max-w-6xl mx-auto">
          {industries.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 group cursor-default"
            >
              {/* Icon Box */}
              <div className="w-12 h-12 flex items-center justify-center bg-[#fff2f0] text-black rounded-lg shadow-lg shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-2xl">
                    {item.icon}
                </span>
              </div>
              {/* Text */}
              <h3 className="text-white text-lg font-medium">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySpecializations;