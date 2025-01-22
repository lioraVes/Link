"use client";

import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import styles from "./page.module.css";
import { postFormData } from "./utils";
import { ContactFormResponse } from "./types";

const formHandlerUrl = "/report/api";

export default function ContactForm() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ffa54f";

    // Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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

  const [submissionResponse, setSubmissionResponse] = useState<
    ContactFormResponse | undefined
  >(undefined);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
              fill="#4E538A"
            />
            <path
              d="M13.6991 20.0762C12.995 14.5169 9.81612 9.40889 5.19281 6.4142L6.84954 3.72217C12.2443 7.21597 15.9564 13.1788 16.7796 19.6673L13.6991 20.0762Z"
              fill="#4E538A"
            />
            <path
              d="M18.4104 18.0106C17.2714 12.085 14.5585 6.6 10.5616 2.16106L12.8448 0C17.23 4.87434 20.2069 10.8903 21.4546 17.3947L18.4052 18.0106H18.4104Z"
              fill="#4E538A"
            />
            <path
              d="M23.2356 16.6248C22.9353 11.9734 21.6669 7.33273 19.5598 3.20706L22.3141 1.73096C24.618 6.24954 26.0106 11.3256 26.3368 16.4124L23.2356 16.6248Z"
              fill="#4E538A"
            />
          </g>
          <defs>
            <clipPath id="clip0_1438_244">
              <rect width="33" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.reportHeader}>
          <h1 className={styles.reportPageTitle}>דיווח</h1>
          <p className={styles.reportPageSubtitle}>דווחו והצטרפו לרשת!</p>
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
              <a
                className={styles.newsLink}
                onClick={() => setShowAdditionalDetails(true)}
              >
                הוספת פרטים אישיים (אופציונלי)
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="13.5" cy="13.5" r="13.5" fill="#F38F56" />
                  <path
                    d="M13.1232 19.424C13.0272 19.424 12.9552 19.376 12.8592 19.376C12.6912 19.328 12.5712 19.232 12.5712 18.968V14.36C12.5712 14.264 12.5232 14.192 12.4512 14.144C12.4032 14.12 12.3552 14.072 12.2832 14.072H7.72319C7.43519 14.072 7.31519 13.952 7.26719 13.784C7.26719 13.688 7.21919 13.616 7.21919 13.52V12.824C7.31519 12.464 7.48319 12.344 7.79519 12.344H12.1632C12.4032 12.296 12.4752 12.224 12.5472 12.056C12.5712 12.008 12.5712 11.96 12.5712 11.912V7.496C12.5712 7.208 12.6912 7.088 12.8592 7.04C12.9552 7.04 13.0272 6.992 13.1232 6.992H13.8192C14.1792 7.088 14.2992 7.256 14.2992 7.568V12.056C14.2992 12.128 14.3472 12.2 14.3952 12.248C14.4432 12.32 14.4912 12.344 14.5872 12.344H19.1232C19.4352 12.344 19.5552 12.416 19.6512 12.776V13.52C19.6512 13.616 19.6032 13.688 19.6032 13.784C19.5552 13.952 19.4592 14.072 19.1952 14.072H14.7072C14.4672 14.12 14.3952 14.192 14.3232 14.36C14.2992 14.408 14.2992 14.456 14.2992 14.504V18.896C14.2992 19.208 14.2272 19.328 13.8672 19.424H13.1232Z"
                    fill="white"
                  />
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
