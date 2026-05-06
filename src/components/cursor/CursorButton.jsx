import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";

export function CursorButton({
  children,
  onClick,
  onPointerEnter,
  specialSound = false,
  ...props
}) {
  const setIsHovering = useCursorStore((state) => state.setIsHovering);

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

  return (
    <button
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovering(false)}
      onPointerDown={handlePointerDown}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
