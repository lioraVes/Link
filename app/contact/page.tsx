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
      <div className={`${styles.step1Container} ${styles.step3_container}`}>
        <div className={styles.logoStep1}> 
        <svg width="89" height="115" viewBox="0 0 89 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1125_144)">
            <path d="M79.43 61.6C78.4 81.92 72.19 87.21 58.59 98.8C56.2 100.83 53.54 103.1 50.69 105.64C41.18 104.64 31.81 99.49 24.74 91.3C18.12 83.63 13.39 73.2 11.07 61.13C9 50.38 8.94 39.38 9.29 29.69C21.51 25.88 33.17 19.88 43.37 12.14C53.79 21.65 65.18 28.76 78.09 33.8L81.41 25.29C68.45 20.22 57.13 12.88 46.82 2.83999L43.9 -0.0100098L40.74 2.57999C29.94 11.44 17.11 18.1 3.65 21.84L0.460001 22.73L0.310001 26.04C-0.189999 37.01 -0.369999 49.97 2.11 62.87C4.73 76.51 10.17 88.41 17.83 97.28C26.98 107.87 39.45 114.29 52.07 114.91L53.96 115L55.36 113.73C58.66 110.74 61.77 108.09 64.52 105.75C78.74 93.63 87.33 86.31 88.56 62.06L79.44 61.6H79.43Z" fill="#F6FBFF"/>
            <path d="M40.16 69.79C38.34 67.28 36.51 64.75 35.7 63.45L27.94 68.26C28.96 69.91 30.94 72.63 33.04 75.52C34.95 78.15 36.93 80.88 37.78 82.24L42.56 89.96L45.9 81.52C47.29 78 48.73 73.04 50.26 67.8C52.95 58.53 56.3 47 59.93 42.13L52.61 36.67C47.99 42.86 44.54 54.76 41.49 65.25C41.04 66.8 40.6 68.32 40.16 69.78V69.79Z" fill="#F6FBFF"/>
          </g>
          <defs>
            <clipPath id="clip0_1125_144">
            <rect width="88.56" height="115" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        </div>

        <div className={`${styles.headerStep1} ${styles.step3_text_color}`}>
        העברתי את המספר שלך,<br /> בקרוב יחזרו אליך
        </div>
        <div className={`${styles.paragraphStep1} ${styles.step3_text_color}`}>
        בינתיים, אני  מקווה שהצלחתי לעזור לך להרגיש יותר בטוח ומוכן להתמודד עם המצב. שמחתי לתת לך את כל הכלים והידע כדי להתנהל בצורה הכי טובה והכי בטוחה מעכשיו והלאה.        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.buttonStep1} ${styles.button_step_3}`} onClick={handleAnonimusButton}>
          הבנתי, אפשר להמשיך
          </button>
        </div>
      </div>
    );
  }

  //step 4:
  return (
      <div className={styles.step1Container}>
        <div className={styles.logoStep1}> 
          <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1125_158)">
              <path d="M57.5 0C25.7888 0 0 25.7888 0 57.5C0 89.2112 25.7888 115 57.5 115C89.2112 115 115 89.2112 115 57.5C115 25.7888 89.2112 0 57.5 0ZM110.054 55.0594H76.8294C76.748 43.4748 75.4301 31.6787 72.957 22.0303C78.7493 20.7612 84.3464 18.6786 89.5204 15.7987C101.43 24.959 109.322 39.098 110.054 55.0594ZM57.6302 106.881C54.8642 106.881 51.5775 102.732 48.8604 95.15C54.6527 94.2225 60.5426 93.8483 66.4162 94.1412C66.5301 94.1412 66.644 94.1575 66.7579 94.1737C63.9757 102.374 60.5263 106.897 57.6464 106.897L57.6302 106.881ZM71.7204 94.6619C78.3425 95.573 83.6304 97.6068 87.5028 100.698C80.4089 105.644 72.0458 108.899 62.9994 109.826C66.5952 107.093 69.5076 101.658 71.7204 94.6619ZM52.2934 109.859C43.4423 108.98 35.2419 105.921 28.2293 101.203C33.3057 98.9898 38.5774 97.2651 43.9955 96.0774C46.1595 102.407 48.9417 107.32 52.3097 109.859H52.2934ZM66.644 89.2763C60.1846 88.9672 53.7252 89.4065 47.3635 90.4641C45.1832 82.6705 43.605 72.3387 43.3447 59.9406H71.9157C71.6553 71.7855 70.2073 81.7431 68.1897 89.3902C67.6691 89.3577 67.181 89.2926 66.6603 89.26L66.644 89.2763ZM43.3121 55.0594C43.3935 41.8152 44.9554 30.7675 47.2008 22.5021C51.0569 23.2018 54.9781 23.576 58.8993 23.576C62.0069 23.576 65.0983 23.3319 68.1735 22.9089C70.3537 31.1418 71.8669 42.0267 71.9482 55.0757H43.3121V55.0594ZM57.6302 5.45062C60.5263 5.45062 63.9757 9.97382 66.7579 18.2067C60.7378 18.9877 54.6038 18.8413 48.6326 17.8162C51.3986 9.84366 54.7828 5.45062 57.6302 5.45062ZM43.8165 16.7912C39.456 15.6685 35.2582 14.0252 31.3045 11.8937C36.7714 8.73727 42.8565 6.54075 49.3159 5.5157C47.1682 8.3305 45.3297 12.2029 43.8165 16.7912ZM65.9607 5.56452C72.8431 6.68718 79.3025 9.14403 85.0134 12.6747C80.7668 14.7899 76.2436 16.3356 71.6065 17.3444C70.0608 12.5446 68.1735 8.49321 65.9607 5.58079V5.56452ZM26.6674 14.9038C31.5811 17.8488 36.9015 20.029 42.4335 21.4608C39.8628 31.2068 38.496 43.247 38.4147 55.0432H4.94624C5.71095 38.5449 14.0903 24.0153 26.6674 14.8875V14.9038ZM4.94624 59.9406H38.4635C38.7238 71.0859 40.1068 82.28 42.5799 91.4078C36.2344 92.8396 30.0354 94.9059 24.1292 97.6719L24.4871 98.4366C13.1303 89.26 5.66214 75.4789 4.94624 59.9406ZM91.4728 97.6231C86.9496 93.6531 80.7831 91.0986 73.0546 89.9271C75.2837 81.0922 76.5365 70.4839 76.7806 59.9243H110.054C109.354 75.0071 102.293 88.4465 91.4728 97.6231Z" fill="#FE5068"/>
            </g>
            <defs>
              <clipPath id="clip0_1125_158">
                <rect width="115" height="115" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
  );
}
