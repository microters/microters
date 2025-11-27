"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { 
  FaRobot, FaHatCowboy, FaBriefcase, 
  FaHandshake, FaGraduationCap, FaPalette, FaGear, 
  FaCopy, FaWandMagicSparkles 
} from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegSmile } from "react-icons/fa";

// --- DATA ---
const toneOptions = [
  { label: "Neutral", value: "neutral", icon: <FaRobot /> },
  { label: "Formal", value: "formal", icon: <FaHatCowboy /> },
  { label: "Friendly", value: "friendly", icon: <FaRegSmile /> },
  { label: "Professional", value: "professional", icon: <FaBriefcase /> },
  { label: "Diplomatic", value: "diplomatic", icon: <FaHandshake /> },
  { label: "Academic", value: "academic", icon: <FaGraduationCap /> },
  { label: "Vivid", value: "vivid", icon: <FaPalette /> },
  { label: "Custom...", value: "custom", icon: <FaGear /> },
];

const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
`;

// 2. Legend Label Wrapper
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
    backgroundColor: state.isSelected ? "#f35d36" : state.isFocused ? "#feefeb" : "white",
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
  })
};

const AcronymTool = () => {
  // State
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState(null);
  const [customTone, setCustomTone] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);

  // Fetch Data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch Countries
        const countryRes = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,languages");
        if (countryRes.ok) {
          const countryData = await countryRes.json();
          const formattedCountries = countryData
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((c) => ({
              label: c.name.common,
              value: c.name.common,
              languages: c.languages ? Object.values(c.languages).join(", ") : "English",
              flag: c.flags.svg,
            }));
          setCountries(formattedCountries);
        }

        // Fetch Keys
        const keyRes = await fetch("https://ytubetools.com/api/openaiKey");
        if (keyRes.ok) {
          const keyData = await keyRes.json();
          const activeKeys = keyData.filter((key) => key.active);
          if (activeKeys.length > 0) setApiKeys(activeKeys);
        }
      } catch (error) {
        console.error("Init Error:", error);
      }
    };
    initializeData();
  }, []);

  // Generate Logic
  const handleGenerateResults = async () => {
    if (!topic.trim() || !country || !tone) {
      toast.warning("Please fill in required fields.");
      return;
    }

    setLoading(true);
    setResults([]);

    const languageName = country.languages || "English";
    const selectedTone = tone.value === "custom" ? customTone : tone.label;

    for (const apiKey of apiKeys) {
      try {
        const { token, serviceType } = apiKey;
        let url = "";
        let headers = { "Content-Type": "application/json" };
        let body = {};

        const systemPrompt = `Generate 3 acronyms. Topic: "${topic}". Goal: "${goal}". Language: ${languageName}. Tone: ${selectedTone}.`;
        const userPrompt = `Output 3 acronyms. Format: <ACRONYM>: <Title> - <Description>. Separate with "###".`;

        if (serviceType === "openai") {
          url = "https://api.openai.com/v1/chat/completions";
          headers["Authorization"] = `Bearer ${token}`;
          body = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
            temperature: 0.7,
          };
        } else if (serviceType === "azure") {
          url = "https://nazmul.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview";
          headers["api-key"] = token;
          body = {
             messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
             temperature: 0.7,
          };
        } else { continue; }

        const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();
        if (data?.choices?.length > 0) {
          const rawText = data.choices[0].message.content.trim();
          let parsedResults = rawText.split("###").map((r) => r.trim()).filter((r) => r.length > 0);
          if (parsedResults.length === 0) parsedResults = [rawText];
          setResults(parsedResults);
          setLoading(false);
          return;
        }
      } catch (error) { console.error("Key Failed", error); }
    }
    setLoading(false);
    toast.error("Service currently unavailable.");
  };

  const handleCustomToneSave = () => {
    if (customTone.trim()) {
      setTone({ label: customTone, value: "custom", icon: <FaGear /> });
      setShowCustomModal(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme="colored" />
      
      <div className="space-y-8">
        
        {/* Topic & Goal */}
        <div className="grid grid-cols-1 gap-6">
          <LegendWrapper label="What is your topic?" required>
            <textarea
              className={`${baseInputStyles} h-32 resize-none`}
              placeholder="e.g. Digital Marketing Strategies for 2025..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </LegendWrapper>

          <LegendWrapper label="What is your goal?">
             <input
              type="text"
              className={baseInputStyles}
              placeholder="e.g. To inspire the sales team..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </LegendWrapper>
        </div>

        {/* Tone & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LegendWrapper label="Tone" required>
             <Select
                options={toneOptions}
                value={tone}
                onChange={(opt) => opt.value === "custom" ? setShowCustomModal(true) : setTone(opt)}
                placeholder="Select a tone..."
                styles={customSelectStyles}
                formatOptionLabel={e => (
                  <div className="flex items-center gap-2">
                    <span className="text-[#f35d36] text-lg">{e.icon}</span>
                    <span>{e.label}</span>
                  </div>
                )}
              />
          </LegendWrapper>

          <LegendWrapper label="Language" required>
             <Select
                options={countries}
                value={country}
                onChange={setCountry}
                placeholder="Select language..."
                styles={customSelectStyles}
                formatOptionLabel={e => (
                  <div className="flex items-center gap-3">
                    {e.flag ? (
                        <img src={e.flag} alt={e.label} className="w-5 h-auto rounded-sm shadow-sm border border-gray-100" />
                    ) : (
                        <span className="text-lg">🌍</span>
                    )}
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-sm">{e.label}</span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{e.languages}</span>
                    </div>
                  </div>
                )}
              />
          </LegendWrapper>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleGenerateResults}
          disabled={loading}
          className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="animate-pulse">Generating Magic...</span>
          ) : (
            <>
              <FaWandMagicSparkles /> Generate Acronym
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-12 border-t border-gray-100 pt-10">
          <h3 className="text-2xl font-bold text-[#15151e] mb-6 text-center">Generated Results</h3>
          <div className="grid grid-cols-1 gap-4">
            {results.map((res, idx) => (
              <div 
                key={idx} 
                className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#f35d36] transition-all flex items-start justify-between gap-4"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#feefeb] text-[#f35d36] rounded-full flex items-center justify-center font-bold text-sm mt-1">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap pt-1">
                    {res}
                  </p>
                </div>
                <button 
                  onClick={() => handleCopy(res)}
                  className="text-gray-400 hover:text-[#f35d36] transition-colors p-2"
                  title="Copy"
                >
                  <FaCopy size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6">
             <h3 className="text-xl font-bold text-[#15151e] mb-4">Add Custom Tone</h3>
             <input 
                type="text"
                className={baseInputStyles}
                placeholder="e.g. Sarcastic..."
                value={customTone}
                onChange={(e) => setCustomTone(e.target.value)}
                autoFocus
              />
              <div className="mt-6 flex justify-end gap-3">
                 <button onClick={() => setShowCustomModal(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button onClick={handleCustomToneSave} className="px-5 py-2 bg-[#f35d36] text-white font-bold rounded-lg hover:bg-[#d64d29]">Save</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcronymTool;