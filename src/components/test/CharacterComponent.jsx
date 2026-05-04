import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sparkles } from '@react-three/drei';
import { CharacterMaterial } from './CharacterMaterial';

export const CharacterComponent = ({ imagePath }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath || "");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  if (!imagePath) return null;

  return (
    <group position={[0, 0.1, 0]}>
      <Sparkles count={60} scale={[3, 5, 2]} size={9} speed={0.3} color="#ffe082" opacity={0.6} />
      <mesh ref={meshRef} scale={[3, 3, 1]}>
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