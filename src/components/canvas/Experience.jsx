import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ScenesManager } from "./ScenesManager";

export function Experience() {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0.1, 0.5], fov: 75 }}
                onCreated={({ camera }) => { camera.lookAt(0, 0.1, -0.5) }}
            >
                <color attach="background" args={["#111"]} />
                <ambientLight intensity={1} color={"white"} />
                    
                {/* <OrbitControls /> */}
                    
                <Suspense fallback={null}>
                    <ScenesManager/>
                </Suspense>
            </Canvas>
        </>
    )
}