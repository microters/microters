// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { PrismaClient } from '@prisma/client';
// import { authOptions } from 'lib/auth';

// const prisma = new PrismaClient();

// // --- GET: Single Post ---
// export async function GET(req, { params }) {
//   try {
//     const { id } = await params;
//     const post = await prisma.post.findUnique({ where: { id } });
//     if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     return NextResponse.json(post);
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// // --- PUT: Update Post ---
// export async function PUT(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//     const { id } = await params;
//     const body = await req.json();
//     const { title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription } = body;

//     const existingSlug = await prisma.post.findFirst({
//       where: { slug, NOT: { id } }
//     });
//     if (existingSlug) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

//     const updatedPost = await prisma.post.update({
//       where: { id },
//       data: {
//         title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription
//       }
//     });

//     return NextResponse.json(updatedPost);
//   } catch (error) {
//     return NextResponse.json({ error: 'Update failed' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'lib/auth';
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    const post = await prisma.post.findUnique({ 
        where: { id },
        include: { category: true }
    });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- PUT: Update Post ---
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    
    const { title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription } = body;
    const existingSlug = await prisma.post.findFirst({
      where: { slug, NOT: { id } }
    });

    if (existingSlug) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title, slug, content, excerpt, categoryId, status, featuredImage, metaTitle, metaDescription
      }
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}