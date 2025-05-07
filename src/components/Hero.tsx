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
          className="text-6xl md:text-7xl font-bold relative"
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
            React & Next.js Developer  
          </motion.span>
        </motion.h1>
      </div>
      <style jsx>{`
        .neon-text {
          position: relative;
          color: #2a2a2a;
          -webkit-text-stroke: 1.5px transparent;
          animation: strobeStroke 4s ease-in-out infinite, float 6s ease-in-out infinite;
          letter-spacing: 2px;
          text-shadow: 
            0 0 5px rgba(255, 255, 255, 0.3),
            0 0 10px rgba(255, 255, 255, 0.2),
            0 0 15px rgba(255, 255, 255, 0.1);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes strobeStroke {
          0% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.3),
              0 0 10px rgba(255, 255, 255, 0.2),
              0 0 15px rgba(255, 255, 255, 0.1);
          }
          20% {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(255, 255, 255, 0.2);
          }
          40% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.3),
              0 0 10px rgba(255, 255, 255, 0.2),
              0 0 15px rgba(255, 255, 255, 0.1);
          }
          60% {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 15px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(255, 255, 255, 0.2);
          }
          80% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.3),
              0 0 10px rgba(255, 255, 255, 0.2),
              0 0 15px rgba(255, 255, 255, 0.1);
          }
          100% {
            -webkit-text-stroke: 1.5px transparent;
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.3),
              0 0 10px rgba(255, 255, 255, 0.2),
              0 0 15px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </motion.section>
  );
}