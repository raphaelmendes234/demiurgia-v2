import { Text, useTexture } from "@react-three/drei";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { useExperienceStore } from "../../stores/useExperienceStore";

const TextRevealShader = {
	uniforms: {
		uReveal: { value: 0 },
		uOpacity: { value: 0 },
		uColor: { value: new THREE.Color("black") },
	},
	vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
	fragmentShader: `
        varying vec2 vUv;
        uniform float uReveal;
        uniform float uOpacity;
        uniform vec3 uColor;

        // --- 1. FONCTION DE RANDOM ET NOISE ---
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f * f * (3.0 - 2.0 * f);

            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        void main() {
            // --- 2. CALCUL DU NOISE ---
            // Multiplier vUv change l'échelle du bruit (plus grand = plus de détails)
            float n = noise(vUv * 20.0); 
            
            // On centre le bruit (0.0 à 1.0 -> -0.5 à 0.5) et on gère la force (amplitude)
            float noiseOffset = (n - 0.5) * 0.4; 
            
            // On déforme la ligne de progression classique (vUv.x) avec le bruit
            float distortedX = vUv.x + noiseOffset;

            // --- 3. RECALCUL DU REVEAL ---
            // Comme le bruit déforme les bords, la valeur de uReveal (qui va de 0 à 1)
            // ne suffit plus à cacher ou afficher le texte à 100% sur les extrémités.
            // On élargit donc la plage d'action de uReveal.
            float mappedReveal = uReveal * 1.5 - 0.25;

            // Reveal en utilisant la coordonnée déformée
            float alpha = smoothstep(mappedReveal, mappedReveal - 0.1, distortedX);
            
            gl_FragColor = vec4(uColor, alpha * uOpacity);
        }
    `,
};

export function AnimatedText({ content }) {
	const isTransitioning = useExperienceStore((state) => state.isTransitioning);

	const groupRef = useRef();
	const textMaterialRef = useRef();
	const bgMaterialRef = useRef();
	const bgTexture = useTexture("/assets/images/context/context-box.png");

	const uniforms = useMemo(
		() => ({
			uOpacity: { value: 0 },
			uReveal: { value: 0 },
			uColor: { value: new THREE.Color(0x3a2f22) },
		}),
		[],
	);

	useEffect(() => {
		if (isTransitioning && groupRef.current) {
			gsap.to(groupRef.current.position, {
				y: -2,
				duration: 0.5,
				ease: "power2.in",
			});
		}
	}, [isTransitioning]);

	useEffect(() => {
		if (!groupRef.current) return;

		gsap.killTweensOf(uniforms);
		gsap.killTweensOf(groupRef.current.position);

		uniforms.uOpacity.value = 0;
		uniforms.uReveal.value = 0;
		if (bgMaterialRef.current) bgMaterialRef.current.opacity = 0;

		groupRef.current.position.y = -3;

		const tl = gsap.timeline();

		// Montée du bloc texte
		tl.to(
			groupRef.current.position,
			{
				y: -1.5,
				duration: 1.2,
				ease: "power3.out",
				delay: 0.8,
			},
			0.2,
		);

		// Animation fond
		tl.to(
			bgMaterialRef.current,
			{
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
			},
			0.2,
		);

		// Animation du texte
		tl.to(
			uniforms.uOpacity,
			{
				value: 1,
				duration: 1.5,
				ease: "power2.out",
			},
			0.2,
		);

		tl.to(
			uniforms.uReveal,
			{
				value: 1,
				duration: 4,
				ease: "power2.out",
			},
			0.5,
		);
	}, [content, uniforms]);

	return (
		<group ref={groupRef} position={[0, -1.5, 0]}>
			<mesh position={[0, 0, 0]}>
				<planeGeometry args={[4, 1.3, 1, 1]}></planeGeometry>
				<meshBasicMaterial
					ref={bgMaterialRef}
					map={bgTexture}
					transparent={true}
					opacity={0}
					depthWrite={false}
				/>
			</mesh>
			<Text
				position={[0, 0, 0.01]}
				fontSize={0.1}
				maxWidth={3}
				lineHeight={1.2}
				textAlign="center"
				font="/fonts/Cormorant-Bold.woff"
				anchorY="middle"
			>
				{content}
				<shaderMaterial
					ref={textMaterialRef}
					transparent
					uniforms={uniforms}
					vertexShader={TextRevealShader.vertexShader}
					fragmentShader={TextRevealShader.fragmentShader}
				/>
			</Text>
		</group>
	);
}
