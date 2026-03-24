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
    // Showcase: hook + short description
    thesis: "Build in 3D using just your hands.",
    category: "AI System",
    status: "active",
    type: "ai",
    tech: ["MediaPipe Hands", "Three.js", "React Three Fiber"],
    // Showcase: key features as highlights
    highlights: [
      "Control a 3D cursor using live hand tracking",
      "Create, move, and place cubes using gestures",
      "Snap structures cleanly onto a grid",
      "Build entirely touch-free, directly in the browser",
    ],
    // Showcase: interaction description as authority signal
    authoritySignal:
      "Move your hand → the cursor follows. Gesture → a cube appears. Drag → it snaps perfectly into place.",
    // Engineered: overview
    overview: {
      problem:
        "Creating and manipulating 3D content typically depends on a mouse, keyboard, and complex tools — making spatial interaction unintuitive and inaccessible for many users.",
      approach:
        "Built a touchless 3D building system where MediaPipe tracks hand landmarks, gesture logic interprets intent, and a React Three Fiber scene updates in real time.",
      outcome:
        "A browser-based spatial environment where your hand becomes the controller — no mouse, no keyboard, just real-time gesture interaction with instant visual feedback.",
    },
    // Engineered: architecture
    architecture: {
      description:
        "Webcam Input → Hand Landmarks (MediaPipe) → Gesture Controller → Action Controller → State (Reducer) → 3D Renderer → UI Feedback. Gesture interpretation and rendering logic are fully separated to keep each layer independently testable.",
      decisions: [
        "Separated gesture interpretation from rendering logic — changes to one don't affect the other",
        "Used grid snapping for predictable, reliable placement without free-form ambiguity",
        "Added continuous visual feedback (cursor previews) so intent is always visible to the user",
      ],
    },
    // Engineered: challenges mapped as problem → solution pairs
    challenges: [
      "Noisy hand tracking caused unstable cursor — applied smoothing and threshold-based position updates",
      "Differentiating intentional gestures from natural motion — introduced gesture gating using confidence scores and timing checks",
      "State-driven architecture minimizes re-renders — efficient snapping and lightweight rendering keep the scene responsive",
    ],
    // Engineered: metrics reframed around performance + trade-offs
    metrics: [
      {
        label: "Rendering Architecture",
        value: "State-driven",
        context: "minimises re-renders",
      },
      {
        label: "Placement System",
        value: "Grid snap",
        context: "predictable & reliable",
      },
      {
        label: "Stability trade-off",
        value: "Reliability",
        context: "prioritised over latency",
      },
    ],
    github: "https://github.com/Yuvraj-Malik/spatial-console",
    live: null,
  },
  {
    id: "jarvis",
    title: "Jarvis",
    thesis:
      "A resilient, multi-provider voice assistant engineered for real desktop automation and fault tolerance.",
    category: "AI System",
    status: "shipped",
    type: "ai",
    tech: ["Python", "LLM APIs", "Threading", "Edge-TTS"],
    highlights: [
      "Modular brain/router/tool architecture",
      "Multi-LLM fallback (Groq, Gemini, Mistral)",
      "Persistent session memory + system-level automation",
    ],
    authoritySignal: "Fault-tolerant multi-provider architecture",
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
    github: "https://github.com/Yuvraj-Malik/Jarvis",
    live: null,
  },
  {
    id: "stark-paper-analyzer",
    title: "Stark Paper Analyzer",
    thesis:
      "Transforms unstructured research PDFs into structured, intelligence-ready outputs.",
    category: "AI System",
    status: "active",
    type: "ai",
    tech: ["FastAPI", "Gemini 2.5", "React", "Three.js"],
    highlights: [
      "JSON-first LLM summarization pipeline",
      "Async processing + quota-aware fallback",
      "Foundation for 3D knowledge graph visualization",
    ],
    authoritySignal: "Token-aware structured output enforcement",
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
        "Async processing with quota-aware fallback handles rate limits gracefully",
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
    github: "https://github.com/Yuvraj-Malik/Stark-System",
    live: null,
  },
  {
    id: "code-vault",
    title: "Code Vault",
    thesis:
      "A full-stack, team-based coding arena built for high-energy campus competitions.",
    category: "Full Stack",
    status: "shipped",
    type: "fullstack",
    tech: ["React 19", "Node.js", "MongoDB", "REST APIs"],
    highlights: [
      "Drag-and-drop snippet engine",
      "Live leaderboard system",
      "Anti-cheat strike + admin moderation panel",
    ],
    authoritySignal: "Production-ready campus event infrastructure",
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
    github: "https://github.com/Yuvraj-Malik/Code-Vault",
    live: "https://lead.pratham.codes",
  },
  {
    id: "air-canvas",
    title: "Air Canvas",
    thesis:
      "A computer vision-based touchless drawing interface with real-time gesture UX.",
    category: "AI System",
    status: "shipped",
    type: "ai",
    tech: ["Python", "OpenCV", "MediaPipe"],
    highlights: [
      "5000×5000 scrollable canvas with minimap",
      "Gesture-based drawing, color selection, erasing, panning",
      "Shape detection from freehand strokes",
    ],
    authoritySignal: "Low-latency real-time landmark processing pipeline",
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
    github: "https://github.com/Yuvraj-Malik/Air-Canvas",
    live: null,
  },
  {
    id: "pose-detection",
    title: "AI Pose Detection Systems",
    thesis:
      "Two real-time exercise trackers built on biomechanical logic — high knees form scoring and squat depth analysis.",
    category: "AI System",
    status: "shipped",
    type: "ai",
    tech: ["Python", "TensorFlow Lite", "MoveNet", "OpenCV"],
    highlights: [
      "High Knees: per-leg rep detection with tiered scoring (60 / 80 / 100)",
      "Squat: knee-angle depth detection with continuous quality score (50–100)",
      "Both use biomechanical state machines — no hardcoded thresholds",
    ],
    authoritySignal:
      "Two distinct biomechanical models from one shared pose pipeline",
    overview: {
      problem:
        "Most fitness apps count reps blindly or require expensive equipment — neither evaluates form in real-time.",
      approach:
        "Built two independent trackers on the same pose pipeline. High Knees uses TensorFlow Lite with per-leg state machines. Squat Analyzer uses MoveNet with hysteresis-based depth detection.",
      outcome:
        "Two fully functional exercise form trackers running on a standard webcam, scoring quality in real-time.",
    },
    architecture: {
      description:
        "Shared OpenCV capture pipeline feeds into two separate inference modules. Each module has its own state machine for rep/phase tracking. Scoring logic is fully decoupled from pose inference.",
      decisions: [
        "TF Lite for High Knees (speed), MoveNet Lightning for Squat (lower-body accuracy)",
        "Separate state machines per exercise prevent logic bleeding between modules",
        "Exponential moving average smoothing on keypoints reduces jitter without adding latency",
      ],
    },
    challenges: [
      "Keypoint jitter on fast movements — smoothed with exponential moving average per joint",
      "Camera angle dependency for squats — added placement guidance overlay",
      "Asymmetric leg detection in high knees — separate state machines per leg resolved false counts",
    ],
    metrics: [
      {
        label: "High Knees Inference",
        value: "<30ms",
        context: "per frame on CPU",
      },
      { label: "Squat Depth Accuracy", value: "~89%", context: "on test set" },
      { label: "Exercises Covered", value: "2", context: "High Knees · Squat" },
    ],
    github: "https://github.com/Yuvraj-Malik/Pose-Detection",
    live: null,
  },
  {
    id: "anime-clash",
    title: "Anime Clash",
    thesis:
      "A replay-driven anime popularity game built with deterministic daily logic.",
    category: "Full Stack",
    status: "shipped",
    type: "fullstack",
    tech: ["Vanilla JS", "Netlify Functions", "JSON Dataset"],
    highlights: [
      "Deterministic daily challenge generation",
      "Serverless backend persistence",
      "Multiple modes (Classic, Endless, Time Attack)",
    ],
    authoritySignal:
      "Seeded PRNG eliminates need for a challenge server entirely",
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
      {
        label: "Gameplay Modes",
        value: "3",
        context: "Classic · Endless · Time Attack",
      },
    ],
    github: "https://github.com/Yuvraj-Malik/Anime-Higher-Lower",
    live: "https://anime-clash.netlify.app",
  },
  {
    id: "bomb-difuse",
    title: "Bomb Difuse",
    thesis:
      "A physical reaction game built using microcontroller logic and real-time hardware feedback.",
    category: "Embedded",
    status: "shipped",
    type: "hardware",
    tech: ["Arduino C++", "Embedded I/O"],
    highlights: [
      "Randomized LED pattern engine",
      "Timeout-based pressure simulation",
      "Hardware-level input polling + buzzer feedback",
    ],
    authoritySignal: "Pure hardware logic — no OS, no runtime, no abstractions",
    overview: {
      problem:
        "Wanted to build something that required thinking in real hardware constraints — no OS, no runtime, direct register-level control.",
      approach:
        "Designed a randomized LED challenge game on Arduino with hardware interrupt-based input polling and a buzzer feedback system for correct/incorrect patterns.",
      outcome:
        "A physical reaction game that runs entirely on microcontroller logic with millisecond-accurate timing.",
    },
    architecture: {
      description:
        "Arduino C++ with direct I/O register manipulation. Randomized pattern generation via hardware entropy seeding. Buzzer and LED feedback driven by PWM output.",
      decisions: [
        "Hardware interrupts over polling for input — ensures zero missed presses under load",
        "PWM buzzer tones encode feedback (correct/incorrect/timeout) without a sound library",
        "Entropy seeding from analog noise for true randomization on constrained hardware",
      ],
    },
    challenges: [
      "Button debounce on physical hardware — implemented software debounce with 20ms threshold",
      "Timing accuracy without OS scheduler — used hardware timer registers directly",
      "LED pattern visibility under different lighting — calibrated resistor values for consistent brightness",
    ],
    metrics: [
      { label: "Input Response", value: "<5ms", context: "hardware interrupt" },
      {
        label: "Pattern Randomness",
        value: "True",
        context: "analog entropy seed",
      },
      { label: "Hardware Platform", value: "Arduino", context: "bare metal" },
    ],
    github: "https://github.com/Yuvraj-Malik/Bomb-Difuse",
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
                color: dark ? "#a1a1a1" : "#aaa",
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
            color: dark ? "#c8c8c8" : "#333",
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
              color: dark ? "#7c7c7c" : "#aaa",
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
                  color: dark ? "#a8a8a8" : "#383838",
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
                color: dark ? "#666" : "#bbb",
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
                  color: dark ? "#bbb" : "#555",
                  letterSpacing: "0.02em",
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: dark ? "#888" : "#999",
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
            color: dark ? "#afafaf" : "#494949",
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
            color: dark ? "#aaa" : "#555",
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

// Expanded detail panel — two completely different layouts per mode
function ProjectExpanded({ project, dark, c, mode, onClose }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const isShowcase = mode === "showcase";

  const BackBtn = () => (
    <button
      onClick={onClose}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: dark ? "#888" : "#888",
        letterSpacing: "0.08em",
        padding: "0 0 28px 0",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "color 0.15s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = dark ? "#fff" : "#000")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = dark ? "#888" : "#888")
      }
    >
      ← All Projects
    </button>
  );

  // ── SHOWCASE LAYOUT — visual, spacious, impression-first ──
  if (isShowcase) {
    return (
      <div
        style={{
          animation: "proj-fade-up 0.25s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <BackBtn />

        {/* Large preview */}
        <div
          style={{
            width: "100%",
            height: 260,
            borderRadius: 10,
            background: dark ? "#0a0a0a" : "#f0f0f0",
            border: `1px solid ${dark ? "#1e1e1e" : "#e8e8e8"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: dark ? "#a1a1a1" : "#3b3b3b",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Demo / Preview
          </span>
        </div>

        {/* Title + hook + CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 14,
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 34,
                  fontWeight: 400,
                  color: dark ? "#fff" : "#050505",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {project.title}
              </span>
              <StatusBadge status={project.status} dark={dark} />
            </div>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 18,
                fontStyle: "italic",
                color: dark ? "#888" : "#aaa",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {project.thesis}
            </p>
          </div>
          <div
            style={{ display: "flex", gap: 8, flexShrink: 0, paddingTop: 4 }}
          >
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
                  padding: "7px 16px",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
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
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
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
                  padding: "7px 16px",
                  letterSpacing: "0.06em",
                  transition: "opacity 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: dark ? "#1a1a1a" : "#ebebeb",
            margin: "24px 0",
          }}
        />

        {/* Two-column: features left, tech + feel right */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48 }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: dark ? "#a8a8a8" : "#2c2c2c",
                margin: "0 0 14px 0",
              }}
            >
              Key Features
            </p>
            {project.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "11px 0",
                  alignItems: "flex-start",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: dark ? "#adadad" : "#2b2b2b",
                    marginTop: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: dark ? "#c8c8c8" : "#333",
                    lineHeight: 1.6,
                    letterSpacing: "0.02em",
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: dark ? "#b7b7b7" : "#424242",
                margin: "0 0 14px 0",
              }}
            >
              Built With
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginBottom: 28,
              }}
            >
              {project.tech.map((t) => (
                <TechPill key={t} label={t} dark={dark} />
              ))}
            </div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: dark ? "#c9c9c9" : "#2c2c2c",
                margin: "0 0 10px 0",
              }}
            >
              How it feels
            </p>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 15,
                fontStyle: "italic",
                color: dark ? "#9e9e9e" : "#1d1d1d",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              "{project.authoritySignal}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── ENGINEERED LAYOUT — dense, structured, system-design-doc ──
  return (
    <div
      style={{
        animation: "proj-fade-up 0.25s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <BackBtn />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48 }}
      >
        {/* Left — problem statement, highlights, tech, authority, buttons */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 28,
                fontWeight: 400,
                color: dark ? "#fff" : "#050505",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </span>
            <StatusBadge status={project.status} dark={dark} />
          </div>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: dark ? "#aaa" : "#555",
              lineHeight: 1.65,
              letterSpacing: "0.02em",
              marginBottom: 20,
            }}
          >
            {project.overview.problem}
          </p>

          <div style={{ marginBottom: 20 }}>
            {project.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "7px 0",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: dark ? "#555" : "#ccc",
                    flexShrink: 0,
                  }}
                >
                  —
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: dark ? "#c0c0c0" : "#444",
                    lineHeight: 1.55,
                    letterSpacing: "0.02em",
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 24,
            }}
          >
            {project.tech.map((t) => (
              <TechPill key={t} label={t} dark={dark} />
            ))}
          </div>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: dark ? "#ffffff" : "#000000",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            ↳ {project.authoritySignal}
          </p>

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
                  padding: "7px 16px",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
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
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
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
                  padding: "7px 16px",
                  letterSpacing: "0.06em",
                  transition: "opacity 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Right — smaller preview + full tabbed deep-dive */}
        <div>
          <div
            style={{
              width: "100%",
              height: 160,
              borderRadius: 8,
              background: dark ? "#0e0e0e" : "#f5f5f5",
              border: `1px solid ${dark ? "#1e1e1e" : "#ebebeb"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: dark ? "#2e2e2e" : "#424242",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Preview placeholder
            </span>
          </div>

          <div
            style={{
              display: "flex",
              borderBottom: `1px solid ${dark ? "#222" : "#e8e8e8"}`,
              marginBottom: 20,
            }}
          >
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: `1.5px solid ${activeTab === t ? (dark ? "#fff" : "#000") : "transparent"}`,
                  marginBottom: -1,
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  padding: "6px 14px",
                  color:
                    activeTab === t
                      ? dark
                        ? "#f0f0f0"
                        : "#111"
                      : dark
                        ? "#a7a7a7"
                        : "#717171",
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
  const [mode, setMode] = useState("showcase");
  const [filter, setFilter] = useState("all");

  // URL anchor support — open project from hash on load
  const [expandedId, setExpandedId] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      return PROJECTS.find((p) => p.id === hash) ? hash : null;
    }
    return null;
  });

  // Listen for hash changes from Footer / About deep links
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (PROJECTS.find((p) => p.id === hash)) {
        setExpandedId(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Sync URL hash when expanded project changes
  useEffect(() => {
    if (expandedId) {
      history.replaceState(null, "", `#${expandedId}`);
    } else {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, [expandedId]);

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
        @keyframes proj-slide-down {
          from { opacity: 0; max-height: 0; transform: translateY(-6px); }
          to   { opacity: 1; max-height: 1200px; transform: translateY(0); }
        }
        .proj-a1 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .proj-a2 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .proj-a3 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .proj-a4 { animation: proj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
      `}</style>

      <section
        id="projects"
        style={{
          padding: "4.5rem 3rem 2.5rem 3rem",
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
              : "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
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
                color: dark ? "#aaa" : "#666",
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
                { id: "hardware", label: "Embedded" },
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
                          ? "#9c9c9c"
                          : "#606060",
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
                          ? "#8a8a8a"
                          : "#aaa",
                    transition: "all 0.15s ease",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Project list ── */}
          <div className="proj-a4" style={{ position: "relative" }}>
            {/* Grid view */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                opacity: expandedId ? 0 : 1,
                pointerEvents: expandedId ? "none" : "auto",
                transition: "opacity 0.2s ease",
                position: expandedId ? "absolute" : "relative",
                inset: 0,
              }}
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  dark={dark}
                  c={c}
                  mode={mode}
                  index={i}
                  isExpanded={false}
                  onToggle={() => handleToggle(project.id)}
                />
              ))}
            </div>

            {/* Full-takeover expanded view */}
            {expandedId &&
              (() => {
                const project =
                  filtered.find((p) => p.id === expandedId) ||
                  PROJECTS.find((p) => p.id === expandedId);
                if (!project) return null;
                return (
                  <ProjectExpanded
                    key={expandedId}
                    project={project}
                    dark={dark}
                    c={c}
                    mode={mode}
                    onClose={() => setExpandedId(null)}
                  />
                );
              })()}
          </div>

          {/* ── Engineering Decisions ── */}
          <div style={{ marginTop: 56 }}>
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
        </div>
      </section>
    </>
  );
}
