"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import { MdOutlinePlayCircle } from "react-icons/md";
import VideoModal from "../common/VideoModal";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import BACKGROUND_SHAPE_URL from "@assets/images/Background-shape.png";
import Link from "next/link";
const YOUTUBE_ID = "FoU6-uRAmCo";
const playIconSize = 92; 


const AboutSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="px-5 py-16 md:py-[76px]">
                <div className="container">
                    {/* Columns Layout */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Left Column: Video Thumbnail */}
                        <div className="w-full max-w-[440px] relative mx-auto lg:mx-0">
                        <div className="absolute -z-10 bg-no-repeat bg-cover opacity-10 w-[600px] h-[600px] left-[-90px] top-[35px] -rotate-90 hidden lg:block" style={{backgroundImage: `url(${BACKGROUND_SHAPE_URL.src})`}}></div>
                            {/* Video Cover Wrapper */}
                            <div 
                                className="relative cursor-pointer group rounded-[20px] overflow-hidden h-[620px] min-w-full max-w-full z-10" 
                                onClick={() => setIsModalOpen(true)}
                            >
                                {/* Background Image */}
                                <Image
                                    src={THUMBNAIL_URL} 
                                    alt="microters company video thumbnail"
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
                                        aria-label="Play video about Microters"
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
                            <h2 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold mb-4 leading-tight">
                                Let’s Know<br/>
                                <strong>About Microters!</strong>
                            </h2>
                            <p className="text-[28px] font-bold mb-6 leading-normal text-(--color-text-paragraph)">
                                Not Your Typical Digital Marketing Agency!
                            </p>
                            <p className="mb-4 app-paragraph">
                                What happens when your website’s traffic suddenly starts to drop? Or the lead generation campaign you launched is nothing but a waste of time? Getting the first lead or driving traffic to your websites can be challenging– hack, you need a website to begin with!
                            </p>
                            <p className="mb-4 app-paragraph">
                                Meet Microters– your all-in-one digital marketing and development assistant. We help businesses, big or small, reach their potential customers and craft web tools catering to diverse business demands. Be it affiliate marketing, lead generation, or simply social media marketing, Microters has got your back.
                            </p>
                            <p className="mb-8 app-paragraph">
                                Our digital marketing and software development services are dedicated to meet your specific needs, from SEO and PPC marketing to SaaS development and website maintenance– and whatnot! Contact us today for a free professional consultation and find out how you can bump your business game.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <VideoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                youtubeId={YOUTUBE_ID}
            />
        </>
    );
};

export default AboutSection;