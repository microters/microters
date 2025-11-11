"use client";

import React from "react";
import AnimatedCounter from "../common/AnimatedCounter";

// --- Constants ---
const COUNTER_DATA = { value: 11, suffix: "+", label: "Years of Experience" };
const METRICS_DATA = [
  { value: "86%", label: "Retention Rate" },
  { value: "64+", label: "Country Serve" },
  { value: "91%", label: "Satisfaction Score" },
];

const DASH_COLOR = "#D4D7DF";

// --- Main Achievements Section Component ---

const AchievementsSection = () => {
  return (
    <section className="relative overflow-hidden px-5 pt-[200px] pb-[200px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-24">
          {/* === LEFT COLUMN: COUNTER CIRCLE (60% width on desktop) === */}
          <div className="w-full lg:basis-3/5 max-w-[500px] relative flex justify-center">
            {/* Background Pink Circle */}
            <div
              className="absolute rounded-full z-0 bg-[#FEF7F5] w-[800px] h-[800px] top-1/2 left-1/2"
              style={{
                    transform: "translate(calc(-50% - 320px), -50%)", 
              }}
            ></div>

            {/* Inner White Counter Circle (achivement-durating) */}
            <div
              className="relative rounded-full bg-white flex flex-col justify-center items-center text-center z-10 w-full h-full aspect-square"
              style={{
                boxShadow: "0px 4px 32px 4px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Animated Number Component */}
              <AnimatedCounter
                endValue={COUNTER_DATA.value}
                duration={1}
                suffix={COUNTER_DATA.suffix}
              />

              <p className="text-xl md:text-2xl lg:text-[40px] font-semibold leading-tight mt-3 whitespace-pre-wrap text-[#15151e] m-0">
                Years
                <br />
                of Experience
              </p>
            </div>
          </div>

          {/* === RIGHT COLUMN: METRICS LIST (40% width on desktop) === */}
          <div className="w-full lg:basis-2/5 max-w-sm">
            <ul className="relative list-none p-0 m-0 flex flex-col gap-12">
              {/* Dashed Vertical Line */}
              <div
                className="absolute left-0 block"
                style={{
                  borderLeft: `4px dashed ${DASH_COLOR}`,
                  height: "calc(100% - 80px)",
                  top: "35px",
                  left: "20px",
                  zIndex: 0,
                }}
              ></div>

              {METRICS_DATA.map((metric, index) => (
                <li key={index} className="relative z-10 text-left ml-10">
                  {/* DOTS CONTAINER */}
                  <div
                    style={{ top: "25px", left: "-30px" }}
                    className="absolute"
                  >
                    {/* 1. Static Dot */}
                    <div
                      className="w-6 h-6 rounded-full bg-[#f35d36] border-4 border-white"
                      style={{
                        boxShadow: `0 0 0 3px #FDDFD7`,
                      }}
                    ></div>

                    {/* 2. Pulsing Animation Dot (Simulates :after) */}
                    <div
                      className="absolute inset-0 w-6 h-6 rounded-full bg-[#f35d36] border-4 border-white"
                      style={{
                        boxShadow: `0 0 0 3px #FDDFD7`,
                        animation: "timeline-pulse 1500ms ease-out infinite",
                      }}
                    ></div>
                  </div>

                  <div className="ml-4">
                    {/* Metric Value */}
                    <strong className="text-3xl md:text-[60px] font-extrabold text-[#29375d]">
                      {metric.value}
                    </strong>

                    {/* Metric Label */}
                    <div className="text-lg leading-snug text-[#6a738e]">
                      {metric.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
