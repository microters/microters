'use client';

import { FiMenu, FiSearch } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { NotificationDropdown } from './ui/NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

export default function DashboardHeader({ setSidebarOpen }) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 shadow-sm">
      
      <div className="flex items-center gap-4">
        <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-[#f35d36] transition-colors"
        >
            <FiMenu className="h-6 w-6" />
        </button>

        {/* Search bar (Desktop) */}
        <div className="hidden lg:block w-96">
            <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search analytics, tasks, or projects..." 
                className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-[#212c4a] placeholder-gray-400 focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] focus:outline-none transition-all" 
            />
            </div>
        </div>
      </div>

      {/* Header actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <NotificationDropdown />
        
        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
        
        {session?.user && (
          <ProfileDropdown user={session.user} />
        )}
      </div>
    </header>
  );
}