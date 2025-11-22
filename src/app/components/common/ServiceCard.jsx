"use client";

import React from "react";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "app/data/serviceData";
import { FaCheck } from "react-icons/fa";

const ServiceCard = ({ service, hasBorder = false }) => {
  const BG_COLOR = "#29375d";
  const HIGHLIGHT_COLOR = service.color;
  const PADDING_LG = "p-[40px]";

  return (
    <div
      className={`relative w-full h-full transition-shadow duration-300 group`}
    >
      {/* Only first card gets animated border */}
      <div
        className={`relative rounded-lg overflow-hidden h-full z-10 flex flex-col ${
          hasBorder ? "has-border" : ""
        }`}
        style={{ backgroundColor: BG_COLOR }}
      >
        <div
          className={`relative has-border-inner z-20 flex flex-col ${PADDING_LG} h-full ${
            service.title === "SEO Services"
              ? "justify-center items-start"
              : "justify-between"
          }`}
        >
          <div
            className={
              service.title === "SEO Services" ? "-translate-y-2.5" : ""
            }
          >
            {/* Title */}
            <h4
              className="text-xl md:text-2xl font-bold mb-5"
              style={{ color: HIGHLIGHT_COLOR }}
            >
              {service.title}
            </h4>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {service.description ? (
              <p className="text-[#eaebef] text-lg leading-7 mb-8 opacity-90">
                {service.description}
              </p>
            ) : (
              <div className="space-y-3 mb-6">
                {service.items?.map((item, index) => (
                  <div key={index} className="flex items-center text-white text-sm">
                    <span className="mr-3 shrink-0 text-white">
                      <FaCheck className="w-4 h-4" />
                    </span>
                    <span className="text-lg md:text-xl">{item}</span>
                  </div>
                ))}
              </div>
            )}
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-4">
              {hasBorder ? (
                <Link
                  href={service.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="group/button relative px-10 pr-16 py-3 text-white bg-[#f35d36] rounded-[50px] font-bold inline-flex items-center transition-all duration-300 shadow-md hover:bg-white hover:text-[#29375d] hover:border-[#f35d36] hover:shadow-lg"
                >
                  Show More
                  {/* Inverts colors on hover */}
                  <span className="absolute right-4 top-px p-3.5 rounded-full bg-white transition-all duration-300 ease-out transform translate-x-1/2 shadow-md group-hover/button:bg-[#f35d36] group-hover/button:shadow-md">
                    <ArrowIcon className="w-4 h-4 fill-[#f35d36] transition-colors duration-300 group-hover/button:fill-white" />
                  </span>
                </Link>
              ) : (
                <Link
                    href={service.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-[#f35d36] transition-all duration-300 hover:scale-105"
                >
                    {/* 1. Pulsing Layer (Simulates :before) */}
                    <div 
                        className="absolute inset-0 w-12 h-12 rounded-full bg-[#f35d36] opacity-0"
                        style={{ 
                            animation: 'pulse-border 1500ms ease-out infinite',
                            transform: 'translate(-50%, -50%)',
                            left: '50%',
                            top: '50%',
                        }}
                    ></div>

                    {/* 2. Arrow Icon (z-10 to stay above the pulse) */}
                    <ArrowIcon className="w-4 h-4 fill-white relative z-10" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
