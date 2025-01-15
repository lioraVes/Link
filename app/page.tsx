"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter(); // Initialize the router
  const [content, setContent] = useState<number>(0); // Manage which content to display

  const renderContent = (): JSX.Element => {
    if (content === 0) return <Intro setContent={setContent} />;
    return <WizardStart router={router} />;
  };

  return <div>{renderContent()}</div>;
}

interface IntroProps {
  setContent: React.Dispatch<React.SetStateAction<number>>;
}

const Intro: React.FC<IntroProps> = ({ setContent }) => {
  const handleStartClick = (): void => {
    setContent(1); // Switch to WizardStart component
  };

  return (
    <div className={styles.container}>
      {/* Image/Graphic Section */}
      <div className={styles.graphicArea}>
        <svg
          width="108"
          height="115"
          viewBox="0 0 108 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1070_3044)">
            <path
              d="M62.3704 115C59.2019 115 56.0672 114.525 53.0851 113.541C43.5796 110.437 36.6666 103.11 29.9737 96.0199C24.6195 90.3377 19.5533 84.9779 13.5721 82.0774C12.996 81.7891 12.403 81.5346 11.793 81.2633C8.70923 79.8724 4.86298 78.1593 2.32141 74.2751C-1.11819 69.0509 -0.677651 61.2146 3.33804 56.0583C6.99791 51.3599 13.013 49.1209 19.028 50.2065C23.8062 51.0715 28.4488 54.0398 32.1256 58.5346L24.2467 64.9631C22.1118 62.3341 19.6041 60.6549 17.215 60.2139C14.9615 59.8068 12.6571 60.6209 11.3525 62.3001C10.0139 64.0302 9.75975 67.0664 10.8103 68.6777C11.7252 70.0855 13.6907 70.9506 15.9442 71.9683C16.6389 72.2736 17.3336 72.5959 18.0114 72.9181C25.67 76.6497 31.6173 82.9425 37.3613 89.0317C43.4441 95.4771 49.1881 101.566 56.2367 103.873C62.9973 106.078 71.0117 104.416 77.6706 99.4292C83.9737 94.7139 89.0908 87.2677 92.4796 77.8879C95.3261 70.0516 97.0036 60.7057 97.6474 49.3584C98.0202 42.5229 98.088 34.6018 95.5803 27.7493L105.12 24.2552C108.254 32.8378 108.237 42.0649 107.797 49.9351C107.102 62.3001 105.221 72.5789 102.036 81.365C97.9694 92.6106 91.6493 101.668 83.7535 107.588C77.264 112.456 69.707 115 62.3704 115Z"
              fill="#FE5068"
            />
            <path
              d="M44.8333 64.132C42.529 46.3732 32.1255 30.056 16.9946 20.4897L22.4167 11.8901C40.0721 23.0509 52.2209 42.0988 54.9149 62.826L44.8333 64.132Z"
              fill="#FE5068"
            />
            <path
              d="M60.2523 57.5339C56.5246 38.6047 47.6461 21.0833 34.5654 6.90339L42.0377 0C56.3891 15.5708 66.1318 34.7883 70.2153 55.5664L60.2353 57.5339H60.2523Z"
              fill="#FE5068"
            />
            <path
              d="M76.0438 53.1069C75.0611 38.2485 70.9098 23.424 64.0137 10.2448L73.0278 5.5295C80.5678 19.9639 85.1257 36.1792 86.1932 52.4285L76.0438 53.1069Z"
              fill="#FE5068"
            />
          </g>
          <defs>
            <clipPath id="clip0_1070_3044">
              <rect width="108" height="115" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Text Section */}
      <div style={{ height: "70px" }} />

      <div className={styles.title}>
        <div style={{ fontSize: "25px" }}>היי, אני לינק</div>
        אני כאן לעזור לך בכל מה שקשור לפגיעות ברשת.
      </div>
      <div className={styles.textArea}>
        תחשוב לי להגיד שאני לא אדם אמיתי, אז אין מה לחשוש מביקורת. יש לי כמה
        שאלות קצרות, ואחרי זה אדאג לחבר אותך למידע הנכון ולאנשים הנכונים שיעזרו
        לך.
      </div>

      <div style={{ height: "100px" }} />
      <div className={styles.buttonArea}>
        <button className={styles.startButton} onClick={handleStartClick}>
          אפשר להתחיל
        </button>
      </div>
    </div>
  );
};

