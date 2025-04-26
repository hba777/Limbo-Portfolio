import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface SkillTileProps {
  title: string;
  description: string;
  initialPosition: { x: number; y: number; z: number };
}

export default function SkillTile({ title, description, initialPosition }: SkillTileProps) {
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
      initial={{ 
        x: initialPosition.x, 
        y: initialPosition.y,
        z: initialPosition.z,
        opacity: 0,
        scale: 0.3,
        rotate: Math.random() * 360
      }}
      animate={{ 
        x: 0, 
        y: 0,
        z: 0,
        opacity: 1,
        scale: 1,
        rotate: 0
      }}
      transition={{ 
        duration: 2,
        ease: [0.2, 0.8, 0.2, 1],
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1
      }}
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
          className="absolute inset-0 backface-hidden bg-gray-900/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">{title}</h3>
            <p className="text-lg text-gray-400">{description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 