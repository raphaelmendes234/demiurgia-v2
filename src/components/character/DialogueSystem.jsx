import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";

import { useExperienceStore } from "../../stores/useExperienceStore";
import { SCENE_CONFIG } from "../../data/sceneConfig";

import { CharacterComponent } from "./CharacterComponent";
import { DialogueBox3D } from "./DialogueBox3D";
import CloseButtonIcon from "../ui/CloseButtonIcon";

export const DialogueSystem = () => {
  const activeCharacter = useExperienceStore((state) => state.activeCharacter);
  const closeDialogue = useExperienceStore((state) => state.closeDialogue);

  const character = activeCharacter ? SCENE_CONFIG[activeCharacter] : null

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          key="dialogue-system-overlay"
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            scale: 0.98, 
            filter: "blur(5px)",
            transition: { duration: 0.3 } 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="dialogue-overlay"
        >
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dialogue-close-btn"
            onClick={closeDialogue}
          >
            <CloseButtonIcon />
          </motion.button>

          <div className="dialogue-content">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <Suspense fallback={null}>
                <CharacterComponent imagePath={character.image} />
                <DialogueBox3D
                  name={character.name} 
                  text={character.text} 
                />
              </Suspense>
            </Canvas>
          </div>

          {/* <DialogueBox 
            name={character.name} 
            text={character.text} 
          /> */}

          
        </motion.div>
      )}
    </AnimatePresence>
  );
};