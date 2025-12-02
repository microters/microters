"use client";

import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FaVideo,
  FaAlignLeft,
  FaCalendarAlt,
  FaClock,
  FaImage,
  FaLink,
  FaPlayCircle,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px] appearance-none
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

const VideoSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Example Video Title",
    description: "A brief description of the video content.",
    uploadDate: "2025-01-01",
    thumbnailUrl: "https://example.com/thumbnail.jpg",
    contentUrl: "https://example.com/video.mp4",
    embedUrl: "https://example.com/embed/123",
    duration: "PT10M30S",
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    uploadDate: "",
    durationMinutes: "",
    durationSeconds: "",
    thumbnailUrl: "",
    contentUrl: "",
    embedUrl: "",
    seekToAction: "",
  });

  const [generatedSchema, setGeneratedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- GENERATE FUNCTION ---
  const generateSchema = () => {
    const duration =
      formData.durationMinutes || formData.durationSeconds
        ? `PT${formData.durationMinutes || 0}M${formData.durationSeconds || 0}S`
        : undefined;

    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: formData.name,
      description: formData.description,
      uploadDate: formData.uploadDate,
      thumbnailUrl: formData.thumbnailUrl,
      contentUrl: formData.contentUrl,
      embedUrl: formData.embedUrl,
      duration: duration,
      potentialAction: formData.seekToAction
        ? {
            "@type": "SeekToAction",
            target: formData.seekToAction,
          }
        : undefined,
    };

    // Remove undefined keys for cleaner output
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    setGeneratedSchema(cleanSchema);
    toast.success("Video Schema generated!");
  };

  const handleCopySchema = () => {
    if (generatedSchema) {
      navigator.clipboard.writeText(JSON.stringify(generatedSchema, null, 2));
      toast.success("JSON-LD copied to clipboard!");
    }
  };

  const deleteSchema = () => {
    setFormData({
      name: "",
      description: "",
      uploadDate: "",
      durationMinutes: "",
      durationSeconds: "",
      thumbnailUrl: "",
      contentUrl: "",
      embedUrl: "",
      seekToAction: "",
    });
    setGeneratedSchema(defaultSchema);
    toast.info("Form reset.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. General Info */}
            <div className="grid grid-cols-1 gap-6">
              <LegendWrapper label="Video Name" icon={<FaVideo />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. How to use Schema Markup"
                />
              </LegendWrapper>

              <LegendWrapper label="Description" icon={<FaAlignLeft />}>
                <textarea
                  className={`${baseInputStyles} h-24 resize-y`}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the video..."
                />
              </LegendWrapper>
            </div>

            {/* 2. Meta Details */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaClock className="text-[#f35d36]" /> Meta Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LegendWrapper label="Upload Date" icon={<FaCalendarAlt />}>
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="uploadDate"
                    value={formData.uploadDate}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="Duration (Min)">
                  <input
                    type="number"
                    className={baseInputStyles}
                    name="durationMinutes"
                    value={formData.durationMinutes}
                    onChange={handleInputChange}
                    placeholder="10"
                  />
                </LegendWrapper>
                <LegendWrapper label="Duration (Sec)">
                  <input
                    type="number"
                    className={baseInputStyles}
                    name="durationSeconds"
                    value={formData.durationSeconds}
                    onChange={handleInputChange}
                    placeholder="30"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. URLs */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaLink className="text-[#f35d36]" /> Media URLs
              </h4>
              <div className="grid grid-cols-1 gap-6">
                <LegendWrapper label="Thumbnail URL" icon={<FaImage />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/thumb.jpg"
                  />
                </LegendWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LegendWrapper label="Content URL (MP4)">
                    <input
                      type="text"
                      className={baseInputStyles}
                      name="contentUrl"
                      value={formData.contentUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/video.mp4"
                    />
                  </LegendWrapper>
                  <LegendWrapper label="Embed URL">
                    <input
                      type="text"
                      className={baseInputStyles}
                      name="embedUrl"
                      value={formData.embedUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/embed/123"
                    />
                  </LegendWrapper>
                </div>

                <LegendWrapper
                  label="SeekToAction Target (Optional)"
                  icon={<FaPlayCircle />}
                >
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="seekToAction"
                    value={formData.seekToAction}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video?t={seek_to_second_number}"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSchema}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <FaWandMagicSparkles /> Generate Schema
            </button>
          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  JSON-LD Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySchema}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                    title="Copy Code"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={deleteSchema}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded transition-all"
                    title="Reset"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <div className="grow overflow-auto max-h-[80vh] custom-scrollbar">
                <JSONPretty
                  id="json-pretty"
                  data={generatedSchema}
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

export default VideoSchemaForm;
