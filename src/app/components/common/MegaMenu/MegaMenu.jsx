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

const MegaMenu = ({ isVisible, isMobile, setIsVisible, type = "services" }) => {
  const isControlled = typeof setIsVisible === "function";
  const closeMenu = () => {
    if (isControlled) {
      setIsVisible(null);
    }
  };

  if (!isVisible && !isMobile) return null;

  const filteredData = MegaMenuData.filter((item) => {
    if (type === "services") {
      return item.type === "banner" || item.type === "links";
    } else if (type === "about") {
      return item.type === "banner_about" || item.type === "links_about";
    } else if (type === "tools") {
      return item.type === "links_tools";
    }
    return true;
  });

  const bannerButtonClasses =
    "bg-[#f35d36] text-white px-5 py-4 text-base font-semibold rounded transition-colors duration-300 hover:bg-[#212c4a] shadow-md capitalize";

  const gridClasses =
    type === "about"
      ? "grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-5"
      : type === "tools"
      ? "grid gap-8 p-5"
      : "grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-5";

  const getFooterBackground = (menuType) => {
    const servicesGradient =
      "[background:linear-gradient(268.76deg,#f35d36_23.54%,#474799_61.46%)]";
    const aboutGradient =
      "[background:linear-gradient(268.76deg,rgb(248,135,72)_23%,rgb(250,110,31)_61%)]";

    if (menuType === "about") {
      return aboutGradient;
    }
    return servicesGradient;
  };

  return (
    <div
      className={`bg-white shadow-2xs border-t border-gray-200 z-40 transition-opacity duration-300 rounded-b-xl overflow-hidden lg:[box-shadow:0px_13px_34px_0px_rgba(0,0,0,0.35)] ${
        isMobile
          ? "relative shadow-none pt-0 border border-gray-100"
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
      onMouseEnter={!isMobile && isControlled ? () => setIsVisible(type) : undefined}
      onMouseLeave={!isMobile && isControlled ? () => setIsVisible(null) : undefined}
    >
      <div>
        <div className={gridClasses}>
          {filteredData.map((col, colIndex) => (
            <div
                key={colIndex}
                className={`col-span-1 ${
                  col.type === "links_about" ? "lg:col-span-2" : ""
                } ${
                  col.type === "links_tools" ? "lg:col-span-4" : ""
                }`}
              >
              {(col.type === "banner" || col.type === "banner_about") && (
                <div
                  className={`relative px-6 py-10 rounded-xl flex flex-col overflow-hidden ${
                    col.type === "banner_about"
                      ? "text-gray-900 bg-gray-100 min-h-[350px] justify-center"
                      : "text-white h-[350px] lg:h-full lg:min-h-full xl:h-[350px] xl:min-h-[350px] justify-end"
                  }`}
                >
                  {col.type === "banner_about" && col.bannerBgPath && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={col.bannerBgPath}
                        alt="About Banner Background"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  {col.type === "banner" && (
                    <>
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
                    </>
                  )}
                  <div className="z-10 capitalize ">
                    <h3 className={`font-bold mb-2 text-xl`}>
                      {col.type === "banner_about" ? (
                        <div className="text-sm">
                          Hi. We're{" "}
                          <span className="text-[#f35d36]">Microters.</span>
                        </div>
                      ) : (
                        col.title
                      )}
                    </h3>
                    <p
                      className={`opacity-90 mb-6 ${
                        col.type === "banner_about"
                          ? "text-gray-700 text-[12px]"
                          : "text-gray-300 text-sm"
                      }`}
                    >
                      {col.description}
                    </p>
                    <Link href={col.buttonLink} className={bannerButtonClasses} onClick={closeMenu}>
                      {col.buttonText}
                    </Link>
                  </div>
                </div>
              )}

              {(col.type === "links" ||
                col.type === "links_about" ||
                col.type === "links_tools") && (
                <div className={`${col.type === "links" || col.type === "links_about"? "flex flex-col": ""} ${col.type === "links_about" ? "lg:flex-row lg:space-x-8" : ""}${col.type === "links_tools" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4": ""}`}
                >
               {col.sections.map((section, sectionIndex) => (
                 <div
                    key={sectionIndex} className={`${col.type === "links_about" ? "flex-1" : ""} ${col.type === "links_tools" ? "col-span-1" : ""} ${sectionIndex > 0 && col.type === "links" ? "mt-6" : ""} ${col.type === "links_tools" ? "mt-0" : ""} ${sectionIndex > 0 && col.type === "links_about" ? "mt-6 lg:mt-0": ""}`}
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
                            onClick={closeMenu}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA Bar (Full width) */}
      {type !== "tools" && (
      <div className={`mt-8 ${getFooterBackground(type)} px-5 py-7 text-white`}>
        <div
          className={`container flex flex-col sm:flex-row justify-between items-center text-sm capitalize font-bold`}
        >
          <p className="mb-2 sm:mb-0">
            Not sure where to start?{" "}
            <Link href="#" className="font-bold underline hover:text-primary" onClick={closeMenu}>
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
    )}
    </div>
  );
};

export default MegaMenu;
