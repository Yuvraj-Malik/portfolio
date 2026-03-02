import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import AiFace from "./AiFace";

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop > 40);
      setScrollProgress(Math.min(scrollTop / docHeight, 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "pt-6 px-6" : "pt-0 px-0"
        }`}
      >
        <nav
          className={`relative mx-auto flex items-center md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 transition-all duration-300 ${
            scrolled
              ? "max-w-6xl px-8 py-4 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl"
              : "max-w-full px-10 py-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-black/70 backdrop-blur-xl"
          }`}
        >
          {/* Scroll Progress */}
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-black dark:bg-white rounded-full transition-all duration-200"
            style={{
              width: `${scrollProgress * 100}%`,
              opacity: scrolled ? 1 : 0,
            }}
          />

          {/* Left - Logo */}
          <div className="flex items-center shrink-0 md:justify-self-start">
            <a href="#hero" className="text-lg font-semibold tracking-tight">
              Yuvraj Malik
            </a>
          </div>

          {/* Center - AiFace */}
          <div className="hidden md:flex md:justify-self-center">
            <AiFace />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-end gap-6 text-sm md:justify-self-end">
            <a
              href="#about"
              className="px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              About
            </a>

            <a
              href="#projects"
              className="px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Contact
            </a>

            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              Let’s Talk
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-neutral-900 p-6 shadow-2xl">
            <button onClick={closeMobile} className="absolute top-4 right-4">
              <X size={22} />
            </button>

            <div className="mt-16 flex flex-col gap-6 text-lg">
              <a href="#about" onClick={closeMobile}>
                About
              </a>
              <a href="#projects" onClick={closeMobile}>
                Projects
              </a>
              <a href="#contact" onClick={closeMobile}>
                Contact
              </a>

              <a
                href="#contact"
                onClick={closeMobile}
                className="mt-6 px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-center"
              >
                Let’s Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
