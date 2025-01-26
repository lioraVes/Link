import React, { useEffect } from "react";
import styles from "../page.module.css";

interface InfoPageProps {
  title: string;
  info: string;
  infoOnClick: { text: string; onClick: () => void }[];
}

const InfoPage: React.FC<InfoPageProps> = ({ title, info, infoOnClick }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#FE5068";

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
        <img
          src={content}
          alt="Descriptive alt text"
          className={styles.image}
        />
      );
    }
    // Otherwise, render the content as a paragraph
    return <p>{content}</p>;
  };

  return (
    <div className={styles.infoContainer}>
      <div style={{ height: "150px" }} />

      <div className={styles.graphicArea}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="89"
          height="115"
          viewBox="0 0 89 115"
          fill="none"
        >
          <g clipPath="url(#clip0_1389_618)">
            <path
              d="M79.43 61.6C78.4 81.92 72.19 87.21 58.59 98.8C56.2 100.83 53.54 103.1 50.69 105.64C41.18 104.64 31.81 99.49 24.74 91.3C18.12 83.63 13.39 73.2 11.07 61.13C8.99995 50.38 8.93996 39.38 9.28996 29.69C21.51 25.88 33.17 19.88 43.37 12.14C53.79 21.65 65.18 28.76 78.09 33.8L81.41 25.29C68.45 20.22 57.13 12.88 46.82 2.83999L43.9 -0.0100098L40.74 2.57999C29.94 11.44 17.11 18.1 3.64996 21.84L0.459955 22.73L0.309955 26.04C-0.190045 37.01 -0.370045 49.97 2.10996 62.87C4.72995 76.51 10.17 88.41 17.83 97.28C26.98 107.87 39.45 114.29 52.07 114.91L53.96 115L55.36 113.73C58.66 110.74 61.77 108.09 64.52 105.75C78.74 93.63 87.33 86.31 88.56 62.06L79.44 61.6H79.43Z"
              fill="#F6FBFF"
            />
            <path
              d="M40.1599 69.7899C38.3399 67.2799 36.5099 64.7499 35.6999 63.4499L27.9399 68.2599C28.9599 69.9099 30.9399 72.6299 33.0399 75.5199C34.9499 78.1499 36.9299 80.8799 37.7799 82.2399L42.5599 89.9599L45.8999 81.5199C47.2899 77.9999 48.7299 73.0399 50.2599 67.7999C52.9499 58.5299 56.2999 46.9999 59.9299 42.1299L52.6099 36.6699C47.9899 42.8599 44.5399 54.7599 41.4899 65.2499C41.0399 66.7999 40.5999 68.3199 40.1599 69.7799V69.7899Z"
              fill="#F6FBFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_1389_618">
              <rect width="88.56" height="115" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div style={{ height: "50px" }} />
      <div className={styles.infoTitle}>{title}</div>

      <div className={styles.info}>
        {info.map((text, index) => (
          <React.Fragment key={index}>{renderContent(text)}</React.Fragment>
        ))}
      </div>

      <div style={{ height: "150px" }} />
      <div className={styles.buttonArea}>
        <button className={styles.infoButton} onClick={infoOnClick}>
          הבנתי, אפשר להמשיך
        </button>
      </div>
    </div>
  );
};

export default InfoPage;
