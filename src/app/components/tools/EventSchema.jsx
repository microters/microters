"use client";

import React, { useState } from "react";
import Select from "react-select";
import {
  FaCalendarAlt,
  FaImage,
  FaTicketAlt,
  FaUser,
  FaAlignLeft,
  FaCopy,
  FaTrash,
  FaCheck,
  FaGoogle,
  FaHeading,
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

// --- DATA ---
const performerTypeOptions = [
  { label: "Person", value: "Person" },
  { label: "Organization", value: "Organization" },
];

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "CAD", value: "CAD" },
  { label: "AUD", value: "AUD" },
];

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

const EventSchemaForm = () => {
  // --- DEFAULT DATA ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sample Event",
    description: "Sample description for an event.",
    image: "https://example.com/image.jpg",
    startDate: "2025-01-01T10:00:00",
    endDate: "2025-01-01T12:00:00",
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OnlineEventAttendanceMode",
    performer: {
      "@type": "Person",
      name: "John Doe",
    },
    offers: [
      {
        "@type": "Offer",
        name: "General Admission",
        price: "10",
        priceCurrency: "USD",
      },
    ],
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    imageUrl: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventStatus: "EventScheduled",
    attendanceMode: "OnlineEventAttendanceMode",
    performerType: "Person",
    performerName: "",
    ticketTypes: [{ name: "", price: "", currency: "USD" }],
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

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = formData.ticketTypes.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticketTypes: [
        ...formData.ticketTypes,
        { name: "", price: "", currency: "USD" },
      ],
    });
  };

  const removeTicketType = (index) => {
    setFormData({
      ...formData,
      ticketTypes: formData.ticketTypes.filter((_, i) => i !== index),
    });
  };

  // --- GENERATE FUNCTION ---
  const handleGenerate = () => {
    const newSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: formData.eventName,
      description: formData.eventDescription,
      image: formData.imageUrl,
      startDate: `${formData.startDate}T${formData.startTime}`,
      endDate: `${formData.endDate}T${formData.endTime}`,
      eventStatus: formData.eventStatus,
      eventAttendanceMode: formData.attendanceMode,
      performer: {
        "@type": formData.performerType,
        name: formData.performerName,
      },
      offers: formData.ticketTypes.map((ticket) => ({
        "@type": "Offer",
        name: ticket.name,
        price: ticket.price,
        priceCurrency: ticket.currency,
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
    setFormData({
      eventName: "",
      eventDescription: "",
      imageUrl: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      eventStatus: "EventScheduled",
      attendanceMode: "OnlineEventAttendanceMode",
      performerType: "Person",
      performerName: "",
      ticketTypes: [{ name: "", price: "", currency: "USD" }],
    });
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
            {/* 1. Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <LegendWrapper label="Event Name" icon={<FaHeading />} required>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="e.g. Annual Tech Conference"
                />
              </LegendWrapper>

              <LegendWrapper label="Description" icon={<FaAlignLeft />}>
                <textarea
                  className={`${baseInputStyles} h-24 resize-y`}
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  placeholder="Brief description of the event..."
                />
              </LegendWrapper>

              <LegendWrapper label="Image URL" icon={<FaImage />}>
                <input
                  type="text"
                  className={baseInputStyles}
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/event-banner.jpg"
                />
              </LegendWrapper>
            </div>

            {/* 2. Date & Time */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-[#f35d36]" /> Schedule
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <LegendWrapper label="Start Date">
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="Start Time">
                  <input
                    type="time"
                    className={baseInputStyles}
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="End Date">
                  <input
                    type="date"
                    className={baseInputStyles}
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
                <LegendWrapper label="End Time">
                  <input
                    type="time"
                    className={baseInputStyles}
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 3. Performer Info */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaUser className="text-[#f35d36]" /> Performer / Organizer
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LegendWrapper label="Type">
                  <Select
                    instanceId="performer-type-select"
                    options={performerTypeOptions}
                    value={performerTypeOptions.find(
                      (opt) => opt.value === formData.performerType
                    )}
                    onChange={(opt) => handleSelectChange("performerType", opt)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </LegendWrapper>
                <LegendWrapper label="Name">
                  <input
                    type="text"
                    className={baseInputStyles}
                    name="performerName"
                    value={formData.performerName}
                    onChange={handleInputChange}
                    placeholder="Artist or Organization Name"
                  />
                </LegendWrapper>
              </div>
            </div>

            {/* 4. Tickets */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-[#15151e] font-bold mb-4 flex items-center gap-2">
                <FaTicketAlt className="text-[#f35d36]" /> Tickets
              </h4>

              {formData.ticketTypes.map((ticket, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-200 relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      className={baseInputStyles}
                      placeholder="Ticket Name (e.g. VIP)"
                      value={ticket.name}
                      onChange={(e) =>
                        handleTicketChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className={baseInputStyles}
                      placeholder="Price"
                      value={ticket.price}
                      onChange={(e) =>
                        handleTicketChange(index, "price", e.target.value)
                      }
                    />
                    <Select
                      instanceId={`currency-select-${index}`}
                      options={currencyOptions}
                      value={currencyOptions.find(
                        (opt) => opt.value === ticket.currency
                      )}
                      onChange={(opt) =>
                        handleTicketChange(index, "currency", opt.value)
                      }
                      styles={customSelectStyles}
                      placeholder="Currency"
                      isSearchable={false}
                    />
                  </div>
                  {formData.ticketTypes.length > 1 && (
                    <button
                      onClick={() => removeTicketType(index)}
                      className="absolute -top-2 -right-2 bg-white text-red-500 hover:text-red-700 shadow-md rounded-full p-1.5 border border-gray-200 transition-all opacity-0 group-hover:opacity-100"
                      title="Remove Ticket"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addTicketType}
                className="text-[#f35d36] font-semibold text-sm hover:underline mt-2 flex items-center gap-1"
              >
                + Add another ticket type
              </button>
            </div>

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
              <div className="flex-grow overflow-auto min-h-[500px] max-h-[80vh] custom-scrollbar">
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

export default EventSchemaForm;
