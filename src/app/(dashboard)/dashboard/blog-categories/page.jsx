'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiTrash2, FiFilter } from 'react-icons/fi';
import { Pagination } from 'app/(dashboard)/components/ui/Pagination';
import { CategoryTable } from 'app/(dashboard)/components/ui/CategoryTable';
import { Modal } from 'app/components/ui/Modal';
import { toastError, toastSuccess } from 'lib/toast';
import PageHeading from 'app/components/ui/PageHeading';

// Helper Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const ITEMS_PER_PAGE = 10;

  // --- API Fetching ---
  const fetchCategories = useCallback(async (page, search) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blog/admin/categories?page=${page}&limit=${ITEMS_PER_PAGE}&search=${search}`);
      if (!response.ok) throw new Error('Failed to fetch categories.');
      
      const data = await response.json();
      setCategories(data.categories || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toastError(error.message);
      setCategories([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { 
      fetchCategories(currentPage, debouncedSearchQuery); 
  }, [currentPage, debouncedSearchQuery, fetchCategories]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedCategoryIds([]);
  }, [debouncedSearchQuery]);

  // --- Handlers ---
  const handleDeleteCategory = async (categoryId) => {
     await handleDeleteSelected([categoryId]);
  };

  const handleDeleteSelected = async (idsToDelete) => {
    try {
      const response = await fetch('/api/blog/admin/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete }),
      });
      if (!response.ok) throw new Error('Failed to delete categories.');
      
      toastSuccess("Categories deleted successfully.");
      setSelectedCategoryIds([]);
      fetchCategories(currentPage, debouncedSearchQuery);
    } catch (error) {
      toastError(error.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Selection Logic
  const currentPageCategoryIds = useMemo(() => categories.map(c => c.id), [categories]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategoryIds(prev => [...new Set([...prev, ...currentPageCategoryIds])]);
    } else {
      setSelectedCategoryIds(prev => prev.filter(id => !currentPageCategoryIds.includes(id)));
    }
  };
  
  const handleSelectOne = (e, catId) => {
    if (e.target.checked) {
      setSelectedCategoryIds(prev => [...prev, catId]);
    } else {
      setSelectedCategoryIds(prev => prev.filter(id => id !== catId));
    }
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog", href: "/dashboard/blog/posts" },
    { label: "Categories" }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Page Heading */}
        <PageHeading
          title="Categories"
          breadcrumbs={breadcrumbs}
        />

      {/* 2. Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
            <div className="relative w-full sm:w-72">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] outline-none transition-all text-sm"        
                />
            </div>

            <div className="flex items-center gap-2">
                {selectedCategoryIds.length > 0 && (
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-semibold transition-colors animate-in fade-in"
                    >
                        <FiTrash2 />
                        Delete ({selectedCategoryIds.length})
                    </button>
                )}
                <Link
                    href="/dashboard/blog-categories/new"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#f35d36] hover:bg-[#d84e2a] text-white text-sm font-semibold rounded-lg shadow-sm shadow-orange-100 transition-all hover:scale-105"
                    >
                    <FiPlus className="w-4 h-4" /> 
                    <span>Add New Category</span>
                </Link>
                <button className="p-2 text-gray-500 hover:text-[#212c4a] hover:bg-gray-100 rounded-lg transition-colors border border-gray-100">
                    <FiFilter className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* 3. Table Content */}
        <div>
          {isLoading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#f35d36] rounded-full animate-spin mb-4"></div>
                Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-gray-50/50">
                <p>No categories found.</p>
                <Link href="/dashboard/blog-categories/new" className="text-[#f35d36] hover:underline text-sm mt-2 block">
                    Create your first category
                </Link>
            </div>
          ) : (
            <CategoryTable
              categories={categories}
              onDeleteCategory={handleDeleteCategory}
              baseEditPath="/dashboard/blog-categories"
              selectedCategoryIds={selectedCategoryIds}
              onSelectOne={handleSelectOne}
              onSelectAll={handleSelectAll}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              allSelectedOnPage={currentPageCategoryIds.length > 0 && currentPageCategoryIds.every(id => selectedCategoryIds.includes(id))}
            />
          )}
        </div>

        {/* 4. Pagination */}
        {!isLoading && totalPages > 1 && (
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        )}
      </div>

      {/* Bulk Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Bulk Delete">
        <div>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-bold text-[#212c4a]">{selectedCategoryIds.length}</span> categories? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
                <button 
                    onClick={() => setIsDeleteModalOpen(false)} 
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => handleDeleteSelected(selectedCategoryIds)} 
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                >
                    Delete Selected
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}