import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { CursorButton } from "../CursorButton";

export function MenuScreen() {
  const setContext = useExperienceStore((state) => state.setContext)
  const startAmbience = useSoundStore((state) => state.startAmbience)

  const handleStart = () => {
    setContext();
  };

  return (
    <div className="menu__screen">
      <span className="utils__screenInfo">MENU SCREEN</span>
      <CursorButton
        onClick={handleStart}
        onPointerDown={() => startAmbience()}
      >
        COMMENCER
      </CursorButton>
    </div>
  );
}
