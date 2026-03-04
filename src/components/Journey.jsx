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
    title: "Spatial Console",
    type: "project",
    tip: "Gesture-controlled 3D structural simulation",
    stack: "React · Three.js · MediaPipe",
  },
  {
    year: "2026",
    title: "Stark Paper Analyzer",
    type: "project",
    tip: "Research PDF → structured intelligence",
    stack: "FastAPI · Gemini 2.5 · React",
  },
  {
    year: "2026",
    title: "Anime Clash",
    type: "project",
    tip: "Deterministic daily anime popularity game",
    stack: "Vanilla JS · Netlify Functions",
  },
  {
    year: "2026",
    title: "Code Vault",
    type: "project",
    tip: "Live coding competition platform",
    stack: "React 19 · Node.js · MongoDB",
  },
  {
    year: "2026",
    title: "Air Canvas",
    type: "project",
    tip: "Touchless real-time drawing via CV",
    stack: "Python · OpenCV · MediaPipe",
  },
  {
    year: "2026",
    title: "Web Dev Intern — SkillCraft",
    type: "internship",
    tip: "Frontend development internship",
    stack: "React · HTML5",
  },
  {
    year: "2025",
    title: "Bomb Difuse",
    type: "project",
    tip: "Arduino reaction game with LED + buzzer",
    stack: "Arduino C++ · Embedded I/O",
  },
  {
    year: "2025",
    title: "Core Member — LEAD",
    type: "leadership",
    tip: "Technical workshops, events, mentoring",
    stack: "LEAD Society, TIET",
  },
  {
    year: "2025",
    title: "AI Pose Systems",
    type: "project",
    tip: "High knees + squat depth form trackers",
    stack: "Python · TensorFlow Lite · MoveNet",
  },
  {
    year: "2025",
    title: "AI/ML Intern — Auraflo",
    type: "internship",
    tip: "CV pipelines + sensor glove motion detection",
    stack: "TensorFlow · OpenCV · PyTorch",
  },
  {
    year: "2024",
    title: "Executive Member — OWASP TIET",
    type: "leadership",
    tip: "Security-focused technical society",
    stack: "OWASP Chapter, TIET",
  },
  {
    year: "2024",
    title: "Executive Member — LEAD",
    type: "leadership",
    tip: "Led Seaferno tech event, workshops",
    stack: "LEAD Society, TIET",
  },
  {
    year: "2024",
    title: "B.E. Computer Engineering",
    type: "education",
    tip: "Systems, algorithms, AI fundamentals",
    stack: "Thapar Institute · 2024–2028",
  },
];

const ROLES = [
  {
    role: "Core Member",
    org: "LEAD Society, TIET",
    duration: "Oct 2024 — Present",
    type: "Leadership",
    bullets: [
      "Leading technical workshops on HTML, CSS, and Git",
      "Driving event development and technical initiatives",
      "Mentoring junior developers across the society",
    ],
  },
  {
    role: "Web Development Intern",
    org: "SkillCraft Technology",
    duration: "Jan 2026 — Jan 2026",
    type: "Internship",
    bullets: [
      "Built web interfaces using React.js and HTML5",
      "Worked remotely on frontend development tasks",
      "Applied component-based architecture in real projects",
    ],
  },
  {
    role: "AI/ML Intern",
    org: "Auraflo",
    duration: "Mar 2025 — Sep 2025",
    type: "Internship",
    bullets: [
      "Built CV pipelines using TensorFlow Lite, OpenCV, PyTorch",
      "Developed real-time pose detection and motion classification",
      "Engineered a sensor glove for motion pattern identification",
    ],
  },
  {
    role: "B.E. Computer Engineering",
    org: "Thapar Institute of Engineering & Technology",
    duration: "2024 — 2028",
    type: "Education",
    bullets: [
      "Core focus: systems, algorithms, data structures, AI",
      "Active in technical societies and project-based learning",
      "Building real systems alongside academic fundamentals",
    ],
  },
];

const TYPE_DOT = {
  project: { dark: "#4a7fa5", light: "#2563a8" },
  leadership: { dark: "#4a9e6e", light: "#1a6e45" },
  internship: { dark: "#9e7a4a", light: "#7a4e1a" },
  education: { dark: "#8b6faa", light: "#5e3d8a" },
};

