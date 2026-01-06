"use client";

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-72 transition-all duration-300">
        
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}