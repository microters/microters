"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState({ type: "", text: "" });
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (result.success) {
        setMessage({ type: "success", text: "If an account exists, a reset link has been sent to your email." });
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to server" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[#212c4a] text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your registered email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#f35d36] focus:border-[#f35d36] outline-none"
          />
          {message.text && (
            <p className={`text-sm text-center ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
              {message.text}
            </p>
          )}
          <button
            disabled={isSubmitting}
            className="w-full py-3 bg-[#f35d36] text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center mt-4">
            <Link href="/login" className="text-sm text-gray-500 hover:text-[#f35d36]">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}