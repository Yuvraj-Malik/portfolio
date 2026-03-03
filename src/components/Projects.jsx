import { useState, useEffect, useRef } from "react";

// ─── Dark mode hook ───────────────────────────────────────────────────────────
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

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "spatial-console",
    title: "Spatial Console",
    thesis: "A 3D world you control with your hands — no mouse, no keyboard.",
    category: "AI System",
    status: "active",
    type: "ai",
    tech: ["React", "Three.js", "MediaPipe", "Reducer Architecture"],
    overview: {
      problem:
        "Traditional 3D design tools require expensive hardware and steep learning curves, making spatial prototyping inaccessible.",
      approach:
        "Built a gesture-driven interface using MediaPipe hand tracking mapped to a Three.js scene, with a reducer-based state machine managing draft vs confirmed placements.",
      outcome:
        "A fully functional 3D structural builder controlled entirely by hand gestures, running in-browser with no external hardware.",
    },
    architecture: {
      description:
        "Three-layer system: gesture capture → intent parser → scene renderer. State managed via a strict reducer pattern to prevent invalid structural states.",
      decisions: [
        "Chose React Three Fiber over raw Three.js for declarative scene management",
        "BFS-based stability validation runs on every placement to prevent invalid structures",
        "MediaPipe runs on a separate web worker to avoid blocking the render thread",
      ],
    },
    challenges: [
      "Hand landmark jitter caused false positives — solved with a rolling average filter over 5 frames",
      "Three.js raycasting conflicted with gesture pointer emulation — required custom hit-test layer",
      "Reducer state grew complex fast — refactored to use action creators with validation middleware",
    ],
    metrics: [
      {
        label: "Gesture Recognition Latency",
        value: "<40ms",
        context: "per frame",
      },
      {
        label: "Stability Check Speed",
        value: "~2ms",
        context: "BFS on 100 nodes",
      },
      {
        label: "Browser Render Target",
        value: "60 FPS",
        context: "Chrome desktop",
      },
    ],
    github: "https://github.com/yuvrajmalik/spatial-console",
    live: null,
  },
  {
    id: "stark-paper-analyzer",
    title: "Stark Paper Analyzer",
    thesis:
      "Turn any academic PDF into structured, queryable knowledge — instantly.",
    category: "AI System",
    status: "active",
    type: "ai",
    tech: ["FastAPI", "Gemini 2.5", "React", "Three.js"],
    overview: {
      problem:
        "Academic papers are dense, unstructured, and time-consuming to extract insight from — especially at scale.",
      approach:
        "Built a token-aware chunking pipeline that feeds structured prompts to Gemini 2.5, enforcing JSON output schemas to ensure consistent, parseable responses.",
      outcome:
        "A research analysis tool that processes academic PDFs into structured summaries, key claims, and methodology breakdowns in seconds.",
    },
    architecture: {
      description:
        "Async FastAPI backend handles PDF ingestion and chunking. Gemini 2.5 processes chunks with enforced JSON output. React frontend renders structured output with a foundation for 3D knowledge graph visualization.",
      decisions: [
        "Token-aware chunking prevents context window overflow while maintaining semantic coherence",
        "JSON-enforced output schema eliminates post-processing ambiguity",
        "Async processing with Redis caching handles concurrent requests without blocking",
      ],
    },
    challenges: [
      "PDF parsing inconsistency across formats — built a preprocessing normalizer for layout extraction",
      "LLM hallucination on citations — added a grounding verification layer against source text",
      "Token budget management across variable-length papers — dynamic chunking strategy based on paper density",
    ],
    metrics: [
      { label: "Average Processing Time", value: "<8s", context: "per paper" },
      {
        label: "Output Schema Compliance",
        value: "~97%",
        context: "JSON validity",
      },
      { label: "Cache Hit Rate", value: "~73%", context: "repeat queries" },
    ],
    github: "https://github.com/yuvrajmalik/stark-paper-analyzer",
    live: null,
  },
  {
    id: "jarvis",
    title: "Jarvis",
    thesis: "A voice AI that doesn't just answer — it acts.",
    category: "AI System",
    status: "shipped",
    type: "ai",
    tech: ["Python", "LLM APIs", "SpeechRecognition", "Edge-TTS"],
    overview: {
      problem:
        "Existing voice assistants are reactive and siloed — they answer questions but can't execute multi-step desktop workflows.",
      approach:
        "Designed a modular brain/router/tool architecture where a central router dispatches intents to specialized tool modules, with multi-LLM fallback for reliability.",
      outcome:
        "A personal desktop AI that handles voice commands, automates workflows, and maintains session context across interactions.",
    },
    architecture: {
      description:
        "Three-module system: Speech input → Intent router → Tool executor. Router uses lightweight classification before calling LLM to reduce latency. Tools are isolated modules with defined I/O contracts.",
      decisions: [
        "Multi-LLM fallback (Groq → Gemini → Mistral) ensures 99%+ uptime",
        "Isolated tool modules allow hot-swapping without restarting the assistant",
        "Edge-TTS chosen over cloud TTS for zero-latency local synthesis",
      ],
    },
    challenges: [
      "Intent ambiguity between similar commands — resolved with a two-stage classification pipeline",
      "Session memory bloat over long conversations — implemented sliding window with summary compression",
      "Cross-platform subprocess control — abstracted OS-specific calls behind a unified interface",
    ],
    metrics: [
      { label: "Intent Classification", value: "~94%", context: "accuracy" },
      {
        label: "Voice Response Latency",
        value: "<1.2s",
        context: "end-to-end",
      },
      { label: "LLM Fallback Success", value: "99%+", context: "uptime" },
    ],
    github: "https://github.com/yuvrajmalik/jarvis",
    live: null,
  },
  {
    id: "code-vault",
    title: "Code Vault",
    thesis: "A competitive coding platform built for teams, not individuals.",
    category: "Full Stack",
    status: "shipped",
    type: "fullstack",
    tech: ["React", "Node.js", "MongoDB"],
    overview: {
      problem:
        "Most competitive coding platforms are individual-focused — there's no good tooling for team-based live coding competitions.",
      approach:
        "Built a real-time competition platform with drag-and-drop snippet challenges, live leaderboards, and an admin panel for moderating events.",
      outcome:
        "A fully functional platform that hosted a 30-team coding event with zero downtime.",
    },
    architecture: {
      description:
        "React frontend with real-time leaderboard polling. Node.js backend handles challenge state and scoring logic. MongoDB stores submissions with optimistic locking to prevent race conditions.",
      decisions: [
        "Polling over WebSockets for leaderboard — simpler to debug under load, acceptable latency for this use case",
        "Optimistic locking on submissions prevents double-scoring edge cases",
        "Admin panel separated into its own route guard for security isolation",
      ],
    },
    challenges: [
      "Race condition on simultaneous submissions — solved with MongoDB optimistic locking",
      "Drag-and-drop state sync across team members — implemented shared session state with conflict resolution",
      "Admin moderation latency — pre-cached challenge states to reduce response time under load",
    ],
    metrics: [
      { label: "Teams Hosted", value: "30+", context: "live event" },
      { label: "Submission Latency", value: "<200ms", context: "p95" },
      { label: "Event Uptime", value: "100%", context: "zero downtime" },
    ],
    github: "https://github.com/yuvrajmalik/code-vault",
    live: null,
  },
  {
    id: "anime-clash",
    title: "Anime Clash",
    thesis:
      "The anime higher-lower game — built properly, with daily challenges.",
    category: "Full Stack",
    status: "shipped",
    type: "fullstack",
    tech: ["Vanilla JS", "Netlify Functions", "Node.js"],
    overview: {
      problem:
        "Wanted to build a fun project that challenged me technically — deterministic daily challenges with serverless persistence, no backend server.",
      approach:
        "Built deterministic daily pair generation using a seeded PRNG so all users get identical challenges without a database query. Serverless functions handle score persistence.",
      outcome:
        "A fully playable web game with multiple modes, daily challenges, and mobile-optimized UI.",
    },
    architecture: {
      description:
        "Pure frontend with Netlify Functions as a serverless backend. Seeded PRNG generates deterministic daily pairs from a curated anime dataset. Score persistence via serverless KV store.",
      decisions: [
        "Seeded PRNG eliminates need for a centralized challenge server",
        "Netlify Functions chosen for zero cold-start penalty on small payloads",
        "Vanilla JS chosen intentionally — no framework overhead for a UI-heavy game",
      ],
    },
    challenges: [
      "Daily seed collision across timezones — resolved with UTC-based seed generation",
      "Mobile touch event conflicts with swipe gestures — custom touch handler with threshold detection",
      "Anime dataset quality — built a curation pipeline to filter low-quality entries",
    ],
    metrics: [
      {
        label: "Daily Challenge Sync",
        value: "100%",
        context: "deterministic",
      },
      {
        label: "Mobile Lighthouse Score",
        value: "94+",
        context: "performance",
      },
      { label: "Gameplay Modes", value: "3", context: "distinct modes" },
    ],
    github: "https://github.com/yuvrajmalik/anime-clash",
    live: null,
  },
  {
    id: "air-canvas",
    title: "Air Canvas",
    thesis:
      "Draw with your finger in the air — rendered on a 5000×5000 canvas.",
    category: "AI System",
    status: "shipped",
    type: "ai",
    tech: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    overview: {
      problem:
        "Wanted to push gesture-based interfaces to a creative application — drawing in the air with real-time rendering and minimal latency.",
      approach:
        "MediaPipe tracks hand landmarks at 30fps. A gesture classifier distinguishes draw vs select vs erase modes. Stroke smoothing via Bezier interpolation reduces jitter.",
      outcome:
        "A real-time air drawing application with a massive scrollable canvas, gesture-based tool switching, and smooth stroke rendering.",
    },
    architecture: {
      description:
        "OpenCV handles frame capture and rendering. MediaPipe processes landmarks in a separate thread. NumPy manages the canvas buffer for efficient stroke operations.",
      decisions: [
        "Separate MediaPipe thread prevents frame drops during heavy landmark processing",
        "NumPy canvas buffer chosen over PIL for vectorized stroke operations",
        "Bezier interpolation for stroke smoothing — cubic curves between sampled points",
      ],
    },
    challenges: [
      "Landmark jitter at canvas edges — applied Kalman filter for stable tracking near frame boundaries",
      "Canvas scroll performance at 5000×5000 — viewport-based rendering only draws visible region",
      "Gesture mode switching false positives — added 200ms debounce with confirmation threshold",
    ],
    metrics: [
      { label: "Render Frame Rate", value: "30 FPS", context: "real-time" },
      { label: "Canvas Size", value: "5000×5000", context: "pixels" },
      { label: "Stroke Latency", value: "<33ms", context: "per frame" },
    ],
    github: "https://github.com/yuvrajmalik/air-canvas",
    live: null,
  },
];

