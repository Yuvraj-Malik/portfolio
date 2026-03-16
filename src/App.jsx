import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Preloader from "./components/PreLoader";

const Contact = lazy(() => import("./components/Contact"));
const Projects = lazy(() => import("./components/Projects"));
const Journey = lazy(() => import("./components/Journey"));
const Footer = lazy(() => import("./components/Footer"));
const NotFound = lazy(() => import("./components/NotFound"));

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") return true;
    if (saved === "light") return false;

    // Default fallback (system preference)
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="bg-white dark:bg-[#0b0f14] text-black dark:text-white min-h-screen transition-colors duration-300">
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
      <Navbar dark={dark} setDark={setDark} />
      <main className="pt-0">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Suspense fallback={null}>
                  <Projects />
                  <Journey />
                  <Contact />
                  <Footer />
                </Suspense>
              </>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
