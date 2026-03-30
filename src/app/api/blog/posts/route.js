import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get('category');
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    let whereClause = { status: 'PUBLISHED' };

    if (categoryName && categoryName !== 'All') {
      whereClause.category = { name: categoryName };
    }

    const [totalPosts, posts] = await Promise.all([
      prisma.post.count({ where: whereClause }),
      prisma.post.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } }
        },
      })
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts,
      totalPages,
      currentPage: page
    });

  } catch (error) {
    console.error('Public Blog Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}