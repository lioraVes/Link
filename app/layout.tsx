import "./layout.css";
import React from "react";
import Link from "next/link";
import BottomNav from "@/lib/components/BottomNav";
import TopNav from "@/lib/components/TopNav";
export const metadata = {
  title: "Link",
  description: "",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>Link</title>
        <link rel="icon" href="/images/LinkLogo.svg" />
      </head>

      <div className="app-container">
        <TopNav />
        <main className="content">{children}</main>
        <BottomNav />
      </div>
    </html>
  );
};

export default RootLayout;
