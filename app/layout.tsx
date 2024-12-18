import "@/styles/global.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Digital Product Jam Starter Kit",
  description:
    "A starter kit for wiritng code in the Digital Product Jam course.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="rtl">
      <head>
        <link rel="icon" />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
