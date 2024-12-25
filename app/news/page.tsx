"use client"; // Mark this file as a Client Component

import news from "../../lib/data/news.json";
import styles from "./page.module.css"; 

interface NewsItem {
  title: string;
  date: string;
  content: string;  
  image: string; 
}

export default function News() {
  const newsData: NewsItem[] = news;

  return (
    <main>
      <div>
        <h1>חדשות</h1>
        <div className={styles.scrollableContainer}>
          {
            newsData.map((item: NewsItem, i: number) => (
              <div key={i} className={styles.newsItem}>
                <h2 >{item.title}</h2>
                <p className={styles.newsDate}>{item.date}</p>
                <p className={styles.newsContent}>{item.content}</p>
                <img src={item.image} alt={item.title} className={styles.newsImage} />
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}