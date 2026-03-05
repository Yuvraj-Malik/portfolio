import { useState, useEffect, useRef } from "react";
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

  // Live clock — the one detail Pratham definitely doesn't have
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

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(st > 50);
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
    bg: dark ? "rgba(6,6,6,0.9)" : "rgba(255,255,255,0.9)",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: dark ? "#ffffff" : "#080808",
    muted: dark ? "#484848" : "#b8b8b8",
    link: dark ? "#666" : "#999",
    active: dark ? "#ffffff" : "#000000",
    ctaBg: dark ? "#ffffff" : "#080808",
    ctaTxt: dark ? "#080808" : "#ffffff",
    dot: "#22c55e",
    divider: dark ? "#1a1a1a" : "#ececec",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        /* ── Progress bar — top edge, not bottom ── */
        .nb-bar {
          position: fixed; top: 0; left: 0; z-index: 100;
          height: 1.5px; background: ${c.text};
          transition: width 0.12s linear;
          opacity: ${scrollPct > 0.01 ? 0.25 : 0};
          pointer-events: none;
        }

        /* ── The nav pill / strip ── */
        .nb-nav {
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        /* ── Links ── */
        .nb-link {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; color: ${c.link};
          padding: 6px 12px; position: relative;
          transition: color 0.15s ease;
          white-space: nowrap;
        }
        .nb-link:hover { color: ${c.active}; }
        .nb-link.active { color: ${c.active}; }
        /* Active: a tiny horizontal line ABOVE the text, not below */
        .nb-link.active::before {
          content: '';
          position: absolute; top: 0; left: 12px; right: 12px;
          height: 1px; background: ${c.active}; opacity: 0.5;
        }

        /* ── AiFace wrapper — sits between the two nav groups ── */
        .nb-face-wrap {
          padding: 0 16px;
          border-left: 1px solid ${c.divider};
          border-right: 1px solid ${c.divider};
          display: flex; align-items: center;
          /* subtle inner glow */
          box-shadow: ${
            dark
              ? "inset 8px 0 12px -8px rgba(255,255,255,0.03), inset -8px 0 12px -8px rgba(255,255,255,0.03)"
              : "inset 8px 0 12px -8px rgba(0,0,0,0.03), inset -8px 0 12px -8px rgba(0,0,0,0.03)"
          };
        }

        /* ── Live clock ── unique differentiator */
        .nb-clock {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.1em;
          color: ${c.muted};
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
          user-select: none;
        }

        /* ── Theme toggle ── */
        .nb-theme {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.muted}; background: none; border: none;
          cursor: pointer; padding: 6px 8px;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.15s ease; white-space: nowrap; flex-shrink: 0;
        }
        .nb-theme:hover { color: ${c.active}; }

        /* ── CTA — sharp rectangle, not pill ── */
        /* This is the key visual diff from Pratham's rounded pill CTA */
        .nb-cta {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.ctaTxt}; background: ${c.ctaBg};
          text-decoration: none; padding: 7px 16px;
          border-radius: 3px;    /* almost-square — not pill */
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .nb-cta:hover { opacity: 0.8; transform: translateY(-1px); }

        /* ── Thin divider between elements ── */
        .nb-sep {
          width: 1px; flex-shrink: 0;
          background: ${c.divider};
          align-self: stretch;
          margin: 10px 0;
        }

        /* ── Availability dot ── */
        .nb-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${c.dot};
          box-shadow: 0 0 6px ${c.dot};
          flex-shrink: 0;
          animation: nb-pulse 2.5s ease-in-out infinite;
        }
        @keyframes nb-pulse {
          0%,100% { opacity:1; box-shadow: 0 0 6px ${c.dot}; }
          50%      { opacity:0.4; box-shadow: 0 0 2px ${c.dot}; }
        }

        /* ── Hamburger (mobile) ── */
        .nb-ham {
          background: none; border: none; cursor: pointer;
          color: ${c.text}; padding: 4px;
          display: none; align-items: center;
          transition: opacity 0.15s;
        }
        .nb-ham:hover { opacity: 0.6; }

        /* ── Mobile full-screen overlay ── */
        @keyframes nb-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nb-overlay {
          position: fixed; inset: 0; z-index: 55;
          background: ${c.bg};
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          animation: nb-overlay-in 0.2s ease both;
        }
        .nb-mob-link {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(36px, 9vw, 56px); font-weight: 400;
          letter-spacing: -0.025em; color: ${c.link};
          text-decoration: none; padding: 10px 0;
          transition: color 0.15s ease;
          line-height: 1.1;
        }
        .nb-mob-link:hover, .nb-mob-link.active { color: ${c.active}; }

        /* Page-load fade in */
        @keyframes nb-in {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-anim { animation: nb-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both; }

        @media (max-width: 768px) {
          .nb-desktop { display: none !important; }
          .nb-ham     { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nb-ham { display: none !important; }
        }
      `}</style>

      {/* Progress bar */}
      <div className="nb-bar" style={{ width: `${scrollPct * 100}%` }} />

      {/* ── Main navbar ── */}
      <header
        className="nb-anim"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "12px 20px" : "0",
          transition: "padding 0.4s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      >
        <nav
          className="nb-nav"
          style={{
            maxWidth: scrolled ? 860 : "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            height: 56,
            padding: scrolled ? "0 20px" : "0 3rem",
            background: c.bg,
            // KEY DIFF: no blur when flat — Pratham always blurs
            backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(160%)"
              : "none",
            borderRadius: scrolled
              ? 6
              : 0 /* slight radius when pill, sharp edge when flat */,
            border: scrolled ? `1px solid ${c.border}` : "none",
            borderBottom: !scrolled ? `1px solid ${c.divider}` : undefined,
            boxShadow: scrolled
              ? dark
                ? "0 4px 24px rgba(0,0,0,0.6)"
                : "0 4px 24px rgba(0,0,0,0.08)"
              : "none",
            pointerEvents: "all",
            gap: 0,
          }}
        >
          {/* LEFT — wordmark + clock */}
          <a
            href="#hero"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 17,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: c.text,
              textDecoration: "none",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              gap: 1,
              marginRight: "auto",
            }}
          >
            Yuvraj Malik
            {/* Live clock under the name — like a dev terminal timestamp */}
            <span className="nb-clock">{time}</span>
          </a>

          {/* CENTER — nav + AiFace (desktop) */}
          <div
            className="nb-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              marginRight: "auto",
            }}
          >
            {/* Left nav pair */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {NAV_ITEMS.slice(0, 2).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nb-link${activeId === item.href.slice(1) ? " active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* AiFace — bordered chamber */}
            <div className="nb-face-wrap">
              <AiFace />
            </div>

            {/* Right nav pair */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {NAV_ITEMS.slice(2).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nb-link${activeId === item.href.slice(1) ? " active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            {/* Availability — desktop */}
            <div
              className="nb-desktop"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span className="nb-dot" />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.muted,
                }}
              >
                Open
              </span>
            </div>

            <div className="nb-sep nb-desktop" />

            {/* Theme */}
            <button onClick={() => setDark(!dark)} className="nb-theme">
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

            <div className="nb-sep" />

            {/* CTA — SHARP corners, not a pill */}
            <a href="#contact" className="nb-cta">
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
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="16" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {mobileOpen && (
        <div className="nb-overlay">
          {/* Close */}
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: 24,
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

          {/* AiFace */}
          <div style={{ marginBottom: 32, opacity: 0.7 }}>
            <AiFace />
          </div>

          {/* Big serif links */}
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

          {/* CTA */}
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
              borderRadius: 3,
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

          {/* Theme + clock at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
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
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: c.muted,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {dark ? "☀" : "☽"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
