"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Pagination } from "app/(dashboard)/components/ui/Pagination";


const BlogCardSkeleton = () => (
  <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#d4d7df] flex flex-col animate-pulse">
    {/* Image Placeholder */}
    <div className="relative h-64 w-full bg-gray-200" />
    
    {/* Content Placeholder */}
    <div className="p-8 flex flex-col grow">
      {/* Date/Author Line */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      
      {/* Title Lines */}
      <div className="h-7 bg-gray-200 rounded w-full mb-3" />
      <div className="h-7 bg-gray-200 rounded w-3/4 mb-6" />
      
      {/* Link Placeholder */}
      <div className="mt-auto h-5 bg-gray-100 rounded w-1/4" />
    </div>
  </div>
);

export default function BlogContent({ initialPosts, categories, initialTotalPages }) {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const isInitialState = activeTab === "All" && currentPage === 1 && posts === initialPosts;
    if (isInitialState) return;

    async function updatePosts() {
      setIsUpdating(true);
      
      try {
        const categoryParam = activeTab === "All" ? "" : `&category=${activeTab}`;
        const res = await fetch(`/api/blog/posts?page=${currentPage}${categoryParam}`);
        const data = await res.json();
        
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsUpdating(false);
      }
    }

    updatePosts();
  }, [activeTab, currentPage]);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setCurrentPage(1);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* TAB SYSTEM */}
      <div className="flex flex-wrap gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleTabChange(cat)}
            className={`px-6 py-2 border rounded-md transition-all font-medium ${
              activeTab === cat
                ? "bg-[#FF5C35] text-white border-[#FF5C35]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#FF5C35]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isUpdating ? (
          Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#d4d7df] flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-[#FF5C35] text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                  {post.category?.name}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col grow">
                <div className="text-gray-400 text-sm mb-4">
                  {post.authorName || "Microters Team"} | {new Date(post.createdAt).toLocaleDateString('en-GB')}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-6 line-clamp-2">
                  {post.title}
                </h2>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="mt-auto text-[#FF5C35] font-bold flex items-center gap-2"
                >
                  Read More <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!isUpdating && posts.length === 0 && (
        <div className="text-center py-20 text-gray-500 italic">
          No posts found in this category.
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-16">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
        />
      </div>
    </section>
  );
}