const ENGINEERING_DECISIONS = [
  {
    title: "Why I prefer REST over GraphQL for most projects",
    body: "GraphQL's flexibility becomes overhead when your data relationships are stable. REST with well-designed endpoints is easier to cache, debug, and monitor. I reach for GraphQL only when client-driven query flexibility genuinely matters.",
  },
  {
    title: "Why I containerize even small applications",
    body: "Environment parity eliminates a whole class of bugs. The cost of writing a Dockerfile is always lower than debugging 'works on my machine' issues. It also forces you to think about dependencies explicitly.",
  },
  {
    title: "Performance over feature count",
    body: "A slow feature is a broken feature. I'd rather ship one thing that runs at 60fps than three things that stutter. Users feel performance before they notice features.",
  },
  {
    title: "When AI is the wrong tool",
    body: "Not every problem needs a model. If deterministic logic solves it cleanly — use that. AI adds latency, cost, and unpredictability. I only reach for it when the problem is genuinely ambiguous or requires learned patterns.",
  },
];

const TABS = ["Overview", "Architecture", "Challenges", "Metrics"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status, dark }) {
  if (status !== "active") return null;
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: dark ? "#888" : "#777",
        border: `1px solid ${dark ? "#444" : "#ccc"}`,
        borderRadius: 4,
        padding: "2px 6px",
        whiteSpace: "nowrap",
      }}
    >
      Active
    </span>
  );
}

