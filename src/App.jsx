import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
