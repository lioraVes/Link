"use client";

import React from "react";

interface TopNavProps {
  theme: string;
  onBack: () => void; // Add onBack prop

}

const TopNav: React.FC<TopNavProps> = ({ theme,onBack }) => {
  const back = "< חזרה";
  // const bgColor = theme === "white" ? "white" : "#FE5068";
  const elementsColor = theme === "white" ? "#4E538A" : "white";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "transparent", // Set background to transparent
        position: "fixed",
        top: "0",
        zIndex: 1000,
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: elementsColor,
          cursor: "pointer",
          marginRight: "20px",
        }}
        onClick={onBack} // Trigger onBack when clicked

      >
        {back}
      </div>
    </div>
  );
};

export default TopNav;
