"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import TopNav from "@/lib/components/TopNav";
// import AnimatedIcon from "./AnimatedIcon";
import dynamic from "next/dynamic";

const AnimatedIcon = dynamic(() => import("./AnimatedIcon"), { ssr: false });


export default function Contact() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState<number[]>([]);

  const [animationState, setAnimationState] = useState<
    "playing" | "stopped" | "continue"
  >("playing");

  useEffect(()=>{
    if (typeof document !=="undefined"){
      document. body.style.background = "#F6FBFF";
      return ()=>{
        document.body.style.backgroundColor ="";
      };
    } 
  },[]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (step === 4) {
      setAnimationState("playing");
      timeout = setTimeout(() => {
        router.push("/wizard");
      }, 2500);
    }
  
    return () => clearTimeout(timeout); // Clean up timeout when component unmounts
  }, [step, router]);

  const navigateToStep = (newStep: number) => {
    setAnimationState("continue");
  
    setTimeout(() => {
      setHistory((prevHistory) => [...prevHistory, step]);
      setStep(newStep);
  
      setTimeout(() => {
        setAnimationState("playing"); // Ensure animation starts fresh
      }, 100); // Short delay ensures state updates smoothly
    }, 2000);
  };

  const handleBackButton = () => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setStep(lastStep);
      setAnimationState("playing"); // Ensure previous animation restarts
    } else {
      router.back();
    }
  };

  const handleSendForm = async () => {
    if (!isAgree || !phoneNumber) {
      alert("Please enter your phone number and agree to send the details.");
      return;
    }

    const data = {
      phone: phoneNumber,
      message: additionalInput,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); // Ensure this matches your Next.js API route
      if (response.ok) {
        console.log("Response:", response);
        navigateToStep(3); // Move to the next step on success
      } else {
        const error = await response.json();
        alert("Failed to send email: " + error.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send details.");
    }
  };

  return (
    <div className={styles.step1Container}>
      <TopNav theme={"white"} onBack={handleBackButton} />
      <div style={{ height: "50px" }} />
      {step === 1 && (
        <>
          <AnimatedIcon animation="hand" state={animationState} />
          <div className={styles.headerStep1}>שמחתי לעזור לך</div>
          <p className={styles.paragraphStep1}>
            לפני שנסיים, חשוב לי לספר לך שאיגוד האינטרנט הישראלי מפעיל גם{" "}
            <strong>קו סיוע</strong>, ואם תרצה, אני יכול להעביר את הפרטים שלך
            לנציג אנושי. הנציג ייצור איתך קשר בוואטסאפ בזמן הקרוב וימשיך לטפל
            בך.
          </p>

          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonStep1}
              onClick={() => navigateToStep(2)}
            >
              אשמח שיצרו איתי קשר
            </button>
            <button
              className={`${styles.buttonStep1} ${styles.fadeIn}`}
              onClick={() => navigateToStep(4)}
            >
              תודה, מעדיף להישאר אנונימי
            </button>
          </div>
          <div style={{ marginBottom: "70px" }} />
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ height: "50px" }} />
          <AnimatedIcon animation="password" state={animationState} />
          <div className={styles.headerStep2}>מלא את הפרטים, ואחבר אותך</div>
          <div className={styles.info}>מספר טלפון</div>
          <input
            type="number"
            className={styles.formInput}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className={styles.info}>יש משהו שתרצה לכתוב לנציג?</div>
          <textarea
            id="message"
            value={additionalInput}
            className={styles.formTextArea}
            onChange={(e) => setAdditionalInput(e.target.value)}
          />

          <div className={styles.formCheckboxContainer}>
            <input
              type="checkbox"
              id="agree"
              checked={isAgree}
              onChange={() => setIsAgree(!isAgree)}
              className={styles.formCheckBox}
            />
            <div className={styles.checkboxText}>
              אני מעוניין להעביר את פרטי הפנייה לקו הסיוע להמשך טיפול
            </div>
          </div>

          <button
            className={`${styles.buttonStep2} ${
              !isAgree ? styles.disabledButton : ""
            }`}
            onClick={() => handleSendForm()}
            disabled={!isAgree}
          >
            שלח
          </button>
          <div style={{ marginBottom: "70px" }} />
        </>
      )}

      {step === 3 && (
        <>
          <AnimatedIcon animation="finish" state={animationState} />
          <div className={styles.headerStep1}>
            העברתי את המספר שלך,
            <br />
            בקרוב יחזרו אליך
          </div>
          <p className={styles.paragraphStep3}>
            בינתיים, אני מקווה שהצלחתי לעזור לך להרגיש בטוח יותר ומוכן להתמודד
            עם המצב. שמחתי להעניק לך את הכלים והידע כדי לפעול בצורה הטובה
            והבטוחה ביותר מעכשיו והלאה.
          </p>
          <p className={styles.paragraphStep3}>
            תוכל גם לדווח על פעילות חשודה שזיהית וכך לעזור לאחרים לשמור על עצמם.
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.reportButton}
              onClick={() => router.push("/report")}
            >
              העבר אותי לדיווח
            </button>
            <button
              className={styles.buttonStep1}
              onClick={() => navigateToStep(4)}
            >
              תודה רבה, אפשר לסיים
            </button>
          </div>
          <div style={{ marginBottom: "70px" }} />
        </>
      )}

      {step === 4 && (
        <>
          <AnimatedIcon animation="finish" state={animationState} />
          <div className={styles.headerStep1}>צריך עזרה נוספת? </div>
        </>
      )}
    </div>
  );
}
