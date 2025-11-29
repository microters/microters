"use client";

import React, { useState } from "react";
import {
  FaCopy,
  FaTrash,
  FaPenFancy,
  FaArrowRightArrowLeft,
} from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] resize-none
`;

const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full h-full flex flex-col">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const CursiveTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [cursiveText, setCursiveText] = useState("");

  // Mapping of regular characters to their cursive Unicode equivalents
  const toCursive = (text) => {
    const cursiveMap = {
      a: "𝒶",
      b: "𝒷",
      c: "𝒸",
      d: "𝒹",
      e: "𝑒",
      f: "𝒻",
      g: "𝑔",
      h: "𝒽",
      i: "𝒾",
      j: "𝒿",
      k: "𝓀",
      l: "𝓁",
      m: "𝓂",
      n: "𝓃",
      o: "𝑜",
      p: "𝓅",
      q: "𝓆",
      r: "𝓇",
      s: "𝓈",
      t: "𝓉",
      u: "𝓊",
      v: "𝓋",
      w: "𝓌",
      x: "𝓍",
      y: "𝓎",
      z: "𝓏",
      A: "𝒜",
      B: "𝐵",
      C: "𝒞",
      D: "𝒟",
      E: "𝐸",
      F: "𝐹",
      G: "𝒢",
      H: "𝐻",
      I: "𝐼",
      J: "𝒥",
      K: "𝒦",
      L: "𝐿",
      M: "𝑀",
      N: "𝒩",
      O: "𝒪",
      P: "𝒫",
      Q: "𝒬",
      R: "𝑅",
      S: "𝒮",
      T: "𝒯",
      U: "𝒰",
      V: "𝒱",
      W: "𝒲",
      X: "𝒳",
      Y: "𝒴",
      Z: "𝒵",
    };

    return text
      .split("")
      .map((char) => cursiveMap[char] || char)
      .join("");
  };

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to convert!");
      return;
    }
    setCursiveText(toCursive(inputText));
    toast.success("Cursive text generated successfully!");
  };

  const handleCopy = () => {
    if (!cursiveText) {
      toast.error("Nothing to copy! Generate cursive text first.");
      return;
    }
    navigator.clipboard.writeText(cursiveText);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInputText("");
    setCursiveText("");
    toast.info("Cleared.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* LEFT: Input Section */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-[#15151e] flex items-center gap-2">
                <MdTextFields className="text-[#f35d36]" /> Input Text
              </h3>
              <button
                onClick={handleClear}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <FaTrash /> Clear
              </button>
            </div>

            <LegendWrapper>
              <textarea
                className={`${baseInputStyles} h-64 lg:h-80`}
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </LegendWrapper>

            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-3 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <FaArrowRightArrowLeft /> Convert to Cursive
            </button>
          </div>

          {/* RIGHT: Output Section */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-[#15151e] flex items-center gap-2">
                <FaPenFancy className="text-[#f35d36]" /> Result
              </h3>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-sm bg-[#15151e] text-white rounded-lg hover:bg-[#333] transition-colors flex items-center gap-2"
              >
                <FaCopy /> Copy
              </button>
            </div>

            <div className="relative h-full">
              <div className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
                <span className="text-[#f35d36]">
                  <FaPenFancy />
                </span>{" "}
                Cursive Output
              </div>
              <textarea
                readOnly
                className={`${baseInputStyles} h-64 lg:h-80 bg-gray-50 border-gray-200 text-lg font-medium`}
                placeholder="Your cursive text will appear here..."
                value={cursiveText}
              ></textarea>
            </div>

            <div className="mt-auto py-3 text-center text-gray-400 text-sm">
              ✨ Use this text for social media, signatures, or creative
              projects.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CursiveTextGenerator;
