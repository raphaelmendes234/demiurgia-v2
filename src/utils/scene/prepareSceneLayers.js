/**
 * Prepare GLTF scene by isolating meshes and saving their inital position  by sorting them by depth (z)
 * @param {Object} scene - Original scene from useGLTF
 * @returns {Object} { sceneElements: scene clone, meshes: sorted meshes array }
 */

export const prepareSceneLayers = (scene) => {
    const clone = scene.clone()
    const extractedMeshes = []
    
    clone.traverse((child) => {
        if (child.isMesh) {
            // Base configuration
            child.castShadow = true
            child.receiveShadow = true
            
            // Transparence security
            if (child.material) {
                child.material.transparent = true
            }
            
            // Save layer original position
            child.userData.origPos = child.position.clone()
            child.userData.transitionOffset = { x: 0, y: 0, z: 0 }
            extractedMeshes.push(child)
        }
    })

    // Sort by depth (z) : sort from the back (negative z) to the front (positive z)
    // This way the background animates first, and the foreground animates last.
    extractedMeshes.sort((a, b) => a.position.z - b.position.z)

    // Normalize z depth to [0, 1] — furthest mesh gets 0, closest gets 1.
    const zValues = extractedMeshes.map((m) => m.userData.origPos.z)
    const minZ = Math.min(...zValues)
    const maxZ = Math.max(...zValues)
    const range = maxZ - minZ || 1

    extractedMeshes.forEach((mesh) => {
        // mesh.userData.parallaxFactor = (mesh.userData.origPos.z - minZ) / range
        mesh.userData.parallaxFactor = (maxZ - mesh.userData.origPos.z) / range // inverted
    })

    return { sceneElements: clone, meshes: extractedMeshes }
}