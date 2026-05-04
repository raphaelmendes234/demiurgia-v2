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

const POSITIONS = {
  top: { x: 0, y: 10, z: 0 },
  bottom: { x: 0, y: -10, z: 0 },
  left: { x: -10, y: 0, z: 0 },
  right: { x: 10, y: 0, z: 0 },
  center: { x: 0, y: 0, z: 0 },
};

export function Scene({ name, glb, active, before = "right", after = "left" }) {
  const setIsTransitioning = useExperienceStore((state) => state.setIsTransitioning)
  const setCursor = useCursorStore((state) => state.setCursorType);
  const { scene } = useGLTF(glb);
  const prevActive = useRef(false);

  const { sceneElements, meshes } = useMemo(
    () => prepareSceneLayers(scene),
    [scene],
  );

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

  // Scene transitions : animate layers with stagger
  useEffect(() => {
    // Retrieve swap direction
    const direction = useExperienceStore.getState().direction;

    // Scene becomes ACTIVE (arrives)
    if (active && !prevActive.current) {
      console.log(`[${name}] ACTIVE`);
      const startPos = direction === "FORWARD" ? POSITIONS[before] : POSITIONS[after];
      useExperienceStore.getState().setIsTransitioning(true) // Security lock at the start of the animation
      animateSceneLayers(meshes, startPos, POSITIONS.center, true, 0.4, () => { 
        setIsTransitioning(false)
      });
      prevActive.current = true;
    }

    // Scene becomes INACTIVE (leaves)
    else if (!active && prevActive.current) {
      const endPos = direction === "FORWARD" ? POSITIONS[after] : POSITIONS[before];
      animateSceneLayers(meshes, POSITIONS.center, endPos, false, 0);
      prevActive.current = false;
    }
  }, [active, meshes]);

  useFrame(() => {
    updateSceneLayers(meshes, mousePointer, 0.1, true);
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (e.object.name.startsWith("INT_")) {
      useCursorStore.getState().setIsHovering(true);
    }
  };

  const handlePointerOut = (e) => {
    if (e.object.name.startsWith("INT_")) {
      useCursorStore.getState().setIsHovering(false);
    }
  };

    const handleClick = (e) => {
      e.stopPropagation();
        if (e.object.name.startsWith('INT_')) {
          console.log(e.object.name)
          useExperienceStore.getState().openDialogue(e.object.name)
        }
    }

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

useGLTF.preload = (url) => useGLTF.preload(url);
