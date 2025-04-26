import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, staggerChildren: 0.2 }}
      className="flex flex-col justify-center items-center h-screen text-center px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Welcome to Limbo
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg max-w-xl"
      >
        Your eerie space in the dark web of creativity.
      </motion.p>
    </motion.section>
  );
}