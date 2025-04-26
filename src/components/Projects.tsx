import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedHeading from './AnimatedHeading';

const projects = [
  {
    title: "Sign Language Translator Glove",
    description: "Developed and trained an IMU acquiring random forest machine learning model, achieving an accuracy of 97%. Integrated Bluetooth technology for seamless wireless communication between the glove and mobile.",
    image: "/images/SignGlove.jpg",
    skills: ['Machine Learning', 'Python', 'Bluetooth', 'Mobile Development', 'Random Forest', 'IMU Sensors'],
    githubLink: "https://github.com/hba777/sign_glove_application"
  },
  {
    title: "Spotify Clone App",
    description: "Independently replicated a research project on predicting music streams on Spotify. Implemented various analysis techniques to understand the relationships between different song attributes. Utilized an SQL database as the backend to manage song data.",
    image: "/images/Spotify.png",
    skills: ['SQL', 'Data Analysis', 'Python', 'Machine Learning', 'Data Visualization', 'Flutter', 'Node.js'],
    githubLink: "https://github.com/hba777/ScuffedSpotify"
  },
  {
    title: "Real-Time Chat Application",
    description: "Developed a real-time chat application in Flutter. Used Firebase for user authentication and data storage. Implemented a push-notification system using Firebase Cloud Messaging.",
    image: "/images/ChatApp.jpg",
    skills: ['Flutter', 'Firebase', 'Firebase Cloud Messaging'],
    githubLink: "https://github.com/hba777/FlutterNikoChatApp"
  },
  {
    title: "Real Estate Website",
    description: "Built a responsive real estate website using Next.js for a seamless user experience. Utilized PostgreSQL for database management and Firebase for user authentication and bookmark storage. Integrated interactive property maps using Leaflet.js for enhanced property visualization and location discovery.",
    image: "/images/RealEstate.png",
    skills: ['Next.js', 'PostgreSQL', 'Firebase', 'Leaflet.js', 'JavaScript', 'Responsive Design'],
    githubLink: "https://github.com/hba777/Real-Estate-Website"
  },
  {
    title: "Amadeus",
    description: "Implemented seamless integration with the Gemini API to generate dynamic, AI-driven text and image responses based on user inputs. Allowed users to engage in conversations that included both textual and visual content, ensuring user-friendliness.",
    image: "/images/Amadeus.png",
    skills: ['Gemini API', 'Natural Language Processing', 'Flutter'],
    githubLink: "https://github.com/hba777/Amadeus"
  }
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