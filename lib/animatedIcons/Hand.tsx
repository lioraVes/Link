"use client";

import React, { useRef, useEffect, useState } from "react";
import hand from "@/lib/animations/hand.json";

const HandAnimation = ({
  state = "stopped",
  onComplete,
}: {
  state: "playing" | "stopped" | "continue";
  onComplete: () => void;
}) => {
  const [isClient, setIsClient] = useState(false);
  const handAnimationRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadAnimation() {
      const lottie = await import("lottie-web");

      const animationInstance = lottie.default.loadAnimation({
        container: handAnimationRef.current,
        animationData: hand,
        renderer: "svg",
        loop: state === "playing" || state === "continue",
        autoplay: state === "playing" || state === "continue",
      });

      if (state === "playing") {
        animationInstance.goToAndPlay(0, true);

        // Stop at frame 50
        const stopAtFrame50 = setInterval(() => {
          if (animationInstance.currentFrame >= 50) {
            animationInstance.pause();
            clearInterval(stopAtFrame50);
          }
        }, 16); // Check every 16ms (~60fps)
      } else if (state === "stopped") {
        animationInstance.goToAndStop(50, true);
      } else if (state === "continue") {
        animationInstance.goToAndPlay(50, true);
      }

      animationInstance.addEventListener("complete", onComplete);

      return () => {
        animationInstance.removeEventListener("complete", onComplete);
        animationInstance.destroy();
      };
    }

    if (isClient) {
      loadAnimation();
    }
  }, [state, isClient, onComplete]);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "300px", overflow: "hidden" }} ref={handAnimationRef}></div>
  );
};

export default HandAnimation;