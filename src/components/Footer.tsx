import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 text-center text-sm text-gray-400"
    >
      <p>
        SM - Anon Mask by Scott Marshall [CC-BY] via Poly Pizza
      </p>
    </motion.footer>
  );
} 