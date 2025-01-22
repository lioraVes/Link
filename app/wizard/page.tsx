"use client";

import React, { useState, useEffect } from "react";
import wizardData from "../../lib/data/phishingFlow.json";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import InfoPage from "./components/InfoPage";
import ChoicePage from "./components/ChoicePage";
import TopNav from "@/lib/components/TopNav";

type ChoiceNode = {
  type: string;
  question: string;
  answers: { [key: string]: string };
  explanation?: string;
};

type InfoNode = {
  type: string;
  title: string;
  content: string[];
  next: string;
};

type Node = ChoiceNode | InfoNode;
type WizardData = {
  phishing: {
    [key: string]: Node;
  };
};

const typedWizardData = wizardData as WizardData;

export default function Wizard() {
  const [currentNode, setCurrentNode] = useState<Node>(wizardData.phishing.q1);
  const router = useRouter();
  const [theme, setTheme] = useState("white");

  // Update theme when currentNode changes
  useEffect(() => {
    if (currentNode.type === "choice") {
      setTheme("white");
    } else if (currentNode.type === "info") {
      setTheme("pink");
    }
  }, [currentNode]);

  const handleChoice = (nextNodeKey: string) => {
    if (nextNodeKey === "end") {
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
    if (currentNode.type === "choice") {
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

  return (
    <div className={styles.container}>
      <TopNav theme={theme} />
      {renderNode()}
    </div>
  );
}
