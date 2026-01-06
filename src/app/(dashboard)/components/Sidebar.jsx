"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  FiHome, 
  FiFileText, 
  FiSettings, 
  FiExternalLink, 
  FiLogOut, 
  FiX, 
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import microtersLogoImage from "@assets/images/footer_logo.png";

// 1. Menu Structure
const sidebarLinks = [
  { title: 'Overview', href: '/dashboard', icon: FiHome },
  { 
    title: 'Blogs', 
    icon: FiFileText,
    basePath: '/dashboard/blog',
    submenu: [
      { title: 'Posts', href: '/dashboard/blog-posts'},
      { title: 'Categories', href: '/dashboard/blog-categories'},
    ]
  },
  { 
    title: 'Settings', 
    icon: FiSettings,
    basePath: '/dashboard/settings',
    submenu: [
      { title: 'General', href: '/dashboard/settings/general' },
      { title: 'Profile', href: '/dashboard/settings/profile' },
      { title: 'SEO', href: '/dashboard/settings/seo' },
    ]
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  // Auto-open submenu if we are currently on a child page
  const activeSubmenu = sidebarLinks.find(link => 
    link.submenu && pathname.startsWith(link.basePath)
  )?.title || '';
  
  const [openSubmenu, setOpenSubmenu] = useState(activeSubmenu);

  const handleSubmenuClick = (title) => {
    setOpenSubmenu(prev => prev === title ? '' : title);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between bg-[#212c4a] text-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* --- Scrollable Content --- */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* Logo Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-700/50 bg-[#1a233b]">
            <Link href="/" className="block">
              {/* Using brightness to make sure logo pops on dark bg */}
              <Image 
                src={microtersLogoImage} 
                alt="Microters" 
                width={150} 
                height={40} 
                className="w-auto h-8" 
              />
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="p-4 mt-4 space-y-2">
            <ul>
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isSubmenuOpen = openSubmenu === link.title;
                const isActive = pathname === link.href;

                // --- RENDER SUBMENU PARENT ---
                if (link.submenu) {
                  const isSubmenuActive = pathname.startsWith(link.basePath);
                  
                  return (
                    <li key={link.title} className="mb-2">
                      <button 
                        onClick={() => handleSubmenuClick(link.title)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                            isSubmenuActive 
                            ? 'bg-[#f35d36] text-white shadow-lg shadow-orange-900/20' 
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isSubmenuActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                          <span className="font-medium tracking-wide">{link.title}</span>
                        </div>
                        <FiChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {/* Accordion Items */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isSubmenuOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="bg-[#1a233b] rounded-lg py-2 space-y-1 mx-2">
                          {link.submenu.map(sublink => {
                              const isChildActive = pathname === sublink.href;
                              return (
                                  <li key={sublink.title}>
                                      <Link 
                                          href={sublink.href} 
                                          className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md mx-2 transition-colors ${
                                              isChildActive 
                                              ? 'text-[#f35d36] font-semibold bg-[#212c4a]' 
                                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                                          }`}
                                      >
                                          {isChildActive && <FiChevronRight className="w-3 h-3" />}
                                          {!isChildActive && <span className="w-1.5 h-1.5 rounded-full bg-gray-600 ml-1"></span>}
                                          {sublink.title}
                                      </Link>
                                  </li>
                              );
                          })}
                        </ul>
                      </div>
                    </li>
                  );
                }

                // --- RENDER STANDARD LINK ---
                return (
                  <li key={link.title} className="mb-2">
                    <Link 
                      href={link.href} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                        ? 'bg-[#f35d36] text-white shadow-lg shadow-orange-900/20' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      <span className="font-medium tracking-wide">{link.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        {/* --- Footer Actions --- */}
        <div className="p-4 border-t border-gray-700/50 bg-[#1a233b]">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}