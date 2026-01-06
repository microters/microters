'use client';

import { useState, useEffect, useRef } from 'react';
import { FiBell, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to Microters Dashboard!", isRead: false, createdAt: new Date(), link: "/dashboard" },
    { id: 2, message: "Your profile is 80% complete", isRead: true, createdAt: new Date(), link: "/dashboard/settings" }
  ]);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const dropdownRef = useRef(null);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-[#212c4a] hover:bg-gray-100 rounded-full transition-all"
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f35d36] text-[10px] font-bold text-white border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 origin-top-right rounded-xl border border-gray-100 bg-white shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
             <h3 className="font-bold text-sm text-[#212c4a]">Notifications</h3>
             <span className="text-xs font-medium text-[#f35d36] bg-orange-100 px-2 py-0.5 rounded-full">{unreadCount} New</span>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400">No notifications yet</div>
            ) : (
                notifications.map((note) => (
                    <div 
                        key={note.id} 
                        onClick={() => markAsRead(note.id)}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer ${
                            !note.isRead ? 'bg-orange-50/40' : 'bg-white'
                        }`}
                    >
                        {/* Status Dot */}
                        <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!note.isRead ? 'bg-[#f35d36]' : 'bg-gray-300'}`} />
                        
                        <div className="flex-1">
                            {note.link ? (
                                <Link 
                                  href={note.link} 
                                  className="group flex items-start justify-between gap-2"
                                >
                                    <span className={`text-sm font-medium transition-colors ${!note.isRead ? 'text-[#212c4a]' : 'text-gray-600'} group-hover:text-[#f35d36]`}>
                                        {note.message}
                                    </span>
                                    <FiExternalLink className="mt-0.5 w-3 h-3 text-gray-400 group-hover:text-[#f35d36]" />
                                </Link>
                            ) : (
                                <p className={`text-sm font-medium ${!note.isRead ? 'text-[#212c4a]' : 'text-gray-600'}`}>
                                    {note.message}
                                </p>
                            )}
                            
                            <p className="text-xs text-gray-400 mt-1">
                                {note.createdAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))
            )}
          </div>
          
          <div className="p-2 border-t border-gray-100 text-center">
              <button className="text-xs font-medium text-gray-500 hover:text-[#f35d36] transition-colors">
                  Mark all as read
              </button>
          </div>
        </div>
      )}
    </div>
  );
}