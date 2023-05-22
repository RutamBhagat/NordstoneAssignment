import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function GET(request: NextRequest, response: NextResponse) {
  //Destructuring token from header
  const headersList = headers();
  const bearerToken = headersList.get("authorization") as string;
  const token = bearerToken.split(" ")[1];

  //Token decoding and extracting email from it
  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return NextResponse.json({ errorMessage: "Unauthorized request", bearerToken, token }, { status: 401 });
  }

  //Getting user from database with email from token
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    return NextResponse.json({ errorMessage: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
    },
    { status: 200 }
  );
}
