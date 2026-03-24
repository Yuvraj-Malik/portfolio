import { useEffect, useRef, useState } from "react";

const TAGLINE = "engineering thoughtful digital systems";

let shouldShowPreloader;

function revealBody(instant = false) {
  document.body.classList.remove("ready", "ready-instant");
  document.body.classList.add(instant ? "ready-instant" : "ready");
}

function isFirstVisit() {
  if (typeof shouldShowPreloader === "boolean") return shouldShowPreloader;

  try {
    const nav = performance.getEntriesByType("navigation")[0];
    shouldShowPreloader = !(
      (nav && (nav.type === "reload" || nav.type === "back_forward")) ||
      sessionStorage.getItem("pl_done")
    );
  } catch {
    shouldShowPreloader = false;
  }

  return shouldShowPreloader;
}

export default function Preloader({ onDone = () => {} }) {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [visible, setVisible] = useState(false);
  const [initY, setInitY] = useState(false);
  const [initM, setInitM] = useState(false);
  const [rule, setRule] = useState(false);
  const [name, setName] = useState(false);
  const [tagline, setTagline] = useState("");
  const [tagShow, setTagShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState(false);
  const [corners, setCorners] = useState(false);
  const typeRef = useRef(null);

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

  useEffect(() => {
    if (!isFirstVisit()) {
      revealBody(true);
      onDone();
      return undefined;
    }

    setVisible(true);

    const timers = [];
    const schedule = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    schedule(() => setLines(true), 80);
    schedule(() => setLines(false), 700);
    schedule(() => setCorners(true), 200);
    schedule(() => setInitY(true), 360);
    schedule(() => setInitM(true), 500);
    schedule(() => setRule(true), 780);
    schedule(() => setName(true), 1020);
    schedule(() => {
      setTagShow(true);
      let index = 0;

      typeRef.current = setInterval(() => {
        index += 1;
        setTagline(TAGLINE.slice(0, index));

        if (index >= TAGLINE.length && typeRef.current) {
          clearInterval(typeRef.current);
          typeRef.current = null;
        }
      }, 42);
    }, 1200);
    schedule(() => {
      if (typeRef.current) {
        clearInterval(typeRef.current);
        typeRef.current = null;
      }
      setExiting(true);
    }, 3400);
    schedule(() => {
      sessionStorage.setItem("pl_done", "1");
      revealBody(false);
    }, 3600);
    schedule(() => {
      setDone(true);
      onDone();
    }, 4100);

    return () => {
      timers.forEach(clearTimeout);
      if (typeRef.current) {
        clearInterval(typeRef.current);
        typeRef.current = null;
      }
    };
  }, [onDone]);

  if (!visible || done) return null;

  const bg = dark ? "#060606" : "#f8f7f5";
  const fg = dark ? "#e8e8e8" : "#0a0a0a";
  const dim = dark ? "rgba(232,232,232,0.18)" : "rgba(10,10,10,0.18)";
  const dim2 = dark ? "rgba(232,232,232,0.35)" : "rgba(10,10,10,0.35)";
  const tagTone = dark ? "rgba(232,232,232,0.78)" : "rgba(10,10,10,0.68)";
  const grid = dark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.035)";
  const line = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const brak = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  const exitStyle = exiting
    ? {
        opacity: 0,
        transform: "translateY(-18px)",
        filter: "blur(4px)",
        transition:
          "opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1), filter 600ms ease",
      }
    : {};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        .pl-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 500ms ease;
        }
        .pl-root.pl-exit { opacity: 0; pointer-events: none; }

        .pl-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, ${grid} 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .pl-scanline {
          position: absolute; left: 0; right: 0; height: 1px;
          background: ${line}; pointer-events: none;
          transform-origin: left;
          transition: transform 550ms cubic-bezier(0.16,1,0.3,1), opacity 350ms ease;
        }

        .pl-bracket {
          position: absolute;
          width: 14px; height: 14px;
          border-color: ${brak}; border-style: solid;
          transition: opacity 400ms ease;
        }
        .pl-tl { top: 28px; left: 28px; border-width: 1px 0 0 1px; }
        .pl-tr { top: 28px; right: 28px; border-width: 1px 1px 0 0; }
        .pl-bl { bottom: 28px; left: 28px; border-width: 0 0 1px 1px; }
        .pl-br { bottom: 28px; right: 28px; border-width: 0 1px 1px 0; }

        .pl-y {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 80px; font-weight: 400;
          letter-spacing: -0.06em; line-height: 1;
          color: ${fg};
          display: inline-block;
          transition: opacity 450ms ease, transform 450ms cubic-bezier(0.16,1,0.3,1);
        }
        .pl-m {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 80px; font-weight: 400; font-style: italic;
          letter-spacing: -0.06em; line-height: 1;
          color: ${dim2};
          display: inline-block;
          transition: opacity 550ms ease, transform 550ms cubic-bezier(0.16,1,0.3,1);
        }

        .pl-rule {
          height: 1px; background: ${dim};
          margin: 16px 0 14px;
          transition: width 550ms cubic-bezier(0.16,1,0.3,1);
        }

        .pl-name {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: ${dim2};
          transition: opacity 400ms ease;
        }

        .pl-tagline {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${tagTone}; margin-top: 8px; min-height: 14px;
          transition: opacity 300ms ease;
        }
        .pl-cursor {
          display: inline-block; width: 1px; height: 11px;
          background: ${tagTone}; vertical-align: middle;
          margin-left: 2px;
          animation: pl-blink 0.85s step-start infinite;
        }
        @keyframes pl-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <div
        className={`pl-root${exiting ? " pl-exit" : ""}`}
        style={{ background: bg }}
      >
        <div className="pl-grid" />

        {[25, 50, 75].map((top, index) => (
          <div
            key={top}
            className="pl-scanline"
            style={{
              top: `${top}%`,
              transform: lines ? "scaleX(1)" : "scaleX(0)",
              opacity: lines ? 1 : 0,
              transitionDelay: `${index * 100}ms`,
            }}
          />
        ))}

        {["pl-tl", "pl-tr", "pl-bl", "pl-br"].map((cornerClass, index) => (
          <div
            key={cornerClass}
            className={`pl-bracket ${cornerClass}`}
            style={{
              opacity: corners ? 1 : 0,
              transitionDelay: `${index * 60}ms`,
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ...exitStyle,
          }}
        >
          <div style={{ lineHeight: 1 }}>
            <span
              className="pl-y"
              style={{
                opacity: initY ? 1 : 0,
                transform: initY ? "translateY(0)" : "translateY(14px)",
              }}
            >
              Y
            </span>
            <span
              className="pl-m"
              style={{
                opacity: initM ? 1 : 0,
                transform: initM ? "translateY(0)" : "translateY(14px)",
              }}
            >
              M
            </span>
          </div>

          <div className="pl-rule" style={{ width: rule ? "110px" : "0px" }} />

          <div className="pl-name" style={{ opacity: name ? 1 : 0 }}>
            Yuvraj Malik
          </div>

          <div className="pl-tagline" style={{ opacity: tagShow ? 1 : 0 }}>
            {tagline}
            {tagline.length < TAGLINE.length && <span className="pl-cursor" />}
          </div>
        </div>
      </div>
    </>
  );
}
