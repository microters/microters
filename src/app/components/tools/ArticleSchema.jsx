"use client";

import React, { useState } from "react";
import Select from "react-select";
import {
  FaAlignLeft,
  FaBuilding,
  FaCalendarAlt,
  FaCheck,
  FaCode,
  FaCopy,
  FaGoogle,
  FaHeading,
  FaImage,
  FaLink,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

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

// --- DATA ---
const articleTypeOptions = [
  { label: "Article", value: "Article" },
  { label: "NewsArticle", value: "NewsArticle" },
  { label: "BlogPosting", value: "BlogPosting" },
];

const authorTypeOptions = [
  { label: "Person", value: "Person" },
  { label: "Organization", value: "Organization" },
];

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

const ArticleSchema = () => {
  // --- 1. DEFAULT DUMMY DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Example Article Headline",
    image: "https://example.com/image.jpg",
    author: {
      "@type": "Person",
      name: "John Doe",
    },
    publisher: {
      "@type": "Organization",
      name: "Example Publisher",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png",
      },
    },
    datePublished: "2024-01-01",
    description: "This is an example description...",
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    articleType: "Article",
    url: "",
    headline: "",
    imageUrl: "",
    description: "",
    authorType: "Person",
    authorName: "",
    authorUrl: "",
    publisherName: "",
    publisherLogo: "",
    datePublished: "",
    dateModified: "",
  });

  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": formData.articleType,
      headline: formData.headline || "Default Headline",
      image: formData.imageUrl || "https://example.com/default-image.jpg",
      author: {
        "@type": formData.authorType,
        name: formData.authorName || "Default Author",
        url: formData.authorUrl || "https://example.com/default-author",
      },
      publisher: {
        "@type": "Organization",
        name: formData.publisherName || "Default Publisher",
        logo: {
          "@type": "ImageObject",
          url: formData.publisherLogo || "https://example.com/default-logo.jpg",
        },
      },
      datePublished: formData.datePublished || "2025-01-01",
      dateModified: formData.dateModified || "2025-01-05",
      description: formData.description || "Default Description",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": formData.url || "https://example.com/default-article",
      },
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
    setFormData({
      articleType: "Article",
      url: "",
      headline: "",
      imageUrl: "",
      description: "",
      authorType: "Person",
      authorName: "",
      authorUrl: "",
      publisherName: "",
      publisherLogo: "",
      datePublished: "",
      dateModified: "",
    });
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
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Article Type" icon={<FaCode />}>
                <Select
                  instanceId="article-type-select"
                  options={articleTypeOptions}
                  value={articleTypeOptions.find(
                    (opt) => opt.value === formData.articleType
                  )}
                  onChange={(opt) => handleSelectChange("articleType", opt)}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </LegendWrapper>

              <LegendWrapper label="Article URL" icon={<FaLink />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/my-post"
                />
              </LegendWrapper>
            </div>

            {/* 2. Content Info */}
            <div className="grid grid-cols-1 gap-6">
              <LegendWrapper label="Headline" icon={<FaHeading />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  placeholder="Enter article headline"
                />
              </LegendWrapper>

              <LegendWrapper label="Image URL" icon={<FaImage />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/featured-image.jpg"
                />
              </LegendWrapper>
            </div>

            {/* 3. Description */}
            <div>
              <LegendWrapper label="Short Description" icon={<FaAlignLeft />}>
                <textarea
                  className={`${baseInputStyles} h-28 resize-y`}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the article..."
                />
              </LegendWrapper>
            </div>

            {/* 4. Author Info */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaUser className="text-[#f35d36]" /> Author Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Type">
                  <Select
                    instanceId="author-type-select"
                    options={authorTypeOptions}
                    value={authorTypeOptions.find(
                      (opt) => opt.value === formData.authorType
                    )}
                    onChange={(opt) => handleSelectChange("authorType", opt)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </LegendWrapper>

                <LegendWrapper label="Name">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </LegendWrapper>

                <div className="md:col-span-2">
                  <LegendWrapper label="Profile URL">
                    <input
                      type="text"
                      className={baseInputStyles}
                      name="authorUrl"
                      value={formData.authorUrl}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </LegendWrapper>
                </div>
              </div>
            </div>

            {/* 5. Publisher Info */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaBuilding className="text-[#f35d36]" /> Publisher Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Publisher Name">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="publisherName"
                    value={formData.publisherName}
                    onChange={handleInputChange}
                    placeholder="My Brand Name"
                  />
                </LegendWrapper>
                <LegendWrapper label="Logo URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="publisherLogo"
                    value={formData.publisherLogo}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 6. Dates */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaCalendarAlt className="text-[#f35d36]" /> Dates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Date Published">
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="datePublished"
                    value={formData.datePublished}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="Date Modified">
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="dateModified"
                    value={formData.dateModified}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-8"
            >
              <FaWandMagicSparkles /> Generate Schema
            </button>
          </div>

          {/* RIGHT COLUMN: PREVIEW  */}
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

              {/* Code Display - Added min-height for balance */}
              <div className="grow overflow-auto min-h-[500px] max-h-[80vh] custom-scrollbar">
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

export default ArticleSchema;
