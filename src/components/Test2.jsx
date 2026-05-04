import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGlowStore } from "../stores/useGlowStore";
import * as THREE from "three";
import { GlowModel } from "./GlowModel";
import { folder, useControls } from "leva";
import { OrbitControls } from "@react-three/drei";

export default function Test2() {
  const settings = useControls({
    Modèle: folder({
      emissiveColor: "#0fd15d",
      emissiveIntensity: { value: 2.5, min: 0, max: 10, step: 0.1 },
      opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    }),
    Bloom: folder({
      bloomIntensity: { value: 2.5, min: 0, max: 5, step: 0.1 },
      bloomRadius: { value: 0.6, min: 0, max: 1, step: 0.01 },
      luminanceThreshold: { value: 0.7, min: 0, max: 2, step: 0.1 },
    }),
  });

  const inventory = useGlowStore((state) => state.inventory);
  const activeItem = inventory[0];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas gl={{ antialias: false }} camera={{ position: [0, 2, 5] }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.9} />

        <GlowModel
          modelPath={activeItem.model}
          maskPath={activeItem.mask}
          config={settings}
        />

        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={settings.bloomIntensity}
            radius={settings.bloomRadius}
            luminanceThreshold={settings.luminanceThreshold}
          />
        </EffectComposer>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
