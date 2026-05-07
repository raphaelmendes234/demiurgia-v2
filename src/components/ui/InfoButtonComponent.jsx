import React from "react";
import { useSoundStore } from "../../stores/useSoundStore";
import InfoButtonIcon from "./InfoButtonIcon";

export const InfoButtonComponent = ({ onClick }) => {
  const { playSound } = useSoundStore();
  const handleClick = () => {
    playSound("close");
    onClick();
  };

  const handlePointerOver = (e) => {
    playSound("hover");
  };

  return (
    <button
      onClick={handleClick}
      onPointerEnter={handlePointerOver}
      style={{
        background: "none",
        border: "none",
        padding: "0",
        cursor: "pointer",
      }}
    >
      <InfoButtonIcon />
    </button>
  );
};
