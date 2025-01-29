"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ShareButton from "@/lib/components/ShareButton";

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
            const [dayA, monthA, yearA] = a.date.split("/").map(Number); // Split and parse the date
            const [dayB, monthB, yearB] = b.date.split("/").map(Number);

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

  // Function to convert text with URLs into JSX
  const convertUrlsToLinks = (text: string) => {
    const urlPattern = /https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?/g;
    const websitePattern =
      /(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?/g;

    // Replace URLs with anchor elements
    const parts = text.split(
      /\b(https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?|\b(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?)/g
    );

    return parts.map((part, index) => {
      if (urlPattern.test(part) || websitePattern.test(part)) {
        // If part is a URL, return a link
        return (
          <a
            key={index}
            href={part.startsWith("http") ? part : `https://${part}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#7b61ff", textDecoration: "none" }}
          >
            {part}
          </a>
        );
      }
      return part; // Otherwise, return the text as is
    });
  };

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
        <div className={styles.newsContainer}>
          <div className={styles.newsHeader}>
            <div className={styles.newsPageTitle}>עדכונים חמים</div>
            <a href="../report" className={styles.newsLink}>
              אם זיהית משהו מוזר ברשת שאתה חושב שחשוב לשתף כאן,{" "}
              <span style={{ fontWeight: 600 }}>שלח לנו דיווח!</span>
            </a>
          </div>
          {/* Error Handling */}
          {error && <p className={styles.error}>{error}</p>}

          {newsData.map(
            ({ title, date, content, image }: NewsItem, i: number) => (
              <div className={styles.newsCard} key={i}>
                <div className={styles.titleWithArrow}>
                  <h2 className={styles.newsTitle}>{title}</h2>
                  {expandedIndex === i ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setExpandedIndex(null)}
                    >
                      <path
                        d="M1.88924 15.2174L1.7136 14.9915L0.910667 14.1886C0.609568 13.8875 0.233193 13.5111 0.283376 13.21C0.33356 12.7584 0.684842 12.4573 1.1114 12.0307L4.82495 8.31718C5.07587 8.06626 5.07587 7.71498 4.82495 7.46407L0.459018 3.09814C0.183011 2.82213 0.0575527 2.5963 0.283377 2.21993C0.358652 2.14466 0.408835 2.04429 0.509202 1.94392L0.735025 1.76828L1.53796 0.965352C1.83905 0.664254 2.21543 0.287881 2.51653 0.338064C2.96817 0.388247 3.26927 0.739529 3.69583 1.16609L7.40938 4.87964C7.6603 5.13055 8.01158 5.13055 8.26249 4.87964L12.503 0.639163C12.8542 0.287881 13.2306 0.212606 13.6823 0.513704C13.7575 0.538795 13.8077 0.588979 13.9081 0.689345C13.9332 0.76462 13.9583 0.789711 14.0336 0.814803L15.1376 1.91883L15.3885 2.3203C15.539 2.52103 15.4638 2.79703 15.1627 3.14832L10.8469 7.46407C10.596 7.71498 10.596 8.06627 10.8469 8.31718L15.0874 12.5577C15.4387 12.9089 15.514 13.2853 15.2129 13.737C15.1878 13.8122 15.1376 13.8624 15.0372 13.9628C14.9619 13.9879 14.9368 14.013 14.9118 14.0882L13.8077 15.1923L13.4063 15.4432C13.2055 15.5937 12.9295 15.5185 12.5782 15.2174L8.26249 10.9016C8.01158 10.6507 7.6603 10.6507 7.40938 10.9016L3.04345 15.2675C2.76744 15.5436 2.54162 15.669 2.16524 15.4432C2.08997 15.3679 1.9896 15.3177 1.88924 15.2174Z"
                        fill="#4E538A"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="13"
                      viewBox="0 0 18 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setExpandedIndex(i)}
                    >
                      <path
                        d="M2 2L8.96053 10.9493C8.98055 10.975 9.01945 10.975 9.03947 10.9493L16 2"
                        stroke="#4E538A"
                        stroke-width="3.4"
                      />
                    </svg>
                  )}
                </div>

                <p className={styles.newsContent}>
                  {expandedIndex === i
                    ? convertUrlsToLinks(content)
                    : `${convertUrlsToLinks(content.slice(0, 100))}...`}{" "}
                  {expandedIndex === i ? (
                    <span
                      className={styles.readMore}
                      onClick={() => setExpandedIndex(null)} // Collapse content
                    ></span>
                  ) : (
                    <span
                      className={styles.readMore}
                      onClick={() => setExpandedIndex(i)} // Expand content
                    >
                      קרא.י עוד
                    </span>
                  )}
                </p>
                {image && (
                  <img className={styles.newsImage} src={image} alt={title} />
                )}
                {expandedIndex === i && (
                  <div className={styles.newsDateWrapper}>
                    <p className={styles.newsDate}>{date}</p>
                    <span className={styles.publishedBy}>
                      פורסם על ידי: מערכת האיגוד
                    </span>
                    <ShareButton
                      title={title}
                      content={content}
                      newsLink={
                        "https://product-jam-final-project.vercel.app/newsDynamic"
                      }
                    />
                  </div>
                )}
              </div>
            )
          )}

          <div style={{ marginBottom: "70px" }} />
        </div>
      )}
    </main>
  );
}
