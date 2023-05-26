import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cors from "cors";

export async function POST(request: NextRequest) {
  const body = await request.json();
  //   const { email, url } = body;

  //   const prismaUser = await prisma.user.findUnique({
  //     where: { email: email },
  //   });

  //   if (!prismaUser) {
  //     return NextResponse.json({ message: "User not found" }, { status: 400 });
  //   }

  // Upload a image url
  try {
    // const result = await prisma.photo.create({
    //   data: {
    //     url: url as string,
    //     userId: prismaUser?.id as string,
    //   },
    // });
    return NextResponse.json(
      {},
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ err: "Error occured while saving image url" }, { status: 400 });
  }
}
