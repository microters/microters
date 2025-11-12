"use client";

import React from 'react';
import Image from 'next/image';
import { InfoIcon, QuoteIcon } from 'app/data/ProjectData';

const CARD_BACKGROUND = '#feefeb'; 
const HIGHLIGHT_COLOR = '#f35d36';
const TEXT_COLOR = '#15151e';
const INFO_ICON_SIZE = 48;

// --- InfoBox Component ---
const InfoBox = ({ data, IconComponent }) => {
    return (
        <div className="p-6 h-full rounded-lg transition-all duration-300 group bg-[#feefeb] hover:bg-[#f35d36] relative overflow-hidden">           
            {/* 1. Decorative Icon (Absolutely Positioned Top Right) */}
            <div 
                className="absolute top-6 right-6 opacity-40 transition-opacity duration-300 group-hover:opacity-100" 
                style={{ color: HIGHLIGHT_COLOR }} 
            >
                <IconComponent size={INFO_ICON_SIZE} className="transition-colors duration-300 group-hover:text-white" />
            </div>

            {/* 2. Title (Flows normally) */}
            <h3 className="text-3xl font-bold text-gray-800 leading-tight mb-4 transition-colors duration-300 group-hover:text-white relative z-10">
                {data.title}
            </h3>
            
            {/* 3. Description Paragraph (Flows normally) */}
            <p className="text-gray-600 text-lg transition-colors duration-300 group-hover:text-white relative z-10">
                {data.desc}
            </p>
        </div>
    );
};

const ProjectSlide = ({ project }) => {
    const IMAGE_VIEW_HEIGHT = 400; 

    return (
        <div className="w-full">
            {/* Top Row: Title, Subtitle, and Image */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-2.5 p-7 lg:p-10 rounded-b-lg shadow-lg" style={{ backgroundColor: CARD_BACKGROUND }}>
                
                {/* Text Column */}
                <div className="w-full lg:basis-1/2">
                    <p className="text-xl font-semibold mb-2" style={{ color: HIGHLIGHT_COLOR }}>
                        {project.subtitle}
                    </p>
                    {/* Title - Ensure responsive sizing */}
                    <h2 className="text-3xl md:text-[42px] font-extrabold leading-snug" style={{ color: TEXT_COLOR }}>
                        {project.title}
                    </h2>
                </div>
                
                {/* Image Column */}
                <div className="w-full lg:basis-1/2 h-[400px] flex items-center justify-center overflow-hidden"> 
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={IMAGE_VIEW_HEIGHT}
                        className="rounded-lg object-contain w-full h-full"
                        priority
                    />
                </div>
            </div>

            {/* Bottom Row: Info Boxes (Client Review & Details) */}
            <div className="flex flex-col md:flex-row gap-2.5 items-stretch"> 
                <div className="w-full md:basis-1/2">
                    <InfoBox data={project.review} IconComponent={QuoteIcon} />
                </div>
                <div className="w-full md:basis-1/2">
                    <InfoBox data={project.details} IconComponent={InfoIcon} />
                </div>
            </div>
        </div>
    );
};

export default ProjectSlide;