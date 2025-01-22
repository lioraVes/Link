"use client";

import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import styles from "./page.module.css";
import { postFormData } from "./utils";
import { ContactFormResponse } from "./types";

const formHandlerUrl = "/report/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    image: null as File | null,
    link: "",
    text: "",
    personalDetails: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  const [submissionResponse, setSubmissionResponse] = useState<ContactFormResponse | undefined>(undefined);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, files } = event.target as HTMLInputElement;

    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else if (name in formData.personalDetails) {
      setFormData({
        ...formData,
        personalDetails: { ...formData.personalDetails, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const response = await postFormData(formData, formHandlerUrl);
    setSubmissionResponse(response);
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.reportHeader}>
          <h1 className={styles.reportPageTitle}>דיווח</h1>
          <p className={styles.reportPageSubtitle}>
            דווחו והצטרפו לרשת!
          </p>
        </div>

        {submissionResponse ? (
          <div className="center">{submissionResponse.message}</div>
        ) : showAdditionalDetails ? (
          <div className={styles.contactForm}>
            <h2>הוספת פרטים אישיים</h2>
            <label htmlFor="firstName" className={styles.label}>
              שם פרטי
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.personalDetails.firstName}
              onChange={handleChange}
              className={styles.input}
            />
            <label htmlFor="lastName" className={styles.label}>
              שם משפחה
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.personalDetails.lastName}
              onChange={handleChange}
              className={styles.input}
            />
            <label htmlFor="phone" className={styles.label}>
              טלפון
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.personalDetails.phone}
              onChange={handleChange}
              className={styles.input}
            />
            <label htmlFor="email" className={styles.label}>
              כתובת מייל
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.personalDetails.email}
              onChange={handleChange}
              className={styles.input}
            />
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowAdditionalDetails(false)}
              >
                ביטול
              </button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={() => setShowAdditionalDetails(false)}
              >
                שמור שינויים
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <p className={styles.reportPageDate}>היום: 2024-01-22</p>
            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                העלאת תמונה
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="link" className={styles.label}>
                הוספת קישור
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.textareaGroup}>
              <label htmlFor="text" className={styles.textareaLabel}>
                טקסט חופשי
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>
            </div>

            <div className={styles.formGroup}>
            <a className={styles.newsLink} onClick={() => setShowAdditionalDetails(true)}>
            הוספת פרטים אישיים (אופציונלי)
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13.5" cy="13.5" r="13.5" fill="#F38F56"/>
<path d="M13.1232 19.424C13.0272 19.424 12.9552 19.376 12.8592 19.376C12.6912 19.328 12.5712 19.232 12.5712 18.968V14.36C12.5712 14.264 12.5232 14.192 12.4512 14.144C12.4032 14.12 12.3552 14.072 12.2832 14.072H7.72319C7.43519 14.072 7.31519 13.952 7.26719 13.784C7.26719 13.688 7.21919 13.616 7.21919 13.52V12.824C7.31519 12.464 7.48319 12.344 7.79519 12.344H12.1632C12.4032 12.296 12.4752 12.224 12.5472 12.056C12.5712 12.008 12.5712 11.96 12.5712 11.912V7.496C12.5712 7.208 12.6912 7.088 12.8592 7.04C12.9552 7.04 13.0272 6.992 13.1232 6.992H13.8192C14.1792 7.088 14.2992 7.256 14.2992 7.568V12.056C14.2992 12.128 14.3472 12.2 14.3952 12.248C14.4432 12.32 14.4912 12.344 14.5872 12.344H19.1232C19.4352 12.344 19.5552 12.416 19.6512 12.776V13.52C19.6512 13.616 19.6032 13.688 19.6032 13.784C19.5552 13.952 19.4592 14.072 19.1952 14.072H14.7072C14.4672 14.12 14.3952 14.192 14.3232 14.36C14.2992 14.408 14.2992 14.456 14.2992 14.504V18.896C14.2992 19.208 14.2272 19.328 13.8672 19.424H13.1232Z" fill="white"/>
</svg>

            </a>

            </div>

            <button type="submit" className={styles.submitButton}>
              שלח
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
