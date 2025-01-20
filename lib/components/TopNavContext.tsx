import React, { createContext, useContext, useState } from "react";

// Define context properties
interface TopNavContextProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  iconColor: string;
  setIconColor: (color: string) => void;
}

// Create the context
const TopNavContext = createContext<TopNavContextProps>({
  backgroundColor: "#ffffff",
  setBackgroundColor: () => {},
  textColor: "#000000",
  setTextColor: () => {},
  iconColor: "#000000",
  setIconColor: () => {},
});

// Custom hook to consume the context
export const useTopNav = () => useContext(TopNavContext);

// Provider component
export const TopNavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [iconColor, setIconColor] = useState("#000000");

  return (
    <TopNavContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,
        textColor,
        setTextColor,
        iconColor,
        setIconColor,
      }}
    >
      {children}
    </TopNavContext.Provider>
  );
};
