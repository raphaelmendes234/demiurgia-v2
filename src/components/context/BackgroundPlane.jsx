import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, useTexture } from "@react-three/drei";
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
      pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.05;
      pos.z += sin(pos.x * 5.0 + uTime * 2.0) * 0.05;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
	fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uReveal; 
    uniform vec3 uColor;
	uniform float uOpacity;
    uniform float uBloomIntensity;
	uniform vec2 uPlaneRes;

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
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

	void main() {
		// --- LOGIQUE RATIO FIXE 16:9 ---
		float screenRatio = uPlaneRes.x / uPlaneRes.y;
		float targetRatio = 16.0 / 9.0;
		
		vec2 newUv = vUv;
		if (screenRatio > targetRatio) {
			// L'écran est plus large que le 16:9
			float scale = targetRatio / screenRatio;
			newUv.y = vUv.y * scale + (1.0 - scale) * 0.5;
		} else {
			// L'écran est plus étroit (ex: mobile portrait)
			float scale = screenRatio / targetRatio;
			newUv.x = vUv.x * scale + (1.0 - scale) * 0.5;
		}

		vec4 tex = texture2D(uTexture, newUv);

		// --- LA LOGIQUE ANTI-HALO ---
		float mask = tex.r; 
		float n = noise(newUv * 10.0);
		float revealMask = smoothstep(uReveal - 0.1, uReveal, n);
		
		// Calcul de l'alpha final (visibilité)
		float finalAlpha = mask * (1.0 - revealMask) * uOpacity;

		// On multiplie la couleur par l'intensité ET par l'alpha.
		// Si finalAlpha est 0 (pixel invisible), la couleur devient vec3(0,0,0).
		// Le Bloom ne verra alors RIEN à cet endroit, supprimant le halo fantôme.
		vec3 emissiveColor = uColor * uBloomIntensity * finalAlpha;

		gl_FragColor = vec4(emissiveColor, finalAlpha);
	}
  `,
};

export function BackgroundPlane({
	imagePath,
	color = "#ffffff",
	intensity = 2.0,
}) {
	const { viewport } = useThree();
	const meshRef = useRef();
	const tex = useTexture(imagePath);
	const sparklesRef = useRef();

	useEffect(() => {
		if (tex) {
			tex.colorSpace = THREE.SRGBColorSpace;
			tex.needsUpdate = true;
		}
	}, [tex]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uTexture: { value: tex },
			uReveal: { value: -0.5 },
			uOpacity: { value: 0 },
			uColor: { value: new THREE.Color(color) },
			uBloomIntensity: { value: intensity },
			uPlaneRes: { value: new THREE.Vector2(viewport.width, viewport.height) },
		}),
		[],
	);

	useEffect(() => {
		uniforms.uOpacity.value = 0;
		uniforms.uReveal.value = -0.5;
		uniforms.uTexture.value = tex;
		uniforms.uColor.value.set(color);
		uniforms.uBloomIntensity.value = intensity;

		const tl = gsap.timeline({ delay: 0.0 });

		tl.to(uniforms.uOpacity, {
			value: 1,
			duration: 0.1, // On rend l'objet "existant" mais uReveal le cache encore
		}).to(uniforms.uReveal, {
			value: 1.1,
			duration: 2.5,
			ease: "power2.out",
		});

		return () => tl.kill();
	}, [tex, color, intensity, uniforms]);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.uniforms.uTime.value = state.clock.elapsedTime;
			uniforms.uPlaneRes.value.set(state.viewport.width, state.viewport.height);
		}
	});

	return (
		<group position={[0, 0.9, -1]}>
			<Sparkles
				ref={sparklesRef}
				count={60}
				scale={[6, 4, 2]}
				size={2}
				speed={0.3}
				color="#9bc4ff"
				opacity={0.1}
			/>
			<mesh scale={[viewport.width, viewport.height, 1]}>
				<planeGeometry args={[1, 1, 64, 64]} />
				<shaderMaterial
					ref={meshRef}
					transparent={true}
					toneMapped={false}
					depthWrite={false}
					uniforms={uniforms}
					vertexShader={ImageShader.vertexShader}
					fragmentShader={ImageShader.fragmentShader}
				/>
			</mesh>
		</group>
	);
}
