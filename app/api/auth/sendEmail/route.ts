import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import * as jose from "jose";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  // Data validation
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is not valid",
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

  // Check if user exists and check user credentials
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ errorMessage: "User with this email does not exists" }, { status: 400 });
  }

  // Token creation using jose library
  const algo = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime("24h")
    .sign(secret);

  // Nodemailer part
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "antwan.langworth37@ethereal.email", // generated ethereal user
      pass: "JhP9MXr8HpXtB2ZXUw", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Assignment Nordstone" <louie.aufderhar@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Reset your password", // Subject line
    text: "Reset your password", // plain text body
    html: `
    <body>
        <h2>Reset Your Password</h2>
        <p>Dear ${email.split("@")[0]},</p>
        <p>We recently received a request to reset the password associated with your Nordstone account. To regain access to your account, please follow the instructions below:</p>
        <ol>
            <li>Click on the password reset link at <a href="http://localhost:3000/auth/forgot_password?token=${token}">Reset Password</a></li>
            <li>Follow the on-screen instructions to create a new password for your account.</li>
        </ol>
        <p>Please note that this password reset link will expire after 24 hours for security reasons. If you don't reset your password within this time frame, you'll need to submit another "Forgot Password" request.</p>
        <p>If you did not request a password reset or believe this email was sent to you in error, please ignore it. Your account will remain secure.</p>
        <p>If you continue to experience any issues or have further questions, please feel free to contact our support team. We're here to help!</p>
        <p>Thank you for using our service.</p>
        <p>Best regards,</p>
        <p>Nordstone</p>
    </body>
    `,
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  const response = NextResponse.json({ info: info }, { status: 200 });

  response.cookies.set("jwt", token, { maxAge: 24 * 60 * 60 * 6 });

  return response;
}
