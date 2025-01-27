import React, { useState,useEffect } from "react";
import styles from "../page.module.css";

interface GuidePageProps {
  title: string;
  icon: string;
  contents: string[]; 
  buttons: { text: string; onClick: () => void }[]; 
}

const GuidePage: React.FC<GuidePageProps> = ({title, icon, contents, buttons}) => {
  
  useEffect(() => {
      document.body.style.backgroundColor = "#F6FBFF";
  
      // Reset the body background color when the component unmounts
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);
  
    const renderContent = (content: string) => {
      // Check if the content is an image path
      if (content.match(/\.(jpeg|jpg|png|gif|svg)$/)) {
        console.log(content);
        return (
          <img src={content}  alt="Descriptive alt text"  className={styles.image} />
        );
      }
      // Otherwise, render the content as a paragraph
      return <div>
          <p className={styles.explanation}>{content}</p>      
          <div style={{ height: "10px" }} />
        </div>
      ;
    };

  return (
    <div className={styles.container}>
      {/* <div style={{ height: "200px" }} /> */}

      <div className={styles.graphicArea}>
      <img src={icon} alt="Icon" className={styles.icon} />
      </div>

      <div style={{ height: "50px" }} />

      <div className={styles.title}>{title}</div>

    {/* Contents */}
    {contents.map((content) => renderContent(content))}

      <div style={{ height: "70px" }} />
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
