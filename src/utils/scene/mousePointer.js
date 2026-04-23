/**
 * Shared mouse pointer, normalized to [-1, 1] with Y pointing up
 * Tracked at the window level so DOM overlays above the canvas like the
 * menu screen don't block updates
 */

export const mousePointer = { x: 0, y: 0 }

if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
        mousePointer.x = -((e.clientX / window.innerWidth) * 2 - 1)
        mousePointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }, { passive: true })
}
