import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  // Delete a image url
  try {
    const result = await prisma.photo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while deleting an image url" }, { status: 400 });
  }
}
