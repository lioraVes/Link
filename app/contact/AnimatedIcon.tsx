//@ts-nocheck

import React, { useRef, useEffect } from "react";
import Lottie from "react-lottie-player";
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
    if (animationRef.current) {
      if (state === "playing") {
        animationRef.current.goToAndPlay(0, true); // Ensure it starts from frame 0

        // Stop at frame 50
        setTimeout(() => {
          if (animationRef.current.currentFrame < 50) {
            animationRef.current.pause();
          }
        }, 2000); // Adjust based on animation timing
      } else if (state === "stopped") {
        animationRef.current.goToAndStop(50, true);
      } else if (state === "continue") {
        animationRef.current.goToAndPlay(50, true);
      }
    }
  }, [state, animation]);

  return (
    <div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
      <Lottie
        ref={animationRef}
        animationData={animationData}
        loop={false}
        play={state === "playing" || state === "continue"}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default AnimatedIcon;
