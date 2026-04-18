import { Canvas } from '@react-three/fiber';
import { Debug } from './components/Debug';
import { Experience } from './components/canvas/Experience';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Debug */}
      <Debug />

      {/* 3D */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.5} />
        
        <OrbitControls />
        
        <Experience />
      </Canvas>
    </div>
  );
}