import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-screen text-center px-4"
    >
      <div className="relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut"
          }}
          className="text-6xl md:text-8xl font-bold relative"
        >
          <motion.span 
            className="neon-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.5,
              ease: "easeOut"
            }}
          >
            Portfolio
          </motion.span>
        </motion.h1>
      </div>
      <style jsx>{`
        .neon-text {
          position: relative;
          color: #2a2a2a;
          -webkit-text-stroke: 1.5px transparent;
          animation: strobeStroke 3s ease-in-out infinite;
          letter-spacing: 2px;
        }

        @keyframes strobeStroke {
          0% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: none;
          }
          25% {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.6);
            text-shadow: 
              0 0 1px rgba(255, 255, 255, 0.4),
              0 0 2px rgba(255, 255, 255, 0.4),
              0 0 3px rgba(255, 255, 255, 0.4);
          }
          50% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: none;
          }
          75% {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.6);
            text-shadow: 
              0 0 1px rgba(255, 255, 255, 0.4),
              0 0 2px rgba(255, 255, 255, 0.4),
              0 0 3px rgba(255, 255, 255, 0.4);
          }
          100% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: none;
          }
        }
      `}</style>
    </motion.section>
  );
}