import React, { useRef, useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import hand from "@/lib/animations/hand.json";

const HandAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const handAnimationRef = useRef<any>(null);
  const [playHandAnimation, setPlayHandAnimation] = useState(true);

  useEffect(() => {
    const stopFrame = 40; // Define the frame to stop at
    const stopAnimation = setTimeout(() => {
      setPlayHandAnimation(false);
      if (handAnimationRef.current) {
        handAnimationRef.current.goToAndStop(stopFrame, true);
      }
    }, 2000); // Adjust timing based on animation speed

    return () => clearTimeout(stopAnimation);
  }, []);

  return (
    <div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
      <Lottie
        ref={handAnimationRef}
        animationData={hand}
        play={playHandAnimation}
        loop={false}
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default HandAnimation;
