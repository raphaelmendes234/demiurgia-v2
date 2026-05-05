import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import { CharacterMaterial } from "./CharacterMaterial";

export const CharacterComponent = ({ imagePath }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath || "");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  if (!imagePath) return null;

  const width = texture.image?.width || 1;
  const height = texture.image?.height || 1;
  const ratio = width / height;

  const TARGET_AREA = 9;
  const MAX_DIMENSION = 6;

  // Calcul basé sur l'aire : Area = (h * ratio) * h => h = sqrt(Area / ratio) FAUT PAS FAIRE DE MATH HEEIN
  let h = Math.sqrt(TARGET_AREA / ratio);
  let w = h * ratio;

  if (h > MAX_DIMENSION) {
    h = MAX_DIMENSION;
    w = h * ratio;
  }
  if (w > MAX_DIMENSION) {
    w = MAX_DIMENSION;
    h = w / ratio;
  }

  const finalScale = [w, h, 1];
  return (
    <group position={[0, 0.1, 0]}>
      <Sparkles
        count={60}
        scale={[3, 1, 2]}
        size={9}
        speed={0.3}
        color="#0fd15d"
        opacity={0.6}
      />
      <mesh ref={meshRef} scale={finalScale}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          args={[CharacterMaterial]}
          uniforms-uTexture-value={texture}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
