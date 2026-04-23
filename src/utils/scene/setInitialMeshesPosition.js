/**
 * Reset meshes position without animation (for initial layout)
 */
export const setInitialMeshesPosition = (meshes, offsetName, positionsMap) => {
    const offset = positionsMap[offsetName]

    meshes.forEach((mesh) => {
        const orig = mesh.userData.origPos
        mesh.position.set(
            orig.x + offset.x, 
            orig.y + offset.y, 
            orig.z + offset.z
        )
    })
}