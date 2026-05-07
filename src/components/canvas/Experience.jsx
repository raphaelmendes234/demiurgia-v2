import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls, folder } from "leva";

import { DialogueSystem } from "../character/DialogueSystem";
import { CameraHandler } from "../CameraHandler";
import { ScenesManager } from "./ScenesManager";
import { TentaclePlane } from "./TentacleShader";
import Title3DModel from "./Title3DModel";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BackgroundPlane } from "./BackgroundPlane";

export function Experience() {
	return (
		<>
			<DialogueSystem />

			<Canvas camera={{ position: [0.02, 0, 4.35], fov: 21 }}>
				<color attach="background" args={["#111"]} />
				<ambientLight intensity={0.8} color={"white"} />

				<CameraHandler />

				<Suspense fallback={null}>
					<Title3DModel />
					<BackgroundPlane />
					<ScenesManager />
					<TentaclePlane />
				</Suspense>

				<EffectComposer>
					<Bloom
						mipmapBlur
						intensity={3.0}
						radius={0.6}
						luminanceThreshold={0.8}
					/>
				</EffectComposer>
			</Canvas>
		</>
	);
}
