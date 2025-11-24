"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "app/data/services/projectsData";
import { FaAngleDoubleRight } from "react-icons/fa";

const SuccessfulProjects = () => {
  return (
    <section className="w-full py-24 bg-[#192138]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-white text-4xl md:text-5xl lg:text-[72px] font-normal mb-6 leading-tight">
            Successful Projects: <br className="hidden md:block" />
            <strong>A Testament to Our Expertise</strong>
          </h2>
          <p className="text-[#eaebef] text-lg lg:text-[22px] leading-relaxed max-w-4xl">
            See for yourself! Our portfolio showcases the success stories of
            those who trusted us. Join the ranks of satisfied clients who've
            witnessed remarkable growth.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[20px] p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-10 shadow-lg"
            >
              {/* Left Column: Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-[#0f0f0f] text-2xl lg:text-[32px] font-bold leading-[1.3] mb-8">
                  {project.title}
                </h3>

                <div className="space-y-3 mb-8">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <div className="w-5 h-5 flex items-center justify-center bg-white">
                        <FaAngleDoubleRight className="text-[#f35d36] w-4 h-4" />
                      </div>
                      <span className="text-lg font-bold text-black group-hover:text-[#f35d36] transition-colors">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={project.ctaLink}
                  className="inline-flex items-center gap-4 bg-[#f35d36] text-white p-3 pr-6 rounded-[10px] hover:bg-[#d64d29] transition-all duration-300 hover:-translate-y-1 shadow-md"
                >
                  <div className="relative w-auto h-auto lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden border-2 border-white/20 bg-white">
                    <Image
                      src={project.profileImage}
                      alt="Nazmul CEO"
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-bold text-base lg:text-lg">
                    {project.ctaText}
                  </span>
                </Link>
              </div>

              {/* Right Column: Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-auto rounded-[14px] overflow-hidden shadow-[0_0_5px_0px_#b9b1b1] group cursor-pointer">
                  <Image
                    src={project.image}
                    alt={project.title}
                    placeholder="blur"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessfulProjects;
