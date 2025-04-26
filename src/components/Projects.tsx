import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedHeading from './AnimatedHeading';

const projects = [
  {
    title: "Project 1",
    description: "A mysterious project that pushes the boundaries of creativity.",
    image: "/project1.jpg"
  },
  {
    title: "Project 2",
    description: "An exploration into the depths of digital art and interaction.",
    image: "/project2.jpg"
  },
  {
    title: "Project 3",
    description: "A journey through the liminal spaces of web development.",
    image: "/project3.jpg"
  }
];

const headingVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      duration: 0.5
    }
  }
};

const letterVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newIndex = (currentIndex + direction + projects.length) % projects.length;
      setCurrentIndex(newIndex);
    }
    controls.start({ x: 0 });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="min-h-screen py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedHeading 
          text="Projects" 
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        />
        
        <div className="relative flex items-center justify-center h-[1000px]">
          <motion.div
            ref={containerRef}
            className="relative flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`absolute transition-all duration-300 ${
                  index === currentIndex 
                    ? 'z-20 scale-100 opacity-100' 
                    : index === (currentIndex + 1) % projects.length || index === (currentIndex - 1 + projects.length) % projects.length
                    ? 'z-10 scale-50 opacity-30'
                    : 'scale-25 opacity-0'
                }`}
                style={{
                  x: `${(index - currentIndex) * 200}%`,
                }}
              >
                <div className="w-[1000px] h-[800px]">
                  <ProjectCard {...project} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-200' : 'bg-gray-700'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
} 