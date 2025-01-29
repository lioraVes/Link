"use client";

import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import openingData from "@/lib/animations/opening_screen.json";
import hand from "@/lib/animations/hand.json";

const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Lottie
        animationData={openingData}
        play
        loop={false}
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default OpeningAnimation;
