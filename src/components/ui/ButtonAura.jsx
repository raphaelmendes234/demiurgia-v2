import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, AdditiveBlending, Color } from "three";
import { useTexture } from "@react-three/drei";

export const ButtonAura = ({
  // Texture
  hovered: externalHovered,
  url,
  onClick,

  // Animation
  rotationSpeed = 0.4,
  floatAmplitude = 0.05,
  floatSpeed = 0.9,

  // Shader texture (Effets internes)
  swirlStrength = 0.008,
  turbulenceStrength = 0.003,
  breatheStrength = 0.06,

  // Halo (Effet de Blur/Glow)
  haloColorInner = "#00ffae",
  haloColorOuter = "#00ffae",
  haloOpacity = 0.4,
  haloHoverBoost = 0.35,

  // Anneau
  ringColorA = "#00d9ae",
  ringColorB = "#00ffa8",
  ringOpacity = 0.35,
  ringSpeed = 0.3,

  // Hover
  hoverScale = 0.07,
  hoverBrightness = 0.25,
  hoverTintColor = "#00ffb3",
  hoverTintStrength = 0.3,

  // Groupe global (Inclinaison supprimée)
  groupRotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 0.9,
}) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(url);

  const isCurrentlyHovered =
    externalHovered !== undefined ? externalHovered : hovered;

  const toVec3 = (hex) => {
    const c = new Color(hex);
    return [c.r, c.g, c.b];
  };

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: 0 },
      uSwirlStrength: { value: swirlStrength },
      uTurbulenceStrength: { value: turbulenceStrength },
      uBreatheStrength: { value: breatheStrength },
      uHoverBrightness: { value: hoverBrightness },
      uHoverTint: { value: toVec3(hoverTintColor) },
      uHoverTintStrength: { value: hoverTintStrength },
    }),
    [texture],
  );

  const ringUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorA: { value: toVec3(ringColorA) },
      uColorB: { value: toVec3(ringColorB) },
      uOpacity: { value: ringOpacity },
      uRingSpeed: { value: ringSpeed },
    }),
    [],
  );

  const glowUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColorInner: { value: toVec3(haloColorInner) },
      uColorOuter: { value: toVec3(haloColorOuter) },
      uOpacity: { value: haloOpacity },
      uHoverBoost: { value: haloHoverBoost },
    }),
    [],
  );

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    uniforms.uTime.value = elapsed;
    ringUniforms.uTime.value = elapsed;
    glowUniforms.uTime.value = elapsed;

    const target = isCurrentlyHovered ? 1 : 0;
    const hoverVal =
      uniforms.uHover.value + (target - uniforms.uHover.value) * 0.06;

    uniforms.uHover.value = hoverVal;
    ringUniforms.uHover.value = hoverVal;
    glowUniforms.uHover.value = hoverVal;

    const floatY =
      position[1] + Math.sin(elapsed * floatSpeed) * floatAmplitude;
    const pulse = 1 + Math.sin(elapsed * 1.8) * 0.018 + hoverVal * hoverScale;

    // Mesh principal
    if (meshRef.current) {
      meshRef.current.rotation.z = -elapsed * rotationSpeed;
      meshRef.current.position.y = floatY;
      meshRef.current.scale.setScalar(pulse);
    }

    // Anneau
    if (ringRef.current) {
      ringRef.current.rotation.z = -elapsed * ringSpeed;
      ringRef.current.position.y = floatY;
    }

    // Halo
    if (glowRef.current) {
      glowRef.current.position.y = floatY;
      glowRef.current.scale.setScalar(1 + hoverVal * 0.1);
    }
  });

  return (
    <group rotation={groupRotation}>
      {/* Halo / Glow avec blur radial */}
      <mesh
        ref={glowRef}
        position={[position[0], position[1], position[2] - 0.1]}
      >
        <circleGeometry args={[scale * 1.2, 64]} />
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
              float glow = exp(-d * 5.5) * smoothstep(0.5, 0.0, d);
              float strength = uOpacity + uHover * uHoverBoost + sin(uTime * 1.6) * 0.05;
              vec3 col = mix(uColorInner, uColorOuter, d * 1.5);
              gl_FragColor = vec4(col, glow * strength);
            }
          `}
        />
      </mesh>

      {/* Mesh principal */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
        position={position}
      >
        <planeGeometry args={[scale, scale, 32, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={uniforms}
          side={DoubleSide}
          vertexShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uHover;
            void main() {
              vUv = uv;
              vec3 pos = position;
              float dist = length(pos.xy);
              float wave = sin(dist * 6.0 - uTime * 2.5) * 0.015;
              pos.z += wave * (1.0 - dist * 0.8);
              pos.z += uHover * sin(dist * 4.0 - uTime * 3.0) * 0.015;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform float uTime;
            uniform float uHover;
            uniform float uSwirlStrength;
            uniform float uTurbulenceStrength;
            uniform float uBreatheStrength;
            uniform float uHoverBrightness;
            uniform vec3 uHoverTint;
            uniform float uHoverTintStrength;
            void main() {
              vec2 uv = vUv;
              vec2 centered = uv - 0.5;
              float radius = length(centered);
              float angle  = atan(centered.y, centered.x);

              float swirl = sin(radius * 5.0 - uTime * 0.35) * uSwirlStrength;
              uv.x += cos(angle) * swirl;
              uv.y += sin(angle) * swirl;

              uv.x += sin(uv.y * 12.0 + uTime * 1.2) * uTurbulenceStrength;
              uv.y += cos(uv.x * 10.0 + uTime * 1.0) * uTurbulenceStrength;

              vec4 col = texture2D(uTexture, uv);
              float breathe = 1.0 + sin(uTime * 2.0) * uBreatheStrength + uHover * uHoverBrightness;
              col.rgb *= breathe;
              col.rgb = mix(col.rgb, col.rgb * uHoverTint * 1.3, uHover * uHoverTintStrength);

              gl_FragColor = col;
            }
          `}
        />
      </mesh>

      {/* Anneau */}
      <mesh
        ref={ringRef}
        position={[position[0], position[1], position[2] - 0.05]}
      >
        <ringGeometry args={[scale * 0.5, scale * 0.53, 128]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={ringUniforms}
          side={DoubleSide}
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
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uOpacity;
            uniform float uRingSpeed;
            void main() {
              vec2 c = vUv - 0.5;
              float a = atan(c.y, c.x);
              float norm = (a + 3.14159265) / 6.28318530;
              float arc1 = pow(sin((norm + uTime * uRingSpeed) * 6.28318) * 0.5 + 0.5, 5.0);
              float arc2 = pow(sin((norm - uTime * uRingSpeed * 0.68) * 6.28318 * 2.0) * 0.5 + 0.5, 8.0);
              float arc  = max(arc1 * 0.7, arc2 * 0.5);
              vec3 col = mix(uColorA, uColorB, norm);
              float alpha = arc * (uOpacity + uHover * 0.45);
              gl_FragColor = vec4(col, alpha);
            }
          `}
        />
      </mesh>
    </group>
  );
};
