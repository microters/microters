"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import michaelImage from "../../../assets/images/Michael-Testimonial.png";
import mattImage from "../../../assets/images/Matt-Price.png";
import davidImage from "../../../assets/images/David-Foster.png";
import VideoModal from "./VideoModal";

// --- Testimonial Data ---
const testimonials = [
  {
    id: 1,
    type: "Video Testimonial",
    pretext: "Content Writing",
    quote:
      "“I can’t express how grateful I am to have found Microters. Their expertise and dedication are second to none. Over the past year, they’ve transformed our online presence, delivering a sleek website, boosting our SEO, and crafting engaging content that resonates with our audience.“",
    client: "Michael Weinstein",
    title: "Founder, Siro Holdings",
    image: michaelImage,
    videoUrl: "https://youtu.be/vNJbOJe92wA",
    bgColor: "#feefeb",
  },
  {
    id: 2,
    type: "Text Testimonial",
    pretext: "Web Development",
    quote:
      "“I just wanted to say that working with Microters has been amazing. In two years, they’ve developed our website, improved our SEO, and provided great content. They really get what we need. Nazmul and his team are dedicated and experts at what they do. If you need web services, I highly recommend Microters. Thanks for two great years, and here’s to more!“",
    client: "Matt Price",
    title: "Founder, Silk Tie Communications",
    image: mattImage,
    videoUrl: null,
    bgColor: "#f5f6f8",
  },
  {
    id: 3,
    type: "Text Testimonial",
    pretext: "SEO Strategy",
    quote:
      "“I’ve had the pleasure of working with Microters, and I must say it’s been an incredible journey. Within a short time, they’ve revamped our website, elevated our SEO game, and provided exceptional content that speaks directly to our target audience. For anyone in need of exceptional web services, Microters is the go-to choice. Cheers to a future filled with more remarkable achievements!“",
    client: "David Foster",
    title: "Co-Founder, Digital Dynamics Co.",
    image: davidImage,
    videoUrl: null,
    bgColor: "#feefeb",
  },
];

// --- Individual Testimonial Slide Component ---
const TestimonialSlide = ({ data, openModal}) => {
  const isVideo = !!data.videoUrl;
    
  const handlePlayClick = (e) => {
      e.preventDefault();
      if (data.videoUrl) {
          openModal(data.videoUrl);
      }
  };

  return (
    <div className="p-6 md:p-10 rounded-xl bg-white shadow-xl min-h-[450px]">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-10 h-full">
        {/* --- Left Column: Image/Video Cover (40%) --- */}
        <div className="w-full lg:w-2/5 mb-6 lg:mb-0 relative">
          <div
            className="w-full rounded-[20px] min-h-[650px] max-h-[650px] overflow-hidden relative"
          >
            <Image
              src={data.image}
              alt={data.client}
              layout="fill"
              objectFit="cover"
              objectPosition={data.id === 3 ? "49% 17%" : "center center"}
              className="rounded-[20px]"
              priority={true}
            />
            {isVideo && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-all duration-300"
                aria-label={`Watch testimonial video by ${data.client}`}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110">
                  <FaPlay className="text-[#f35d36] ml-1" size={20} />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* --- Right Column: Text Content (60%) --- */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center py-6 lg:py-0">
          <div className="hidden lg:block h-24"></div>

          <p className="testimonial-pretext text-[#f35d36] font-semibold text-lg mb-2 text-left">
            {data.pretext}
          </p>

          <h4 className="text-[#15151e] text-xl md:text-[22px] font-normal leading-relaxed mb-6 text-left">
            {data.quote}
          </h4>

          <p className="testimonial-client-name text-[#6a738e] font-semibold text-left">
            <strong className="text-[#15151e]">{data.client}</strong>
            <br />
            {data.title}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
const TestimonialsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url; 
    };

    const openModal = (url) => {
        const videoId = getYouTubeId(url);
        setVideoUrl(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoUrl('');
    };
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#15151e] leading-tight">
            <strong>Testimonials</strong> from our Clients
          </h2>
          <p className="max-w-4xl mx-auto mt-4 app-paragraph">
            Not yet convinced? Take a moment to read what our satisfied clients
            are saying about Microters and discover what sets us apart as one of
            the best digital marketing and development agencies.
          </p>
        </div>

        {/* --- Slider Container --- */}
        <div className="testimonial-slider relative bg-[#feefeb] p-4 md:p-10 rounded-3xl overflow-hidden shadow-2xl">
          <Swiper
            // Swiper settings
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
            className="w-full h-full"
          >
            {testimonials.map((data) => (
              <SwiperSlide key={data.id}>
                <TestimonialSlide data={data} openModal={openModal} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* --- Custom Navigation Buttons --- */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-0 z-20 pointer-events-none">
            <button
              className="swiper-button-prev-custom w-14 h-14 rounded-full bg-white text-[#f35d36] flex items-center justify-center shadow-xl transition-colors duration-300 pointer-events-auto absolute -left-3 md:-left-5"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              className="swiper-button-next-custom w-14 h-14 rounded-full bg-white text-[#f35d36] flex items-center justify-center shadow-xl transition-colors duration-300 pointer-events-auto absolute right-4 md:right-14"
              aria-label="Next testimonial"
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          {/* --- Custom Pagination --- */}
          <div className="swiper-pagination-custom mt-8 flex justify-center space-x-2"></div>
        </div>
      </div>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} youtubeId={videoUrl} />
    </section>
  );
};

export default TestimonialsSection;
