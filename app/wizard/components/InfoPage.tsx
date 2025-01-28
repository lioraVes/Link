import React, { useEffect } from "react";
import styles from "../page.module.css";

interface InfoPageProps {
  title: string;
  icon: string;
  info: string;
  buttons: { text: string; onClick: () => void }[];
}

const InfoPage: React.FC<InfoPageProps> = ({ title, icon, info, buttons }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#FE5068";

    // Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const renderContent = (content: string) => {
    return <p>{content}</p>;
  };

  return (
    <div className={styles.infoContainer}>
      <div style={{ height: "150px" }} />

      <div style={{ height: "50px" }} />
      <div className={styles.infoTitle}>{title}</div>

      <div className={styles.info}>{renderContent(info)}</div>

      <div style={{ height: "150px" }} />
      <div className={styles.buttonArea}>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={styles.infoButton}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfoPage;
