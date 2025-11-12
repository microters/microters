import { FaCheck, FaChevronRight, FaQuoteLeft, FaInfoCircle } from 'react-icons/fa'; 

export const CheckIcon = FaCheck;
export const ArrowIcon = FaChevronRight;
export const QuoteIcon = FaQuoteLeft;
export const InfoIcon = FaInfoCircle;

import localLaptop from "@assets/images/projects/LOCAL_LAPTOP.png";
import shopifyBoost from "@assets/images/projects/SHOPIFY_BOOST.jpg";
import doppcall from "@assets/images/projects/DOPPCALL.jpg";
import aiAutoBlogging from "@assets/images/projects/ai-auto-blogging.jpeg";
import haroIcecartel from "@assets/images/projects/haro-link-sample.jpg";
import haroLinkBuilding from "@assets/images/projects/Haro-sample-link.jpg";
import shopifyStore from "@assets/images/projects/ai-auto-blogging-1.jpg";
import aiArticles from "@assets/images/projects/shopify-SEO.jpg";
import nicheAdsense from "@assets/images/projects/NICHE_ADSENSE.png";
import nicheAdsense1 from "@assets/images/projects/NICHE_ADSENSE-1.png";


const IMAGE_ASSETS = {
    LOCAL_LAPTOP: localLaptop,
    SHOPIFY_BOOST: shopifyBoost,
    DOPPCALL: doppcall,
    HARO_ICECARTEL: haroIcecartel,
    AI_ARTICLES: aiAutoBlogging,
    NICHE_ADSENSE: nicheAdsense,
    HARO_LINK_BUILDING: haroLinkBuilding,
    SHOPIFY_STORE: shopifyStore,
    AI_ARTICLES_2: aiArticles,
    NICHE_ADSENSE_2: nicheAdsense1,
};


export const PROJECT_TABS = [
    { title: "SEO", key: "seo" },
    { title: "Development", key: "development" },
    { title: "Link Building", key: "link_building" },
    { title: "AI and Writing", key: "ai_writing" },
    { title: "Off Page", key: "off_page" },
];

