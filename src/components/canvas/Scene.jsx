import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { folder, useControls } from "leva";

import { useExperienceStore } from "../../stores/useExperienceStore";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";

import { SCENE_CONFIG } from "../../data/sceneConfig";
import {
  animateSceneLayers,
  prepareSceneLayers,
  setInitialMeshesPosition,
  mousePointer,
  updateSceneLayers,
} from "../../utils/scene";

const POSITIONS = {
  top: { x: 0, y: 10, z: 0 },
  bottom: { x: 0, y: -10, z: 0 },
  left: { x: -10, y: 0, z: 0 },
  right: { x: 10, y: 0, z: 0 },
  center: { x: 0, y: 0, z: 0 },
};

export function Scene({ name, glb, active, before = "right", after = "left" }) {
  const { scene } = useGLTF(glb);
  const prevActive = useRef(false);

  // --- 1. DEBUG LEVA (Déplacé ici pour corriger l'erreur d'initialisation) ---
  const debug = useControls(`Scene: ${name}`, {
    Modèle: folder({
      emissiveColor: "#0fd15d",
      emissiveIntensity: { value: 4, min: 0, max: 20, step: 0.1 },
      opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    }),
  });

  // --- 2. PRÉPARATION DES ÉLÉMENTS ---
  const { sceneElements, meshes } = useMemo(
    () => prepareSceneLayers(scene),
    [scene],
  );

  // --- 3. GESTION DES TEXTURES D'ÉMISSION ---
  const neededTextures = useMemo(() => {
    const paths = {};
    sceneElements.traverse((child) => {
      if (child.isMesh && SCENE_CONFIG[child.name]?.glow) {
        paths[child.name] = SCENE_CONFIG[child.name].glow.mask;
      }
    });
    return paths;
  }, [sceneElements]);

  const texturePaths = Object.values(neededTextures);

  const loadedTextures = useTexture(
    texturePaths.length > 0
      ? texturePaths
      : ["/assets/images/emission/women_emissive2.png"],
  );

  const textureMap = useMemo(() => {
    const map = {};
    if (texturePaths.length === 0) return map;

    Object.keys(neededTextures).forEach((meshName, index) => {
      const tex = Array.isArray(loadedTextures)
        ? loadedTextures[index]
        : loadedTextures;
      if (tex) {
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;
        map[meshName] = tex;
      }
    });
    return map;
  }, [neededTextures, loadedTextures, texturePaths]);

  // --- 4. APPLICATION DU GLOW (AVEC OVERRIDE LEVA) ---
  useLayoutEffect(() => {
    sceneElements.traverse((child) => {
      if (child.isMesh) {
        const config = SCENE_CONFIG[child.name];

        if (config && config.glow) {
          // On clone pour éviter les conflits entre scènes
          child.material = child.material.clone();
          const m = child.material;

          m.emissiveMap = textureMap[child.name] || null;
          
          // Utilisation des valeurs de Leva en temps réel
          m.emissive = new THREE.Color(debug.emissiveColor);
          m.emissiveIntensity = debug.emissiveIntensity;
          m.opacity = debug.opacity;

          m.toneMapped = false;
          m.transparent = true;
          m.needsUpdate = true;
        }
      }
    });
    // On écoute 'debug' pour mettre à jour Three.js quand tu bouges les sliders
  }, [sceneElements, textureMap, debug]);

  // --- 5. LOGIQUE DE TRANSITION & FRAME ---
  useEffect(() => {
    if (!active) setInitialMeshesPosition(meshes, before, POSITIONS);
  }, [meshes, before, active]);

  useEffect(() => {
    const direction = useExperienceStore.getState().direction;

    if (active && !prevActive.current) {
      const startPos =
        direction === "FORWARD" ? POSITIONS[before] : POSITIONS[after];
      animateSceneLayers(meshes, startPos, POSITIONS.center, true, 0.4);
      prevActive.current = true;
    } else if (!active && prevActive.current) {
      const endPos =
        direction === "FORWARD" ? POSITIONS[after] : POSITIONS[before];
      animateSceneLayers(meshes, POSITIONS.center, endPos, false, 0);
      prevActive.current = false;
    }
  }, [active, meshes, before, after]);

  useFrame(() => {
    if (active) {
      updateSceneLayers(meshes, mousePointer, 0.1, true);
    }
  });

  // --- 6. HANDLERS D'INTERACTIONS ---
  const handlePointerOver = (e) => {
    e.stopPropagation();
    const config = SCENE_CONFIG[e.object.name];

    if (config) {
      useCursorStore.getState().setIsHovering(true);
      if (config.cursor) useCursorStore.getState().setCursorType(config.cursor);

      if (config.hoverSound) {
        useSoundStore.getState().playInteractionSound(e.object.name, "hover");
      }
    }
  };

  const handlePointerOut = (e) => {
    if (SCENE_CONFIG[e.object.name]) {
      useCursorStore.getState().setIsHovering(false);
      useCursorStore.getState().setCursorType("default");
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const config = SCENE_CONFIG[e.object.name];

    if (config) {
      if (config.clickSound) {
        useSoundStore.getState().playInteractionSound(e.object.name, "click");
      }
    }
  };

  return (
    <primitive
      object={sceneElements}
      name={name}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      visible={active || prevActive.current}
    />
  );
}

useGLTF.preload = (url) => useGLTF.preload(url);