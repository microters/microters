"use client";

import React, { useCallback, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube, 
  FaInstagram, 
  FaPinterestP, 
  FaTiktok, 
  FaQuora 
} from "react-icons/fa";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ContactSection = () => {
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
      firstName: "",
      lastName: "",
      website: "",
      jobTitle: "",
      email: "",
      phone: "",
      needs: "",
      message: "",
      captchaToken: null,
    }
  });

  const onCaptchaChange = (value) => {
    setValue('captchaToken', value);
    if (value) {
      setSubmitMessage(null);
    }
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
        setSubmitMessage({ type: 'error', message: 'Bot detected! Verification failed.' });
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({ type: 'success', message: 'Thank you! Your message has been sent.' });
        reset();
        recaptchaRef.current?.reset();
        setValue('captchaToken', null);
      } else {
        throw new Error('Email submission failed');
      }

    } catch (error) {
      setSubmitMessage({ type: 'error', message: 'Something went wrong. Please check your settings.' });
    }
  }, [reset, setValue]);


  // --- STYLES ---
  const inputClasses = `
    w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400
    focus:outline-none focus:bg-white focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] 
    transition-all duration-300 ease-in-out
  `;
  
  const labelClasses = "block text-sm font-bold text-[#15151e] mb-2";
  const errorClasses = "text-red-500 text-xs mt-1 font-medium";

  return (
    <section className="w-full">
      <div className="container px-4 max-w-6xl mt-0 lg:-mt-[100px] relative z-20">
        
        <div className="flex flex-col lg:flex-row shadow-xl rounded-xl overflow-hidden bg-white">
          
          {/* --- LEFT SIDE: THE FORM --- */}
          <div className="w-full lg:w-3/5 p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name Controller */}
                <div>
                  <label className={labelClasses}>First Name <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First Name is required" }}
                    render={({ field }) => (
                      <input 
                        {...field} 
                        type="text" 
                        placeholder="First Name" 
                        className={inputClasses}
                      />
                    )}
                  />
                  {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
                </div>

                {/* Last Name Controller */}
                <div>
                  <label className={labelClasses}>Last Name <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last Name is required" }}
                    render={({ field }) => (
                      <input 
                        {...field} 
                        type="text" 
                        placeholder="Last Name" 
                        className={inputClasses}
                      />
                    )}
                  />
                  {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Website Controller */}
                <div>
                  <label className={labelClasses}>Website URL <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="website"
                    control={control}
                    rules={{ required: "Website is required" }}
                    render={({ field }) => (
                      <input 
                        {...field} 
                        type="url" 
                        placeholder="www.demo.com" 
                        className={inputClasses}
                      />
                    )}
                  />
                  {errors.website && <p className={errorClasses}>{errors.website.message}</p>}
                </div>

                {/* Job Title Controller */}
                <div>
                  <label className={labelClasses}>Job Title <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="jobTitle"
                    control={control}
                    rules={{ required: "Job Title is required" }}
                    render={({ field }) => (
                      <input 
                        {...field} 
                        type="text" 
                        placeholder="SEO Expert" 
                        className={inputClasses}
                      />
                    )}
                  />
                  {errors.jobTitle && <p className={errorClasses}>{errors.jobTitle.message}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Controller */}
                <div>
                  <label className={labelClasses}>Work Email <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <input 
                        {...field} 
                        type="email" 
                        placeholder="sample@email.com" 
                        className={inputClasses}
                      />
                    )}
                  />
                  {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                </div>

                {/* Phone Number Controller (Already existed, kept consistent) */}
                <div>
                  <label className={labelClasses}>Phone Number <span className="text-[#f35d36]">*</span></label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        international
                        defaultCountry="BD"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter phone number"
                        className={`
                           w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 
                           focus-within:bg-white focus-within:border-[#f35d36] focus-within:ring-1 focus-within:ring-[#f35d36]
                           transition-all duration-300 ease-in-out flex items-center
                        `}
                      />
                    )}
                  />
                  {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
                </div>
              </div>

              {/* Row 4: Select Controller */}
              <div>
                <label className={labelClasses}>Your Needs <span className="text-[#f35d36]">*</span></label>
                <Controller
                  name="needs"
                  control={control}
                  rules={{ required: "Please select a need" }}
                  render={({ field }) => (
                    <select {...field} className={inputClasses}>
                      <option value="">Select a service...</option>
                      <option value="Need More Organic Traffic">Need More Organic Traffic</option>
                      <option value="Need More Customer">Need More Customer</option>
                      <option value="Need More Leads">Need More Leads</option>
                      <option value="All Budget">All Budget</option>
                    </select>
                  )}
                />
                {errors.needs && <p className={errorClasses}>{errors.needs.message}</p>}
              </div>

              {/* Row 5: Textarea Controller */}
              <div>
                <label className={labelClasses}>How can we help you? <span className="text-[#f35d36]">*</span></label>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <textarea 
                      {...field} 
                      rows={4} 
                      placeholder="Enter your question here..." 
                      className={inputClasses}
                    ></textarea>
                  )}
                />
                {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
              </div>

              {/* Recaptcha */}
              <div className="pt-2">
                <ReCAPTCHA 
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY} 
                  onChange={onCaptchaChange} 
                />
                {errors.captchaToken && <p className={errorClasses}>{errors.captchaToken.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="bg-[#f35d36] hover:bg-[#d64d29] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

          {/* --- RIGHT SIDE --- */}
          <div className="w-full lg:w-2/5 bg-[#29375d] p-8 lg:p-12 text-white flex flex-col justify-between">
            
            <div>
              <h4 className="text-3xl font-bold mb-6 border-l-4 border-[#f35d36] pl-4">Contact Us</h4>
              <p className="text-[#bfc3cf] mb-8 text-lg leading-relaxed">
                Ready to elevate your project? Contact us for tailored solutions and expert collaboration.
              </p>

              <div className="space-y-4 mb-12">
                <a href="tel:+8801625192766" className="flex items-center gap-4 text-[#bfc3cf] hover:text-white transition-colors group">
                  <span className="bg-white/10 p-3 rounded-full text-white group-hover:bg-[#f35d36] transition-colors">
                    <FaPhoneAlt className="w-4 h-4" />
                  </span>
                  <span className="text-lg font-medium">+880 1625-192766</span>
                </a>
                <a href="tel:+13072255635" className="flex items-center gap-4 text-[#bfc3cf] hover:text-white transition-colors group">
                  <span className="bg-white/10 p-3 rounded-full text-white group-hover:bg-[#f35d36] transition-colors">
                    <FaPhoneAlt className="w-4 h-4" />
                  </span>
                  <span className="text-lg font-medium">+1 307 225 5635</span>
                </a>
                <a href="mailto:info@microters.com" className="flex items-center gap-4 text-[#bfc3cf] hover:text-white transition-colors group">
                  <span className="bg-white/10 p-3 rounded-full text-white group-hover:bg-[#f35d36] transition-colors">
                    <FaEnvelope className="w-4 h-4" />
                  </span>
                  <span className="text-lg font-medium">info@microters.com</span>
                </a>
              </div>

              <h4 className="text-2xl font-bold mb-8 border-l-4 border-[#f35d36] pl-4">Visit Us</h4>
              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-4 text-[#bfc3cf]">
                  <span className="bg-white/10 p-3 rounded-full shrink-0 text-white">
                      <FaMapMarkerAlt className="w-4 h-4" />
                  </span>
                  <p className="leading-relaxed">
                    <strong className="text-white block mb-1">BD Office:</strong> 
                    Khan Zaman Tower (5th Floor), Holding No – 684/617, Jhautola 3500 Comilla.
                  </p>
                </div>
                <div className="flex items-start gap-4 text-[#bfc3cf]">
                  <span className="bg-white/10 p-3 rounded-full shrink-0 text-white">
                      <FaMapMarkerAlt className="w-4 h-4" />
                  </span>
                  <p className="leading-relaxed">
                    <strong className="text-white block mb-1">USA Office:</strong> 
                    30 N Gould St Ste R Sheridan WY 82801, United States
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-8 border-l-4 border-[#f35d36] pl-4">Find Us on Social Media</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: FaFacebookF, link: "https://facebook.com/microters" },
                  { Icon: FaTwitter, link: "https://twitter.com" },
                  { Icon: FaLinkedinIn, link: "https://linkedin.com" },
                  { Icon: FaYoutube, link: "https://youtube.com" },
                  { Icon: FaInstagram, link: "https://instagram.com" },
                  { Icon: FaPinterestP, link: "https://pinterest.com" },
                  { Icon: FaTiktok, link: "https://tiktok.com" },
                  { Icon: FaQuora, link: "https://quora.com" },
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f35d36] hover:scale-110 transition-all duration-300"
                  >
                    <social.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;