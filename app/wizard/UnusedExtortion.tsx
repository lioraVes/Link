// @ts-nocheck
"use client";

import React, { useState } from "react";
import wizardData from "../../lib/data/extortion.json";
import guidesData from "../../lib/data/guides.json";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(wizardData.wizard.q1); // Start with Q1
  const [calmingMsg, setCalmingMsg] = useState(""); // Display calming messages
  const [selectedChoice, setSelectedChoice] = useState(""); // Track user's choice
  const router = useRouter(); // Initialize the router

  const handleClick = (subject: string) => {
    router.push(`/contact?${subject}`);
  };

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  const handleAnswer = (answerKey) => {
    const nextStepKey = currentStep.answers[answerKey];

    if (!nextStepKey) {
      console.error("No valid next step found.");
      return;
    }

    // Store the selected choice
    setSelectedChoice(answerKey);

    // Check if the next step is a question or a message
    if (wizardData.wizard[nextStepKey]) {
      const nextStep = wizardData.wizard[nextStepKey];
      if (nextStep.message) {
        setCalmingMsg(nextStep.message); // Set the calming message
      } else {
        setCalmingMsg("");
      }
      setCurrentStep(nextStep);
    } else if (guidesData.guides[nextStepKey]) {
      // If the next step is a guide, show the guide
      setCurrentStep(guidesData.guides[nextStepKey]);
    } else {
      console.error("Unknown step type.");
    }
  };

  const renderStep = () => {
    if (currentStep.type === "choice") {
      // Render a question with multiple choices
      return (
        <div className={styles.questionContainer}>
          <h3 className={styles.questionText}>{currentStep.question}</h3>
          <div className={styles.buttonGroup}>
            {Object.keys(currentStep.answers).map((answerKey) => (
              <button
                key={answerKey}
                className={styles.answerButton}
                onClick={() => handleAnswer(answerKey)}
              >
                {answerKey}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (currentStep.message) {
      return (
        <div className={styles.messageContainer}>
          <div className={styles.selectedChoice}>{selectedChoice}</div>
          <div className={styles.messageBox}>
            <p className={styles.messageText}>{calmingMsg}</p>
          </div>
          <button
            className={styles.continueButton}
            onClick={() => setCurrentStep(wizardData.wizard[currentStep.next])}
          >
            המשך
          </button>
        </div>
      );
    } else if (currentStep.title) {
      return (
        <div className={styles.guideContainer}>
          <h3 className={styles.guideTitle}>{currentStep.title}</h3>
          <div className={styles.guideContent}>
            {/* Split the text by "\n" and render each line */}
            {currentStep["short-content"].split("\n").map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>
          <button
            className={styles.continueButton}
            onClick={handleClick(currentStep["subject"])}
          >
            המשך
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.wizardContainer}>
      {/* Header */}
      {/* Graphic Section */}
      <div className={styles.graphicPlaceholder}>אייקון</div>
      {renderStep()}
    </div>
  );
}
