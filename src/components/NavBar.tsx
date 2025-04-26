import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav className="reveal fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg z-50">
      <h1 className="text-xl font-orbitron tracking-widest">Limbo</h1>
      <ul className="flex gap-6">
        <li><Link href="/about">About</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </motion.nav>
  );
}