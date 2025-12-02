"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPenNib,
  FaWandMagicSparkles,
  FaFont,
  FaParagraph,
  FaListUl,
  FaTextHeight,
  FaChartPie,
  FaEraser,
} from "react-icons/fa6";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out appearance-none
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

// --- COMPONENT ---
const WordsCounter = () => {
  const [inputText, setInputText] = useState("");
  const [statistics, setStatistics] = useState(null);

  const calculateStatistics = () => {
    if (!inputText.trim()) {
      toast.warning("Please enter some text to analyze.");
      return;
    }

    const trimmedText = inputText.trim();
    // Basic counts
    const words = trimmedText.split(/\s+/).filter((w) => w.length > 0);
    const sentences = trimmedText
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0);
    const characters = trimmedText.replace(/\s+/g, ""); // Characters without spaces
    const paragraphs = trimmedText
      .split(/\n+/)
      .filter((paragraph) => paragraph.trim().length > 0);

    // Keyword Frequency Logic
    const wordFrequency = {};
    words.forEach((word) => {
      const cleanedWord = word.toLowerCase().replace(/[^\w]/g, ""); // Remove punctuation
      // Filter out short words (length < 3) for better keyword relevance
      if (cleanedWord && cleanedWord.length > 2) {
        wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6) // Top 6 keywords
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / words.length) * 100).toFixed(1),
      }));

    setStatistics({
      words: words.length,
      sentences: sentences.length,
      characters: characters.length,
      paragraphs: paragraphs.length,
      keywords: sortedKeywords,
    });

    toast.success("Text analysis complete!");
  };

  const handleClear = () => {
    setInputText("");
    setStatistics(null);
    toast.info("Cleared.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: INPUT */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-[#15151e] flex items-center gap-2">
              <FaPenNib className="text-[#f35d36]" /> Content Input
            </h2>

            <LegendWrapper label="Paste Your Text Here" required>
              <textarea
                className={`${baseInputStyles} h-96 resize-y font-mono text-sm leading-relaxed`}
                rows="10"
                placeholder="Paste or type your content here to analyze word count, density, and more..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {/* Live Char Count Helper */}
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {inputText.length} chars (raw)
              </div>
            </LegendWrapper>

            <div className="flex gap-4">
              <button
                onClick={calculateStatistics}
                className="flex-1 bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-3 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWandMagicSparkles /> Analyze Text
              </button>

              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-[50px] transition-colors flex items-center gap-2"
                title="Clear Text"
              >
                <FaEraser />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800 flex flex-col h-full min-h-[400px]">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  Analysis Results
                </h3>
              </div>

              {statistics ? (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Grid Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Words */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center group hover:border-[#f35d36] transition-colors">
                      <FaFont className="text-[#f35d36] text-xl mx-auto mb-2 opacity-80" />
                      <div className="text-3xl font-bold text-white">
                        {statistics.words}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Words
                      </div>
                    </div>

                    {/* Characters */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center group hover:border-blue-500 transition-colors">
                      <FaTextHeight className="text-blue-400 text-xl mx-auto mb-2 opacity-80" />
                      <div className="text-3xl font-bold text-white">
                        {statistics.characters}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Chars (No Space)
                      </div>
                    </div>

                    {/* Sentences */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center group hover:border-green-500 transition-colors">
                      <FaListUl className="text-green-400 text-xl mx-auto mb-2 opacity-80" />
                      <div className="text-3xl font-bold text-white">
                        {statistics.sentences}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Sentences
                      </div>
                    </div>

                    {/* Paragraphs */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center group hover:border-purple-500 transition-colors">
                      <FaParagraph className="text-purple-400 text-xl mx-auto mb-2 opacity-80" />
                      <div className="text-3xl font-bold text-white">
                        {statistics.paragraphs}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Paragraphs
                      </div>
                    </div>
                  </div>

                  {/* Keyword Density Table */}
                  <div>
                    <h4 className="text-gray-300 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <FaChartPie className="text-[#f35d36]" /> Keyword Density
                      (Top 6)
                    </h4>
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                      <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-gray-700 text-gray-200">
                          <tr>
                            <th className="p-3 font-semibold border-b border-gray-600">
                              Keyword
                            </th>
                            <th className="p-3 font-semibold text-center border-b border-gray-600">
                              Count
                            </th>
                            <th className="p-3 font-semibold text-right border-b border-gray-600">
                              %
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {statistics.keywords.length > 0 ? (
                            statistics.keywords.map((k, i) => (
                              <tr
                                key={i}
                                className="hover:bg-white/5 transition-colors"
                              >
                                <td className="p-3 capitalize text-white font-medium">
                                  {k.word}
                                </td>
                                <td className="p-3 text-center">{k.count}</td>
                                <td className="p-3 text-right text-[#f35d36] font-mono">
                                  {k.percentage}%
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="3"
                                className="p-6 text-center text-gray-500 italic"
                              >
                                Not enough unique words found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 gap-4">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 shadow-inner">
                    <FaPenNib size={32} className="text-gray-600" />
                  </div>
                  <p className="text-center max-w-[200px] leading-relaxed">
                    Enter text on the left and click{" "}
                    <strong className="text-gray-400">Analyze</strong> to see
                    your statistics here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordsCounter;