export const PROJECT_SLIDES = {
    seo: [
        {
            subtitle: "E-Commerce SEO Project",
            title: "Local Laptop Business Zero to 225K Monthly Organic Traffic!",
            image: IMAGE_ASSETS.LOCAL_LAPTOP,
            review: { title: "Client Review", desc: "Microters’ expertise boosted our local laptop business to 225K monthly organic traffic, with a significant 40K increase in just months. We are extremely pleased with the results!" },
            details: { title: "Project Details", desc: "From zero to 225K organic local traffic. We helped a local laptop sales and repair company rank on Google with keyword optimization, quality backlinks, and technical SEO. Within months, they saw a boost of 40K organic traffic per month." },
        },
        {
            subtitle: "Ben Melavila",
            title: "Boost Shopify Store €800 To €325K With 1.3 Million Organic Traffic",
            image: IMAGE_ASSETS.SHOPIFY_BOOST,
            review: { title: "Client Review", desc: "I’m truly impressed with the outcome. My Shopify store’s sales saw a remarkable increase from €800 To €325K, thanks to their exceptional work. Their team is reliable and professional, and they delivered exactly as promised. I’m delighted with the results and would recommend their services to anyone seeking online business growth!" },
            details: { title: "Project Details", desc: "In this Shopify SEO case study, we helped a Shopify store increase sales from €800 To €325K by attracting 1.3 million visitors and getting 48,000 orders within just 6 months. We did this by publishing lots of helpful articles and getting other websites to mention and link to our client’s store. If you want to do the same for your Shopify store, just get in touch with us. We’d love to help you too!" },
        },
    ],
    development: [
        {
            subtitle: "Telephone Billing Services",
            title: "DOPPCALL: Pay Per Call Advertising Platform",
            image: IMAGE_ASSETS.DOPPCALL,
            review: { title: "Client Review", desc: "Working with Microters has been an absolute pleasure. Their expertise in software development is evident in the exceptional solutions they’ve provided for our business. Their team’s dedication to delivering high-quality, user-friendly software is commendable." },
            details: { title: "Project Overview", desc: "We developed a versatile system where users can effortlessly sign up as publishers or advertisers. Super admins and managers can oversee all activities from their admin dashboard, including adjusting publisher payments and enabling publishers to request activation of offers for promotion and earnings." },
        },
        {
            subtitle: "Software Development",
            title: "AI Auto Blogging One Click Articles Generate",
            image: IMAGE_ASSETS.AI_ARTICLES,
            review: { title: "Client Review", desc: "I’m delighted with the results. By publishing 30,000 AI-optimized articles on our WordPress site, we attracted an impressive 1.2 million in traffic. Even more exciting, we successfully sold the site to MotionInvest for $22,000. This project proves that smart content and SEO can lead to incredible success in the digital world." },
            details: { title: "Project Details", desc: "In this project, we published 30,000 AI-optimized articles on our WordPress site. This effort resulted in a whopping 1.2 million in traffic. Eventually, Client successfully sold the site to MotionInvest for $22,000. It’s proof that strategic content and SEO can yield incredible results in the digital world." },
        },
    ],
    link_building: [
         {
            subtitle: "HARO Backlink Campaign",
            title: "Got High DR80+ Links By HARO Link building Campaigns For Icecartel.com",
            image: IMAGE_ASSETS.HARO_ICECARTEL,
            review: { title: "Client Review", desc: "Working with Microters on a HARO link-building campaign for one of my websites was impressive. They delivered DR 70+ backlinks from Express.co.uk, Lifewire, and other top sites within the agreed timeframe. Their team’s expertise and communication skills made the entire process smooth and effective. I’m thrilled with the results!" },
            details: { title: "Project Details", desc: "To obtain high DR70+ backlinks for Adsellr.com using a HARO (Help a Reporter Out) link-building strategy. Achievement of backlinks on Express.co.uk, Lifewire, Yahoo, Gobankingrates, AOL, and over 10 other leading authority websites. The campaign spanned four months to secure these valuable backlinks." },
        },
        {
            subtitle: "HARO Backlink Campaign",
            title: "Got High DR70+ Links By HARO Link building Campaigns For Adsellr.com",
            image: IMAGE_ASSETS.HARO_LINK_BUILDING, 
            review: { title: "Client Review", desc: "I engaged Microters for a HARO link-building campaign for my website, and the results were exceptional. In just four months, they secured high DR 80+ backlinks on influential sites like Yahoo, Gobankingrates, and AOL. Their professionalism and dedication exceeded my expectations, and I highly recommend their services." },
            details: { title: "Project Details", desc: "To acquire high DR80+ backlinks for Icecartel.com through a HARO (Help a Reporter Out) link-building campaign. Successful placement of backlinks on Yahoo, Gobankingrates, AOL, and more than 10 other top authority websites. A 4-month campaign was conducted to secure these high-quality backlinks." },
        },
    ],
    ai_writing: [
         {
            subtitle: "AI Articles",
            title: "30K SEO Optimized AI Articles and 1.2 million Organic Traffic Within 8 Months",
            image: IMAGE_ASSETS.AI_ARTICLES,
            review: { title: "Client Review", desc: "I’m truly impressed with the outcome. My Shopify store’s sales saw a remarkable increase from €800 To €325K, thanks to their exceptional work. Their team is reliable and professional, and they delivered exactly as promised. I’m delighted with the results and would recommend their services to anyone seeking online business growth!" },
            details: { title: "Project Details", desc: "In this Shopify SEO case study, we helped a Shopify store increase sales from €800 To €325K by attracting 1.3 million visitors and getting 48,000 orders within just 6 months. We did this by publishing lots of helpful articles and getting other websites to mention and link to our client’s store. If you want to do the same for your Shopify store, just get in touch with us. We’d love to help you too!" },
        },
        {
            subtitle: "Shopify Store AI Content",
            title: "Boost Shopify Store €800 To €325K With 1.3 Million Organic Traffic",
            image: IMAGE_ASSETS.SHOPIFY_BOOST,
            review: { title: "Client Review", desc: "As the project owner, I’m delighted with the results. By publishing 30,000 AI-optimized articles on our WordPress site, we attracted an impressive 1.2 million in traffic. Even more exciting, we successfully sold the site to MotionInvest for $22,000. This project proves that smart content and SEO can lead to incredible success in the digital world" },
            details: { title: "Project Details", desc: "In this project, we published 30,000 AI-optimized articles on our WordPress site. This effort resulted in a whopping 1.2 million in traffic. Eventually, we successfully sold the site to MotionInvest for $22,000. It’s proof that strategic content and SEO can yield incredible results in the digital world." },
        },
    ],
    off_page: [
         {
            subtitle: "Niche Website",
            title: "From zero, we have achieved 1.14 million traffic",
            image: IMAGE_ASSETS.NICHE_ADSENSE,
            review: { title: "Client Review", desc: "As the project owner, I’m delighted with the results. By publishing 30,000 AI-optimized articles on our WordPress site, we attracted an impressive 1.2 million in traffic. Even more exciting, we successfully sold the site to MotionInvest for $22,000. This project proves that smart content and SEO can lead to incredible success in the digital world" },
            details: { title: "Project Details", desc: "In this project, we published 30,000 AI-optimized articles on our WordPress site. This effort resulted in a whopping 1.2 million in traffic. Eventually, we successfully sold the site to MotionInvest for $22,000. It’s proof that strategic content and SEO can yield incredible results in the digital world." },
        },
        {
            subtitle: "Adsense Niche Website",
            title: "From zero, we have reached 224k traffic",
            image: IMAGE_ASSETS.NICHE_ADSENSE,
            review: { title: "Client Review", desc: "Microters’ expertise boosted our local laptop business to 225K monthly organic traffic, with a significant 40K increase in just months. We are extremely pleased with the results!" },
            details: { title: "Project Details", desc: "From zero to 225K organic local traffic. We helped a local laptop sales and repair company rank on Google with keyword optimization, quality backlinks, and technical SEO. Within months, they saw a boost of 40K organic traffic per month." },
        },
    ],
};

