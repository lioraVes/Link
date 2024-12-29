"use client";

import styles from "./page.module.css"; // Import the CSS module
import { useRouter } from "next/navigation"; // Import from next/navigation

export default function HomePage() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    router.push("/wizard"); // Navigate to /wizard
  };
  return (
    <div className={styles.container}>
      {/* Image/Graphic Section */}
      <div className={styles.graphicArea}>
        <div className={styles.graphicPlaceholder}>גיף</div>
      </div>

      {/* Text Section */}
      <div className={styles.textArea}>
        <p>
          שלום גיבור/ה! אני הנסיך ואני כאן כדי לשמור עליך ולעזור לך לנצח את
          הרעים ברשת.
        </p>
        <p>
          תוכל להתעדכן בלשונית “חדשות” בכל מה שחשוב עכשיו כדי להיות צעד אחד לפני
          כולם.
        </p>
      </div>

      {/* Button Section */}
      <div className={styles.buttonArea}>
        <button className={styles.startButton} onClick={handleClick}>
          התחל שיחה
        </button>
      </div>
    </div>
  );
}
