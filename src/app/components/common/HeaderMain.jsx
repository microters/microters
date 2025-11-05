'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import microtersLogo from "@assets/images/MicrotersLogo.png"; 

const HeaderMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Our Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];
  
  const buttonClasses = "btn-primary-custom text-white py-3 px-6 text-lg font-semibold no-underline rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f35d36] focus:ring-opacity-50";

  return (
    <header className="bg-white shadow-lg">
      <div className='px-5'>
         <div className="container">
         <div className="flex justify-between items-center h-20">
          
          {/* Left Section: Logo */}
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

          {/* Center Section: Desktop Navigation (Visible on large screens) */}
          <nav className="hidden lg:block h-full mr-0">
            <ul className="flex items-center space-x-8 m-0 p-0 h-full uppercase">
              {navItems.map((item) => (
                <li key={item.name} className="relative h-full flex items-center group">
                  <Link 
                    href={item.href} 
                    style={{color: 'var(--color-secondary)'}}
                    className="font-medium text-base no-underline transition-colors hover:text-[#f35d36] border-b-2 border-transparent group-hover:border-[#f35d36]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section: Request A Quote Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Desktop Button */}
            <div className="hidden lg:block mr-0"> 
              <Link href="https://microters.com/send-a-proposal/" className={buttonClasses}>
                Request A Quote
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-[#212c4a] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f35d36] transition-colors hover:text-[#f35d36]"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu Panel (Fully Responsive Dropdown) */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-white border-t border-gray-100 shadow-xl`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
          {/* Mobile Navigation Links */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium uppercase hover:bg-gray-100 transition-colors"
              style={{color: 'var(--color-secondary)'}}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Button - full width */}
          <div className="pt-4">
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
    </header>
  );
};

export default HeaderMain;