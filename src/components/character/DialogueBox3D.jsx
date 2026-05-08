import { Text, useTexture } from "@react-three/drei";
import { useRef } from "react";

export const DialogueBox3D = ({ name, text, isObject }) => {
	const textures = useTexture({
		character: "/assets/ui/dialogue_character.png",
		object: "/assets/ui/dialogue_item.png", // Ta nouvelle texture
	});

	const activeTexture = isObject ? textures.object : textures.character;

	return (
		<group position={[0, -0.9, 0]}>
			{" "}
			{/* Positionné en bas de l'écran */}
			<mesh scale={0.9}>
				<planeGeometry args={[4, 2]} />
				<meshBasicMaterial map={activeTexture} transparent={true} />
			</mesh>
			<Text
				position={[0, 0.71, 0.01]}
				font="/fonts/CinzelDecorative-Black.woff"
				fontSize={0.16}
				color="#8BCBB2"
				anchorX="center"
			>
				{name}
			</Text>
			{/* LE CORPS DU TEXTE */}
			<Text
				position={[0, -0.1, 0.01]}
				fontSize={0.14}
				font="/fonts/Cormorant-Bold.woff"
				color="white"
				maxWidth={3}
				lineHeight={1.2}
				textAlign="center"
				anchorX="center"
			>
				{text}
			</Text>
		</group>
	);
};
