import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";

import { useExperienceStore } from "../../stores/useExperienceStore";
import { SCENE_CONFIG } from "../../data/sceneConfig";

import { CharacterComponent } from "./CharacterComponent";
import { DialogueBox3D } from "./DialogueBox3D";
import { CloseButtonComponent } from "../ui/CloseButtonComponent";
import InfoButtonIcon from "../ui/InfoButtonIcon";
import { InfoPanel3D } from "./InfoPanel";

export const DialogueSystem = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const activeCharacter = useExperienceStore((state) => state.activeCharacter);
	const closeDialogue = useExperienceStore((state) => state.closeDialogue);

	const character = activeCharacter ? SCENE_CONFIG[activeCharacter] : null;

	const exitDialogue = () => {
		closeDialogue();
		setIsPanelOpen(false);
	};

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
						transition: { duration: 0.3 },
					}}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="dialogue-overlay"
				>
					<CloseButtonComponent onClick={closeDialogue} />

					{!isPanelOpen && (
						<button
							className="infoPanel-open-btn"
							onClick={() => setIsPanelOpen(true)}
							style={{
								position: "absolute",
								right: "40px",
								top: "40px",
								zIndex: 10,
							}}
						>
							<InfoButtonIcon />
						</button>
					)}

					<div className="dialogue-content">
						<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
							<ambientLight intensity={1.5} />
							<Suspense fallback={null}>
								<CharacterComponent imagePath={character.image} />
								<InfoPanel3D
									isOpen={isPanelOpen}
									setIsOpen={setIsPanelOpen}
									characterName={character.name}
									characterInfo={character.info}
								/>
								<DialogueBox3D name={character.name} text={character.text} />
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
