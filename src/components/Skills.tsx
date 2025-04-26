import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import AnimatedHeading from './AnimatedHeading';
import SkillCard3D from './SkillCard3D';
import { useEffect, useState } from 'react';

const desktopSkills = [
  {
    title: "Full Stack Development",
    description: "Building end-to-end web applications with modern frameworks and technologies",
    position: [-7, 3, 0] as [number, number, number]
  },
  {
    title: "Cross-Platform App Development",
    description: "Creating mobile applications that work seamlessly across different platforms",
    position: [7, 3, 0] as [number, number, number]
  },
  {
    title: "Database Management",
    description: "Expertise in SQL, MongoDB, and Firebase for efficient data storage and retrieval",
    position: [-7, -5, 0] as [number, number, number]
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces with modern design principles",
    position: [7, -5, 0] as [number, number, number]
  }
];

const mobileSkills = [
  {
    title: "Full Stack Development",
    description: "Building end-to-end web applications with modern frameworks and technologies",
    position: [-3.5, 2.5, 0] as [number, number, number]
  },
  {
    title: "Cross-Platform App Development",
    description: "Creating mobile applications that work seamlessly across different platforms",
    position: [3.5, 2.5, 0] as [number, number, number]
  },
  {
    title: "Database Management",
    description: "Expertise in SQL, MongoDB, and Firebase for efficient data storage and retrieval",
    position: [-3.5, -2.5, 0] as [number, number, number]
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces with modern design principles",
    position: [3.5, -2.5, 0] as [number, number, number]
  }
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = isMobile ? mobileSkills : desktopSkills;

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedHeading 
          text="Skills" 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        />
        
        <div className="h-[700px] w-full">
          <Canvas shadows>
            <PerspectiveCamera 
              makeDefault 
              position={[0, 0, isMobile ? 15 : 12]} 
              fov={isMobile ? 60 : 70} 
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI * 3/4}
              rotateSpeed={0.5}
              enableRotate={!isMobile}
            />
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight
              position={[-10, -10, -5]}
              intensity={0.5}
            />
            {skills.map((skill, index) => (
              <SkillCard3D
                key={skill.title}
                {...skill}
                delay={index * 0.2}
                isMobile={isMobile}
              />
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
} 