import React from "react";
import styles from "../page.module.css";

interface ChoicePageProps {
  question: string;
  choices: { text: string; onClick: () => void }[];
  explanation?: string; // optional

}

const ChoicePage: React.FC<ChoicePageProps> = ({ question, choices, explanation}) => {
  const highlightWords = (text: string, wordsToHighlight: string[]) => {
    const parts = text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi'));
    return parts.map((part, index) =>
      wordsToHighlight.includes(part.toLowerCase()) ? <strong key={index}>{part}</strong> : part
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.graphicArea}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="82"
          height="115"
          viewBox="0 0 82 115"
          fill="none"
        >
          <g clipPath="url(#clip0_1389_95)">
            <path
              d="M53.5601 115L51.9101 114.87C44.9801 114.31 38.8201 112.55 33.0901 109.5C27.4201 106.49 22.1501 102.25 17.8301 97.25C10.1701 88.38 4.73008 76.48 2.11008 62.85C-0.369923 49.95 -0.189923 37 0.310077 26.03L0.460077 22.73L3.65008 21.84C17.1101 18.1 29.9401 11.44 40.7501 2.59L43.9101 0L46.8301 2.85C53.4201 9.27 60.6401 14.72 68.2701 19.05C72.4501 21.42 76.8701 23.52 81.4101 25.3L78.0901 33.81C73.1501 31.88 68.3301 29.59 63.7701 27C56.5801 22.92 49.7301 17.93 43.3901 12.15C33.1901 19.89 21.5401 25.89 9.32008 29.7C8.97008 39.39 9.04008 50.39 11.1001 61.13C13.4201 73.2 18.1401 83.62 24.7601 91.29C28.3501 95.44 32.7201 98.95 37.4001 101.44C41.5601 103.65 46.0201 105.02 51.0101 105.6C55.8701 101.92 59.9901 97.48 63.2701 92.37C67.4701 85.84 70.1801 78.28 71.1001 70.5L80.1701 71.58C79.0801 80.72 75.8901 89.61 70.9501 97.3C66.7301 103.87 61.3401 109.5 54.9301 114.04L53.5801 115H53.5601Z"
              fill="#FE5068"
            />
            <path
              d="M38.46 71.98C37.45 67.18 39.14 61.95 42.78 58.65C43.75 57.77 44.76 57.1 45.64 56.52C46.11 56.21 46.58 55.9 47.03 55.56C48.78 54.2 49.95 52.18 50.14 50.15C50.33 48.18 49.55 46.13 48.17 44.94C46.38 43.4 43.28 43.31 41.41 44.75C39.53 46.19 38.82 49.2 39.85 51.33L31.63 55.3C28.71 49.25 30.52 41.6 35.86 37.5C41.19 33.41 49.05 33.63 54.14 38.02C57.75 41.13 59.71 46.11 59.24 51.01C58.81 55.57 56.4 59.86 52.64 62.78C52.02 63.26 51.36 63.7 50.7 64.14C50.02 64.59 49.38 65.01 48.93 65.43C47.69 66.55 47.07 68.48 47.41 70.11L38.47 71.99L38.46 71.98Z"
              fill="#FE5068"
            />
            <path
              d="M41.52 90.0099C41.43 89.1399 41.36 87.5499 41.26 85.0399C41.19 83.3599 41.1 81.2799 41.04 80.6099L50.13 79.6899C50.22 80.5599 50.29 82.1499 50.39 84.6599C50.46 86.3399 50.55 88.4199 50.61 89.0899L41.52 90.0099Z"
              fill="#FE5068"
            />
          </g>
          <defs>
            <clipPath id="clip0_1389_95">
              <rect width="81.4" height="115" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div style={{ height: "50px" }} />

      <div className={styles.title}>{question}</div>

      {/* <div style={{ height: "25px" }} /> */}
      <div className={styles.buttonArea}>
        {choices.map((choice, index) => (
          <button key={index} className={styles.multipleChoiceButton} onClick={choice.onClick}>
            {choice.text}
          </button>
        ))}
      </div>
      {explanation && (
        <div className={styles.explanation}>
          <p>{highlightWords(explanation, ["אימות דו-שלבי"])}</p>
        </div>
      )}
      <div style={{ height: "150px" }} />
    </div>
  );
};

export default ChoicePage;
