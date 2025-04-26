'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function InteractiveStars() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.2;
      groupRef.current.rotation.x = mouse.y * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        });
      }}
    >
      <Stars 
        radius={300}
        depth={150}
        count={2000}
        factor={8}
        fade 
        speed={0.3}
      />
      <fog attach="fog" args={['#1a1a1a', 30, 150]} />
      <color attach="background" args={['#0a0a0a']} />
    </group>
  );
}

export default function BackgroundCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 8] }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#808080" />
      <InteractiveStars />
    </Canvas>
  );
}
