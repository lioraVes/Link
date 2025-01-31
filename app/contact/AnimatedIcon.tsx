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
  // Function to get the correct animation JSON
  const getAnimation = (icon: string) => {
    if (icon === "hand") return hand;
    if (icon === "finish") return finish;
    if (icon === "password") return password;
    return null;
  };

  const animationData = getAnimation(animation);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const animationInstanceRef = useRef<any>(null);

  useEffect(() => {
    async function loadAnimation() {
      const lottie = await import("lottie-web");

      // Destroy previous instance if exists
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }

      const animationInstance = lottie.default.loadAnimation({
        container: animationRef.current,
        animationData: animationData,
        renderer: "svg",
        loop: state === "playing" || state === "continue",
        autoplay: state === "playing" || state === "continue",
      });

      animationInstanceRef.current = animationInstance; // Store reference

      if (state === "playing") {
        animationInstance.goToAndPlay(0, true);

        // Stop at frame 50
        const stopAtFrame50 = setInterval(() => {
          if (animationInstance.currentFrame >= 50) {
            animationInstance.pause();
            clearInterval(stopAtFrame50);
          }
        }, 16);
      } else if (state === "stopped") {
        animationInstance.goToAndStop(50, true);
      } else if (state === "continue") {
        animationInstance.goToAndPlay(50, true);
      }
    }

    loadAnimation();

    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }
    };
  }, [state, animation, animationData]); // Include `animation` in dependencies

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
