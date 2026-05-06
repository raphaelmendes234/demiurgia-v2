import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

import { ScenesManager } from "./ScenesManager";
import { useControls, folder } from "leva";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { DialogueSystem } from "../character/DialogueSystem";
import { useExperienceStore, PHASES } from "../../stores/useExperienceStore";
import { gsap } from "gsap";

function CameraHandler() {
	const { camera } = useThree(); // Récupère l'instance réelle de la caméra
	const phase = useExperienceStore((state) => state.phase);

	const { xPosition, yPosition, zPosition, fov } = useControls("Camera", {
		xPosition: { value: 0.02, min: -5, max: 5, step: 0.001 },
		yPosition: { value: 0, min: -5, max: 5, step: 0.001 },
		zPosition: { value: 4.35, min: 0, max: 20, step: 0.001 },
		fov: { value: 21, min: 10, max: 120, step: 0.001 },
	});

	useEffect(() => {
		// On met à jour la position
		camera.position.x = xPosition;
		camera.position.y = yPosition;
		camera.position.z = zPosition;
		// On met à jour le FOV
		camera.fov = fov;
		// TRÈS IMPORTANT : On dit à Three.js de recalculer le rendu
		camera.updateProjectionMatrix();
	}, [xPosition, yPosition, zPosition, fov, camera]);

	useEffect(() => {
		if (phase === PHASES.CONTEXT) {
			// Rotation légère vers le haut (valeur négative sur X pour lever le nez)
			gsap.to(camera.rotation, {
				x: 0.15,
				duration: 1.5,
				ease: "power2.inOut",
			});
		} else {
			// Retour à la rotation normale (0) pour les autres phases
			gsap.to(camera.rotation, {
				x: 0,
				duration: 1,
				ease: "power2.inOut",
			});
		}
	}, [phase, camera]);

	return null; // Ce composant ne rend rien visuellement
}

export function Experience() {
	return (
		<>
			<DialogueSystem />

			<Canvas camera={{ position: [0.02, 0, 4.35], fov: 21 }}>
				<color attach="background" args={["#111"]} />

				<ambientLight intensity={0.8} color={"white"} />

				<CameraHandler />

				<Suspense fallback={null}>
					<ScenesManager />
				</Suspense>

				<EffectComposer>
					<Bloom
						mipmapBlur
						intensity={3.0}
						radius={0.6}
						luminanceThreshold={0.8}
					/>
				</EffectComposer>
			</Canvas>
		</>
	);
}
