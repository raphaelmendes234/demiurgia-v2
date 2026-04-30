import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import { ScenesManager } from "./ScenesManager";

export function Experience() {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 35 }}
                onCreated={({ camera }) => { camera.lookAt(0, 0, -0.5) }}
            >
                <color attach="background" args={["#111"]} />
                <ambientLight intensity={1} color={"white"} />
                    
                 <OrbitControls /> 
                    
                {/* <Suspense fallback={null}>
                    <ScenesManager/>
                </Suspense> */}
            </Canvas>
        </>
    )
}