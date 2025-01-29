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
    document.body.style.backgroundColor = "#F6FBFF";

    // Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const parseBoldText = (text: string) => {

    //handle bold or link text
    const parts = text.split(/(\*\*.*?\*\*|##.*?##)/); // Split by **bold text or ##link text##
    
    return parts.map((part, index) => {
      // Check if part is bold (starts and ends with **)
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <span key={index} style={{ fontWeight: 600 }}>
            {boldText}
          </span>
        );
      }
  
      // Check if part is a link (starts and ends with ##)
      if (part.startsWith("##") && part.endsWith("##")) {
        const linkText = part.slice(2, -2);
        return (
          <a key={index} href="https://www.youtube.com/watch?v=TwIOazT1BxU" style={{ color: '#FE5068' , textDecoration: 'none'}}>
            {linkText}
          </a>
        );
      }
  
      // Return the part as is if it's neither bold nor a link
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
          style={{ marginTop: content.marginTop, marginBottom: content.marginBottom }}
        />
      );
    }
    
    // Otherwise, render the content as a paragraph
    return (
      <div style={{ marginTop: content.marginTop ,marginBottom: content.marginBottom}}>
        <p className={styles.guideContent}>{parseBoldText(content.text)}</p>
        {/* <div style={{ height: "10px" }} /> */}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <div style={{ height: "200px" }} /> */}

      {/* <div style={{ height: "50px" }} /> */}

      <div className={styles.guideTitle}>{title}</div>

      {/* Contents */}
      {contents.map((content) => renderContent(content))}

      {/* <div style={{ height: "70px" }} /> */}
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
