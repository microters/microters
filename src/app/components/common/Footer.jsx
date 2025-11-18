"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCaretRight
} from "react-icons/fa";
import { useForm } from "react-hook-form";

import microtersLogoImage from "../../../assets/images/footer_logo.png";
import locationBdIcon from "../../../assets/images/download-4.svg";
import locationUsaIcon from "../../../assets/images/download-5.svg";
import emailIcon from "../../../assets/images/download-6.svg";

const SiteLogo = () => (
  <div className="w-48 h-auto mb-4">
    <Image
      src={microtersLogoImage}
      alt="Microters Logo"
      width={80}
      height={80}
      className="w-full h-auto"
    />
  </div>
);

const IconLinkList = ({ title, links }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-semibold text-white mb-4">{title}</h4>
    <div className="flex flex-col space-y-2">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex items-center space-x-2 text-slate-300 hover:text-[#e06b4d] transition-colors group text-base"
        >
          <FaCaretRight className="w-5 h-5 text-[#f35d36] group-hover:text-white transition-colors" />
          <span>{link.title}</span>
        </Link>
      ))}
    </div>
  </div>
);

const menuLinks = {
  "Help & Support": [
    {
      title: "Send a Proposal",
      href: "https://microters.com/send-a-proposal/",
    },
    { title: "Privacy Policy", href: "https://microters.com/privacy-policy/" },
    { title: "Refund Policy", href: "https://microters.com/refund-policy/" },
    { title: "Disclaimer", href: "https://microters.com/disclaimer/" },
  ],
  Company: [
    { title: "About Us", href: "https://microters.com/about-us/" },
    { title: "Contact Us", href: "https://microters.com/contact-us/" },
    { title: "Our Team", href: "https://microters.com/our-team/" },
    {
      title: "Terms & Conditions",
      href: "https://microters.com/terms-conditions/",
    },
  ],
};

// --- Main Footer Component ---
const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscription = (data) => {
    console.log("Subscription submitted:", data.email);
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#212E4A] text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* --- Footer Top: Main Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: About & Social Links (28%) */}
          <div className="lg:col-span-1 space-y-6">
            <SiteLogo />

            <p className="text-slate-300 text-base">
              Welcome to Microters, your creative marketing partner. We turn
              vision into measurable success with innovative strategies and
              data-driven solutions.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-8 h-8 rounded-full bg-[#545f7d] flex items-center justify-center hover:bg-[#f35d36] transition-colors"
                    aria-label={`Link to social media ${Icon.name}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Column 2: Help & Support (17%) */}
          <div className="lg:col-span-1">
            <IconLinkList
              title="Help & Support"
              links={menuLinks["Help & Support"]}
            />
          </div>

          {/* Column 3: Company (17%) */}
          <div className="lg:col-span-1">
            <IconLinkList title="Company" links={menuLinks["Company"]} />
          </div>

          {/* Column 4: Contact Us & Subscription (38%) */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h4>

            {/* Contact Details (Media-Text layout) */}
            <div className="space-y-4">
              {/* Location 1 (Bangladesh) */}
              <div className="flex space-x-3 items-start">
                {/* FIX: Use imported image for icon */}
                <Image
                  src={locationBdIcon}
                  alt="BD Location Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <p className="text-sm text-slate-300 leading-snug">
                  <strong>BD:</strong> Khan Zaman Tower (5th Floor),
                  <br />
                  Holding No - 684/617, Jhautola 3500 Comilla.
                </p>
              </div>

              {/* Location 2 (USA) */}
              <div className="flex space-x-3 items-start">
                {/* FIX: Use imported image for icon */}
                <Image
                  src={locationUsaIcon}
                  alt="USA Location Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <p className="text-sm text-slate-300 leading-snug">
                  USA: 30 N Gould St Ste R Sheridan WY 82801, United States
                </p>
              </div>

              {/* Email */}
              <div className="flex space-x-3 items-center">
                {/* FIX: Use imported image for icon */}
                <Image
                  src={emailIcon}
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 shrink-0"
                />
                <Link
                  href="mailto:info@microters.com"
                  className="text-sm text-slate-300 hover:text-[#f35d36] transition-colors"
                >
                  info@microters.com
                </Link>
              </div>
            </div>

            {/* Email Subscription Form */}
            <div className="mt-6">
              {isSubscribed ? (
                <p className="text-green-400 text-sm font-semibold">
                  Thank you for subscribing!
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit(handleSubscription)}
                  className="flex space-x-2"
                >
                  <input
                    type="email"
                    placeholder="Your email here"
                    className="w-full p-3 text-base bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f35d36]"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <button
                    type="submit"
                    className="bg-[#f35d36] hover:bg-[#e0502c] text-white font-semibold py-3 px-6 rounded-lg transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  Valid email is required.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Bottom: Copyright --- */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            Copyright © 2024 by Microters. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
