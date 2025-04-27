import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedAboutMe({ text, className = "" }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Play this animation immediately on load
      gsap.fromTo(
        ".animated-word",
        {
          opacity: 0,
          y: 50,
          rotateX: 90,
          rotateY: 90,
          transformOrigin: "center center",
          perspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("animated-title perspective-1000", className)}>
      {text.split("<br />").map((line) => (
        <h1
          key={line}
          className="flex max-w-full flex-wrap gap-2 px-10 md:gap-3 "
        >
          {line.split(" ").map((word) => (
            <span
              key={`${line}-${word}`}
              className="animated-word inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </h1>
      ))}
    </div>
  );
  
}
