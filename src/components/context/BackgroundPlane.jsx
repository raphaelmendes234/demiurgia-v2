import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const ImageShader = {
	vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vUv = uv;
            vec3 pos = position;
            // Ondulation : on fait bouger les sommets en Z selon X et le temps
            pos.z += sin(pos.x * 5.0 + uTime * 2.0) * 0.05;
            pos.y += cos(pos.x * 2.0 + uTime) * 0.02;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
	fragmentShader: `
        varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform sampler2D uAlphaMap;
          uniform float uTime;
          uniform float uOpacity;
          uniform float uMaskScale;

          void main() {
            vec2 centeredUv = vUv - 0.5;
            vec2 scaledUv = (centeredUv / max(uMaskScale, 0.0001)) + 0.5;

            // --- ANIMATION DES BORDS ---
            // On ajoute une petite ondulation spécifique aux UV du masque
            // pour que les bords "bougent" comme du liquide ou de la fumée
            vec2 maskUv = scaledUv;
            maskUv.x += sin(maskUv.y * 10.0 + uTime) * 0.005;
            maskUv.y += cos(maskUv.x * 10.0 + uTime) * 0.005;

            vec4 tex = texture2D(uTexture, vUv);
            float rawMask = texture2D(uAlphaMap, maskUv).r;

            // --- DOUCEUR VIA SMOOTHSTEP ---
            // Au lieu d'un masque binaire (0 ou 1), on crée un dégradé.
            // On peut faire varier le seuil avec uTime pour un effet de "respiration"
            float borderSoftness = 0.15; // Plus c'est haut, plus c'est flou
            float threshold = 0.5 + sin(uTime * 0.5) * 0.02; 
            
            float alphaMask = smoothstep(threshold - borderSoftness, threshold + borderSoftness, rawMask);

            // Sécurité pour les bords du masque pendant le scale
            if(scaledUv.x < 0.0 || scaledUv.x > 1.0 || scaledUv.y < 0.0 || scaledUv.y > 1.0) {
              alphaMask = 0.0;
            }

            gl_FragColor = vec4(tex.rgb, tex.a * alphaMask * uOpacity);
          }
    `,
};

export function BackgroundPlane({ imagePath }) {
	const { viewport } = useThree();
	const meshRef = useRef();

	// Chargement des textures (image et masque)
	const [tex, alpha] = useTexture([
		imagePath,
		"/textures/context/alpha-mask.png",
	]);

	// Initialisation des uniforms
	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uTexture: { value: tex },
			uAlphaMap: { value: alpha },
			uOpacity: { value: 0 },
			uMaskScale: { value: 0 },
		}),
		[],
	);

	// Mise à jour des textures quand l'étape change
	useEffect(() => {
		if (!meshRef.current) return;

		// kill animations
		gsap.killTweensOf(uniforms.uOpacity);
		gsap.killTweensOf(uniforms.uMaskScale);

		uniforms.uTexture.value = tex;
		uniforms.uOpacity.value = 0;
		uniforms.uMaskScale.value = 0;

		const tl = gsap.timeline();

		gsap.to(uniforms.uOpacity, {
			value: 1,
			duration: 1.5,
			ease: "power2.inOut",
		});

		gsap.to(uniforms.uMaskScale, {
			value: 1,
			duration: 2,
			ease: "expo.out",
		});
	}, [tex, uniforms]);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.uniforms.uTime.value = state.clock.elapsedTime;
		}
	});

	return (
		<mesh position={[0, 0.5, -1]} scale={[viewport.width, viewport.height, 1]}>
			<planeGeometry args={[0.9, 0.9, 64, 64]} />
			<shaderMaterial
				ref={meshRef}
				transparent={true}
				uniforms={uniforms}
				vertexShader={ImageShader.vertexShader}
				fragmentShader={ImageShader.fragmentShader}
			/>
		</mesh>
	);
}
