import validator from "validator";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (validator.isEmail(email) === false) {
    return NextResponse.json({ err: "Email not found" }, { status: 403 });
  }

  // Get user
  const prismaUser = await prisma.user.findUnique({
    where: { email: email },
  });

  try {
    const data = await prisma.post.findMany({
      where: {
        userId: prismaUser?.id as string,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: "Error has occured while getting all post" }, { status: 403 });
  }
}
