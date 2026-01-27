'use client';

import { useState, useEffect, useRef } from 'react';
import { FiAlignLeft } from 'react-icons/fi';

export function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 2. Initialize Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "0% 0% -60% 0%" 
      }
    );

    const timer = setTimeout(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observerRef.current.observe(element);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (!headings || headings.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center gap-3">
        <FiAlignLeft className="text-[#f35d36] w-5 h-5" />
        <h2 className="text-base font-black text-[#212c4a] uppercase tracking-wider">
          Table of Contents
        </h2>
      </div>

      {/* List */}
      <nav className="max-h-[70vh] overflow-y-auto custom-scrollbar">
        <ul>
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            
            return (
              <li key={heading.id}>
                <button
                  onClick={() => handleScroll(heading.id)}
                  className={`
                    group w-full text-left py-2.5 pr-4 text-sm transition-all duration-200 border-l-[3px]
                    ${heading.level === 3 ? 'pl-8' : 'pl-5'} 
                    ${isActive 
                      ? 'border-[#f35d36] bg-orange-50 text-[#f35d36] font-bold' 
                      : 'border-transparent text-gray-500 hover:text-[#212c4a] hover:bg-gray-50'
                    }
                  `}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}