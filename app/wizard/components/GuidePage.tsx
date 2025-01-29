"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
interface GuideContent {
  text: string;
  marginTop: string;
  marginBottom: string;
}

interface GuidePageProps {
  title: string;
  icon: string;
  contents: GuideContent[];
  buttons: { text: string; onClick: () => void }[];
}

const GuidePage: React.FC<GuidePageProps> = ({
  title,
  icon,
  contents,
  buttons,
}) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = "#F6FBFF";

      return () => {
        document.body.style.backgroundColor = "";
      };
    }
  }, []);
  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|##.*?##)/); // Split by **bold text** or ##link text##

    return parts.map((part, index) => {
      // Detect numbered lists with bold formatting (handles both "1.טקסט" and "1. טקסט")
      const match = part.match(/^\*\*(\d+)\.?\s*(.*?)\*\*$/);
      if (match) {
        return (
          <div
            key={index}
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <span
              style={{ fontWeight: 600, minWidth: "20px", textAlign: "right" }}
            >
              {match[1]}.
            </span>
            <span style={{ fontWeight: 600 }}>{match[2]}</span>
          </div>
        );
      }

      // Bold text handling (not part of a numbered list)
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} style={{ fontWeight: 600 }}>
            {part.slice(2, -2)}
          </span>
        );
      }

      // Link text handling
      if (part.startsWith("##") && part.endsWith("##")) {
        return (
          <a
            key={index}
            href="https://www.youtube.com/watch?v=TwIOazT1BxU"
            style={{ color: "#FE5068", textDecoration: "none" }}
          >
            {part.slice(2, -2)}
          </a>
        );
      }

      return part;
    });
  };

  const renderContent = (content: GuideContent) => {
    // Check if the content is an image path
    if (content.text.match(/\.(jpeg|jpg|png|gif|svg)$/)) {
      console.log(content);
      return (
        <img
          src={content.text}
          alt="Descriptive alt text"
          className={styles.image}
          style={{
            marginTop: content.marginTop,
            marginBottom: content.marginBottom,
          }}
        />
      );
    }

    // Otherwise, render the content as a paragraph
    return (
      <div
        style={{
          marginTop: content.marginTop,
          marginBottom: content.marginBottom,
        }}
      >
        <p className={styles.guideContent}>{parseBoldText(content.text)}</p>
        {/* <div style={{ height: "10px" }} /> */}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.guideTitle}>{title}</div>

      {/* Contents */}
      {contents.map((content) => renderContent(content))}

      {/* Buttons */}
      <div className={styles.buttonArea}>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`${styles.multipleChoiceButton} ${styles.fadeIn}`}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
      </div>
      <div style={{ height: "70px" }} />
    </div>
  );
};

export default GuidePage;
