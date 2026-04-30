import { useGameStore } from "../../stores/useGameStore";

export const CharacterTarget = ({ id, position, color }) => {
  const openDialogue = useGameStore((state) => state.openDialogue);

  return (
    <mesh 
      position={position} 
      onClick={(e) => {
        e.stopPropagation(); 
        openDialogue(id);
      }}
    >
      <capsuleGeometry args={[0.5, 1, 4, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};