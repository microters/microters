"use client";

import React, { useState } from "react";
import {
  FaCopy,
  FaTrash,
  FaFont,
  FaHeading,
  FaTextHeight,
  FaArrowRight,
} from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import {
  TbLetterCaseUpper,
  TbLetterCaseLower,
  TbLetterCaseToggle,
} from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out resize-none custom-scrollbar
`;

// --- COMPONENTS ---
const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full h-full flex flex-col">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const ActionButton = ({ onClick, icon, label, active }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300
      ${
        active
          ? "border-[#f35d36] bg-[#feefeb] text-[#f35d36]"
          : "border-gray-100 bg-white text-gray-600 hover:border-[#f35d36] hover:text-[#f35d36] hover:-translate-y-1 hover:shadow-md"
      }
    `}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
  </button>
);

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [activeAction, setActiveAction] = useState("");

  // --- LOGIC ---
  const handleConversion = (type) => {
    if (!inputText) {
      toast.warning("Please enter some text first.");
      return;
    }

    let converted = "";
    switch (type) {
      case "upper":
        converted = inputText.toUpperCase();
        break;
      case "lower":
        converted = inputText.toLowerCase();
        break;
      case "sentence":
        converted = inputText
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "title":
        converted = inputText
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "alternating":
        converted = inputText
          .split("")
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join("");
        break;
      default:
        converted = inputText;
    }

    setResultText(converted);
    setActiveAction(type);
    toast.success(
      `${type.charAt(0).toUpperCase() + type.slice(1)} case applied!`
    );
  };

  const handleCopy = () => {
    if (!resultText) {
      toast.error("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(resultText);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInputText("");
    setResultText("");
    setActiveAction("");
    toast.info("Cleared all text.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* LEFT: Input Section */}
          <div className="flex flex-col gap-4">
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
                className={`${baseInputStyles} h-[300px] lg:h-[400px]`}
                placeholder="Type or paste your content here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </LegendWrapper>
          </div>

          {/* RIGHT: Controls & Output */}
          <div className="flex flex-col gap-6">
            {/* Conversion Buttons Grid */}
            <div>
              <h3 className="font-bold text-[#15151e] mb-3 flex items-center gap-2 px-1">
                <FaArrowRight className="text-[#f35d36]" /> Choose Conversion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ActionButton
                  label="UPPERCASE"
                  icon={<TbLetterCaseUpper />}
                  active={activeAction === "upper"}
                  onClick={() => handleConversion("upper")}
                />
                <ActionButton
                  label="lowercase"
                  icon={<TbLetterCaseLower />}
                  active={activeAction === "lower"}
                  onClick={() => handleConversion("lower")}
                />
                <ActionButton
                  label="Title Case"
                  icon={<FaHeading />}
                  active={activeAction === "title"}
                  onClick={() => handleConversion("title")}
                />
                <ActionButton
                  label="Sentence case"
                  icon={<FaTextHeight />}
                  active={activeAction === "sentence"}
                  onClick={() => handleConversion("sentence")}
                />
                <ActionButton
                  label="aLtErNaTiNg"
                  icon={<TbLetterCaseToggle />}
                  active={activeAction === "alternating"}
                  onClick={() => handleConversion("alternating")}
                />
              </div>
            </div>

            {/* Result Area */}
            <div className="flex flex-col gap-2 grow">
              <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-[#15151e] flex items-center gap-2">
                  <FaFont className="text-[#f35d36]" /> Result
                </h3>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm bg-[#15151e] text-white rounded-lg hover:bg-[#333] transition-colors flex items-center gap-2"
                >
                  <FaCopy /> Copy Result
                </button>
              </div>

              <div className="relative h-full min-h-[180px]">
                <textarea
                  readOnly
                  className={`${baseInputStyles} h-full bg-gray-50 text-[#15151e] font-medium border-gray-200`}
                  placeholder="Your converted text will appear here..."
                  value={resultText}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseConverter;
