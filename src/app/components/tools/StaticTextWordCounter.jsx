"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  FaFileExcel,
  FaMagnifyingGlass,
  FaTable,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] resize-none
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

const StaticTextWordCounter = () => {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch and process static visible text from a URL
  const fetchVisibleTextContent = async (url) => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();

      if (response.ok && data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        // Remove non-visible elements
        const scripts = doc.querySelectorAll("script");
        const styles = doc.querySelectorAll("style");
        const noscripts = doc.querySelectorAll("noscript");
        scripts.forEach((script) => script.remove());
        styles.forEach((style) => style.remove());
        noscripts.forEach((noscript) => noscript.remove());

        // Extract visible text
        const walker = document.createTreeWalker(
          doc.body,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        let visibleText = "";
        while (walker.nextNode()) {
          visibleText += walker.currentNode.nodeValue + " ";
        }

        const cleanText = visibleText
          .replace(/<[^>]*>/g, "") // Remove HTML markup
          .replace(/[^\w\s]/g, "") // Remove symbols and punctuation
          .replace(/\b\w\b/g, "") // Remove single-letter words
          .replace(/\s+/g, " ") // Remove multiple spaces
          .trim();

        const wordCountTotal = cleanText
          .split(" ")
          .filter((word) => word.trim().length > 0).length;

        // Extract anchor text
        const anchors = doc.querySelectorAll("a");
        const anchorText = Array.from(anchors)
          .map((anchor) => anchor.innerText || "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        const anchorWordCount = anchorText
          .split(" ")
          .filter((word) => word.trim().length > 0).length;

        const anchorPercentage =
          wordCountTotal > 0
            ? ((anchorWordCount / wordCountTotal) * 100).toFixed(2)
            : "0.00";

        return {
          url,
          wordCountTotal,
          correctedWordCount: wordCountTotal,
          anchorWordCount,
          anchorPercentage,
          status: "Success",
        };
      } else {
        return { url, status: "Failed to fetch content" };
      }
    } catch (err) {
      return { url, status: "Error fetching the page" };
    }
  };

  const handleSubmit = async () => {
    const urlList = urls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    if (urlList.length === 0) {
      toast.warning("Please enter at least one valid URL.");
      return;
    }

    setLoading(true);
    setResults([]);

    const resultsData = await Promise.all(
      urlList.map((url) => fetchVisibleTextContent(url))
    );
    setResults(resultsData);
    setLoading(false);
    toast.success("Check completed successfully!");
  };

  const downloadExcel = () => {
    if (results.length === 0) {
      toast.warning("No data to download!");
      return;
    }

    const excelData = results.map((result, index) => ({
      "#": index + 1,
      "Input URL": result.url,
      "Word Count Total": result.wordCountTotal || "N/A",
      "Corrected Word Count": result.correctedWordCount || "N/A",
      "Anchor Text Words": result.anchorWordCount || "N/A",
      "Anchor Percentage": result.anchorPercentage || "N/A",
      Status: result.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    XLSX.writeFile(workbook, "Word_Count_Results.xlsx");
    toast.success("Excel file downloaded!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Input Section */}
        <div className="space-y-6">
          <LegendWrapper
            label="URLs List"
            icon={<FaMagnifyingGlass />}
            required
          >
            <textarea
              className={baseInputStyles}
              rows="6"
              placeholder="Enter URLs (one per line)&#10;https://example.com&#10;https://mysite.com/blog"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            ></textarea>
          </LegendWrapper>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <FaMagnifyingGlass /> Perform Check
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-10 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold text-[#15151e] flex items-center gap-2">
                <FaTable className="text-[#f35d36]" /> Analysis Results
              </h3>
              <button
                onClick={downloadExcel}
                className="px-6 py-2.5 rounded-full bg-[#217346] hover:bg-[#1e663e] text-white font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <FaFileExcel /> Download Excel
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#15151e] text-white text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold border-b border-gray-700">
                      #
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700">
                      URL
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700 text-center">
                      Total Words
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700 text-center">
                      Corrected
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700 text-center">
                      Anchor Words
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700 text-center">
                      Anchor %
                    </th>
                    <th className="p-4 font-semibold border-b border-gray-700 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700 text-sm">
                  {results.map((result, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        result.status !== "Success"
                          ? "bg-red-50 hover:bg-red-100"
                          : ""
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="p-4 max-w-[250px] truncate">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f35d36] hover:underline font-medium"
                          title={result.url}
                        >
                          {result.url}
                        </a>
                      </td>
                      <td className="p-4 text-center font-semibold">
                        {result.wordCountTotal || "-"}
                      </td>
                      <td className="p-4 text-center">
                        {result.correctedWordCount || "-"}
                      </td>
                      <td className="p-4 text-center">
                        {result.anchorWordCount || "-"}
                      </td>
                      <td className="p-4 text-center">
                        {result.anchorPercentage
                          ? `${result.anchorPercentage}%`
                          : "-"}
                      </td>
                      <td className="p-4 text-center">
                        {result.status === "Success" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            <FaCircleCheck /> Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            <FaCircleXmark /> Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StaticTextWordCounter;
