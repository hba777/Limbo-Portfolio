import { useRef, } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, } from '@react-three/drei';
import * as THREE from 'three';

export default function Mask3D() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Animate glow
      if (glowRef.current) {
        time.current += 0.01;
        const glowIntensity = Math.sin(time.current) * 0.3 + 0.7;
        glowRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial;
            material.opacity = glowIntensity;
            material.emissiveIntensity = glowIntensity;
          }
        });
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        {/* Base Face Shape */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.2, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Segmented Overlays - Group */}
        <group ref={glowRef}>
          {/* Upper Face Segment */}
          <mesh position={[0, 0.3, 0.6]}>
            <planeGeometry args={[1.6, 0.8]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Left Eye Region */}
          <group position={[-0.4, 0.2, 0.8]}>
            {[0.2, 0.15, 0.1].map((radius, index) => (
              <mesh key={`left-eye-${index}`} position={[0, 0, index * 0.05]}>
                <ringGeometry args={[radius * 0.7, radius, 32]} />
                <meshStandardMaterial
                  color={index === 0 ? "#4a4a4a" : "#2a2a2a"}
                  metalness={0.8}
                  roughness={0.2}
                  transparent
                  opacity={0.9 - index * 0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </group>

          {/* Right Eye Region */}
          <group position={[0.4, 0.2, 0.8]}>
            {[0.2, 0.15, 0.1].map((radius, index) => (
              <mesh key={`right-eye-${index}`} position={[0, 0, index * 0.05]}>
                <ringGeometry args={[radius * 0.7, radius, 32]} />
                <meshStandardMaterial
                  color={index === 0 ? "#4a4a4a" : "#2a2a2a"}
                  metalness={0.8}
                  roughness={0.2}
                  transparent
                  opacity={0.9 - index * 0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </group>

          {/* Mouth Region */}
          <group position={[0, -0.2, 0.8]}>
            {/* Upper Lip */}
            <mesh position={[0, 0.05, 0]}>
              <planeGeometry args={[0.8, 0.15]} />
              <meshStandardMaterial
                color="#3a3a3a"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Lower Lip */}
            <mesh position={[0, -0.1, 0]}>
              <planeGeometry args={[0.6, 0.12]} />
              <meshStandardMaterial
                color="#2a2a2a"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Glowing Edge Highlights */}
          {[0, 1, 2].map((index) => (
            <mesh key={`edge-${index}`} position={[0, 0, 0.7 + index * 0.1]}>
              <ringGeometry args={[1.15 - index * 0.05, 1.2 - index * 0.05, 64]} />
              <meshStandardMaterial
                color="#404040"
                emissive="#505050"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.2}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
} 