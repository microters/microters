import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 9,
      include: {
        category: {
          select: { name: true, slug: true }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Public Blog Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}