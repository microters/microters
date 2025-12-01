"use client";

import React, { useState } from "react";
import {
  FaFileContract,
  FaDownload,
  FaCopy,
  FaTrash,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const DisclaimerGenerator = () => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteURL: "",
    country: "",
    state: "",
    email: "",
    collectUserData: true,
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  const [generatedDisclaimer, setGeneratedDisclaimer] = useState("");
  const [downloadDisclaimer, setDownloadDisclaimer] = useState("");

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGenerate = () => {
    const {
      websiteName,
      websiteURL,
      country,
      state,
      email,
      collectUserData,
      lastUpdated,
    } = formData;

    if (!websiteName || !websiteURL || !country || !state || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const disclaimerText = `
Disclaimer for ${websiteName}

Effective Date: ${lastUpdated}

The information provided on ${websiteName} ("we," "our," or "us"), accessible from ${websiteURL}, is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is strictly at your own risk.

1. Professional Advice Disclaimer
The content provided on ${websiteName} is not intended as professional advice of any kind, including but not limited to financial, legal, or medical advice. Always seek the advice of a qualified professional regarding any specific matter.

2. External Links Disclaimer
Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.

3. Liability Disclaimer
In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of or in connection with the use of this website.

4. Data Collection
${
  collectUserData
    ? `We collect user data to improve our services. The data collected includes:
- Personal Information: Names, email addresses, and contact details.
- Usage Data: Browsing activity, interactions, and preferences.`
    : `We do not collect any personal data from users.`
}

5. Contact Us
If you have any questions or concerns about this disclaimer, please contact us at:
- Email: ${email}
- Location: ${state}, ${country}

By using ${websiteName}, you consent to this disclaimer and agree to its terms.
    `;

    // Simple HTML structure for download
    const disclaimerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disclaimer for ${websiteName}</title>
    <style>body{font-family:sans-serif;line-height:1.6;padding:20px;max-width:800px;margin:0 auto;color:#333}h1,h2{color:#15151e}</style>
</head>
<body>
    <h1>Disclaimer for ${websiteName}</h1>
    <p><strong>Effective Date:</strong> ${lastUpdated}</p>
    <p>The information provided on ${websiteName} ("we," "our," or "us"), accessible from ${websiteURL}, is for general informational purposes only...</p>
    ${disclaimerText.replace(/\n/g, "<br>")}
</body>
</html>`;

    setGeneratedDisclaimer(disclaimerText.trim());
    setDownloadDisclaimer(disclaimerHtml);
    toast.success("Disclaimer generated successfully!");
  };

  const handleCopy = () => {
    if (!generatedDisclaimer) {
      toast.warning("Generate a disclaimer first.");
      return;
    }
    navigator.clipboard.writeText(generatedDisclaimer);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!downloadDisclaimer) {
      toast.warning("Generate a disclaimer first.");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([downloadDisclaimer], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.websiteName.replace(
      /\s+/g,
      "_"
    )}_Disclaimer.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded HTML file!");
  };

  const handleReset = () => {
    setFormData({
      websiteName: "",
      websiteURL: "",
      country: "",
      state: "",
      email: "",
      collectUserData: true,
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    setGeneratedDisclaimer("");
    setDownloadDisclaimer("");
    toast.info("Form reset.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Main Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 lg:p-8 mb-8 border border-slate-200 shadow-lg shadow-[#ff9a3e]/10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-6">
            {/* Website Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper
                label="Website Name"
                icon={<FaFileContract />}
                required
              >
                <input
                  type="text"
                  name="websiteName"
                  className={baseInputStyles}
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="My Awesome Site"
                />
              </LegendWrapper>

              <LegendWrapper label="Website URL" icon={<FaGlobe />} required>
                <input
                  type="text"
                  name="websiteURL"
                  className={baseInputStyles}
                  value={formData.websiteURL}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </LegendWrapper>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper label="Country" icon={<FaMapMarkerAlt />} required>
                <input
                  type="text"
                  name="country"
                  className={baseInputStyles}
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </LegendWrapper>

              <LegendWrapper label="State" icon={<FaMapMarkerAlt />} required>
                <input
                  type="text"
                  name="state"
                  className={baseInputStyles}
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </LegendWrapper>
            </div>

            {/* Contact & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegendWrapper
                label="Contact Email"
                icon={<FaEnvelope />}
                required
              >
                <input
                  type="email"
                  name="email"
                  className={baseInputStyles}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="support@example.com"
                />
              </LegendWrapper>

              <LegendWrapper
                label="Effective Date"
                icon={<FaCalendarAlt />}
                required
              >
                <input
                  type="date"
                  name="lastUpdated"
                  className={baseInputStyles}
                  value={formData.lastUpdated}
                  onChange={handleChange}
                />
              </LegendWrapper>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="collectUserData"
                name="collectUserData"
                checked={formData.collectUserData}
                onChange={handleChange}
                className="w-5 h-5 accent-[#f35d36] cursor-pointer"
              />
              <label
                htmlFor="collectUserData"
                className="text-gray-700 cursor-pointer select-none font-medium"
              >
                Does your website collect user data?
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 rounded-[50px] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <FaWandMagicSparkles /> Generate Disclaimer
            </button>
          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 h-fit">
            {/* Preview Card */}
            <div className="bg-[#15151e] p-6 rounded-2xl shadow-2xl border border-gray-800 flex flex-col h-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-700 gap-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f35d36] animate-pulse"></span>
                  Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                    title="Copy Text"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 text-gray-400 hover:text-[#f35d36] hover:bg-white/10 rounded transition-all"
                    title="Download HTML"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded transition-all"
                    title="Reset"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Content Display */}
              <div className="grow overflow-auto min-h-[400px] max-h-[70vh] custom-scrollbar bg-white/5 rounded-lg p-4 border border-gray-700">
                {generatedDisclaimer ? (
                  <div className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono">
                    {generatedDisclaimer}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                    <FaFileContract className="text-4xl mb-3" />
                    <p>Fill the form and click generate</p>
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                *Review generated legal documents with a professional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisclaimerGenerator;
