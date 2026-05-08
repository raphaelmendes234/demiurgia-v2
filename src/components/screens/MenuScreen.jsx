import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";

export function MenuScreen() {
  const setContext = useExperienceStore((state) => state.setContext);
  const playSound = useSoundStore((state) => state.playSound);
  const startAmbianceMenu = useSoundStore((state) => state.startAmbianceMenu);
  const stopAmbianceMenu = useSoundStore((state) => state.stopAmbianceMenu);
  const startAmbianceContext = useSoundStore((state) => state.startAmbianceContext);

  useEffect(() => {
    startAmbianceMenu();
  }, [startAmbianceMenu]);

  const handleStart = () => {
    setContext();
    stopAmbianceMenu();
	startAmbianceContext();
  };

  return (
    <div className="menu__screen">
      <div className="menuScreen_button">
        <MainButtonComponent
          onClick={handleStart}
          onPointerDown={() => {
            playSound("buttonEnter");
          }}
        >
          COMMENCER
        </MainButtonComponent>
      </div>
      <span className="utils__screenInfo">MENU SCREEN</span>
    </div>
  );
}
