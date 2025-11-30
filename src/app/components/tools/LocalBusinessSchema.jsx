"use client";

import React, { useState } from "react";
import Select from "react-select";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaShareAlt,
  FaTrash,
  FaCopy,
  FaCheck,
  FaGoogle,
  FaImage,
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
const businessTypes = [
  { label: "LocalBusiness (Generic)", value: "LocalBusiness" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Store", value: "Store" },
  { label: "Dentist", value: "Dentist" },
  { label: "TravelAgency", value: "TravelAgency" },
  // Add more as needed
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

const LocalBusinessSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Example Business",
    image: "https://example.com/logo.png",
    "@id": "https://example.com",
    url: "https://example.com",
    telephone: "+1-555-0100",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    businessType: "LocalBusiness",
    specificType: "",
    name: "",
    image: "",
    id: "",
    url: "",
    phone: "",
    priceRange: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
    open247: false,
    socialProfiles: [""],
    openingHours: [""],
    departments: [{ name: "", url: "" }],
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

  // Dynamic Fields Handlers
  const handleArrayChange = (field, index, value, subField = null) => {
    const updatedArray = formData[field].map((item, i) => {
      if (i !== index) return item;
      if (subField) return { ...item, [subField]: value };
      return value;
    });
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addItem = (field, initialValue) => {
    setFormData({ ...formData, [field]: [...formData[field], initialValue] });
  };

  const removeItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": formData.specificType || formData.businessType,
      name: formData.name,
      image: formData.image,
      "@id": formData.id,
      url: formData.url,
      telephone: formData.phone,
      priceRange: formData.priceRange,
      address: {
        "@type": "PostalAddress",
        streetAddress: formData.streetAddress,
        addressLocality: formData.city,
        addressRegion: formData.state,
        postalCode: formData.postalCode,
        addressCountry: formData.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: formData.latitude,
        longitude: formData.longitude,
      },

      openingHours: formData.openingHours.filter((h) => h.trim() !== ""),
      department: formData.departments
        .filter((d) => d.name && d.url)
        .map((dept) => ({
          "@type": "LocalBusiness",
          name: dept.name,
          url: dept.url,
        })),
      sameAs: formData.socialProfiles.filter((p) => p.trim() !== ""),
    };

    if (formData.open247) {
      newSchema["openingHoursSpecification"] = {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      };
      delete newSchema["openingHours"];
    }

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
      businessType: "LocalBusiness",
      specificType: "",
      name: "",
      image: "",
      id: "",
      url: "",
      phone: "",
      priceRange: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      latitude: "",
      longitude: "",
      open247: false,
      socialProfiles: [""],
      openingHours: [""],
      departments: [{ name: "", url: "" }],
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
              <LegendWrapper
                label="Business Type"
                icon={<FaBuilding />}
                required
              >
                <Select
                  instanceId="business-type-select"
                  options={businessTypes}
                  value={businessTypes.find(
                    (opt) => opt.value === formData.businessType
                  )}
                  onChange={(opt) =>
                    handleSelectChange("businessType", opt.value)
                  }
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </LegendWrapper>
              <LegendWrapper label="Specific Type (Optional)">
                <input
                  type="text"
                  className={baseInputStyles}
                  name="specificType"
                  value={formData.specificType}
                  onChange={handleInputChange}
                  placeholder="e.g. Bakery"
                />
              </LegendWrapper>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <LegendWrapper label="Business Name" required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Joe's Pizza"
                />
              </LegendWrapper>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Image URL" icon={<FaImage />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </LegendWrapper>
                <LegendWrapper label="@id (URL)" icon={<FaGlobe />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="https://site.com#business"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 2. Contact & Pricing */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaPhone className="text-[#f35d36]" /> Contact Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LegendWrapper label="Website URL">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </LegendWrapper>
                <LegendWrapper label="Phone">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 555..."
                  />
                </LegendWrapper>
                <LegendWrapper label="Price Range" icon={<FaDollarSign />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    placeholder="$$"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Address */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#f35d36]" /> Address & Map
              </h4>
              <div className="space-y-4">
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
                    placeholder="Country Code (US)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="Latitude (e.g. 40.7128)"
                  />
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="Longitude (e.g. -74.0060)"
                  />
                </div>
              </div>
            </div>

            {/* 4. Opening Hours */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaClock className="text-[#f35d36]" /> Hours
              </h4>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="open247"
                  name="open247"
                  checked={formData.open247}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#f35d36]"
                />
                <label
                  htmlFor="open247"
                  className="text-gray-700 text-[15px] font-medium cursor-pointer"
                >
                  Open 24/7
                </label>
              </div>

              {!formData.open247 &&
                formData.openingHours.map((hour, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={hour}
                      onChange={(e) =>
                        handleArrayChange("openingHours", index, e.target.value)
                      }
                      placeholder="Mo-Fr 09:00-17:00"
                    />
                    {formData.openingHours.length > 1 && (
                      <button
                        onClick={() => removeItem("openingHours", index)}
                        className="text-red-500 hover:bg-red-50 p-3 rounded border border-red-100"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              {!formData.open247 && (
                <button
                  onClick={() => addItem("openingHours", "")}
                  className="text-[#f35d36] font-semibold text-sm hover:underline"
                >
                  + Add Hours
                </button>
              )}
            </div>

            {/* 5. Social Profiles */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaShareAlt className="text-[#f35d36]" /> Social Profiles
                (SameAs)
              </h4>
              {formData.socialProfiles.map((profile, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className={baseInputStyles}
                    value={profile}
                    onChange={(e) =>
                      handleArrayChange("socialProfiles", index, e.target.value)
                    }
                    placeholder="https://facebook.com/..."
                  />
                  {formData.socialProfiles.length > 1 && (
                    <button
                      onClick={() => removeItem("socialProfiles", index)}
                      className="text-red-500 hover:bg-red-50 p-3 rounded border border-red-100"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem("socialProfiles", "")}
                className="text-[#f35d36] font-semibold text-sm hover:underline"
              >
                + Add Profile
              </button>
            </div>

            {/* 6. Departments */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaUsers className="text-[#f35d36]" /> Departments
              </h4>
              {formData.departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-200 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={dept.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "departments",
                          index,
                          e.target.value,
                          "name"
                        )
                      }
                      placeholder="Dept Name"
                    />
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={dept.url}
                      onChange={(e) =>
                        handleArrayChange(
                          "departments",
                          index,
                          e.target.value,
                          "url"
                        )
                      }
                      placeholder="Dept URL"
                    />
                  </div>
                  {formData.departments.length > 1 && (
                    <button
                      onClick={() => removeItem("departments", index)}
                      className="absolute -top-2 -right-2 bg-white text-red-500 hover:text-red-700 shadow rounded-full p-1"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem("departments", { name: "", url: "" })}
                className="text-[#f35d36] font-semibold text-sm hover:underline"
              >
                + Add Department
              </button>
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

export default LocalBusinessSchemaForm;
