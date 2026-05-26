import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const prisma = new PrismaClient();

export default async function CategoryBlogPage({ params }) {

  const { slug } = await params;
  const currentCategory = await prisma.category.findFirst({
    where: { slug: slug },
    select: { id: true, name: true }
  });

  if (!currentCategory) {
    return notFound();
  }

  const posts = await prisma.post.findMany({
    where: { 
      status: 'PUBLISHED',
      categoryId: currentCategory.id
    },
    orderBy: { createdAt: 'desc' },
    include: { category: { select: { name: true } } },
  });

  return (
    <section className="px-5 py-16 bg-gray-50">
      <div className="container mx-auto">
          <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 capitalize">
          Category: <span className="text-[#FF5C35]">{currentCategory.name}</span>
        </h1>
        <p className="text-gray-500 mt-2">Showing all posts under {currentCategory.name}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 italic">
          No posts found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#d4d7df] flex flex-col"
            >
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
      )}
      </div>
    </section>
  );
}