import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";
import MainButtonStyle from "./MainButtonStyle";
import { ButtonAura } from "./ButtonAura";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

export function BigMainButtonComponent({
  children,
  onClick,
  onPointerEnter,
  disabled,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
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
    if (onClick) {
      onClick(e);
    }
  };

 return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px', 
        height: '300px',
        pointerEvents: 'none', 
        zIndex: 0
      }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ButtonAura hovered={isHovered} />
        </Canvas>
      </div>

      <MainButtonStyle
        {...props}
        style={{ position: 'relative', zIndex: 1 }}
        onPointerEnter={() => {
          setIsHovered(true);
          setIsHovering(true);
        }}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsHovering(false);
        }}
        onClick={onClick}
      >
        {children}
      </MainButtonStyle>
    </div>
  );
}
