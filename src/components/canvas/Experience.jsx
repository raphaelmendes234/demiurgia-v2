import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls, folder } from "leva";

import { CameraHandler } from "../CameraHandler";
import { ScenesManager } from "./ScenesManager";
import { DialogueSystem } from "../character/DialogueSystem";
import { FrameMask } from "./FrameMask";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function Experience() {
	return (
		<>
			<DialogueSystem />

			<Canvas camera={{ position: [0.02, 0, 4.35], fov: 21 }}>
				<color attach="background" args={["#111"]} />
				<ambientLight intensity={0.8} color={"white"} />

				<CameraHandler />

				<Suspense fallback={null}>
					<ScenesManager />
					<FrameMask />
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
