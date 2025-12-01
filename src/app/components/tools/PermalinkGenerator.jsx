"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeading, FaLink, FaCopy, FaCheck } from "react-icons/fa6";

// --- STYLES (Consistent with your Design System) ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
`;

const readOnlyInputStyles = `
  w-full bg-gray-50 border border-gray-200 rounded-[4px] px-4 py-3 text-gray-500
  focus:outline-none cursor-not-allowed min-h-[50px] font-mono text-sm
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

const PermalinkGenerator = () => {
  const [title, setTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [existingPermalinks, setExistingPermalinks] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const generateSlug = (inputTitle) => {
    // Logic from your original code
    const baseSlug = inputTitle
      .trim()
      .toLowerCase()
      .replace(/[0-9+]/g, "") // Remove numbers and '+'
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, "") // Remove non-alphanumeric except hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    let uniqueSlug = baseSlug;
    let counter = 1;

    // Ensure uniqueness based on local history
    while (existingPermalinks.includes(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  };

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);
    const uniqueSlug = generateSlug(inputTitle);
    setPermalink(uniqueSlug);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (permalink) {
      setExistingPermalinks((prev) => [...prev, permalink]);
      navigator.clipboard.writeText(permalink);
      setIsCopied(true);
      toast.success("Permalink copied to clipboard!");

      // Reset icon after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      toast.error("Please enter a title first.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="space-y-8">
          {/* Title Input */}
          <LegendWrapper label="Post Title" icon={<FaHeading />}>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. 10 Best SEO Tips for 2025"
              className={baseInputStyles}
            />
          </LegendWrapper>

          {/* Permalink Output */}
          <div className="relative">
            <LegendWrapper label="Generated Slug" icon={<FaLink />}>
              <input
                type="text"
                value={permalink}
                readOnly
                placeholder="generated-slug-appears-here"
                className={readOnlyInputStyles}
              />
            </LegendWrapper>

            {/* Quick Copy Action inside input area */}
            {permalink && (
              <div className="absolute top-4 right-3 text-xs text-gray-400">
                {permalink.length} chars
              </div>
            )}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`w-full font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ${
              isCopied
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-[#f35d36] hover:bg-[#d64d29] text-white"
            }`}
          >
            {isCopied ? (
              <>
                <FaCheck /> Copied!
              </>
            ) : (
              <>
                <FaCopy /> Copy Permalink
              </>
            )}
          </button>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Automatically removes numbers and special characters for
            SEO-friendly URLs.
          </p>
        </div>
      </div>
    </>
  );
};

export default PermalinkGenerator;
