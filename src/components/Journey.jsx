import { useState, useEffect } from "react";

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark")),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return dark;
}

const TIMELINE = [
  {
    year: "2026",
    items: [
      {
        title: "Spatial Console",
        type: "project",
        description:
          "Gesture-controlled 3D structural simulation. BFS stability validation, MediaPipe pointer emulation, React + Three.js.",
      },
      {
        title: "Stark Paper Analyzer",
        type: "project",
        description:
          "Research PDF to structured intelligence. Token-aware chunking, JSON-enforced LLM output, async FastAPI backend.",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Code Vault",
        type: "project",
        description:
          "Full-stack coding competition platform. Drag-and-drop engine, live leaderboard, anti-cheat panel. Hosted 30 teams.",
      },
      {
        title: "Anime Clash",
        type: "project",
        description:
          "Popularity game with deterministic daily challenges via seeded PRNG. Three gameplay modes, serverless backend.",
      },
      {
        title: "Air Canvas",
        type: "project",
        description:
          "Touchless drawing via computer vision. 5000x5000 canvas, gesture tool switching, shape detection from freehand strokes.",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Bomb Difuse",
        type: "project",
        description:
          "Arduino reaction game. Hardware interrupt input polling, randomized LED engine, PWM buzzer feedback.",
      },
      {
        title: "AI Pose Systems",
        type: "project",
        description:
          "Two biomechanical trackers — high knees form scoring and squat depth analysis — on one shared pose pipeline.",
      },
    ],
  },
];

const ROLES = [
  {
    role: "Core Member",
    org: "LEAD Society, TIET",
    duration: "Aug 2025 — Present",
    type: "Leadership",
    bullets: [
      "Leading technical workshops on HTML, CSS, and Git",
      "Driving event development and technical initiatives",
      "Mentoring junior developers across the society",
    ],
  },
  {
    role: "AI/ML Intern",
    org: "Auraflo",
    duration: "Mar 2025 — Sep 2025",
    type: "Industry",
    bullets: [
      "Built CV pipelines using TensorFlow Lite, OpenCV, PyTorch",
      "Developed real-time pose detection and motion classification",
      "Engineered a sensor glove for motion pattern identification",
    ],
  },
  {
    role: "B.E. Computer Engineering",
    org: "Thapar Institute of Engineering & Technology",
    duration: "2023 — 2027",
    type: "Education",
    bullets: [
      "Core focus: systems, algorithms, data structures, AI",
      "Active in technical societies and project-based learning",
      "Building real systems alongside academic fundamentals",
    ],
  },
];

const TYPE_CONFIG = {
  project: { label: "Project", bg: "#a0c4ff", text: "#1a56db" },
  role: { label: "Role", bg: "#a8f0c6", text: "#1a7a4a" },
  education: { label: "Education", bg: "#ffd6a5", text: "#92400e" },
};

function TypeTag({ type, dark: isDark }) {
  const cfg = TYPE_CONFIG[type];
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: isDark ? cfg.bg : cfg.text,
        border: `1px solid ${isDark ? cfg.bg + "55" : cfg.text + "55"}`,
        background: isDark ? cfg.bg + "11" : cfg.text + "0d",
        borderRadius: 4,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}

