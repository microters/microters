"use client";

import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaPlus,
  FaTrash,
  FaCopy,
  FaCheck,
  FaGoogle,
  FaRegCommentDots,
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

const FAQPageSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is FAQ Schema?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FAQ Schema helps improve SEO by marking up questions and answers.",
        },
      },
      {
        "@type": "Question",
        name: "How to use this generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fill in the questions and answers, then click Generate Schema.",
        },
      },
    ],
  };

  // --- STATE ---
  const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);
  const [displayedSchema, setDisplayedSchema] = useState(defaultSchema);

  // --- HANDLERS ---
  const handleFaqChange = (index, field, value) => {
    const updatedFaqList = faqList.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    setFaqList(updatedFaqList);
  };

  const addQuestion = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    if (faqList.length <= 1) {
      toast.warning("You must have at least one question.");
      return;
    }
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = (e) => {
    e.preventDefault();

    // Basic validation
    const isValid = faqList.every(
      (item) => item.question.trim() && item.answer.trim()
    );
    if (!isValid) {
      toast.warning("Please fill out all questions and answers.");
      return;
    }

    const newSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
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
    setFaqList([{ question: "", answer: "" }]);
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
            {/* Dynamic FAQ List */}
            {faqList.map((faq, index) => (
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
                    FAQ Item
                  </h4>

                  {/* Delete Button */}
                  {faqList.length > 1 && (
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove this question"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <LegendWrapper label="Question" icon={<FaQuestionCircle />}>
                    <input
                      type="text"
                      className={baseInputStyles}
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      placeholder="e.g. What is your return policy?"
                    />
                  </LegendWrapper>

                  <LegendWrapper label="Answer" icon={<FaRegCommentDots />}>
                    <textarea
                      className={`${baseInputStyles} h-24 resize-y`}
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                      placeholder="e.g. You can return items within 30 days..."
                    />
                  </LegendWrapper>
                </div>
              </div>
            ))}

            {/* Add New Button */}
            <button
              onClick={addQuestion}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#f35d36] hover:text-[#f35d36] transition-all font-semibold flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Another Question
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

export default FAQPageSchemaForm;
