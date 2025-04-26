import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  useEffect(() => {
    gsap.from(".reveal", { y: 50, opacity: 0, stagger: 0.2, duration: 1 });
  }, []);

  return (
    <motion.section className="reveal flex flex-col justify-center items-center h-screen text-center px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Limbo</h2>
      <p className="text-lg max-w-xl">Your eerie space in the dark web of creativity.</p>
    </motion.section>
  );
}