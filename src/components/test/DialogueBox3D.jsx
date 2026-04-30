import { Text, useTexture } from "@react-three/drei";
import { useRef } from "react";

export const DialogueBox3D = ({ name, text }) => {
  // Chargement de ton image
const texture = useTexture("/assets/ui/2.png");
  return (
    <group position={[0, -0.9, 0]}> {/* Positionné en bas de l'écran */}
      {/* LE CADRE (L'image blocText.png) */}
      <mesh>
        {/* L'image est large, on garde un ratio de 2:1 environ */}
        <planeGeometry args={[4.5, 2.2]} /> 
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          // Si ton image a un fond noir au lieu de transparent :
          // toneMapped={false}
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