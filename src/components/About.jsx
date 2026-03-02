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
          color: hovered ? (dark ? "#c3c3c3" : "#060606") : dark ? "#6f6f6f" : "#606060",
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
    cardBorder: dark ? "#afafaf" : "#383838",
    cardBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    cardHover: dark ? "#555" : "#ccc",
    stripBorder: dark ? "#afafaf" : "#383838",
    stripBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    stripText: dark ? "#b0b0b0" : "#555",
    photoBg: dark ? "#1a1a1a" : "#f0f0f0",
    photoBorder: dark ? "#333" : "#e0e0e0",
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
                }}
              >
                <p style={{ margin: 0 }}>
                  I'm Yuvraj, a Computer Engineering student at TIET Patiala. I
                  enjoy building things that push me to learn beyond the
                  classroom — especially projects that feel slightly outside my
                  comfort zone.
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
                  projects — because writing ambitious systems matters, but{" "}
                  <span style={{ color: c.emphasis, fontWeight: 500 }}>
                    understanding what's under the hood matters just as much.
                  </span>
                </p>
              </div>

              {/* Photo */}
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingTop: 28,
                  borderTop: `1px solid ${c.divider}`,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: c.photoBg,
                    border: `1px solid ${c.photoBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
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
                <div>
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
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: c.label,
                      letterSpacing: "0.06em",
                    }}
                  >
                    CS Eng · TIET Patiala
                  </p>
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

              {/* Skill rows — name left, context right, hover brightens */}
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

              {/* Stat cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {[
                  {
                    label: "Projects",
                    value: "10+",
                    color: dark ? "#4ade80" : "#16a34a",
                  },
                  {
                    label: "AI Systems",
                    value: "4",
                    color: dark ? "#22d3ee" : "#0891b2",
                  },
                  {
                    label: "Focus Now",
                    value: "DSA",
                    color: dark ? "#f472b6" : "#db2777",
                  },
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
                      (e.currentTarget.style.borderColor = c.cardHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = c.cardBorder)
                    }
                  >
                    <div
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 26,
                        color: s.color,
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
                        color: c.label,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
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
                  border: `1px solid ${c.stripBorder}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  background: c.stripBg,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: c.label,
                    flexShrink: 0,
                  }}
                >
                  //
                </span>
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
                  build ambitious things · understand them deeply · make them
                  actually work
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
