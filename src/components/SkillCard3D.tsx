import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SkillCard3DProps {
  title: string;
  description: string;
  position: [number, number, number];
  delay: number;
}

export default function SkillCard3D({ title, description, position, delay }: SkillCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [x, y, z] = position;

  useEffect(() => {
    if (groupRef.current) {
      // Set initial position
      groupRef.current.position.set(0, -10, -20);
      groupRef.current.rotation.set(Math.PI / 2, 0, Math.random() * Math.PI * 2);
      
      // Animate to final position
      const duration = 1500; // 1.5 seconds
      const startTime = Date.now() + delay * 1000;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        if (elapsed > duration) {
          groupRef.current!.position.set(x, y, z);
          groupRef.current!.rotation.set(0, 0, 0);
          return;
        }
        
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        groupRef.current!.position.set(
          x * eased,
          y * eased + (-10 * (1 - eased)),
          z * eased + (-20 * (1 - eased))
        );
        
        groupRef.current!.rotation.set(
          Math.PI / 2 * (1 - eased),
          0,
          groupRef.current!.rotation.z * (1 - eased)
        );
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  }, [x, y, z, delay]);

  useFrame((state) => {
    if (groupRef.current) {
      // Add a subtle floating motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Card Background */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[10, 6, 0.2]} />
          <MeshDistortMaterial
            color="#5a5a5a"
            metalness={0.6}
            roughness={0.2}
            distort={0.1}
            speed={2}
            envMapIntensity={1.2}
            transparent
            opacity={0.95}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Card Border Glow */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[10.1, 6.1, 0.01]} />
          <meshStandardMaterial
            color="#5a5a5a"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Title */}
        <Text
          position={[0, 2, 0.12]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
          outlineWidth={0.02}
          outlineColor="#000000"
          renderOrder={1}
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.3}
          color="#dddddd"
          anchorX="center"
          anchorY="middle"
          maxWidth={9}
          letterSpacing={0.02}
          outlineWidth={0.01}
          outlineColor="#000000"
          renderOrder={1}
        >
          {description}
        </Text>

        {/* Decorative Elements */}
        <mesh position={[0, -2, 0.12]}>
          <boxGeometry args={[8, 0.1, 0.01]} />
          <meshStandardMaterial
            color="#5a5a5a"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
} 