"use client";

import React, { useState } from "react";
import wizardData from "../../lib/data/phishingFlow.json";

import guidesData from "../../lib/data/guides.json";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import InfoPage from "./components/InfoPage";
import ChoicePage from "./components/ChoicePage";

type ChoiceNode = {
  type: string;
  question: string;
  answers: { [key: string]: string }; // key-value pairs for choices and their corresponding next node keys
  explanation?: string; // optional
};

type InfoNode = {
  type: string;
  title: string;
  content: string[]; // Array of strings for content
  next: string;
};

type Node = ChoiceNode | InfoNode;
type WizardData = {
  phishing: {
    [key: string]: Node; // The nodes are indexed by keys (e.g., q1, q2, etc.)
  };
};

const typedWizardData = wizardData as WizardData;

export default function Wizard() {
  const [currentNode, setCurrentNode] = useState<Node>(wizardData.phishing.q1); // Start at the root node
  const router = useRouter();

  const handleChoice = (nextNodeKey: string) => {
    console.log("handleChoice called with key:", nextNodeKey);

    if (nextNodeKey === "end") {
      console.log("Navigating to contact page");
      router.push("/contact");
      return;
    }

    const nextNode =
      wizardData.phishing[nextNodeKey as keyof typeof wizardData.phishing];

    if (nextNode) {
      setCurrentNode(nextNode);
    } else {
      console.error(
        "Invalid nextNodeKey or missing node in JSON:",
        nextNodeKey
      );
    }
  };

  const renderNode = () => {
    console.log("Current Node Type:", currentNode.type);

    if (currentNode.type === "choice") {
      console.log("Rendering ChoicePage");

      const choiceNode = currentNode as ChoiceNode;
      const choices = Object.entries(choiceNode.answers).map(
        ([key, value]) => ({
          text: key,
          onClick: () => handleChoice(value),
        })
      );

      return (
        <ChoicePage
          question={choiceNode.question}
          choices={choices}
          explanation={choiceNode.explanation}
        />
      );
    }

    if (currentNode.type === "info") {
      return (
        <InfoPage
          title={(currentNode as InfoNode).title}
          info={(currentNode as InfoNode).content}
          infoOnClick={() => {
            const infoNode = currentNode as InfoNode;
            if (infoNode.next) {
              handleChoice(infoNode.next);
            }
          }}
        />
      );
    }

    return <div>Invalid Node</div>;
  };

  return <div className={styles.container}>{renderNode()}</div>;
}

// EXAMPLE OF USING INFO
// const title = "ריכזתי עבורך מידע שיעזור לך";
// const info =
//   "החליפו באופן מיידי את שם המשתמש והסיסמא של השירות אליו חשבתם שנכנסתם. שנו את שם המשתמש והסיסמה גם בשירותים הנוספים שבהם הפרטים משומשים.";

//   return (
//     <div>
//       <InfoPage title={title} info={info} infoOnClick={() => {}} />
//     </div>
//   );

// //  EXAMPLE OF USING CHOICE PAGE

//  export default function Wizard() {
//   const router = useRouter();

//   const handleChoice = (path: string) => {
//     router.push(path); // Navigate to a new route based on the choice
//   };

//   const question = "האם הכנסת פרטים אישיים?";
//   const choices = [
//     {
//       text: "כן",
//       onClick: () => handleChoice("/home"),
//     },
//     {
//       text: "לא",
//       onClick: () => handleChoice("/profile"),
//     },
//   ];

//   return (
//     <div>
//       <ChoicePage question={question} choices={choices} />
//     </div>
//   );
// }
