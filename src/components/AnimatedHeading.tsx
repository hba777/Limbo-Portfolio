import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedHeading({ text, className = "" }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Initial animation that plays on page load
        gsap.fromTo(".animated-word", 
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

        // Scroll-triggered animation
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100 bottom",
            end: "center bottom",
            toggleActions: "play none none reverse",
          },
        });

        titleAnimation.fromTo(".animated-word", 
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
    };

    initAnimation();
  }, []);

  return (
    <div ref={containerRef} className={cn("animated-title perspective-1000", className)}>
      {text.split("<br />").map((line) => (
        <h1
          key={line}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word) => (
            <span
              key={`${line}-${word}`}
              className="animated-word inline-block"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </h1>
      ))}
    </div>
  );
} 