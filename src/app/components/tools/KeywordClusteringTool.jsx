"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FaArrowRotateRight, FaWandMagicSparkles } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChartPie, FaCheck, FaCloudUploadAlt, FaFileCsv, FaLayerGroup, FaListOl, FaObjectGroup, FaSortNumericDown } from "react-icons/fa";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[150px] resize-y
`;

// Helper Component for Statistics
const StatCard = ({ icon, value, label }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:border-[#f35d36] transition-colors">
    <div className="text-[#f35d36] text-2xl mb-2">{icon}</div>
    <h3 className="text-2xl font-bold text-[#15151e]">{value}</h3>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

export default function KeywordClusteringTool() {
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState(null);
  const [stats, setStats] = useState(null);
  const [fileName, setFileName] = useState("");

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      toast.error("Please upload a valid .txt file");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setKeywords(fileContent.trim());
      toast.success("File loaded successfully!");
    };
    reader.readAsText(file);
  };

  // Main Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setClusters(null);

    const keywordsArray = keywords
      .split("\n")
      .map((kw) => kw.trim())
      .filter(Boolean);

    if (keywordsArray.length === 0) {
      toast.warning("Please enter some keywords or upload a file.");
      return;
    }

    setLoading(true);

    const simulateClustering = () => {
      const clusters = {};
      keywordsArray.forEach((keyword, index) => {
        const group = index % 5;
        if (!clusters[group]) clusters[group] = [];
        clusters[group].push(keyword);
      });
      return clusters;
    };

    const calculateStats = (clusters) => {
      const clusterSizes = Object.values(clusters).map((group) => group.length);
      const totalKeywords = keywordsArray.length;
      const clusteredKeywords = clusterSizes.reduce((a, b) => a + b, 0);
      const totalClusters = clusterSizes.length;
      const avgClusterSize = (clusteredKeywords / totalClusters).toFixed(2);

      // Calculate Median
      const sortedSizes = clusterSizes.sort((a, b) => a - b);
      const mid = Math.floor(sortedSizes.length / 2);
      const medianClusterSize =
        sortedSizes.length % 2 !== 0
          ? sortedSizes[mid]
          : ((sortedSizes[mid - 1] + sortedSizes[mid]) / 2).toFixed(2);

      return {
        totalKeywords,
        clusteredKeywords,
        totalClusters,
        avgClusterSize,
        medianClusterSize,
      };
    };

    // Simulate API delay
    setTimeout(() => {
      const clusterResult = simulateClustering();
      setClusters(clusterResult);
      setStats(calculateStats(clusterResult));
      setLoading(false);
      toast.success("Clustering complete!");
    }, 1500);
  };

  const downloadCSV = () => {
    if (!clusters) return;

    const rows = [];
    Object.entries(clusters).forEach(([group, keywords]) => {
      keywords.forEach((keyword) => {
        rows.push({ Group: `Group ${parseInt(group) + 1}`, Keyword: keyword });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clusters");
    XLSX.writeFile(workbook, "clustered_keywords.xlsx");
    toast.success("Downloaded Excel file!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 lg:p-10 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Input Area */}
          <div className="relative">
            <label className="text-[#15151e] font-bold mb-2 ml-1 flex items-center gap-2">
              <FaListOl className="text-[#f35d36]" /> Keyword List
            </label>
            <textarea
              className={baseInputStyles}
              placeholder="Enter keywords (one per line)..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            ></textarea>
          </div>

          {/* File Upload Area */}
          <div className="flex justify-center">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-[#feefeb] hover:border-[#f35d36] transition-all group"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#f35d36] transition-colors" />
                <p className="mb-1 text-sm text-gray-500 font-semibold">
                  {fileName ? fileName : "Click to upload a .txt file"}
                </p>
                <p className="text-xs text-gray-400">.txt files only</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaArrowRotateRight className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                <FaWandMagicSparkles /> Create Clusters
              </>
            )}
          </button>
        </form>

        {/* Statistics Section */}
        {stats && clusters && (
          <div className="mt-16 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-bold text-[#15151e]">
                Analysis Statistics
              </h3>
              <div className="h-px bg-gray-200 grow ml-4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              <StatCard
                icon={<FaListOl />}
                value={stats.totalKeywords}
                label="Total Keywords"
              />
              <StatCard
                icon={<FaCheck />}
                value={stats.clusteredKeywords}
                label="Clustered"
              />
              <StatCard
                icon={<FaLayerGroup />}
                value={stats.totalClusters}
                label="Total Groups"
              />
              <StatCard
                icon={<FaChartPie />}
                value={stats.avgClusterSize}
                label="Avg Size"
              />
              <StatCard
                icon={<FaSortNumericDown />}
                value={stats.medianClusterSize}
                label="Median Size"
              />
            </div>

            {/* Clusters Grid */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#15151e]">
                Clustered Results
              </h3>
              <button
                onClick={downloadCSV}
                className="px-6 py-2 rounded-lg bg-[#107c41] hover:bg-[#0c5e31] text-white font-medium transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <FaFileCsv /> Download Excel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(clusters).map(([group, groupKeywords]) => (
                <div
                  key={group}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="font-bold text-[#15151e] flex items-center gap-2">
                      <FaObjectGroup className="text-[#f35d36]" /> Group{" "}
                      {parseInt(group) + 1}
                    </h4>
                    <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {groupKeywords.length}
                    </span>
                  </div>
                  <div className="p-4 max-h-48 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-2">
                      {groupKeywords.map((keyword, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-sm flex items-start gap-2"
                        >
                          <span className="text-[#f35d36] mt-1">•</span>{" "}
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
