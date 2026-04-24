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
  { text: "[OK] jarvis       initialized", cls: "green", delay: 2800 },
  { text: "[BUILDING] pdf-to-3d", cls: "green", delay: 3050 },
  { text: "[ITERATING] gesture-arch", cls: "green", delay: 3300 },
  { text: "~ boundaries breaking", cls: "green", delay: 3400 },

  { text: null, cls: "gap", delay: 3600 },

  { text: "$ echo $STATUS", cls: "dim", delay: 3800 },
  { text: "building things that shouldn't exist.", cls: "accent", delay: 4200 },

  // 👇 NEW COMMAND INTERFACE SECTION
  { text: null, cls: "gap", delay: 4700 },
  { text: "$ ./launch", cls: "dim", delay: 5000 },
  { text: "initializing command interface...", cls: "", delay: 5400 },
  { text: "[system] ready", cls: "green", delay: 5800 },
  { text: "[hint] press Ctrl + K", cls: "dim", delay: 6200 },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Yuvraj-Malik",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yuvraj-malik-b00005303/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Yuvraj-Malik/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/ymalik_be24",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.257.004C5.29.004.493 4.8.493 10.768c0 3.228 1.418 6.122 3.666 8.123L2.894 21.5l2.707-1.258a10.22 10.22 0 0 0 5.656 1.754c5.967 0 10.764-4.796 10.764-10.764C22.021 5.266 17.678.004 11.257.004zm-.001 1.5c5.139 0 9.263 4.124 9.263 9.264 0 5.139-4.124 9.263-9.263 9.263a8.74 8.74 0 0 1-4.921-1.508l-1.877.872.826-2.01a8.717 8.717 0 0 1-2.291-5.903c0-5.139 4.124-9.978 8.263-9.978zm.805 3.644c-.447 0-.854.148-1.168.393l-.002-.002c-.022.017-.041.036-.062.054a1.846 1.846 0 0 0-.676 1.433c0 1.022.83 1.852 1.852 1.852h.056c.022 0 .043-.003.065-.004.943-.05 1.685-.83 1.685-1.789 0-.99-.803-1.879-1.75-1.937zm-3.21 3.577c-1.5.007-2.84 1.084-2.84 2.84 0 1.547 1.082 2.666 2.535 2.84h.588c1.45-.174 2.533-1.293 2.533-2.84 0-1.547-1.136-2.833-2.535-2.84h-.281zm6.364 0c-1.393.014-2.531 1.3-2.531 2.84 0 1.547 1.082 2.666 2.533 2.84h.588c1.45-.174 2.533-1.293 2.533-2.84 0-1.756-1.334-2.833-2.84-2.84h-.283z" />
      </svg>
    ),
  },
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
    if (cls === "dim") return { color: dark ? "#cdcdcd" : "#464646" };
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
              color: dark ? "#777" : "#202020",
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
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: dark ? "#f0f0f0" : "#111",
              textDecoration: "none",
              padding: "7px 14px",
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
            {s.icon}
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
        className="relative flex items-center px-4 sm:px-6 md:px-12 overflow-hidden"
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
              : "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "88px",
            paddingBottom: "8px",
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
                fontSize: "clamp(34px, 8vw, 66px)",
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
                fontSize: "clamp(13px, 2.6vw, 15px)",
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
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "48px",
                flexWrap: "wrap",
              }}
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
                href="/Resume_Yuvraj_Malik.pdf"
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
                gap: "clamp(20px, 6vw, 48px)",
                paddingTop: "40px",
                marginTop: "8px",
                borderTop: dark ? "1px solid #333" : "1px solid #e8e8e8",
                flexWrap: "wrap",
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
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: dark ? "#b4b4b4" : "#999",
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
