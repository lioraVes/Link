"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface NewsItem {
  title: string;
  date: string;
  content: string;
  image: string;
}

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Track expanded state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID}/values/Sheet1?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data.values) {
          const formattedData = data.values.slice(1).map((row: string[]) => ({
            title: row[0] || "",
            date: row[1] || "",
            content: row[2] || "",
            image: row[3] || "",
          }));
          formattedData.sort((a: NewsItem, b: NewsItem) => {
            const [dayA, monthA, yearA] = a.date.split("-").map(Number); // Split and parse the date
            const [dayB, monthB, yearB] = b.date.split("-").map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA).getTime(); // Create a Date object
            const dateB = new Date(yearB, monthB - 1, dayB).getTime();

            return dateB - dateA; // Sort in descending order (newest first)
          });
          setNewsData(formattedData);
        } else {
          throw new Error("No values found in the sheet");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    }

    fetchNewsData();
  }, []);

  return (
    <main className={styles.mainContainer}>
      {loading ? (
        <div>
          <div style={{ height: "250px" }} />
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      ) : (
        <div>
          {/* Header Section */}
          <div className={styles.newsHeader}>
            <div className={styles.newsPageTitle}>חם ברשת</div>
            <a href="../report" className={styles.newsLink}>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM24 7L1 7V9L24 9V7Z"
                  fill="#F38F56"
                />
              </svg>
              רוצה לעזור לנו להוסיף עדכון חם?
            </a>
          </div>

          {/* Error Handling */}
          {error && <p className={styles.error}>{error}</p>}

          {/* News List */}
          {newsData.map(
            ({ title, date, content, image }: NewsItem, i: number) => (
              <div className={styles.newsCard} key={i}>
                <p className={styles.newsDate}>{date}</p>
                <h2 className={styles.newsTitle}>{title}</h2>
                {image && (
                  <img className={styles.newsImage} src={image} alt={title} />
                )}
                <p className={styles.newsContent}>
                  {expandedIndex === i
                    ? content
                    : `${content.slice(0, 100)}...`}{" "}
                  <span
                    className={styles.readMore}
                    onClick={() =>
                      setExpandedIndex(expandedIndex === i ? null : i)
                    }
                  >
                    {expandedIndex === i ? "הצג פחות" : "קרא עוד"}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}
