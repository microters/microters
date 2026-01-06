'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}) {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 sm:px-6 ${className}`}>
      
      {/* Mobile View: Simple Prev/Next */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Desktop View: Full Numbered Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        
        {/* Info Text */}
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-bold text-[#212c4a]">{currentPage}</span> of{' '}
            <span className="font-bold text-[#212c4a]">{totalPages}</span>
          </p>
        </div>

        {/* Buttons */}
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            
            {/* Previous Arrow */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`dots-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 transition-colors ${
                    isActive
                      ? 'z-10 bg-[#f35d36] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f35d36]'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-[#f35d36]'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}