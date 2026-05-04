import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

import { ScenesManager } from "./ScenesManager";
import { useControls } from "leva";

function CameraHandler() {
    const { camera } = useThree(); // Récupère l'instance réelle de la caméra
    
    const { xPosition, yPosition, zPosition, fov } = useControls("Camera", {
        xPosition: { value: 0.02, min: -5, max: 5, step: 0.001 },
        yPosition: { value: 0, min: -5, max: 5, step: 0.001 },
        zPosition: { value: 4.35, min: 0, max: 20, step: 0.001 },
        fov: { value: 21, min: 10, max: 120, step: 0.001 }
    });

    useEffect(() => {
        // On met à jour la position
        camera.position.x = xPosition;
        camera.position.y = yPosition;
        camera.position.z = zPosition;
        // On met à jour le FOV
        camera.fov = fov;
        // TRÈS IMPORTANT : On dit à Three.js de recalculer le rendu
        camera.updateProjectionMatrix();
    }, [xPosition, yPosition, zPosition, fov, camera]);

    return null; // Ce composant ne rend rien visuellement
}

export function Experience() {
    return (
        <>
            <Canvas
                camera={{ position: [0.02, 0, 4.35], fov: 21 }}
                onCreated={({ camera }) => { camera.lookAt(0.02, 0, -4.35) }}
            >
                <color attach="background" args={["#111"]} />
                <ambientLight intensity={1} color={"white"} />
                
                <CameraHandler />
                {/* <OrbitControls />  */}
                    
                {/* <Suspense fallback={null}>
                    <ScenesManager/>
                </Suspense> */}
            </Canvas>
        </>
    )
}