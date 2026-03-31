"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  FaBars,
  FaChevronDown,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";
import microtersLogo from "@assets/images/MicrotersLogo.png";
import MegaMenu from "./MegaMenu/MegaMenu";

const HeaderMain = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
      id: "about",
      type: "about",
    },
    {
      name: "Tools",
      href: "/tools",
      hasMegaMenu: true,
      id: "tools",
      type: "tools",
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact-us" },
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
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-6 m-0 relative">
                {session ? (
                  // LOGGED IN STATE
                  <div className="relative">
                    {/* Avatar Button */}
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center focus:outline-none"
                    >
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-[#f35d36] cursor-pointer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#f35d36] text-white flex items-center justify-center font-bold text-lg border-2 border-[#f35d36] cursor-pointer">
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        {/* User Header */}
                        <div className="px-4 py-3 border-b border-gray-100 mb-2">
                          <p className="text-sm font-bold text-[#212c4a] truncate">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="flex flex-col">
                          {/* <Link
                            href="/dashboard/profile"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f35d36] flex items-center gap-3 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaUser className="w-4 h-4" /> View Profile
                          </Link> */}

                          <Link
                            href="/dashboard"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f35d36] flex items-center gap-3 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaThLarge className="w-4 h-4" /> Dashboard
                          </Link>

                          {/* <Link
                            href="/dashboard/settings"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f35d36] flex items-center gap-3 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaCog className="w-4 h-4" /> Settings
                          </Link> */}

                          {/* Logout Button */}
                          <button
                            onClick={() => signOut()}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left mt-2 border-t border-gray-100 transition-colors"
                          >
                            <FaSignOutAlt className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // LOGGED OUT STATE: Show Login Link
                  <Link
                    href="/login"
                    className="font-medium text-[#212c4a] hover:text-[#f35d36] transition-colors"
                  >
                    Login
                  </Link>
                )}

                <Link href="/send-a-proposal" className={buttonClasses}>
                  Request A Quote
                </Link>
              </div>

              {/* Mobile Toggle Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    setOpenMobileMegaMenu(null);
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

      {/* Mobile Menu Panel */}
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
          <button
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none focus:ring-2 focus:ring-[#f35d36] p-2 rounded-md transition-colors"
          >
            <FaTimes className="w-6 h-6 text-[#212c4a]" />
          </button>
        </div>

        {/* Mobile Links Container */}
        <div className="px-5 overflow-y-auto h-[calc(100%-5rem)] pb-8">
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
                      setIsMenuOpen(false);
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

                {item.hasMegaMenu && (
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isCurrentMegaMenuOpen
                        ? "max-h-max opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <MegaMenu
                      isVisible={true}
                      isMobile={true}
                      type={item.type}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Mobile Bottom Actions */}
          <div className="pt-6 space-y-4">
            {session ? (
              <>
                {/* Mobile Dashboard Link */}
                <Link
                  href="/dashboard"
                  className="block w-full text-center py-3 text-lg font-medium text-[#212c4a] border border-[#212c4a] rounded hover:bg-[#212c4a] hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>

                {/* Mobile Logout Button */}
                <button
                  onClick={() => signOut()}
                  className="block w-full text-center py-3 text-lg font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center py-3 text-lg font-medium text-[#212c4a] border border-gray-200 rounded hover:border-[#f35d36] hover:text-[#f35d36] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}

            <Link
              href="/send-a-proposal"
              className={`block w-full text-center ${buttonClasses}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop MegaMenu Rendering */}
      {navItems
        .filter((item) => item.hasMegaMenu)
        .map((item) => (
          <MegaMenu
            key={`desktop-${item.id}`}
            isVisible={openDesktopMegaMenu === item.id}
            setIsVisible={setOpenDesktopMegaMenu}
            isMobile={false}
            type={item.type}
          />
        ))}
    </header>
  );
};

export default HeaderMain;
