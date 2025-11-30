"use client";

import React, { useState } from "react";
import Select from "react-select";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaListUl,
  FaUserGraduate,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
  FaFileContract,
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
const employmentTypes = [
  { label: "Full-Time", value: "FULL_TIME" },
  { label: "Part-Time", value: "PART_TIME" },
  { label: "Contractor", value: "CONTRACTOR" },
  { label: "Temporary", value: "TEMPORARY" },
  { label: "Intern", value: "INTERN" },
];

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "CAD", value: "CAD" },
  { label: "AUD", value: "AUD" },
];

const salaryPeriods = [
  { label: "Year", value: "Year" },
  { label: "Month", value: "Month" },
  { label: "Week", value: "Week" },
  { label: "Hour", value: "Hour" },
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

const JobPostingSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Software Engineer",
    description: "<p>We are hiring a skilled software engineer...</p>",
    hiringOrganization: {
      "@type": "Organization",
      name: "Tech Corp",
      sameAs: "https://example.com",
      logo: "https://example.com/logo.png",
    },
    datePosted: "2024-01-01",
    validThrough: "2024-02-01",
    employmentType: "FULL_TIME",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "USA",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: "80000",
        maxValue: "120000",
        unitText: "Year",
      },
    },
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    title: "",
    identifier: "",
    description: "",
    companyName: "",
    companyUrl: "",
    companyLogo: "",
    industry: "",
    employmentType: "FULL_TIME",
    datePosted: "",
    validThrough: "",
    remoteJob: false,
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    salary: "",
    maxSalary: "",
    currency: "USD",
    salaryPeriod: "Year",
    responsibilities: "",
    skills: "",
    educationRequirements: "",
    experienceRequirements: "",
  });

  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: formData.title,
      description: formData.description,
      identifier: {
        "@type": "PropertyValue",
        name: formData.companyName,
        value: formData.identifier,
      },
      hiringOrganization: {
        "@type": "Organization",
        name: formData.companyName,
        sameAs: formData.companyUrl,
        logo: formData.companyLogo,
      },
      datePosted: formData.datePosted,
      validThrough: formData.validThrough,
      employmentType: formData.employmentType,
      industry: formData.industry,
      jobLocation: formData.remoteJob
        ? { "@type": "Place", name: "Remote" }
        : {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: formData.streetAddress,
              addressLocality: formData.city,
              addressRegion: formData.state,
              postalCode: formData.postalCode,
              addressCountry: formData.country,
            },
          },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: formData.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: formData.salary,
          maxValue: formData.maxSalary,
          unitText: formData.salaryPeriod,
        },
      },
      responsibilities: formData.responsibilities,
      skills: formData.skills,
      educationRequirements: formData.educationRequirements,
      experienceRequirements: formData.experienceRequirements,
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
      title: "",
      identifier: "",
      description: "",
      companyName: "",
      companyUrl: "",
      companyLogo: "",
      industry: "",
      employmentType: "FULL_TIME",
      datePosted: "",
      validThrough: "",
      remoteJob: false,
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      salary: "",
      maxSalary: "",
      currency: "USD",
      salaryPeriod: "Year",
      responsibilities: "",
      skills: "",
      educationRequirements: "",
      experienceRequirements: "",
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
            {/* 1. Basic Job Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Job Title" icon={<FaBriefcase />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Developer"
                />
              </LegendWrapper>
              <LegendWrapper
                label="Job Identifier (ID)"
                icon={<FaFileContract />}
              >
                <input
                  type="text"
                  className={baseInputStyles}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="e.g. JOB-12345"
                />
              </LegendWrapper>
            </div>

            {/* Description */}
            <LegendWrapper
              label="Job Description (HTML allowed)"
              icon={<FaListUl />}
            >
              <textarea
                className={`${baseInputStyles} h-32 resize-y`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="<p>We are looking for...</p>"
              />
            </LegendWrapper>

            {/* 2. Company Info */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaBuilding className="text-[#f35d36]" /> Company Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LegendWrapper label="Company Name">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Acme Corp"
                  />
                </LegendWrapper>
                <LegendWrapper label="Company URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </LegendWrapper>
                <LegendWrapper label="Logo URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="companyLogo"
                    value={formData.companyLogo}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Employment & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Industry">
                <input
                  type="text"
                  className={baseInputStyles}
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g. Software, Healthcare"
                />
              </LegendWrapper>
              <LegendWrapper label="Employment Type">
                <Select
                  instanceId="employment-select"
                  options={employmentTypes}
                  value={employmentTypes.find(
                    (opt) => opt.value === formData.employmentType
                  )}
                  onChange={(opt) =>
                    handleSelectChange("employmentType", opt.value)
                  }
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </LegendWrapper>
            </div>

            {/* 4. Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Date Posted" icon={<FaCalendarAlt />}>
                <input
                  type="date"
                  className={baseInputStyles}
                  name="datePosted"
                  value={formData.datePosted}
                  onChange={handleInputChange}
                />
              </LegendWrapper>
              <LegendWrapper label="Valid Through" icon={<FaCalendarAlt />}>
                <input
                  type="date"
                  className={baseInputStyles}
                  name="validThrough"
                  value={formData.validThrough}
                  onChange={handleInputChange}
                />
              </LegendWrapper>
            </div>

            {/* 5. Location */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#f35d36]" /> Location
              </h4>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="remoteJob"
                  name="remoteJob"
                  checked={formData.remoteJob}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#f35d36]"
                />
                <label
                  htmlFor="remoteJob"
                  className="text-gray-700 text-[15px] font-medium cursor-pointer"
                >
                  Remote Job?
                </label>
              </div>
              {!formData.remoteJob && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                  />
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country Code (e.g. US)"
                  />
                </div>
              )}
            </div>

            {/* 6. Salary */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaDollarSign className="text-[#f35d36]" /> Salary (Optional)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                  type="number"
                  className={baseInputStyles}
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Min"
                />
                <input
                  type="number"
                  className={baseInputStyles}
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  placeholder="Max"
                />
                <Select
                  instanceId="currency-select"
                  options={currencyOptions}
                  value={currencyOptions.find(
                    (opt) => opt.value === formData.currency
                  )}
                  onChange={(opt) => handleSelectChange("currency", opt.value)}
                  styles={customSelectStyles}
                  placeholder="Currency"
                />
                <Select
                  instanceId="period-select"
                  options={salaryPeriods}
                  value={salaryPeriods.find(
                    (opt) => opt.value === formData.salaryPeriod
                  )}
                  onChange={(opt) =>
                    handleSelectChange("salaryPeriod", opt.value)
                  }
                  styles={customSelectStyles}
                  placeholder="Period"
                />
              </div>
            </div>

            {/* 7. Requirements */}
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaUserGraduate className="text-[#f35d36]" /> Details
              </h4>

              <LegendWrapper label="Responsibilities">
                <textarea
                  className={`${baseInputStyles} h-20`}
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  placeholder="List key responsibilities..."
                />
              </LegendWrapper>
              <LegendWrapper label="Skills">
                <textarea
                  className={`${baseInputStyles} h-20`}
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="List required skills..."
                />
              </LegendWrapper>
              <LegendWrapper label="Education & Experience">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                    className={`${baseInputStyles} h-20`}
                    name="educationRequirements"
                    value={formData.educationRequirements}
                    onChange={handleInputChange}
                    placeholder="Education..."
                  />
                  <textarea
                    className={`${baseInputStyles} h-20`}
                    name="experienceRequirements"
                    value={formData.experienceRequirements}
                    onChange={handleInputChange}
                    placeholder="Experience..."
                  />
                </div>
              </LegendWrapper>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-8"
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
                <a
                  href="https://validator.schema.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaCheck size={12} /> Validate Schema
                </a>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaGoogle size={12} /> Test Rich Results
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostingSchemaForm;
