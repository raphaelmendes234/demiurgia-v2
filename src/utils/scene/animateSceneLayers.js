import { gsap } from "gsap"

/**
 * Animate an array of meshes stagger effect
 * @param {Array} meshes - Three js meshes list to animate
 * @param {Object} offsetStart - Relative start pos {x, y, z}
 * @param {Object} offsetEnd - Relative end pos {x, y, z}
 * @param {Boolean} isEntering - If scene enters or leaves
 * @param {Number} masterDelay - Global delay for animation start
 */

export const animateSceneLayers = (meshes, offsetStart, offsetEnd, isEntering, masterDelay = 0) => {
    if (!meshes || meshes.length === 0) return

    // when the scene leaves, inverse animation order : foreground leaves first, then background
    const itemsToAnimate = isEntering ? meshes : [...meshes].reverse()

    itemsToAnimate.forEach((mesh, index) => {
        const orig = mesh.userData.origPos
        if (!orig) return

        // Initial position (teleport)
        mesh.position.set(
            orig.x + offsetStart.x, 
            orig.y + offsetStart.y, 
            orig.z + offsetStart.z
        )

        // Position
        gsap.to(mesh.position, {
            x: orig.x + offsetEnd.x, 
            y: orig.y + offsetEnd.y, 
            z: orig.z + offsetEnd.z,
            duration: isEntering ? 1.4 : 1.0,
            ease: isEntering ? "power3.out" : "power2.inOut",
            delay: masterDelay + (index * 0.04) // Stagger fluide
        })

        // Opacity
        if (mesh.material) {
            mesh.material.transparent = true
            gsap.to(mesh.material, {
                opacity: isEntering ? 1 : 0,
                duration: 0.8,
                delay: masterDelay + (index * 0.04)
            })
        }
    })
}