// src/app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" }, { status: 500 });
  }
}