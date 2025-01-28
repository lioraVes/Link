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
import AnimatedIcon from "./components/AnimatedIcon"; // Updated component

type ChoiceNode = {
  type: "choice";
  icon: string;
  question: string;
  answers: { [key: string]: string };
  explanation_top?: string;
  explanation_bottom?: string;
};

type InfoNode = {
  type: "info";
  icon: string;
  title: string;
  content: string;
  buttons: { [key: string]: string };
};

type GuideNode = {
  type: "guide";
  icon: string;
  title: string;
  content: string[];
  buttons: { [key: string]: string };
};

type MultiNode = {
  type: "multi";
  icon: string;
  title: string;
  sub: string;
  checkboxHeader: string;
  checkboxes: string[];
  buttons: { [key: string]: string };
};

type Node = ChoiceNode | InfoNode | GuideNode | MultiNode;
type WizardData = {
  flow: {
    [key: string]: Node;
  };
};

const typedWizardData = wizardData as WizardData;

export default function Wizard() {
  const [currentNode, setCurrentNode] = useState<Node>(
    typedWizardData.flow.what_happend
  );
  const [currentIcon, setCurrentIcon] = useState<string>(
    typedWizardData.flow.what_happend.icon
  );
  const [animationState, setAnimationState] = useState<
    "playing" | "stopped" | "continue"
  >("playing");
  const router = useRouter();
  const [theme, setTheme] = useState("white");
  const [history, setHistory] = useState<Node[]>([]); // Add history state
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Update theme when currentNode changes
  useEffect(() => {
    if (
      currentNode.type === "choice" ||
      currentNode.type === "multi" ||
      currentNode.type === "guide"
    ) {
      setTheme("white");
    } else if (currentNode.type === "info") {
      setTheme("pink");
    }
  }, [currentNode]);

  // Update animation state only if the icon changes

  useEffect(() => {
    if (isFirstRender) {
      setAnimationState("playing"); // Ensure the first animation plays
      setIsFirstRender(false);
    } else if (currentNode.icon !== currentIcon) {
      setAnimationState("playing"); // Play animation from start on icon change
      setCurrentIcon(currentNode.icon);
    } else {
      setAnimationState("stopped"); // Keep it at frame 50 if icon is unchanged
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
      setHistory((prev) => [...prev, currentNode]); // Add current node to history

      if (nextNode.icon !== currentIcon) {
        setAnimationState("continue"); // Resume animation before switching screens
        setTimeout(() => {
          setCurrentNode(nextNode);
        }, 2000); // Adjust timing to match animation duration
      } else {
        setCurrentNode(nextNode); // Instantly switch if icon is the same
      }
    } else {
      console.error(
        "Invalid nextNodeKey or missing node in JSON:",
        nextNodeKey
      );
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1)); // Remove last node from history
      setCurrentNode(previousNode);
    } else {
      router.back(); // Navigate back to previous page
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
      const buttons = Object.entries(infoNode.buttons).map(([key, value]) => ({
        text: key,
        onClick: () => handleChoice(value),
      }));
      return (
        <InfoPage
          title={infoNode.title}
          icon={infoNode.icon}
          info={infoNode.content}
          buttons={buttons}
        />
      );
    }

    if (currentNode.type === "guide") {
      const guideNode = currentNode as GuideNode;
      const buttons = Object.entries(guideNode.buttons).map(([key, value]) => ({
        text: key,
        onClick: () => handleChoice(value),
      }));

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
      const buttons = Object.entries(multiNode.buttons).map(([key, value]) => ({
        text: key,
        onClick: () => handleChoice(value),
      }));

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
      <TopNav theme={theme} onBack={handleBack} />
      <AnimatedIcon icon={currentIcon} state={animationState} />
      {renderNode()}
    </div>
  );
}
