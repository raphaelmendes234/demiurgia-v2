import { useThree } from "@react-three/fiber";
import { useExperienceStore, PHASES } from "../stores/useExperienceStore";
import { useControls } from "leva";
import { useEffect } from "react";
import { gsap } from "gsap";

export function CameraHandler({ edit = false }) {
	const { camera } = useThree(); // Récupère l'instance réelle de la caméra

	// const { xPosition, yPosition, zPosition, fov } = useControls("Camera", {
	//     xPosition: { value: 0.02, min: -5, max: 5, step: 0.001 },
	// 	yPosition: { value: 0, min: -5, max: 5, step: 0.001 },
	// 	zPosition: { value: 4.35, min: 0, max: 20, step: 0.001 },
	// 	fov: { value: 21, min: 10, max: 120, step: 0.001 },
	// });

	// useEffect(() => {
	//     // On met à jour la position
	// 	camera.position.x = xPosition;
	// 	camera.position.y = yPosition;
	// 	camera.position.z = zPosition;
	// 	// On met à jour le FOV
	// 	camera.fov = fov;
	// 	// TRÈS IMPORTANT : On dit à Three.js de recalculer le rendu
	// 	camera.updateProjectionMatrix();
	// }, [xPosition, yPosition, zPosition, fov, camera]);

	const phase = useExperienceStore((state) => state.phase);

	useEffect(() => {
		if (phase === PHASES.CONTEXT) {
			gsap.to(camera.rotation, {
				x: 0.15,
				duration: 1.5,
				ease: "power2.inOut",
			});
		} else {
			gsap.to(camera.rotation, {
				x: 0,
				duration: 1,
				ease: "power2.inOut",
			});
		}
	}, [phase, camera]);

	return null;
}
