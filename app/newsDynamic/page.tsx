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
    document.body.style.backgroundColor = "#7b61ff";

    // Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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
      <div className={styles.svgStyle}>
        <svg
          width="33"
          height="36"
          viewBox="0 0 33 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1438_244)">
            <path
              d="M19.0576 35.9999C18.0894 35.9999 17.1316 35.8512 16.2204 35.5432C13.316 34.5715 11.2036 32.2777 9.1586 30.0583C7.52258 28.2795 5.97457 26.6016 4.14699 25.6937C3.97097 25.6034 3.78976 25.5237 3.60338 25.4388C2.66111 25.0034 1.48587 24.4671 0.709278 23.2512C-0.34171 21.6158 -0.207101 19.1627 1.01992 17.5485C2.13821 16.0777 3.97614 15.3768 5.81408 15.7167C7.27407 15.9875 8.69265 16.9167 9.81612 18.3237L7.40868 20.3361C6.75634 19.5131 5.99011 18.9875 5.26011 18.8494C4.57153 18.722 3.86742 18.9768 3.46877 19.5025C3.05976 20.0441 2.98211 20.9945 3.3031 21.499C3.58267 21.9397 4.18323 22.2105 4.87181 22.5291C5.08408 22.6246 5.29635 22.7255 5.50344 22.8264C7.84357 23.9945 9.6608 25.9645 11.4159 27.8706C13.2745 29.8883 15.0296 31.7945 17.1834 32.5167C19.2491 33.2069 21.698 32.6866 23.7327 31.1255C25.6586 29.6494 27.2221 27.3184 28.2576 24.3822C29.1274 21.9291 29.6399 19.0034 29.8367 15.4512C29.9506 13.3114 29.9713 10.8317 29.205 8.68658L32.1199 7.59277C33.0777 10.2795 33.0725 13.168 32.9379 15.6317C32.7256 19.5025 32.1509 22.7202 31.1776 25.4706C29.935 28.991 28.0039 31.8264 25.5913 33.6795C23.6084 35.2034 21.2993 35.9999 19.0576 35.9999Z"
              fill="#F38A56"
            />
            <path
              d="M13.6991 20.0762C12.995 14.5169 9.81612 9.40889 5.19281 6.4142L6.84954 3.72217C12.2443 7.21597 15.9564 13.1788 16.7796 19.6673L13.6991 20.0762Z"
              fill="#F38A56"
            />
            <path
              d="M18.4104 18.0106C17.2714 12.085 14.5585 6.6 10.5616 2.16106L12.8448 0C17.23 4.87434 20.2069 10.8903 21.4546 17.3947L18.4052 18.0106H18.4104Z"
              fill="#F38A56"
            />
            <path
              d="M23.2356 16.6248C22.9353 11.9734 21.6669 7.33273 19.5598 3.20706L22.3141 1.73096C24.618 6.24954 26.0106 11.3256 26.3368 16.4124L23.2356 16.6248Z"
              fill="#F38A56"
            />
          </g>
          <defs>
            <clipPath id="clip0_1438_244">
              <rect width="33" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
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
