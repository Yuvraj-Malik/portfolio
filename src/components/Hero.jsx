import { useState, useEffect, useRef } from "react";

const BOOT_LINES = [
  { text: "$ whoami", cls: "dim", delay: 400 },
  { text: "yuvraj malik", cls: "", delay: 900 },
  { text: null, cls: "gap", delay: 1200 },
  { text: "$ ls projects/", cls: "dim", delay: 1400 },
  { text: "pdf-to-3d/        jarvis-ai/", cls: "", delay: 1850 },
  { text: "gesture-arch/     event-mgr/", cls: "", delay: 1950 },
  { text: null, cls: "gap", delay: 2200 },
  { text: "$ ./status.sh", cls: "dim", delay: 2400 },
  { text: "✓ jarvis          running", cls: "green", delay: 2800 },
  { text: "✓ pdf-to-3d       deployed", cls: "green", delay: 3050 },
  { text: "✓ gesture-arch    in progress", cls: "green", delay: 3300 },
  { text: null, cls: "gap", delay: 3500 },
  { text: "$ echo $STATUS", cls: "dim", delay: 3700 },
  { text: "building things that shouldn't exist.", cls: "accent", delay: 4100 },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/yuvrajmalik" },
  { name: "LinkedIn", href: "https://linkedin.com/in/yuvraj-malik" },
  { name: "LeetCode", href: "https://leetcode.com/yuvraj" },
  { name: "CodeChef", href: "https://codechef.com/users/yuvraj" },
];

const PRINCIPLES = [
  { val: "Performance", label: "First" },
  { val: "Scalability", label: "Built-In" },
  { val: "Clarity", label: "By Design" },
];

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

function TerminalCard({ dark }) {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const timers = BOOT_LINES.map(({ text, cls, delay }, i) =>
      setTimeout(() => {
        setLines((prev) => [...prev, { text, cls, id: i }]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setShowCursor(true), 300);
        }
      }, delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const lineStyle = (cls) => {
    if (cls === "dim") return { color: dark ? "#666" : "#bbb" };
    if (cls === "green") return { color: dark ? "#4ade80" : "#16a34a" };
    if (cls === "accent")
      return { color: dark ? "#ffffff" : "#111111", fontWeight: 500 };
    return { color: dark ? "#aaa" : "#777" };
  };

  return (
    <div style={{ width: "100%", maxWidth: "540px" }}>
      {/* Glass card */}
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: dark
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.9)",
          background: dark ? "rgba(16,16,16,0.9)" : "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: dark
            ? "0 0 0 1px rgba(255,255,255,0.08), 0 16px 56px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 16px 56px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "14px 18px",
            borderBottom: dark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(0,0,0,0.06)",
            background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: dark ? "#777" : "#bbb",
              marginLeft: "8px",
            }}
          >
            yuvraj@portfolio ~ zsh
          </span>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          style={{
            padding: "20px 22px 24px",
            fontFamily: "'DM Mono', monospace",
            fontSize: "12.5px",
            lineHeight: 1.9,
            minHeight: "280px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {lines.map(({ text, cls, id }) =>
            cls === "gap" ? (
              <div key={id} style={{ height: "6px" }} />
            ) : (
              <div
                key={id}
                style={{
                  ...lineStyle(cls),
                  animation: "hero-term-in 0.25s ease both",
                }}
              >
                {text}
              </div>
            ),
          )}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 13,
                background: dark ? "#ddd" : "#111",
                opacity: 0.6,
                verticalAlign: "text-bottom",
                marginLeft: 2,
                animation: "hero-blink 1.1s step-start infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Social pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "14px",
          flexWrap: "wrap",
        }}
      >
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: dark ? "#f0f0f0" : "#111",
              textDecoration: "none",
              padding: "7px 16px",
              borderRadius: "100px",
              border: dark
                ? "1px solid rgba(255,255,255,0.3)"
                : "1px solid rgba(0,0,0,0.2)",
              background: dark
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.8)",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark ? "#fff" : "#111";
              e.currentTarget.style.color = dark ? "#111" : "#fff";
              e.currentTarget.style.borderColor = dark ? "#fff" : "#111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.8)";
              e.currentTarget.style.color = dark ? "#f0f0f0" : "#111";
              e.currentTarget.style.borderColor = dark
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.2)";
            }}
          >
            {s.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const dark = useDarkMode();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-term-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 0; }
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        .hero-a1 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .hero-a2 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .hero-a3 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .hero-a4 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .hero-a5 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-a6 { animation: hero-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .hero-term-body::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center px-8 md:px-12 overflow-hidden"
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
          className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "96px",
            paddingBottom: "60px",
          }}
        >
          {/* ── LEFT ── */}
          <div style={{ maxWidth: "480px" }}>
            {/* Badge */}
            <div
              className="hero-a1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: dark
                  ? "1px solid rgba(255,255,255,0.35)"
                  : "1px solid rgba(0,0,0,0.18)",
                borderRadius: "100px",
                padding: "5px 14px 5px 10px",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "hero-pulse 2.5s infinite",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: dark ? "#e0e0e0" : "#333",
                  fontWeight: 500,
                }}
              >
                Systems Thinking • AI • Full-Stack
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-a2"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(40px, 5vw, 66px)",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: dark ? "#ffffff" : "#050505",
                marginBottom: "22px",
              }}
            >
              I build software
              <br />
              that feels like{" "}
              <em
                style={{ fontStyle: "italic", color: dark ? "#999" : "#555" }}
              >
                science fiction.
              </em>
            </h1>

            {/* Subline */}
            <p
              className="hero-a3"
              style={{
                fontSize: "15px",
                color: dark ? "#b0b0b0" : "#555",
                lineHeight: 1.75,
                fontWeight: 400,
                maxWidth: "400px",
                marginBottom: "40px",
              }}
            >
              I combine strong fundamentals with practical execution — building
              systems that{" "}
              <span
                style={{ color: dark ? "#ffffff" : "#111", fontWeight: 500 }}
              >
                perform, scale, and solve real problems.
              </span>
            </p>

            {/* CTAs */}
            <div
              className="hero-a4"
              style={{ display: "flex", gap: "12px", marginBottom: "48px" }}
            >
              <a
                href="#projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  background: dark ? "#f0f0f0" : "#111",
                  color: dark ? "#111" : "#fff",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Work →
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 22px",
                  borderRadius: "100px",
                  border: dark ? "1px solid #555" : "1px solid #ccc",
                  color: dark ? "#ccc" : "#555",
                  fontSize: "13.5px",
                  textDecoration: "none",
                  background: "transparent",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = dark ? "#fff" : "#111";
                  e.currentTarget.style.borderColor = dark ? "#aaa" : "#555";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = dark ? "#ccc" : "#555";
                  e.currentTarget.style.borderColor = dark ? "#555" : "#ccc";
                }}
              >
                Resume ↓
              </a>
            </div>

            {/* Principles */}
            <div
              className="hero-a5"
              style={{
                display: "flex",
                gap: "48px",
                paddingTop: "40px",
                marginTop: "8px",
                borderTop: dark ? "1px solid #333" : "1px solid #e8e8e8",
              }}
            >
              {PRINCIPLES.map((m) => (
                <div key={m.label}>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "28px",
                      lineHeight: 1.1,
                      color: dark ? "#ffffff" : "#0a0a0a",
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {m.val}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12.5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: dark ? "#666" : "#999",
                      fontWeight: 500,
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* ── RIGHT ── */}
          <div
            className="hero-a6"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TerminalCard dark={dark} />
          </div>
        </div>
      </section>
    </>
  );
}
