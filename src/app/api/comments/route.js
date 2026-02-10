import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { postId, parentId, authorName, authorEmail, content } = body;

    // Simple Validation
    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        postId,
        parentId: parentId || null,
        authorName,
        authorEmail,
        content,
        status: 'PENDING',
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Comment Submission Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}