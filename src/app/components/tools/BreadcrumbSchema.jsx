"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaGoogle,
  FaLink,
  FaPlus,
  FaTrash,
  FaListOl,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] appearance-none
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

const BreadcrumbSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://example.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Category",
        item: "https://example.com/category",
      },
    ],
  };

  // --- STATE ---
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Home", url: "https://example.com/" },
    { name: "Category", url: "https://example.com/category" },
  ]);
  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleBreadcrumbChange = (index, field, value) => {
    const updatedBreadcrumbs = breadcrumbs.map((breadcrumb, i) =>
      i === index ? { ...breadcrumb, [field]: value } : breadcrumb
    );
    setBreadcrumbs(updatedBreadcrumbs);
  };

  const addBreadcrumb = () => {
    setBreadcrumbs([...breadcrumbs, { name: "", url: "" }]);
  };

  const removeBreadcrumb = (index) => {
    // Prevent removing the last item if you want at least one
    if (breadcrumbs.length <= 1) {
      toast.warning("You need at least one breadcrumb item.");
      return;
    }
    setBreadcrumbs(breadcrumbs.filter((_, i) => i !== index));
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name || `Page ${index + 1}`, // Fallback name
        item: breadcrumb.url || "#", // Fallback URL
      })),
    };

    setDisplayedSchema(newSchema);
    toast.success("Schema generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(displayedSchema, null, 2))
      .then(() => {
        toast.success("JSON-LD copied to clipboard!");
      });
  };

  const resetForm = () => {
    setBreadcrumbs([
      { name: "Home", url: "https://example.com/" },
      { name: "Category", url: "https://example.com/category" },
    ]);
    setDisplayedSchema(defaultSchema);
    toast.info("Form reset.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dynamic Inputs List */}
            {breadcrumbs.map((breadcrumb, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all shadow-sm"
              >
                {/* Header for Item */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[#15151e] font-bold flex items-center gap-2">
                    <span className="bg-[#feefeb] text-[#f35d36] w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    Page #{index + 1}
                  </h4>

                  {/* Delete Button (Only show if > 1 item) */}
                  {breadcrumbs.length > 1 && (
                    <button
                      onClick={() => removeBreadcrumb(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove this item"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LegendWrapper label="Page Name" icon={<FaListOl />}>
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={breadcrumb.name}
                      onChange={(e) =>
                        handleBreadcrumbChange(index, "name", e.target.value)
                      }
                      placeholder={`e.g. ${index === 0 ? "Home" : "Products"}`}
                    />
                  </LegendWrapper>

                  <LegendWrapper label="Page URL" icon={<FaLink />}>
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={breadcrumb.url}
                      onChange={(e) =>
                        handleBreadcrumbChange(index, "url", e.target.value)
                      }
                      placeholder="https://..."
                    />
                  </LegendWrapper>
                </div>
              </div>
            ))}

            {/* Add New Button */}
            <button
              onClick={addBreadcrumb}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#f35d36] hover:text-[#f35d36] transition-all font-semibold flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Another Page
            </button>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <FaWandMagicSparkles /> Generate Schema
            </button>
          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            {/* Preview Card */}
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  JSON-LD Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                    title="Copy Code"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded transition-all"
                    title="Reset"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <div className="grow overflow-auto min-h-[400px] max-h-[80vh] custom-scrollbar">
                <JSONPretty
                  id="json-pretty"
                  data={displayedSchema}
                  theme={{
                    main: "line-height:1.4;color:#d4d4d4;background:transparent;overflow:auto;",
                    error:
                      "line-height:1.4;color:#f44747;background:transparent;overflow:auto;",
                    key: "color:#9cdcfe;",
                    string: "color:#ce9178;",
                    value: "color:#b5cea8;",
                    boolean: "color:#569cd6;",
                  }}
                />
              </div>

              {/* Footer Tools */}
              <div className="pt-4 mt-4 border-t border-gray-700 flex flex-col gap-2">
                <Link
                  href="https://validator.schema.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaCheck size={12} /> Validate Schema
                </Link>
                <Link
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaGoogle size={12} /> Test Rich Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbSchemaForm;
