"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios"; // ✅ Add axios
import {
  FaYoutube,
  FaLink,
  FaDownload,
  FaVideo,
  FaMusic,
  FaPlay,
  FaCircleNotch,
  FaStar,
  FaArrowRight,
} from "react-icons/fa6";

// ✅ API Configuration (File 1 এর মতো)
const API_BASE = "https://api.videoters.com";
const API_KEY = '95a661856e8f6d7b65b43ce6c7943c9b09c0be46c4f2d90528b81076fe984434';

// --- STYLES ---
const baseInputStyles = `
  w-full bg-white border border-gray-300 rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
  focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
  transition-all duration-300 ease-in-out min-h-[50px]
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

// --- DATA FOR LINKS ---
const relatedTools = [
  { name: "YouTube Video Downloader", href: "/video-tools/youtube-video-downloader" },
  { name: "YouTube to MP4", href: "/video-tools/youtube-to-mp4-downloader" },
  { name: "YouTube to MP3", href: "/video-tools/youtube-to-mp3-downloader" },
  { name: "YouTube Shorts Downloader", href: "/video-tools/youtube-shorts-downloader" },
  { name: "YouTube Shorts to MP3", href: "/video-tools/youtube-shorts-to-mp3-downloader" },
  { name: "YouTube Shorts to MP4", href: "/video-tools/youtube-shorts-to-mp4-downloader" },
];

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(null); // ✅ Progress tracking

  // ✅ Get Embed URL (File 1 থেকে)
  const getEmbedUrl = (youtubeUrl) => {
    try {
      const urlObj = new URL(youtubeUrl);
      let videoId = urlObj.searchParams.get("v");
      if (!videoId) {
        videoId = urlObj.pathname.split("/").filter(Boolean)[0];
      }
      console.log("[getEmbedUrl] Extracted videoId:", videoId);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch (e) {
      console.error("[getEmbedUrl] URL parse error:", e);
      return "";
    }
  };

  // ✅ IMPROVED FETCH - File 1 এর মতো axios সহ
  const fetchFormats = async () => {
    if (!url.trim()) {
      toast.warning("Please enter a valid YouTube URL.");
      return;
    }

    // ✅ URL validation (File 1 থেকে)
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      console.log("[fetchFormats] Calling API:", `${API_BASE}/api/fetchFormats`);

      // ✅ Use axios like File 1 (better error handling)
      const response = await axios.post(
        `${API_BASE}/api/fetchFormats`,
        { url },
        {
          headers: { "X-API-Key": API_KEY }
        }
      );

      console.log("[fetchFormats] API response:", response.data);

      if (response.data.formats && response.data.formats.length > 0) {
        setVideoData({
          ...response.data,
          embedUrl: getEmbedUrl(url)
        });
        toast.success("Video found!");
      } else {
        toast.error("No formats available for this video.");
      }
    } catch (err) {
      console.error("[fetchFormats] Error:", err);
      const errorMessage = err?.response?.data?.detail || 
                          err.message || 
                          'Failed to extract video information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ IMPROVED DOWNLOAD - File 1 এর প্রগ্রেস ট্র্যাকিং সহ
  const handleDownload = async (qualityLabel, isAudio = false) => {
    try {
      let quality = "best";
      let fileFormat = "mp4";

      if (!isAudio && qualityLabel) {
        const qualityMatch = qualityLabel.match(/(\d+)/);
        quality = qualityMatch ? qualityMatch[1] : "best";
      }

      if (isAudio) {
        fileFormat = "mp3";
      }

      console.log("[handleDownload] Quality:", quality, "Format:", fileFormat);

      // ✅ Build stream URL
      const streamUrl = `${API_BASE}/stream?url=${encodeURIComponent(url)}&quality=${quality}&format=${fileFormat}&key=${API_KEY}`;

      // ✅ Show progress modal
      setDownloadProgress({
        show: true,
        quality: qualityLabel || "Audio",
        filename: `video_${quality}p.${fileFormat}`,
        status: 'starting',
        message: 'Initializing download...',
        percent: 0
      });

      // ✅ Fetch with progress tracking (File 1 থেকে)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 min timeout

      const response = await fetch(streamUrl, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const chunks = [];
      let received = 0;

      // ✅ Read stream with progress
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        received += value.length;

        const percent = total > 0 ? Math.round((received / total) * 100) : 0;
        const receivedMB = (received / 1048576).toFixed(1);
        const totalMB = total > 0 ? (total / 1048576).toFixed(1) : '?';

        setDownloadProgress(prev => prev ? {
          ...prev,
          status: 'downloading',
          message: `Downloading: ${percent}% (${receivedMB}MB / ${totalMB}MB)`,
          percent
        } : null);

        console.log(`[Progress] ${percent}% - ${receivedMB}MB / ${totalMB}MB`);
      }

      // ✅ Create blob and download
      const blob = new Blob(chunks, { type: `video/${fileFormat}` });
      const blobUrl = URL.createObjectURL(blob);

      setDownloadProgress(prev => prev ? {
        ...prev,
        status: 'completed',
        message: `Ready! ${(received / 1048576).toFixed(1)}MB`,
        percent: 100
      } : null);

      // ✅ Trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `video_${quality}p.${fileFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

      // Auto close after 3 seconds
      setTimeout(() => {
        setDownloadProgress(null);
      }, 3000);

      toast.success("Download started!");

    } catch (err) {
      console.error("[handleDownload] Error:", err);
      setDownloadProgress(prev => prev ? {
        ...prev,
        status: 'error',
        message: 'Download failed. Please try again.'
      } : null);
      toast.error(err.message || "Download failed to start.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Wrapper */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10 max-w-4xl mx-auto">
        
        {/* --- TOOL SECTION --- */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <LegendWrapper label="Video URL" icon={<FaLink />} required>
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
              <span className="animate-pulse flex items-center gap-2">
                <FaCircleNotch className="animate-spin" /> Fetching Formats...
              </span>
            ) : (
              <>
                <FaPlay /> Get Video
              </>
            )}
          </button>
        </div>

        {/* --- PROGRESS MODAL --- */}
        {downloadProgress?.show && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="rounded-xl p-6 max-w-md w-full border border-gray-700 bg-[#121214]">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border ${
                  downloadProgress.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                  downloadProgress.status === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                }`}>
                  {downloadProgress.status === 'completed' && '✅'}
                  {downloadProgress.status === 'error' && '❌'}
                  {['downloading', 'starting'].includes(downloadProgress.status) && <FaDownload className="animate-bounce" />}
                </div>

                <h3 className="text-base font-semibold text-neutral-200 tracking-tight mb-1">
                  {downloadProgress.status === 'completed' ? '✅ Download Complete!' : '📥 Downloading...'}
                </h3>

                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono mb-3 text-white bg-blue-500">
                  {downloadProgress.quality}
                </span>

                <p className="text-neutral-500 font-mono text-xs mb-4 truncate px-4">
                  {downloadProgress.filename}
                </p>

                <p className={`text-xs font-medium ${
                  downloadProgress.status === 'error' ? 'text-red-400' : 'text-emerald-500'
                }`}>
                  {downloadProgress.message}
                </p>

                {['downloading', 'processing'].includes(downloadProgress.status) && (
                  <div className="mt-4">
                    <div className="h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress.percent || 5}%` }} 
                      />
                    </div>
                  </div>
                )}

                {(downloadProgress.status === 'completed' || downloadProgress.status === 'error') && (
                  <button
                    onClick={() => setDownloadProgress(null)}
                    className="mt-5 w-full py-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- RESULTS SECTION --- */}
        {videoData && (
          <div className="mt-10 border-t border-gray-200 pt-10 animate-fade-in-up">
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Video Preview & Download
                </h3>
              </div>

              <div className="space-y-6">
                {/* Video Info & Embed */}
                <div>
                  <h4 className="text-white font-bold text-xl mb-4 leading-tight">
                    {videoData.videoTitle}
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg aspect-video bg-black relative group">
                    {videoData.embedUrl && (
                      <iframe
                        width="100%"
                        height="100%"
                        src={videoData.embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                      ></iframe>
                    )}
                  </div>
                </div>

                {/* Download Options List */}
                <div>
                  <h5 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FaDownload className="text-[#f35d36]"/> Available Qualities
                  </h5>
                  
                  <div className="grid gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {/* MP3 Audio Download */}
                    <div className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30">
                          <FaMusic />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">Audio Only</div>
                          <div className="text-xs text-gray-400 uppercase font-mono">mp3 • Audio</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(null, true)}
                        className="bg-[#f35d36] hover:bg-[#d64d29] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-colors flex items-center gap-2"
                      >
                        Download <FaDownload />
                      </button>
                    </div>

                    {/* Video Formats */}
                    {videoData.formats?.map((format, index) => (
                      <div key={index} className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30">
                            <FaVideo />
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm">
                              {format.qualityLabel || "Unknown"}
                            </div>
                            <div className="text-xs text-gray-400 uppercase font-mono">
                              {format.type} • Video
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(format.qualityLabel)}
                          className="bg-[#f35d36] hover:bg-[#d64d29] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-colors flex items-center gap-2"
                        >
                          Download <FaDownload />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- RELATED TOOLS & SOCIAL PROOF SECTION --- */}
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col items-center gap-8">
          
          {/* Related Tools Pills (Now Linked) */}
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
            
            {/* All Tools Link */}
            <Link 
              href="/all-tools"
              className="px-5 py-2.5 bg-white hover:bg-purple-50 border border-purple-500 text-purple-600 rounded-full text-sm font-bold transition-colors flex items-center gap-1"
            >
              All Tools <FaArrowRight size={12} />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt={`User ${i}`}
                />
              ))}
            </div>

            {/* Rating & Count */}
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

export default YouTubeDownloader;