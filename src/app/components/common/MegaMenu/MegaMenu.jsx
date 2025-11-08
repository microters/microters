import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import MegaMenuItem from "./MegaMenuItem";
import { MegaMenuData } from "app/data/megaMenuData";
import Image from "next/image";

const getTextColorClass = (colorName) => {
  switch (colorName) {
    case "primary":
      return "[color:var(--color-primary)]";
    case "secondary":
      return "[color:var(--color-secondary)]";
    case "tertiary":
      return "[color:var(--color-tertiary)]";
    case "quaternary":
      return "[color:var(--color-quaternary)]";
    case "quinary":
      return "[color:var(--color-quinary)]";
    default:
      return "text-gray-900";
  }
};

const MegaMenu = ({ isVisible, isMobile, setIsVisible }) => {
  const isControlled = typeof setIsVisible === "function";

  if (!isVisible && !isMobile) return null;

  const bannerButtonClasses =
    "bg-[#f35d36] text-white px-5 py-4 text-base font-semibold rounded transition-colors duration-300 hover:bg-[#212c4a] shadow-md capitalize";
  const gridClasses = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8";

  return (
    <div
      className={`bg-white shadow-2xs pt-6 border-t border-gray-200 z-40 transition-opacity duration-300 rounded-b-xl overflow-hidden [box-shadow:0px_13px_34px_0px_rgba(0,0,0,0.35)] ${
        isMobile
          ? "relative shadow-none border-none pt-0"
          : "absolute lg:left-1/2 lg:-translate-x-1/2 top-20 w-full lg:max-w-[1400px]"
      }`}
      style={
        isMobile
          ? { height: "auto", opacity: 1 }
          : {
              width: "calc(100% - 0px)",
              maxWidth: "1400px",
              visibility: isVisible ? "visible" : "hidden",
              opacity: isVisible ? 1 : 0,
            }
      }
      onMouseEnter={isControlled ? () => setIsVisible(true) : undefined}
      onMouseLeave={isControlled ? () => setIsVisible(false) : undefined}
    >
      <div className="px-0 lg:px-4">
        <div className={gridClasses}>
          {MegaMenuData.map((col, colIndex) => (
            <div key={colIndex} className="col-span-1">
              {col.type === "banner" && (
                <div className="relative px-6 py-10 rounded-xl text-white h-[350px] lg:h-full lg:min-h-full xl:h-[350px] xl:min-h-[350px] flex flex-col justify-end overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={col.bannerBgPath}
                      alt="Banner Background"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="absolute top-5 lg:top-auto xl:top-5 lg:bottom-40 left-6 z-10 w-36 h-36">
                    <Image
                      src={col.imagePath}
                      alt={col.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="z-10 capitalize ">
                    <h3 className="text-2xl font-bold mb-2">{col.title}</h3>
                    <p className="text-sm text-gray-300 opacity-90 mb-6">
                      {col.description}
                    </p>
                    <Link href={col.buttonLink} className={bannerButtonClasses}>
                      {col.buttonText}
                    </Link>
                  </div>
                </div>
              )}
              {col.type === "links" &&
                col.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className={`${sectionIndex > 0 ? "mt-6" : ""}`}
                  >
                    <h4
                      className={`text-sm font-bold mb-3 border-b border-gray-200 pb-1 uppercase ${getTextColorClass(
                        section.titleColorName
                      )}`}
                    >
                      {section.title}
                    </h4>
                    <div>
                      {section.links.map((link, linkIndex) => (
                        <MegaMenuItem
                          key={linkIndex}
                          {...link}
                          iconBgClass={section.iconBgClass}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA Bar (Full width) */}
      <div className="mt-8 [background:linear-gradient(268.76deg,#f35d36_23.54%,#474799_61.46%)] px-5 py-7 text-white">
        <div
          className={`container flex flex-col sm:flex-row justify-between items-center text-sm capitalize font-bold`}
        >
          <p className="mb-2 sm:mb-0">
            Not sure where to start?{" "}
            <Link href="#" className="font-bold underline hover:text-primary">
              Chat with us
            </Link>
          </p>
          <div className="flex items-center gap-2 space-x-4">
            <p className="m-0">Free Guide</p>
            <Link
              href="tel:+8801625192766"
              className="font-bold hover:text-primary flex items-center"
            >
              <FaPhoneAlt className="mr-1.5 text-xs" />
              +880 162-519-2766
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
