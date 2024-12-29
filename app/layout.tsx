import "./layout.css";
import React from "react";
import Link from "next/link";
import BottomNav from "../lib/components/BottomNav";
export const metadata = {
  title: "My App",
  description: "Description of the app",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="he" dir="rtl">
      <body>
        <div className="app-container">
          <main className="content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
