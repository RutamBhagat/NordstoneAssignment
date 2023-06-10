import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, newId, newUrl } = body;

  // Update a image url
  try {
    const result = await prisma.photo.update({
      where: { id: id },
      data: { id: newId, url: newUrl },
    });
    cloudinary.uploader.destroy(id, (error: any, result: any) => {
      console.log("result", result);
      console.log("error", error);
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while updating an image url" }, { status: 400 });
  }
}
