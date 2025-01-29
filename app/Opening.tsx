"use client";

import React, { useState, useEffect, useRef } from "react";
import openingData from "@/lib/animations/opening_screen.json";

const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadAnimation() {
      const lottie = await import("lottie-web");

      const animationInstance = lottie.default.loadAnimation({
        container: animationRef.current,
        animationData: openingData,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      animationInstance.addEventListener("complete", onComplete);

      return () => {
        animationInstance.removeEventListener("complete", onComplete);
        animationInstance.destroy();
      };
    }

    if (isClient) {
      loadAnimation();
    }
  }, [isClient, onComplete]);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100%" }} ref={animationRef}></div>
  );
};

export default OpeningAnimation;