import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export function BackgroundPlane() {
	const auroraRef = useRef();

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (auroraRef.current) auroraRef.current.uTime = t;
	});

	return (
		<>
			{/* BACKGROUND PLANE */}
			<mesh position={[0, 0, -1.1]} scale={[4, 4, 1]}>
				<planeGeometry args={[1.2, 1.2, 64, 64]} />
				<auroraMaterialImpl
					ref={auroraRef}
					transparent
					uOpacity={0.1}
					uColorA="#7b00ff"
					uColorB="#01FDA9"
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>
		</>
	);
}
