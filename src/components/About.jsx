import { useState, useEffect, useRef } from "react";

const skillGroups = [
  {
    id: "core",
    label: "Core Stack",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "Tailwind", level: 85 },
      { name: "APIs", level: 80 },
    ],
  },
  {
    id: "ai",
    label: "AI & Systems",
    skills: [
      { name: "TensorFlow", level: 80 },
      { name: "OpenCV", level: 85 },
      { name: "MediaPipe", level: 78 },
      { name: "Pandas", level: 82 },
      { name: "NumPy", level: 80 },
      { name: "Matplotlib", level: 75 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "C / C++", level: 74 },
      { name: "Data Structures", level: 80 },
      { name: "GitHub", level: 88 },
      { name: "Arduino", level: 65 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 78 },
    ],
  },
];

function Bar({ level, delay }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setW(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => setW(level), delay);
      },
      { threshold: 0.1 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [level, delay]);

  return (
    <div
      ref={ref}
      className="relative overflow-visible rounded-sm bg-neutral-200 dark:bg-neutral-800"
      style={{ height: 2 }}
    >
      <div
        className="absolute top-0 left-0 rounded-sm bg-lime-500 dark:bg-lime-600"
        style={{
          height: 2,
          width: `${w}%`,
          transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div
        className="absolute rounded-sm bg-lime-500 dark:bg-lime-600"
        style={{
          top: -3,
          height: 8,
          width: 2,
          left: `${w}%`,
          transition: "left 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState("core");
  const group = skillGroups.find((g) => g.id === tab);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 scroll-mt-20 box-border"
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .about-fade { animation: fadeUp 0.35s ease forwards; }
      `}</style>

      <div className="max-w-6xl mx-auto w-full">
        {/* Label row */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
            — About
          </span>
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          <span className="font-mono text-xs text-neutral-400 dark:text-neutral-400">
            02
          </span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* ── LEFT ── */}
          <div>
            {/* Heading — black in light, white in dark, no exceptions */}
            <h2
              className="font-light leading-snug tracking-tight mb-5 text-neutral-900 dark:text-white"
              style={{
                fontSize: "clamp(1.55rem, 2.6vw, 2.05rem)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Not just a dev.{" "}
              <span
                className="italic text-lime-500 dark:text-lime-400"
                style={{ fontFamily: "Georgia, serif" }}
              >
                A systems thinker
              </span>{" "}
              who ships.
            </h2>

            {/* Bio */}
            <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 flex flex-col gap-3">
              <p className="m-0">
                I'm Yuvraj, a Computer Engineering student at TIET Patiala. I
                enjoy building things that push me to learn beyond the classroom
                — especially projects that feel slightly outside my comfort
                zone.
              </p>
              <p className="m-0">
                My work has focused on interactive systems and AI-driven
                applications — from gesture-based controls and computer vision
                to full-stack platforms. I break down complex ideas into
                structured components and refine them until they perform
                reliably.
              </p>
              <p className="m-0">
                Right now I'm deepening my DSA fundamentals alongside building
                projects — because writing ambitious systems matters, but
                understanding what's under the hood matters just as much.
              </p>
            </div>

            {/* Photo placeholder */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="15"
                    r="8"
                    className="fill-neutral-300 dark:fill-neutral-600"
                  />
                  <ellipse
                    cx="20"
                    cy="34"
                    rx="13"
                    ry="8"
                    className="fill-neutral-300 dark:fill-neutral-600"
                  />
                </svg>
              </div>
              <div>
                <p className="m-0 text-sm font-medium text-neutral-900 dark:text-white">
                  Yuvraj Malik
                </p>
                <p className="m-0 mt-0.5 font-mono text-xs text-neutral-500 dark:text-neutral-500">
                  CS Eng · TIET Patiala
                </p>
                <p className="m-0 mt-1 font-mono text-xs text-lime-500 dark:text-lime-600">
                  // swap with your photo
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            {/* Skills header */}
            <p className="font-mono text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-300 mb-3">
              Skills & Expertise
            </p>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
              {skillGroups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setTab(g.id)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom:
                      tab === g.id
                        ? "2px solid #84cc16"
                        : "2px solid transparent",
                    color: tab === g.id ? "#84cc16" : "",
                    cursor: "pointer",
                    padding: "7px 16px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    marginBottom: -1,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  className={
                    tab !== g.id
                      ? "text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400"
                      : ""
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Skill rows */}
            <div className="flex flex-col gap-3">
              {group?.skills.map((skill, i) => (
                <div
                  key={`${tab}-${skill.name}`}
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-mono text-xs text-neutral-500 dark:text-neutral-200"
                    style={{ width: 110, flexShrink: 0 }}
                  >
                    {skill.name}
                  </span>
                  <div className="flex-1">
                    <Bar level={skill.level} delay={i * 55} />
                  </div>
                  <span
                    className="font-mono text-neutral-400 dark:text-neutral-300"
                    style={{ fontSize: 10, width: 24, textAlign: "right" }}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2.5 mt-7">
              {[
                {
                  label: "Projects",
                  value: "10+",
                  cls: "text-lime-500 dark:text-lime-400",
                },
                {
                  label: "AI Systems",
                  value: "4",
                  cls: "text-cyan-400 dark:text-cyan-400",
                },
                {
                  label: "Focus Now",
                  value: "DSA",
                  cls: "text-pink-400 dark:text-pink-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-neutral-200 dark:border-neutral-800 rounded-lg py-3 px-2 text-center bg-neutral-50 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200 cursor-default"
                >
                  <div className={`font-mono text-xl font-light mb-1 ${s.cls}`}>
                    {s.value}
                  </div>
                  <div
                    className="font-mono text-neutral-500 dark:text-neutral-300"
                    style={{ fontSize: 10, letterSpacing: "0.1em" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Philosophy strip */}
            <div className="mt-2.5 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 bg-lime-50 dark:bg-neutral-900/20 flex items-start gap-2.5">
              <span className="font-mono text-sm text-lime-500 dark:text-lime-600 flex-shrink-0">
                //
              </span>
              <p
                className="m-0 font-mono text-neutral-500 dark:text-neutral-300 leading-relaxed"
                style={{ fontSize: 11 }}
              >
                build ambitious things · understand them deeply · make them
                actually work
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
