import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  //Token extraction is different in middleware than the one in route handler
  const bearerToken = request.headers.get("authorization") as string;
  const token = bearerToken.split(" ")[1];

  if (!bearerToken || !token) {
    return new NextResponse(JSON.stringify({ error: "Please provide authorization token" }), { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //Token varification
  try {
    await jose.jwtVerify(token, secret);
    //If token is valid, we can proceed to the next route handler
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
