"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface NewsItem {
  id: string; //maybe delete- not used
  title: string;
  date: string;
  content: string;
  image: string; 
}

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
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
        console.log(data);

        if (data.values) {
          const formattedData = data.values.slice(1).map((row: string[]) => ({
            title: row[0] || "",
            date: row[1] || "",
            content: row[2] || "",
            image: row[3] || "", 
          }));
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

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <main>
      <div className={styles.mainContainer}>
        <div className={styles.aboutUs}>
          מי אנחנו?
        </div>
        <div  className={styles.newsPageTitle}>
        דף חדשות
        </div> 
 
        {error && <p className="error">{error}</p>}

        <div className={styles.scrollableContainer}>
          {newsData.map(({ title, date, content, image }: NewsItem, i: number) => (
            <div key={i} className={styles.newsItem}>
              <div className={styles.newsTitle}>{title}</div>
              <p className={styles.newsDate}>{date}</p>
              {image && <img src={image} alt={title} className={styles.newsImage} loading="lazy" />} 
              <p className={styles.newsContent}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
