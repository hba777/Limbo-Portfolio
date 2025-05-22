import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  skills: string[];
  githubLink?: string;
}

export default function ProjectCard({ title, description, image, skills, githubLink }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-full h-full perspective cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0 backface-hidden bg-gray-900/30 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full pt-20 md:pt-60">
            <h3 className="text-xl md:text-3xl font-bold mb-4 text-gray-100">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {githubLink && (
                <a 
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-200"
                >
                  <FaGithub className="text-xl" />
                  <span>View on GitHub</span>
                </a>
              )}
              <button 
                onClick={() => setFlipped(!flipped)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-200"
              >
                Flip
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 backface-hidden bg-gray-900/30 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: flipped ? 0 : 180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full flex flex-col pt-10 md:pt-20">
            <h3 className="text-xl md:text-3xl font-bold mb-4 text-gray-100">{title}</h3>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1">
              <div className="flex-1 flex flex-col">
                <p className="text-sm md:text-lg text-gray-400 mb-6 font-['Orbitron']">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  {githubLink && (
                    <a 
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-200"
                    >
                      <FaGithub className="text-xl" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                  <button 
                    onClick={() => setFlipped(!flipped)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-200"
                  >
                    Flip back
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-start justify-center">
                <div className="w-full md:w-[480px] h-[300px] md:h-[550px] flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-contain rounded-lg shadow-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}