// @ts-nocheck
"use client";
import React, { useState } from "react";
import guidesData from "../../lib/data/guides.json";
import wizardData from "../../lib/data/wizard.json";
import "./page.css"; // Import CSS file for styling

export default function Wizard() {
  const [currentQuestion, setCurrentQuestion] = useState(
    wizardData.wizard.main_question
  ); // Start with the main question
  const [calmingMsg, setCalmingMsg] = useState("");
  const [path, setPath] = useState([]); // Track user progress

  const handleAnswer = (answerKey) => {
    const nextStep = currentQuestion.answers[answerKey];

    if (nextStep.questions) {
      // If the answer leads to more questions
      const nextQuestionKey = Object.keys(nextStep.questions)[0]; // Get the first question in the new branch
      const nextQuestion = nextStep.questions[nextQuestionKey];
      setPath([
        ...path,
        { question: currentQuestion.question, answer: answerKey },
      ]);
      setCalmingMsg(nextQuestion["calming-msg"] || "");
      setCurrentQuestion(nextQuestion);
    } else if (nextStep.startsWith("guide")) {
      // If the answer leads to a guide
      setPath([
        ...path,
        { question: currentQuestion.question, answer: answerKey },
      ]);
      setCurrentQuestion(guidesData.guides[nextStep]);
    } else {
      console.error("No valid next step found.");
    }
  };

  const renderQuestion = () => {
    if (currentQuestion.type === "choice") {
      return (
        <div className="question-container">
          <h3 className="question-text">{currentQuestion.question}</h3>
          <div className="button-group">
            {Object.keys(currentQuestion.answers).map((key) => (
              <button
                key={key}
                className="answer-button"
                onClick={() => handleAnswer(key)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (currentQuestion.type === "yes_no") {
      return (
        <div className="question-container">
          <h3 className="question-text">{currentQuestion.question}</h3>
          <div className="button-group">
            <button
              className="answer-button"
              onClick={() => handleAnswer("yes")}
            >
              Yes
            </button>
            <button
              className="answer-button"
              onClick={() => handleAnswer("no")}
            >
              No
            </button>
          </div>
        </div>
      );
    } else if (currentQuestion.title) {
      return (
        <div className="guide-container">
          <h3 className="guide-title">{currentQuestion.title}</h3>
          <p className="guide-content">{currentQuestion["short-content"]}</p>
          <a
            className="guide-link"
            href={currentQuestion.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
          <button
            className="restart-button"
            onClick={() => setCurrentQuestion(wizardData.wizard.main_question)}
          >
            Restart Wizard
          </button>
        </div>
      );
    }
  };

  return (
    <div className="wizard-container">
      <h1 className="wizard-title">Wizard</h1>
      {calmingMsg && (
        <p className="calming-message">
          <em>{calmingMsg}</em>
        </p>
      )}
      {renderQuestion()}
    </div>
  );
}
