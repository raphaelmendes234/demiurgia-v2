import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { gsap } from "gsap";
import {
  animateSceneLayers,
  prepareSceneLayers,
  setInitialMeshesPosition,
  mousePointer,
  updateSceneLayers,
} from "../../utils/scene";
import { useFrame } from "@react-three/fiber";
import { useCursorStore } from "../../stores/useCursorStore";
import { SCENE_CONFIG } from "../../data/sceneConfig";
import * as THREE from "three";
import { SceneGlow } from "./SceneGlow";

const POSITIONS = {
  top: { x: 0, y: 10, z: 0 },
  bottom: { x: 0, y: -10, z: 0 },
  left: { x: -10, y: 0, z: 0 },
  right: { x: 10, y: 0, z: 0 },
  center: { x: 0, y: 0, z: 0 },
};

export function Scene({ name, glb, active, before = "right", after = "left" }) {
  const setCursor = useCursorStore((state) => state.setCursorType);
  const { scene } = useGLTF(glb);
  const prevActive = useRef(false);

  const { sceneElements, meshes } = useMemo(
    () => prepareSceneLayers(scene),
    [scene],
  );

  // Setting initial position
  useEffect(() => {
    if (!active) setInitialMeshesPosition(meshes, before, POSITIONS);
  }, []);

  // Scene transitions : animate layers with stagger
  useEffect(() => {
    // Retrieve swap direction
    const direction = useExperienceStore.getState().direction;

    // Scene becomes ACTIVE (arrives)
    if (active && !prevActive.current) {
      console.log(`[${name}] ACTIVE`);
      const startPos =
        direction === "FORWARD" ? POSITIONS[before] : POSITIONS[after];
      animateSceneLayers(meshes, startPos, POSITIONS.center, true, 0.4);
      prevActive.current = true;
    }

    // Scene becomes INACTIVE (leaves)
    else if (!active && prevActive.current) {
      const endPos =
        direction === "FORWARD" ? POSITIONS[after] : POSITIONS[before];
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
    if (e.object.name.startsWith("INT_")) {
      console.log("obj :", e.object.name);
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

useGLTF.preload = (url) => useGLTF.preload(url);
