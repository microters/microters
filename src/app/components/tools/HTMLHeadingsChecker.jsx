"use client";

import React, { useState } from "react";
import { FaCheckCircle, FaCircleNotch, FaCode, FaHeading, FaLink, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[60px] text-lg
`;

const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const HeadingStatCard = ({ tag, count }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#f35d36] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group">
    <div className="w-10 h-10 rounded-full bg-[#feefeb] text-[#f35d36] flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
      {tag}
    </div>
    <div className="text-3xl font-bold text-[#15151e] mb-1">{count}</div>
    <div className="text-xs text-gray-400 uppercase tracking-wider">Found</div>
  </div>
);

const HTMLHeadingsChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [headingsCount, setHeadingsCount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.warning("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setHeadingsCount(null);

    try {
      const response = await fetch(
        "https://api.mhnazmul.com/api/headings-checker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setHeadingsCount(data.headingsCount);
      toast.success("Headings analyzed successfully!");
    } catch (err) {
      console.error("Error fetching headings:", err);
      toast.error("Failed to analyze URL. Please check the link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10 max-w-4xl mx-auto">
        {/* --- INPUT SECTION --- */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full">
                <LegendWrapper label="Target URL" icon={<FaLink />} required>
                  <input
                    type="text"
                    className={baseInputStyles}
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </LegendWrapper>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto h-[60px] px-8 bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer min-w-40"
              >
                {loading ? (
                  <FaCircleNotch className="animate-spin" />
                ) : (
                  <FaSearch />
                )}
                {loading ? "Checking..." : "Check"}
              </button>
            </div>
          </form>
        </div>

        {/* --- RESULTS SECTION --- */}
        {headingsCount && (
          <div className="mt-12 pt-10 border-t border-gray-200 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[#15151e] font-bold text-xl flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Analysis Results
              </h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <FaCode /> {url.replace(/^https?:\/\//, "").split("/")[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <HeadingStatCard tag="H1" count={headingsCount.h1} />
              <HeadingStatCard tag="H2" count={headingsCount.h2} />
              <HeadingStatCard tag="H3" count={headingsCount.h3} />
              <HeadingStatCard tag="H4" count={headingsCount.h4} />
              <HeadingStatCard tag="H5" count={headingsCount.h5} />
              <HeadingStatCard tag="H6" count={headingsCount.h6} />
            </div>

            {/* SEO Tip based on H1 */}
            <div
              className={`mt-6 p-4 rounded-lg border-l-4 text-sm ${
                headingsCount.h1 === 1
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-orange-50 border-orange-500 text-orange-700"
              }`}
            >
              <strong>SEO Tip:</strong>{" "}
              {headingsCount.h1 === 1
                ? "Great job! Having exactly one H1 tag is excellent for SEO."
                : headingsCount.h1 === 0
                ? "Warning: No H1 tag found. Search engines use H1 to understand the main topic."
                : "Warning: Multiple H1 tags found. It is generally recommended to have only one unique H1 per page."}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!headingsCount && !loading && (
          <div className="text-center text-gray-400 py-8">
            <p>Enter a URL above to see the breakdown of heading tags.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HTMLHeadingsChecker;
