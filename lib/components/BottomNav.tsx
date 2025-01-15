import React from "react";
import Link from "next/link";

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <Link href="/newsDynamicTry" className="nav-item">
        עדכונים
      </Link>
      <Link href="/wizard" className="nav-item">
        עזרה ראשונה
      </Link>
      <Link href="/report" className="nav-item">
        דיווח
      </Link>
    </nav>
  );
};

export default BottomNav;
