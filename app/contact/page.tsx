// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1 is the initial screen
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Extract answers from query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    setAnswers(paramsObject); // Save the parameters to state
  }, []);

  useEffect(() => {
      document.body.style.backgroundColor = "#F6FBFF";
  
      // Reset the body background color when the component unmounts
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);
  
  //step1+3 functions
  const handleContactButton = () => {
    setStep(2); 
    console.log(step);
  };
  const handleAnonimusButton  = () => {
    setStep(4); 
    console.log(step);
  };

  //step2 functions
  const handlePhoneInputChange = (event) => {
    setPhoneNumber(event.target.value);
    console.log(phoneNumber);
  };

  const handleAdditionalInputChange  = (event) => {
    setAdditionalInput(event.target.value);
    console.log(additionalInput);
  };

  const handleAgreementToggle = () => {
    setIsAgree(!isAgree);
  };

  const handleReportButton =() =>{
    router.push("/report");
  }

  const handleSubmit = async () => {
    const userInfo = {
      subject: Object.keys(answers)[0] == "extortion" ? "סחיטה" : "",
      phoneNumber: phoneNumber,
      additionalInput: additionalInput,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        setStep(3);
      } else {
        const error = await response.json();
        alert("Failed to send email: " + error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  const handleSendForm =() => {
    if (!phoneNumber) {
      alert("אנא הכנס מספר טלפון לפני המשך.");
      return;
    }
    if (!isAgree) {
      alert("עליך לאשר את הסכמתך להמשיך.");
      return;
    }
    handleSubmit();
  }


  if (step === 1) {
    return (
        <div className={styles.step1Container}>
          <div className={styles.logoStep1}> 
            <svg width="108" height="115" viewBox="0 0 108 115" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1125_124)">
                <path d="M62.3702 115C59.2017 115 56.0671 114.525 53.085 113.541C43.5795 110.437 36.6664 103.11 29.9736 96.0199C24.6194 90.3377 19.5532 84.9778 13.572 82.0774C12.9959 81.789 12.4029 81.5346 11.7929 81.2632C8.70911 79.8724 4.86286 78.1593 2.32129 74.275C-1.11831 69.0508 -0.677773 61.2146 3.33792 56.0582C6.99778 51.3598 13.0128 49.1209 19.0279 50.2065C23.8061 51.0715 28.4487 54.0398 32.1255 58.5346L24.2466 64.9631C22.1117 62.334 19.604 60.6548 17.2149 60.2138C14.9614 59.8067 12.657 60.6209 11.3523 62.3001C10.0138 64.0302 9.75963 67.0663 10.8101 68.6777C11.7251 70.0855 13.6906 70.9506 15.9441 71.9683C16.6388 72.2736 17.3335 72.5958 18.0113 72.9181C25.6699 76.6497 31.6172 82.9424 37.3611 89.0317C43.444 95.4771 49.1879 101.566 56.2366 103.873C62.9972 106.078 71.0116 104.416 77.6705 99.4292C83.9736 94.7138 89.0907 87.2677 92.4794 77.8879C95.326 70.0516 97.0034 60.7057 97.6473 49.3584C98.0201 42.5228 98.0878 34.6017 95.5801 27.7492L105.12 24.2551C108.254 32.8377 108.237 42.0649 107.797 49.9351C107.102 62.3001 105.221 72.5789 102.036 81.365C97.9692 92.6106 91.6492 101.668 83.7534 107.588C77.2639 112.456 69.7069 115 62.3702 115Z" fill="#FE5068"/>
                <path d="M44.8334 64.132C42.529 46.3732 32.1255 30.0561 16.9947 20.4897L22.4167 11.8901C40.0722 23.0509 52.2209 42.0988 54.915 62.826L44.8334 64.132Z" fill="#FE5068"/>
                <path d="M60.2523 57.5339C56.5246 38.6047 47.6461 21.0833 34.5654 6.90339L42.0377 0C56.3891 15.5708 66.1318 34.7883 70.2153 55.5664L60.2353 57.5339H60.2523Z" fill="#FE5068"/>
                <path d="M76.0439 53.107C75.0612 38.2486 70.9099 23.4241 64.0138 10.2449L73.0279 5.52954C80.5679 19.9639 85.1258 36.1792 86.1933 52.4285L76.0439 53.107Z" fill="#FE5068"/>
              </g>
              <defs>
                <clipPath id="clip0_1125_124">
                  <rect width="108" height="115" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className={styles.headerStep1}>
          שמחתי לעזור לך
          </div>

          <div className={styles.paragraphStep1}>
          לפני שנסיים, חשוב לי לספר לך שאיגוד האינטרנט הישראלי מפעיל גם <strong>קו סיוע</strong>, ואם תרצה, אני יכול להעביר את הפרטים שלך לנציג אנושי. הנציג ייצור איתך קשר בוואטסאפ בזמן הקרוב וימשיך לטפל בך.
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonStep1} onClick={handleContactButton}>
            אשמח שיצרו איתי קשר
            </button>
            <button className={styles.buttonStep1} onClick={handleAnonimusButton}>
            תודה, מעדיף להישאר אנונימי
            </button>
          </div>
        </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.step2Container}>
        <div className={styles.logoStep2}> 
          <svg width="163" height="66" viewBox="0 0 163 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1125_182)">
              <path d="M30.0122 41.966L36.1018 48.5673C38.4804 46.3585 40.971 44.2621 43.499 42.2156L51.768 48.3551L57.0979 41.1299L50.9461 36.5752C53.8227 34.5287 56.7493 32.5571 59.7629 30.7227L55.1179 23.0358C52.8763 24.396 50.6721 25.8185 48.4928 27.291L48.2313 22.1997L39.2774 22.6489L39.5514 28.1271L34.3459 24.2587L29.016 31.4839L36.0271 36.675C33.9723 38.3846 31.9674 40.1441 30.0122 41.966Z" fill="#FE5068"/>
              <path d="M66.5997 31.4839L73.6109 36.6875C71.5561 38.3971 69.5511 40.1566 67.596 41.9785L73.6856 48.5797C76.0642 46.371 78.5548 44.2746 81.0828 42.228L89.3517 48.3676L94.6817 41.1424L88.5298 36.5877C91.4065 34.5411 94.333 32.5695 97.3467 30.7351L92.7017 23.0482C90.4601 24.4084 88.2559 25.831 86.0765 27.3035L85.815 22.2122L76.8612 22.6614L77.1351 28.1396L71.9173 24.2712L66.5873 31.4963L66.5997 31.4839Z" fill="#FE5068"/>
              <path d="M105.578 30.9473L112.589 36.1384C110.535 37.848 108.53 39.6075 106.575 41.4294L112.664 48.0307C115.043 45.8219 117.533 43.7255 120.061 41.679L128.33 47.8061L133.66 40.5809L127.508 36.0261C130.385 33.9796 133.312 32.008 136.325 30.1736L131.68 22.4867C129.439 23.8469 127.234 25.2695 125.055 26.742L124.794 21.6506L115.84 22.0999L116.114 27.5905L110.908 23.7221L105.578 30.9473Z" fill="#FE5068"/>
              <path d="M161.792 21.5383C161.667 17.2456 161.493 11.3806 158.392 6.78842C153.51 -0.399332 144.656 -0.099842 140.397 0.0499028L39.4764 3.53147L39.7878 12.5162L140.709 9.03459C145.752 8.85989 149.214 9.27168 150.958 11.8423C152.589 14.2507 152.726 18.6183 152.813 21.8003L153.76 53.7084L18.5301 56.9903C15.0557 57.0777 13.3745 56.6409 12.7394 55.5179C12.2039 54.5695 12.042 52.7601 11.905 51.3L8.91627 18.7805L-0.0126801 19.6041L2.97609 52.1236C3.18779 54.4322 3.44931 57.3023 4.91879 59.9228C8.03209 65.4634 14.184 66 17.5339 66C17.9947 66 18.4056 66 18.7418 65.975L162.987 62.481L161.779 21.5383H161.792Z" fill="#FE5068"/>
            </g>
            <defs>
              <clipPath id="clip0_1125_182">
                <rect width="163" height="66" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className={styles.headerStep2}>
        מלא את הפרטים, ואחבר אותך
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formText}>
            מספר טלפון
          </div>
          <div>
            <input className={styles.formInput}  type="number" value={phoneNumber} onChange={handlePhoneInputChange}/>
          </div>
          <div className={styles.formText}>
            יש משהו שתרצה לכתוב לנציג?
          </div>
          <textarea id="message" value={additionalInput} className={styles.formTextArea}  onChange={handleAdditionalInputChange}/>

          <div className={styles.formCheckboxContainer}>
            <input type="checkbox" id="agree" checked={isAgree} onChange={handleAgreementToggle} className={styles.formCheckBox}/>
            <div className={styles.checkboxText}>
            אני מעוניין להעביר את פרטי הפנייה לקו הסיוע להמשך טיפול
            </div>
          </div>
          <div>
            <button className={styles.buttonStep2} onClick={handleSendForm} >
              שלח   
            </button>
          </div>
        </div>
      </div>
    )
  }

  if(step === 3){
    return (
      <div className={`${styles.step1Container} `}>
        <div className={styles.logoStep1}> 
        <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1794_1125)">
            <path d="M53.2615 77.0474L48.2438 68.9515C47.4768 67.7059 44.904 64.7678 42.8266 62.4204C40.1739 59.3864 37.665 56.5281 36.4665 54.6119L44.6163 49.5659C45.3834 50.8114 47.9562 53.7496 50.0336 56.0969C50.3851 56.4962 50.7207 56.8794 51.0563 57.2626C54.7637 49.3743 59.27 41.8691 64.4955 34.875L72.1819 40.6076C65.8538 49.0868 60.6763 58.3645 56.7772 68.185L53.2615 77.0474Z" fill="#FE5068"/>
            <path d="M55.451 109C41.3566 109 27.1983 103.667 16.971 93.8621C2.62092 80.1293 -3.41955 57.9812 1.91779 38.7553L11.1543 41.3262C6.72779 57.2467 11.7296 75.5943 23.6027 86.9478C35.5718 98.4131 54.0767 102.485 69.6413 97.0877C85.3337 91.6425 97.1909 76.9676 99.1405 60.584C101.282 42.4919 90.735 23.1862 74.0518 14.691C57.5604 6.27568 36.227 8.35156 21.014 19.8328L15.2292 12.184C33.3186 -1.46898 58.7109 -3.89617 78.4144 6.14793C98.5492 16.3996 111.269 39.7773 108.665 61.7018C106.3 81.6463 91.8855 99.4989 72.7894 106.126C67.2283 108.058 61.3476 108.984 55.467 108.984L55.451 109Z" fill="#FE5068"/>
          </g>
          <defs>
            <clipPath id="clip0_1794_1125">
              <rect width="109" height="109" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        </div>

        <div className={`${styles.headerStep1} `}>
        העברתי את המספר שלך,<br /> בקרוב יחזרו אליך
        </div>
        <div className={`${styles.paragraphStep3}`}>
        בינתיים, אני  מקווה שהצלחתי לעזור לך להרגיש יותר בטוח ומוכן להתמודד עם המצב. שמחתי לתת לך את כל הכלים והידע כדי להתנהל בצורה הכי טובה והכי בטוחה מעכשיו והלאה.        </div>
        <div className={`${styles.paragraphStep3}`}>
        תוכל גם לדווח על פעילות חשודה שזיהית וכך לעזור לאחרים לשמור על עצמם.
        </div>
        <div className={styles.buttonContainer}>
        <button className={`${styles.reportButton}`} onClick={handleReportButton}>
העבר אותי לדיווח
          </button>
          <button className={`${styles.buttonStep1} `} onClick={handleAnonimusButton}>
תודה רבה, אפשר לסיים
          </button>
        </div>
      </div>
    );
  }

  //step 4:
  return (
      <div className={styles.step1Container}>
        <div className={styles.logoStep1}> 
        <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1794_1125)">
            <path d="M53.2615 77.0474L48.2438 68.9515C47.4768 67.7059 44.904 64.7678 42.8266 62.4204C40.1739 59.3864 37.665 56.5281 36.4665 54.6119L44.6163 49.5659C45.3834 50.8114 47.9562 53.7496 50.0336 56.0969C50.3851 56.4962 50.7207 56.8794 51.0563 57.2626C54.7637 49.3743 59.27 41.8691 64.4955 34.875L72.1819 40.6076C65.8538 49.0868 60.6763 58.3645 56.7772 68.185L53.2615 77.0474Z" fill="#FE5068"/>
            <path d="M55.451 109C41.3566 109 27.1983 103.667 16.971 93.8621C2.62092 80.1293 -3.41955 57.9812 1.91779 38.7553L11.1543 41.3262C6.72779 57.2467 11.7296 75.5943 23.6027 86.9478C35.5718 98.4131 54.0767 102.485 69.6413 97.0877C85.3337 91.6425 97.1909 76.9676 99.1405 60.584C101.282 42.4919 90.735 23.1862 74.0518 14.691C57.5604 6.27568 36.227 8.35156 21.014 19.8328L15.2292 12.184C33.3186 -1.46898 58.7109 -3.89617 78.4144 6.14793C98.5492 16.3996 111.269 39.7773 108.665 61.7018C106.3 81.6463 91.8855 99.4989 72.7894 106.126C67.2283 108.058 61.3476 108.984 55.467 108.984L55.451 109Z" fill="#FE5068"/>
          </g>
          <defs>
            <clipPath id="clip0_1794_1125">
              <rect width="109" height="109" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        </div>
      </div>
  );
}
