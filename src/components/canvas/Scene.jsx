import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

import * as THREE from "three";
import { gsap } from "gsap";

import { useExperienceStore } from "../../stores/useExperienceStore";
import { SCENE_CONFIG } from "../../data/sceneConfig";
import { useCursorStore } from "../../stores/useCursorStore";

import {
	animateSceneLayers,
	prepareSceneLayers,
	setInitialMeshesPosition,
	mousePointer,
	updateSceneLayers,
} from "../../utils/scene";
import { SceneGlow } from "./SceneGlow";
import { useSoundStore } from "../../stores/useSoundStore";

const POSITIONS = {
	top: { x: 0, y: 10, z: 0 },
	bottom: { x: 0, y: -10, z: 0 },
	left: { x: -10, y: 0, z: 0 },
	right: { x: 10, y: 0, z: 0 },
	center: { x: 0, y: 0, z: 0 },
};

export function Scene({ name, glb, active, before = "right", after = "left" }) {
	const isTransitioning = useExperienceStore((state) => state.isTransitioning);
	const setIsTransitioning = useExperienceStore(
		(state) => state.setIsTransitioning,
	);
	const setCursor = useCursorStore((state) => state.setCursorType);
	const { scene } = useGLTF(glb);
	const prevActive = useRef(false);

	const { sceneElements, meshes } = useMemo(
		() => prepareSceneLayers(scene),
		[scene],
	);

	const updateSceneSounds = useSoundStore((state) => state.updateSceneSounds);

	// Setting initial position
	useLayoutEffect(() => {
		const direction = useExperienceStore.getState().direction;

		if (!active) {
			// Inactive : placed to the side
			setInitialMeshesPosition(meshes, before, POSITIONS);
		} else if (active && !prevActive.current) {
			// Active : placed on starting point
			// Before the first render happen
			const startPosName = direction === "FORWARD" ? before : after;
			setInitialMeshesPosition(meshes, startPosName, POSITIONS);
		}
	}, [meshes, active, before, after]);

	useEffect(() => {
		const direction = useExperienceStore.getState().direction;

		if (active && !prevActive.current) {
			updateSceneSounds(name);

			const startPos =
				direction === "FORWARD" ? POSITIONS[before] : POSITIONS[after];
			useExperienceStore.getState().setIsTransitioning(true);

			animateSceneLayers(meshes, startPos, POSITIONS.center, true, 0.4, () => {
				setIsTransitioning(false);
			});
			prevActive.current = true;
		} else if (!active && prevActive.current) {
			const endPos =
				direction === "FORWARD" ? POSITIONS[after] : POSITIONS[before];
			animateSceneLayers(meshes, POSITIONS.center, endPos, false, 0);
			prevActive.current = false;
		}
	}, [active, name, updateSceneSounds]);

	useFrame(() => {
		if (!active && !isTransitioning) return;
		updateSceneLayers(meshes, mousePointer, 0.1, true);
	});

	const handlePointerOver = (e) => {
		e.stopPropagation();
		if (e.object.name.startsWith("INT_")) {
			useCursorStore.getState().setIsHovering(true);
			useSoundStore.getState().playSound("hover");
		}
	};

	const handlePointerOut = (e) => {
		if (e.object.name.startsWith("INT_")) {
			useCursorStore.getState().setIsHovering(false);
		}
	};

	const handleClick = (e) => {
		e.stopPropagation();
		const objName = e.object.name;

		if (objName.startsWith("INT_")) {
			const config = SCENE_CONFIG[objName];

			if (config?.clickSound) {
				useSoundStore.getState().playSound(config.clickSound);
			} else {
				useSoundStore.getState().playSound("click");
			}

			// 3. Ouvrir le dialogue
			useExperienceStore.getState().openDialogue(objName);
		}
	};

	return (
		<group>
			<SceneGlow sceneElements={sceneElements} />
			<primitive
				object={sceneElements}
				name={name}
				onPointerOver={handlePointerOver}
				onPointerOut={handlePointerOut}
				onClick={handleClick}
			/>
		</group>
	);
}
