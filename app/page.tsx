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
        <div className={styles.graphicPlaceholder}>אייקון</div>
      </div>

      {/* Text Section */}
      <div className={styles.textArea}>
        <p>היי, אני לינק אני כאן לעזור לך בכל מה שקשור לפגיעות ברשת.</p>
        <p>
          תחשוב לי להגיד שאני לא אדם אמיתי, אז אין מה לחשוש מביקורת. יש לי כמה
          שאלות קצרות, ואחרי זה אדאג לחבר אותך למידע הנכון ולאנשים הנכונים
          שיעזרו לך.
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
