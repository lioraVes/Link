"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
// import OpeningAnimation from "./Opening";
// import HandAnimation from "../lib/animatedIcons/Hand";
import dynamic from "next/dynamic";

const OpeningAnimation = dynamic(() => import("./Opening"), { ssr: false });
const HandAnimation = dynamic(() => import("../lib/animatedIcons/Hand"), { ssr: false });


export default function HomePage() {
  const [openingFinished, setOpeningFinished] = useState(false);
  const [page, setPage] = useState(false);
  const [handState, setHandState] = useState<
    "playing" | "stopped" | "continue"
  >("playing");
  const router = useRouter();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = "#F6FBFF";

      return () => {
        document.body.style.backgroundColor = "";
      };
    }
  }, []);

  const handleHelpClick = () => {
    setHandState("continue"); // Resume animation from frame 50

    // Delay navigation until animation completes
    setTimeout(() => {
      router.push("/wizard");
    }, 2000); // Adjust timing to match animation duration
  };

  return (
    <>
      {!openingFinished ? (
        <OpeningAnimation onComplete={() => setOpeningFinished(true)} />
      ) : (
        <div className={styles.container}>
          {/* Hand Animation */}
          <div className={styles.graphicArea}>
            <HandAnimation
              state={handState}
              onComplete={() => {
                if (handState === "playing") {
                  setHandState("stopped"); // Stop at frame 50 after playing
                }
              }}
            />
          </div>

          {!page ? (
            <>
              {/* Text Section for Page 1 */}
              <div className={styles.title}>היי, אני לינק</div>
              <div className={styles.textArea}>
                אני כאן לעזור לך בכל מה שקשור לפגיעות ברשת
              </div>
              <div style={{ height: "50px" }} />
              <div style={{ height: "40px" }} />
              <div className={`${styles.textArea} ${styles.starting}`}>
                איך תרצה שנתחיל?
              </div>

              <div style={{ height: "22px" }} />
              <div className={styles.buttonArea}>
                <button
                  className={`${styles.buttonStyle} ${styles.helpButton} ${styles.fadeIn}`}
                  onClick={() => setPage(true)}
                >
                  עזרה ראשונה
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.51604 17.4193C-1.48165 14.1935 -0.0517076 7.11826 2.23928 4.51611L5.80645 7.2473C4.68402 8.52328 3.8768 12.8315 5.53738 14.172L2.51604 17.4193Z"
                      fill="white"
                    />
                    <path
                      d="M13.0737 5.80645C12.5274 4.95653 11.2963 4.3923 9.78126 4.29945C8.35358 4.21374 7.2901 4.58514 6.6054 5.40649L3.22559 2.69246C4.81352 0.792635 7.23911 -0.157276 10.0581 0.0212785C13.0154 0.199833 15.4628 1.47828 16.774 3.52095L13.0737 5.80645Z"
                      fill="white"
                    />
                    <path
                      d="M16.755 17.4119L14.1934 13.9273C15.052 13.2653 15.6267 12.2177 15.7261 11.1265C15.8325 10.0353 15.4706 8.88584 14.7539 8.06378L17.9329 5.16113C19.4231 6.87799 20.1824 9.26413 19.9624 11.5557C19.7424 13.84 18.5432 16.0297 16.755 17.4192V17.4119Z"
                      fill="white"
                    />
                    <path
                      d="M9.50343 20.0002C7.3913 20.0002 5.65012 19.4706 3.87109 18.2986L6.49043 14.8389C7.55785 15.5449 8.38302 15.792 9.64726 15.7638C10.8964 15.7426 12.1833 15.4178 13.0085 14.9165L15.484 18.468C13.9396 19.4 11.8427 19.9578 9.73054 20.0002C9.65483 20.0002 9.57913 20.0002 9.50343 20.0002Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  className={`${styles.buttonStyle} ${styles.newsButton} ${styles.fadeIn}`}
                  onClick={() => router.push("/newsDynamic")}
                >
                  עדכונים
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5 12.311H17.5067C17.6271 10.5142 17.5268 8.71749 17.1856 6.94972L13.2425 7.65489C13.5435 9.19083 13.6137 10.7461 13.4933 12.3013H5.64716C5.55686 11.1518 5.50669 10.0506 5.60702 8.97831C5.73746 7.58727 6.1087 6.43774 6.73077 5.56834C7.36288 4.66996 8.28595 4.06138 9.199 3.94547L8.66722 0.120117C6.60033 0.380936 4.68395 1.57877 3.39967 3.40451C2.39632 4.82452 1.79431 6.5923 1.60368 8.64021C1.48328 9.88635 1.53344 11.1132 1.61371 12.311H0.5V16.175H6.8913C6.97157 16.687 7.07191 17.2086 7.38294 17.6723C7.88461 18.3968 8.65719 18.8315 9.51003 18.8798C9.5602 18.8798 9.60033 18.8798 9.6505 18.8798C10.5936 18.8798 11.4866 18.3871 11.9983 17.5564C12.3294 17.0347 12.4298 16.5227 12.5 16.175H18.5V12.311Z"
                      fill="white"
                    />
                    <path
                      d="M13.8044 5.1431C15.2118 5.1431 16.3528 4.04458 16.3528 2.68947C16.3528 1.33437 15.2118 0.23584 13.8044 0.23584C12.3969 0.23584 11.2559 1.33437 11.2559 2.68947C11.2559 4.04458 12.3969 5.1431 13.8044 5.1431Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  className={`${styles.buttonStyle} ${styles.reportButton} ${styles.fadeIn}`}
                  onClick={() => router.push("/report")}
                >
                  דיווח
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4843 11.3787V2.84924H15.4686L15.5 0.969593C14.1878 0.922207 13.2292 1.53823 12.5299 1.9726C12.3491 2.08317 12.1684 2.20163 11.9798 2.2964C11.4534 2.56492 10.8955 2.636 10.534 2.48595C10.2748 2.37538 9.96831 2.10686 9.64615 1.82254C9.38685 1.59351 9.13541 1.37237 8.8604 1.16703C6.99031 -0.215059 4.39733 -0.365115 2.34652 0.693174L0.5 0.708969L0.68858 19L3.83159 18.9684L3.67444 3.55213C4.67234 2.9756 6.07884 3.03089 7.01388 3.71009C7.21032 3.85225 7.39104 4.0181 7.57177 4.18395C8.04322 4.60253 8.58538 5.08429 9.32399 5.39229C9.84259 5.60553 10.4005 5.7161 10.9819 5.7161C11.4298 5.7161 11.8855 5.64502 12.3413 5.51866V9.73602C11.1862 9.83079 10.0312 9.87028 9.45757 9.58596C9.25327 9.48329 9.06469 9.35693 8.87611 9.23847C8.6561 9.09631 8.42823 8.95415 8.20037 8.82779C7.09246 8.21967 5.92954 8.1091 4.94735 8.14069V11.2998C5.55238 11.2998 6.21241 11.3314 6.69172 11.5999C6.85673 11.6946 7.02174 11.7973 7.18675 11.9C7.44605 12.0658 7.72892 12.2475 8.05893 12.4133C8.90754 12.8398 9.90545 12.9662 10.9505 12.9662C11.7362 12.9662 12.5534 12.8951 13.3549 12.824C14.0778 12.7608 14.8243 12.6976 15.4921 12.6898L15.4764 11.3787H15.4843Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Text Section for Page 2 */}
              <div className={styles.title}>שלום לך!</div>
              <div className={styles.textArea}>
                לפני שנתחיל - חשוב לי להגיד שאני לא אדם אמיתי, אז אין מה לחשוש
                מביקורת.
                <br />
                <br />
                יש לי כמה שאלות עבורך, ואחרי זה אדאג לחבר אותך למידע הנכון
                ולאנשים הנכונים שיעזרו לך
              </div>
              <div style={{ height: "70px" }} />

              <div className={styles.buttonArea}>
                <button
                  className={`${styles.multipleChoiceButton} ${styles.fadeIn}`}
                  onClick={handleHelpClick}
                >
                  עבור לשאלות
                </button>
              </div>
              <div style={{ height: "70px" }} />
            </>
          )}
        </div>
      )}
    </>
  );
}
