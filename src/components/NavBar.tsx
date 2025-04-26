import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg z-50"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-orbitron tracking-widest"
      >
        Limbo
      </motion.h1>
      <ul className="flex gap-6">
        <li><Link href="/about">About</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </motion.nav>
  );
}