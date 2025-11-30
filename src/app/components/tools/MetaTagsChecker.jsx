"use client";

import React, { useState } from "react";
import {
  FaSearch,
  FaGlobe,
  FaHeading,
  FaAlignLeft,
  FaTags,
  FaRobot,
  FaMobileAlt,
  FaUser,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
`;

// Helper Component for Result Rows
const ResultRow = ({ label, value, icon }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all duration-300 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="mt-1 p-2 bg-[#feefeb] text-[#f35d36] rounded-lg shrink-0">
        {icon}
      </div>
      <div className="w-full overflow-hidden">
        <h4 className="text-sm font-bold text-[#15151e] uppercase tracking-wide mb-1">
          {label}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed wrap-break-word font-medium">
          {value && value !== "Not Found" ? (
            value
          ) : (
            <span className="text-red-400 flex items-center gap-1 italic">
              <FaTimes size={12} /> Not Found
            </span>
          )}
        </p>
      </div>
    </div>
  </div>
);

const ResultSkeleton = () => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0"></div>
      <div className="w-full space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

const MetaTagsChecker = () => {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.warning("Please enter a valid URL");
      return;
    }

    setMetadata(null);
    setLoading(true);

    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`${proxyUrl}${encodedUrl}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the URL");
      }

      const result = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(result.contents, "text/html");

      const extractedData = {
        title: doc.querySelector("title")?.textContent || "Not Found",
        description:
          doc.querySelector("meta[name='description']")?.content || "Not Found",
        keywords:
          doc.querySelector("meta[name='keywords']")?.content || "Not Found",
        robots:
          doc.querySelector("meta[name='robots']")?.content || "Not Found",
        viewport:
          doc.querySelector("meta[name='viewport']")?.content || "Not Found",
        author:
          doc.querySelector("meta[name='author']")?.content || "Not Found",
      };

      setMetadata(extractedData);
      toast.success("Meta tags analyzed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch metadata. Check the URL or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 lg:p-10 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Input Section */}
        <form onSubmit={fetchMetadata}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaGlobe className="text-gray-400" />
            </div>
            <input
              type="url"
              className={`${baseInputStyles} pl-12 pr-36 h-16 text-lg shadow-sm`}
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FaArrowRotateRight className="animate-spin" />
              ) : (
                <FaSearch />
              )}
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </form>

        {/* Loading State (Tailwind Skeleton) */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
            <div className="col-span-1 md:col-span-2 mb-2">
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
            </div>
            {[...Array(6)].map((_, i) => (
              <ResultSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Results Section */}
        {metadata && !loading && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 my-8">
              <h3 className="text-xl font-bold text-[#15151e]">
                Analysis Results
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold border border-green-200">
                <FaCheck className="inline mr-1" size={10} /> Success
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <ResultRow
                  icon={<FaHeading />}
                  label="Page Title"
                  value={metadata.title}
                />
              </div>

              <div className="md:col-span-2">
                <ResultRow
                  icon={<FaAlignLeft />}
                  label="Meta Description"
                  value={metadata.description}
                />
              </div>

              <ResultRow
                icon={<FaTags />}
                label="Keywords"
                value={metadata.keywords}
              />

              <ResultRow
                icon={<FaRobot />}
                label="Robots"
                value={metadata.robots}
              />

              <ResultRow
                icon={<FaMobileAlt />}
                label="Viewport"
                value={metadata.viewport}
              />

              <ResultRow
                icon={<FaUser />}
                label="Author"
                value={metadata.author}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MetaTagsChecker;
