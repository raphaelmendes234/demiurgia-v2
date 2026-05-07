import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { useExperienceStore, PHASES } from "../../stores/useExperienceStore";

const TentacleMaterial = shaderMaterial(
	{
		uTime: 0,
		uTexture: null,
		uColor: new THREE.Color("#7cffcb"),
		uThreshold: 0.1, // Sensibilité du masque
		uOpacity: 0,
		uScale: 1.5,
	},
	// Vertex Shader
	`
    varying vec2 vUv;
    uniform float uScale;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy * uScale, 0.0, 1.0);
    }
  `,
	// Fragment Shader
	`
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uThreshold;
  uniform float uOpacity;

  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

  void main() {
    vec2 distortedUv = vUv;
    float phase = vUv.x * 20.0; // plus 20.0 est haut plus il y a de bosses
    float wave = sin(vUv.y * 15.0 + uTime * 2.0 + phase) * 0.02;
    distortedUv.x += wave; 
    
    vec4 texColor = texture2D(uTexture, distortedUv);
    float influence = texColor.r; // On utilise le canal rouge comme masque
    
    if (influence < 0.01) discard;

    float alpha = smoothstep(uThreshold, uThreshold + 0.1, influence);
    
    gl_FragColor = vec4(uColor * (influence), (alpha + 0.25) * uOpacity);
  }
  `,
);

extend({ TentacleMaterial });

export const TentaclePlane = ({ textureUrl, ...props }) => {
	const phase = useExperienceStore((state) => state.phase);

	const meshRef = useRef();
	const materialRef = useRef();
	const texture = useTexture("/textures/end/tentacle-texture.png");

	// Animation entrande / out
	useEffect(() => {
		if (phase === PHASES.GAME || phase === PHASES.END) {
			gsap.to(materialRef.current, {
				uScale: 1.0,
				uOpacity: 0.5,
				duration: 2,
				ease: "power2.out",
			});
		} else {
			gsap.to(materialRef.current, {
				uScale: 1.5,
				uOpacity: 0,
				duration: 1.5,
				ease: "power2.in",
			});
		}
	}, [phase]);

	// Animation du temps
	useFrame((state) => {
		if (materialRef.current) {
			materialRef.current.uTime = state.clock.getElapsedTime();
		}
	});

	return (
		<mesh
			ref={meshRef}
			{...props}
			renderOrder={999}
			scale={[1.5, 1.5, 1.5]} // Valeur par défaut (caché)
		>
			<planeGeometry args={[2, 2]} />
			<tentacleMaterial
				ref={materialRef}
				uTexture={texture}
				transparent={true}
				depthWrite={false}
				depthTest={false}
			/>
		</mesh>
	);
};
