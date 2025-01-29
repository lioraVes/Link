import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

interface ChoicePageProps {
  question: string;
  icon: string;
  choices: { text: string; onClick: () => void }[];
  explanation_top?: string; // optional
  explanation_bottom?: string; // optional
}

const ChoicePage: React.FC<ChoicePageProps> = ({
  question,
  icon,
  choices,
  explanation_top,
  explanation_bottom,
}) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = "#F6FBFF";

      return () => {
        document.body.style.backgroundColor = "";
      };
    }
  }, []);
  const [showExplanationBottom, setShowExplanationBottom] = useState(false);

  const handleLinkClick = () => {
    setShowExplanationBottom(true);
  };

  const renderExplanationTop = () => {
    if (!explanation_top) return null;

    // Check if the explanation includes "מה זה?"
    const containsLink = explanation_top.includes("מה זה?");
    if (containsLink) {
      const parts = explanation_top.split("מה זה?");
      return (
        <div className={styles.explanation}>
          <p>
            {parts[0]}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick();
              }}
              className={styles.link}
            >
              מה זה?
            </a>
            {parts[1]}
          </p>
        </div>
      );
    }

    // Render normally if "מה זה?" is not included
    return (
      <div className={styles.explanation}>
        <p>{explanation_top}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div style={{ height: "50px" }} />

      <div className={styles.title}>{question}</div>
      {/* Explanation Top */}
      {renderExplanationTop()}

      <div className={styles.buttonArea}>
        {choices.map((choice, index) => (
          <button
            key={index}
            className={`${styles.multipleChoiceButton} ${styles.fadeIn}`}
            onClick={choice.onClick}
          >
            {choice.text}
          </button>
        ))}
      </div>

      {/* Explanation Bottom */}
      {showExplanationBottom && explanation_bottom && (
        <div className={`${styles.explanation} ${styles.fadeIn}`}>
          <p>{explanation_bottom}</p>
        </div>
      )}
    </div>
  );
};

export default ChoicePage;
