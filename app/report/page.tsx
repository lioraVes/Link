"use client";

import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import styles from "./page.module.css";
import { postFormData } from "./utils";
import { ContactFormResponse } from "./types";

const formHandlerUrl = "/report/api";

export default function ContactForm() {
  const initialFormState = {
    image: null as File | null,
    link: "",
    text: "",
    platform: "",
    personalDetails: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  };
  const [formData, setFormData] = useState(initialFormState);

  const [submissionResponse, setSubmissionResponse] = useState<
    ContactFormResponse | undefined
  >(undefined);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      <div className={styles.container}>
        <div className={styles.reportHeader}>
          <h1 className={styles.reportPageTitle}>דיווח</h1>
          <p className={styles.reportPageSubtitle}>
            נתקלת בבעיה במשהו מוזר? דווח לנו, ונוכל לטפל
            <br /> בבעיה, ולעדכן אחרים שיזהרו
          </p>
        </div>

        {submissionResponse ? (
          <div className={styles.contactForm}>
            <div className={styles.finishIcon}>
              <svg
                width="109"
                height="109"
                viewBox="0 0 109 109"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1817_22)">
                  <path
                    d="M53.2618 77.0474L48.2441 68.9515C47.4771 67.7059 44.9043 64.7678 42.8269 62.4204C40.1742 59.3864 37.6653 56.5281 36.4668 54.6119L44.6166 49.5659C45.3837 50.8114 47.9565 53.7496 50.0339 56.0969C50.3854 56.4962 50.721 56.8794 51.0566 57.2626C54.764 49.3743 59.2703 41.8691 64.4958 34.875L72.1822 40.6076C65.8541 49.0868 60.6766 58.3645 56.7775 68.185L53.2618 77.0474Z"
                    fill="#F38F56"
                  />
                  <path
                    d="M55.4507 109C41.3563 109 27.1979 103.667 16.9707 93.8624C2.62058 80.1296 -3.41988 57.9815 1.91746 38.7556L11.1539 41.3265C6.72746 57.2469 11.7292 75.5946 23.6024 86.9481C35.5715 98.4133 54.0764 102.485 69.641 97.088C85.3334 91.6427 97.1906 76.9678 99.1402 60.5843C101.281 42.4921 90.7346 23.1864 74.0515 14.6912C57.56 6.27592 36.2267 8.35181 21.0136 19.8331L15.2288 12.1842C33.3183 -1.46873 58.7106 -3.89592 78.414 6.14817C98.5489 16.3999 111.269 39.7775 108.664 61.7021C106.299 81.6466 91.8852 99.4992 72.789 106.126C67.228 108.058 61.3473 108.984 55.4666 108.984L55.4507 109Z"
                    fill="#F38F56"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1817_22">
                    <rect width="109" height="109" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.finishText}>
              <h1>הדיווח שלך נשלח!</h1>
              <p>
                תודה רבה שדיווחת, הדיווח שלך
                <br />
                עוזר לנו להפוך את האינטרנט למקום <br />
                טוב יותר. נעדכן אותך בהקדם
                <br /> בטיפולנו במקרה.
              </p>
            </div>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => {
                  setFormData(initialFormState); // Reset form fields
                  setSubmissionResponse(undefined); // Hide success message
                  setShowAdditionalDetails(false); // Hide additional details
                }}
              >
                שלח דיווח נוסף
              </button>
            </div>
          </div>
        ) : showAdditionalDetails ? (
          <div className={styles.contactForm}>
            <div className={styles.additionalFormGroup}>
              <a
                className={styles.addInfoLink}
                onClick={() => setShowAdditionalDetails(false)}
              >
                הוספת פרטים אישיים
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11.5" cy="11.5" r="11.5" fill="#F38F56" />
                  <path
                    d="M8.15727 16.484L8.04709 16.3423L7.5434 15.8386C7.35452 15.6498 7.11841 15.4136 7.14989 15.2248C7.18138 14.9414 7.40174 14.7526 7.66932 14.485L9.99887 12.1554C10.1563 11.998 10.1563 11.7777 9.99887 11.6203L7.26008 8.88147C7.08693 8.70832 7.00823 8.56666 7.1499 8.33056C7.19712 8.28334 7.2286 8.22038 7.29156 8.15742L7.43322 8.04724L7.93691 7.54355C8.12579 7.35467 8.36189 7.11856 8.55077 7.15004C8.8341 7.18153 9.02298 7.40189 9.29056 7.66947L11.6201 9.99902C11.7775 10.1564 11.9979 10.1564 12.1553 9.99902L14.8154 7.33893C15.0357 7.11856 15.2718 7.07134 15.5552 7.26023C15.6024 7.27597 15.6339 7.30745 15.6968 7.37041C15.7126 7.41763 15.7283 7.43337 15.7755 7.44911L16.4681 8.14168L16.6255 8.39352C16.7199 8.51944 16.6727 8.69258 16.4838 8.91295L13.7765 11.6203C13.6191 11.7777 13.6191 11.998 13.7765 12.1554L16.4366 14.8155C16.657 15.0359 16.7042 15.272 16.5153 15.5553C16.4996 15.6025 16.4681 15.634 16.4051 15.697C16.3579 15.7127 16.3422 15.7285 16.3264 15.7757L15.6339 16.4682L15.382 16.6256C15.2561 16.7201 15.083 16.6729 14.8626 16.484L12.1553 13.7767C11.9979 13.6193 11.7775 13.6193 11.6201 13.7767L8.88132 16.5155C8.70818 16.6886 8.56651 16.7673 8.33041 16.6256C8.28319 16.5784 8.22023 16.5469 8.15727 16.484Z"
                    fill="white"
                  />
                </svg>
              </a>

              <div className={styles.formSection}>
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
              </div>
              <div className={styles.formSection}>
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
              </div>
              <div className={styles.formSection}>
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
              </div>
              <div className={styles.formSection}>
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
                <div className={styles.emailText}>
                  <p>aaa@gmail.com</p>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => setShowAdditionalDetails(false)}
              >
                הוסף פרטים אישיים
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.formSection}>
                <label htmlFor="text" className={styles.label}>
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
              <div className={styles.formSection}>
                <label className={styles.label} htmlFor="platform">
                  פלטפורמה
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">בחר</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div className={styles.formSection}>
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
              <div className={styles.fileUploadContainer}>
                <label className={styles.label} htmlFor="image">
                  העלאת תיעוד
                </label>
                <div className={styles.fileUploadBox}>
                  <span className={styles.fileUploadPlaceholder}>
                    צירף קובץ
                  </span>
                  <span className={styles.fileUploadIcon}>+</span>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    className={styles.fileInput}
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <a
                  className={styles.addInfoLink}
                  onClick={() => setShowAdditionalDetails(true)}
                >
                  <span className={styles.addInfoText}>
                    הוספת פרטים אישיים{" "}
                    <span className={styles.optionalText}>(אופציונלי)</span>
                  </span>
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.5" cy="11.5" r="11.5" fill="#F38F56" />
                    <path
                      d="M12.4999 17.7755L12.3218 17.7533H11.6095C11.3424 17.7533 11.0085 17.7533 10.8972 17.5975C10.7191 17.3749 10.7414 17.0855 10.7414 16.7071V13.4126C10.7414 13.19 10.5856 13.0342 10.363 13.0342H6.48972C6.24486 13.0342 6.08904 12.9896 6.02226 12.7225C6.02226 12.6557 6 12.589 6 12.4999L6.02226 12.3218V11.6095C6.02226 11.3424 6.02226 11.0085 6.17808 10.8972C6.40068 10.7191 6.69006 10.7414 7.06848 10.7414H10.363C10.5856 10.7414 10.7414 10.5856 10.7414 10.363V6.60102C10.7414 6.28938 10.8749 6.08904 11.2088 6.02226C11.2534 6 11.2979 6 11.3869 6C11.4314 6.02226 11.4537 6.02226 11.4982 6H12.4777L12.767 6.06678C12.9229 6.08904 13.0119 6.24486 13.0342 6.53424V10.363C13.0342 10.5856 13.19 10.7414 13.4126 10.7414H17.1745C17.4862 10.7414 17.6865 10.8749 17.7533 11.2088C17.7755 11.2534 17.7755 11.2979 17.7755 11.3869C17.7533 11.4314 17.7533 11.4537 17.7755 11.4982V12.4777L17.7088 12.767C17.6865 12.9229 17.5307 13.0119 17.2413 13.0342H13.4126C13.19 13.0342 13.0342 13.19 13.0342 13.4126V17.2858C13.0342 17.5307 12.9896 17.6865 12.7225 17.7533C12.6557 17.7533 12.589 17.7755 12.4999 17.7755Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.submitButton}>
                שלח
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
