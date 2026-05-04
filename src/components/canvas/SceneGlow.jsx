import { useMemo, useLayoutEffect } from "react"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { SCENE_CONFIG } from "../../data/sceneConfig"

export function SceneGlow({ sceneElements }) {
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
    : ["/assets/images/emission/women_emissive2.png"]
  );

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
        const tex = textureMap[child.name]; 

        if (config && config.glow) {
          const m = child.material;
          // Si la texture n'est pas encore prête, on met l'intensité à 0
          m.emissiveMap = tex || null;
          m.emissiveIntensity = tex ? config.glow.emissiveIntensity : 0;
          m.emissive = new THREE.Color(config.glow.emissiveColor);
        
          // Important pour éviter le look "noir et blanc" sale
          m.color = m.color;
          m.toneMapped = false;
          m.transparent = true;
          m.needsUpdate = true;
        }
      }
    });
  }, [sceneElements, textureMap]);

  return null;
}