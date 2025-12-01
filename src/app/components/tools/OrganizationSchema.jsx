"use client";

import React, { useState } from "react";
import Select from "react-select";
import {
  FaBuilding,
  FaLink,
  FaImage,
  FaPlus,
  FaTrash,
  FaShareAlt,
  FaCopy,
  FaCheck,
  FaGoogle,
  FaList,
} from "react-icons/fa";
import { FaPhone, FaWandMagicSparkles } from "react-icons/fa6";
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
const organizationTypes = [
  { label: "Organization", value: "Organization" },
  { label: "Corporation", value: "Corporation" },
  { label: "NGO", value: "NGO" },
  { label: "EducationalOrganization", value: "EducationalOrganization" },
  { label: "MedicalOrganization", value: "MedicalOrganization" },
  { label: "LocalBusiness", value: "LocalBusiness" },
  { label: "Airline", value: "Airline" },
  { label: "Consortium", value: "Consortium" },
  { label: "Library", value: "Library" },
  { label: "SportsOrganization", value: "SportsOrganization" },
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

const OrganizationSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Example Corp",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-401-555-1212",
        contactType: "Customer Service",
      },
    ],
    sameAs: [
      "https://www.facebook.com/your-profile",
      "https://twitter.com/your-profile",
    ],
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    organizationType: "Organization",
    specificType: "",
    name: "",
    alternateName: "",
    url: "",
    logo: "",
    contactPoints: [{ type: "", telephone: "", email: "" }],
    socialProfiles: [""],
  });

  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Specific handler for React Select
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, organizationType: selectedOption.value });
  };

  // Contact Points Logic
  const handleContactPointChange = (index, field, value) => {
    const updatedPoints = formData.contactPoints.map((pt, i) =>
      i === index ? { ...pt, [field]: value } : pt
    );
    setFormData({ ...formData, contactPoints: updatedPoints });
  };

  const addContactPoint = () => {
    setFormData({
      ...formData,
      contactPoints: [
        ...formData.contactPoints,
        { type: "", telephone: "", email: "" },
      ],
    });
  };

  const removeContactPoint = (index) => {
    setFormData({
      ...formData,
      contactPoints: formData.contactPoints.filter((_, i) => i !== index),
    });
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
      "@type": formData.specificType || formData.organizationType,
      name: formData.name,
      alternateName: formData.alternateName,
      url: formData.url,
      logo: formData.logo,
      contactPoint: formData.contactPoints
        .filter((c) => c.telephone || c.email)
        .map((contact) => ({
          "@type": "ContactPoint",
          contactType: contact.type,
          telephone: contact.telephone,
          email: contact.email,
        })),
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
      organizationType: "Organization",
      specificType: "",
      name: "",
      alternateName: "",
      url: "",
      logo: "",
      contactPoints: [{ type: "", telephone: "", email: "" }],
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
            {/* 1. Type & Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CHANGED: React Select for Organization Type */}
              <LegendWrapper
                label="Organization Type"
                icon={<FaList />}
                required
              >
                <Select
                  instanceId="organization-type-select"
                  options={organizationTypes}
                  value={organizationTypes.find(
                    (opt) => opt.value === formData.organizationType
                  )}
                  onChange={handleSelectChange}
                  styles={customSelectStyles}
                  isSearchable={false}
                  placeholder="Select Type..."
                />
              </LegendWrapper>

              <LegendWrapper label="Specific Type (Optional)">
                <input
                  type="text"
                  className={baseInputStyles}
                  name="specificType"
                  value={formData.specificType}
                  onChange={handleInputChange}
                  placeholder="e.g. School, Hospital"
                />
              </LegendWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Name" icon={<FaBuilding />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                />
              </LegendWrapper>
              <LegendWrapper label="Alternate Name">
                <input
                  type="text"
                  className={baseInputStyles}
                  name="alternateName"
                  value={formData.alternateName}
                  onChange={handleInputChange}
                  placeholder="Acme Inc."
                />
              </LegendWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Website URL" icon={<FaLink />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </LegendWrapper>
              <LegendWrapper label="Logo URL" icon={<FaImage />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  placeholder="https://.../logo.png"
                />
              </LegendWrapper>
            </div>

            {/* 2. Contact Points */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaPhone className="text-[#f35d36]" /> Contact Points
              </h4>

              {formData.contactPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-200 relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      className={baseInputStyles}
                      placeholder="Type (e.g. Support)"
                      value={point.type}
                      onChange={(e) =>
                        handleContactPointChange(index, "type", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className={baseInputStyles}
                      placeholder="Phone"
                      value={point.telephone}
                      onChange={(e) =>
                        handleContactPointChange(
                          index,
                          "telephone",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="email"
                      className={baseInputStyles}
                      placeholder="Email"
                      value={point.email}
                      onChange={(e) =>
                        handleContactPointChange(index, "email", e.target.value)
                      }
                    />
                  </div>
                  {formData.contactPoints.length > 1 && (
                    <button
                      onClick={() => removeContactPoint(index)}
                      className="absolute -top-2 -right-2 bg-white text-red-500 hover:text-red-700 shadow-md rounded-full p-1.5 border border-gray-200 transition-all opacity-0 group-hover:opacity-100"
                      title="Remove Contact"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addContactPoint}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-2"
              >
                <FaPlus size={12} /> Add Contact Point
              </button>
            </div>

            {/* 3. Social Profiles */}
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
                    placeholder="https://facebook.com/..."
                  />
                  {formData.socialProfiles.length > 1 && (
                    <button
                      onClick={() => removeSocialProfile(index)}
                      className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors"
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

export default OrganizationSchemaForm;