interface WizardStartProps {
  router: ReturnType<typeof useRouter>;
}

const WizardStart: React.FC<WizardStartProps> = ({ router }) => {
  const handleWizardStartClick = (): void => {
    router.push("/wizard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <div className={styles.graphicArea}>
          <svg
            width="115"
            height="117"
            viewBox="0 0 115 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1125_96)">
              <path
                d="M9.73001 23.61L0.960007 23.1L2.22001 1.55L7.14001 2.49C13.53 3.71 20.04 3.9 26.48 3.07L27.62 11.78C21.9 12.53 16.14 12.56 10.42 11.88L9.73001 23.6V23.61Z"
                fill="#FE5068"
              />
              <path
                d="M112.57 21.15L103.78 20.87L104.16 9.06L92.68 9.41V9.49L90.72 9.46L90.65 0.67L113.25 0L112.57 21.15Z"
                fill="#FE5068"
              />
              <path
                d="M1.13 116.09L1.93 91.88L10.71 92.16L10.22 107.27L23.31 107.22L23.41 116.01L1.13 116.09Z"
                fill="#FE5068"
              />
              <path
                d="M115 113.68L89.28 110.49L90.36 101.77L105.5 103.64L104.73 92.35L113.5 91.75L115 113.68Z"
                fill="#FE5068"
              />
              <path
                d="M33.54 63.83C22.34 63.83 11.15 63.61 0 63.18L0.34 54.4C36.32 55.81 72.73 54.91 108.58 51.76L109.35 60.51C84.24 62.72 58.86 63.83 33.54 63.83Z"
                fill="#FE5068"
              />
              <path
                d="M26.78 51.14L19.63 46.03C26.98 35.75 38.32 28.55 50.75 26.27C63.17 23.99 76.34 26.69 86.86 33.68C91.63 36.85 94.93 40.31 96.97 44.27L89.15 48.29C87.82 45.7 85.47 43.31 81.99 41C73.35 35.26 62.54 33.04 52.33 34.91C42.12 36.79 32.81 42.7 26.78 51.14Z"
                fill="#FE5068"
              />
              <path
                d="M52.06 49.61L43.73 46.8C45.95 40.21 52.35 35.3 59.29 34.86C66.23 34.43 73.2 38.49 76.23 44.76L68.32 48.59C66.83 45.5 63.27 43.43 59.84 43.64C56.42 43.85 53.15 46.37 52.05 49.62L52.06 49.61Z"
                fill="#FE5068"
              />
              <path
                d="M55.7 84.56C53.37 84.56 51.04 84.33 48.75 83.86C36.89 81.4 26.56 72.45 22.44 61.06L30.7 58.07C33.81 66.65 41.6 73.4 50.53 75.26C59.48 77.12 69.29 74.02 75.56 67.38L81.95 73.41C75.24 80.52 65.45 84.57 55.69 84.57L55.7 84.56Z"
                fill="#FE5068"
              />
            </g>
            <defs>
              <clipPath id="clip0_1125_96">
                <rect width="115" height="116.09" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div style={{ height: "50px" }} />

        <div className={styles.title}>תספר לי מה קרה </div>

        <div style={{ height: "25px" }} />
        <div className={styles.buttonArea}>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            שלחו לי הודעה מטרידה{" "}
          </button>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            אני חושב שסוחטים אותי{" "}
          </button>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            גנבו לי כסף באשראי{" "}
          </button>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            מאיימים עליי{" "}
          </button>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            פרצו לי לחשבון{" "}
          </button>
          <button
            className={styles.multipleChoiseButton}
            onClick={handleWizardStartClick}
          >
            ראיתי חשבון שתומך בטרור{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
