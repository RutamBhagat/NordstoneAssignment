import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

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
        createdAt: "desc",
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: "Error has occured while making a post" }, { status: 403 });
  }
}
