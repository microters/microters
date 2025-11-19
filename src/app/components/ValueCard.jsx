import React from "react";

const ValueCard = ({ title, desc, icon }) => {
  return (
    <div className="relative z-10 mt-10">
      <div className="bg-[#212c4a] rounded-[10px] p-8 pt-16 h-full relative transition-transform duration-300 hover:-translate-y-2">
        {/* The Floating Icon */}
        <div className="absolute -top-10 left-8 w-20 h-20 bg-[#FDDFD7] rounded-[20px] flex items-center justify-center shadow-[0px_0px_24px_0px_rgba(0,0,0,0.12)]">
          <svg
            width="35"
            height="35"
            viewBox="0 0 71 71"
            fill="none"
            className="w-10 h-10"
          >
            {icon}
          </svg>
        </div>

        {/* Text Content */}
        <h4 className="text-white text-3xl font-bold mb-3">{title}</h4>
        <p className="text-[#eaebef] text-[16px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

export default ValueCard;
