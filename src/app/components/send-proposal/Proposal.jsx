"use client";

import React, { useCallback, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { budgetOptions, servicesList, timelineSteps } from "app/data/proposalData";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ProposalSection = () => {
  const recaptchaRef = useRef(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      services: [],
      budget: "",
      name: "",
      contactNo: "",
      email: "",
      website: "",
      company: "",
      skype: "",
      message: "",
      captchaToken: null,
    }
  });

  const onCaptchaChange = (value) => {
    setValue('captchaToken', value);
    if (value) setSubmitMessage(null);
  };

  const onSubmit = useCallback(async (data) => {
    setSubmitMessage(null);
    
    if (!data.captchaToken) {
      setSubmitMessage({ type: 'error', message: 'Please complete the CAPTCHA validation.' });
      return;
    }

    try {
      const verifyRes = await fetch('/api/verify-captcha', {
        method: 'POST',
        body: JSON.stringify({ token: data.captchaToken }),
        headers: { 'Content-Type': 'application/json' }
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setSubmitMessage({ type: 'error', message: 'Verification failed. Please try again.' });
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({ type: 'success', message: 'Proposal request sent successfully!' });
        reset();
        recaptchaRef.current?.reset();
        setValue('captchaToken', null);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  }, [reset, setValue]);

  // --- STYLES ---
 const baseInputStyles = `
    w-full bg-white border rounded-[4px] px-4 py-3 text-gray-700 placeholder-gray-400
    focus:outline-none focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
    transition-all duration-300 ease-in-out
  `;

  const LegendWrapper = ({ label, required, children, error }) => (
    <div className="relative mt-2">
      <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-semibold text-[#15151e] z-10">
        {label} {required && <span className="text-[#f35d36]">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error.message}</p>}
    </div>
  );

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-4 max-w-6xl -mt-[100px] lg:-mt-[200px] relative z-20">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden bg-white">
          {/* ================= LEFT SIDE: FORM (60%) ================= */}
          <div className="w-full lg:w-3/5 p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* 1. Services Checkboxes */}
              <div>
                <h4 className="block text-lg font-bold text-[#15151e] mb-6">
                  What is it that you're looking for help with? <span className="text-[#f35d36]">*</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Controller
                    name="services"
                    control={control}
                    rules={{ required: "Please select at least one service" }}
                    render={({ field }) => (
                      <>
                        {servicesList.map((service) => (
                          <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              value={service}
                              checked={field.value.includes(service)}
                              onChange={(e) => {
                                const value = e.target.value;
                                const newValue = e.target.checked
                                  ? [...field.value, value]
                                  : field.value.filter((v) => v !== value);
                                field.onChange(newValue);
                              }}
                              // Checkbox Color: 'accent-[#f35d36]' handles the brand color natively
                              className="w-5 h-5 border-gray-300 rounded accent-[#f35d36] focus:ring-[#f35d36] cursor-pointer"
                            />
                            <span className="text-gray-600 text-sm group-hover:text-[#f35d36] transition-colors">{service}</span>
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services.message}</p>}
              </div>

              <hr className="border-gray-200" />

              {/* 2. Budget Radio Buttons */}
              <div>
                <h4 className="block text-lg font-bold text-[#15151e] mb-6">
                  What is your monthly budget? <span className="text-[#f35d36]">*</span>
                </h4>
                <Controller
                  name="budget"
                  control={control}
                  rules={{ required: "Please select a budget" }}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-4">
                      {budgetOptions.map((option) => (
                        <label key={option} className="cursor-pointer">
                          <input
                            type="radio"
                            {...field}
                            value={option}
                            className="peer sr-only"
                          />
                          <div className="px-4 py-2 border border-gray-300 rounded-sm text-gray-600 text-sm transition-all peer-checked:bg-[#f35d36] peer-checked:text-white peer-checked:border-[#f35d36] hover:border-[#f35d36]">
                            {option}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
              </div>

              {/* 3. Contact Info Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <LegendWrapper label="Name" required error={errors.name}>
                      <input 
                        {...field} 
                        className={`${baseInputStyles} ${errors.name ? "border-red-500" : "border-gray-300"}`} 
                      />
                    </LegendWrapper>
                  )}
                />
                
                {/* Phone Input */}
                <Controller
                  name="contactNo"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LegendWrapper label="Contact No">
                      <PhoneInput
                        international
                        defaultCountry="BD"
                        value={value}
                        onChange={onChange}
                        className={`${baseInputStyles} border-gray-300 flex items-center`}
                      />
                    </LegendWrapper>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
                  render={({ field }) => (
                    <LegendWrapper label="Your Email" required error={errors.email}>
                      <input 
                        {...field} 
                        type="email" 
                        className={`${baseInputStyles} ${errors.email ? "border-red-500" : "border-gray-300"}`} 
                      />
                    </LegendWrapper>
                  )}
                />

                {/* Website */}
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <LegendWrapper label="Website">
                      <input {...field} type="url" className={`${baseInputStyles} border-gray-300`} />
                    </LegendWrapper>
                  )}
                />

                {/* Company */}
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                     <LegendWrapper label="Your Company">
                       <input {...field} type="text" className={`${baseInputStyles} border-gray-300`} />
                     </LegendWrapper>
                  )}
                />

                {/* Skype */}
                <Controller
                  name="skype"
                  control={control}
                  render={({ field }) => (
                    <LegendWrapper label="Your Skype ID">
                      <input {...field} type="text" className={`${baseInputStyles} border-gray-300`} />
                    </LegendWrapper>
                  )}
                />
              </div>

              {/* 4. Message */}
              <div className="pt-2">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <LegendWrapper label="Your Message">
                       <textarea {...field} rows={4} className={`${baseInputStyles} border-gray-300`} />
                    </LegendWrapper>
                  )}
                />
              </div>

              {/* 5. ReCAPTCHA */}
              <div className="space-y-2">
                <ReCAPTCHA 
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY} 
                  onChange={onCaptchaChange} 
                />
                {errors.captchaToken && (
                  <p className="text-red-500 text-xs mt-1">{errors.captchaToken.message}</p>
                )}
              </div>

              {/* 6. Submit Button */}
              <button type="submit" className="bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 px-8 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get A Proposal
              </button>

            </form>
          </div>

          {/* ================= RIGHT SIDE: INFO (40%) ================= */}
          <div className="w-full lg:w-2/5 bg-[#29375d] p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">How Do We Get Started?</h2>
              <p className="text-[#bfc3cf] mb-10 leading-relaxed">
                Discover the Microters approach in just four steps...
              </p>

              {/* Timeline Container */}
              {/* Added 'ml-6' to give room for the dots on the left */}
              <div className="ml-6 border-l-4 border-dashed border-gray-500/30 space-y-8 pl-10 relative">
                
                {timelineSteps.map((step, index) => (
                    <div key={index} className="relative group">
                    
                    {/* --- THE ANIMATED DOT --- */}
                    <div className="absolute -left-[58px] top-1 w-[34px] h-[34px] flex items-center justify-center z-10">
                        
                        {/* 1. The Pulsing Ring (Animation) */}
                        <div className="absolute w-full h-full rounded-full border-[3px] border-[#fabeaf54] opacity-25 animate-pulse-ring box-border"></div>
                        
                        {/* 2. The Static Ring (Background) */}
                        <div className="absolute w-full h-full rounded-full bg-[#29375d] border-[3px] border-[#fabeaf54] opacity-25 box-border"></div>
                        
                        {/* 3. The Inner Solid Dot */}
                        <div className="relative w-[18px] h-[18px] bg-[#f35d36] rounded-full shadow-sm"></div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <h4 className="text-xl font-bold mb-2 text-white">{step.title}</h4>
                        <p className="text-[#bfc3cf] text-sm leading-relaxed">
                        {step.desc}
                        </p>
                    </div>
                    </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;