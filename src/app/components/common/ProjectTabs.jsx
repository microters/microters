"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PROJECT_SLIDES, PROJECT_TABS } from "app/data/ProjectData";
import ProjectSlide from "./ProjectSlide";

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState(PROJECT_TABS[0].key);
  const [isBeginning, setIsBeginning] = useState(true); 
  const [isEnd, setIsEnd] = useState(false);

  const slides = PROJECT_SLIDES[activeTab];
  const totalSlides = slides.length;

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const NAV_COLOR = "#A9AFBE";

  return (
    <div className="w-full">
           {/* Tab Navigation */}
           <ul 
                className="flex flex-col lg:flex-row bg-[#1E2843] rounded-t-lg shadow-lg" 
                role="tablist"
            >
                {PROJECT_TABS.map((tab, index) => (
                    <li 
                        key={tab.key}
                        className={`relative w-full lg:w-1/5 shrink-0 ${index < PROJECT_TABS.length - 1 ? 'border-b border-gray-700 lg:border-r lg:border-b-0' : ''} transition-all duration-300`}
                        role="presentation"
                    >
                        <button
                            onClick={() => handleTabChange(tab.key)}
                            className={`px-4 py-3 font-semibold text-lg transition-all duration-300 focus:outline-none w-full text-center cursor-pointer
                                ${activeTab === tab.key 
                                    ? 'bg-[#feefeb] text-[#151d31] border-none rounded-t-lg' 
                                    : 'text-white hover:bg-[#151d31]'
                                }`}
                            style={{ 
                                marginTop: activeTab === tab.key ? '-5px' : '0', 
                                marginBottom: activeTab === tab.key ? '0' : '-5px', 
                                zIndex: activeTab === tab.key ? 10 : 1,
                            }}
                            role="tab"
                            aria-selected={activeTab === tab.key}
                        >
                            {tab.title}
                        </button>
                    </li>
                ))}
            </ul>

      {/* Main Content Body - Swiper Implementation */}
      <div className="relative overflow-hidden">
        <Swiper
            key={activeTab} 
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
            }}
            onInit={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
            }}
            navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            }}
            className="w-full"
        >
          {slides.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectSlide project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows (Custom style to match image) */}
        {totalSlides > 1 && (
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4 z-40">
                <div className={`swiper-button-prev-custom cursor-pointer p-4 rounded-full transition-all focus:outline-none bg-gray-800/80 ${isBeginning ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-700'}`}>
                    <FaChevronLeft className="w-5 h-5 text-white" />
                </div>

                {/* Next Button - Disabled state applied */}
                <div className={`swiper-button-next-custom cursor-pointer p-4 rounded-full transition-all focus:outline-none bg-gray-800/80 ${isEnd ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-700'}`}>
                    <FaChevronRight className="w-5 h-5 text-white" />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTabs;
