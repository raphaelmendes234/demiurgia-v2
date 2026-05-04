import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Variables
import { useExperienceStore, PHASES } from "./stores/useExperienceStore";

// Components
import { Debug } from "./components/Debug";
import { LoadingScreen } from "./components/screens/LoadingScreen";
import { MenuScreen } from "./components/screens/MenuScreen";
import { ContextScreen } from "./components/screens/ContextScreen";
import { GameScreen } from "./components/screens/GameScreen";
import { EndScreen } from "./components/screens/EndScreen";
import { Experience } from "./components/canvas/Experience";
import { GlobalSoundController } from "./components/GlobalSoundController";
import { Test } from "./components/test/Test";
import Test2 from "./components/Test2";
import { CustomCursor } from "./components/cursor/CustomCursor";

export default function App() {

  const phase = useExperienceStore((state) => state.phase)

  return (
    <>
       <GlobalSoundController /> 
      <div style={{ width: "100vw", height: "100vh" }}>
        <Debug />

         <CustomCursor /> 

         <LoadingScreen /> 
        
        { phase === PHASES.TEST && <Test /> }
        { phase === PHASES.MENU && <MenuScreen /> }
        { phase === PHASES.CONTEXT && <ContextScreen /> }
        { phase === PHASES.GAME && <GameScreen /> }
        { phase === PHASES.END && <EndScreen /> }

        <Experience />
      </div>
    </>
  );
}