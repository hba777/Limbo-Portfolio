import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const previousScroll = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    
    if (currentPath === '/about') {
      window.location.href = '/';
    } else {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollingDown = latest > previousScroll.current;
    const scrollingUp = latest < previousScroll.current;
    previousScroll.current = latest;

    if (scrollingDown && latest > 100 && !isHovered) {
      if (!hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          hideTimeoutRef.current = null;
        }, 200);
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

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "#projects", onClick: handleProjectsClick },
    { name: "LinkedIn", href: "https://linkedin.com/in/haris-bin-amir-207032221/", external: true },
    { name: "GitHub", href: "https://github.com/hba777/Limbo-Portfolio", external: true, icon: <FaGithub size={20} /> }
  ];

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
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex justify-between items-center px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
      >
        <Link href="/">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-orbitron tracking-widest text-white"
          >
            Haris&apos;s Portfolio
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.external ? (
                <a 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="relative text-white/80 hover:text-white"
                    whileHover="hover"
                  >
                    {item.icon || item.name}
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
              ) : (
                <Link href={item.href} onClick={item.onClick}>
                  <motion.div
                    className="relative text-white/80 hover:text-white"
                    whileHover="hover"
                  >
                    {item.name}
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
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-4 md:hidden"
          >
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white/80 hover:text-white py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon || item.name}
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      onClick={(e) => {
                        if (item.onClick) item.onClick(e);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block text-white/80 hover:text-white py-2"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}
