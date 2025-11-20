"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { partners } from "app/data/partners";

const LogoTicker = () => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full pb-12 bg-white">
      <div 
        className="px-4"
        onMouseEnter={() => {
          if (swiperRef.current) swiperRef.current.autoplay.stop();
        }}
        onMouseLeave={() => {
          if (swiperRef.current) swiperRef.current.autoplay.start();
        }}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="logo-ticker-swiper pt-14! pb-4!"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <Link 
                href={partner.link} 
                target="_blank" 
                className="relative group w-full max-w-[180px] h-[60px] flex items-center justify-center"
              >
                {/* Image */}
                <Image
                  src={partner.img}
                  alt={partner.name}
                  width={150}
                  height={60}
                  className="object-contain w-auto h-full"
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {partner.link}
                  {/* Tiny Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoTicker;