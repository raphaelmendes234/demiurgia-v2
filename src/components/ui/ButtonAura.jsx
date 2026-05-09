import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color } from "three";

export const ButtonAura = ({
  hovered = false,
  scale = 2.5,
  colorInner = "#91fbcf",
  colorOuter = "#8de8db",
  ringColor = "#91fbcf",
  speed = 0.3,
}) => {
  const ringRef = useRef();
  const glowRef = useRef();

  const toVec3 = (hex) => {
    const c = new Color(hex);
    return [c.r, c.g, c.b];
  };

  // Uniforms mémorisés pour la performance
  const glowUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorInner: { value: toVec3(colorInner) },
      uColorOuter: { value: toVec3(colorOuter) },
      uOpacity: { value: 0.15 },
      uHoverBoost: { value: 0.25 },
    }),
    [],
  );

  const ringUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorA: { value: toVec3(ringColor) },
      uColorB: { value: toVec3(colorInner) },
      uOpacity: { value: 0.3 },
      uRingSpeed: { value: 0.4 },
    }),
    [],
  );

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const t = hovered ? 1 : 0;

    glowUniforms.uHover.value += (t - glowUniforms.uHover.value) * 0.1;
    ringUniforms.uHover.value += (t - ringUniforms.uHover.value) * 0.1;

    glowUniforms.uTime.value = elapsed * speed;
    ringUniforms.uTime.value = elapsed * speed;

    if (ringRef.current) {
      ringRef.current.rotation.z = -elapsed * speed;
    }
  });

  return (
    <group scale={scale} position={[0, 0, 1.5]}>
      {/* Le Halo (Brouillard) */}
      <mesh ref={glowRef}>
        <circleGeometry args={[1, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={glowUniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uHover;
            uniform vec3 uColorInner;
            uniform vec3 uColorOuter;
            uniform float uOpacity;
            uniform float uHoverBoost;
            void main() {
              float d = length(vUv - 0.5);
              float glow = smoothstep(0.5, 0.2, d);
              glow *= uOpacity + uHover * uHoverBoost + sin(uTime * 1.5) * 0.05;
              vec3 col = mix(uColorInner, uColorOuter, d * 2.0);
              gl_FragColor = vec4(col, glow);
            }
          `}
        />
      </mesh>

      {/* L'Anneau (Ring) */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.85, 0.9, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={ringUniforms}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uHover;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uOpacity;
            void main() {
              vec2 c = vUv - 0.5;
              float a = atan(c.y, c.x);
              float norm = (a + 3.14159) / 6.28318;
              float arc = pow(sin((norm + uTime * 0.5) * 6.28318) * 0.5 + 0.5, 4.0);
              vec3 col = mix(uColorA, uColorB, norm);
              gl_FragColor = vec4(col, arc * (uOpacity + uHover * 0.4));
            }
          `}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
        />
      </mesh>
    </group>
  );
};
