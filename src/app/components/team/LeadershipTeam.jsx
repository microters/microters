"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { teamData } from "app/data/team/teamData";

const BgShape = () => (
  <svg className="w-full h-full" viewBox="0 0 672 337" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="336" cy="336.478" rx="336" ry="336.478" transform="matrix(1 8.75472e-08 8.72985e-08 -1 0 672.957)" fill="url(#paint0_linear_2045_629)" />
    <defs>
      <linearGradient id="paint0_linear_2045_629" x1="168.767" y1="67.8799" x2="770.147" y2="-128.423" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEEFEB" stopOpacity="0.8" />
        <stop offset="1" stopColor="#FEEFEB" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const LeadershipTeam = () => {
  return (
    <section className="w-full py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[64px] font-bold mb-4">
            Meet The Leadership Team
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl">
            Every one of our team members is devoted to delivering the finest possible designs.
          </p>
        </div>

        {/* --- Loop through Team Members --- */}
        <div className="flex flex-col gap-20 lg:gap-32 pt-0 lg:pt-24">
          {teamData.map((member) => (
            <div key={member.id} className="flex flex-col lg:flex-row items-center lg:items-end gap-12 lg:gap-20">
              {/* LEFT: Image Container */}
              <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end mb-8 lg:mb-0">
                {/* Wrapper for Image & Shape */}
                <div className="relative z-10 w-full max-w-[400px] lg:max-w-[560px]">
                  {/* Background Shape */}
                  <div className="absolute bottom-0 left-[-22%] w-[120%] h-auto z-[-1]">
                    <BgShape />
                  </div>

                  {/* Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    placeholder="blur"
                    className="w-full h-auto object-contain max-h-[450px] lg:max-h-[580px]"
                    priority={member.id === 1}
                  />
                </div>
              </div>

              {/* RIGHT: Text Content */}
              <div className="w-full lg:w-[55%]">
                <h4 className="text-[#f35d36] text-xl md:text-[22px] font-medium mb-2">
                  {member.designation}
                </h4>
                <h3 className="text-[#15151e] text-4xl md:text-5xl lg:text-[64px] font-bold mb-6 leading-tight">
                  {member.name}
                </h3>

                <div className="space-y-4 text-gray-600 text-lg lg:text-xl leading-relaxed">
                  {member.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex justify-start gap-3 mt-8">
                  {member.socials.facebook && (
                    <Link href={member.socials.facebook} target="_blank" className="w-8 h-8 rounded-full bg-[#a9afbe] text-white flex items-center justify-center hover:bg-[#f35d36] transition-colors duration-300">
                      <FaFacebookF size={14} />
                    </Link>
                  )}
                  {member.socials.linkedin && (
                    <Link href={member.socials.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-[#a9afbe] text-white flex items-center justify-center hover:bg-[#f35d36] transition-colors duration-300">
                      <FaLinkedinIn size={14} />
                    </Link>
                  )}
                  {member.socials.twitter && (
                    <Link href={member.socials.twitter} target="_blank" className="w-10 h-10 rounded-full bg-[#a9afbe] text-white flex items-center justify-center hover:bg-[#f35d36] transition-colors duration-300">
                      <FaXTwitter size={14} />
                    </Link>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div> 
    </section>
  );
};

export default LeadershipTeam;