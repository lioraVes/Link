import "./layout.css";
import React from "react";
import Link from "next/link";
import BottomNav from "@/lib/components/BottomNav";
import TopNav from "@/lib/components/TopNav";
export const metadata = {
  title: "My App",
  description: "Description of the app",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>Link</title>
        <link rel="icon" href="/images/LinkLogo.svg" />
      </head>

      <body>
        <div className="app-container">
          <TopNav />
          <main className="content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
