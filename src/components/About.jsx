import { useState, useEffect } from "react";

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return dark;
}

const skillGroups = [
  {
    id: "core",
    label: "Core Stack",
    skills: [
      { name: "Python", context: "AI · scripting · backends" },
      { name: "JavaScript", context: "fullstack · logic · APIs" },
      { name: "React", context: "UIs · SPAs · components" },
      { name: "Node.js", context: "servers · REST · real-time" },
      { name: "MongoDB", context: "NoSQL · data modeling" },
      { name: "MySQL", context: "relational · queries" },
      { name: "Tailwind", context: "styling · design systems" },
      { name: "REST APIs", context: "integration · contracts" },
    ],
  },
  {
    id: "ai",
    label: "AI & Systems",
    skills: [
      { name: "TensorFlow", context: "model training · pipelines" },
      { name: "OpenCV", context: "vision · image processing" },
      { name: "MediaPipe", context: "gesture · pose detection" },
      { name: "Pandas", context: "data wrangling · analysis" },
      { name: "NumPy", context: "numerical · matrix ops" },
      { name: "Matplotlib", context: "visualization · plots" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "C / C++", context: "systems · DSA · low-level" },
      { name: "Data Structures", context: "problem solving · LeetCode" },
      { name: "GitHub", context: "version control · collab" },
      { name: "Arduino", context: "hardware · prototyping" },
      { name: "VS Code", context: "primary editor" },
      { name: "Postman", context: "API testing · debugging" },
    ],
  },
];

function SkillRow({ skill, dark, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "9px 0",
        borderBottom: `1px solid ${dark ? (hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)") : hovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.06)"}`,
        transition: "all 0.15s ease",
        cursor: "default",
        animation: `about-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 40}ms both`,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
          color: hovered
            ? dark
              ? "#ffffff"
              : "#000000"
            : dark
              ? "#c0c0c0"
              : "#333",
          transition: "color 0.15s ease",
          letterSpacing: "0.02em",
        }}
      >
        {skill.name}
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: hovered
            ? dark
              ? "#c3c3c3"
              : "#060606"
            : dark
              ? "#6f6f6f"
              : "#606060",
          letterSpacing: "0.04em",
          transition: "color 0.15s ease",
          textAlign: "right",
        }}
      >
        {skill.context}
      </span>
    </div>
  );
}

