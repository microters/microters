import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'lib/auth';

const prisma = new PrismaClient();

// --- GET: Fetch Posts ---
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;

    // Search by Title or Category Name
    const where = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { name: { contains: search, mode: 'insensitive' } } }
      ]
    } : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { name: true } }
        }
      }),
      prisma.post.count({ where })
    ]);

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });

  } catch (error) {
    console.error('Fetch Posts Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- POST: Create Post ---
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription } = body;

    if (!title || !slug) return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });

    const existingSlug = await prisma.post.findUnique({ where: { slug } });
    if (existingSlug) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

    const newPost = await prisma.post.create({
      data: {
        title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Create Post Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- DELETE: Bulk Delete ---
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { ids } = await req.json();

    if (!ids || !ids.length) return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });

    await prisma.post.deleteMany({ where: { id: { in: ids } } });

    return NextResponse.json({ message: 'Posts deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}