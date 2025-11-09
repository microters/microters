"use client";

import React from "react";
import Image from "next/image";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import trustpilotIcon from "@assets/images/icons/trustpilotIcon.png";
import facebookIcon from "@assets/images/icons/facebookIcon.png";
import capterraIcon from "@assets/images/icons/capterraIcon.png";
import GzIcon from "@assets/images/icons/g2Icon.png";
import GmbIcon from "@assets/images/icons/gnbIcon.png";
import clutchIcon from "@assets/images/icons/clutchIcon.png";
import bannerIllustration from "@assets/images/svgviewer-output.svg";
import BannerForm from "../common/BannerForm";
const SVG_BACKGROUND = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1026 318\" fill=\"none\"%3E%3Ccircle opacity=\"0.7\" cx=\"513.09\" cy=\"513.089\" r=\"512.016\" transform=\"rotate(-165 513.09 513.089)\" fill=\"url(%23paint0_linear_385_14)\"/%3E%3Cdefs%3E%3ClinearGradient id=\"paint0_linear_385_14\" x1=\"258.25\" y1=\"104.365\" x2=\"1174.42\" y2=\"-195.117\" gradientUnits=\"userSpaceOnUse\"%3E%3Cstop stop-color=\"%23FEEFEB\" stop-opacity=\"0.8\"/%3E%3Cstop offset=\"1\" stop-color=\"%23FEEFEB\" stop-opacity=\"0\"/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E')";

const ratingBadges = [
  {
    icon: trustpilotIcon,
    name: "Trustpilot",
    rating: 5.0,
    count: "85+",
    color: "green",
  },
  {
    icon: facebookIcon,
    name: "Facebook",
    rating: 4.9,
    count: "200+",
    color: "blue",
  },
  {
    icon: capterraIcon,
    name: "Capterra",
    rating: 4.8,
    count: "70+",
    color: "orange",
  },
  { icon: GzIcon, name: "G2", rating: 5.0, count: "80+", color: "red" },
  { icon: GmbIcon, name: "GMB", rating: 4.9, count: "150+", color: "blue" },
  {
    icon: clutchIcon,
    name: "Clutch",
    rating: 5.0,
    count: "50+",
    color: "black",
  },
];

const HeroBanner = () => {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-banner-bg)" }}
    >
    <div 
        className="absolute bottom-0 w-full h-[318px] transition duration-1000 ease bg-no-repeat -z-10 translate-x-[20%] group-hover:translate-x-[-5%]" style={{backgroundImage: SVG_BACKGROUND, left: '10%',}}
      ></div>
      <div className="px-5">
        <div className="container relative z-10">
          <div>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-[112px] font-extrabold mb-4 leading-none"
              style={{ color: "var(--color-text-heading)", lineHeight: "1.1" }}
            >
              Explore,{" "}
              <span style={{ color: "var(--color-primary)" }}>Create,</span>
              <br />
              and{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Grow Online!
              </span>
            </h1>
            <p
              className="mb-8 max-w-[1200px] text-lg sm:text-xl lg:text-[22px]"
              style={{ color: "var(--color-text-paragraph)" }}
            >
              Why invest in digital marketing campaigns if you can't reach your
              potential customers? Be it Google's #1 page or getting the right
              leads – every single step taken in designing your marketing
              strategy counts. And Microters is here to help.
            </p>

            <BannerForm />

            {/* Rating Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-0 pt-10 max-w-[800px] lg:max-w-2xl xl:max-w-[800px]">
              {ratingBadges.map((badge, index) => {
                const isTopRow = index < 3; 
                const isLastColumnMd = (index + 1) % 3 === 0;
                return (
                  <div
                    key={index}
                    className={`group flex items-center gap-2 sm:gap-4 p-4 min-h-[100px] cursor-pointer border-gray-300 border-opacity-70 ${isTopRow ? "md:border-b" : ""} ${!isLastColumnMd ? "md:border-r" : ""}`}
                  >
                    {/* Left Side: Icon and Name/Count Stack */}
                    <div className="flex items-center space-x-3">
                      {/* Icon Container */}
                      <div className={`w-10 h-10 shrink-0 relative`}>
                        <Image
                          src={badge.icon}
                          alt={`${badge.name} icon`}
                          width={48}
                          height={48}
                          className="transition duration-700 ease-in-out group-hover:rotate-y-360 "
                        />
                      </div>
                    </div>

                    {/* Right Side: Rating Stars */}
                    <div className="flex flex-col text-left">
                      <p className="text-base font-semibold text-gray-800 leading-tight">
                        {badge.name}
                      </p>
                      {/* Count & Stars */}
                      <div className="flex items-center space-x-1 mt-0.5">
                        {/* Count Span */}
                        <span className="text-xs text-gray-500 font-medium leading-none">
                          ({badge.count})
                        </span>

                        {/* Rating Stars */}
                        <Rating
                          className="inline-flex!"
                          emptySymbol={
                            <FaRegStar className="text-gray-300" size={16} />
                          }
                          halfSymbol={
                            <FaStarHalfAlt
                              className="text-yellow-400"
                              size={16}
                            />
                          }
                          fullSymbol={
                            <FaStar className="text-yellow-400" size={16} />
                          }
                          initialRating={badge.rating}
                          readonly={true}
                          fractions={2}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-full h-[350px] lg:h-[500px] xl:h-[550px] lg:w-[45%] xl:w-[30%] -z-10 hidden lg:block">
            <Image
              src={bannerIllustration}
              alt="Digital Marketing Illustration"
              layout="fill"
              objectFit="contain"
              priority
              className="object-bottom-right!"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
