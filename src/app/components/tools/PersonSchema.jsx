"use client";

import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FaUser,
  FaLink,
  FaImage,
  FaBriefcase,
  FaBuilding,
  FaShareAlt,
  FaPlus,
  FaTrash,
  FaCopy,
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

const PersonSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John Doe",
    url: "https://johndoe.com",
    image: "https://johndoe.com/avatar.jpg",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Tech Corp",
    },
    sameAs: [
      "https://www.linkedin.com/in/johndoe",
      "https://twitter.com/johndoe",
    ],
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    pictureUrl: "",
    url: "",
    jobTitle: "",
    company: "",
    socialProfiles: [""],
  });

  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Social Profiles Logic
  const handleSocialProfileChange = (index, value) => {
    const updatedProfiles = formData.socialProfiles.map((p, i) =>
      i === index ? value : p
    );
    setFormData({ ...formData, socialProfiles: updatedProfiles });
  };

  const addSocialProfile = () => {
    setFormData({
      ...formData,
      socialProfiles: [...formData.socialProfiles, ""],
    });
  };

  const removeSocialProfile = (index) => {
    setFormData({
      ...formData,
      socialProfiles: formData.socialProfiles.filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: formData.name,
      url: formData.url,
      image: formData.pictureUrl,
      jobTitle: formData.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: formData.company,
      },
      sameAs: formData.socialProfiles.filter((s) => s.trim() !== ""),
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
      name: "",
      pictureUrl: "",
      url: "",
      jobTitle: "",
      company: "",
      socialProfiles: [""],
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
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Full Name" icon={<FaUser />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </LegendWrapper>

              <LegendWrapper label="Job Title" icon={<FaBriefcase />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                />
              </LegendWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper
                label="Company / Organization"
                icon={<FaBuilding />}
              >
                <input
                  type="text"
                  className={baseInputStyles}
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Google, Inc."
                />
              </LegendWrapper>

              <LegendWrapper label="Website URL" icon={<FaLink />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://johndoe.com"
                />
              </LegendWrapper>
            </div>

            <LegendWrapper label="Picture URL" icon={<FaImage />}>
              <input
                type="text"
                className={baseInputStyles}
                name="pictureUrl"
                value={formData.pictureUrl}
                onChange={handleInputChange}
                placeholder="https://.../profile.jpg"
              />
            </LegendWrapper>

            {/* 2. Social Profiles */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaShareAlt className="text-[#f35d36]" /> Social Profiles
                (SameAs)
              </h4>

              {formData.socialProfiles.map((profile, index) => (
                <div
                  key={index}
                  className="flex gap-2 mb-2 items-center group relative"
                >
                  <input
                    type="text"
                    className={baseInputStyles}
                    value={profile}
                    onChange={(e) =>
                      handleSocialProfileChange(index, e.target.value)
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                  {formData.socialProfiles.length > 1 && (
                    <button
                      onClick={() => removeSocialProfile(index)}
                      className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors"
                      title="Remove Profile"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSocialProfile}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-2"
              >
                <FaPlus size={12} /> Add Profile
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-6"
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

export default PersonSchemaForm;