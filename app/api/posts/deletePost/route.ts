import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  // Get post
  const prismaPost = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!prismaPost) {
    return NextResponse.json({ message: "Post not found" }, { status: 400 });
  }

  // Delete a post
  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error occured while getting auth users posts" }, { status: 400 });
  }
}
