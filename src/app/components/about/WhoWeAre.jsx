"use client";

import React from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";
const statsData = [
  { number: "11", suffix: "+", label: "Years Of Experience" },
  { number: "80", suffix: "+", label: "Expert professionals" },
  { number: "5,000", suffix: "+", label: "Clients served" },
  { number: "80", suffix: "%", label: "Retention Rate" },
  { number: "64", suffix: "+", label: "Country Serve" },
  { number: "91", suffix: "%", label: "Satisfaction Score" },
];

const LEFT_BG_SHAPE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='434' height='751' viewBox='0 0 434 751' fill='none'%3E%3Cpath d='M434 375.5C434 582.883 265.883 751 58.5 751C-148.883 751 -317 582.883 -317 375.5C-317 168.117 -148.883 0 58.5 0C265.883 0 434 168.117 434 375.5Z' fill='url(%23paint0_radial_421_619)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_421_619' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(277.5 249.6) rotate(140.693) scale(705.638)'%3E%3Cstop stop-color='%23FEF7F5'/%3E%3Cstop offset='1' stop-color='%23FEF7F5' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E\")";

const StatCard = ({ number, suffix, label }) => {
    const numericValue = parseInt(number.replace(/,/g, ""), 10);
    return (
  <div className="relative py-14 px-6 text-center overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
    {/* The "Curved Top" Effect */}
    <div className="absolute -top-[95px] left-1/2 -translate-x-1/2 w-full h-[168px] bg-[#FEEFEB] rounded-full" />
    {/* --- Content Wrapper --- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* The Counter Number */}
        <div className="text-[#15151e] text-3xl lg:text-[40px] font-bold mb-3 flex items-center leading-none">
          {/* InView triggers the CountUp when the user scrolls to this card */}
          <InView triggerOnce threshold={0.5}>
            {({ inView, ref }) => (
              <span ref={ref}>
                {inView ? (
                  <CountUp
                    start={0}
                    end={numericValue}
                    duration={2.5}
                    separator=","
                    useEasing={true}
                  />
                ) : (
                  0
                )}
              </span>
            )}
          </InView>
          
          {/* Suffix (+ or %) */}
          <span className="text-3xl lg:text-[40px] ml-1 font-semibold text-[#15151e]">
            {suffix}
          </span>
        </div>

        {/* The Label (Handling new lines \n) */}
        <p className="text-[#15151e] font-medium text-lg leading-snug whitespace-pre-line">
          {label}
        </p>
      </div>
  </div>
)
}

// --- Main Component ---
const WhoWeAre = () => {
  return (
    <section className="relative w-full py-20 lg:py-[200px] overflow-hidden">
      {/* 1. Background Shape (Left side) */}
      <div
        className="absolute left-0 top-[100px] w-[434px] h-[751px] bg-no-repeat -z-10 pointer-events-none"
        style={{ backgroundImage: LEFT_BG_SHAPE }}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- Left Column: Text Content --- */}
          <div className="space-y-8 relative z-10">
            <h2 className="text-[#15151e] text-5xl lg:text-[88px] font-bold leading-tight">
              Who We Are
            </h2>

            <p className="text-[#15151e] text-lg leading-relaxed">
              Hey there, we’re Microters Family! We’re like the friendly digital
              superheroes who help you find cool stuff online. You know when
              you’re searching for things on the internet, like fun games or
              answers to your questions? Well, we’re the ones who make sure you
              discover all the awesome things you’re looking for!
            </p>

            <p className="text-[#15151e] text-lg font-medium leading-relaxed">
              Think of us as your online helpers. We use our special skills,
              like SEO (it’s like a secret method for rank a websites) and
              digital marketing (making cool ads and get targated traffic), to
              make your online experience super fun and easy. So, whether you’re
              into the latest trends, great deals, or just having a good time
              online, we’re here to make it all exciting for you!
            </p>
          </div>

          {/* --- Right Column: Stats Grid --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
              <div key={index} className="h-full bg-[#fef7f5]"> 
                <StatCard 
                  number={stat.number} 
                  suffix={stat.suffix} 
                  label={stat.label} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;