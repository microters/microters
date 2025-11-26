"use client";

import React from "react";
import Image from "next/image";
import teamImage from "@assets/images/team/team-group-photo.jpg"; 

const MeetOurHeroes = () => {
  return (
    <section className="w-full py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Image */}
          <div className="w-full relative">
            <div className="rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src={teamImage}
                alt="Microters Team"
                width={1024}
                height={683}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="text-left">
            <h2 className="text-[#15151e] text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 leading-tight">
              Meet Our Microters Heros
            </h2>
            
            <div className="space-y-4 text-[#6a738e] text-lg lg:text-[19px] leading-relaxed">
              <p>
                At Microters, our team is our greatest strength. We create a fun and
                creative workplace where everyone feels valued. Our open office
                space is designed to inspire, with areas for both work and play. This
                helps our team members stay motivated and enjoy what they do.
              </p>
              <p>
                We are proud of the great reviews we’ve received, showing our
                commitment to excellent service. At Microters, we celebrate our
                successes together and support each other every day. Join us and
                be part of a team that loves to innovate and achieve great things
                together.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeetOurHeroes;