"use client";

import React, { useState } from "react";
import {
  FaLink,
  FaExternalLinkAlt,
  FaClone,
  FaBan,
  FaSearch,
  FaGlobe,
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

const StatCard = ({
  title,
  count,
  subtitle,
  icon,
  active,
  onClick,
  colorClass,
}) => (
  <div
    onClick={onClick}
    className={`
            cursor-pointer p-6 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1
            ${
              active
                ? `border-[#f35d36] bg-[#feefeb]`
                : "border-gray-200 bg-white hover:border-gray-300"
            }
        `}
  >
    <div className={`text-3xl mb-2 ${colorClass}`}>{icon}</div>
    <h3 className={`text-3xl font-bold ${colorClass}`}>{count}</h3>
    <p className="text-gray-700 font-medium text-sm">{title}</p>
    <span className="text-xs text-gray-400">{subtitle}</span>
  </div>
);

const InternalLinkAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState({
    internalLinks: [],
    externalLinks: [],
    duplicateLinks: [],
    nofollowLinks: [],
  });
  const [view, setView] = useState("internal");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalLinks: 0,
    internalLinks: 0,
    externalLinks: 0,
    duplicateLinks: 0,
    nofollowCount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.warning("Please enter a valid URL.");
      return;
    }

    // Reset State
    setLinks({
      internalLinks: [],
      externalLinks: [],
      duplicateLinks: [],
      nofollowLinks: [],
    });
    setStats({
      totalLinks: 0,
      internalLinks: 0,
      externalLinks: 0,
      duplicateLinks: 0,
      nofollowCount: 0,
    });
    setLoading(true);

    try {
      // --- Using fetch instead of axios ---
      const response = await fetch("https://api.mhnazmul.com/api/internal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setLinks({
        internalLinks: data.internalLinks || [],
        externalLinks: data.externalLinks || [],
        duplicateLinks: data.duplicateLinks || [],
        nofollowLinks: data.nofollowLinks || [],
      });
      setStats({
        totalLinks: data.totalLinks || 0,
        internalLinks: data.internalLinks?.length || 0,
        externalLinks: data.externalLinks?.length || 0,
        duplicateLinks: data.duplicateLinks?.length || 0,
        nofollowCount: data.nofollowLinks?.length || 0,
      });
      setView("internal");
      toast.success("Analysis complete!");
    } catch (err) {
      console.error("Error fetching links:", err);
      toast.error(
        "Failed to analyze URL. Please check the URL or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to get current list based on view
  const getCurrentList = () => {
    switch (view) {
      case "external":
        return links.externalLinks;
      case "duplicate":
        return links.duplicateLinks;
      case "nofollow":
        return links.nofollowLinks;
      default:
        return links.internalLinks;
    }
  };

  const currentList = getCurrentList();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Input Form */}
        <form onSubmit={handleSubmit}>
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
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold px-6 rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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

        {/* Dashboard Stats */}
        {stats.totalLinks > 0 && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                title="Internal Links"
                count={stats.internalLinks}
                subtitle={`${
                  stats.totalLinks > 0
                    ? ((stats.internalLinks / stats.totalLinks) * 100).toFixed(
                        1
                      )
                    : 0
                }% of Total`}
                icon={<FaLink />}
                colorClass="text-green-600"
                active={view === "internal"}
                onClick={() => setView("internal")}
              />
              <StatCard
                title="External Links"
                count={stats.externalLinks}
                subtitle={`${
                  stats.totalLinks > 0
                    ? ((stats.externalLinks / stats.totalLinks) * 100).toFixed(
                        1
                      )
                    : 0
                }% of Total`}
                icon={<FaExternalLinkAlt />}
                colorClass="text-blue-600"
                active={view === "external"}
                onClick={() => setView("external")}
              />
              <StatCard
                title="Duplicate Links"
                count={stats.duplicateLinks}
                subtitle={`${
                  stats.totalLinks > 0
                    ? ((stats.duplicateLinks / stats.totalLinks) * 100).toFixed(
                        1
                      )
                    : 0
                }% of Total`}
                icon={<FaClone />}
                colorClass="text-orange-500"
                active={view === "duplicate"}
                onClick={() => setView("duplicate")}
              />
              <StatCard
                title="Nofollow Links"
                count={stats.nofollowCount}
                subtitle="Links with rel='nofollow'"
                icon={<FaBan />}
                colorClass="text-red-500"
                active={view === "nofollow"}
                onClick={() => setView("nofollow")}
              />
            </div>

            {/* Results Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-[#15151e] text-lg capitalize flex items-center gap-2">
                  {view === "internal" && <FaLink className="text-green-600" />}
                  {view === "external" && (
                    <FaExternalLinkAlt className="text-blue-600" />
                  )}
                  {view === "duplicate" && (
                    <FaClone className="text-orange-500" />
                  )}
                  {view === "nofollow" && <FaBan className="text-red-500" />}
                  {view.replace(/([A-Z])/g, " $1").trim()} List
                  <span className="text-gray-400 font-normal text-sm ml-2">
                    ({currentList.length} found)
                  </span>
                </h3>
              </div>

              <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
                        #
                      </th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Link URL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentList.map((link, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f35d36] hover:text-[#d64d29] hover:underline break-all flex items-center gap-2 group"
                          >
                            {link}
                            <FaExternalLinkAlt className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {currentList.length === 0 && (
                      <tr>
                        <td
                          colSpan="2"
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No links found in this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InternalLinkAnalyzer;
