"use client";

import React from "react";
import Image from "next/image";
import graphImage from "@assets/images/achievements-graph.png";
import { CircularProgress } from "./CircularProgress";
const AchievedSection = () => {
  return (
    <section className="w-full py-20 lg:py-[100px] bg-[#192138]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* === LEFT SIDE: TEXT & CIRCLES === */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-white text-4xl md:text-5xl lg:text-[60px] font-normal mb-6 leading-tight">
              What We <strong>Have Achieved</strong> So Far…
            </h2>
            <p className="text-white text-lg lg:text-xl leading-relaxed mb-10">
              There are hundreds of service providers who claim to be the best in the industry. At Microters, we let numbers speak for themselves.
            </p>

            {/* Circles Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Satisfied Clients */}
              <div className="bg-linear-to-tr from-[#29375D] to-[#212C4A] py-8 rounded-lg flex justify-center">
                <CircularProgress 
                    value={500} 
                    label="Satisfied Clients" 
                    layers={[
                      { percent: 80, opacity: 0.25 },
                      { percent: 75, opacity: 0.5 },
                      { percent: 65, opacity: 1.0 }
                    ]}
                />
              </div>

              {/* Card 2: Retention Rate */}
              <div className="bg-linear-to-tr from-[#29375D] to-[#212C4A] py-8 rounded-lg flex justify-center">
                <CircularProgress 
                    value={90} 
                    label="Retention Rate" 
                    layers={[
                      { percent: 90, opacity: 0.25 },
                      { percent: 85, opacity: 0.5 },
                      { percent: 80, opacity: 1.0 }
                    ]}
                />
              </div>

              {/* Card 3: Satisfaction Rate */}
              <div className="bg-linear-to-tr from-[#29375D] to-[#212C4A] py-8 rounded-lg flex justify-center">
                <CircularProgress 
                    value={100} 
                    percent={100} 
                    label="Satisfaction Rate" 
                />
              </div>

            </div>
          </div>

          {/* === RIGHT SIDE: GRAPH CARD === */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#212C4A] p-8 lg:p-10 rounded-xl shadow-xl border border-[#29375d] relative">
              
              {/* Top Info Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                
                {/* Years Count */}
                <div className="text-white">
                  <span className="text-6xl font-bold block mb-1">7</span>
                  <span className="text-xl font-light leading-tight block">Years <br/> of Experience</span>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-2 bg-[#FDDFD7] rounded-full block"></span>
                    <span className="text-white text-sm">Satisfied Clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-2 bg-[#F57D5E] rounded-full block"></span>
                    <span className="text-white text-sm">Retention Clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-2 bg-[#A24632] rounded-full block"></span>
                    <span className="text-white text-sm">High Success Ratio</span>
                  </div>
                </div>
              </div>

              {/* The Graph Image */}
              <div className="w-full relative h-[250px] sm:h-80">
                <Image
                  src={graphImage}
                  alt="Achievement Graph"
                  fill
                  className="object-contain object-bottom"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AchievedSection;