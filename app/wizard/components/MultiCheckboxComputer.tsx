//@ts-nocheck
import React from "react";
import styles from "../page.module.css";

interface MultiCheckboxProps {
    title: string;
    content: string[];
    checkboxOptions: string[]; // Fix: Correctly refer to the passed function
  }

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  title,
  content,
  checkboxOptions,
}) => {

  return (
    <div >
      <div />

      <div className={styles.title}>{title}</div>

      <div className={styles.buttonArea}>
        {checkboxOptions.map((option, index) => (
            <div key={index} className={styles.formCheckboxContainer}>
            <input type="checkbox" id={`checkbox-${index}`}  checked={option.isChecked} onChange={() => handleCheckboxChange(index)}  className={styles.formCheckBox}/>
            <div className={styles.checkboxText}>
                {option.text}
            </div>
          </div>

        //   <button
        //     key={index}
        //     className={`${styles.multipleChoiceButton} ${styles.fadeIn}`}
        //     onClick={choice.onClick}
        //   >
        //     {choice.text}
        //   </button>
        ))}
      </div>
      <div className={styles.buttonArea}>
        <button className={styles.infoButton} onClick={infoOnClick}>
        סימנתי, אפשר להמשיך
        </button>
      </div>
    
    </div>
  );
};

export default ChoicePage;
