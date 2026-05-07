import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import {
	useExperienceStore,
	PHASES,
	GAME_SCENES,
} from "../../stores/useExperienceStore";

export function FrameMask() {
	const materialRef = useRef();
	const phase = useExperienceStore((state) => state.phase);
	const gameIndex = useExperienceStore((state) => state.gameIndex);

	const alphaMap = useTexture("/textures/end/alpha-mask.png");

	const uniforms = useMemo(
		() => ({
			uAlphaMap: { value: alphaMap },
			uColor: { value: new THREE.Color("#000000") },
			uTime: { value: 0 },
			uIntensity: { value: 0.02 },
			uScale: { value: 1.0 }, // 1.0 = plein écran, > 1.0 = plus ouvert
		}),
		[alphaMap],
	);

	// Anim game
	useEffect(() => {
		if (phase === PHASES.GAME) {
			const progress = gameIndex / (GAME_SCENES.length - 1);
			// L'intensité augmente (de 0.02 à 0.12)
			// Le scale diminue (de 1.1 à 0.8 pour "serrer" le cadre)
			gsap.to(uniforms.uIntensity, {
				// value: 0.02 + progress * 0.1,
				value: 0.05,
				duration: 2,
				ease: "power2.out",
			});

			gsap.to(uniforms.uScale, {
				value: 1.0 + progress * 0.1,
				duration: 2,
				ease: "power2.out",
			});
		}
	}, [gameIndex, phase, uniforms]);

	// Anim fin
	useEffect(() => {
		if (phase === PHASES.END) {
			const tl = gsap.timeline({ delay: 1 });

			tl.to(uniforms.uIntensity, {
				value: 0.08,
				duration: 4,
				ease: "power1.inOut",
			});

			tl.to(
				uniforms.uScale,
				{
					value: 10.0,
					duration: 3,
					ease: "expo.in",
				},
				"<",
			);
		} else if (phase !== PHASES.GAME && phase !== PHASES.END) {
			gsap.to(uniforms.uIntensity, { value: 0.02, duration: 1 });
			gsap.to(uniforms.uScale, { value: 1.0, duration: 1 });
		}
	}, [phase, uniforms]);

	useFrame((state) => {
		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
		}
	});

	return (
		<mesh renderOrder={999} raycast={() => null}>
			<planeGeometry args={[2, 2]} />
			<shaderMaterial
				ref={materialRef}
				transparent={true}
				depthTest={false}
				uniforms={uniforms}
				vertexShader={`
					varying vec2 vUv;
					void main() {
						vUv = uv;
						gl_Position = vec4(position.xy, 0.0, 1.0);
					}
				`}
				fragmentShader={`
					varying vec2 vUv;
					uniform sampler2D uAlphaMap;
					uniform vec3 uColor;
					uniform float uIntensity;
					uniform float uScale;
					uniform float uTime;

					void main() {
						// On centre les UVs pour le scale
						vec2 centeredUv = (vUv - 0.5) * uScale + 0.5;
						
						vec2 distortedUv = centeredUv;
						float speed = uTime * 1.5;
						
						// Déformation organique
						distortedUv.x += sin(centeredUv.y * 10.0 + speed) * uIntensity;
						distortedUv.y += cos(centeredUv.x * 8.0 + speed * 0.8) * uIntensity;

						// On récupère le masque (blanc = visible/noir, noir = transparent)
						float mask = texture2D(uAlphaMap, distortedUv).r;

						// Gestion des bords du scale (évite les répétitions de texture)
						if(distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
							mask = 1.0;
						}
						
						gl_FragColor = vec4(uColor, mask);
					}
				`}
			/>
		</mesh>
	);
}
