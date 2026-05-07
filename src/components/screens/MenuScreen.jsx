import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";
import Title3DModel from "../Title3DModel";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";

export function MenuScreen() {
  const setContext = useExperienceStore((state) => state.setContext);
  const startAmbience = useSoundStore((state) => state.startAmbience);
  const playSound = useSoundStore((state) => state.playSound);

  const handleStart = () => {
    setContext();
  };

  return (
    <div className="menu__screen">
      <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />

          <color attach="background" args={["#1f1f2d"]} />
          <fog attach="fog" args={["#1f1f2d", 2, 12]} />
          <Title3DModel />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={1}
          />
        </Suspense>
      </Canvas>
        <MainButtonComponent
          onClick={handleStart}
          onPointerDown={() => playSound("magic")}
        >
          COMMENCER
        </MainButtonComponent>
        <span className="utils__screenInfo">MENU SCREEN</span>
    </div>
  );
}
