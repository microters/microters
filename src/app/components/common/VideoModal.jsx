"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

const VideoModal = ({ isOpen, onClose, youtubeId }) => {
    if (!isOpen || !youtubeId) return null;

    const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;

    return (
        <div 
            className="fixed inset-0 z-9999 bg-black/90 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-4xl h-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute -top-10 right-0 p-2 focus:outline-none"
                    aria-label="Close video player"
                >
                    <IoClose className="w-6 h-6 fill-white hover:fill-gray-300 transition-colors" />
                </button>

                <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={YOUTUBE_EMBED_URL}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Video Player"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;