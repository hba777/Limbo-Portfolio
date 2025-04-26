import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const { scrollY } = useScroll();
  const previousScroll = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const projects = [
    {
      name: "Sign Language Translator Glove",
      description: "ML-powered glove with 97% accuracy for real-time sign language translation",
      github: "#"
    },
    {
      name: "Spotify Clone App",
      description: "Music stream prediction research project with SQL backend",
      github: "#"
    },
    {
      name: "Real-Time Chat App",
      description: "Flutter chat app with Firebase auth and push notifications",
      github: "#"
    },
    {
      name: "Real Estate Website",
      description: "Next.js site with PostgreSQL and interactive property maps",
      github: "#"
    },
    {
      name: "Amadeus",
      description: "AI-driven text and image generation using Gemini API",
      github: "#"
    }
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollingDown = latest > previousScroll.current;
    const scrollingUp = latest < previousScroll.current;
    previousScroll.current = latest;

    if (scrollingDown && latest > 100 && !isHovered) {
      if (!hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          hideTimeoutRef.current = null;
        }, 200); // small delay before hiding
      }
    } else if (scrollingUp || latest <= 100) {
      if (!isVisible) setIsVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    }
  });

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      onMouseEnter={() => {
        setIsHovered(true);
        if (!isVisible) setIsVisible(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (scrollY.get() > 100) {
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            hideTimeoutRef.current = null;
          }, 200);
        }
      }}
    >
      {/* Invisible hover area */}
      <div className="w-full h-20" />
      
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
      >
        <Link href="/">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-orbitron tracking-widest text-white"
        >
          Haris's Portfolio
        </motion.h1></Link>
        <ul className="flex gap-8">
          <li>
            <Link href="/about">
              <motion.div
                className="relative text-white/80 hover:text-white"
                whileHover="hover"
              >
                About
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }
                  }}
                />
              </motion.div>
            </Link>
          </li>
          <li className="relative"
              onMouseEnter={() => setShowProjects(true)}
              onMouseLeave={() => setShowProjects(false)}>
            <motion.div
              className="relative text-white/80 hover:text-white cursor-pointer"
              whileHover="hover"
            >
              Projects
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                initial={{ scaleX: 0 }}
                variants={{
                  hover: {
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }
                }}
              />
            </motion.div>
            {showProjects && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-4"
              >
                <ul className="space-y-4">
                  {projects.map((project) => (
                    <li key={project.name} className="group">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">{project.name}</h3>
                          <p className="text-white/60 text-sm mt-1">{project.description}</p>
                        </div>
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <FaGithub size={20} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </li>
          <li>
            <a 
              href="https://linkedin.com/in/haris-bin-amir-207032221/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <motion.div
                className="relative text-white/80 hover:text-white"
                whileHover="hover"
              >
                LinkedIn
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }
                  }}
                />
              </motion.div>
            </a>
          </li>
        </ul>
      </motion.nav>
    </div>
  );
}
