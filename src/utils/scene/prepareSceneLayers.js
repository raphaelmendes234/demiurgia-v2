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
            extractedMeshes.push(child)
        }
    })

    // Sort by depth (z) : sort from the back (negative z) to the front (positive z)
    // This way the background animates first, and the foreground animates last.
    extractedMeshes.sort((a, b) => a.position.z - b.position.z)

    return { sceneElements: clone, meshes: extractedMeshes }
}