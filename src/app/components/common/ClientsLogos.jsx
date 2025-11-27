"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// --- 1. Import Client Logos ---
import yoastLogo from "@assets/images/icons/yoast.png"; 
import seolyzerLogo from "@assets/images/icons/seolyzer.png";
import semrushLogo from "@assets/images/icons/semrush.png";
import optimizelyLogo from "@assets/images/icons/optimizly.png";
import similarWebLogo from "@assets/images/icons/similar-web.png";
import mozLogo from "@assets/images/icons/moz.png";
import ahrefsLogo from "@assets/images/icons/ahrefs.png";

// --- 2. Update Array to Use Imported Images ---
const clients = [
  { name: "Yoast", src: yoastLogo },
  { name: "Seolyzer", src: seolyzerLogo },
  { name: "Semrush", src: semrushLogo },
  { name: "Optimizely", src: optimizelyLogo },
  { name: "SimilarWeb", src: similarWebLogo },
  { name: "Moz", src: mozLogo },
  { name: "Ahrefs", src: ahrefsLogo },
];

const ClientsLogos = () => {
  return (
    <section className="w-full py-16 lg:py-20 bg-black">
      <div className="px-4">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl lg:text-[50px] font-normal leading-tight">
            More Than <span className="text-[#f35d36] font-bold">50K+</span> Individuals <strong>Choose US</strong>
          </h2>
        </div>

        {/* --- Logo Slider --- */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="client-logo-swiper"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center py-2">
                <div className="relative w-[140px] h-[60px] transition-opacity duration-300">
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="140px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ClientsLogos;