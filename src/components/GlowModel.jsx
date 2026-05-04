import React, { useLayoutEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE_CONFIG } from '../data/sceneConfig'

export function GlowModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  
  const textures = {}
  Object.keys(SCENE_CONFIG).forEach(key => {
    if(SCENE_CONFIG[key].glow) {
      textures[key] = useTexture(SCENE_CONFIG[key].glow.mask)
      textures[key].flipY = false
      textures[key].colorSpace = THREE.SRGBColorSpace
    }
  })

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const config = SCENE_CONFIG[child.name]
        
        if (config && config.glow) {
          child.material = child.material.clone()
          const m = child.material

          m.emissiveMap = textures[child.name] || null
          m.emissive = new THREE.Color(config.glow.emissiveColor)
          m.emissiveIntensity = config.glow.emissiveIntensity
          
          m.transparent = true
          m.opacity = config.glow.opacity ?? 1
          m.toneMapped = false 
          m.needsUpdate = true
        }
      }
    })
  }, [scene, textures]) 

  return <primitive object={scene} />
}