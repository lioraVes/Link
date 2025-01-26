"use client";

import React, { useState, useEffect } from "react";
import wizardData from "../../lib/data/phishingFlow.json";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import InfoPage from "./components/InfoPage";
import ChoicePage from "./components/ChoicePage";
import TopNav from "@/lib/components/TopNav";
import GuidePage from "./components/GuidePage";
import MultiPage from "./components/MultiPage";

type ChoiceNode = {
  type: "choice";
  icon:string;
  question: string;
  answers: { [key: string]: string };
  explanation_top?: string;
  explanation_bottom?: string;
};

type InfoNode = {
  type: "info";
  icon:string;
  title: string;
  content: string;
  buttons: {[key: string]: string };
};

type GuideNode={
  type: "guide";
  icon: string;
  title: string;
  content:string[];
  buttons:{[key: string]: string };
}

type MultiNode={
  type: "multi";
  icon:string;
  title:string;
  sub:string;
  checkboxHeader:string;
  checkboxes:string[];
  buttons: {[key: string]: string };
}

type Node = ChoiceNode | InfoNode | GuideNode | MultiNode;
type WizardData = {
  flow: {
    [key: string]: Node;
  };
};

const typedWizardData = wizardData as WizardData;

export default function Wizard() {
  const [currentNode, setCurrentNode] = useState<Node>(typedWizardData.flow.start);
  const router = useRouter();
  const [theme, setTheme] = useState("white");
  console.log(currentNode);
  // Update theme when currentNode changes
  useEffect(() => {
    if (currentNode.type === "choice" || currentNode.type === "multi" || currentNode.type === "guide") {
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
    typedWizardData.flow[nextNodeKey as keyof typeof wizardData.flow];

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
          icon={choiceNode.icon}
          choices={choices}
          explanation_top={choiceNode.explanation_top}
          explanation_bottom={choiceNode.explanation_bottom}
        />
      );
    }
 
    if (currentNode.type === "info") {
      const infoNode = currentNode as InfoNode;
      const buttons = Object.entries(infoNode.buttons).map(
        ([key, value]) => ({
          text: key,
          onClick: () => handleChoice(value),
        })
      );
      return (
        <InfoPage
          title={(currentNode as InfoNode).title}
          icon={(currentNode as InfoNode).icon}
          info={(currentNode as InfoNode).content}
          buttons={buttons}
        />
      );
    };
    if (currentNode.type === "guide") {
      const guideNode = currentNode as GuideNode;
      const buttons = Object.entries(guideNode.buttons).map(
        ([key, value]) => ({
          text: key,
          onClick: () => handleChoice(value),
        })
      );

      return (
        <GuidePage
          title={guideNode.title}
          icon={guideNode.icon}
          contents={guideNode.content} // Contents array
          buttons={buttons} // Map buttons to choices
        />
      );
    }
    if (currentNode.type === "multi") {
      const multiNode = currentNode as MultiNode;
      const buttons = Object.entries(multiNode.buttons).map(
        ([key, value]) => ({
          text: key,
          onClick: () => handleChoice(value),
        })
      );

      return (
        <MultiPage
          title={multiNode.title}
          icon={multiNode.icon}
          sub={multiNode.sub}
          checkboxHeader={multiNode.checkboxHeader}
          checkboxes={multiNode.checkboxes}
          buttons={buttons} 
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
