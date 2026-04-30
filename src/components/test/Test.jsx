import { useExperienceStore } from "../../stores/useExperienceStore"
import { Canvas } from '@react-three/fiber';
import { DialogueSystem } from './DialogueSystem';
import { CharacterTarget } from "./CharacterTarget";

export function Test() {

    const setTest = useExperienceStore((state) => state.setTest)
    
    const handleClick = () => { 
        setTest()
    }

   return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor:"black" }}>
      
      {/* La Scène 3D */}
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <CharacterTarget id="hades" position={[-2, 0, 0]} />
      </Canvas>

      <DialogueSystem />
      
    </div>
  );
}