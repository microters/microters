"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
const ICON_SIZE = 84;
const SMALL_ARROW_SIZE = 16;
const CHECK_ICON_SIZE = 16;

const CheckIcon = (props) => <FaCheck {...props} />;
const SmallArrowIcon = (props) => <FaArrowUpRightFromSquare {...props} />;
const ButtonIcon = (props) => <FaArrowRight {...props} />;

const BrandCard = ({ brand }) => {
  return (
    <div className="relative h-72 overflow-visible"> 
      <Link
        href={brand.url}
        target="_blank"
        rel="nofollow noopener"
        className={`group/card absolute inset-x-0 bottom-0 w-full h-72 rounded-xl bg-[#eaebef] transition-[height,transform,background-color,box-shadow] duration-500 ease-out hover:h-[350px] hover:shadow-2xl hover:bg-[#f35d36] overflow-hidden`}
        style={{ transformOrigin: "bottom center", zIndex: 0 }}
      >
        {/* ---------- Default (collapsed) layer ---------- */}
        <div className="absolute inset-0 p-10 transition-all duration-300 ease-out group-hover/card:opacity-0 group-hover/card:-translate-y-5">
          <div className="absolute top-10 left-10">
            <Image
              src={brand.imageUrl}
              alt={brand.title}
              width={ICON_SIZE}
              height={ICON_SIZE}
              className="object-contain"
            />
          </div>

          <h3 className="absolute bottom-10 left-10 text-[40px] font-bold text-gray-800">
            {brand.title}
          </h3>

          <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full flex items-center justify-center border border-gray-400 text-gray-600">
            <SmallArrowIcon size={SMALL_ARROW_SIZE} />
          </div>
        </div>

        {/* ---------- Hover (expanded) layer ---------- */}
        <div className="absolute inset-0 flex flex-col p-10 text-white opacity-0 translate-y-5 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[40px] font-extrabold">{brand.title}</h3>
            <Image
              src={brand.imageUrl}
              alt={brand.title}
              width={ICON_SIZE}
              height={ICON_SIZE}
              className="object-contain"
            />
          </div>

          {/* Features list */}
          <div>
            <div className="space-y-3">
              {brand.features.map((feature, index) => (
                <div key={index} className="flex items-start text-white">
                  <span className="mr-2 pt-0.5 shrink-0">
                    <CheckIcon size={CHECK_ICON_SIZE} />
                  </span>
                  <span className="text-[16px] leading-snug font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <ButtonIcon size={24} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BrandCard;




