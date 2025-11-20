"use client";

import React from "react";

const MapSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container px-4 max-w-7xl">
        <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117117.54027049728!2d91.176995!3d23.463237!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547ffff55287e9%3A0x78101e1c746f5ea4!2sMicroters!5e0!3m2!1sen!2sus!4v1763619271571!5m2!1sen!2sus"
            title="Google Map Location of Microters"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;