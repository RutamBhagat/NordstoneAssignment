import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { public_id, email, url } = body;

  const prismaUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!prismaUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // Upload a image url
  try {
    const result = await prisma.photo.create({
      data: {
        id: public_id,
        url: url as string,
        userId: prismaUser?.id as string,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while saving image url" }, { status: 400 });
  }
}
