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

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);
const LeetCodeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  { label: "Spatial Console", id: "spatial-console" },
  { label: "Stark Paper Analyzer", id: "stark-paper-analyzer" },
  { label: "Jarvis", id: "jarvis" },
  { label: "Code Vault", id: "code-vault" },
  { label: "Air Canvas", id: "air-canvas" },
];

function openProject(id) {
  window.location.hash = id;
  setTimeout(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 50);
}

export default function Footer() {
  const dark = useDarkMode();

  const c = {
    bg: dark ? "#060606" : "#f5f5f5",
    heading: dark ? "#ffffff" : "#080808",
    body: dark ? "#777777" : "#888888",
    label: dark ? "#aaaaaa" : "#494949",
    divider: dark ? "#141414" : "#e8e8e8",
    link: dark ? "#9d9d9d" : "#5b5b5b",
    linkHover: dark ? "#ffffff" : "#000000",
    iconBg: dark ? "#111111" : "#eeeeee",
    iconHover: dark ? "#1e1e1e" : "#e0e0e0",
    iconColor: dark ? "#777777" : "#888888",

    btnBg: dark ? "#ffffff" : "#111111",
    btnText: dark ? "#111111" : "#ffffff",
    mutedBtnBg: dark ? "#111111" : "#eeeeee",
    mutedBtnText: dark ? "#666666" : "#888888",
    dot: "#4ade80",
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .ft-link {
          transition: color 0.15s ease;
          text-decoration: none;
        }
        .ft-link:hover { color: ${c.linkHover} !important; }
        .ft-icon {
          transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }
        .ft-icon:hover {
          background: ${c.iconHover} !important;
          color: ${c.heading} !important;
          transform: translateY(-1px);
        }
        .ft-top {
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .ft-top:hover { opacity: 0.7 !important; transform: translateY(-2px); }

      `}</style>

      <footer
        style={{
          background: c.bg,
          borderTop: `1px solid ${c.divider}`,
          padding: "60px 3rem 0 3rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* ── Main grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1fr 1.4fr",
              gap: 48,
              paddingBottom: 48,
              borderBottom: `1px solid ${c.divider}`,
            }}
          >
            {/* COL 1 — Brand */}
            <div>
              <p
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: c.heading,
                  margin: "0 0 10px 0",
                }}
              >
                Yuvraj Malik
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: c.body,
                  lineHeight: 1.75,
                  letterSpacing: "0.02em",
                  margin: "0 0 24px 0",
                  maxWidth: 280,
                }}
              >
                Building systems where logic meets design. Full-stack
                development, AI/ML, and turning ideas into real products.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {[
                  {
                    icon: <GithubIcon />,
                    href: "https://github.com/Yuvraj-Malik",
                    label: "GitHub",
                  },
                  {
                    icon: <LinkedInIcon />,
                    href: "https://www.linkedin.com/in/yuvraj-malik-b00005303/",
                    label: "LinkedIn",
                  },
                  {
                    icon: <EmailIcon />,
                    href: "mailto:yuvraj.malik003@gmail.com",
                    label: "Email",
                  },
                  {
                    icon: <LeetCodeIcon />,
                    href: "https://leetcode.com/u/Yuvraj_Malik/",
                    label: "LeetCode",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="ft-icon"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: c.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: c.iconColor,
                      textDecoration: "none",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Status pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 12px",
                  border: `1px solid ${dark ? "#1a2a1a" : "#c8e6c8"}`,
                  borderRadius: 100,
                  background: dark
                    ? "rgba(74,222,128,0.05)"
                    : "rgba(74,222,128,0.08)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: c.dot,
                    boxShadow: `0 0 6px ${c.dot}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: dark ? "#4ade80" : "#1a7a3a",
                    letterSpacing: "0.08em",
                  }}
                >
                  Available for collaboration
                </span>
              </div>
            </div>

            {/* COL 2 — Navigation */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: c.label,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Navigation
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {NAV_LINKS.map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    className="ft-link"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      color: c.link,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* COL 3 — Featured Work */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: c.label,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Featured Work
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {PROJECTS.map((p, i) => (
                  <a
                    key={i}
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      openProject(p.id);
                    }}
                    className="ft-link"
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 14,
                      color: c.link,
                      letterSpacing: "-0.01em",
                      cursor: "pointer",
                    }}
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            {/* COL 4 — CTA */}
            <div
              style={{
                padding: "24px",
                border: `1px solid ${c.divider}`,
                borderRadius: 12,
                background: dark
                  ? "rgba(255,255,255,0.015)"
                  : "rgba(0,0,0,0.015)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 17,
                  color: c.heading,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  margin: "0 0 8px 0",
                }}
              >
                Let's build something meaningful.
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: c.body,
                  lineHeight: 1.7,
                  letterSpacing: "0.02em",
                  margin: "0 0 20px 0",
                }}
              >
                Have an idea or challenge? Let's turn it into something real.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href="mailto:yuvraj.malik003@gmail.com"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: c.btnText,
                    background: c.btnBg,
                    textDecoration: "none",
                    borderRadius: 100,
                    padding: "9px 18px",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    transition: "opacity 0.15s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Email Me →
                </a>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: c.mutedBtnText,
                    background: c.mutedBtnBg,
                    textDecoration: "none",
                    borderRadius: 100,
                    padding: "9px 18px",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    transition: "opacity 0.15s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  View Resume ↓
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 0",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: c.label,
                letterSpacing: "0.06em",
              }}
            >
              © {new Date().getFullYear()} Yuvraj Malik. All rights reserved.
            </span>

            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: c.label,
                letterSpacing: "0.04em",
                fontStyle: "italic",
              }}
            >
              Built with curiosity and late-night debugging.
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="ft-top"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: c.link,
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: 0,
              }}
            >
              <ArrowUpIcon />
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
