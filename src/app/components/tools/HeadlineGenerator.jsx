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
  FaGem,
  FaThumbsUp,
} from "react-icons/fa6";
import {
  FaRegSmile,
  FaRegComments,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Link from "next/link";

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

// --- DATA ---
const toneOptionsData = [
  { label: "Neutral", value: "neutral", icon: <FaRobot /> },
  { label: "Formal", value: "formal", icon: <FaHatCowboy /> },
  { label: "Friendly", value: "friendly", icon: <FaRegSmile /> },
  { label: "Casual", value: "casual", icon: <FaRegComments /> },
  { label: "Professional", value: "professional", icon: <FaBriefcase /> },
  { label: "Diplomatic", value: "diplomatic", icon: <FaHandshake /> },
  { label: "Confident", value: "confident", icon: <FaThumbsUp /> },
  { label: "Academic", value: "academic", icon: <FaGraduationCap /> },
  { label: "Vivid", value: "vivid", icon: <FaPalette /> },
  { label: "Luxury", value: "luxury", icon: <FaGem /> },
  { label: "Direct", value: "direct", icon: <FaArrowRight /> },
  { label: "Custom...", value: "custom", icon: <FaGear /> },
];

const Headline = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // State
  const [mounted, setMounted] = useState(false);
  const [topic, setTopic] = useState("");
  const [rk, setRk] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState(null);
  const [customTone, setCustomTone] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);

  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [toneOptions, setToneOptions] = useState(toneOptionsData);

  // Prevent Hydration Errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Countries using fetch()
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,languages"
        );
        if (response.ok) {
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
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleGenerateResults = async () => {
    if (!topic.trim()) {
      toast.warning("Please enter a topic.");
      return;
    }
    if (!rk.trim()) {
      toast.warning("Please enter related keywords.");
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

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please refresh the page.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const recaptchaToken = await executeRecaptcha("generate_headline");
      if (!recaptchaToken) {
        throw new Error("Failed to verify reCAPTCHA.");
      }

      const language = country.languages || "English";
      const selectedTone = tone.value === "custom" ? customTone : tone.label;

      const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
      const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;

      if (!apiKey || !endpoint) {
        toast.error("API Configuration missing. Please check .env file.");
        setLoading(false);
        return;
      }

      // 3. Prepare Prompt
      const systemPrompt = `You are an assistant that generates 10 SEO-friendly headlines for the topic "${topic}" & related keyword "${rk}". Headlines should be written in ${language} with a ${selectedTone} tone. Ensure they are concise and engaging.`;
      const userPrompt = `Generate exactly 10 distinct SEO-friendly headlines for topic "${topic}" & keywords "${rk}". Return the headlines separated by "###".`;

      const body = {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };

      // 4. Call API using fetch
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API Request Failed: ${response.statusText}`);
      }

      const data = await response.json();

      // 5. Process Results
      if (data?.choices?.length > 0) {
        const generatedText = data.choices[0].message.content.trim();

        // Split results by separator
        let splitResults = generatedText
          .split("###")
          .map((r) => r.trim())
          .filter((r) => r.length > 0);

        // Fallback: If AI returns numbered list instead of ###
        if (splitResults.length < 2 && generatedText.includes("\n")) {
          splitResults = generatedText
            .split("\n")
            .map((r) => r.replace(/^\d+\.\s*/, "").trim())
            .filter((r) => r.length > 0);
        }

        // Cap at 10 results
        if (splitResults.length > 10) {
          splitResults = splitResults.slice(0, 10);
        }

        setResults(splitResults);
      }
    } catch (error) {
      console.error("Generation Error:", error);
      toast.error("Failed to generate results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomToneSave = () => {
    if (customTone.trim()) {
      const customOption = {
        label: customTone,
        value: customTone.toLowerCase(),
        icon: <FaGear />,
      };
      setToneOptions([...toneOptions, customOption]);
      setTone(customOption);
      setShowCustomModal(false);
      setCustomTone("");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Prevent rendering until mounted (fixes hydration errors)
  if (!mounted) return null;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="space-y-8">
        {/* Input Section */}
        <div className="flex flex-col gap-6">
          <LegendWrapper label="Topic" required>
            <textarea
              className={`${baseInputStyles} h-32 resize-y`}
              placeholder="Enter your topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {topic.length}/500
            </div>
          </LegendWrapper>

          <LegendWrapper label="Related Keywords" required>
            <input
              type="text"
              className={baseInputStyles}
              placeholder="Enter related keywords..."
              value={rk}
              onChange={(e) => setRk(e.target.value)}
              maxLength={500}
            />
          </LegendWrapper>
        </div>

        {/* Selects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LegendWrapper label="Tone" required>
            <Select
              instanceId="tone-select"
              options={toneOptions}
              value={tone}
              onChange={(opt) =>
                opt.value === "custom" ? setShowCustomModal(true) : setTone(opt)
              } // FIX: Updated setter name
              placeholder="Select tone..."
              styles={customSelectStyles}
              formatOptionLabel={(e) => (
                <div className="flex items-center gap-2">
                  <span className="text-[#f35d36] text-lg">{e.icon}</span>
                  <span>{e.label}</span>
                </div>
              )}
            />
          </LegendWrapper>

          <LegendWrapper label="Language" required>
            <Select
              instanceId="country-select"
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
              <FaWandMagicSparkles /> Generate Headlines
            </>
          )}
        </button>
        <p className="text-[10px] text-gray-400 text-center leading-tight max-w-xs mx-auto">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-[#f35d36] hover:underline">Privacy Policy</Link> and{' '}
            <Link href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-[#f35d36] hover:underline">Terms of Service</Link> apply.
        </p>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="mt-12 border-t border-gray-100 pt-10">
          <h3 className="text-2xl font-bold text-[#15151e] mb-6 text-center">
            Generated Headlines
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="group bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 w-full">
                  <div className="shrink-0 w-8 h-8 bg-[#feefeb] text-[#f35d36] rounded-full flex items-center justify-center font-bold text-sm mt-1">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed pt-1 font-medium w-full">
                    {res}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(res)}
                  className="text-gray-400 hover:text-[#f35d36] transition-colors p-2 shrink-0"
                  title="Copy"
                >
                  <FaCopy size={18} />
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#15151e]">
                Add Custom Tone
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <LegendWrapper label="Tone Name" required>
              <input
                type="text"
                className={baseInputStyles}
                placeholder="e.g. Sarcastic..."
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
  );
};

const HeadlineGenerator = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Headline />
    </GoogleReCaptchaProvider>
  );
};

export default HeadlineGenerator;
