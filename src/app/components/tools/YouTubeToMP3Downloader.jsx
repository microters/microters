"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { FaArrowRight, FaCircleNotch, FaDownload, FaLink, FaMusic, FaSearch, FaStar, FaYoutube } from "react-icons/fa";

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[60px] text-lg
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

// --- RELATED TOOLS DATA ---
const relatedTools = [
  {
    name: "YouTube Video Downloader",
    href: "/video-tools/youtube-video-downloader",
  },
  { name: "YouTube to MP4", href: "/video-tools/youtube-to-mp4-downloader" },
  { name: "YouTube to MP3", href: "/video-tools/youtube-to-mp3-downloader" },
  {
    name: "YouTube Shorts Downloader",
    href: "/video-tools/youtube-shorts-downloader",
  },
  {
    name: "YouTube Shorts to MP3",
    href: "/video-tools/youtube-shorts-to-mp3-downloader",
  },
  {
    name: "YouTube Shorts to MP4",
    href: "/video-tools/youtube-shorts-to-mp4-downloader",
  },
];

const YouTubeToMP3Downloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  // --- FETCH HANDLER ---
  const fetchFormats = async () => {
    if (!url.trim()) {
      toast.warning("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      const response = await fetch("https://ytd.mhnazmul.com/getFormats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }

      const data = await response.json();
      setVideoData(data);
      toast.success("Video found!");
    } catch (err) {
      console.error("Error fetching formats:", err);
      toast.error("Error fetching video. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  // --- DOWNLOAD HANDLER ---
  const handleDownload = (type, itag) => {
    try {
      const downloadUrl = `https://ytd.mhnazmul.com/download${type}?url=${encodeURIComponent(
        url
      )}&itag=${itag}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");
    } catch (e) {
      toast.error("Download failed to start.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10 max-w-4xl mx-auto">
        {/* --- INPUT SECTION --- */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
                <LegendWrapper
                  label="Paste Video URL"
                  icon={<FaLink />}
                  required
                >
                  <input
                    type="text"
                    className={baseInputStyles}
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </LegendWrapper>
              </div>
              <button
                onClick={fetchFormats}
                disabled={loading}
                className="w-full bg-[#f35d36] hover:bg-[#d64d29] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <FaCircleNotch className="animate-spin" />
                ) : (
                  <FaSearch />
                )}
                {loading ? "Fetching..." : "Convert"}
              </button>
        </div>

        {/* --- RESULTS SECTION (SHOWN BELOW) --- */}
        {videoData && (
          <div className="mt-12 pt-10 border-t border-gray-200 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Thumbnail & Title */}
              <div className="md:col-span-5">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <img
                    src={videoData.thumbnail}
                    alt={videoData.videoTitle}
                    className="w-full h-auto rounded-xl shadow-md mb-4 aspect-video object-cover"
                  />
                  <h3 className="font-bold text-gray-800 text-lg leading-snug line-clamp-2">
                    {videoData.videoTitle}
                  </h3>
                </div>
              </div>

              {/* Download Options */}
              <div className="md:col-span-7">
                <div className="bg-[#15151e] p-6 rounded-2xl shadow-xl border border-gray-800 h-full">
                  <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
                    <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                    <h4 className="text-white font-bold text-lg">
                      Available Audio Formats
                    </h4>
                  </div>

                  <div className="grid gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {videoData.formats
                      .filter((format) => format.type === "audio")
                      .map((format, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                              <FaMusic />
                            </div>
                            <div>
                              <div className="text-white font-bold text-sm">
                                {format.qualityLabel || "High Quality"} (MP3)
                              </div>
                              <div className="text-xs text-gray-400 uppercase font-mono">
                                {format.container} • Audio
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDownload("Audio", format.itag)}
                            className="bg-[#f35d36] hover:bg-[#d64d29] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-colors flex items-center gap-2"
                          >
                            Download <FaDownload />
                          </button>
                        </div>
                      ))}
                    {videoData.formats.filter((f) => f.type === "audio")
                      .length === 0 && (
                      <p className="text-gray-500 text-center italic py-4">
                        No audio streams found for this video.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- RELATED TOOLS & SOCIAL PROOF --- */}
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col items-center gap-8">
          {/* Related Tools Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {relatedTools.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-600 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
            <Link
              href="/all-tools"
              className="px-5 py-2.5 bg-white hover:bg-purple-50 border border-purple-500 text-purple-600 rounded-full text-sm font-bold transition-colors flex items-center gap-1"
            >
              All Tools <FaArrowRight size={12} />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  src={`https://i.pravatar.cc/100?img=${i + 15}`}
                  alt={`User ${i}`}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-yellow-400 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>
              <span className="text-purple-700 font-medium text-sm">
                and 150,000+ others
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YouTubeToMP3Downloader;
