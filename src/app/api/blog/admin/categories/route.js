import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'lib/auth';

const prisma = new PrismaClient();

// --- POST: Create a New Category ---
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, slug, description, status, metaTitle, metaDescription } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and Slug are required.' },
        { status: 400 }
      );
    }

    // Check for Duplicate Slug
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this slug already exists.' },
        { status: 409 }
      );
    }

    // Create Category in DB
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        status: status || 'DRAFT',
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// --- GET: Fetch Categories ---
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    } : {};

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.count({ where })
    ]);

    return NextResponse.json({
      categories,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// --- DELETE: Bulk Delete ---
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    await prisma.category.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({ message: 'Categories deleted successfully' });

  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}