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
      width={200} 
      height={100} 
      className="w-full h-auto"
      quality={100}
    />
  </div>
);

const IconLinkList = ({ title, links }) => (
  <div className="space-y-4">
    <h4 className="text-[22px] font-semibold text-white mb-[22px]">{title}</h4>
    <div className="flex flex-col space-y-2">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex items-center space-x-2 text-white hover:text-[#f35d36] transition-colors group text-base"
        >
          <FaCaretRight className="w-6 h-6 text-[#f35d36] group-hover:text-white transition-colors" />
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
    <footer className="bg-[#253153] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* --- Footer Top: Main Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About & Social Links (28%) */}
          <div className="lg:col-span-1 relative">
            <div
              className="absolute -right-5 -top-16 w-[250%] h-[155%] pointer-events-none"
              style={{
                background: "rgb(33 44 74 / 50%)",
              }}
            />
            {/* --- 2. THE CONTENT WRAPPER --- */}
            <div className="relative z-10 space-y-6">
              <SiteLogo />
              <p className="text-white text-base">
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
                      className="w-10 h-10 rounded-full bg-[#545f7d] flex items-center justify-center hover:bg-[#f35d36] transition-colors"
                      aria-label={`Link to social media ${Icon.name}`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </Link>
                  )
                )}
              </div>
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
            <h4 className="text-xl font-semibold text-white mb-[22px]">
              Contact Us
            </h4>

            {/* Contact Details (Media-Text layout) */}
            <div className="space-y-4">
              {/* Location 1 (Bangladesh) */}
              <div className="flex space-x-3 items-start">
                <Image
                  src={locationBdIcon}
                  alt="BD Location Icon"
                  width={20}
                  height={20}
                  className="w-6 h-6 shrink-0"
                />
                <p className="text-base text-white leading-snug">
                  <strong>BD:</strong> Khan Zaman Tower (5th Floor),
                  <br />
                  Holding No - 684/617, Jhautola 3500 Comilla.
                </p>
              </div>

              {/* Location 2 (USA) */}
              <div className="flex space-x-3 items-start">
                <Image
                  src={locationUsaIcon}
                  alt="USA Location Icon"
                  width={20}
                  height={20}
                  className="w-6 h-6 shrink-0"
                />
                <p className="text-base text-white leading-snug">
                  USA: 30 N Gould St Ste R Sheridan WY 82801, United States
                </p>
              </div>

              {/* Email */}
              <div className="flex space-x-3 items-center">
                <Image
                  src={emailIcon}
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="w-6 h-6 shrink-0"
                />
                <Link
                  href="mailto:info@microters.com"
                  className="text-base text-white hover:text-[#f35d36] transition-colors"
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
                  className="flex items-center bg-white rounded-full p-1"
                >
                  <input
                    type="email"
                    placeholder="Your email here"
                    className="w-full px-5 py-3 text-base bg-transparent text-slate-700 placeholder-slate-400 border-none focus:outline-none focus:ring-0 rounded-l-full"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <button
                    type="submit"
                    className="bg-[#f35d36] hover:bg-[#212c4a] text-white font-semibold py-3 px-8 rounded-full transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 pl-4">
                  Valid email is required.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Bottom: Copyright --- */}
      <div className="bg-[#212c4a] border-t border-white/10 py-4">
        <div className="container px-4 text-center">
          <p className="text-base text-white">
            Copyright © {new Date().getFullYear()} by Microters. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;