export default function About() {
  const dark = useDarkMode();
  const [tab, setTab] = useState("core");
  const group = skillGroups.find((g) => g.id === tab);

  const c = {
    heading: dark ? "#ffffff" : "#050505",
    subtext: dark ? "#b0b0b0" : "#555",
    emphasis: dark ? "#ffffff" : "#111",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#333" : "#e8e8e8",
    tabActive: dark ? "#f8f2f2" : "#000000",
    tabInactive: dark ? "#555" : "#aaa",
    tabBorder: dark ? "#ffffff" : "#050505",
    cardBorder: dark ? "#2a2a2a" : "#e8e8e8",
    cardBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
    cardHover: dark ? "#444" : "#ccc",
    stripBorder: dark ? "#2a2a2a" : "#e8e8e8",
    stripBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
    stripText: dark ? "#b0b0b0" : "#555",
    photoBg: dark ? "#1a1a1a" : "#f0f0f0",
    photoBorder: dark ? "#2a2a2a" : "#e0e0e0",
    photoIcon: dark ? "#444" : "#ccc",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes about-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-a1 { animation: about-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .about-a2 { animation: about-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .about-a3 { animation: about-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .about-stab {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; padding: 7px 16px;
          border-bottom: 1.5px solid transparent; margin-bottom: -1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .about-stab:first-child { padding-left: 0; }
        .photo-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .photo-card:hover {
          transform: rotate(0deg) translateY(-4px) !important;
        }
      `}</style>

      <section
        id="about"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5.5rem 3rem 3rem 3rem",
          scrollMarginTop: "25px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: dark
              ? "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Label row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 48,
            }}
            className="about-a1"
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              — About
            </span>
            <div style={{ flex: 1, height: 1, background: c.divider }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
              }}
            >
              02
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* ── LEFT ── */}
            <div className="about-a2">
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: c.heading,
                  marginBottom: 20,
                }}
              >
                Not just a dev.{" "}
                <em
                  style={{ fontStyle: "italic", color: dark ? "#999" : "#555" }}
                >
                  A systems thinker
                </em>{" "}
                who ships.
              </h2>

              <div
                style={{
                  fontSize: 15,
                  color: c.subtext,
                  lineHeight: 1.75,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginBottom: 32,
                }}
              >
                <p style={{ margin: 0 }}>
                  I'm Yuvraj, a Computer Engineering student at TIET Patiala.
                  I'm drawn to projects that{" "}
                  <span style={{ color: c.emphasis, fontWeight: 500 }}>
                    push me slightly beyond what I already know
                  </span>{" "}
                  — the kind that push me to figure things out rather than
                  follow instructions.
                </p>
                <p style={{ margin: 0 }}>
                  So far, I've focused on developing{" "}
                  <span style={{ color: c.emphasis, fontWeight: 500 }}>
                    interactive systems and AI-driven applications
                  </span>{" "}
                  — from gesture-based controls and computer vision experiments
                  to full-stack platforms. I enjoy taking complex ideas,
                  structuring them clearly, and refining them until they perform
                  reliably in real-world scenarios.
                </p>
                <p style={{ margin: 0 }}>
                  Right now, I'm strengthening my fundamentals in{" "}
                  <span style={{ color: c.emphasis, fontWeight: 500 }}>
                    data structures and algorithms
                  </span>{" "}
                  alongside building projects — because writing ambitious
                  systems is important, but{" "}
                  <span style={{ color: c.emphasis, fontWeight: 500 }}>
                    understanding how they work under the hood
                  </span>{" "}
                  matters just as much.
                </p>
              </div>

              {/* ── Photo Card (Option 3) ── */}
              <div
                style={{
                  paddingTop: 28,
                  borderTop: `1px solid ${c.divider}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* Tilted rectangular photo card */}
                <div
                  className="photo-card"
                  style={{
                    width: 72,
                    height: 88,
                    borderRadius: 10,
                    background: c.photoBg,
                    border: `1px solid ${c.photoBorder}`,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(-2.5deg)",
                    boxShadow: dark
                      ? "4px 4px 16px rgba(0,0,0,0.4)"
                      : "4px 4px 16px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  {/* Placeholder avatar */}
                  <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="8" fill={c.photoIcon} />
                    <ellipse
                      cx="20"
                      cy="34"
                      rx="13"
                      ry="8"
                      fill={c.photoIcon}
                    />
                  </svg>
                </div>

                {/* Info beside card */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 18,
                      color: c.heading,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Yuvraj Malik
                  </p>
                  {/* Fact pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["2nd Year CSE", "TIET Patiala", "AI/ML · Full Stack"].map(
                      (pill) => (
                        <span
                          key={pill}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.06em",
                            color: c.subtext,
                            border: `1px solid ${c.divider}`,
                            borderRadius: 100,
                            padding: "3px 10px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {pill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="about-a3">
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: c.label,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Skills & Expertise
              </p>

              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: `1px solid ${c.divider}`,
                  marginBottom: 4,
                }}
              >
                {skillGroups.map((g) => (
                  <button
                    key={g.id}
                    className="about-stab"
                    onClick={() => setTab(g.id)}
                    style={{
                      color: tab === g.id ? c.tabActive : c.tabInactive,
                      borderBottomColor:
                        tab === g.id ? c.tabBorder : "transparent",
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Skill rows */}
              <div>
                {group?.skills.map((skill, i) => (
                  <SkillRow
                    key={`${tab}-${skill.name}`}
                    skill={skill}
                    dark={dark}
                    index={i}
                  />
                ))}
              </div>

              {/* Stat cards — monochrome, real numbers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {[
                  { label: "Projects", value: "10+" },
                  { label: "Algorithmic Problems", value: "200+" },
                  { label: "AI Systems", value: "6" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      border: `1px solid ${c.cardBorder}`,
                      borderRadius: 10,
                      padding: "14px 8px",
                      textAlign: "center",
                      background: c.cardBg,
                      transition: "border-color 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = dark
                        ? "#555"
                        : "#aaa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = c.cardBorder)
                    }
                  >
                    <div
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 26,
                        color: c.heading,
                        marginBottom: 4,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: c.subtext,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Statement */}
              <div
                style={{
                  marginTop: 10,
                  border: `1px solid ${c.stripBorder}`,
                  borderRadius: 10,
                  padding: "20px 20px",
                  background: c.stripBg,
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: c.heading,
                    lineHeight: 1.2,
                  }}
                >
                  Drawn to Complexity
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11.5,
                    color: c.stripText,
                    lineHeight: 1.65,
                    letterSpacing: "0.02em",
                  }}
                >
                  Motivated by problems that demand more than a quick fix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
