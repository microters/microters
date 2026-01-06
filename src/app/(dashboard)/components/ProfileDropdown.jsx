'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

export function ProfileDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f35d36] hover:ring-2 hover:ring-orange-200 transition-all duration-300 flex items-center justify-center bg-gray-50"
      >
        {user?.image ? (
          <Image 
            src={user.image} 
            alt={user.name || 'User Avatar'} 
            width={40} 
            height={40} 
            className="object-cover w-full h-full" 
          />
        ) : (
          <div className="w-full h-full bg-[#212c4a] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase() || <FiUser />}
            </span>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-[#212c4a] truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <Link href="/dashboard/settings" 
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#f35d36] transition-colors"
                onClick={() => setIsOpen(false)}
            >
              <FiSettings className="w-4 h-4" />
              Profile Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}