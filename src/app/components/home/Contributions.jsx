"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import BACKGROUND_WATERMARK_URL from "../../../assets/images/BACKGROUND_WATERMARK_URL.png";
import contribution1 from "../../../assets/images/contributions/microters-contributions-1.png";
import contribution2 from "../../../assets/images/contributions/microters-contributions5.png";
import contribution3 from "../../../assets/images/contributions/microters-contributions7.png";
import contribution4 from "../../../assets/images/contributions/microters-contributions3.png";
import contribution5 from "../../../assets/images/contributions/microters-contributions6.jpg";
import contribution6 from "../../../assets/images/contributions/microters-contributions2.png";
import contribution7 from "../../../assets/images/contributions/microters-contributions4.png";

const contributionsData = [
  // Column 1
  { url: contribution1, alt: "Team Contribution 1", w: 689, h: 919, col: 1 },
  { url: contribution2, alt: "Team Contribution 2", w: 1129, h: 834, col: 1 },
  // Column 2
  { url: contribution3, alt: "Team Contribution 3", w: 724, h: 854, col: 2 },
  { url: contribution4, alt: "Team Contribution 4", w: 695, h: 753, col: 2 },
  { url: contribution5, alt: "Team Contribution 5", w: 766, h: 1021, col: 2 },
  // Column 3
  { url: contribution6, alt: "Team Contribution 6", w: 473, h: 817, col: 3 },
  { url: contribution7, alt: "Team Contribution 7", w: 504, h: 736, col: 3 },
];

const ContributionsSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Separate images by column index for the staggered layout
  const col1 = contributionsData.filter((img) => img.col === 1);
  const col2 = contributionsData.filter((img) => img.col === 2);
  const col3 = contributionsData.filter((img) => img.col === 3);

 const renderColumn = (images) => (
  <div className="flex flex-col space-y-4">
    {images.map((img, index) => (
      <figure
        key={index}
        className="overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.01] transition duration-300 group" 
      >
        <button
          onClick={() => openModal(img)}
          className="block w-full h-full relative cursor-zoom-in"
        >
          {/* --- 1. The Image --- */}
          <Image
            src={img.url}
            alt={img.alt}
            width={img.w}
            height={img.h}
            className="w-full h-auto object-cover"
          />

          {/* --- 2. THE NEW HOVER OVERLAY (Replicating ::before) --- */}
          <div 
            className={`
              absolute inset-0 
              bg-black 
              z-10 
              opacity-0 
              group-hover:opacity-50 
              transition-opacity duration-500
            `}
          ></div>
        </button>
      </figure>
    ))}
  </div>
);

  return (
    <section className="relative overflow-hidden py-24 bg-white contributions-section">
      {/* --- Custom Background Element (Replicating the rotated watermark) --- */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none z-0 overflow-hidden">
        <Image
          src={BACKGROUND_WATERMARK_URL}
          alt="Background Watermark Element"
          width={800}
          height={800}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover w-full h-full"
          unoptimized
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* --- Left Column: Text & Heading --- */}
          <div className="w-full lg:w-5/12 mb-12 lg:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold text-[#15151e]">
                <strong>Contributions</strong>
                <br />
                to the society
            </h2>
            <p className="mt-4 app-paragraph">
              We believe in sharing our knowledge with community members. To us,
              success is not simply a destination, but a journey where
              innovation and achievement meet.
            </p>
          </div>

          {/* --- Right Column: Staggered Image Gallery --- */}
          <div className="w-full lg:w-7/12 grid grid-cols-3 gap-4 items-center">
            {/* Column 1 (Normal start) */}
            <div>{renderColumn(col1)}</div>

            {/* Column 2 (Offset by a spacer) */}
            <div className="relative">
              <div className="h-[150px] hidden lg:block"></div>
              {renderColumn(col2)}
            </div>
            {/* Column 3 (Offset by a smaller spacer) */}
            <div className="relative">
              <div className="h-[70px] hidden lg:block"></div>
              {/* Spacer offset (70px) */}
              {renderColumn(col3)}
            </div>
          </div>
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 p-2 text-white hover:text-red-400 transition-colors z-50"
              aria-label="Close modal"
            >
              <FaTimes size={32} />
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={selectedImage.w}
              height={selectedImage.h}
              className="shadow-2xl w-auto h-auto max-h-[85vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ContributionsSection;
