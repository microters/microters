"use client";

import React from 'react';
import { FiActivity, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi';

export default function UserDashboardView({ user }) {

  const stats = [
    { label: 'Active Projects', value: '3', icon: FiActivity, color: '#3b82f6', bg: 'bg-blue-50' },
    { label: 'Completed', value: '12', icon: FiCheckCircle, color: '#10b981', bg: 'bg-green-50' },
    { label: 'In Review', value: '1', icon: FiClock, color: '#f59e0b', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- Welcome Header --- */}
      <div className="relative overflow-hidden bg-[#212c4a] rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-[#f35d36]">{user?.name || 'User'}</span>! 👋
          </h1>
          <p className="text-gray-300 mt-3 text-lg max-w-xl">
            Everything looks great today. You have <span className="text-white font-semibold">3 active projects</span> that require your attention.
          </p>
          <button className="mt-6 flex items-center gap-2 bg-[#f35d36] hover:bg-[#d64d29] px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
            View All Projects <FiArrowRight />
          </button>
        </div>
        
        {/* Decorative Background Circles */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#f35d36] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-48 h-48 bg-white opacity-5 rounded-full blur-2xl"></div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
            <div className={`${stat.bg} p-4 rounded-xl`}>
              <stat.icon size={28} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-[#212c4a]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Recent Activity Placeholder --- */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-[#212c4a] text-lg">Recent Progress</h3>
          <span className="text-sm text-[#f35d36] font-semibold cursor-pointer underline">See Details</span>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg group bg-white border border-orange-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#f35d36]"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Project Alpha Update</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <FiArrowRight className="text-[#f35d36]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}