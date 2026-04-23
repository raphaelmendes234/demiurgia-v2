import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useExperienceStore } from "../../stores/useExperienceStore"
import { gsap } from "gsap"
import { animateSceneLayers, prepareSceneLayers, setInitialMeshesPosition } from "../../utils/scene"

const POSITIONS = {
    top:    { x: 0,   y: 5, z: 0 },
    bottom: { x: 0,   y: -5,z: 0 },
    left:   { x: -5, y: 0,  z: 0 },
    right:  { x: 5,  y: 0,  z: 0 },
    center: { x: 0,   y: 0,  z: 0 }
}

export function Scene({ name, glb, active, before = "right", after = "left" }) {
    const { scene } = useGLTF(glb)
    scene.rotation.y = Math.PI
    const prevActive = useRef(false)

    // Prepare and clone scene pour isolation des calques
    const { sceneElements, meshes } = useMemo(() => prepareSceneLayers(scene), [scene])

    // Security : if not active position meshes position set to before pos
    useLayoutEffect(() => {
        if (!active) setInitialMeshesPosition(meshes, before, POSITIONS)
    }, [active, before, meshes])

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
    }, [active, meshes, before, after])
    
    return (
        <primitive 
            object={sceneElements} 
            name={name}
        />
    )
}

useGLTF.preload = (url) => useGLTF.preload(url)