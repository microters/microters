import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as cheerio from 'cheerio';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

// Components
import BlogSocialMedia from 'app/components/ui/BlogSocialMedia';
import { CommentSection } from 'app/components/ui/CommentSection';
import { PostContentWrapper } from 'app/components/ui/PostContentWrapper';
import { TableOfContents } from 'app/components/ui/TableOfContents';
import { prisma } from 'lib/prisma';

async function getPostData(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: { 
        slug: slug,
        status: 'PUBLISHED'
      },
      include: {
        category: {
          select: { name: true, slug: true }
        },
        comments: {
          where: { 
            status: 'APPROVED', 
            parentId: null      
          },
          orderBy: { createdAt: 'desc' },
          include: {
            replies: {
              where: { status: 'APPROVED' },
              orderBy: { createdAt: 'asc' }
            }
          }
        }
      }
    });
    return post;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

// --- Metadata Generator ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.metaTitle || post.title} | Microters`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: [{ url: post.featuredImage || '/default-og.png', width: 1200, height: 630 }],
    },
  };
}

const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

// --- Main Page Component ---
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) return notFound();

  // Parse Headings for TOC
  const $ = cheerio.load(post.content || '');
  const headings = $('h1, h2').map((_, el) => ({
    id: slugify($(el).text()),
    text: $(el).text(),
    level: parseInt(el.tagName.replace('H', ''), 10),
  })).get();

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-24 overflow-hidden bg-[#FFFBF8]">
        
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#f35d36]/5 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#212c4a]/5 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          
          {/* Category Pill */}
          {post.category && (
            <Link 
                href={`/blog/category/${post.category.slug}`}
                className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-[#f35d36] uppercase bg-orange-100/80 rounded-full hover:bg-[#f35d36] hover:text-white transition-all duration-300"
            >
              {post.category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#212c4a] leading-[1.15] mb-10 tracking-tight">
            {post.title}
          </h1>

          {/* Meta Data Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Author */}
            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#f35d36]">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Written by</p>
                <p className="text-sm font-bold text-[#212c4a]">Microters Team</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

            {/* Date */}
            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#f35d36]">
                <FiClock size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Published</p>
                <p className="text-sm font-bold text-[#212c4a]">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👇 FIX 3: MOVED IMAGE OUTSIDE THE SECTION 
         Uses -mt-24 to pull it up into the beige section, creating the overlap effect.
      */}
      {post.featuredImage && (
        <div className="container px-4 relative z-20 mt-10">
          <div className="group relative">
            <div className="absolute -inset-1 bg-linear-to-r from-[#f35d36] to-[#212c4a] rounded-[35px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative aspect-21/9 rounded-4xl overflow-hidden shadow-2xl border border-white/50 bg-gray-50">
              <Image 
                src={post.featuredImage} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Layout */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT SIDEBAR */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 space-y-8">
                <div>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Share this post</span>
                   <BlogSocialMedia postSlug={post.slug} postTitle={post.title} />
                </div>
                {headings.length > 0 && (
                  <div className="hidden lg:block">
                    <TableOfContents headings={headings} />
                  </div>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:col-span-7 order-1 lg:order-2">
              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-a:text-[#f35d36] prose-img:rounded-xl">
                <PostContentWrapper contentHtml={post.content} />
              </article>

              <div className="lg:hidden my-8 border-t border-b border-gray-100 py-6">
                 <TableOfContents headings={headings} />
              </div>

              <div className="mt-12 relative rounded-2xl overflow-hidden px-8 py-12 bg-linear-to-r from-[#FF9A3E] to-[#FF5266] text-white shadow-lg text-center">
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-bold">Grow with Microters?</h3>
                    <p className="opacity-90 max-w-md mx-auto mb-4">
                      Let's discuss your next project together. We help businesses scale with proven strategies.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#f35d36] px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105">
                      Contact Us <FiArrowRight />
                    </Link>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-100">
                <CommentSection 
                  initialComments={post.comments} 
                  postId={post.id} 
                  postTitle={post.title} 
                  commentApiUrl="/api/comments" 
                />
              </div>
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-2 order-3">
              <div className="sticky top-24 space-y-8">
                <div className="bg-[#212c4a] rounded-2xl p-6 text-center text-white shadow-lg">
                   <p className="font-bold text-lg mb-2">Need SEO?</p>
                   <p className="text-xs text-gray-400 mb-6">Boost your rankings today with Microters.</p>
                   <Link href="/services" className="block w-full py-2 rounded bg-[#f35d36] text-white text-xs font-bold hover:bg-[#d84e2a] transition-colors">
                      View Services
                   </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}