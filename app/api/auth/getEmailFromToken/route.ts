import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  //Destructuring token from body
  const body = await request.json();
  let { token } = body;

  //Token decoding and extracting email from it
  const payload = jwt.decode(token) as { email: string };

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
