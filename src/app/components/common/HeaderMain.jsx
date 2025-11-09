"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import microtersLogo from "@assets/images/MicrotersLogo.png";
import MegaMenu from "./MegaMenu/MegaMenu";

const HeaderMain = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDesktopMegaMenu, setOpenDesktopMegaMenu] = useState(null); 
    const [openMobileMegaMenu, setOpenMobileMegaMenu] = useState(null); 

    const navItems = [
        {
            name: "Our Services",
            href: "/services",
            hasMegaMenu: true,
            id: "services",
            type: "services",
        },
        { 
            name: "About", 
            href: "/about", 
            hasMegaMenu: true,
            id: 'about',
            type: "about" 
        },
        { 
            name: "Tools", 
            href: "/tools", 
            hasMegaMenu: true,
            id: 'tools',
            type: "tools"
        },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const buttonClasses =
        "btn-primary-custom text-white py-3 px-6 text-lg font-semibold no-underline rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f35d36] focus:ring-opacity-50";

    return (
        <header className="relative top-0 z-50 bg-white border border-gray-200">
            <div className="px-5">
                <div className="container">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Section */}
                        <div className="shrink-0">
                            <Link href="/">
                                <Image
                                    src={microtersLogo}
                                    alt="microters logo"
                                    width={230}
                                    height={43}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Center Section: Desktop Navigation */}
                        <nav className="hidden lg:block h-full m-0">
                            <ul className="flex items-center space-x-8 m-0 p-0 h-full uppercase">
                                {navItems.map((item) => {
                                    const isCurrentMegaMenuOpen = openDesktopMegaMenu === item.id;
                                    
                                    if (item.hasMegaMenu) {
                                        return (
                                            <li
                                                key={item.name}
                                                className="h-full flex items-center"
                                                onMouseEnter={() => setOpenDesktopMegaMenu(item.id)}
                                                onMouseLeave={() => setOpenDesktopMegaMenu(null)}
                                            >
                                                <Link
                                                    href={item.href}
                                                    style={{ color: "var(--color-secondary)" }}
                                                    className="font-medium text-base no-underline transition-colors hover:text-[#f35d36] border-b-2 border-transparent hover:border-[#f35d36] pb-1 flex items-center"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {item.name}
                                                    {/* Desktop Chevron Icon */}
                                                    <FaChevronDown
                                                        className={`ml-1 transition-transform duration-300 w-3 h-3 ${
                                                            isCurrentMegaMenuOpen ? "rotate-180" : "rotate-0"
                                                        }`}
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li
                                            key={item.name}
                                            className="relative h-full flex items-center group"
                                        >
                                            <Link
                                                href={item.href}
                                                style={{ color: "var(--color-secondary)" }}
                                                className="font-medium text-base no-underline transition-colors hover:text-[#f35d36] border-b-2 border-transparent group-hover:border-[#f35d36] pb-1"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Right Section: Button & Mobile Toggle */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden lg:block m-0">
                                <Link
                                    href="https://microters.com/send-a-proposal/"
                                    className={buttonClasses}
                                >
                                    Request A Quote
                                </Link>
                            </div>

                            <div className="lg:hidden">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(!isMenuOpen);
                                        setOpenMobileMegaMenu(null); // Close any open sub-menus when opening main menu
                                    }}
                                    className="text-[#212c4a] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f35d36] transition-colors hover:text-[#f35d36]"
                                    aria-expanded={isMenuOpen}
                                >
                                    {isMenuOpen ? (
                                        <FaTimes className="w-6 h-6" />
                                    ) : (
                                        <FaBars className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel: Full-screen overlay to hold the inline links */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out lg:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } z-40`}
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center h-20 px-5 border-b border-gray-100">
                    <Link href="/">
                        <Image
                            src={microtersLogo}
                            alt="microters logo"
                            width={180}
                            height={34}
                            priority
                        />
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} className="focus:outline-none focus:ring-2 focus:ring-[#f35d36] p-2 rounded-md transition-colors">
                        <FaTimes className="w-6 h-6 text-[#212c4a]" />
                    </button>
                </div>

                {/* Mobile Links Container (Scrollable) */}
                <div className="px-5 overflow-y-auto h-[calc(100%-5rem)]">
                    {navItems.map((item) => {
                        const isCurrentMegaMenuOpen = openMobileMegaMenu === item.id;

                        return (
                            <React.Fragment key={item.name}>
                                <div
                                    className="py-3 text-base font-medium uppercase text-gray-700 hover:text-[#f35d36] transition-colors flex justify-between items-center cursor-pointer border-b border-gray-100"
                                    style={{ color: "var(--color-secondary)" }}
                                    onClick={() => {
                                        if (item.hasMegaMenu) {
                                            setOpenMobileMegaMenu(
                                                isCurrentMegaMenuOpen ? null : item.id
                                            );
                                        } else {
                                            setIsMenuOpen(false); // Close main menu for standard link
                                        }
                                    }}
                                >
                                    {item.name}
                                    {item.hasMegaMenu && (
                                        <FaChevronDown
                                            className={`w-3 h-3 transition-transform duration-300 ${
                                                isCurrentMegaMenuOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                        />
                                    )}
                                </div>

                                {/* Mobile Mega Menu Dropdown (Inline) */}
                                {item.hasMegaMenu && (
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isCurrentMegaMenuOpen
                                                ? "max-h-max opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {/* Pass the item's type to MegaMenu for data filtering */}
                                        <MegaMenu isVisible={true} isMobile={true} type={item.type} /> 
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                    <div className="pt-6">
                        <Link
                            href="https://microters.com/send-a-proposal/"
                            className={`block w-full text-center ${buttonClasses}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Request A Quote
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Desktop MegaMenu Rendering: Renders the correct menu based on hover state */}
            {navItems.filter(item => item.hasMegaMenu).map(item => (
                <MegaMenu
                    key={`desktop-${item.id}`}
                    isVisible={openDesktopMegaMenu === item.id}
                    setIsVisible={setOpenDesktopMegaMenu} // Setter passed to allow menu to manage closure
                    isMobile={false}
                    type={item.type}
                />
            ))}
        </header>
    );
};

export default HeaderMain;