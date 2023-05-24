import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url, newUrl } = body;

  // Update a image url
  try {
    const result = await prisma.photo.update({
      where: { url: url },
      data: { url: newUrl },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while updating an image url" }, { status: 400 });
  }
}