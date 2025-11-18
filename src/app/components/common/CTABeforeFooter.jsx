"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";

// --- Static Data for Counter Columns ---
const counterData = [
  { value: "86", unit: "%", label: "Retention Rate" },
  { value: "64", unit: "+", label: "Country Serve" },
  { value: "91", unit: "%", label: "Satisfaction Score" },
];

const LogoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="119"
    viewBox="0 0 120 119"
    fill="none"
  >
    <g clipPath="url(#clip0_523_6691)">
      <path
        d="M60.3328 45.1341L30.552 8.02577C10.4751 17.7823 -13.0317 52.7225 9.63851 91.2485C16.7491 82.3258 26.5366 77.3224 29.2135 75.6546C21.5843 61.9121 26.0347 47.8581 29.2135 42.549C33.3126 47.6636 43.2674 60.0275 50.2943 68.5665C58.5928 75.3711 66.8021 71.4018 69.8694 68.5665C73.3271 64.3415 82.4509 53.2229 91.2848 42.549C97.5589 56.6418 95.5512 66.8987 91.2848 76.6553C98.111 79.3905 106.789 87.4682 110.274 91.1651C134.902 50.471 107.263 17.282 89.779 7.94238L60.3328 45.1341Z"
        fill="#29375D"
      ></path>
      <path
        d="M60.1655 24.6204L77.4819 2.68895C64.6326 -2.181 48.7606 0.659802 42.4308 2.68895L60.1655 24.6204Z"
        fill="#29375D"
      ></path>
      <path
        d="M60.1655 119.017C80.644 119.017 96.1367 108.066 101.323 102.59C97.0569 95.4737 79.9078 81.2419 60.1655 81.2419C37.4785 81.2419 22.9952 95.4737 18.5894 102.59C23.9154 108.066 39.687 119.017 60.1655 119.017Z"
        fill="#29375D"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_523_6691">
        <rect
          width="119"
          height="120"
          fill="white"
          transform="translate(120) rotate(90)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const CtaBeforeFooter = () => {
  return (
    <section className="bg-[#feefeb] py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
          {/* --- Left Column: Logo & Contact Info (65%) --- */}
          <div className="w-full lg:w-[65%]">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
              {/* Brand Logo (20%) */}
              <div className="shrink-0 mb-6 lg:mb-0 w-full lg:w-[15%] flex justify-center lg:justify-start">
                <div className="w-24 h-24 lg:w-auto lg:h-auto">
                  <LogoSVG />
                </div>
              </div>

              {/* Text and Phone Number (80%) */}
              <div className="w-full lg:w-4/5 text-center lg:text-left">
                <p className="text-lg text-[#6a738e] mb-1">
                  Feel free to reach out for a marketing expert. Give us a call.
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-[#f35d36] leading-none">
                  <Link
                    href="tel:+8801625192766"
                    className="hover:text-[#e06b4d] transition-colors"
                  >
                    +880 162-519-2766
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Counter Metrics (35%) --- */}
          <div className="w-full lg:w-[35%]">
            <div className="flex justify-between items-center space-x-4">
              {counterData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 text-center border-l border-gray-300 first:border-l-0 px-2 sm:px-4"
                >
                  {/* FIX: Use the react-countup library for animation */}
                  <InView triggerOnce={true} threshold={0.5}>
                    {({ inView, ref }) => (
                      <h2
                        ref={ref}
                        className="text-3xl md:text-4xl font-extrabold text-[#15151e] leading-none counter"
                      >
                        {inView ? (
                          <CountUp
                            start={0}
                            end={item.value}
                            duration={2.5}
                            suffix={item.unit}
                            separator=""
                          />
                        ) : (
                          <>
                            <strong>{item.value}</strong>
                            {item.unit}
                          </>
                        )}
                      </h2>
                    )}
                  </InView>

                  <p className="mt-2 text-sm text-[#15151e] leading-snug">
                    {item.label.split("<br>").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < item.label.split("<br>").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBeforeFooter;
