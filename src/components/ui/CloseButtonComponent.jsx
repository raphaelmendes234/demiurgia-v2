import React from "react";
import { useSoundStore } from "../../stores/useSoundStore";
import CloseButtonIcon from "./CloseButtonIcon";

export const CloseButtonComponent = ({ onClick }) => {
  const { playSound } = useSoundStore();
  const handleClick = () => {
    playSound("close");
    onClick();
  };
  return (
    <button onClick={handleClick} className="dialogue-close-btn">
      <CloseButtonIcon />
    </button>
  );
};
