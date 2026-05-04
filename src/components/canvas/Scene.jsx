import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { useExperienceStore } from "../../stores/useExperienceStore"
import { gsap } from "gsap"
import { animateSceneLayers, prepareSceneLayers, setInitialMeshesPosition, mousePointer, updateSceneLayers } from "../../utils/scene"
import { useFrame } from "@react-three/fiber"
import { useCursorStore } from "../../stores/useCursorStore"
import { SCENE_CONFIG } from "../../data/sceneConfig";
import * as THREE from "three"


const POSITIONS = {
    top:    { x: 0,   y: 10, z: 0 },
    bottom: { x: 0,   y: -10,z: 0 },
    left:   { x: -10, y: 0,  z: 0 },
    right:  { x: 10,  y: 0,  z: 0 },
    center: { x: 0,   y: 0,  z: 0 }
}

export function Scene({ name, glb, active, before = "right", after = "left" }) {
    const setCursor = useCursorStore((state) => state.setCursorType)
    const { scene } = useGLTF(glb)
    const prevActive = useRef(false)

    // Prepare and clone scene pour isolation des calques
    const { sceneElements, meshes } = useMemo(() => prepareSceneLayers(scene), [scene])

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
  const loadedTextures = useTexture(texturePaths.length > 0 ? texturePaths : ["/assets/images/emission/women_emissive2.png"]);

  const textureMap = useMemo(() => {
    const map = {};
    if (texturePaths.length === 0) return map;
    Object.keys(neededTextures).forEach((meshName, index) => {
      const tex = Array.isArray(loadedTextures) ? loadedTextures[index] : loadedTextures;
      if (tex) {
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;
        map[meshName] = tex;
      }
    });
    return map;
  }, [neededTextures, loadedTextures, texturePaths]);


    useLayoutEffect(() => {
    sceneElements.traverse((child) => {
      if (child.isMesh) {
        const config = SCENE_CONFIG[child.name];

        if (config && config.glow) {
          child.material = child.material.clone();
          const m = child.material;

          m.emissiveMap = textureMap[child.name] || null;
          
          // On utilise maintenant uniquement les valeurs du JSON
          m.emissive = new THREE.Color(config.glow.emissiveColor);
          m.emissiveIntensity = config.glow.emissiveIntensity;
          m.opacity = config.glow.opacity;

          m.toneMapped = false;
          m.transparent = true;
          m.needsUpdate = true;
        }
      }
    });
  }, [sceneElements, textureMap]);

    // Setting initial position
    useEffect(() => {
        if (!active) setInitialMeshesPosition(meshes, before, POSITIONS)
    }, [])

    // Scene transitions : animate layers with stagger
    useEffect(() => {
        // Retrieve swap direction
        const direction = useExperienceStore.getState().direction

        // Scene becomes ACTIVE (arrives)
        if (active && !prevActive.current) {
            console.log(`[${name}] ACTIVE`)
            const startPos = direction === "FORWARD" ? POSITIONS[before] : POSITIONS[after]
            animateSceneLayers(meshes, startPos, POSITIONS.center, true, 0.4)
            prevActive.current = true
        }

        // Scene becomes INACTIVE (leaves)
        else if (!active && prevActive.current) {
            const endPos = direction === "FORWARD" ? POSITIONS[after] : POSITIONS[before]
            animateSceneLayers(meshes, POSITIONS.center, endPos, false, 0)
            prevActive.current = false
        }
    }, [active, meshes])
    
    useFrame(() => {
        updateSceneLayers(meshes, mousePointer, 0.1, true)
    })

    const handlePointerOver = (e) => {
        e.stopPropagation()
        if (e.object.name.startsWith('INT_')) {
            useCursorStore.getState().setIsHovering(true)
        }
    }

    const handlePointerOut = (e) => {
        if (e.object.name.startsWith('INT_')) {
            useCursorStore.getState().setIsHovering(false)
        }
    }

    const handleClick = (e) => {
        if (e.object.name.startsWith('INT_')) {
            console.log("obj :", e.object.name)
        }
    }

    return (
        <primitive 
            object={sceneElements} 
            name={name}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
        />
    )
}

useGLTF.preload = (url) => useGLTF.preload(url)