const TYPE_BADGE = {
  Leadership: { dark: "#4a9e6e", light: "#1a6e45" },
  Internship: { dark: "#9e7a4a", light: "#7a4e1a" },
  Education: { dark: "#8b6faa", light: "#5e3d8a" },
};

export default function Journey() {
  const dark = useDarkMode();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const c = {
    heading: dark ? "#ffffff" : "#080808",
    subtext: dark ? "#cccccc" : "#444444",
    body: dark ? "#b8b8b8" : "#333333",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#222222" : "#e8e8e8",
    line: dark ? "#2a2a2a" : "#dedede",
    cardBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
    cardBorder: dark ? "#1e1e1e" : "#e0e0e0",
    cardHover: dark ? "#303030" : "#c8c8c8",
    yearColor: dark ? "#a3a3a3" : "#444444",
    bullet: dark ? "#909090" : "#aaaaaa",
    bulletText: dark ? "#aaaaaa" : "#444444",
    roleTitle: dark ? "#ffffff" : "#111111",
    roleOrg: dark ? "#bbbbbb" : "#555555", 
    roleDur: dark ? "#989898" : "#474646",
    badgeBorder: dark ? "#333333" : "#cccccc",
    badgeText: dark ? "#888888" : "#777777",
  };

  const years = [...new Set(TIMELINE.map((t) => t.year))];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes jx-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tip-in  { from { opacity:0; transform:translateY(-50%) scale(0.97); } to { opacity:1; transform:translateY(-50%) scale(1); } }
        .jx-a1 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .jx-a2 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .jx-a3 { animation: jx-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
        .jx-card { transition: border-color 0.15s ease; }
      `}</style>

      <section
        id="journey"
        style={{
          padding: "7.5rem 3rem 3rem 3rem",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Dot grid */}
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
                fontSize: 11,
                color: dark ? "#a4a4a4" : "#5d5d5d",
                lineHeight: 1.6,
                letterSpacing: "0.02em",
                margin: 0,
                maxWidth: 440,
              }}
            >
              Projects built and roles held — in the order they shaped my
              thinking.
            </p>
          </div>

          {/* Two-column */}
          <div
            className="jx-a3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "start",
            }}
          >
            {/* LEFT: timeline */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.yearColor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Timeline
              </p>

              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 5,
                    bottom: 8,
                    width: 1,
                    background: c.line,
                  }}
                />

                {years.map((year, yi) => {
                  const items = TIMELINE.filter((t) => t.year === year);
                  return (
                    <div
                      key={year}
                      style={{ marginBottom: yi < years.length - 1 ? 20 : 0 }}
                    >
                      {/* Year separator */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 1,
                            background: dark ? "#333" : "#ddd",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            color: c.yearColor,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {year}
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: 1,
                            background: dark ? "#222" : "#eaeaea",
                          }}
                        />
                      </div>

                      {/* Items */}
                      {items.map((item, ii) => {
                        const dotColor = TYPE_DOT[item.type];
                        const key = `${yi}-${ii}`;
                        const isHovered = hoveredIdx === key;
                        return (
                          <div
                            key={ii}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              marginBottom: ii < items.length - 1 ? 6 : 0,
                              cursor: "default",
                              width: "fit-content",
                            }}
                            onMouseEnter={() => setHoveredIdx(key)}
                            onMouseLeave={() => setHoveredIdx(null)}
                          >
                            {/* Dot */}
                            <div
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                flexShrink: 0,
                                marginLeft: 2,
                                background: dark
                                  ? dotColor.dark
                                  : dotColor.light,
                                zIndex: 2,
                                position: "relative",
                                transition: "transform 0.15s ease",
                                transform: isHovered
                                  ? "scale(1.5)"
                                  : "scale(1)",
                              }}
                            />

                            {/* Title + tooltip wrapper */}
                            <span
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    item.type === "project"
                                      ? "'Instrument Serif', Georgia, serif"
                                      : "'DM Mono', monospace",
                                  fontSize: item.type === "project" ? 14 : 11.5,
                                  color: isHovered
                                    ? dark
                                      ? "#ffffff"
                                      : "#000000"
                                    : c.body,
                                  letterSpacing:
                                    item.type === "project"
                                      ? "-0.01em"
                                      : "0.02em",
                                  lineHeight: 1.3,
                                  transition: "color 0.15s ease",
                                }}
                              >
                                {item.title}
                              </span>

                              {/* Tooltip */}
                              {isHovered && (
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "calc(100% + 10px)",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: dark ? "#0e0e0e" : "#ffffff",
                                    border: `1px solid ${dark ? "#2a2a2a" : "#e0e0e0"}`,
                                    borderRadius: 8,
                                    padding: "8px 12px",
                                    whiteSpace: "nowrap",
                                    zIndex: 20,
                                    pointerEvents: "none",
                                    boxShadow: dark
                                      ? "0 4px 20px rgba(0,0,0,0.5)"
                                      : "0 4px 20px rgba(0,0,0,0.1)",
                                    animation: "tip-in 0.12s ease both",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0 0 3px 0",
                                      fontFamily: "'DM Mono', monospace",
                                      fontSize: 11,
                                      color: dark ? "#dddddd" : "#222222",
                                      letterSpacing: "0.02em",
                                    }}
                                  >
                                    {item.tip}
                                  </p>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontFamily: "'DM Mono', monospace",
                                      fontSize: 10,
                                      color: dark ? "#555555" : "#aaaaaa",
                                      letterSpacing: "0.04em",
                                    }}
                                  >
                                    {item.stack}
                                  </p>
                                </div>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: `1px solid ${c.divider}`,
                  flexWrap: "wrap",
                }}
              >
                {Object.entries(TYPE_DOT).map(([type, colors]) => (
                  <div
                    key={type}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: dark ? colors.dark : colors.light,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        color: dark ? "#c9c9c9" : "#4a4a4a",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: roles + education */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.yearColor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Roles & Education
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {ROLES.map((r, i) => {
                  const badgeColor = TYPE_BADGE[r.type];
                  return (
                    <div
                      key={i}
                      className="jx-card"
                      style={{
                        border: `1px solid ${c.cardBorder}`,
                        borderRadius: 10,
                        padding: "14px 16px",
                        background: c.cardBg,
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = c.cardHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = c.cardBorder)
                      }
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: badgeColor
                            ? dark
                              ? badgeColor.dark
                              : badgeColor.light
                            : c.badgeText,
                          border: `1px solid ${badgeColor ? (dark ? badgeColor.dark + "66" : badgeColor.light + "66") : c.badgeBorder}`,
                          background: badgeColor
                            ? dark
                              ? badgeColor.dark + "14"
                              : badgeColor.light + "0e"
                            : "transparent",
                          borderRadius: 4,
                          padding: "2px 7px",
                          display: "inline-block",
                          alignSelf: "flex-start",
                          marginBottom: 10,
                        }}
                      >
                        {r.type}
                      </span>

                      <span
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: 15,
                          fontWeight: 400,
                          color: c.roleTitle,
                          letterSpacing: "0.01em",
                          lineHeight: 1.2,
                          marginBottom: 4,
                        }}
                      >
                        {r.role}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 10.5,
                          color: c.roleOrg,
                          display: "block",
                          marginBottom: 2,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {r.org}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 10,
                          color: c.roleDur,
                          display: "block",
                          marginBottom: 12,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {r.duration}
                      </span>

                      <div
                        style={{
                          height: 1,
                          background: dark ? "#1c1c1c" : "#eeeeee",
                          marginBottom: 10,
                        }}
                      />

                      {r.bullets.map((b, bi) => (
                        <div
                          key={bi}
                          style={{
                            display: "flex",
                            gap: 8,
                            padding: "3px 0",
                            borderBottom:
                              bi < r.bullets.length - 1
                                ? `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}`
                                : "none",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10,
                              color: c.bullet,
                              flexShrink: 0,
                            }}
                          >
                            —
                          </span>
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10,
                              color: c.bulletText,
                              lineHeight: 1.55,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
