import { useFrame, useThree } from "@react-three/fiber";
import { useExperienceStore, PHASES } from "../stores/useExperienceStore";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CameraHandler() {
	const { camera } = useThree();
	const phase = useExperienceStore((state) => state.phase);

	const shakeIntensity = useRef(0);
	const shakeSpeed = useRef(1);
	const initialPos = useRef([0.02, 0, 4.35]);

	useEffect(() => {
		// Context
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
