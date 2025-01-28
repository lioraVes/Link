import React, { useRef, useEffect } from "react";
import Lottie from "react-lottie-player";
import animationMap from "@/lib/animations/animationMap"; // Path to your animationMap

const AnimatedIcon = ({
  icon,
  state,
}: {
  icon: string;
  state: "playing" | "stopped" | "continue";
}) => {
  const animationData = animationMap[icon]; // Get the animation JSON for the icon
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (animationRef.current) {
      if (state === "playing") {
        animationRef.current.goToAndPlay(0, true);

        // Stop at frame 50
        const stopAtFrame50 = setInterval(() => {
          if (animationRef.current.currentFrame >= 50) {
            animationRef.current.pause();
            clearInterval(stopAtFrame50);
          }
        }, 16); // 60fps
      } else if (state === "stopped") {
        animationRef.current.goToAndStop(50, true);
      } else if (state === "continue") {
        animationRef.current.goToAndPlay(50, true);
      }
    }
  }, [state, animationData]);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        overflow: "hidden",
      }}
    >
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