export const SERVICES_BG_SHAPE = "url('data:image/svg+xml,%3Csvg width=\"701\" height=\"1479\" viewBox=\"0 0 701 1479\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M700.362 560.873L330.922 99.7362C81.8626 220.979 -209.745 655.172 71.4849 1133.93C159.694 1023.05 281.11 960.869 314.318 940.144C219.676 769.368 274.884 594.724 314.318 528.748C365.168 592.306 488.66 745.949 575.831 852.062C678.776 936.621 780.614 887.295 818.665 852.062C861.559 799.558 974.743 661.39 1084.33 528.748C1162.16 703.877 1137.25 831.337 1084.33 952.579C1169.01 986.569 1276.66 1086.95 1319.9 1132.89C1625.41 627.193 1282.54 214.761 1065.65 98.7L700.362 560.873Z\" fill='%231E2843'/%3E%3Cpath d=\"M287.955 347.068L31.4493 144.89C-25.5085 294.912 7.71693 480.225 31.4493 554.129L287.955 347.068Z\" fill='%231E2843'/%3E%3Cpath d=\"M698.286 1479C952.327 1479 1144.52 1342.9 1208.86 1274.86C1155.93 1186.43 943.195 1009.57 698.286 1009.57C416.848 1009.57 237.179 1186.43 182.524 1274.86C248.594 1342.9 444.245 1479 698.286 1479Z\" fill='%231E2843'/%3E%3C/svg%3E')";