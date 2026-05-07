import { Text, useTexture } from "@react-three/drei";
import { useRef } from "react";

export const DialogueBox3D = ({ name, text }) => {
const texture = useTexture("/assets/ui/dialogue_character.png");
  return (
    <group position={[0, -0.9, 0]}> {/* Positionné en bas de l'écran */}
      <mesh scale={0.9}>
        <planeGeometry args={[4, 2]} /> 
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
        />
      </mesh>

      <Text
        position={[-1.5, 0.7, 0.01]}
        fontSize={0.18}
        color="#ff0000"
        anchorX="left"
      >
        {name}
      </Text>

      {/* LE CORPS DU TEXTE */}
      <Text
        position={[0, -0.1, 0.01]}
        fontSize={0.14}
        color="white"
        maxWidth={3.5}
        lineHeight={1.2}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};