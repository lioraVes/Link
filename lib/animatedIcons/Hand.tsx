import React, { useRef, useEffect } from "react";
import Lottie from "react-lottie-player";
import hand from "@/lib/animations/hand.json";

const HandAnimation = ({
  state = "stopped",
  onComplete,
}: {
  state: "playing" | "stopped" | "continue";
  onComplete: () => void;
}) => {
  const handAnimationRef = useRef<any>(null);

  useEffect(() => {
    if (handAnimationRef.current) {
      if (state === "playing") {
        // Play from the beginning to frame 50
        handAnimationRef.current.goToAndPlay(0, true);

        // Stop at frame 50
        const stopAtFrame50 = setInterval(() => {
          if (
            handAnimationRef.current &&
            handAnimationRef.current.currentFrame >= 50
          ) {
            handAnimationRef.current.pause();
            clearInterval(stopAtFrame50);
          }
        }, 16); // Check every 16ms (~60fps)
      } else if (state === "stopped") {
        // Keep the animation stopped at frame 50
        handAnimationRef.current.goToAndStop(50, true);
      } else if (state === "continue") {
        // Resume animation from frame 50 to the end
        handAnimationRef.current.goToAndPlay(50, true);
      }
    }
  }, [state]);

  return (
    <div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
      <Lottie
        ref={handAnimationRef}
        animationData={hand}
        loop={false}
        play={state === "playing" || state === "continue"}
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default HandAnimation;
