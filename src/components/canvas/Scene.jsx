import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useExperienceStore } from '../../stores/useExperienceStore'
import { gsap } from 'gsap'

const POSITIONS = {
    top:    { x: 0,   y: 5,  z: 0 },
    bottom: { x: 0,   y: -5, z: 0 },
    left:   { x: -5, y: 0,   z: 0 },
    right:  { x: 5,  y: 0,   z: 0 },
    center: { x: 0,   y: 0,   z: 0 }
}

const animatePosition = (target, startPos, endPos) => {
    
    target.current.position.set(startPos.x, startPos.y, startPos.z)
    
    gsap.to(target.current.position, {
        x: endPos.x, y: endPos.y, z: endPos.z,
        duration: 1.5,
        ease: "power2.out"
    })
}

export function Scene({ name, glb, active, before = 'right', after = 'left' }) {
    const { scene } = useGLTF(glb)
    const groupRef = useRef()
    const prevActive = useRef(false)

    // Intitialisation : if not active position set to befor pos
    useLayoutEffect(() => {
        if (!groupRef.current) return
        
        if (!active) {
            const startPos = POSITIONS[before]
            groupRef.current.position.set(startPos.x, startPos.y, startPos.z)
        }
    }, [])

    // Scene transition
    useEffect(() => {
        if (!groupRef.current) return

        // If active : 
        if (active && !prevActive.current) {
            console.log(`[ACTIVE] ${name}`)

            // Retrieve swap direction
            const direction = useExperienceStore.getState().direction

            if (direction === 'FORWARD') {
                // Come from a future position
                animatePosition(groupRef, POSITIONS[before], POSITIONS.center)
            
            } else if (direction === 'BACKWARD') {
                // Come back from a previous position
                animatePosition(groupRef, POSITIONS[after], POSITIONS.center)
            }
            
            prevActive.current = true
        }

        // If inactive
        else if (!active && prevActive.current) {

            const direction = useExperienceStore.getState().direction

            if (direction === 'FORWARD') {
                // Leaves to a past position
                animatePosition(groupRef, groupRef.current.position, POSITIONS[after])

            } else if (direction === 'BACKWARD') {
                // Leaves to a future position
                animatePosition(groupRef, groupRef.current.position, POSITIONS[before])
            }

            prevActive.current = false
        }
    }, [active, name])

    const sceneElements = useMemo(() => {
        const clone = scene.clone()
        
        clone.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    
        return clone
    }, [scene])

    
    return (
        <group ref={groupRef}>
            <primitive 
                object={sceneElements} 
                name={name}
                // onPointerOver={handlePointerOver}
                // onPointerOut={handlePointerOut}
                // onClick={handleClick}
            />
        </group>
    )
}

useGLTF.preload = (url) => useGLTF.preload(url)



// TODO APRES : INTERACTIONS
// --- Gestionnaires d'événements ---

//   const handlePointerOver = (e) => {
//     // e.stopPropagation() empêche le clic de traverser l'objet pour toucher ceux derrière
//     e.stopPropagation()
//     const obj = e.object
    
//     if (obj.name.startsWith('INT_')) {
//       console.log(`Survol de : ${obj.name}`, obj)
//       document.body.style.cursor = 'pointer'
//       if (onHover) onHover(obj.name)
//     }
//   }

//   const handlePointerOut = (e) => {
//     if (e.object.name.startsWith('INT_')) {
//       document.body.style.cursor = 'auto'
//       // On peut passer null à onHover pour signaler qu'on ne survol plus rien
//       if (onHover) onHover(null) 
//     }
//   }

//   const handleClick = (e) => {
//     e.stopPropagation()
//     const obj = e.object
//     console.log(`Clic sur : ${obj.name}`, obj)

//     // if (obj.name.startsWith('INT_')) {
//     //   console.log(`Clic sur : ${obj.name}`, obj)
//     //   if (onClick) onClick(obj.name)
//     // }
//   }