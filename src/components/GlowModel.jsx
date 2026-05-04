import React, { useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

export function GlowModel({ modelPath, maskPath, config }) {
  const { scene } = useGLTF(modelPath)
  const emissionMap = useTexture(maskPath)
  emissionMap.flipY = false 

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissiveMap = emissionMap
        child.material.emissive = new THREE.Color(config.emissiveColor)
        child.material.emissiveIntensity = config.emissiveIntensity
        child.material.transparent = true
        child.material.opacity = config.opacity
        child.material.toneMapped = false 
      }
    })
  }, [scene, emissionMap, config]) 

  return <primitive object={scene} />
}