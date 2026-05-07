import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";
import MainButtonStyle from "./MainButtonStyle";

export function MainButtonComponent({
  children,
  onClick,
  onPointerEnter,
  specialSound = false,
  ...props
}) {
  const setIsHovering = useCursorStore((state) => state.setIsHovering);
  const playSound = useSoundStore((state) => state.playSound);

  useEffect(() => {
    return () => setIsHovering(false);
  }, [setIsHovering]);

  const handlePointerEnter = (e) => {
    setIsHovering(true);
    if (onPointerEnter) onPointerEnter(e);
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (props.onPointerDown) props.onPointerDown(e);
  };

  const handleClick = (e) => {
    playSound("uiMainButton");

    if (onClick) onClick(e);
  };

  return (
    <MainButtonStyle
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovering(false)}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {children}
    </MainButtonStyle>
  );
}
