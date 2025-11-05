import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; 

const HeaderTop = () => {
  return (
    <div style={{backgroundColor: 'var(--color-secondary)'}} className="text-white px-5 py-3">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm">
          {/* Left Section: Collaboration Text */}
          <div className="flex-none text-center md:text-left">
            <p className="m-0 text-white">Want a collaboration?</p>
          </div>
          <div className="flex space-x-4 sm:space-x-6 justify-center md:justify-end items-center">
            {/* Email Link */}
            <a 
              href="mailto:info@microters.com" 
              className="text-white no-underline flex items-center"
            >
              <FaEnvelope className="mr-1.5 text-xs" /> 
              <span className="truncate">info@microters.com</span>
            </a>
            
            {/* Phone Link */}
            <a 
              href="tel:+8801625192766" 
              className="text-white no-underline flex items-center"
            >
              <FaPhoneAlt className="mr-1.5 text-xs" /> 
              <span>+880 162-519-2766</span>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;