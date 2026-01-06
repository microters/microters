"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { FiPlus, FiSearch, FiTrash2, FiFilter } from "react-icons/fi";
import { toastError, toastSuccess } from "lib/toast";
import { PostTable } from "app/(dashboard)/components/ui/PostTable";
import { Pagination } from "app/(dashboard)/components/ui/Pagination";
import { Modal } from "app/components/ui/Modal";
import PageHeading from "app/components/ui/PageHeading";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPostIds, setSelectedPostIds] = useState([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const ITEMS_PER_PAGE = 10;

  const fetchPosts = useCallback(async (page, search) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/blog/admin/posts?page=${page}&limit=${ITEMS_PER_PAGE}&search=${search}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts.");
      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toastError(error.message);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchPosts]);
  useEffect(() => {
    setCurrentPage(1);
    setSelectedPostIds([]);
  }, [debouncedSearchQuery]);

  const handleDeletePost = async (id) => await handleDeleteSelected([id]);

  const handleDeleteSelected = async (ids) => {
    try {
      const response = await fetch("/api/blog/admin/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) throw new Error("Failed to delete.");
      toastSuccess("Posts deleted successfully.");
      setSelectedPostIds([]);
      fetchPosts(currentPage, debouncedSearchQuery);
    } catch (error) {
      toastError(error.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const currentPagePostIds = useMemo(() => posts.map((p) => p.id), [posts]);

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedPostIds((prev) => [
        ...new Set([...prev, ...currentPagePostIds]),
      ]);
    else
      setSelectedPostIds((prev) =>
        prev.filter((id) => !currentPagePostIds.includes(id))
      );
  };

  const handleSelectOne = (e, id) => {
    if (e.target.checked) setSelectedPostIds((prev) => [...prev, id]);
    else setSelectedPostIds((prev) => prev.filter((pid) => pid !== id));
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog Posts" },
  ];

  return (
    <div className="space-y-6">
        <PageHeading title="Blog Posts" breadcrumbs={breadcrumbs} />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f35d36] focus:ring-1 focus:ring-[#f35d36] outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            {selectedPostIds.length > 0 && (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-semibold transition-colors"
              >
                <FiTrash2 /> Delete ({selectedPostIds.length})
              </button>
            )}
            <Link
                href="/dashboard/blog-posts/new"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#f35d36] hover:bg-[#d84e2a] text-white text-sm font-semibold rounded-lg shadow-sm transition-all hover:scale-105"
                >
                <FiPlus className="w-4 h-4" /> <span>Add New Post</span>
            </Link>
            <button className="p-2 text-gray-500 hover:text-[#212c4a] hover:bg-gray-100 rounded-lg border border-gray-100">
              <FiFilter />
            </button>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#f35d36] rounded-full animate-spin mb-4"></div>
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-gray-50/50">
              <p>No posts found.</p>
            </div>
          ) : (
            <PostTable
              posts={posts}
              onDeletePost={handleDeletePost}
              selectedPostIds={selectedPostIds}
              onSelectOne={handleSelectOne}
              onSelectAll={handleSelectAll}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              allSelectedOnPage={
                currentPagePostIds.length > 0 &&
                currentPagePostIds.every((id) => selectedPostIds.includes(id))
              }
            />
          )}
        </div>

        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Bulk Delete"
      >
        <div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{selectedPostIds.length}</span> posts?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteSelected(selectedPostIds)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
