import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useExperienceStore } from '../../stores/useExperienceStore'
import { gsap } from 'gsap'

const POSITIONS = {
    top:    { x: 0,   y: 10, z: 0 },
    bottom: { x: 0,   y: -10,z: 0 },
    left:   { x: -15, y: 0,  z: 0 },
    right:  { x: 15,  y: 0,  z: 0 },
    center: { x: 0,   y: 0,  z: 0 }
}

const animateMeshes = (meshes, offsetStart, offsetEnd, isEntering) => {
    // when the scene leaves, inverse animation order : foreground leaves first, then background
    const itemsToAnimate = isEntering ? meshes : [...meshes].reverse()

    itemsToAnimate.forEach((mesh, index) => {
        // Retrieve original pos
        const orig = mesh.userData.origPos
        // Place mesh to startPos
        mesh.position.set(orig.x + offsetStart.x, orig.y + offsetStart.y, orig.z + offsetStart.z)

        // Animation to finalPos
        gsap.to(mesh.position, {
            x: orig.x + offsetEnd.x, 
            y: orig.y + offsetEnd.y, 
            z: orig.z + offsetEnd.z,
            duration: 1.2,
            ease: isEntering ? 'power3.out' : 'power3.inOut',
            delay: index * 0.03
        })
    })
}

export function Scene({ name, glb, active, before = 'right', after = 'left' }) {
    const { scene } = useGLTF(glb)
    scene.rotation.y = Math.PI
    const groupRef = useRef()
    const prevActive = useRef(false)

    // Extract & prepare layers
    const { sceneElements, meshes } = useMemo(() => {
        const clone = scene.clone()
        const extractedMeshes = []
        
        clone.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                
                // Save layer original position
                child.userData.origPos = child.position.clone()
                extractedMeshes.push(child)
            }
        })
    
        // Sort by depth (z) : sort from the back (negative z) to the front (positive z)
        // This way the background animates first, and the foreground animates last.
        extractedMeshes.sort((a, b) => a.position.z - b.position.z)
    
        return { sceneElements: clone, meshes: extractedMeshes }
    }, [scene])

    // Intitialisation : if not active position set to before pos
    useLayoutEffect(() => {
        if (!active) {
            const offset = POSITIONS[before]
            meshes.forEach((mesh) => {
                const orig = mesh.userData.origPos
                mesh.position.set(
                    orig.x + offset.x, 
                    orig.y + offset.y, 
                    orig.z + offset.z
                )
            })
        }
    }, [active, before, meshes])

    // Scene transitions
    useEffect(() => {
        if (!groupRef.current) return

        // Retrieve swap direction
        const direction = useExperienceStore.getState().direction

        // Scene becomes ACTIVE (arrives)
        if (active && !prevActive.current) {
            console.log(`[${name}] ACTIVE`)

            if (direction === 'FORWARD') {
                // Come from a future position
                animateMeshes(meshes, POSITIONS[before], POSITIONS.center, true)
            } else if (direction === 'BACKWARD') {
                // Come back from a previous position
                animateMeshes(meshes, POSITIONS[after], POSITIONS.center, true)
            }
            
            prevActive.current = true
        }

        // Scene becomes INACTIVE (leaves)
        else if (!active && prevActive.current) {

            if (direction === 'FORWARD') {
                 // Leaves to a past position
                animateMeshes(meshes, POSITIONS.center, POSITIONS[after], false)
            } else if (direction === 'BACKWARD') {
                // Leaves to a future position
                animateMeshes(meshes, POSITIONS.center, POSITIONS[before], false)
            }

            prevActive.current = false
        }
    }, [active, name, before, after, meshes])
    
    return (
        <group ref={groupRef}>
            <primitive 
                object={sceneElements} 
                name={name}
            />
        </group>
    )
}

useGLTF.preload = (url) => useGLTF.preload(url)