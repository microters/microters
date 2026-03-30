"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Pagination } from "app/(dashboard)/components/ui/Pagination";

// 1. Change the prop name to match what the server sends
export default function BlogContent({ initialPosts, initialCategories }) {
  
  // 2. Fix the ReferenceError: Use initialPosts.posts instead of initialData
  const [posts, setPosts] = useState(initialPosts.posts || []);
  const [totalPages, setTotalPages] = useState(initialPosts.totalPages || 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    // 3. Skip fetch on first load
    if (activeTab === "All" && currentPage === 1) {
      setPosts(initialPosts.posts);
      setTotalPages(initialPosts.totalPages);
      return;
    }

    const updatePosts = async () => {
      const res = await fetch(`/api/blog/posts?category=${activeTab}&page=${currentPage}`);
      const data = await res.json();
      
      // 4. Update both posts and totalPages from the object
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    };

    updatePosts();
  }, [activeTab, currentPage, initialPosts]);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setCurrentPage(1); // Important: reset to page 1 on category change
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* TABS */}
      <div className="flex flex-wrap gap-3 mb-16 justify-center">
        {initialCategories.map((cat) => (
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

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts?.map((post) => (
          <div key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
            {/* ... keep your Image and Content JSX the same ... */}
            <div className="relative h-64 w-full overflow-hidden">
               <Image src={post.featuredImage || "/placeholder.jpg"} alt={post.title} fill className="object-cover" />
               <div className="absolute bottom-4 left-4 bg-[#FF5C35] text-white text-xs px-3 py-1.5 rounded-md">{post.category?.name}</div>
            </div>
            <div className="p-8 flex flex-col grow">
               <h2 className="text-2xl font-bold mb-6">{post.title}</h2>
               <Link href={`/blog/${post.slug}`} className="mt-auto text-[#FF5C35] font-bold flex items-center gap-2 group/link">
                 Read More <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Add the Pagination Component here */}
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