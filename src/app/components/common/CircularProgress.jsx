"use client";

import { useEffect, useState } from "react";

export const CircularProgress = ({ value, label, layers, percent, color = "#f35d36" }) => {
  const [animate, setAnimate] = useState(false);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getStrokeDashoffset = (p) => circumference - (p / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[180px] h-[180px]">
        {/* SVG Circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          
          {/* Background Track (Faint Line) */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* --- LOGIC: Multiple Layers OR Single Layer --- */}
          {layers ? (
            layers.map((layer, index) => (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={animate ? getStrokeDashoffset(layer.percent) : circumference}
                className="transition-all duration-1500 ease-out"
                style={{ opacity: layer.opacity }}
              />
            ))
          ) : (
            // 2. Render standard single circle if no layers provided
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animate ? getStrokeDashoffset(percent || value) : circumference}
              className="transition-all duration-1500 ease-out opacity-100"
            />
          )}
        </svg>

        {/* Centered Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          {value}{label === "Satisfied Clients" ? "+" : "%"}
        </div>
      </div>

      <p className="text-white text-lg font-medium text-center">
        {label}
      </p>
    </div>
  );
};