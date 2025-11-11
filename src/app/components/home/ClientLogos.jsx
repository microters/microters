"use client";
import React from 'react';
import Image from 'next/image';
import guestbirdairtravel from "@assets/images/clients/guestbirdairtravel.jpg";
import flowzai from "@assets/images/clients/flowzai.png";
import barndominiumlife from "@assets/images/clients/barndominiumlife.png";
import spamburner from "@assets/images/clients/spamburner.png";
import truneb from "@assets/images/clients/truneb.png";
import clippingfly from "@assets/images/clients/Clippingfly.png";
import computerzonebd from "@assets/images/clients/comupterzonebd.png";
import keydirect from "@assets/images/clients/keydirect.png";

// --- 2. Data Definition and Constants ---
const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 80;
const BORDER_COLOR = '#D4D7DF';
const TOTAL_COLUMNS = 4;

export const CLIENT_LOGOS = [
    { url: guestbirdairtravel, alt: "Guest Bird Air Travel" },
    { url: flowzai, alt: "Flowzai" },
    { url: barndominiumlife, alt: "Barndominium Life" },
    { url: spamburner, alt: "SpamBurner" },
    // Row 2
    { url: truneb, alt: "TruNeb" },
    { url: clippingfly, alt: "Clipping Fly" },
    { url: computerzonebd, alt: "Computer Zone" },
    { url: keydirect, alt: "Keys Direct" },
];

const ClientsLogosSection = () => {

    // --- RENDER LOGO ITEM ---
    const renderLogoItem = (logo, index) => {
        const isTopRow = index < TOTAL_COLUMNS;
        const isLastColumn = (index + 1) % TOTAL_COLUMNS === 0;

        // Apply borders based on position
        const horizontalBorder = isTopRow ? `sm:border-b` : ''; 
        const verticalBorder = !isLastColumn ? `sm:border-r` : '';

        const borderClasses = `${horizontalBorder} ${verticalBorder}`;

        return (
            <div 
                key={index} 
                className={`flex items-center justify-center p-4 h-full min-h-[120px] ${borderClasses}`}
                style={{
                    minHeight: '120px', 
                    boxSizing: 'border-box',
                    borderColor: BORDER_COLOR,
                }}
            >
                <Image
                    src={logo.url}
                    alt={logo.alt}
                    width={LOGO_WIDTH}
                    height={LOGO_HEIGHT}
                    className={`object-contain w-auto max-w-full h-auto`}
                />
            </div>
        );
    };

    return (
        <section className="alignfull py-16 md:py-[100px] px-5 bg-white text-gray-800">
            <div className="container">
                
                {/* Section Header */}
                <h2 className="text-4xl md:text-5xl lg:text-[72px] font-extrabold mb-4 leading-tight text-gray-800">
                    <strong className="font-extrabold">Clients</strong> We’ve Worked with
                </h2>

                {/* Sub-Text */}
                <div className="max-w-4xl mb-10">
                    <p className="text-lg lg:text-xl text-(--color-text-paragraph)">
                        See for yourself! Our portfolio showcases the success stories of those who trusted us. Join the ranks of satisfied clients who’ve witnessed remarkable growth.
                    </p>
                </div>

                {/* --- LOGO GRID CONTAINER --- */}
                <div 
                    className="grid grid-cols-2 sm:grid-cols-4"
                    style={{ borderColor: BORDER_COLOR }}
                >
                    {CLIENT_LOGOS.map((logo, index) => renderLogoItem(logo, index))}
                </div>

            </div>
        </section>
    );
};

export default ClientsLogosSection;