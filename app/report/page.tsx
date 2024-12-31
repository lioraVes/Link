"use client";

import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import styles from "./page.module.css";
import { postFormData } from "./utils";
import { ContactFormResponse } from "./types";

const formHandlerUrl = "/report/api";

export default function ContactForm() {
  const [formData, setFormData] = useState<{
    image: File | null;
    link: string;
    text: string;
    personalDetails: string;
  }>({
    image: null,
    link: "",
    text: "",
    personalDetails: "",
  });

  const [submissionResponse, setSubmissionResponse] = useState<ContactFormResponse | undefined>(undefined);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, files } = event.target as HTMLInputElement;
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const response = await postFormData(formData, formHandlerUrl);
    setSubmissionResponse(response);
  }

  const formClassName = `${styles.contactForm} gray-bg`;

  return (
    <main>
      <div className={styles.container}>
      {submissionResponse ? (
        <div className="center">{submissionResponse.message}</div>
      ) : (
      <form className={formClassName} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.label}>העלאת תמונה</label>
        <input type="file" id="image" name="image" onChange={handleChange} className={styles.input} required/>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="link" className={styles.label}>הוספת קישור</label>
        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="text" className={styles.label}>טקסט חופשי</label>
        <textarea id="text" name="text" value={formData.text} onChange={handleChange} className={styles.textarea}></textarea>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="personalDetails" className={styles.label}>פרטים אישיים נוספים</label>
        <textarea
          id="personalDetails"
          name="personalDetails"
          value={formData.personalDetails}
          onChange={handleChange}
          className={styles.textarea}
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>Send</button>
    </form>)}
      </div>
    </main>
    
  );
}