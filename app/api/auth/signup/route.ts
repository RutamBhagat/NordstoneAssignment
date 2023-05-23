import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  // Data validation
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is not valid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Weak password",
    },
  ];

  let hasError = false;
  let errorMessage = "";
  for (let check of validationSchema) {
    if (check.valid === false) {
      hasError = true;
      errorMessage = check.errorMessage;
      break;
    }
  }
  if (hasError) {
    return NextResponse.json({ errorMessage: errorMessage }, { status: 400 });
  }

  // Check if user exists
  const userByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  // Send error if user exists
  if (userByEmail) {
    return NextResponse.json({ errorMessage: "Email already exists, please sign in" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //create user in db using prisma client
  //Note try upsert instead of create next time
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  // Token creation using jose library
  const algo = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime("24h")
    .sign(secret);

  const response = NextResponse.json(
    {
      email: user.email,
    },
    { status: 200 }
  );

  response.cookies.set("jwt", token, { maxAge: 24 * 60 * 60 * 6 });

  return response;
}
