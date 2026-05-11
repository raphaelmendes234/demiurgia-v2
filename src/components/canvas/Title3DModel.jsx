import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

import { useExperienceStore, PHASES } from "../../stores/useExperienceStore";

import "../material/AuroraMaterial.jsx";
import "../material/SpectralMaterial.jsx";

function AnimatedGroup({ children, position, rotation, scale = 1, delay = 0 }) {
	const groupRef = useRef();

	useFrame((state) => {
		if (useExperienceStore.getState().phase !== PHASES.MENU) return;
		const t = state.clock.getElapsedTime();
		if (groupRef.current) {
			groupRef.current.position.y =
				position[1] + Math.sin(t * 1.5 + delay) * 0.04;
			groupRef.current.rotation.z = Math.sin(t * 0.8 + delay) * 0.015;
		}
	});
	return (
		<group ref={groupRef} position={position} rotation={rotation} scale={scale}>
			{children}
		</group>
	);
}

export default function Title3DModel(props) {
	const { nodes } = useGLTF("/models/menu/Logo3D-V4.glb");
	const phase = useExperienceStore((state) => state.phase);

	const { viewport } = useThree();

	const mainGroupRef = useRef();
	const spectralRefs = useRef([]);
	const backgroundMatRef = useRef();

	useEffect(() => {
		const isMenu = phase === PHASES.MENU;

		// Animation position groupe entier
		gsap.to(mainGroupRef.current.position, {
			y: isMenu ? 0.3 : -0.2,
			duration: 2,
			ease: "power3.inOut",
		});

		// Animation opacité dégradé de fond
		if (backgroundMatRef.current) {
			gsap.to(backgroundMatRef.current.uniforms.uOpacity, {
				value: isMenu ? 0.5 : 0,
				duration: 1,
			});
		}

		// Animation opacité (uAlpha) des lettres
		spectralRefs.current.forEach((mat) => {
			if (mat) {
				gsap.to(mat, {
					uDissolve: isMenu ? 0 : 1,
					duration: 2.5,
					ease: "none",
				});
			}
		});
	}, [phase]);

	useFrame((state) => {
		if (phase !== PHASES.MENU) return;
		const t = state.clock.getElapsedTime();
		spectralRefs.current.forEach((mat) => {
			if (mat) mat.uTime = t;
		});
	});

	const letters = [
		{ body: nodes.A_1, edge: nodes.A_2, pos: [2.079, -0.374, 0], delay: 0 },
		{ body: nodes.I_1, edge: nodes.I_2, pos: [1.675, -0.249, 0], delay: 0.2 },
		{ body: nodes.G_1, edge: nodes.G_2, pos: [1.005, -0.622, 0], delay: 0.4 },
		{ body: nodes.R_1, edge: nodes.R_2, pos: [0.797, -0.34, 0], delay: 0.6 },
		{ body: nodes.U_1, edge: nodes.U_2, pos: [0, -0.499, 0], delay: 0.8 },
		{ body: nodes.I2, edge: nodes.I2_1, pos: [-0.205, -0.249, 0], delay: 1 },
		{ body: nodes.M_1, edge: nodes.M_2, pos: [-0.724, -0.326, 0], delay: 1.2 },
		{ body: nodes.E_1, edge: nodes.E_2, pos: [-1.385, -0.493, 0], delay: 1.4 },
		{ body: nodes.D_1, edge: nodes.D_2, pos: [-1.977, -0.02, 0], delay: 1.6 },
	];

	return (
		<group
			ref={mainGroupRef}
			{...props}
			rotation={[-0.4, 0, 0]}
			dispose={null}
			position={[0, -0.2, 0.9]}
			scale={[0.4, 0.4, 0.4]}
		>
			{/* DÉGRADÉ */}
			<mesh position={[0, 0, -0.1]} scale={[5, 2, 1]}>
				<planeGeometry args={[2, 2]} />
				<shaderMaterial
					ref={backgroundMatRef}
					transparent
					depthWrite={false}
					uniforms={{
						uColor: { value: new THREE.Color("#282529") },
						uOpacity: { value: 0 },
					}}
					vertexShader={`
						varying vec2 vUv;
						void main() {
							vUv = uv;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
						`}
					fragmentShader={`
						varying vec2 vUv;
						uniform vec3 uColor;
						uniform float uOpacity;
						void main() {
							// Calcul de la distance par rapport au centre (0.5, 0.5)
							float dist = distance(vUv, vec2(0.5));
							// Création d'un dégradé radial doux
							float mask = smoothstep(0.5, 0.2, dist);
							gl_FragColor = vec4(uColor, mask * uOpacity);
						}
						`}
				/>
			</mesh>

			{/* LETTRES */}
			{letters.map((item, index) => (
				<AnimatedGroup
					key={index}
					position={item.pos}
					rotation={[Math.PI / 2, 0, 0]}
					delay={item.delay}
				>
					<mesh geometry={item.body.geometry}>
						<spectralMaterialImpl
							ref={(el) => (spectralRefs.current[index * 2] = el)}
							transparent
							uAlpha={1}
							uDissolve={1}
							uDistortion={0.03}
							depthWrite={false}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>
					<mesh geometry={item.edge.geometry}>
						<spectralMaterialImpl
							ref={(el) => (spectralRefs.current[index * 2 + 1] = el)}
							transparent
							uAlpha={1}
							uDissolve={1}
							uDistortion={0.04}
							depthWrite={false}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>
				</AnimatedGroup>
			))}

			{/* POINT DU I */}
			{[
				nodes.Main_1,
				nodes.Main_2,
				nodes.Second_1,
				nodes.Second_2,
				nodes.Third_1,
				nodes.Third_2,
			].map((node, i) => (
				<AnimatedGroup
					key={i}
					position={[-0.38, 0.04, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={15}
				>
					<mesh geometry={node.geometry} renderOrder={999}>
						<spectralMaterialImpl
							ref={(el) => (spectralRefs.current[letters.length * 2 + i] = el)}
							transparent
							uAlpha={1}
							uDissolve={1}
							uDistortion={0.002}
							depthWrite={false}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>
				</AnimatedGroup>
			))}
		</group>
	);
}

useGLTF.preload("/models/intro/Logo3D-V4.glb");
