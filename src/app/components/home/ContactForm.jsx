'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'; 
import ReCAPTCHA from 'react-google-recaptcha';
import bannerIllustration from '../../../assets/images/svgviewer-output-1.svg';
import Image from 'next/image';

// --- Form Options ---
const needsOptions = [
    { value: 'traffic', label: 'Need More Organic Traffic' },
    { value: 'customers', label: 'Need More Customers' },
    { value: 'leads', label: 'Need More Leads' },
    { value: 'budget', label: 'All Budget' },
];
const RECAPTCHA_SITE_KEY = "6LeY1bwaAAAAABc90p872B87r0T_s-Jp_v1-A9cZ";

const ContactFormSection = () => {
    const recaptchaRef = useRef(null);
    
    const { handleSubmit, control, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            firstName: '',
            lastName: '',
            websiteUrl: '',
            jobTitle: '',
            workEmail: '',
            phoneNumber: '',
            yourNeeds: 'traffic',
            helpText: '',
            captchaToken: null,
        }
    });

    const [submitMessage, setSubmitMessage] = useState(null);
    
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

        console.log('Form Submitted with Token:', data.captchaToken, data);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitMessage({ type: 'success', message: 'Thank you! Your message has been sent.' });
        reset();
        if (recaptchaRef.current) {
             recaptchaRef.current.reset();
             setValue('captchaToken', null); 
        }

    }, [reset, setValue]);

    return (
        <div className="px-4 md:px-6">
            <div className="container flex flex-col lg:flex-row rounded-xl overflow-hidden bg-white border border-[#d4d7df]">
                <div className="w-full lg:w-5/12 p-12 flex justify-center items-center">
                    <div className="w-full h-auto">
                        <Image
                            src={bannerIllustration}
                            alt="Digital Marketing Discussion Illustration"
                            width={555} 
                            height={539} 
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* --- Right Column (Form) --- */}
                <div className="w-full lg:w-7/12 p-6 md:p-12 bg-[#fef7f5]">
                    <h2 className="text-4xl md:text-6xl font-bold text-[#15151e] mb-10">
                        <strong>Let’s Discuss!</strong>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* --- Row 1: Name Fields --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: 'First name is required' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">First Name *</label>
                                        <input {...field} placeholder="First Name" className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200" />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Last name is required' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Last Name *</label>
                                        <input {...field} placeholder="Last Name" className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200" />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* --- Row 2: URL & Job Title --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Controller
                                name="websiteUrl"
                                control={control}
                                rules={{ required: 'Website URL is required', pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Invalid URL format' } }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Website URL *</label>
                                        <div className="relative">
                                            <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input {...field} placeholder="www.demo.com" className="w-full p-3 pl-10 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200" />
                                        </div>
                                        {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="jobTitle"
                                control={control}
                                rules={{ required: 'Job Title is required' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Job Title *</label>
                                        <input {...field} placeholder="SEO Expert" className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200" />
                                        {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* --- Row 3: Email & Phone --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Controller
                                name="workEmail"
                                control={control}
                                rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Work Email *</label>
                                        <input {...field} placeholder="sample@email.com" type="email" className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200" />
                                        {errors.workEmail && <p className="text-red-500 text-sm mt-1">{errors.workEmail.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Phone number is required' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                                        <PhoneInput
                                            {...field}
                                            international
                                            defaultCountry="BD"
                                            placeholder="Enter phone number"
                                            className={`w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200 cursor-not-allowed ${errors.phone ? 'phone-input-error' : ''}`}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                        
                        {/* --- Row 4: Your Needs (Select) --- */}
                        <Controller
                            name="yourNeeds"
                            control={control}
                            rules={{ required: 'Please select your needs' }}
                            render={({ field }) => (
                                <div className="relative">
                                    <label className="block text-sm font-semibold mb-2">Your Needs *</label>
                                    <select {...field} className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:border-[#f57d5e] outline-none transition duration-200 bg-white pr-10">
                                        {needsOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    <FaChevronDown className="absolute right-3 top-1/2 mt-3 text-gray-500 pointer-events-none" size={16} />
                                    {errors.yourNeeds && <p className="text-red-500 text-sm mt-1">{errors.yourNeeds.message}</p>}
                                </div>
                            )}
                        />

                        {/* --- Row 5: How can we help? (Textarea) --- */}
                        <Controller
                            name="helpText"
                            control={control}
                            rules={{ required: 'Please describe how we can help you' }}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-semibold mb-2">How can we help you? *</label>
                                    <textarea {...field} placeholder="Enter your question here..." rows="4" className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-[#f57d5e] outline-none transition duration-200 resize-none"></textarea>
                                    {errors.helpText && <p className="text-red-500 text-sm mt-1">{errors.helpText.message}</p>}
                                </div>
                            )}
                        />

                        {/* --- Row 6: GOOGLE RECAPTCHA --- */}
                        <div className="space-y-2 flex flex-col items-start">
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                onChange={onCaptchaChange}
                                ref={recaptchaRef}
                            />
                            {errors.captchaToken && <p className="text-red-500 text-sm mt-1">{errors.captchaToken.message}</p>}
                        </div>

                        {/* --- Submission Message --- */}
                        {submitMessage && (
                            <p className={`text-center p-3 rounded-lg ${
                                submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {submitMessage.message}
                            </p>
                        )}
                        
                        {/* --- Submit Button --- */}
                        <button
                            type="submit"
                            className={`w-full p-3 text-white font-bold rounded-lg transition duration-300 flex items-center justify-center space-x-2 
                                ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f57d5e] hover:bg-[#e06b4d]'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>Sending...</>
                            ) : (
                                <>
                                    <span>Submit</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactFormSection;