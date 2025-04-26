import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import AnimatedHeading from '../components/AnimatedHeading';
import Mask3D from '../components/Mask3D';
import { motion } from 'framer-motion';

export default function About() {
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4 py-30  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <div className="space-y-8 relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10" />
            
            <AnimatedHeading 
              text="About Me" 
              className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" 
            />

            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p 
                variants={paragraphVariants}
                className="text-lg font-light text-gray-300 leading-relaxed border-l-2 border-purple-500/30 pl-4"
              >
                I am a passionate Full Stack Developer with expertise in building modern web applications. 
                My journey in software development has equipped me with a deep understanding of both frontend 
                and backend technologies, allowing me to create seamless, end-to-end solutions.
              </motion.p>

              <motion.p 
                variants={paragraphVariants}
                className="text-lg font-light text-gray-300 leading-relaxed border-l-2 border-cyan-500/30 pl-4"
              >
                With a strong foundation in <span className="text-purple-400 font-medium">JavaScript/TypeScript</span>, 
                <span className="text-cyan-400 font-medium"> React</span>, 
                <span className="text-purple-400 font-medium"> Node.js</span>, and various database 
                technologies, I specialize in crafting responsive, performant, and user-friendly applications. 
                I'm particularly interested in creating immersive web experiences that push the boundaries 
                of what's possible in the browser.
              </motion.p>

              <motion.div 
                variants={paragraphVariants}
                className="flex flex-wrap gap-3 pt-4"
              >
                {['TypeScript', 'JavaScript', 'Next.js', 'React', 'Node.js', 'Three.js', 'MongoDB', 'SQL'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - 3D Mask */}
          <div className="h-[600px] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl -z-10" />
            <Canvas shadows className="rounded-3xl">
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI * 3/4}
                rotateSpeed={0.5}
              />
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
              <directionalLight
                position={[-10, -10, -5]}
                intensity={0.5}
              />
              <Mask3D />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}