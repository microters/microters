import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

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

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Fetch Single Post Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}