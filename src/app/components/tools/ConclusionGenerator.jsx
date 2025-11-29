"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  FaRobot,
  FaHatCowboy,
  FaBriefcase,
  FaHandshake,
  FaGraduationCap,
  FaPalette,
  FaGear,
  FaCopy,
  FaWandMagicSparkles,
  FaBookOpen,
  FaUserGraduate,
  FaGem,
  FaThumbsUp,
} from "react-icons/fa6";
import { FaRegSmile, FaRegComments, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
`;

const LegendWrapper = ({ label, required, children }) => (
  <div className="relative mt-2 w-full">
    <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-bold text-[#15151e] z-10">
      {label} {required && <span className="text-[#f35d36]">*</span>}
    </label>
    {children}
  </div>
);

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px solid #f35d36" : "1px solid #d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #f35d36" : "none",
    padding: "2px",
    borderRadius: "4px",
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

// --- TONE OPTIONS (Mapped to Icons) ---
const toneOptions = [
  { label: "Neutral", value: "neutral", icon: <FaRobot /> },
  { label: "Formal", value: "formal", icon: <FaHatCowboy /> },
  { label: "Friendly", value: "friendly", icon: <FaRegSmile /> },
  { label: "Casual", value: "casual", icon: <FaRegComments /> },
  { label: "Professional", value: "professional", icon: <FaBriefcase /> },
  { label: "Diplomatic", value: "diplomatic", icon: <FaHandshake /> },
  { label: "Academic", value: "academic", icon: <FaGraduationCap /> },
  { label: "Simplified", value: "simplified", icon: <FaBookOpen /> },
  { label: "Vivid", value: "vivid", icon: <FaPalette /> },
  { label: "Empathetic", value: "empathetic", icon: <FaUserGraduate /> },
  { label: "Luxury", value: "luxury", icon: <FaGem /> },
  { label: "Engaging", value: "engaging", icon: <FaThumbsUp /> },
  { label: "Direct", value: "direct", icon: <FaArrowRight /> },
  { label: "Custom...", value: "custom", icon: <FaGear /> },
];

const ConclusionGenerator = () => {
  // State
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState(null);
  const [customTone, setCustomTone] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  // Fetch Countries using fetch() instead of axios
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,languages"
        );

        if (!response.ok) throw new Error("Failed to fetch countries");

        const data = await response.json();

        const countryData = data
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
            languages: Object.values(country.languages || {}).join(", "),
            flag: country.flags.svg,
          }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleGenerateResults = async () => {
    if (!topic.trim()) {
      toast.warning("Please write a topic before generating conclusions.");
      return;
    }
    if (topic.length > 2000) {
      toast.warning("The topic must not be greater than 2000 characters.");
      return;
    }
    if (!country) {
      toast.warning("Please select a language.");
      return;
    }
    if (!tone) {
      toast.warning("Please select a tone.");
      return;
    }

    setLoading(true);
    setResults([]);

    const language = country.languages || "English";
    const selectedTone = tone.value === "custom" ? customTone : tone.label;

    // --- Access variables from ENV ---
    const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;

    if (!apiKey || !endpoint) {
      toast.error("API Configuration missing. Please check .env file.");
      setLoading(false);
      return;
    }

    const body = {
      messages: [
        {
          role: "system",
          content: `You are an assistant that generates Paragraphs for this Topic. The Paragraph should be written in ${language} with a ${selectedTone} tone.`,
        },
        {
          role: "user",
          content: `Generate three distinct and meaningful Paragraphs based on the following Topic: "${topic}". Separate the conclusions with "###".`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1400,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    };

    try {
      // --- Using fetch() instead of axios ---
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data?.choices?.length > 0) {
        const generatedText = data.choices[0].message.content.trim();
        const splitResults = generatedText
          .split("###")
          .map((result) => result.trim())
          .filter((r) => r.length > 0);
        setResults(splitResults);
      }
    } catch (error) {
      console.error("Error generating results:", error);
      toast.error(
        "Failed to generate results. Please check your connection or API limit."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCustomToneSave = () => {
    if (customTone.trim()) {
      setTone({ label: customTone, value: "custom", icon: <FaGear /> });
      setShowCustomModal(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="space-y-8">
          {/* Topic Input */}
          <LegendWrapper label="Topic / Essay Content" required>
            <textarea
              className={`${baseInputStyles} h-40 resize-y`}
              placeholder="Paste your essay or topic here..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={2000}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {topic.length}/2000
            </div>
          </LegendWrapper>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tone Select */}
            <LegendWrapper label="Tone" required>
              <Select
                options={toneOptions}
                value={tone}
                onChange={(opt) =>
                  opt.value === "custom"
                    ? setShowCustomModal(true)
                    : setTone(opt)
                }
                placeholder="Select a tone..."
                styles={customSelectStyles}
                formatOptionLabel={(e) => (
                  <div className="flex items-center gap-2">
                    <span className="text-[#f35d36] text-lg">{e.icon}</span>
                    <span>{e.label}</span>
                  </div>
                )}
              />
            </LegendWrapper>

            {/* Language/Country Select */}
            <LegendWrapper label="Language" required>
              <Select
                options={countries}
                value={country}
                onChange={setCountry}
                placeholder="Select language..."
                styles={customSelectStyles}
                formatOptionLabel={(e) => (
                  <div className="flex items-center gap-3">
                    {e.flag ? (
                      <img
                        src={e.flag}
                        alt={e.label}
                        className="w-5 h-auto rounded-sm shadow-sm border border-gray-100"
                      />
                    ) : (
                      <span className="text-lg">🌍</span>
                    )}
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-sm">{e.label}</span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                        {e.languages}
                      </span>
                    </div>
                  </div>
                )}
              />
            </LegendWrapper>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateResults}
            disabled={loading}
            className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="animate-pulse">Generating Magic...</span>
            ) : (
              <>
                <FaWandMagicSparkles /> Generate Conclusion
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-10">
            <h3 className="text-2xl font-bold text-[#15151e] mb-6 text-center">
              Generated Conclusions
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {results.map((res, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all relative"
                >
                  <div className="absolute top-4 left-4 w-8 h-8 bg-[#feefeb] text-[#f35d36] rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>

                  <div className="pl-12 pr-10">
                    <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                      {res}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(res)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#f35d36] transition-colors p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-[#f35d36]"
                    title="Copy"
                  >
                    <FaCopy size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Tone Modal */}
        {showCustomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-[#15151e] mb-4">
                Add Custom Tone
              </h3>
              <LegendWrapper label="Tone Name" required>
                <input
                  type="text"
                  className={baseInputStyles}
                  placeholder="e.g. Sarcastic, Poetic..."
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value)}
                  autoFocus
                />
              </LegendWrapper>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomToneSave}
                  className="px-5 py-2.5 bg-[#f35d36] text-white font-bold rounded-lg hover:bg-[#d64d29] transition-colors shadow-sm hover:shadow"
                >
                  Save Tone
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConclusionGenerator;
