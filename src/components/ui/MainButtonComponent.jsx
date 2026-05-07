import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";
import MainButtonStyle from "./MainButtonStyle";

export function MainButtonComponent({
  children,
  onClick,
  onPointerEnter,
  disabled,
  ...props
}) {
  const setIsHovering = useCursorStore((state) => state.setIsHovering);
  const playSound = useSoundStore((state) => state.playSound);

  useEffect(() => {
    return () => setIsHovering(false);
  }, [setIsHovering]);

  const handlePointerEnter = (e) => {
    if (disabled) return;
    setIsHovering(true);
    if (onPointerEnter) onPointerEnter(e);
  };

  const handleClick = (e) => {
    if (disabled) return;

    playSound("uiMainButton");

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <MainButtonStyle
      {...props}
      disabled={disabled}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {children}
    </MainButtonStyle>
  );
}
