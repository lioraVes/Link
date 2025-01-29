"use client";

import React, { useEffect, useState } from "react";
import styles from "../page.module.css";

interface MultiPageProps {
  title: string;
  icon: string;
  sub: string;
  checkboxHeader: string;
  checkboxes: string[];
  buttons: { text: string; onClick: () => void }[];
}

const MultiPage: React.FC<MultiPageProps> = ({
  title,
  icon,
  sub,
  checkboxHeader,
  checkboxes,
  buttons,
}) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    Array(checkboxes.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const updatedState = [...checkedState];
    updatedState[index] = !updatedState[index];
    setCheckedState(updatedState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.sub}>{sub}</div>
      <div className={`${styles.sub} ${styles.checkboxHeader}`}>
        {checkboxHeader}
      </div>
      <div className={styles.checkboxContainer}>
        {checkboxes.map((option, index) => (
          <div key={index} className={styles.formCheckboxContainer}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={checkedState[index]}
              onChange={() => handleCheckboxChange(index)}
              className={styles.formCheckBox}
            />
            <label
              htmlFor={`checkbox-${index}`}
              className={styles.checkboxText}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className={`${styles.buttonArea} ${styles.bottomButton}`}>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={styles.multipleChoiceButton}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiPage;
