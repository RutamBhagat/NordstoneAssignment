import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const public_id = searchParams.get("public_id") as string;
  console.log("id", public_id);

  // Delete a image url
  try {
    const result = await prisma.photo.delete({
      where: {
        id: public_id,
      },
    });
    cloudinary.uploader.destroy(public_id, (error, result) => {
      console.log("result", result);
      console.log("error", error);
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while deleting an image url" }, { status: 400 });
  }
}
