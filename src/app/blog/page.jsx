// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import PageHeader from "app/components/PageHeader";
// import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
// import { FaArrowRight } from "react-icons/fa";
// import { Pagination } from "app/(dashboard)/components/ui/Pagination";

// export default function BlogPage() {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState(["All"]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     async function getData() {
//       const catRes = await fetch("/api/blog/categories");
//       const catData = await catRes.json();
//       setCategories(["All", ...catData.map((c) => c.name)]);
      
//       const postRes = await fetch("/api/blog/posts");
//       const postData = await postRes.json();
//       setPosts(postData);
//       setLoading(false);
//     }
//     getData();
//   }, []);

//   // Fetch posts when tab changes
//   useEffect(() => {
//     async function fetchFilteredPosts() {
//       setLoading(true);
//       const url = activeTab === "All" ? "/api/blog/posts" : `/api/blog/posts?category=${activeTab}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       setPosts(data);
//       setLoading(false);
//     }
//     fetchFilteredPosts();
//   }, [activeTab]);

//   return (
//     <main className="bg-gray-50 min-h-screen">
//       <PageHeader
//         title="Journey through Ideas:"
//         highlight="Our Blogging Corner"
//         description="Dive into a world of insights, trends, and expert perspectives..."
//       />

//       <section className="container mx-auto px-4 py-12">
//         {/* TAB SYSTEM */}
//         <div className="flex flex-wrap justify-center gap-3 mb-16">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveTab(cat)}
//               className={`px-6 py-2 border rounded-md transition-all font-medium ${
//                 activeTab === cat
//                   ? "bg-[#FF5C35] text-white border-[#FF5C35]"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-[#FF5C35] hover:text-[#FF5C35]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* POSTS GRID */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-500">Updating posts...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {posts.map((post) => (
//               <div key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
//                 {/* Image Section */}
//                 <div className="relative h-64 w-full overflow-hidden">
//                   <Image
//                     src={post.featuredImage || "/placeholder.jpg"}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute bottom-4 left-4 bg-[#FF5C35] text-white text-xs px-3 py-1.5 rounded-md font-semibold">
//                     {post.category?.name}
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-8 flex flex-col grow">
//                   <div className="text-gray-400 text-sm mb-4">
//                     {post.authorName || "Microters Team"} | {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-6 line-clamp-2">
//                     {post.title}
//                   </h2>
//                   <Link 
//                     href={`/blog/${post.slug}`} 
//                     className="mt-auto text-[#FF5C35] font-bold flex items-center gap-2 hover:underline"
//                   >
//                     Read More <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//             {/* PAGINATION COMPONENT */}
//             <div className="mt-16">
//               <Pagination 
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           </div>
//         )}
//       </section>

//       <CtaBeforeFooter />
//     </main>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "app/components/PageHeader";
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import { FaArrowRight } from "react-icons/fa";
import { Pagination } from "app/(dashboard)/components/ui/Pagination";
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Initial Fetch: Categories
  useEffect(() => {
    async function getCategories() {
      const catRes = await fetch("/api/blog/categories");
      const catData = await catRes.json();
      setCategories(["All", ...catData.map((c) => c.name)]);
    }
    getCategories();
  }, []);

  // Fetch posts when tab OR page changes
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const categoryParam = activeTab === "All" ? "" : `&category=${activeTab}`;
      const url = `/api/blog/posts?page=${currentPage}${categoryParam}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      // We assume your API returns: { posts: [], totalPages: x }
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setLoading(false);

      // Smooth scroll back to top of grid when page changes
      if (!loading) {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }
    fetchPosts();
  }, [activeTab, currentPage]);

  // Handle Tab Change: Reset to page 1
  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setCurrentPage(1);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Journey through Ideas:"
        highlight="Our Blogging Corner"
        description="Dive into a world of insights, trends, and expert perspectives..."
      />

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
        {loading ? (
          <div className="text-center py-20 text-gray-500">Updating posts...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <div key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={post.featuredImage || "/placeholder.jpg"}
                      alt={post.title}
                      fill
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
              ))}
            </div>

            {/* PAGINATION COMPONENT */}
            <div className="mt-16">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </section>

      <CtaBeforeFooter />
    </main>
  );
}