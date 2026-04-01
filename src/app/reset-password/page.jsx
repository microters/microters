"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState({ type: "", message: "" });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setStatus({ type: "", message: "" });

    if (!token) {
      setStatus({ type: "error", message: "Invalid or missing reset token." });
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password: data.password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Password updated successfully! Redirecting to login..." });
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setStatus({ type: "error", message: result.error || "Failed to reset password." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[#212c4a] text-center mb-6">Create New Password</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Minimum 6 characters" } 
              })}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#f35d36] focus:border-[#f35d36] outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {status.message && (
            <p className={`text-sm text-center p-2 rounded ${status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
              {status.message}
            </p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 bg-[#f35d36] text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}