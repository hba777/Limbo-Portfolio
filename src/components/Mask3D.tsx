import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Mask3D() {
  const groupRef = useRef<THREE.Group>(null);

  const { scene: mask } = useGLTF('/models/AnonMask.glb');

  // Add color to the mask
  useEffect(() => {
    mask.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'white', // You can change this color to any hex color
          metalness: 0.7,
          roughness: 0.2,
        });
      }
    });
  }, [mask]);

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      
      // Slow constant rotation
      groupRef.current.rotation.y += 0.2 * state.clock.getDelta(); 

      // Gentle tilting left and right
      groupRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.1; // slight x tilt
      groupRef.current.rotation.z = Math.sin(elapsed * 0.3) * 0.05; // slight z tilt
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]} position={[0, -1, 0]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <primitive object={mask} scale={8} castShadow receiveShadow />
      </Float>
    </group>
  );
}
