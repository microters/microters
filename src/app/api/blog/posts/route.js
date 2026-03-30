// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export async function GET(req) {
//   try {
//     const posts = await prisma.post.findMany({
//       where: { status: 'PUBLISHED' },
//       orderBy: { createdAt: 'desc' },
//       take: 9,
//       include: {
//         category: {
//           select: { name: true, slug: true }
//         }
//       }
//     });

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error('Public Blog Fetch Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }

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

    // 2. Fetch total count and posts in parallel (Fastest way)
    const [totalPosts, posts] = await Promise.all([
      prisma.post.count({ where: whereClause }),
      prisma.post.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: skip, // Jumps to the correct page
        take: limit, // Gets exactly 9 posts
        include: {
          category: { select: { name: true, slug: true } }
        },
      })
    ]);

    // 3. Calculate total pages for the frontend
    const totalPages = Math.ceil(totalPosts / limit);

    // 4. Return an object instead of just an array
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