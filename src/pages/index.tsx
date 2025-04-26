import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden">
      <Navbar />
      <BackgroundCanvas />
      <Hero />
      <Projects />
      <Skills />
    </div>
  );
}
