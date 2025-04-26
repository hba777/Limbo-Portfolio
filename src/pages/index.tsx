import Image from "next/image";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import BackgroundCanvas from "@/components/BackgroundCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      <BackgroundCanvas />

      <Hero />
      <Projects />
    </div>
  );
}
