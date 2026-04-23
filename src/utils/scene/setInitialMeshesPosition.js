/**
 * Reset meshes position without animation (for initial layout)
 */
export const setInitialMeshesPosition = (meshes, offsetName, positionsMap) => {
    const offset = positionsMap[offsetName]

    meshes.forEach((mesh) => {
        const orig = mesh.userData.origPos
        const transitionOffset = mesh.userData.transitionOffset
        transitionOffset.x = offset.x
        transitionOffset.y = offset.y
        transitionOffset.z = offset.z
    })
}