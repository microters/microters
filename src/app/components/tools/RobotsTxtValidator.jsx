"use client";

import React, { useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaRobot,
  FaGlobe,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileCode,
  FaCopy,
  FaServer,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] appearance-none
`;

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px solid #f35d36" : "1px solid #d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #f35d36" : "none",
    borderRadius: "4px",
    padding: "6px",
    minHeight: "50px",
    "&:hover": { borderColor: "#f35d36" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#f35d36"
      : state.isFocused
      ? "#feefeb"
      : "white",
    color: state.isSelected ? "white" : "#15151e",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
  }),
};

// --- COMPONENT: LegendWrapper ---
const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const RobotsTxtValidator = () => {
  // --- STATE ---
  const [url, setUrl] = useState("");
  const [userAgent, setUserAgent] = useState({
    label: "Googlebot Smartphone",
    value: "Googlebot",
  });
  const [loading, setLoading] = useState(false);
  const [robotsTxt, setRobotsTxt] = useState("");
  const [statusCode, setStatusCode] = useState(null);

  // --- OPTIONS ---
  const userAgents = [
    { label: "Googlebot Smartphone", value: "Googlebot" },
    { label: "Bingbot", value: "Bingbot" },
    { label: "DuckDuckBot", value: "DuckDuckBot" },
    { label: "Mozilla/5.0 (Default)", value: "Mozilla/5.0" },
    { label: "YandexBot", value: "YandexBot" },
    { label: "Baiduspider", value: "Baiduspider" },
  ];

  // --- HANDLER ---
  const fetchRobotsTxt = async () => {
    if (!url.trim()) {
      toast.warning("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setRobotsTxt("");
    setStatusCode(null);

    try {
      const response = await fetch(
        `https://api.mhnazmul.com/api/robots-txt?url=${encodeURIComponent(
          url
        )}&userAgent=${encodeURIComponent(userAgent.value)}`
      );

      const data = await response.json();

      setRobotsTxt(data.robotsTxt || "No robots.txt file found.");
      setStatusCode(data.status || 0);

      if (data.status === 200) {
        toast.success("Robots.txt fetched successfully!");
      } else {
        toast.warning(`Fetched with status: ${data.status}`);
      }
    } catch (err) {
      console.error("Error fetching robots.txt:", err);
      toast.error("Failed to fetch. Please check the URL.");
      setStatusCode(500);
      setRobotsTxt("Error: Could not connect to the server or invalid URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (robotsTxt) {
      navigator.clipboard.writeText(robotsTxt);
      toast.success("Copied to clipboard!");
    }
  };

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300)
      return "text-green-600 border-green-200 bg-green-50";
    if (code >= 300 && code < 400)
      return "text-blue-600 border-blue-200 bg-blue-50";
    if (code >= 400 && code < 500)
      return "text-orange-600 border-orange-200 bg-orange-50";
    return "text-red-600 border-red-200 bg-red-50";
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-bold text-[#15151e] flex items-center gap-2">
              <FaRobot className="text-[#f35d36]" /> Configure Test
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* URL Input */}
              <LegendWrapper label="Website URL" icon={<FaGlobe />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </LegendWrapper>

              {/* User Agent Select */}
              <LegendWrapper label="User Agent" icon={<FaSearch />}>
                <Select
                  instanceId="user-agent-select"
                  options={userAgents}
                  value={userAgent}
                  onChange={setUserAgent}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </LegendWrapper>
            </div>

            {/* Test Button */}
            <button
              onClick={fetchRobotsTxt}
              disabled={loading}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <span className="animate-pulse">Fetching...</span>
              ) : (
                <>
                  <FaWandMagicSparkles /> Test Robots.txt
                </>
              )}
            </button>

            <div className="text-sm text-gray-500 mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="flex gap-2 items-start">
                <FaExclamationTriangle className="text-yellow-500 mt-0.5 shrink-0" />
                <span>
                  Ensure the URL includes <strong>http://</strong> or{" "}
                  <strong>https://</strong>. This tool fetches the live
                  robots.txt file.
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-7 lg:sticky lg:top-8 h-fit">
            {/* Header for Results */}
            <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
              <h3 className="text-[#15151e] font-bold text-xl flex items-center gap-2">
                Validation Results
              </h3>
              {statusCode && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(
                    statusCode
                  )}`}
                >
                  <FaServer /> Status: {statusCode}
                </span>
              )}
            </div>

            {/* Result Card (Styled like Essay Generator Output) */}
            {robotsTxt ? (
              <div className="group bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all relative shadow-sm">
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-[#feefeb] text-[#f35d36] rounded-full flex items-center justify-center font-bold text-sm">
                  <FaFileCode />
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 text-gray-400 hover:text-[#f35d36] transition-colors p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-[#f35d36]"
                  title="Copy Content"
                >
                  <FaCopy size={16} />
                </button>

                {/* Content */}
                <div className="pl-8 pt-4">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>Fetched as:</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {userAgent.value}
                    </span>
                  </div>
                  <pre className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-[500px] custom-scrollbar">
                    {robotsTxt}
                  </pre>
                </div>

                {/* Footer Status Helper */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" /> 200: Accessible
                  </span>
                  <span className="flex items-center gap-1">
                    <FaExclamationTriangle className="text-orange-500" />{" "}
                    403/404: Issues
                  </span>
                </div>
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 gap-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <FaRobot size={48} className="text-gray-300" />
                <p>Enter a URL and click Test to see results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RobotsTxtValidator;
