import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ProjectCard({ title, description, image }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-full h-full perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0 backface-hidden bg-gray-800 p-8 rounded-2xl shadow-lg"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full">
            <img src={image} alt={title} className="w-full h-1/2 object-cover rounded-lg mb-6" />
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <button 
              onClick={() => setFlipped(!flipped)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Click to flip
            </button>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 backface-hidden bg-black p-8 rounded-2xl shadow-lg"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: flipped ? 0 : 180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-lg text-gray-300 mb-6">{description}</p>
            <button 
              onClick={() => setFlipped(!flipped)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Click to flip back
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}