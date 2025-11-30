"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  FaCloudUploadAlt,
  FaLayerGroup,
  FaListUl,
  FaPenNib,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] resize-none
`;

// --- COMPONENTS ---
const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const KeywordGroupingTool = () => {
  const [keywords, setKeywords] = useState([]);
  const [groups, setGroups] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("");

  // Handle manual keyword input
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    const keywordArray = inputText
      .split("\n")
      .map((kw) => kw.trim())
      .filter(Boolean);
    setKeywords(keywordArray);
  };

  // Handle file upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      const fileKeywords = rows
        .flat()
        .map((kw) => String(kw).trim())
        .filter(Boolean);
      setKeywords(fileKeywords);
      toast.success(`Loaded ${fileKeywords.length} keywords from file!`);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Group keywords
  const groupKeywords = () => {
    if (keywords.length === 0) {
      toast.warning("Please enter some keywords first.");
      return;
    }

    const tempGroups = keywords.reduce((acc, keyword) => {
      const normalizedKey = keyword.split(" ")[0].toLowerCase();
      if (!acc[normalizedKey]) acc[normalizedKey] = [];
      acc[normalizedKey].push(keyword);
      return acc;
    }, {});

    // Move small groups to "Others"
    const others = [];
    const finalGroups = Object.entries(tempGroups).reduce(
      (acc, [key, value]) => {
        if (value.length < 3) {
          others.push(...value);
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (others.length > 0) {
      finalGroups["others"] = others;
    }

    setGroups(finalGroups);

    const firstGroupKey = Object.keys(finalGroups)[0];
    if (firstGroupKey) setSelectedGroup(firstGroupKey);

    toast.success("Keywords grouped successfully!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Input Section */}
        <div className="space-y-8">
          <LegendWrapper label="Paste Keywords" icon={<FaListUl />}>
            <textarea
              rows="6"
              placeholder="Enter keywords (one per line)..."
              onChange={handleInputChange}
              className={baseInputStyles}
              value={keywords.join("\n")}
            ></textarea>
          </LegendWrapper>

          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${
                      isDragActive
                        ? "border-[#f35d36] bg-[#feefeb]"
                        : "border-gray-300 bg-gray-50 hover:border-[#f35d36] hover:bg-white"
                    }
                `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-3">
              <FaCloudUploadAlt
                className={`text-4xl ${
                  isDragActive ? "text-[#f35d36]" : "text-gray-400"
                }`}
              />
              <p className="text-gray-600 font-medium">
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag & drop your Excel/CSV file here, or click to browse"}
              </p>
              <span className="text-xs text-gray-400">
                Supported formats: .xlsx, .csv
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={groupKeywords}
            className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaWandMagicSparkles /> Create Groups
          </button>
        </div>

        {/* Results Section */}
        {Object.keys(groups).length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar: Groups List */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-[#15151e] flex items-center gap-2">
                      <FaLayerGroup className="text-[#f35d36]" /> Keyword Groups
                    </h3>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-2">
                    <ul className="space-y-1">
                      {Object.entries(groups).map(([group, groupKeywords]) => (
                        <li
                          key={group}
                          onClick={() => setSelectedGroup(group)}
                          className={`
                                                cursor-pointer px-4 py-3 rounded-lg flex justify-between items-center transition-colors
                                                ${
                                                  selectedGroup === group
                                                    ? "bg-[#feefeb] text-[#f35d36] font-bold"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                }
                                            `}
                        >
                          <span className="capitalize truncate mr-2">
                            {group}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              selectedGroup === group
                                ? "bg-[#f35d36] text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {groupKeywords.length}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Main Content: Keywords Table */}
              <div className="lg:col-span-8">
                {selectedGroup && (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-[#15151e] capitalize">
                        Group:{" "}
                        <span className="text-[#f35d36]">{selectedGroup}</span>
                      </h3>
                      <span className="text-sm text-gray-500">
                        {groups[selectedGroup].length} keywords
                      </span>
                    </div>

                    <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-white sticky top-0 z-10 shadow-sm">
                          <tr>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">
                              Keyword
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b text-center w-24">
                              Words
                            </th>
                            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b text-right w-32">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {groups[selectedGroup].map((keyword, i) => (
                            <tr
                              key={i}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-3 text-sm text-gray-700">
                                {keyword}
                              </td>
                              <td className="px-6 py-3 text-sm text-gray-500 text-center">
                                {keyword.split(" ").length}
                              </td>
                              <td className="px-6 py-3 text-right">
                                <a
                                  href="https://app.aibuster.com/login"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#15151e] hover:bg-[#333] text-white text-xs font-medium transition-all"
                                >
                                  <FaPenNib /> Generate
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordGroupingTool;
