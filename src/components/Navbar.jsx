import { useState, useEffect } from "react";
import AiFace from "./AiFace";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll tracking — only for progress + active section
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(st > 40);
      setScrollPct(dh > 0 ? Math.min(st / dh, 1) : 0);
      const ids = ["about", "projects", "journey", "contact"];
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 110) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const c = {
    bg: dark ? "rgba(10,10,10,0.60)" : "rgba(255,255,255,0.65)",
    border: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    text: dark ? "#e8e8e8" : "#111111",
    muted: dark ? "#9a9a9a" : "#1f1f1f",
    link: dark ? "#a5a5a5" : "#303030",
    active: dark ? "#ffffff" : "#000000",
    ctaBg: dark ? "#ffffff" : "#0a0a0a",
    ctaTxt: dark ? "#0a0a0a" : "#ffffff",
    dot: "#22c55e",
    bar: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)",
    chamber: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
    chamberB: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        /* ── Nav links — underline grows from center on hover/active ── */
        .nb-link {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; color: ${c.link};
          padding: 0 13px; height: 100%;
          display: flex; align-items: center;
          position: relative;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .nb-link:hover { color: ${c.active}; }
        .nb-link.active { color: ${c.active}; }
        /* Underline — expands from center, sits at bottom of link */
        .nb-link::after {
          content: '';
          position: absolute; bottom: 11px;
          left: 50%; right: 50%;
          height: 1px;
          background: ${c.active};
          transition: left 0.22s ease, right 0.22s ease;
          opacity: 0.55;
        }
        .nb-link.active::after, .nb-link:hover::after {
          left: 13px; right: 13px;
        }

        /* ── nb-link underline offset adjustment for centered layout ── */
        .nb-link::after { bottom: 10px; }

        /* ── Scroll progress bar ── */
        .nb-progress {
          position: absolute; bottom: 0; left: 0;
          height: 1px; background: ${c.bar};
          transition: width 0.1s linear;
          pointer-events: none;
        }

        /* ── Clock ── */
        .nb-clock {
          font-family: 'DM Mono', monospace;
          font-size: 8.5px; letter-spacing: 0.12em;
          color: ${c.muted};
          font-variant-numeric: tabular-nums;
          user-select: none; white-space: nowrap;
        }

        /* ── Availability dot ── */
        .nb-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${c.dot}; box-shadow: 0 0 5px ${c.dot};
          flex-shrink: 0;
          animation: dot-pulse 2.5s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%,100% { opacity:1; box-shadow: 0 0 5px ${c.dot}; }
          50%      { opacity:0.4; box-shadow: 0 0 2px ${c.dot}; }
        }

        /* ── CTA — pill shape, premium feel ── */
        .nb-cta {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${c.ctaTxt}; background: ${c.ctaBg};
          text-decoration: none;
          padding: 9px 20px;
          border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nb-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"};
        }

        /* ── Theme toggle ── */
        .nb-theme {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.link}; background: none; border: none;
          cursor: pointer; padding: 0 12px; height: 100%;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.2s ease; white-space: nowrap;
          border-left: 1px solid ${c.border};
        }
        .nb-theme:hover { color: ${c.active}; }

        /* ── Vertical dividers ── */
        .nb-vdiv {
          width: 1px; background: ${c.border};
          align-self: stretch; flex-shrink: 0;
        }

        /* ── Hamburger (mobile) ── */
        .nb-ham {
          background: none; border: none; cursor: pointer;
          color: ${c.text}; padding: 0 16px; height: 100%;
          display: none; align-items: center;
          transition: opacity 0.15s;
        }
        .nb-ham:hover { opacity: 0.6; }

        /* ── Mobile overlay ── */
        @keyframes nb-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nb-overlay {
          position: fixed; inset: 0; z-index: 55;
          background: ${dark ? "rgba(6,6,6,0.97)" : "rgba(255,255,255,0.97)"};
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          animation: nb-overlay-in 0.2s ease both;
        }
        .nb-mob-link {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(38px, 10vw, 58px); font-weight: 400;
          letter-spacing: -0.025em; color: ${c.link};
          text-decoration: none; padding: 8px 0; line-height: 1.1;
          transition: color 0.15s ease;
        }
        .nb-mob-link:hover, .nb-mob-link.active { color: ${c.active}; }

        /* Page-load entrance */
        @keyframes nb-drop {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-entrance { animation: nb-drop 0.45s cubic-bezier(0.16,1,0.3,1) both; }

        @media (max-width: 768px) {
          .nb-desktop { display: none !important; }
          .nb-ham     { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nb-ham { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          THE NAVBAR — fixed, full-width, never moves
          Height: 56px. Two zones separated by the
          AiFace chamber dead-center.
      ══════════════════════════════════════════ */}
      <header
        className="nb-entrance"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: scrolled ? 48 : 56,
          background: c.bg,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "stretch",
          transition: "height 0.2s ease",
        }}
      >
        {/* Scroll progress lives in the bottom border */}
        <div className="nb-progress" style={{ width: `${scrollPct * 100}%` }} />

        {/* ── LEFT ZONE: AiFace + name + clock ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 0 0 3rem",
            gap: 10,
            flexShrink: 0,
          }}
        >
          {/* AiFace — brand icon to the left of name */}
          <div className="nb-desktop" style={{ flexShrink: 0 }}>
            <AiFace />
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <a
              href="#hero"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: c.text,
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              Yuvraj Malik
            </a>
            <span className="nb-clock nb-desktop">{time}</span>
          </div>
        </div>

        {/* ── CENTER ZONE: all 4 nav links ── */}
        <nav
          className="nb-desktop"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 4,
            height: "100%",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nb-link${activeId === item.href.slice(1) ? " active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── RIGHT ZONE: theme toggle + CTA + hamburger ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 3rem 0 0",
            gap: 16,
            flexShrink: 0,
            marginLeft: "auto",
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="nb-theme nb-desktop"
            style={{ borderLeft: "none", padding: 0 }}
          >
            {dark ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {dark ? "Light" : "Dark"}
          </button>

          {/* CTA */}
          <a href="#contact" className="nb-cta nb-desktop">
            Let's Talk
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button className="nb-ham" onClick={() => setMobileOpen(true)}>
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="14" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {mobileOpen && (
        <div className="nb-overlay">
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: "3rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: c.text,
              padding: 4,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div style={{ marginBottom: 32, opacity: 0.6 }}>
            <AiFace />
          </div>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`nb-mob-link${activeId === item.href.slice(1) ? " active" : ""}`}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 36,
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.ctaTxt,
              background: c.ctaBg,
              textDecoration: "none",
              padding: "10px 28px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Let's Talk
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <div
            style={{
              position: "absolute",
              bottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span className="nb-clock" style={{ fontSize: 11 }}>
              {time}
            </span>
            <button
              onClick={() => setDark(!dark)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.muted,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {dark ? "☀ Light" : "☽ Dark"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
