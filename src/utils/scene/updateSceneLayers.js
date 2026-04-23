export const updateSceneLayers = (meshes, pointer, parallaxStrength = 1, applyParallax = true) => {
    for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i]
        const { origPos, transitionOffset, parallaxFactor } = mesh.userData

        const px = pointer.x * parallaxFactor * parallaxStrength
        const py = pointer.y * parallaxFactor * parallaxStrength

        mesh.position.set(
            origPos.x + transitionOffset.x + px * 0.05,
            origPos.y + transitionOffset.y + py * 0.05,
            origPos.z + transitionOffset.z
        )
    }
}