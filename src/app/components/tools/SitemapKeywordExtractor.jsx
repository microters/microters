"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaFileCsv,
  FaLink,
  FaCheckSquare,
  FaSquare,
  FaExternalLinkAlt,
  FaSitemap,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Link from "next/link";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
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

const SitemapKeywordExtractor = () => {
  // --- STATE ---
  const [inputUrl, setInputUrl] = useState("");
  const [extractedData, setExtractedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleSubmit = async () => {
    if (!inputUrl.trim()) {
      toast.warning("Please enter a Sitemap URL.");
      return;
    }

    setLoading(true);
    setExtractedData([]);
    setSelectedRows([]);

    try {
      const response = await fetch("https://api.mhnazmul.com/api/sitemaps", {
        method: "POST",
        body: JSON.stringify({ sitemapUrl: inputUrl }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setExtractedData(result.data);
        setSelectedRows(result.data.map((item) => item.url));
        toast.success(`Found ${result.data.length} URLs!`);
      } else {
        toast.error(result.message || "Failed to fetch data.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRow = (url) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((item) => item !== url)
        : [...prevSelected, url]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === extractedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(extractedData.map((item) => item.url));
    }
  };

  const handleDownload = () => {
    if (selectedRows.length === 0) {
      toast.warning("No rows selected to export.");
      return;
    }

    // Filter only selected data
    const dataToExport = extractedData.filter((item) =>
      selectedRows.includes(item.url)
    );

    const headers = ["URL", "Title", "Keyword"];
    const rows = dataToExport.map((item) => [
      item.url,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.keyword.replace(/"/g, '""')}"`,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sitemap_keywords.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold text-[#15151e] flex items-center gap-2">
              <FaSitemap className="text-[#f35d36]" /> Sitemap Extractor
            </h2>
            <p className="text-gray-500 text-sm">
              Enter a valid XML sitemap URL to extract URLs, Titles, and
              Keywords automatically.
            </p>

            <LegendWrapper label="Sitemap URL" icon={<FaLink />}>
              <input
                type="text"
                className={baseInputStyles}
                placeholder="https://example.com/sitemap.xml"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </LegendWrapper>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="animate-pulse">Extracting...</span>
              ) : (
                <>
                  <FaSearch /> Extract Keywords
                </>
              )}
            </button>

            {extractedData.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-700">
                    Results Found:
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {extractedData.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">
                    Selected:
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    {selectedRows.length}
                  </span>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FaFileCsv /> Export to CSV
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Results Table */}
          <div className="lg:col-span-8 lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 flex flex-col min-h-[500px]">
              {/* Table Header / Actions */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <h3 className="text-[#15151e] font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  Extracted Data
                </h3>
                {extractedData.length > 0 && (
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-gray-500 hover:text-[#f35d36] font-medium flex items-center gap-1 transition-colors"
                  >
                    {selectedRows.length === extractedData.length ? (
                      <>
                        <FaCheckSquare /> Deselect All
                      </>
                    ) : (
                      <>
                        <FaSquare /> Select All
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Table Content */}
              <div className="grow overflow-auto max-h-[600px] custom-scrollbar rounded-lg border border-gray-100">
                {extractedData.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 w-10 border-b border-gray-200">
                          <input
                            type="checkbox"
                            className="accent-[#f35d36] w-4 h-4 cursor-pointer"
                            checked={
                              extractedData.length > 0 &&
                              selectedRows.length === extractedData.length
                            }
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                          URL
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                          Keyword
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-500 uppercase border-b border-gray-200 text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {extractedData.map((item, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-[#feefeb]/30 transition-colors ${
                            selectedRows.includes(item.url)
                              ? "bg-[#feefeb]/10"
                              : ""
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              className="accent-[#f35d36] w-4 h-4 cursor-pointer"
                              checked={selectedRows.includes(item.url)}
                              onChange={() => handleSelectRow(item.url)}
                            />
                          </td>
                          <td className="p-3 max-w-[250px]">
                            <div className="flex flex-col">
                              <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-[#f35d36] hover:underline font-medium truncate flex items-center gap-1"
                              >
                                {item.url}
                                <FaExternalLinkAlt
                                  size={10}
                                  className="opacity-50"
                                />
                              </Link>
                              <span
                                className="text-xs text-gray-400 truncate mt-0.5"
                                title={item.title}
                              >
                                {item.title || "No Title"}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-gray-700">
                            {item.keyword ? (
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {item.keyword}
                              </span>
                            ) : (
                              <span className="text-gray-300 italic">--</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() =>
                                window.open(
                                  `https://app.aibuster.com/?keyword=${item.keyword}`,
                                  "_blank"
                                )
                              }
                              className="text-xs font-bold text-[#f35d36] border border-[#f35d36] px-3 py-1.5 rounded-full hover:bg-[#f35d36] hover:text-white transition-all flex items-center gap-1 ml-auto"
                            >
                              <FaWandMagicSparkles /> Create Article
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  // Empty State
                  <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                      <FaSitemap size={32} className="text-gray-300" />
                    </div>
                    <p>Enter a Sitemap URL to see results here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapKeywordExtractor;
