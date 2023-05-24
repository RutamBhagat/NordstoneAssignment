import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { formData } = body;
  console.log("THIS IS HITTING");
  console.log("formData", formData);
  return NextResponse.json(
    {
      url: "https://cdn.gamestatic.net/files/editor_uploads/Safola/%D0%90%D1%80%D1%82%D1%8B/art-na-tifu-iz-final-fantasy-vii-risunki-s-devushkami/image4.png",
    },
    { status: 200 }
  );
}
