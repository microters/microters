"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Grid } from "swiper/modules";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { galleryData as defaultGalleryData } from "app/data/galleryData";

const defaultTitle = (
  <>
    Life at <strong>Microters</strong>
  </>
);

const defaultDescription = "Life at Microters is vibrant and inspiring. Our office blends creativity and collaboration, with spaces designed for both focused work and fun. We celebrate every achievement and foster a supportive community where everyone can thrive.";

const LifeAtMicroters = ({
  title = defaultTitle,
  description = defaultDescription,
  galleryData = defaultGalleryData
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle opening the lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Handle Next/Prev in Lightbox
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  return (
    <section className="w-full pt-16 lg:pt-20 bg-white">
      <div className="container px-4">
        
        {/* --- Header --- */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-[#15151e] text-4xl md:text-5xl lg:text-[72px] font-normal mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* --- Swiper Gallery --- */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, Grid]}
            spaceBetween={20}
            slidesPerView={1}
            grid={{
              rows: 2, 
              fill: "row" 
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active bg-[#f35d36]",
            }}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                grid: { rows: 2 } 
              },
              1024: { 
                slidesPerView: 3,
                grid: { rows: 2 } 
              },
            }}
            className="life-gallery-swiper pb-14"
          >
            {galleryData.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div 
                  className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* --- Lightbox Modal --- */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          
          {/* Close Button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-[#f35d36] transition-colors z-50"
          >
            <FaTimes size={32} />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-[#f35d36] transition-colors z-50 hidden md:block"
          >
            <FaChevronLeft size={40} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-[#f35d36] transition-colors z-50 hidden md:block"
          >
            <FaChevronRight size={40} />
          </button>

          {/* Main Image */}
          <div className="relative w-full max-w-5xl h-full max-h-[80vh]">
            <Image
              src={galleryData[currentImageIndex].src}
              alt={galleryData[currentImageIndex].alt}
              fill
              className="object-contain"
              quality={100}
            />
          </div>

          {/* Caption / Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
            {currentImageIndex + 1} / {galleryData.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default LifeAtMicroters;