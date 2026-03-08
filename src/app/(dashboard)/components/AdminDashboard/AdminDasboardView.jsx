"use client";

import React from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiShield, 
  FiPlus, 
  FiGrid, 
  FiActivity
} from 'react-icons/fi';

export default function AdminDashboardView({ user }) {

  const adminStats = [
    { label: 'Total Users', value: '1,240', change: '+12%', icon: FiUsers, color: '#f35d36' },
    { label: 'Revenue (Mo)', value: '$45.2k', change: '+8.4%', icon: FiDollarSign, color: '#10b981' },
    { label: 'Conversion', value: '3.2%', change: '+2%', icon: FiTrendingUp, color: '#3b82f6' },
    { label: 'Active Sessions', value: '156', change: '-3%', icon: FiActivity || FiGrid, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- Admin Hero Header --- */}
      <div className="bg-[#212c4a] rounded-2xl p-8 shadow-2xl relative overflow-hidden border-b-4 border-[#f35d36]">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-[#f35d36] p-2 rounded-lg">
                <FiShield className="text-white w-6 h-6" />
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Command Center</h1>
            </div>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              System Status: <span className="text-green-400 font-medium">Operational</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Access Level</p>
              <p className="text-[#f35d36] font-bold">SUPER ADMIN</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all border border-white/10">
              <FiPlus size={20} />
            </button>
          </div>
        </div>
        
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#f35d36]/10 to-transparent pointer-events-none"></div>
      </div>

      {/* --- Key Metrics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-[#f35d36]/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-[#f35d36]/5 transition-colors">
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</h3>
              <p className="text-3xl font-black text-[#212c4a] mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- System Logs & Performance Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-[#212c4a]">Global Performance</h3>
            <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-gray-200"></div>
               <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="p-8 h-64 flex items-center justify-center text-gray-400 italic">
            {/* You can integrate Recharts here later */}
          </div>
        </div>

        <div className="bg-[#212c4a] rounded-2xl p-6 text-white shadow-lg">
          <h3 className="font-bold mb-6 text-lg border-b border-white/10 pb-4">Security Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="text-sm font-bold text-[#f35d36]">Unusual Login</p>
              <p className="text-xs text-gray-400 mt-1">IP: 192.168.1.45 • 5m ago</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="text-sm font-bold text-blue-400">System Update</p>
              <p className="text-xs text-gray-400 mt-1">v4.2.0 deployed successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}