export default function Journey() {
  const dark = useDarkMode();

  const c = {
    heading: dark ? "#ffffff" : "#050505",
    subtext: dark ? "#aaaaaa" : "#666666",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#222222" : "#e8e8e8",
    line: dark ? "#282828" : "#e4e4e4",
    cardBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
    cardBorder: dark ? "#1e1e1e" : "#ececec",
    cardHover: dark ? "#2e2e2e" : "#d4d4d4",
    yearColor: dark ? "#444444" : "#c0c0c0",
    bullet: dark ? "#484848" : "#cccccc",
    bulletText: dark ? "#999999" : "#666666",
    sectionLabel: dark ? "#555555" : "#bbbbbb",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes jx-fade { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .jx-a1 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .jx-a2 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .jx-a3 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
        .jx-card { transition: border-color 0.15s ease; }
      `}</style>

      <section
        id="journey"
        style={{
          padding: "7.5rem 3rem 6rem 3rem",
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
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Label row */}
          <div
            className="jx-a1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
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
              — Journey
            </span>
            <div style={{ flex: 1, height: 1, background: c.divider }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
              }}
            >
              04
            </span>
          </div>

          {/* Heading */}
          <div className="jx-a2" style={{ marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: c.heading,
                marginBottom: 8,
              }}
            >
              How I got{" "}
              <em
                style={{ fontStyle: "italic", color: dark ? "#888" : "#aaa" }}
              >
                here.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: c.subtext,
                lineHeight: 1.6,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              Projects built and roles held — in the order they shaped my
              thinking.
            </p>
          </div>

          {/* Two-column layout */}
          <div
            className="jx-a3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "start",
            }}
          >
            {/* LEFT: project timeline */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.sectionLabel,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Projects
              </p>

              {TIMELINE.map((group, gi) => (
                <div
                  key={group.year}
                  style={{ display: "grid", gridTemplateColumns: "36px 1fr" }}
                >
                  {/* Year + vertical line */}
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 13,
                        fontStyle: "italic",
                        color: c.yearColor,
                        display: "block",
                        lineHeight: 1,
                        marginBottom: 16,
                        marginTop: 2,
                      }}
                    >
                      {group.year}
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 3,
                        bottom: gi < TIMELINE.length - 1 ? -12 : 0,
                        width: 1,
                        background: c.line,
                      }}
                    />
                  </div>

                  {/* Cards */}
                  <div
                    style={{ paddingBottom: gi < TIMELINE.length - 1 ? 12 : 0 }}
                  >
                    {group.items.map((item, ii) => (
                      <div
                        key={ii}
                        style={{
                          position: "relative",
                          marginBottom: ii < group.items.length - 1 ? 7 : 0,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: -22,
                            top: 13,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: dark ? "#2e2e2e" : "#e0e0e0",
                            border: `1px solid ${dark ? "#3e3e3e" : "#ccc"}`,
                            zIndex: 2,
                          }}
                        />
                        <div
                          className="jx-card"
                          style={{
                            border: `1px solid ${c.cardBorder}`,
                            borderRadius: 8,
                            padding: "11px 14px",
                            background: c.cardBg,
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
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 5,
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "'Instrument Serif', Georgia, serif",
                                fontSize: 15,
                                fontWeight: 400,
                                color: c.heading,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {item.title}
                            </span>
                            <TypeTag type={item.type} dark={dark} />
                          </div>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 11,
                              color: dark ? "#777" : "#999",
                              lineHeight: 1.6,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: roles + education */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.sectionLabel,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Roles & Education
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {ROLES.map((r, i) => (
                  <div
                    key={i}
                    className="jx-card"
                    style={{
                      border: `1px solid ${c.cardBorder}`,
                      borderRadius: 10,
                      padding: "18px 20px",
                      background: c.cardBg,
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
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: 17,
                          fontWeight: 400,
                          color: c.heading,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.2,
                        }}
                      >
                        {r.role}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: dark ? "#666" : "#aaa",
                          border: `1px solid ${dark ? "#333" : "#ddd"}`,
                          borderRadius: 4,
                          padding: "2px 6px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {r.type}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: dark ? "#999" : "#777",
                        display: "block",
                        marginBottom: 2,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {r.org}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: dark ? "#484848" : "#c0c0c0",
                        display: "block",
                        marginBottom: 14,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {r.duration}
                    </span>
                    <div
                      style={{
                        height: 1,
                        background: dark ? "#1c1c1c" : "#f0f0f0",
                        marginBottom: 12,
                      }}
                    />
                    {r.bullets.map((b, bi) => (
                      <div
                        key={bi}
                        style={{
                          display: "flex",
                          gap: 10,
                          padding: "5px 0",
                          borderBottom:
                            bi < r.bullets.length - 1
                              ? `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}`
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: c.bullet,
                            flexShrink: 0,
                          }}
                        >
                          —
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: c.bulletText,
                            lineHeight: 1.6,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
