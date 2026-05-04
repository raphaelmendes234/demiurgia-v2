import { gsap } from "gsap"

/**
 * Animate an array of meshes stagger effect
 * @param {Array} meshes - Three js meshes list to animate
 * @param {Object} offsetStart - Relative start pos {x, y, z}
 * @param {Object} offsetEnd - Relative end pos {x, y, z}
 * @param {Boolean} isEntering - If scene enters or leaves
 * @param {Number} masterDelay - Global delay for animation start
 */

export const animateSceneLayers = (meshes, offsetStart, offsetEnd, isEntering, masterDelay = 0, onComplete) => {
    if (!meshes || meshes.length === 0) {
        if (onComplete) onComplete();
        return;
    }
    
    // when the scene leaves, inverse animation order : foreground leaves first, then background
    const itemsToAnimate = isEntering ? meshes : [...meshes].reverse()

    itemsToAnimate.forEach((mesh, index) => {
        const orig = mesh.userData.origPos
        const transitionOffset = mesh.userData.transitionOffset

        // Force initial position
        gsap.set(transitionOffset, {
            x: offsetStart.x,
            y: offsetStart.y,
            z: offsetStart.z
        })

        // Position
        gsap.to(transitionOffset, {
            x: offsetEnd.x, 
            y: offsetEnd.y, 
            z: offsetEnd.z,
            duration: isEntering ? 1.4 : 1.0,
            ease: isEntering ? "power3.out" : "power2.inOut",
            delay: masterDelay + (index * 0.04), // Stagger fluide
            onComplete: () => {
                // On n'appelle le onComplete que pour le DERNIER mesh de la liste
                if (index === itemsToAnimate.length - 1 && onComplete) {
                    onComplete();
                }
            }
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