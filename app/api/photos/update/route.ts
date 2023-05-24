import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, newUrl } = body;

  // Update a image url
  console.log("THIS IS HIT 1");
  try {
    console.log("THIS IS HIT 2");
    const result = await prisma.photo.update({
      where: { id: id },
      data: { url: newUrl },
    });
    console.log("result", result);
    console.log("THIS IS HIT 3");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("THIS IS HIT ERROR");
    console.log("error", error);
    return NextResponse.json({ err: "Error occured while updating an image url" }, { status: 400 });
  }
}
