"use client";

import React, { useState } from "react";
import Select from "react-select";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FaBox,
  FaTag,
  FaAlignLeft,
  FaImage,
  FaLink,
  FaDollarSign,
  FaStar,
  FaComment,
  FaUser,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
  FaPlus,
  FaList,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

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

// --- DATA OPTIONS ---
const currencyOptions = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "AUD - Australian Dollar", value: "AUD" },
];

const offerTypeOptions = [
  { label: "Offer", value: "Offer" },
  { label: "Aggregate Offer", value: "AggregateOffer" },
];

// --- COMPONENT: LegendWrapper ---
const LegendWrapper = ({ label, icon, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10 flex items-center gap-1">
      {icon && <span className="text-[#f35d36]">{icon}</span>}
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const ProductSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Example Product",
    image: "https://example.com/product.jpg",
    brand: {
      "@type": "Brand",
      name: "BrandName",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "19.99",
    },
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    image: "",
    offerType: "Offer",
    offerUrl: "",
    priceCurrency: "USD",
    price: "",
    aggregateRatingValue: "",
    numberOfRatings: "",
    highestAllowed: "",
    lowestAllowed: "",
    reviews: [],
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

  // Review Logic
  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [
        ...formData.reviews,
        { author: "", reviewBody: "", ratingValue: "" },
      ],
    });
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = formData.reviews.map((review, i) =>
      i === index ? { ...review, [field]: value } : review
    );
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const removeReview = (index) => {
    setFormData({
      ...formData,
      reviews: formData.reviews.filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: formData.name,
      image: formData.image,
      brand: {
        "@type": "Brand",
        name: formData.brand,
      },
      description: formData.description,
      offers: {
        "@type": formData.offerType,
        url: formData.offerUrl,
        priceCurrency: formData.priceCurrency,
        price: formData.price,
      },
      aggregateRating: formData.aggregateRatingValue
        ? {
            "@type": "AggregateRating",
            ratingValue: formData.aggregateRatingValue,
            reviewCount: formData.numberOfRatings,
            bestRating: formData.highestAllowed,
            worstRating: formData.lowestAllowed,
          }
        : undefined,
      review:
        formData.reviews.length > 0
          ? formData.reviews.map((review) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: review.author,
              },
              reviewBody: review.reviewBody,
              reviewRating: {
                "@type": "Rating",
                ratingValue: review.ratingValue,
              },
            }))
          : undefined,
    };

    setDisplayedSchema(schema);
    toast.success("Product Schema generated!");
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
      brand: "",
      description: "",
      image: "",
      offerType: "Offer",
      offerUrl: "",
      priceCurrency: "USD",
      price: "",
      aggregateRatingValue: "",
      numberOfRatings: "",
      highestAllowed: "",
      lowestAllowed: "",
      reviews: [],
    });
    setDisplayedSchema(defaultSchema);
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
              <LegendWrapper label="Product Name" icon={<FaBox />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Wireless Headphones"
                />
              </LegendWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Brand" icon={<FaTag />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. Sony"
                  />
                </LegendWrapper>
                <LegendWrapper label="Image URL" icon={<FaImage />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/product.jpg"
                  />
                </LegendWrapper>
              </div>

              <LegendWrapper label="Description" icon={<FaAlignLeft />}>
                <textarea
                  className={`${baseInputStyles} h-24 resize-y`}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description of the product..."
                />
              </LegendWrapper>
            </div>

            {/* 2. Offer Details */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaDollarSign className="text-[#f35d36]" /> Offer / Pricing
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <LegendWrapper label="Offer Type">
                  <Select
                    options={offerTypeOptions}
                    value={offerTypeOptions.find(
                      (opt) => opt.value === formData.offerType
                    )}
                    onChange={(opt) => handleSelectChange("offerType", opt)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </LegendWrapper>
                <LegendWrapper label="Offer URL" icon={<FaLink />}>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="offerUrl"
                    value={formData.offerUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/buy"
                  />
                </LegendWrapper>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Currency">
                  <Select
                    options={currencyOptions}
                    value={currencyOptions.find(
                      (opt) => opt.value === formData.priceCurrency
                    )}
                    onChange={(opt) => handleSelectChange("priceCurrency", opt)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </LegendWrapper>
                <LegendWrapper label="Price" required>
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 99.99"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Aggregate Rating */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaStar className="text-[#f35d36]" /> Aggregate Rating
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <LegendWrapper label="Rating Value">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="aggregateRatingValue"
                    value={formData.aggregateRatingValue}
                    onChange={handleInputChange}
                    placeholder="4.5"
                  />
                </LegendWrapper>
                <LegendWrapper label="Review Count">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="numberOfRatings"
                    value={formData.numberOfRatings}
                    onChange={handleInputChange}
                    placeholder="120"
                  />
                </LegendWrapper>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Highest Allowed">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="highestAllowed"
                    value={formData.highestAllowed}
                    onChange={handleInputChange}
                    placeholder="5"
                  />
                </LegendWrapper>
                <LegendWrapper label="Lowest Allowed">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="lowestAllowed"
                    value={formData.lowestAllowed}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 4. Reviews */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaComment className="text-[#f35d36]" /> Customer Reviews
              </h4>

              {formData.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-4 relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <LegendWrapper label="Author Name" icon={<FaUser />}>
                      <input
                        type="text"
                        className={baseInputStyles}
                        value={review.author}
                        onChange={(e) =>
                          handleReviewChange(index, "author", e.target.value)
                        }
                      />
                    </LegendWrapper>
                    <LegendWrapper label="Rating (1-5)" icon={<FaStar />}>
                      <input
                        type="text"
                        className={baseInputStyles}
                        value={review.ratingValue}
                        onChange={(e) =>
                          handleReviewChange(
                            index,
                            "ratingValue",
                            e.target.value
                          )
                        }
                      />
                    </LegendWrapper>
                  </div>
                  <LegendWrapper label="Review Body">
                    <textarea
                      className={`${baseInputStyles} h-20 resize-y`}
                      value={review.reviewBody}
                      onChange={(e) =>
                        handleReviewChange(index, "reviewBody", e.target.value)
                      }
                      placeholder="The product was amazing..."
                    />
                  </LegendWrapper>

                  <button
                    onClick={() => removeReview(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm border border-gray-100 transition-all"
                    title="Remove Review"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                onClick={addReview}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-2"
              >
                <FaPlus size={12} /> Add Review
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

export default ProductSchemaForm;
