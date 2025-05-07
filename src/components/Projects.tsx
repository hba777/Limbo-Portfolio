import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedHeading from './AnimatedHeading';

const projects = [
  {
    title: "Smart Campus Surveillance System",
    description: "As a React Developer Intern at NCSAEL, developed a smart campus system to detect intruders across 50+ surveillance cameras. Built responsive dashboards with React, deployed backend services using Docker (FastAPI, PostgreSQL, Redis, Celery), and achieved real-time video processing with sub-0.5s response times.",
    image: "/images/SmartCampus.png",
    skills: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'CSS', 'Real-time Systems'],
    githubLink: "https://github.com/Faizaan-Lynx/Smart-Campus" // (private or internal project; leave blank or add a link if available)
  },
  {
    title: "Game Showcase Website",
    description: "Built an interactive game showcase site using React, TailwindCSS, and TypeScript with dynamic content, responsive design, and smooth UI animations for an engaging user experience.",
    image: "/images/GameShowcase.png",
    skills: ['React', 'TailwindCSS', 'Typescript', 'Responsive Design', 'GSAP'],
    githubLink: "https://github.com/hba777/Game-ShowCase-Website"
  },  
  {
    title: "Real Estate Website",
    description: "Built a responsive real estate website using Next.js for a seamless user experience. Utilized PostgreSQL for database management and Firebase for user authentication and bookmark storage. Integrated interactive property maps using Leaflet.js for enhanced property visualization and location discovery.",
    image: "/images/RealEstate.png",
    skills: ['Next.js', 'PostgreSQL', 'Firebase', 'Leaflet.js', 'JavaScript', 'Responsive Design'],
    githubLink: "https://github.com/hba777/Real-Estate-Website"
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSetProjectIndex = (event: CustomEvent<{ index: number }>) => {
      setCurrentIndex(event.detail.index);
    };

    window.addEventListener('setProjectIndex', handleSetProjectIndex as EventListener);
    return () => {
      window.removeEventListener('setProjectIndex', handleSetProjectIndex as EventListener);
    };
  }, []);

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
      id="projects"
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
        
        <div className="relative flex items-center justify-center h-[600px] md:h-[1000px]">
          <motion.div
            ref={containerRef}
            className="relative flex items-center justify-center w-full"
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
                <div className="w-[300px] md:w-[1000px] h-[500px] md:h-[800px]">
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