"use client";

import React from "react";
import ProposalButton from "./ProposalButton";

const SVG_SHAPE_LEFT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1065' height='438' viewBox='0 0 1065 438' fill='none'%3E%3Ccircle opacity='0.4' cx='532.622' cy='532.622' r='532.137' transform='rotate(-94.3175 532.622 532.622)' fill='url(%23paint0_linear_523_5746)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_523_5746' x1='267.769' y1='107.836' x2='1219.94' y2='-203.415' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FDDFD7'/%3E%3Cstop offset='1' stop-color='%23FEEFEB' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";

const SVG_SHAPE_RIGHT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='395' height='265' viewBox='0 0 395 265' fill='none'%3E%3Ccircle opacity='0.4' cx='437.679' cy='-173.321' r='437.394' transform='rotate(54.7257 437.679 -173.321)' fill='url(%23paint0_linear_523_5747)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_523_5747' x1='219.98' y1='-522.477' x2='1002.62' y2='-778.312' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FDDFD7'/%3E%3Cstop offset='1' stop-color='%23FEEFEB' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";

const defaultTitle = <><strong>Let’s Make Things Happen!</strong></>;
const defaultDesc = "Join With One of the best digital marketing agencies—before your competitor does.";

// 2. Accept Props
const CtaSection = ({ 
  title = defaultTitle, 
  description = defaultDesc, 
  buttonText = "Request A Free Proposal", 
  buttonLink = "https://microters.com/send-a-proposal/" 
}) => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#feefeb]">
      {/* Shape 1 */}
      <div
        className="absolute w-[1100px] h-full pointer-events-none z-10 bg-no-repeat"
        style={{
          left: "140px",
          top: "30px",
          backgroundImage: `url("${SVG_SHAPE_LEFT}")`,
          backgroundSize: "contain",
        }}
      ></div>

      {/* Shape 2 */}
      <div
        className="absolute right-0 top-0 w-[314px] h-full pointer-events-none z-10 bg-no-repeat"
        style={{
          backgroundImage: `url("${SVG_SHAPE_RIGHT}")`,
          backgroundSize: "contain",
        }}
      ></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-10">
          
          {/* --- Left Column: Text (60% width) --- */}
          <div className="w-full lg:min-w-4/5 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#15151e] leading-tight">
              {title}
            </h2>
            
            {/* 3. CONDITIONAL DESCRIPTION */}
            {description && (
              <p className="mt-4 app-paragraph max-w-4xl">
                {description}
              </p>
            )}
          </div>

          {/* --- Right Column: Button (40% width) --- */}
          <div className="w-full lg:w-1/5 flex justify-center lg:justify-end">
            <ProposalButton href={buttonLink}>
              {buttonText}
            </ProposalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;