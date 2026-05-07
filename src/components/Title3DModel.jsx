import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import "./material/SpectralMaterial.jsx";
import "./material/AuroraMaterial.jsx";

function AnimatedGroup({ children, position, rotation, scale = 1, delay = 0 }) {
  const groupRef = useRef();
  useFrame((state) => {
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
  const { viewport } = useThree();
  const spectralRefs = useRef([]);
  const auroraRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    spectralRefs.current.forEach((mat) => {
      if (mat) mat.uTime = t;
    });
    if (auroraRef.current) auroraRef.current.uTime = t;
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
      {...props}
      rotation={[-0.4, 0, 0]}
      dispose={null}
      position={[0, 0.5, 0]}
    >
      <mesh position={[0, 0, -0.1]} scale={[5, 2, 1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{
            uColor: { value: new THREE.Color("#282529") },
            uOpacity: { value: 0.5 },
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
              uDistortion={0.04}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </AnimatedGroup>
      ))}

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
          <mesh geometry={node.geometry}>
            <spectralMaterialImpl
              ref={(el) => spectralRefs.current.push(el)}
              transparent
              uAlpha={1}
              uDistortion={0.002}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </AnimatedGroup>
      ))}

      <mesh
        position={[0, 0, -0.01]}
        scale={[viewport.width, viewport.height, 1]}
      >
        <planeGeometry args={[1.2, 1.2, 64, 64]} />
        <auroraMaterialImpl
          ref={auroraRef}
          transparent
          uOpacity={0.4}
          uColorA="#7b00ff"
          uColorB="#01FDA9"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/intro/Logo3D-V4.glb");
