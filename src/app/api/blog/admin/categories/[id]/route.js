import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'lib/auth';

const prisma = new PrismaClient();

// --- GET: Fetch Single Category ---
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- Update Category ---
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 👇 FIX: await params
    const { id } = await params;
    
    const body = await req.json();
    const { name, slug, description, status, metaTitle, metaDescription } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and Slug are required.' }, { status: 400 });
    }

    const existingSlug = await prisma.category.findFirst({
      where: { 
        slug, 
        NOT: { id } 
      },
    });

    if (existingSlug) {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        status,
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json(updatedCategory);

  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// --- Delete Single Category ---
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 👇 FIX: await params
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}