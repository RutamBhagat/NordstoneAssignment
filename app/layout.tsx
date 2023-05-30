import Script from "next/script";
import { ReactNode } from "react";
import QueryWrapper from "./auth/QueryWrapper";
import AuthContext from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="light" lang="en">
      <head>
        <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></Script>
      </head>
      <body>
        <main className="min-h-screen w-screen">
          <QueryWrapper>
            <AuthContext>
              <main className="max-w-screen m-auto">{children}</main>
            </AuthContext>
          </QueryWrapper>
        </main>
      </body>
    </html>
  );
}
