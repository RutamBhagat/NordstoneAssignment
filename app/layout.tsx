import Script from "next/script";
import QueryWrapper from "./auth/QueryWrapper";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="en">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></Script>
      <head />
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
