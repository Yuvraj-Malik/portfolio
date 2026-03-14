import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────
// GLOBAL HIGH SCORE — Firebase Firestore
// Setup (one-time, ~3 min):
//   1. Go to console.firebase.google.com → New project
//   2. Add a Web app → copy the firebaseConfig object below
//   3. Firestore Database → Create database → Start in test mode
//   4. Create collection "highscore" → document id "global"
//      with one field: score = 0 (number)
//   5. Install: npm install firebase
// ─────────────────────────────────────────────
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Avoid re-initializing on hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const highscoreRef = doc(db, "highscore", "global");
// ─────────────────────────────────────────────

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

const GAME_W = 380;
const GAME_H = 260;
const PLAYER_W = 28;
const PLAYER_H = 28;
const BUG_SIZE = 22;
const PLAYER_SPEED = 5;

const SURVIVE_MSGS = [
  "Nice reflexes.",
  "You're still alive.",
  "Impressive.",
  "They can't catch you.",
  "Stay focused.",
  "You're a natural.",
];
const DEAD_MSGS = [
  "The bugs got you this time.",
  "Maybe the homepage is safer.",
  "Even the best get caught.",
  "Try again — you were close.",
];

export default function NotFound() {
  const dark = useDarkMode();

  const [phase, setPhase] = useState("idle");
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");
  const [globalBest, setGlobalBest] = useState(null); // null = loading
  const [newRecord, setNewRecord] = useState(false);

  const canvasRef = useRef(null);
  const stateRef = useRef({});
  const rafRef = useRef(null);
  const keysRef = useRef({ left: false, right: false });
  const lastMsgTick = useRef(0);

  // ── Hide navbar — inject a style rule so it wins over any animation
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "nf-hide-nav";
    style.textContent = `
      header.nb-entrance,
      header[class*="nb-"] {
        opacity: 0 !important;
        pointer-events: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("nf-hide-nav");
      if (el) el.remove();
    };
  }, []);

  // ── Firestore realtime listener — updates instantly when anyone beats the record
  useEffect(() => {
    const unsub = onSnapshot(
      highscoreRef,
      (snap) => setGlobalBest(snap.exists() ? (snap.data().score ?? 0) : 0),
      () => setGlobalBest(0), // silently fail if offline
    );
    return () => unsub();
  }, []);

  const c = {
    bg: dark ? "#060606" : "#f8f7f5",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: dark ? "#e8e8e8" : "#0a0a0a",
    muted: dark ? "#9d9d9d" : "#4b4b4b",
    subtext: dark ? "#8b8b8b" : "#4a4a4a",
    ctaBg: dark ? "#ffffff" : "#0a0a0a",
    ctaTxt: dark ? "#0a0a0a" : "#ffffff",
    grid: dark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.045)",
    gold: "#c9a84c",
  };

  // ── Key listeners
  useEffect(() => {
    const down = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keysRef.current.right = true;
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)
      )
        e.preventDefault();
    };
    const up = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d")
        keysRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // ── Touch / swipe for mobile
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    keysRef.current.left = dx < -8;
    keysRef.current.right = dx > 8;
  };
  const onTouchEnd = () => {
    keysRef.current.left = keysRef.current.right = false;
    touchStartX.current = null;
  };

  const startGame = useCallback(() => {
    stateRef.current = {
      player: { x: GAME_W / 2 - PLAYER_W / 2, y: GAME_H - PLAYER_H - 10 },
      bugs: [],
      score: 0,
      tick: 0,
      speed: 2.2,
    };
    keysRef.current = { left: false, right: false };
    setScore(0);
    setMsg("");
    setNewRecord(false);
    setPhase("playing");
  }, []);

  // ── Game loop
  useEffect(() => {
    if (phase !== "playing") {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    canvas.width = GAME_W * dpr;
    canvas.height = GAME_H * dpr;
    canvas.style.width = GAME_W + "px";
    canvas.style.height = GAME_H + "px";
    ctx.scale(dpr, dpr);

    const s = stateRef.current;

    const loop = () => {
      s.tick++;
      s.score = Math.floor(Math.pow(s.tick, 1.12) / 180);
      s.speed = 2.0 + Math.pow(s.score, 0.65) * 0.14;

      if (keysRef.current.left && s.player.x > 0) s.player.x -= PLAYER_SPEED;
      if (keysRef.current.right && s.player.x < GAME_W - PLAYER_W)
        s.player.x += PLAYER_SPEED;

      const spawnRate = Math.max(
        Math.floor(62 - Math.pow(s.score, 0.6) * 2.8),
        20,
      );
      if (s.tick % spawnRate === 0) {
        s.bugs.push({
          x: Math.random() * (GAME_W - BUG_SIZE),
          y: -BUG_SIZE,
          speed: s.speed + (Math.random() - 0.5) * 0.8,
        });
      }

      s.bugs = s.bugs
        .map((b) => ({ ...b, y: b.y + b.speed }))
        .filter((b) => b.y < GAME_H + BUG_SIZE);

      const pad = 5;
      const hit = s.bugs.some(
        (b) =>
          b.x < s.player.x + pad + (PLAYER_W - pad * 2) &&
          b.x + BUG_SIZE > s.player.x + pad &&
          b.y < s.player.y + pad + (PLAYER_H - pad * 2) &&
          b.y + BUG_SIZE > s.player.y + pad,
      );

      if (hit) {
        const finalScore = s.score;
        setScore(finalScore);
        setMsg(DEAD_MSGS[Math.floor(Math.random() * DEAD_MSGS.length)]);
        setPhase("dead");

        // Atomic Firestore transaction — only writes if new score beats current
        runTransaction(db, async (tx) => {
          const snap = await tx.get(highscoreRef);
          const current = snap.exists() ? (snap.data().score ?? 0) : 0;
          if (finalScore > current) {
            tx.set(highscoreRef, { score: finalScore });
            return true;
          }
          return false;
        })
          .then((beaten) => {
            if (beaten) setNewRecord(true);
          })
          .catch(() => {});
        return;
      }

      if (s.tick - lastMsgTick.current > 480 && s.tick > 120) {
        lastMsgTick.current = s.tick;
        setMsg(SURVIVE_MSGS[Math.floor(Math.random() * SURVIVE_MSGS.length)]);
        setTimeout(() => setMsg(""), 2000);
      }

      setScore(s.score);

      // ── Draw ──
      ctx.clearRect(0, 0, GAME_W, GAME_H);

      ctx.fillStyle = dark ? "#0a0a0a" : "#f0efe9";
      ctx.fillRect(0, 0, GAME_W, GAME_H);

      // Dot grid
      ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
      for (let gx = 14; gx < GAME_W; gx += 20) {
        for (let gy = 14; gy < GAME_H; gy += 20) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Player glow
      ctx.fillStyle = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
      roundRect(
        ctx,
        s.player.x - 2,
        s.player.y - 2,
        PLAYER_W + 4,
        PLAYER_H + 4,
        8,
      );
      ctx.fill();

      ctx.fillStyle = dark ? "#e8e8e8" : "#0a0a0a";
      roundRect(ctx, s.player.x, s.player.y, PLAYER_W, PLAYER_H, 6);
      ctx.fill();

      // Player eyes
      ctx.fillStyle = dark ? "#0a0a0a" : "#f0efe9";
      ctx.beginPath();
      ctx.arc(s.player.x + 9, s.player.y + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.player.x + 19, s.player.y + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Bugs
      ctx.font = `${BUG_SIZE}px serif`;
      ctx.textAlign = "center";
      s.bugs.forEach((b) =>
        ctx.fillText("🐞", b.x + BUG_SIZE / 2, b.y + BUG_SIZE),
      );

      // Ground
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GAME_H - 1);
      ctx.lineTo(GAME_W, GAME_H - 1);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, dark]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .nf-page {
          min-height: 100vh;
          background: ${c.bg};
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem; position: relative; overflow: hidden;
        }
        .nf-page::before {
          content: '';
          position: fixed; inset: 0;
          background-image: radial-gradient(circle, ${c.grid} 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
        }

        .nf-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          max-width: 480px; width: 100%;
        }

        @keyframes nf-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── 404 headline ── */
        .nf-404 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(100px, 20vw, 148px);
          font-weight: 400; line-height: 0.9;
          letter-spacing: -0.04em;
          color: ${c.text};
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s both;
        }

        /* ── Message block ── */
        .nf-message {
          margin-top: 20px; margin-bottom: 4px;
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        .nf-msg-line1 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(17px, 3vw, 22px);
          font-style: italic;
          color: ${c.text};
          line-height: 1.3;
        }
        .nf-msg-line2 {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${c.subtext};
          margin-top: 8px;
        }

        /* ── Score bar ── */
        .nf-scorebar {
          display: flex; align-items: center; justify-content: center; gap: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.subtext};
          margin-top: 18px; margin-bottom: 8px;
          min-height: 22px;
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .nf-score-chip {
          display: flex; align-items: center; gap: 6px;
          padding: 3px 10px;
          border: 1px solid ${c.border};
          border-radius: 999px;
        }
        .nf-score-val { color: ${c.text}; font-size: 11px; }
        .nf-best-val  { color: ${c.gold}; font-size: 11px; }
        .nf-new-record {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: ${c.gold};
          border: 1px solid ${c.gold}55;
          background: ${c.gold}11;
          padding: 2px 8px; border-radius: 2px;
          animation: nf-in 0.3s ease both;
        }

        /* ── Survive msg flash ── */
        .nf-flash {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em;
          color: ${c.subtext}; min-height: 16px; margin-bottom: 6px;
          transition: opacity 0.3s ease;
        }

        /* ── Canvas wrapper ── */
        .nf-canvas-wrap {
          border: 1px solid ${c.border};
          border-radius: 8px; overflow: hidden;
          position: relative;
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.25s both;
        }

        /* ── Overlays ── */
        .nf-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
          background: ${dark ? "rgba(6,6,6,0.86)" : "rgba(248,247,245,0.9)"};
          backdrop-filter: blur(6px); border-radius: 8px;
        }
        .nf-ov-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 26px; font-weight: 400; letter-spacing: -0.02em;
          color: ${c.text};
        }
        .nf-ov-sub {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${c.subtext};
        }
        .nf-ov-score {
          font-family: 'DM Mono', monospace;
          font-size: 11px; color: ${c.subtext}; letter-spacing: 0.06em;
        }

        /* ── Buttons ── */
        .nf-btn-primary {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.ctaTxt}; background: ${c.ctaBg};
          border: none; border-radius: 999px;
          padding: 9px 22px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .nf-btn-primary:hover { opacity: 0.82; transform: translateY(-1px); }

        .nf-btn-ghost {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.subtext}; background: none;
          border: 1px solid ${c.border}; border-radius: 999px;
          padding: 9px 22px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
        }
        .nf-btn-ghost:hover {
          color: ${c.text};
          border-color: ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
        }

        /* ── Controls + home ── */
        .nf-controls {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${c.muted}; margin-top: 10px;
        }
        .nf-home {
          margin-top: 22px;
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.35s both;
        }

        /* ── Global best strip ── */
        .nf-global-strip {
          margin-top: 14px;
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.muted};
          display: flex; align-items: center; gap: 8px;
          animation: nf-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        .nf-global-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${c.gold}; opacity: 0.7; flex-shrink: 0;
        }

        @media (max-width: 440px) {
          .nf-canvas-wrap canvas { width: 320px !important; height: 220px !important; }
        }
      `}</style>

      <div className="nf-page">
        <div className="nf-inner">
          {/* ── 404 ── */}
          <div className="nf-404">404</div>

          {/* ── Message ── */}
          <div className="nf-message">
            <div className="nf-msg-line1">You found a bug in the system.</div>
            <div className="nf-msg-line2">
              While you're here — try dodging them.
            </div>
          </div>

          {/* ── Score bar ── */}
          <div className="nf-scorebar">
            {phase !== "idle" && (
              <div className="nf-score-chip">
                <span>Score</span>
                <span className="nf-score-val">{score}</span>
              </div>
            )}
            {globalBest !== null && globalBest > 0 && (
              <div className="nf-score-chip">
                <span>World best</span>
                <span className="nf-best-val">{globalBest}</span>
              </div>
            )}
            {newRecord && <span className="nf-new-record">✦ new record</span>}
          </div>

          {/* ── Flash message ── */}
          <div className="nf-flash" style={{ opacity: msg ? 1 : 0 }}>
            {msg || "·"}
          </div>

          {/* ── Game canvas ── */}
          <div
            className="nf-canvas-wrap"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <canvas ref={canvasRef} width={GAME_W} height={GAME_H} />

            {/* Idle overlay */}
            {phase === "idle" && (
              <div className="nf-overlay">
                <div className="nf-ov-title">Dodge the Bugs</div>
                <div className="nf-ov-sub">
                  ← → arrow keys · swipe on mobile
                </div>
                {globalBest !== null && globalBest > 0 && (
                  <div className="nf-ov-score">World best: {globalBest}</div>
                )}
                <button
                  className="nf-btn-primary"
                  onClick={startGame}
                  style={{ marginTop: 4 }}
                >
                  Start Game
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Dead overlay */}
            {phase === "dead" && (
              <div className="nf-overlay">
                <div className="nf-ov-title">Game Over</div>
                <div className="nf-ov-score">Your score: {score}</div>
                {globalBest !== null && globalBest > 0 && (
                  <div className="nf-ov-score" style={{ color: c.gold }}>
                    World best: {globalBest}
                  </div>
                )}
                <div className="nf-ov-sub">{msg}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button className="nf-btn-primary" onClick={startGame}>
                    Try Again
                  </button>
                  <a href="/" className="nf-btn-ghost">
                    Go Home
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Controls hint */}
          <div className="nf-controls">
            {phase === "playing"
              ? "← → to move · swipe on mobile"
              : "← → arrow keys · swipe on mobile"}
          </div>

          {/* Global best footnote */}
          {globalBest !== null && globalBest > 0 && phase !== "playing" && (
            <div className="nf-global-strip">
              <span className="nf-global-dot" />
              <span>Global best: {globalBest} — can you beat it?</span>
            </div>
          )}

          {/* Home */}
          <div className="nf-home">
            <a href="/" className="nf-btn-ghost">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
