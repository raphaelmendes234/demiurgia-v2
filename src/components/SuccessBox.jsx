import { useSoundStore } from "../stores/useSoundStore"

// components/SuccessBox.jsx
export function SuccessBox(props) {
  const playSuccess = useSoundStore((state) => state.playSuccess)

  return (
    <mesh 
      {...props}
      // On utilise onPointerDown pour être synchro avec le GlobalSoundController
      onPointerDown={(e) => {
        e.stopPropagation() 
        playSuccess()
      }}
    >
      <boxGeometry />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}