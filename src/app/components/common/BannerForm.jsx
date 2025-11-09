"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

const BannerForm = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form Data Submitted:", data);
        alert(`Proposal Request Sent for ${data.website}`);
    };

    // Tailwind variable helper for primary color ring (if needed)
    const primaryRingClass = "focus:ring-[var(--color-primary)]";
    // Tailwind class for the input's rounded border style
    const inputStyleClasses = "h-[60px] rounded-full border-gray-300 border focus:border-[var(--color-primary)] transition-all duration-200";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[800px] space-y-4" 
        >
            <div>
                <input
                    {...register("website", { required: true })}
                    type="text"
                    placeholder="Your website here"
                    className={`w-full px-[30px] text-gray-700 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ${inputStyleClasses} ${primaryRingClass}`}
                />
            </div>
            <div className="relative flex">
                <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Your Email Here"
                    className={`grow pr-[190px] px-[30px] text-gray-700 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ${inputStyleClasses} ${primaryRingClass}`}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary-custom flex items-center justify-center text-white text-base font-semibold transition-all disabled:opacity-75 disabled:cursor-not-allowed h-[48px] rounded-full px-6 absolute right-[6px] top-1/2 -translate-y-1/2`}
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
    );
};

export default BannerForm;