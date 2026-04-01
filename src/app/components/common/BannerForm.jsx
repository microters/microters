"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

const BannerForm = () => {
    const [submitStatus, setSubmitStatus] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: "Banner Lead",
                lastName: "Quick Request",
                email: data.email,
                website: data.website,
                needs: "Proposal Request",
                message: `User requested a proposal for website: ${data.website}`,
                phone: "Not Provided",
                jobTitle: "Banner User"
            }),
        });

        const result = await response.json();

        if (result.success) {
            setSubmitStatus({ type: "success", message: "Proposal request sent successfully!" });
            reset();
        } else {
            throw new Error("Failed to send");
        }
    } catch (error) {
        setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
};

    // Tailwind classes
    const primaryRingClass = "focus:ring-[#f35d36]";
    const inputStyleClasses = "h-[60px] rounded-full border-gray-300 border focus:border-[#f35d36] transition-all duration-200 shadow-sm";

    return (
        <div className="max-w-[800px]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <input
                        {...register("website", { required: "Website is required" })}
                        type="text"
                        placeholder="Your website here (e.g. www.example.com)"
                        className={`w-full px-[30px] text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 ${inputStyleClasses} ${primaryRingClass}`}
                    />
                </div>
                <div className="relative flex">
                    <input
                        {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        type="email"
                        placeholder="Your Email Here"
                        className={`grow pr-[190px] px-[30px] text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 ${inputStyleClasses} ${primaryRingClass}`}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#f35d36] hover:bg-[#e0522d] flex items-center justify-center text-white text-base font-semibold transition-all disabled:opacity-75 disabled:cursor-not-allowed h-12 rounded-full px-6 absolute right-1.5 top-1/2 -translate-y-1/2`}
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : (
                            <>
                                Send A Proposal
                                <FaArrowRight className="ml-2 text-sm" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Status Messages */}
            {submitStatus && (
                <p className={`mt-3 ml-4 text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                </p>
            )}
        </div>
    );
};

export default BannerForm;