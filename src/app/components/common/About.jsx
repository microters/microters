"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdOutlinePlayCircle } from "react-icons/md";
import VideoModal from "./VideoModal";
import Link from "next/link";

// Default Images (Keep these imports)
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import BACKGROUND_SHAPE_URL from "@assets/images/Background-shape.png";

const playIconSize = 92;

// --- 1. Define Default Content ---
const defaultTitle = (
  <>
    Let’s Know
    <br />
    <strong className="font-extrabold">About Microters!</strong>
  </>
);

const defaultDescriptionData = [
  "What happens when your website’s traffic suddenly starts to drop? Or the lead generation campaign you launched is nothing but a waste of time? Getting the first lead or driving traffic to your websites can be challenging– hack, you need a website to begin with!",
  "Meet Microters– your all-in-one digital marketing and development assistant. We help businesses, big or small, reach their potential customers and craft web tools catering to diverse business demands. Be it affiliate marketing, lead generation, or simply social media marketing, Microters has got your back.",
  "Our digital marketing and software development services are dedicated to meet your specific needs, from SEO and PPC marketing to SaaS development and website maintenance– and whatnot! Contact us today for a free professional consultation and find out how you can bump your business game."
];

// --- 2. The Reusable Component ---
const AboutSection = ({
  thumbnail = THUMBNAIL_URL,
  youtubeId = "FoU6-uRAmCo",
  title = defaultTitle,
  subtitle = "Not Your Typical Digital Marketing Agency!",
  description = defaultDescriptionData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="px-5 py-16 md:py-[76px]">
        <div className="container">
          {/* Columns Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Column: Video Thumbnail */}
            <div className="w-full max-w-[440px] relative mx-auto lg:mx-0">
              <div
                className="absolute -z-10 bg-no-repeat bg-cover opacity-10 w-[600px] h-[600px] left-[-90px] top-[35px] -rotate-90 hidden lg:block"
                style={{ backgroundImage: `url(${BACKGROUND_SHAPE_URL.src})` }}
              ></div>

              {/* Video Cover Wrapper */}
              <div
                className="relative cursor-pointer group rounded-[20px] overflow-hidden h-[620px] min-w-full max-w-full z-10"
                onClick={() => setIsModalOpen(true)}
              >
                {/* Background Image (Dynamic Prop) */}
                <Image
                  src={thumbnail}
                  alt="video thumbnail"
                  width={440}
                  height={620}
                  priority
                  objectFit="cover"
                  className="block w-full h-full object-cover object-center rounded-[20px]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gray-900/0"
                ></span>
                {/* Inner Content: Play Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Link
                    className="flex justify-center items-center"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Play video"
                  >
                    <MdOutlinePlayCircle
                      size={playIconSize}
                      className="transition duration-300 drop-shadow-lg fill-white group-hover:drop-shadow-xl group-hover:scale-110 group-hover:fill-(--color-primary)"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full lg:basis-7/12">
              <h2 className="text-4xl md:text-6xl lg:text-[72px] mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-[28px] font-bold mb-6 leading-normal text-(--color-text-paragraph)">
                {subtitle}
              </p>
              {Array.isArray(description) ? (
                description.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="mb-4 app-paragraph last:mb-8" 
                  >
                    {paragraph}
                  </p>
                ))
              ) : typeof description === 'string' ? (
                 <p className="mb-8 app-paragraph">{description}</p>
              ) : (
                 description
              )}
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        youtubeId={youtubeId}
      />
    </>
  );
};

export default AboutSection;
