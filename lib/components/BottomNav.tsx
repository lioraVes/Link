"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <Link href="/newsDynamic" className={`${"nav-item"} ${pathname === '/newsDynamic' ? "active" : ''}`}>
        עדכונים
      </Link>
      <Link href="/wizard" className={`${"nav-item"} ${pathname === '/wizard' ? "active" : ''}`}>
        עזרה ראשונה
      </Link>
      <Link href="/report" className={`${"nav-item"} ${pathname === '/report' ? "active" : ''}`}>
        דיווח
      </Link>
    </nav>
  );
};

export default BottomNav;
