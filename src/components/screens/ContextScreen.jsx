import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { CONTEXT_STEPS } from "../../data/contextData";
import { BackgroundPlane } from "../context/BackgroundPlane";
import { AnimatedText } from "../context/AnimatedText";
import { gsap } from "gsap";
import { useSoundStore } from "../../stores/useSoundStore";
import { NavButtonComponent } from "../ui/NavButtonComponent";

export function ContextScreen() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentStep = CONTEXT_STEPS[currentIndex];

	const setGame = useExperienceStore((state) => state.setGame);
	const isTransitioning = useExperienceStore((state) => state.isTransitioning);
	const setIsTransitioning = useExperienceStore(
		(state) => state.setIsTransitioning,
	);
	const startAmbience = useSoundStore((state) => state.startAmbience);

	const changeStep = (direction) => {
		if (isTransitioning) return;
		setIsTransitioning(true);

		gsap.to(".canvas-container", {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				if (direction === "next") {
					if (currentIndex < CONTEXT_STEPS.length - 1) {
						// Logique habituelle pour passer au slide suivant
						setCurrentIndex((prev) => prev + 1);
						gsap.to(".canvas-container", {
							opacity: 1,
							duration: 0.4,
							onComplete: () => setIsTransitioning(false),
						});
					} else {
						// --- LOGIQUE "LANCER" ---
						setIsTransitioning(false);

						// On lance l'ambiance sonore
						if (startAmbience) startAmbience();

						// On lance le jeu
						setGame();
					}
				} else {
					setCurrentIndex((prev) => Math.max(0, prev - 1));

					gsap.to(".canvas-container", {
						opacity: 1,
						duration: 0.4,
						onComplete: () => setIsTransitioning(false),
					});
				}
			},
		});
	};

	return (
		<div className="context__screen">
			<div
				className="canvas-container"
				style={{ position: "absolute", inset: 0 }}
			>
				<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
					<BackgroundPlane
						key={`bg-${currentIndex}`}
						imagePath={currentStep.image}
					/>
					<AnimatedText
						key={`text-${currentIndex}`}
						content={currentStep.text}
					/>
				</Canvas>
			</div>

			{/* DOM UI Layer */}
			<div className="context__nav">
				<div className="context__buttons">
					{currentIndex !== 0 ? (
						<div className="context__nav-btn">
							<NavButtonComponent
								direction="prev"
								onClick={() => changeStep("prev")}
							/>
						</div>
					) : (
						<div />
					)}
					<div className="context__nav-btn">
						<NavButtonComponent
							direction="next"
							onClick={() => changeStep("next")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
