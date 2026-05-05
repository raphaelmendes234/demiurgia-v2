import { useRef, useEffect, useMemo } from "react";
import { useTexture, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import CloseButtonIcon from "../ui/CloseButtonIcon";
import { hilbert2D } from "three/examples/jsm/utils/GeometryUtils.js";

const InfoPanelShader = {
	vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uFrequency;
        uniform float uAmplitude;

        void main() {
            vUv = uv;
            vec3 newPosition = position;

            // Ondulation sur l'axe X basée sur la position Y et le temps
            // On multiplie par (1.0 - uv.x) pour que le bord droit (uv.x = 1) reste fixe 
            // et que seul le bord gauche ondule.
            float wave = sin(position.y * uFrequency + uTime) * uAmplitude * (1.0 - uv.x);
      
            newPosition.x += wave;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
	fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uAlphaMap;
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
            float alpha = texture2D(uAlphaMap, vUv).r;
            if (alpha < 0.01) discard; 
            gl_FragColor = vec4(uColor, alpha * uOpacity);
        }
    `,
};

export const InfoPanel3D = ({
	isOpen,
	setIsOpen,
	characterName,
	characterInfo,
}) => {
	const { viewport } = useThree();
	const alphaMap = useTexture("/assets/images/frame.png");
	const groupRef = useRef();
	const meshRef = useRef();

	const panelWidth = viewport.width;
	const panelHeight = viewport.height;

	// Entrance / Out Animation
	useEffect(() => {
		if (groupRef.current) {
			const targetX = isOpen
				? viewport.width / 2 - panelWidth / 2
				: viewport.width / 2 + panelWidth / 2;
			gsap.to(groupRef.current.position, {
				x: targetX,
				duration: 0.8,
				ease: "power3.out",
				overwrite: "auto",
			});
		}
	}, [isOpen, viewport.width, panelWidth]);

	// Shader uniforms
	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uFrequency: { value: 10 },
			uAmplitude: { value: 0.5 },
			uAlphaMap: { value: alphaMap },
			uColor: { value: new THREE.Color("#1a1a1a").toArray() },
			uOpacity: { value: 0.9 },
		}),
		[alphaMap],
	);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.material.uniforms.uTime.value =
				state.clock.getElapsedTime() * 0.5;
		}
	});

	return (
		<group ref={groupRef} position={[viewport.width / 2 + panelWidth, 0, 0.5]}>
			<mesh ref={meshRef}>
				<planeGeometry args={[panelWidth, panelHeight]} />
				<shaderMaterial
					transparent
					depthWrite={false}
					uniforms={uniforms}
					vertexShader={InfoPanelShader.vertexShader}
					fragmentShader={InfoPanelShader.fragmentShader}
				/>

				<Html
					transform
					distanceFactor={3}
					position={[1.8, viewport.height / 2 - 0.3, 0.05]}
					style={{
						pointerEvents: isOpen ? "auto" : "none",
						width: "350px",
						height: panelHeight,
					}}
				>
					<div className="infoPanel-container">
						<button
							onClick={() => setIsOpen(false)}
							className="infoPanel-close-btn"
						>
							<CloseButtonIcon />
						</button>

						<div className="infoPanel-content">
							<h2 style={{ fontSize: "24px", margin: "10px 0" }}>
								{characterName}
							</h2>
							<p style={{ fontSize: "14px" }}>{characterInfo}</p>
						</div>
					</div>
				</Html>
			</mesh>
		</group>
	);
};
