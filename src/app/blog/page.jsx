import { PrismaClient } from '@prisma/client';
import PageHeader from "app/components/PageHeader";
import BlogContent from 'app/components/blog/BlogContent';
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";


const prisma = new PrismaClient();

export default async function BlogPage() {
  const LIMIT = 9;

  const [categoriesData, initialPostsData] = await Promise.all([
    prisma.category.findMany({ select: { name: true } }),
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: LIMIT,
      include: { category: { select: { name: true, slug: true } } },
    }),
  ]);

  const totalPosts = await prisma.post.count({ where: { status: 'PUBLISHED' } });
  const totalPages = Math.ceil(totalPosts / LIMIT); 

  const categories = ["All", ...categoriesData.map((c) => c.name)];

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Journey through Ideas:"
        highlight="Our Blogging Corner"
        description="Dive into a world of insights, trends, and expert perspectives..."
      />
      <BlogContent 
        initialPosts={initialPostsData} 
        categories={categories} 
        initialTotalPages={totalPages}
      />

      <CtaBeforeFooter />
    </main>
  );
}