function TechPill({ label, dark }) {
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: dark ? "#c0c0c0" : "#444",
        border: `1px solid ${dark ? "#333" : "#ddd"}`,
        borderRadius: 4,
        padding: "3px 9px",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function ProjectTabContent({ project, tab, dark, c }) {
  if (tab === "Overview") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {[
          { label: "Problem", text: project.overview.problem },
          { label: "Approach", text: project.overview.approach },
          { label: "Outcome", text: project.overview.outcome },
        ].map((item) => (
          <div key={item.label}>
            <p
              style={{
                margin: "0 0 6px 0",
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: dark ? "#555" : "#aaa",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: dark ? "#b0b0b0" : "#444",
                lineHeight: 1.75,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.02em",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "Architecture") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: dark ? "#b0b0b0" : "#444",
            lineHeight: 1.75,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.02em",
          }}
        >
          {project.architecture.description}
        </p>
        <div>
          <p
            style={{
              margin: "0 0 10px 0",
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: dark ? "#555" : "#aaa",
            }}
          >
            Key Decisions
          </p>
          {project.architecture.decisions.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "8px 0",
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: dark ? "#444" : "#ccc",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12.5,
                  color: dark ? "#b0b0b0" : "#444",
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                }}
              >
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "Challenges") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {project.challenges.map((ch, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: dark ? "#444" : "#ccc",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              —
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12.5,
                color: dark ? "#b0b0b0" : "#444",
                lineHeight: 1.65,
                letterSpacing: "0.02em",
              }}
            >
              {ch}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "Metrics") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {project.metrics.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: dark ? "#888" : "#888",
                  letterSpacing: "0.02em",
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: dark ? "#555" : "#bbb",
                  marginLeft: 8,
                  letterSpacing: "0.04em",
                }}
              >
                {m.context}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 22,
                color: dark ? "#ffffff" : "#0a0a0a",
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// Card tile — sits in the 2-column grid
function ProjectCard({ project, dark, c, mode, isExpanded, onToggle, index }) {
  const isShowcase = mode === "showcase";

  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${isExpanded ? (dark ? "#444" : "#aaa") : dark ? "#222" : "#e8e8e8"}`,
        borderRadius: 10,
        padding: "20px 20px 18px 20px",
        cursor: "pointer",
        background: isExpanded
          ? dark
            ? "rgba(255,255,255,0.03)"
            : "rgba(0,0,0,0.02)"
          : "transparent",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isExpanded)
          e.currentTarget.style.borderColor = dark ? "#444" : "#bbb";
        e.currentTarget.querySelector(".proj-title").style.color = dark
          ? "#ffffff"
          : "#000000";
      }}
      onMouseLeave={(e) => {
        if (!isExpanded)
          e.currentTarget.style.borderColor = dark ? "#222" : "#e8e8e8";
        if (!isExpanded)
          e.currentTarget.querySelector(".proj-title").style.color = dark
            ? "#c0c0c0"
            : "#333";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isShowcase && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: dark ? "#444" : "#ccc",
                letterSpacing: "0.06em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span
            className="proj-title"
            style={{
              fontFamily: isShowcase
                ? "'Instrument Serif', Georgia, serif"
                : "'DM Mono', monospace",
              fontSize: isShowcase ? 18 : 14,
              fontWeight: 400,
              color: isExpanded
                ? dark
                  ? "#ffffff"
                  : "#000000"
                : dark
                  ? "#c0c0c0"
                  : "#333",
              letterSpacing: isShowcase ? "-0.01em" : "0.02em",
              transition: "color 0.15s ease",
            }}
          >
            {project.title}
          </span>
          <StatusBadge status={project.status} dark={dark} />
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 14,
            color: dark ? "#555" : "#bbb",
            transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            display: "inline-block",
            flexShrink: 0,
            marginLeft: 8,
          }}
        >
          +
        </span>
      </div>

      {isShowcase && (
        <p
          style={{
            margin: "0 0 12px 0",
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: dark ? "#666" : "#999",
            letterSpacing: "0.02em",
            lineHeight: 1.5,
          }}
        >
          {project.thesis}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {project.tech.map((t) => (
          <TechPill key={t} label={t} dark={dark} />
        ))}
      </div>
    </div>
  );
}

// Expanded detail panel — renders full-width below a row
function ProjectExpanded({ project, dark, c }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setTimeout(
        () =>
          ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        80,
      );
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        gridColumn: "1 / -1",
        borderTop: `1px solid ${dark ? "#1a1a1a" : "#efefef"}`,
        borderBottom: `1px solid ${dark ? "#1a1a1a" : "#efefef"}`,
        padding: "28px 0 32px 0",
        animation: "proj-expand 0.2s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}
      >
        {/* Left — preview + buttons */}
        <div>
          <div
            style={{
              width: "100%",
              height: 180,
              borderRadius: 8,
              background: dark ? "#111" : "#f5f5f5",
              border: `1px solid ${dark ? "#1e1e1e" : "#ebebeb"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: dark ? "#2e2e2e" : "#d0d0d0",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Preview placeholder
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: dark ? "#ccc" : "#444",
                  textDecoration: "none",
                  border: `1px solid ${dark ? "#333" : "#ddd"}`,
                  borderRadius: 100,
                  padding: "7px 14px",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = dark ? "#888" : "#888";
                  e.currentTarget.style.color = dark ? "#fff" : "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = dark ? "#333" : "#ddd";
                  e.currentTarget.style.color = dark ? "#ccc" : "#444";
                }}
              >
                GitHub →
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: dark ? "#111" : "#fff",
                  textDecoration: "none",
                  background: dark ? "#f0f0f0" : "#111",
                  borderRadius: 100,
                  padding: "7px 14px",
                  letterSpacing: "0.06em",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Right — tabs */}
        <div>
          <div
            style={{
              display: "flex",
              borderBottom: `1px solid ${dark ? "#222" : "#e8e8e8"}`,
              marginBottom: 18,
            }}
          >
            {TABS.map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(t);
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: `1.5px solid ${activeTab === t ? (dark ? "#fff" : "#000") : "transparent"}`,
                  marginBottom: -1,
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  padding: "5px 12px",
                  color:
                    activeTab === t
                      ? dark
                        ? "#f0f0f0"
                        : "#111"
                      : dark
                        ? "#555"
                        : "#aaa",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            key={activeTab}
            style={{ animation: "proj-expand 0.15s ease both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectTabContent
              project={project}
              tab={activeTab}
              dark={dark}
              c={c}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects() {
  const dark = useDarkMode();
  const [mode, setMode] = useState("showcase"); // "showcase" | "engineer"
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "ai" | "fullstack"

  const c = {
    heading: dark ? "#ffffff" : "#050505",
    subtext: dark ? "#b0b0b0" : "#555",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#222" : "#e8e8e8",
    cardBorder: dark ? "#222" : "#e8e8e8",
    cardBg: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
  };

  const filtered = PROJECTS.filter(
    (p) => filter === "all" || p.type === filter,
  );

  function handleToggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes proj-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes proj-expand {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proj-a1 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .proj-a2 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .proj-a3 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .proj-a4 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
      `}</style>

      <section
        id="projects"
        style={{
          minHeight: "100vh",
          padding: "7.5rem 3rem 4rem 3rem",
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
          {/* ── Label row ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
            className="proj-a1"
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
              — Projects
            </span>
            <div style={{ flex: 1, height: 1, background: c.divider }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
              }}
            >
              03
            </span>
          </div>

          {/* ── Intro ── */}
          <div className="proj-a2" style={{ marginBottom: 28 }}>
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
              Systems I've{" "}
              <em
                style={{ fontStyle: "italic", color: dark ? "#888" : "#aaa" }}
              >
                Designed.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: dark ? "#666" : "#999",
                lineHeight: 1.6,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              Not experiments. Real architectures built to scale, adapt, and
              perform.
            </p>
          </div>

          {/* ── Controls row ── */}
          <div
            className="proj-a3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "all", label: "All" },
                { id: "ai", label: "AI Systems" },
                { id: "fullstack", label: "Full Stack" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setExpandedId(null);
                  }}
                  style={{
                    background:
                      filter === f.id
                        ? dark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)"
                        : "transparent",
                    border: `1px solid ${
                      filter === f.id
                        ? dark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                        : dark
                          ? "#222"
                          : "#e8e8e8"
                    }`,
                    borderRadius: 100,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color:
                      filter === f.id
                        ? dark
                          ? "#e0e0e0"
                          : "#111"
                        : dark
                          ? "#555"
                          : "#aaa",
                    transition: "all 0.15s ease",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mode toggle */}
            <div
              style={{
                display: "flex",
                border: `1px solid ${dark ? "#222" : "#e8e8e8"}`,
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              {[
                { id: "showcase", label: "Showcase" },
                { id: "engineer", label: "Engineer" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    background:
                      mode === m.id
                        ? dark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)"
                        : "transparent",
                    border: "none",
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color:
                      mode === m.id
                        ? dark
                          ? "#e0e0e0"
                          : "#111"
                        : dark
                          ? "#555"
                          : "#aaa",
                    transition: "all 0.15s ease",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Project list — 2-column grid, expansion breaks full width below its row ── */}
          <div className="proj-a4">
            {(() => {
              const rows = [];
              for (let i = 0; i < filtered.length; i += 2) {
                const pair = filtered.slice(i, i + 2);
                const expandedInRow = pair.find((p) => p.id === expandedId);
                rows.push(
                  <div key={i}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginBottom: expandedInRow ? 0 : 12,
                      }}
                    >
                      {pair.map((project, j) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          dark={dark}
                          c={c}
                          mode={mode}
                          index={i + j}
                          isExpanded={expandedId === project.id}
                          onToggle={() => handleToggle(project.id)}
                        />
                      ))}
                    </div>
                    {expandedInRow && (
                      <ProjectExpanded
                        key={expandedInRow.id + "-expanded"}
                        project={expandedInRow}
                        dark={dark}
                        c={c}
                      />
                    )}
                  </div>,
                );
              }
              return rows;
            })()}
          </div>

          {/* ── Engineering Decisions ── */}
          <div style={{ marginTop: 96 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 40,
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
                — Engineering Decisions
              </span>
              <div style={{ flex: 1, height: 1, background: c.divider }} />
            </div>

            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 400,
                color: dark ? "#888" : "#aaa",
                marginBottom: 40,
                letterSpacing: "-0.02em",
                fontStyle: "italic",
              }}
            >
              Systems are a series of trade-offs.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {ENGINEERING_DECISIONS.map((d, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${dark ? "#1e1e1e" : "#ececec"}`,
                    borderRadius: 10,
                    padding: "20px 22px",
                    background: dark
                      ? "rgba(255,255,255,0.015)"
                      : "rgba(0,0,0,0.01)",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = dark ? "#333" : "#ccc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = dark
                      ? "#1e1e1e"
                      : "#ececec")
                  }
                >
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 16,
                      fontWeight: 400,
                      color: c.heading,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {d.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11.5,
                      color: dark ? "#777" : "#888",
                      lineHeight: 1.7,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              marginTop: 80,
              paddingTop: 48,
              borderTop: `1px solid ${c.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: c.heading,
                  letterSpacing: "-0.01em",
                }}
              >
                Want to build something together?
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: dark ? "#666" : "#999",
                  letterSpacing: "0.02em",
                }}
              >
                I'm open to serious work.
              </p>
            </div>
            <a
              href="#contact"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: dark ? "#111" : "#fff",
                textDecoration: "none",
                background: dark ? "#f0f0f0" : "#111",
                borderRadius: 100,
                padding: "12px 24px",
                letterSpacing: "0.06em",
                transition: "opacity 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Let's Talk →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
