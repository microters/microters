"use client";

import React, { useState } from "react";
import Select from "react-select";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FaHammer,
  FaBoxOpen,
  FaListOl,
  FaClock,
  FaDollarSign,
  FaAlignLeft,
  FaImage,
  FaLink,
  FaHeading,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
  FaPlus,
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

const HowToSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Tie a Tie",
    description: "A step-by-step guide to tying a Windsor knot.",
    totalTime: "PT10M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        text: "Drape the tie around your neck.",
      },
    ],
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalTime: "",
    estimatedCost: "",
    currency: "USD",
    imageUrl: "",
    supplies: [],
    tools: [],
    steps: [],
  });

  const [generatedSchema, setGeneratedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCurrencyChange = (selectedOption) => {
    setFormData({ ...formData, currency: selectedOption.value });
  };

  // Supplies Logic
  const addSupply = () => {
    setFormData({ ...formData, supplies: [...formData.supplies, ""] });
  };

  const handleSupplyChange = (index, value) => {
    const updatedSupplies = formData.supplies.map((supply, i) =>
      i === index ? value : supply
    );
    setFormData({ ...formData, supplies: updatedSupplies });
  };

  const removeSupply = (index) => {
    setFormData({
      ...formData,
      supplies: formData.supplies.filter((_, i) => i !== index),
    });
  };

  // Tools Logic
  const addTool = () => {
    setFormData({ ...formData, tools: [...formData.tools, ""] });
  };

  const handleToolChange = (index, value) => {
    const updatedTools = formData.tools.map((tool, i) =>
      i === index ? value : tool
    );
    setFormData({ ...formData, tools: updatedTools });
  };

  const removeTool = (index) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((_, i) => i !== index),
    });
  };

  // Steps Logic
  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { text: "", imageUrl: "", url: "" }],
    });
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = formData.steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setFormData({ ...formData, steps: updatedSteps });
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: formData.name,
      description: formData.description,
      totalTime: formData.totalTime,
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: formData.currency,
        value: formData.estimatedCost,
      },
      image: formData.imageUrl
        ? {
            "@type": "ImageObject",
            url: formData.imageUrl,
          }
        : undefined,
      supply: formData.supplies.map((supply) => ({
        "@type": "HowToSupply",
        name: supply,
      })),
      tool: formData.tools.map((tool) => ({
        "@type": "HowToTool",
        name: tool,
      })),
      step: formData.steps.map((step) => ({
        "@type": "HowToStep",
        text: step.text,
        image: step.imageUrl,
        url: step.url,
      })),
    };

    // Clean undefined
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    setGeneratedSchema(cleanSchema);
    toast.success("How-To Schema generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(generatedSchema, null, 2))
      .then(() => {
        toast.success("JSON-LD copied to clipboard!");
      });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      totalTime: "",
      estimatedCost: "",
      currency: "USD",
      imageUrl: "",
      supplies: [],
      tools: [],
      steps: [],
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
              <LegendWrapper label="How-To Title" icon={<FaHeading />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. How to Fix a Leaky Faucet"
                />
              </LegendWrapper>

              <LegendWrapper label="Description" icon={<FaAlignLeft />}>
                <textarea
                  className={`${baseInputStyles} h-24 resize-y`}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="A brief summary of the tutorial..."
                />
              </LegendWrapper>

              <LegendWrapper label="Main Image URL" icon={<FaImage />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/main-image.jpg"
                />
              </LegendWrapper>
            </div>

            {/* 2. Time & Cost */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaClock className="text-[#f35d36]" /> Time & Cost
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LegendWrapper label="Total Time (ISO)">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="totalTime"
                    value={formData.totalTime}
                    onChange={handleInputChange}
                    placeholder="e.g. PT1H30M"
                  />
                </LegendWrapper>

                <LegendWrapper label="Currency">
                  <Select
                    options={currencyOptions}
                    value={currencyOptions.find(
                      (opt) => opt.value === formData.currency
                    )}
                    onChange={handleCurrencyChange}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </LegendWrapper>

                <LegendWrapper label="Est. Cost" icon={<FaDollarSign />}>
                  <input
                    type="number"
                    className={baseInputStyles}
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleInputChange}
                    placeholder="10.00"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Supplies & Tools */}
            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Supplies */}
                <div>
                  <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                    <FaBoxOpen className="text-[#f35d36]" /> Supplies
                  </h4>
                  <div className="space-y-3">
                    {formData.supplies.map((supply, index) => (
                      <div key={index} className="flex gap-2 relative">
                        <input
                          type="text"
                          className={baseInputStyles}
                          value={supply}
                          onChange={(e) =>
                            handleSupplyChange(index, e.target.value)
                          }
                          placeholder="e.g. Nails"
                        />
                        <button
                          type="button"
                          className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors"
                          onClick={() => removeSupply(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addSupply}
                    className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-3"
                  >
                    <FaPlus size={12} /> Add Supply
                  </button>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                    <FaHammer className="text-[#f35d36]" /> Tools
                  </h4>
                  <div className="space-y-3">
                    {formData.tools.map((tool, index) => (
                      <div key={index} className="flex gap-2 relative">
                        <input
                          type="text"
                          className={baseInputStyles}
                          value={tool}
                          onChange={(e) =>
                            handleToolChange(index, e.target.value)
                          }
                          placeholder="e.g. Hammer"
                        />
                        <button
                          type="button"
                          className="text-red-500 hover:bg-red-50 p-3 rounded-lg border border-red-100 transition-colors"
                          onClick={() => removeTool(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addTool}
                    className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-3"
                  >
                    <FaPlus size={12} /> Add Tool
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Steps */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-[#15151e] font-bold mb-5 flex items-center gap-2 text-lg">
                <FaListOl className="text-[#f35d36]" /> Instructions (Steps)
              </h4>

              {formData.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-4 relative group"
                >
                  <LegendWrapper label={`Step ${index + 1} Description`}>
                    <textarea
                      className={`${baseInputStyles} h-20 resize-y`}
                      value={step.text}
                      onChange={(e) =>
                        handleStepChange(index, "text", e.target.value)
                      }
                      placeholder="Explain this step..."
                    />
                  </LegendWrapper>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <LegendWrapper
                      label="Image URL (Optional)"
                      icon={<FaImage />}
                    >
                      <input
                        type="text"
                        className={baseInputStyles}
                        value={step.imageUrl}
                        onChange={(e) =>
                          handleStepChange(index, "imageUrl", e.target.value)
                        }
                      />
                    </LegendWrapper>
                    <LegendWrapper
                      label="Step URL (Optional)"
                      icon={<FaLink />}
                    >
                      <input
                        type="text"
                        className={baseInputStyles}
                        value={step.url}
                        onChange={(e) =>
                          handleStepChange(index, "url", e.target.value)
                        }
                      />
                    </LegendWrapper>
                  </div>

                  <button
                    onClick={() => removeStep(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm border border-gray-100 transition-all"
                    title="Remove Step"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addStep}
                className="text-[#f35d36] font-semibold text-sm hover:underline flex items-center gap-1 mt-2"
              >
                <FaPlus size={12} /> Add Step
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

export default HowToSchemaForm;
