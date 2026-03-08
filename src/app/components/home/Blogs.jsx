'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/pagination';

export default function BlogSection() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 👇 UPDATED: Fetch from the public API
        const res = await fetch('/api/blog/posts');
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        
        // Ensure data is an array before chunking
        if (Array.isArray(data)) {
            const chunks = [];
            // Chunk into groups of 3 (1 Big + 2 Small)
            for (let i = 0; i < data.length; i += 3) {
                chunks.push(data.slice(i, i + 3));
            }
            setSlides(chunks);
        }
      } catch (error) {
        console.error('Failed to load blog posts', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Show Section Header even if loading, so layout doesn't jump
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#15151e] leading-tight">
            <strong>Get solution from our</strong> Research, Tips & Advices
          </h2>
          <p className="mt-4 app-paragraph">
            Dive into a treasure trove of insights! Our blog section is your go-to resource for staying ahead in the ever-evolving world of digital marketing.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96">
            <div className="bg-gray-50 animate-pulse rounded-4xl"></div>
            <div className="flex flex-col gap-6">
              <div className="flex-1 bg-gray-50 animate-pulse rounded-4xl"></div>
              <div className="flex-1 bg-gray-50 animate-pulse rounded-4xl"></div>
            </div>
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-4xl text-gray-400">
            No articles published yet.
          </div>
        ) : (
          /* Swiper Slider */
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={40}
            slidesPerView={1}
            className="pb-16 blog-swiper"
          >
            {slides.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                  
                  {/* === LEFT COLUMN: 1 BIG CARD === */}
                  <div className="h-full">
                    {group[0] && (
                      <div className="h-full bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                        
                        {/* Image inside padding */}
                        <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                          {group[0].featuredImage ? (
                            <Image 
                              src={group[0].featuredImage} 
                              alt={group[0].title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col flex-1 px-1">
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 font-medium">
                            <span className="text-[#f35d36]">{group[0].category?.name}</span>
                            <span className="text-gray-300">|</span>
                            <span>{new Date(group[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                            <Link href={`/blog/${group[0].slug}`}>
                              {group[0].title}
                            </Link>
                          </h3>
                          
                          <div className="mt-auto">
                            <Link href={`/blog/${group[0].slug}`} className="inline-flex items-center gap-2 text-base font-bold text-[#6a738e]">
                              Read More <FiArrowRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                    {/* --- RIGHT: Small Cards --- */}
                    <div className="flex flex-col gap-6 h-full">
                    {group.slice(1).map((post) => (
                        <div key={post.id} className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-row gap-4 items-center">
                        <div className="relative w-60 h-60 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                            {post.featuredImage ? (
                            <Image 
                                src={post.featuredImage} 
                                alt={post.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            ) : (
                            <div className="w-full h-full bg-gray-200"></div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <span className="font-medium text-[#f35d36]">{post.category?.name}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <h4 className="text-lg font-bold text-[#1a1a1a] mb-2 leading-tight line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                            </h4>

                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-base font-semibold text-[#6a738e]">
                                Read More <FiArrowRight size={16} />
                            </Link>
                        </div>
                        </div>
                    ))}
                    </div>

                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        )}

        {/* Styles remain the same */}
        <style jsx global>{`
          .blog-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #d1d5db;
            opacity: 1;
            transition: all 0.3s;
          }
          .blog-swiper .swiper-pagination-bullet-active {
            background: #f35d36;
            width: 24px;
            border-radius: 5px;
          }
          .blog-swiper {
            padding-bottom: 50px !important; 
          }
        `}</style>
      </div>
    </section>
  );
}


