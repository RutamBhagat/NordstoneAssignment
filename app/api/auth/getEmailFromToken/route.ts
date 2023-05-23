import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function GET(request: NextRequest, response: NextResponse) {
  //Destructuring token from body
  const body = await request.json();
  let { token } = body;
  console.log("token", token);
  //Token decoding and extracting email from it
  const payload = jwt.decode(token) as { email: string };
  console.log("payload", payload);
  if (!payload.email) {
    return NextResponse.json({ errorMessage: "Unauthorized request", token }, { status: 401 });
  }

  return NextResponse.json(
    {
      email: payload.email,
    },
    { status: 200 }
  );
}
