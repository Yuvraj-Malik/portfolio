import { useState, useEffect, useRef } from "react";

const skillGroups = [
  {
    id: "core",
    label: "Core Stack",
    accent: "#e2e2e2",
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
    accent: "#a3e635",
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
    accent: "#67e8f9",
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

function Bar({ level, accent, delay }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
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
      style={{
        height: 1,
        background: "#222",
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 1,
          width: `${w}%`,
          backgroundColor: accent,
          boxShadow: `0 0 5px ${accent}`,
          transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -3,
          height: 7,
          width: 1,
          left: `${w}%`,
          backgroundColor: accent,
          boxShadow: `0 0 6px ${accent}`,
          transition: "left 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

const LINES = [
  { cmd: "whoami", out: "yuvraj malik — cs eng, tiet patiala" },
  { cmd: "ls /interests", out: "ai-systems/  computer-vision/  full-stack/" },
  { cmd: "echo $PHILOSOPHY", out: "build things that shouldn't exist." },
];

export default function About() {
  const [tab, setTab] = useState("core");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : 700);
    return () => clearTimeout(t);
  }, [shown]);

  const group = skillGroups.find((g) => g.id === tab);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5rem 2rem",
        scrollMarginTop: "5rem",
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .af { animation: fadeUp 0.35s ease forwards; }
        .ac { animation: blink 1s step-end infinite; }
        .stab { background:none;border:none;cursor:pointer;padding:6px 14px;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.08em;transition:color 0.2s;border-bottom:1px solid transparent;margin-bottom:-1px; }
        .stab:hover { color:#aaa !important; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Label row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: "#555",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            — About
          </span>
          <div style={{ flex: 1, height: 1, background: "#222" }} />
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: "#333",
            }}
          >
            02
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 52,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                color: "#fff",
                marginBottom: 18,
                letterSpacing: "-0.02em",
              }}
            >
              Not just a dev.{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontFamily: "Georgia,serif",
                  color: "#a3e635",
                }}
              >
                A systems thinker
              </span>{" "}
              who ships.
            </h2>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                color: "#666",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <p style={{ margin: 0 }}>
                I'm Yuvraj, a Computer Engineering student at TIET Patiala. I
                enjoy building things that push me to learn beyond the classroom
                — especially projects that feel slightly outside my comfort
                zone.
              </p>
              <p style={{ margin: 0 }}>
                My work has focused on interactive systems and AI-driven
                applications — from gesture-based controls and computer vision
                to full-stack platforms. I break down complex ideas into
                structured components and refine them until they perform
                reliably.
              </p>
              <p style={{ margin: 0 }}>
                Right now I'm deepening my DSA fundamentals alongside building
                projects — because writing ambitious systems matters, but
                understanding what's under the hood matters just as much.
              </p>
            </div>
            {/* Terminal */}
            <div
              style={{
                marginTop: 20,
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #1e1e1e",
                background: "#080808",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderBottom: "1px solid #161616",
                  background: "#0f0f0f",
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#ef4444",
                  }}
                />
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#eab308",
                  }}
                />
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#22c55e",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: "#3a3a3a",
                    marginLeft: 8,
                  }}
                >
                  yuvraj@portfolio ~ zsh
                </span>
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                }}
              >
                {LINES.slice(0, shown).map((line, i) => (
                  <div key={i} className="af" style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "#a3e635" }}>$</span>
                      <span style={{ color: "#bbb" }}>{line.cmd}</span>
                    </div>
                    <div
                      style={{ color: "#444", paddingLeft: 16, marginTop: 2 }}
                    >
                      {line.out}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#a3e635" }}>$</span>
                  <span className="ac" style={{ color: "#444" }}>
                    █
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: "#444",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Skills & Expertise
            </p>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #1e1e1e",
                marginBottom: 18,
              }}
            >
              {skillGroups.map((g) => (
                <button
                  key={g.id}
                  className="stab"
                  onClick={() => setTab(g.id)}
                  style={{
                    color: tab === g.id ? g.accent : "#3a3a3a",
                    borderBottomColor: tab === g.id ? g.accent : "transparent",
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {group?.skills.map((skill, i) => (
                <div
                  key={`${tab}-${skill.name}`}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 11,
                      color: "#555",
                      width: 112,
                      flexShrink: 0,
                    }}
                  >
                    {skill.name}
                  </span>
                  <div style={{ flex: 1 }}>
                    <Bar
                      level={skill.level}
                      accent={group.accent}
                      delay={i * 50}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 10,
                      color: "#333",
                      width: 26,
                      textAlign: "right",
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginTop: 26,
              }}
            >
              {[
                { label: "Projects", value: "10+", accent: "#a3e635" },
                { label: "AI Systems", value: "4", accent: "#67e8f9" },
                { label: "Focus Now", value: "DSA", accent: "#f9a8d4" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    border: "1px solid #1e1e1e",
                    borderRadius: 8,
                    padding: "12px 8px",
                    textAlign: "center",
                    background: "rgba(255,255,255,0.015)",
                    transition: "border-color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#1e1e1e")
                  }
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 20,
                      fontWeight: 300,
                      color: s.accent,
                      marginBottom: 4,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 10,
                      color: "#3a3a3a",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            {/* Philosophy */}
            <div
              style={{
                marginTop: 10,
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                padding: "10px 14px",
                background: "rgba(163,230,53,0.025)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  color: "#a3e635",
                  flexShrink: 0,
                }}
              >
                //
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: "#3a3a3a",
                  lineHeight: 1.5,
                }}
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
