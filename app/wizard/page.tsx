"use client";

import React, { useState } from "react";
import wizardData from "../../lib/data/extortion.json";
import guidesData from "../../lib/data/guides.json";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import InfoPage from "./components/InfoPage";
import ChoicePage from "./components/ChoicePage";

export default function Wizard() {
  // EXAMPLE OF USING INFO
  const title = "ריכזתי עבורך מידע שיעזור לך";
  const info =
    "החליפו באופן מיידי את שם המשתמש והסיסמא של השירות אליו חשבתם שנכנסתם. שנו את שם המשתמש והסיסמה גם בשירותים הנוספים שבהם הפרטים משומשים.";

  return (
    <div>
      <InfoPage title={title} info={info} infoOnClick={() => {}} />
    </div>
  );
}

/**
 * EXAMPLE OF USING CHOICE PAGE
 * 
 * export default function Wizard() {
  const router = useRouter();

  const handleChoice = (path: string) => {
    router.push(path); // Navigate to a new route based on the choice
  };

  const question = "האם הכנסת פרטים אישיים?";
  const choices = [
    {
      text: "כן",
      onClick: () => handleChoice("/home"),
    },
    {
      text: "לא",
      onClick: () => handleChoice("/profile"),
    },
  ];

  return (
    <div>
      <ChoicePage question={question} choices={choices} />
    </div>
  );
}
 * 
 */
