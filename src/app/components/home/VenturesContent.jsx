"use client";

import React from "react";
import AiBuster from "@assets/images/icons/AiBuster.png";
import Pluginic from "@assets/images/icons/Pluginic.png";
import Nomadic from "@assets/images/icons/Noamdicmarketers.png";
import Videoters from "@assets/images/icons/videoters.png";
import HybridBlog from "@assets/images/icons/Hybridblogging.png";
import Shopiters from "@assets/images/icons/Shopiters.png";
import BrandCard from "../common/BrandCard";
const Spacer = ({ height }) => <div style={{ height: height }}></div>;

const BRAND_DATA = [
    {
        id: 'aibuster',
        title: 'AI Buster',
        url: 'https://aibuster.com/',
        imageUrl: AiBuster,
        features: [
            '1K Articles in 1 Click',
            'Automatically Publish & Schedule.',
            'SEO Optimized Articles.',
        ],
    },
    {
        id: 'pluginic',
        title: 'Pluginic',
        url: 'https://pluginic.com/',
        imageUrl: Pluginic,
        features: [
            'WordPress Plugin Development',
            'WordPress Custom Projects',
            'Gutenberg Block Development',
        ],
    },
    {
        id: 'nomadic',
        title: 'Nomadic M.',
        url: 'https://nomadicmarketers.com/',
        imageUrl: Nomadic,
        features: [
            'Personalized SEO Packages',
            'On-Page, Off-Page SEO',
            'Link Building Service',
        ],
    },
    {
        id: 'videoters',
        title: 'Videoters',
        url: 'https://videoters.com/',
        imageUrl: Videoters,
        features: [
            'Explainer Video Editing',
            'SaaS Product Videos',
            'Promotional Videos',
        ],
    },
    {
        id: 'hybridblog',
        title: 'Hybrid Blog',
        url: 'https://hybridblogging.com/',
        imageUrl: HybridBlog,
        features: [
            'Programmatic SEO Blogging',
            'CSV Data To Articles',
            'Million Articles Within a Short Time',
        ],
    },
    {
        id: 'shopiters',
        title: 'Shopiters',
        url: 'https://shopiters.com/',
        imageUrl: Shopiters,
        features: [
            'Shopify SEO',
            'Shopify Development',
            'Shopify Migration',
        ],
    },
];

const VenturesContent = () => {
    return (
        <section className="px-5">
            <div className="container relative z-10">
                {/* Brand Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 -mt-28">
                    {BRAND_DATA.map(brand => (
                        <BrandCard key={brand.id} brand={brand} />
                    ))}
                </div>

                <Spacer height="18px" />
            </div>
        </section>
    );
};

export default VenturesContent;