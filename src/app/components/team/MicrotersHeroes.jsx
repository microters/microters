"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { microtersHeroesData } from "app/data/team/microtersHeroesData";

const MicrotersHeroes = () => {
  return (
    <section className="w-full py-20">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[64px] font-bold mb-4">
            Meet the Microters Heroes!
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl">
            We’re not your ordinary digital team; we’re the champions of the online realm, crafting success stories one click at a time. Join us on this epic journey, where your dreams become our mission!
          </p>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {microtersHeroesData.map((member) => (
            <div key={member.id} className="w-full h-[453px] relative group perspective-1000">
              
              {/* --- INNER WRAPPER (Flip Container) --- */}
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                
                {/* === FRONT SIDE === */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden rounded-[20px] border border-[#f56e4b]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Orange Content Box Container (Handles Border Radius) */}
                  <div className="absolute bottom-0 left-0 w-full rounded-b-[20px] overflow-hidden">
                    <div 
                      className="bg-[#f56e4b] p-6 pt-16"
                      style={{ 
                        minHeight: "180px",
                        clipPath: "polygon(0 0, 100% 40px, 100% 200%, 0% 200%)" 
                      }}
                    >
                       <h4 className="text-white text-[24px] font-bold mb-1 relative z-10">
                         {member.name}
                       </h4>
                       <p className="text-white text-[16px] opacity-90 relative z-10">
                         {member.title}
                       </p>
                    </div>
                  </div>
                </div>

                {/* === BACK SIDE === */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[20px] overflow-hidden border border-[#f56e4b]">
                   
                   {/* Background Image Faint */}
                   <div className="absolute inset-0 z-0">
                     <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                   </div>

                   {/* Content Overlay */}
                   <div className="relative z-10 h-full flex flex-col justify-end">   
                      {/* Orange Content Box Container */}
                      <div className="w-full rounded-b-[20px] overflow-hidden">
                         <div 
                            className="bg-[#f56e4b] p-6 pt-10 flex flex-col justify-center"
                            style={{
                              clipPath: "polygon(0 40px, 100% 0, 100% 100%, 0% 100%)", 
                              minHeight: "180px"
                            }}
                         >
                            <div className="relative z-10">
                                {/* Social Icons */}
                                <div className="flex justify-center gap-3">
                                  {member.socials?.facebook && (
                                    <Link href={member.socials.facebook} target="_blank" className="w-10 h-10 bg-[#f89e86] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#f56e4b] transition-colors duration-300">
                                        <FaFacebookF size={16}/>
                                    </Link>
                                  )}
                                  {member.socials?.twitter && (
                                    <Link href={member.socials.twitter} target="_blank" className="w-10 h-10 bg-[#f89e86] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#f56e4b] transition-colors duration-300">
                                        <FaXTwitter size={16}/>
                                    </Link>
                                  )}
                                  {member.socials?.linkedin && (
                                    <Link href={member.socials.linkedin} target="_blank" className="w-10 h-10 bg-[#f89e86] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#f56e4b] transition-colors duration-300">
                                        <FaLinkedinIn size={16}/>
                                    </Link>
                                  )}
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicrotersHeroes;

