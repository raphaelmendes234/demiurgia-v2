import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";

import { useExperienceStore } from "../../stores/useExperienceStore";
import { SCENE_CONFIG } from "../../data/sceneConfig";

import { CharacterComponent } from "./CharacterComponent";
import { DialogueBox3D } from "./DialogueBox3D";
import { CloseButtonComponent } from "../ui/CloseButtonComponent";
import InfoButtonIcon from "../ui/InfoButtonIcon";
import { useEffect } from "react";
import { useSoundStore } from "../../stores/useSoundStore";
import { InfoPanel } from "./InfoPanel";
import { InfoButtonComponent } from "../ui/InfoButtonComponent";

export const DialogueSystem = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const activeCharacter = useExperienceStore((state) => state.activeCharacter);
	const closeDialogue = useExperienceStore((state) => state.closeDialogue);
	const setDucking = useSoundStore((state) => state.setDucking);

  const character = activeCharacter ? SCENE_CONFIG[activeCharacter] : null;

  useEffect(() => {
    setDucking(!!activeCharacter);
  }, [activeCharacter, setDucking]);

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          key="dialogue-system-overlay"
          className="dialogue-overlay"
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="dialogue-close-btn">
            <CloseButtonComponent onClick={closeDialogue} />
          </div>

          {!isPanelOpen && (
            <div
              className="dialogue-info-btn"
              onClick={() => setIsPanelOpen(true)}
              style={{
                position: "absolute",
                right: "40px",
                top: "40px",
                zIndex: 10,
              }}
            >
              <InfoButtonComponent />
            </div>
          )}

          <InfoPanel
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            characterName={character.name}
            characterInfo={character.info}
            characterImageInfo={character.imageInfo} // On ajoute l'image ici
          />

          {/* Scène 3D */}
          <div className="dialogue-content">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <Suspense fallback={null}>
                <CharacterComponent imagePath={character.image} />
                <DialogueBox3D
                  name={character.name}
                  text={character.text}
                  isObject={character.isObject}
                />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
