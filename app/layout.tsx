import AuthContext from "./context/AuthContext";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import QueryWrapper from "./auth/QueryWrapper";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="en">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></Script>
      <head />
      <body>
        <main className="bg-[#0a081a] min-h-screen w-screen">
          <QueryWrapper>
            <AuthContext>
              <main className="max-w-screen-2xl m-auto bg-[#0a081a]">{children}</main>
            </AuthContext>
          </QueryWrapper>
        </main>
      </body>
    </html>
  );
}
