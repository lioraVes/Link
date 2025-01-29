//@ts-nocheck
"use client";

import React, { useRef, useEffect } from "react";
import finish from "./animations/finish.json";
import hand from "./animations/hand.json";
import password from "./animations/password.json";

const AnimatedIcon = ({
  animation,
  state,
}: {
  animation: string;
  state: "playing" | "stopped" | "continue";
}) => {
  const getAnimation = (icon: string) => {
    if (icon === "hand") return hand;
    if (icon === "finish") return finish;
    if (icon === "password") return password;
  };

  const animationData = getAnimation(animation);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    async function loadAnimation() {
      const lottie = await import("lottie-web");

      const animationInstance = lottie.default.loadAnimation({
        container: animationRef.current,
        animationData: animationData,
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
        }, 16); // 60fps
      } else if (state === "stopped") {
        animationInstance.goToAndStop(50, true);
      } else if (state === "continue") {
        animationInstance.goToAndPlay(50, true);
      }
    }

    loadAnimation();
  }, [state, animationData]);

  return (
    <div
      ref={animationRef}
      style={{
        width: "100%",
        height: "300px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default AnimatedIcon;