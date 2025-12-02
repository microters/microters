"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import {
  FaCircleNotch,
  FaDownload,
  FaLayerGroup,
  FaListUl,
  FaSearch,
  FaTag,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] appearance-none
`;

const LegendWrapper = ({ label, icon, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label}
    </label>
    {children}
  </div>
);

const KeywordsExplorer = () => {
  // --- STATE ---
  const [inputKeyword, setInputKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  // --- SEARCH HANDLER ---
  const handleSearch = async () => {
    if (!inputKeyword.trim()) {
      toast.warning("Please enter a valid keyword to search.");
      return;
    }

    setLoading(true);
    setClusters([]);
    setActiveTab("All");

    try {
      const response = await fetch(
        `https://api.mhnazmul.com/api/keywords/suggestions?keyword=${encodeURIComponent(
          inputKeyword
        )}&langCode=en`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Process & Unique Filter
      const uniqueKeywords = new Set();
      const uniqueClusters = [];

      data.clusters.forEach((cluster) => {
        const filteredKeywords = cluster.keywords.filter(
          (keyword) => !uniqueKeywords.has(keyword)
        );

        if (filteredKeywords.length > 0) {
          filteredKeywords.forEach((keyword) => uniqueKeywords.add(keyword));
          uniqueClusters.push({
            cluster: cluster.cluster,
            keywords: filteredKeywords,
          });
        }
      });

      if (uniqueClusters.length === 0) {
        toast.info("No keywords found for this query.");
      } else {
        setClusters(uniqueClusters);
        toast.success(`Found ${uniqueKeywords.size} keywords!`);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      toast.error("An error occurred while fetching suggestions.");
    } finally {
      setLoading(false);
    }
  };

  // --- DATA PREPARATION ---
  const allKeywords = clusters.flatMap((cluster) => cluster.keywords);

  const currentKeywords =
    activeTab === "All"
      ? allKeywords
      : clusters.find((c) => c.cluster === activeTab)?.keywords || [];

  // CSV Data
  const csvHeaders = [
    { label: "Keyword", key: "keyword" },
    { label: "Cluster", key: "cluster" },
    { label: "Word Count", key: "count" },
  ];

  const exportData =
    activeTab === "All"
      ? clusters.flatMap((cluster) =>
          cluster.keywords.map((keyword) => ({
            keyword,
            cluster: cluster.cluster,
            count: keyword.split(" ").length,
          }))
        )
      : currentKeywords.map((keyword) => ({
          keyword,
          cluster: activeTab,
          count: keyword.split(" ").length,
        }));

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* --- 1. SEARCH SECTION --- */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full">
              <LegendWrapper label="Enter Seed Keyword" icon={<FaTag />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  placeholder="e.g. digital marketing, keto diet..."
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </LegendWrapper>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full md:w-auto h-[50px] px-8 bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mb-0.5"
            >
              {loading ? (
                <FaCircleNotch className="animate-spin" />
              ) : (
                <FaSearch />
              )}
              {loading ? "Searching..." : "Explore"}
            </button>
          </div>
        </div>

        {/* --- 2. RESULTS SECTION --- */}
        {!loading && clusters.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
            {/* LEFT COLUMN: CLUSTER SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm h-full max-h-[600px] flex flex-col">
                <h3 className="font-bold text-[#15151e] mb-4 flex items-center gap-2 pb-3 border-b border-gray-100 text-lg">
                  <FaLayerGroup className="text-[#f35d36]" /> Clusters
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {clusters.length} Groups
                  </span>
                </h3>

                <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2 grow">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex justify-between items-center ${
                      activeTab === "All"
                        ? "bg-[#feefeb] text-[#f35d36] border border-[#f35d36] shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <span>All Keywords</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === "All"
                          ? "bg-[#f35d36] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {allKeywords.length}
                    </span>
                  </button>

                  {clusters.map((cluster, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(cluster.cluster)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex justify-between items-center ${
                        activeTab === cluster.cluster
                          ? "bg-[#feefeb] text-[#f35d36] border border-[#f35d36] shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <span className="truncate pr-2 capitalize">
                        {cluster.cluster}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                          activeTab === cluster.cluster
                            ? "bg-[#f35d36] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {cluster.keywords.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: KEYWORD TABLE */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                {/* Table Header Bar */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                  <h3 className="font-bold text-[#15151e] text-lg capitalize flex items-center gap-2">
                    <FaListUl className="text-gray-500" />
                    {activeTab === "All" ? "All Keywords" : activeTab}
                  </h3>

                  <CSVLink
                    data={exportData}
                    headers={csvHeaders}
                    filename={`${activeTab.replace(/\s+/g, "_")}_keywords.csv`}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-colors flex items-center gap-2"
                  >
                    <FaDownload /> Export CSV
                  </CSVLink>
                </div>

                {/* Table Body */}
                <div className="overflow-auto grow custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 bg-gray-50">
                          #
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50">
                          Keyword
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center bg-gray-50">
                          Count
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right bg-gray-50">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentKeywords.map((keyword, index) => (
                        <tr
                          key={index}
                          className="hover:bg-[#feefeb]/20 transition-colors group"
                        >
                          <td className="px-6 py-3 text-sm text-gray-400 font-mono">
                            {index + 1}
                          </td>
                          <td className="px-6 py-3 text-sm font-bold text-gray-700">
                            {keyword}
                          </td>
                          <td className="px-6 py-3 text-sm text-center text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                              {keyword.split(" ").length} words
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <a
                              href={`https://app.aibuster.com/?keyword=${encodeURIComponent(
                                keyword
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f35d36] border border-[#f35d36] px-4 py-1.5 rounded-full hover:bg-[#f35d36] hover:text-white transition-all shadow-sm"
                            >
                              <FaWandMagicSparkles /> Generate
                            </a>
                          </td>
                        </tr>
                      ))}
                      {currentKeywords.length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-12 text-center text-gray-400 italic"
                          >
                            No keywords found in this group.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && clusters.length === 0 && (
          <div className="text-center text-gray-400 pb-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-4xl text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">
              Start by entering a topic above.
            </p>
            <p className="text-sm text-gray-400">
              We will generate keyword clusters and suggestions for you.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordsExplorer;
