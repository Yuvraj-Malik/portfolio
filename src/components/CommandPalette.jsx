import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — AI responses are strictly grounded in this
// ─────────────────────────────────────────────────────────────────────────────
const PORTFOLIO = {
  name: "Yuvraj Malik",
  role: "Full Stack Developer & AI Engineer",
  tagline: "I build software that feels like science fiction.",
  email: "yuvraj.malik003@gmail.com",
  location: "Ludhiana, Punjab, India",
  education: "B.E. Computer Engineering · Thapar Institute of Engineering & Technology (2024–2027)",
  links: {
    github:   "https://github.com/Yuvraj-Malik",
    linkedin: "https://www.linkedin.com/in/yuvraj-malik-b00005303/",
    leetcode: "https://leetcode.com/u/Yuvraj_Malik/",
    codechef: "https://www.codechef.com/users/yuvraj_malik",
  },
  skills: {
    languages:  ["Python", "JavaScript", "Dart", "C++"],
    frontend:   ["React", "Next.js", "Tailwind CSS", "Three.js", "React Three Fiber"],
    backend:    ["Node.js", "FastAPI", "Django", "REST APIs"],
    ai_ml:      ["LangChain", "OpenAI", "HuggingFace", "MediaPipe", "TensorFlow Lite", "MoveNet"],
    mobile:     ["Flutter"],
    tools:      ["Git", "Docker", "Supabase", "Firebase", "MongoDB"],
    embedded:   ["Arduino C++", "Embedded I/O"],
  },
  projects: [
    { name: "Spatial Console",     tech: ["Three.js", "MediaPipe", "React Three Fiber"], desc: "Browser-based 3D spatial builder controlled entirely by hand gestures." },
    { name: "Jarvis",              tech: ["Python", "LLM APIs", "Edge-TTS"],             desc: "Fault-tolerant multi-LLM voice assistant with real desktop automation." },
    { name: "Stark Paper Analyzer",tech: ["FastAPI", "Gemini 2.5", "React"],             desc: "Transforms research PDFs into structured intelligence-ready outputs." },
    { name: "Code Vault",          tech: ["React 19", "Node.js", "MongoDB"],             desc: "Team-based live coding arena. Hosted 30-team campus competition." },
    { name: "Air Canvas",          tech: ["Python", "OpenCV", "MediaPipe"],              desc: "Touchless drawing interface on a 5000×5000 canvas using hand gestures." },
    { name: "AI Pose Detection",   tech: ["TensorFlow Lite", "MoveNet", "OpenCV"],       desc: "Real-time exercise form scoring using biomechanical state machines." },
    { name: "Anime Clash",         tech: ["Vanilla JS", "Netlify Functions"],            desc: "Deterministic daily anime popularity game with multiple game modes." },
    { name: "Bomb Difuse",         tech: ["Arduino C++"],                               desc: "Physical reaction game on bare-metal microcontroller hardware." },
  ],
  experience: [
    { role: "Core Member — LEAD Society", org: "Thapar Institute", year: "2025", desc: "Technical workshops, events, and mentoring junior developers." },
    { role: "Executive Member — LEAD",    org: "Thapar Institute", year: "2024", desc: "Led Seaferno tech event and ran student workshops." },
    { role: "Member — OWASP TIET",        org: "Thapar Institute", year: "2024", desc: "Security-focused technical society at TIET." },
  ],
  achievements: [
    "Built a gesture-controlled 3D environment running entirely in-browser",
    "Engineered a multi-LLM fallback system with 99%+ uptime",
    "Hosted a 30-team competitive coding event with zero downtime",
    "Built a touchless drawing app with real-time gesture recognition",
    "Designed biomechanical exercise scoring with ~89% accuracy",
  ],
  why_hire: "I don't just write code — I close the gap between what's possible and what exists. Every project I ship is built to actually work under pressure, not just in a demo. I've built gesture-controlled 3D environments, AI systems that run without cloud dependency, and live competition platforms — all from scratch. I bring systems thinking, cross-stack depth, and the relentless drive to ship things that feel like science fiction.",
  what_makes_different: "Most developers build features. I build systems with intention. I think about architecture before touching a keyboard, I care about the experience as much as the implementation, and I have a rare combination of AI/ML depth and full-stack execution. I'm also one of the few people who can go from Python AI pipelines to gesture-based interfaces to hardware-level Arduino code — all within the same portfolio.",
  journey: "Started with curiosity about how things work, ended up building things that shouldn't exist yet. From writing my first Python scripts to engineering Jarvis — a voice assistant that controls my desktop — to building real-time gesture systems that run in a browser. Currently studying Computer Engineering at Thapar Institute while shipping production-grade projects that push what's possible on the web.",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMMAND REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
const COMMANDS = [
  // ── Navigation ──
  { id: "nav-home",     category: "navigate", icon: "⌂", label: "Go to Home",     desc: "Scroll to the top",              aliases: ["home","top","start","hero"],          action: "scroll:#hero" },
  { id: "nav-about",    category: "navigate", icon: "◉", label: "Go to About",    desc: "Jump to the about section",      aliases: ["about","who","bio","me","person"],    action: "scroll:#about" },
  { id: "nav-projects", category: "navigate", icon: "◈", label: "Go to Projects", desc: "Browse all projects",            aliases: ["projects","work","code","portfolio"], action: "scroll:#projects" },
  { id: "nav-journey",  category: "navigate", icon: "◎", label: "Go to Journey",  desc: "Timeline & experience",          aliases: ["journey","timeline","experience","history"], action: "scroll:#journey" },
  { id: "nav-contact",  category: "navigate", icon: "◌", label: "Go to Contact",  desc: "Get in touch",                   aliases: ["contact","reach","hire","email","message"], action: "scroll:#contact" },

  // ── Actions ──
  { id: "act-resume",   category: "action",   icon: "↓", label: "Download Resume", desc: "Open resume PDF",               aliases: ["resume","cv","download","pdf"],       action: "open:/resume.pdf" },
  { id: "act-github",   category: "action",   icon: "◆", label: "Open GitHub",    desc: "View source code and repos",     aliases: ["github","git","code","repos","source"], action: `open:${PORTFOLIO.links.github}` },
  { id: "act-linkedin", category: "action",   icon: "◇", label: "Open LinkedIn",  desc: "Connect professionally",         aliases: ["linkedin","connect","network","professional"], action: `open:${PORTFOLIO.links.linkedin}` },
  { id: "act-leetcode", category: "action",   icon: "◑", label: "Open LeetCode",  desc: "View competitive programming",   aliases: ["leetcode","leet","dsa","competitive","algorithms"], action: `open:${PORTFOLIO.links.leetcode}` },
  { id: "act-email",    category: "action",   icon: "✉", label: "Copy Email",     desc: "Copy email to clipboard",        aliases: ["email","copy","mail","clipboard"],    action: "copy:yuvraj.malik003@gmail.com" },
  { id: "act-theme",    category: "action",   icon: "◐", label: "Toggle Theme",   desc: "Switch dark / light mode",       aliases: ["theme","dark","light","toggle","mode","color"], action: "theme" },

  // ── Terminal ──
  { id: "term-help",    category: "terminal", icon: ">", label: "help",           desc: "List all available commands",    aliases: ["help","commands","list","?"],         action: "terminal:help" },
  { id: "term-whoami",  category: "terminal", icon: ">", label: "whoami",         desc: "Who is Yuvraj Malik",            aliases: ["whoami","who am i","identity"],       action: "terminal:whoami" },
  { id: "term-skills",  category: "terminal", icon: ">", label: "skills",         desc: "List technical skills",          aliases: ["skills","stack","technologies","tech","languages"], action: "terminal:skills" },
  { id: "term-projects",category: "terminal", icon: ">", label: "projects",       desc: "List all projects",              aliases: ["ls projects","list projects","show projects","all projects"], action: "terminal:projects" },
  { id: "term-clear",   category: "terminal", icon: ">", label: "clear",          desc: "Clear the palette history",      aliases: ["clear","reset","cls"],               action: "terminal:clear" },

  // ── AI / Branding ──
  { id: "ai-skills",    category: "ai",       icon: "✦", label: "What are your skills?",      desc: "Technical skills breakdown",   aliases: ["what skills","tech stack","what do you know","capabilities"], action: "ai:skills" },
  { id: "ai-projects",  category: "ai",       icon: "✦", label: "Tell me about your projects", desc: "Project overview",             aliases: ["about projects","your work","what have you built"], action: "ai:projects" },
  { id: "ai-hire",      category: "ai",       icon: "✦", label: "Why should we hire you?",     desc: "The honest pitch",             aliases: ["why hire","hire you","why you","sell yourself","pitch","convince me"], action: "ai:hire" },
  { id: "ai-different", category: "ai",       icon: "✦", label: "What makes you different?",   desc: "What sets you apart",          aliases: ["different","unique","stand out","special","why you over others"], action: "ai:different" },
  { id: "ai-journey",   category: "ai",       icon: "✦", label: "Tell me your journey",        desc: "Background and story",         aliases: ["journey","story","background","how did you start","how you started"], action: "ai:journey" },
  { id: "ai-contact",   category: "ai",       icon: "✦", label: "How can I contact you?",      desc: "Get in touch details",         aliases: ["contact info","how to reach","reach out","get in touch"], action: "ai:contact" },

  // ── Easter Eggs ──
  { id: "egg-surprise",  category: "easter",  icon: "★", label: "surprise me",    desc: "???",                            aliases: ["surprise","random","fun","luck"],     action: "easter:surprise" },
  { id: "egg-hack",      category: "easter",  icon: "★", label: "hack the system", desc: "...",                           aliases: ["hack","hacker","matrix","glitch","sudo"], action: "easter:hack" },
  { id: "egg-jarvis",    category: "easter",  icon: "★", label: "jarvis",          desc: "...",                           aliases: ["jarvis","j.a.r.v.i.s","iron man","tony"],  action: "easter:jarvis" },
];

// ─────────────────────────────────────────────────────────────────────────────
// AI RESPONSE ENGINE — strictly grounded in PORTFOLIO data
// ─────────────────────────────────────────────────────────────────────────────
function getAIResponse(action, query = "") {
  switch (action) {
    case "ai:skills":
    case "terminal:skills":
      return {
        type: "structured",
        title: "Technical Skills",
        sections: [
          { label: "Languages",  items: PORTFOLIO.skills.languages },
          { label: "Frontend",   items: PORTFOLIO.skills.frontend },
          { label: "Backend",    items: PORTFOLIO.skills.backend },
          { label: "AI / ML",    items: PORTFOLIO.skills.ai_ml },
          { label: "Mobile",     items: PORTFOLIO.skills.mobile },
          { label: "Tools",      items: PORTFOLIO.skills.tools },
          { label: "Embedded",   items: PORTFOLIO.skills.embedded },
        ],
      };
    case "ai:projects":
    case "terminal:projects":
      return {
        type: "projects",
        title: "Projects",
        items: PORTFOLIO.projects,
      };
    case "ai:hire":
      return { type: "prose", title: "Why Yuvraj?", text: PORTFOLIO.why_hire };
    case "ai:different":
      return { type: "prose", title: "What Makes Me Different", text: PORTFOLIO.what_makes_different };
    case "ai:journey":
      return { type: "prose", title: "My Journey", text: PORTFOLIO.journey };
    case "ai:contact":
      return {
        type: "contact",
        title: "Get in Touch",
        items: [
          { label: "Email",    value: PORTFOLIO.email },
          { label: "GitHub",   value: PORTFOLIO.links.github },
          { label: "LinkedIn", value: PORTFOLIO.links.linkedin },
          { label: "Location", value: PORTFOLIO.location },
        ],
      };
    case "terminal:whoami":
      return {
        type: "terminal",
        lines: [
          `  name     → ${PORTFOLIO.name}`,
          `  role     → ${PORTFOLIO.role}`,
          `  location → ${PORTFOLIO.location}`,
          `  edu      → ${PORTFOLIO.education}`,
          `  tagline  → "${PORTFOLIO.tagline}"`,
        ],
      };
    case "terminal:help":
      return {
        type: "terminal",
        lines: [
          "  Navigation:  home · about · projects · journey · contact",
          "  Actions:     resume · github · linkedin · email · theme",
          "  Terminal:    whoami · skills · projects · clear",
          "  Ask me:      why hire · what makes you different · your journey",
          "  Easter eggs: surprise me · hack the system · jarvis",
          "  Tip: type anything — I'll try to understand it.",
        ],
      };
    case "easter:jarvis":
      return {
        type: "terminal",
        lines: [
          "  JARVIS ONLINE.",
          "  All systems nominal.",
          "  Running diagnostics on Yuvraj's portfolio...",
          "  ✓ Projects: 8 deployed",
          "  ✓ Skills: dangerously overloaded",
          "  ✓ Ambition: off the charts",
          "  Shall I begin the usual diagnostics, sir?",
        ],
      };
    case "easter:hack":
      return { type: "hack" };
    case "easter:surprise": {
      const surprises = [
        { type: "prose", title: "Fun Fact", text: "I built Jarvis — a voice assistant that controls WhatsApp, YouTube, and email — before finishing my second year of college. Some call it reckless. I call it Tuesday." },
        { type: "prose", title: "Unpopular Opinion", text: "The best code is the code you don't write. I've deleted more code than I've shipped — and the projects got better every time." },
        { type: "prose", title: "Secret", text: "The 'science fiction' in my tagline isn't metaphor. Every project I've built — gesture-controlled 3D environments, multi-modal AI assistants, real-time pose detection — would've been classified as sci-fi ten years ago. We just moved faster than fiction." },
      ];
      return surprises[Math.floor(Math.random() * surprises.length)];
    }
    default: {
      // Natural language fallback — try to match against portfolio data
      const q = query.toLowerCase();
      if (q.match(/react|three\.?js|python|javascript|flutter|docker/i))
        return { type: "prose", title: "Tech Insight", text: `${PORTFOLIO.name} works with ${q.split(" ").slice(0,2).join(" ")} as part of a cross-stack approach — combining AI/ML depth with full-stack execution to ship complete, production-ready systems.` };
      return {
        type: "terminal",
        lines: [
          `  I don't have a specific answer for: "${query}"`,
          "  Try: skills · projects · why hire · journey",
          "  Or use arrow keys to browse commands above.",
        ],
      };
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FUZZY MATCH — scores a query against a string
// ─────────────────────────────────────────────────────────────────────────────
function fuzzyScore(query, target) {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if (!q) return 1;
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 80;
  // character subsequence
  let qi = 0;
  let score = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) { score++; qi++; }
  }
  if (qi === q.length) return 40 + (score / q.length) * 30;
  return 0;
}

function scoreCommand(cmd, query) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const scores = [
    fuzzyScore(q, cmd.label),
    fuzzyScore(q, cmd.desc),
    ...cmd.aliases.map(a => fuzzyScore(q, a)),
    fuzzyScore(q, cmd.category),
  ];
  return Math.max(...scores);
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGHLIGHT — wraps matched characters in <mark>
// ─────────────────────────────────────────────────────────────────────────────
function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const idx = t.indexOf(q);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(255,255,255,0.15)", color: "inherit", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_META = {
  navigate: { label: "Navigate",    color: "#6b7280" },
  action:   { label: "Actions",     color: "#6b7280" },
  terminal: { label: "Terminal",    color: "#6b7280" },
  ai:       { label: "Ask Me",      color: "#6b7280" },
  easter:   { label: "Easter Eggs", color: "#6b7280" },
};

// ─────────────────────────────────────────────────────────────────────────────
// DARK MODE HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE PANEL
// ─────────────────────────────────────────────────────────────────────────────
function ResponsePanel({ response, dark }) {
  const [hackChars, setHackChars] = useState([]);

  useEffect(() => {
    if (response?.type === "hack") {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      const id = setInterval(() => {
        setHackChars(Array.from({ length: 80 }, () => chars[Math.floor(Math.random() * chars.length)]));
      }, 60);
      setTimeout(() => {
        clearInterval(id);
        setHackChars([]);
      }, 2500);
      return () => {
        clearInterval(id);
        setHackChars([]);
      };
    }
  }, [response]);

  if (!response) return null;

  const dimText = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const bodyText = dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const pillBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const pillText = dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  if (response.type === "hack") {
    return (
      <div style={{
        padding: "20px 20px",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11, lineHeight: 1.7,
        color: "#00ff41",
        letterSpacing: "0.05em",
        wordBreak: "break-all",
        maxHeight: 180, overflow: "hidden",
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ marginBottom: 8, opacity: 0.5, fontSize: 9, letterSpacing: "0.15em" }}>SYSTEM BREACH DETECTED — INITIATING COUNTERMEASURES</div>
        {hackChars.length > 0 ? hackChars.join("") : "ACCESS DENIED. Nice try. — Yuvraj"}
      </div>
    );
  }

  return (
    <div style={{ borderTop: `1px solid ${border}`, padding: "18px 20px 20px 20px", maxHeight: 260, overflowY: "auto" }}>
      {response.title && (
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: dimText, marginBottom: 12,
        }}>
          {response.title}
        </div>
      )}

      {/* Structured skills */}
      {response.type === "structured" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {response.sections.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dimText, width: 68, flexShrink: 0, paddingTop: 1 }}>
                {s.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {s.items.map((item) => (
                  <span key={item} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                    background: pillBg, color: pillText,
                    padding: "2px 8px", borderRadius: 3,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects list */}
      {response.type === "projects" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {response.items.map((p, i) => (
            <div key={p.name} style={{
              display: "flex", gap: 12, padding: "8px 0",
              borderBottom: `1px solid ${border}`,
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dimText, flexShrink: 0, width: 20, paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)", marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: bodyText, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prose */}
      {response.type === "prose" && (
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: 12,
          color: bodyText, lineHeight: 1.75, margin: 0,
          letterSpacing: "0.02em",
        }}>{response.text}</p>
      )}

      {/* Contact */}
      {response.type === "contact" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {response.items.map((item) => (
            <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dimText, width: 60, flexShrink: 0 }}>{item.label}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: bodyText }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Terminal output */}
      {response.type === "terminal" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {response.lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11,
              color: bodyText, lineHeight: 1.8, letterSpacing: "0.03em",
            }}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CommandPalette({ setDark }) {
  const dark = useDarkMode();
  const [open, setOpen]           = useState(false);
  const [query, setQuery]         = useState("");
  const [selected, setSelected]   = useState(0);
  const [response, setResponse]   = useState(null);
  const [history, setHistory]     = useState([]);
  const [mounted, setMounted]     = useState(false);
  const inputRef  = useRef(null);
  const listRef   = useRef(null);
  const itemRefs  = useRef([]);

  // Keyboard shortcut to open/close
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input on open, mount animation
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
      setMounted(true);
      setQuery("");
      setResponse(null);
      setSelected(0);
    } else {
      setTimeout(() => setMounted(false), 200);
    }
  }, [open]);

  // Filter + rank commands
  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS.slice(0, 12);
    return COMMANDS
      .map(cmd => ({ cmd, score: scoreCommand(cmd, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ cmd }) => cmd);
  }, [query]);

  // Group by category
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filtered]);

  // Flat list for keyboard nav
  const flatList = filtered;

  // Scroll selected into view
  useEffect(() => {
    itemRefs.current[selected]?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  // Reset selection when query changes
  useEffect(() => { setSelected(0); }, [query]);

  const executeCommand = useCallback((cmd) => {
    const { action } = cmd;

    if (action.startsWith("scroll:")) {
      const id = action.replace("scroll:", "");
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }
    if (action.startsWith("open:")) {
      window.open(action.replace("open:", ""), "_blank");
      setOpen(false);
      return;
    }
    if (action.startsWith("copy:")) {
      navigator.clipboard.writeText(action.replace("copy:", ""));
      setResponse({ type: "terminal", lines: ["  ✓ Copied to clipboard."] });
      return;
    }
    if (action === "theme") {
      if (setDark) setDark(d => !d);
      else {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", !isDark);
      }
      setOpen(false);
      return;
    }
    if (action.startsWith("terminal:") || action.startsWith("ai:") || action.startsWith("easter:")) {
      if (action === "terminal:clear") {
        setHistory([]);
        setResponse(null);
        setQuery("");
        return;
      }
      const res = getAIResponse(action, query);
      setResponse(res);
      setHistory(h => [...h.slice(-4), { query: cmd.label, action }]);
      return;
    }
  }, [query, setDark]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, flatList.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (flatList[selected]) {
        executeCommand(flatList[selected]);
      } else if (query.trim()) {
        // Natural language fallback
        const res = getAIResponse("fallback", query);
        setResponse(res);
      }
    }
  };

  if (!open && !mounted) {
    return (
      <div
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 40,
          fontFamily: "'DM Mono', monospace",
          fontSize: 10, letterSpacing: "0.1em",
          color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: 6,
          cursor: "pointer",
          transition: "color 0.2s ease",
          userSelect: "none",
        }}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"; }}
      >
        <kbd style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9,
          border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
          borderRadius: 3, padding: "2px 6px",
          color: "inherit",
        }}>
          {navigator.platform?.includes("Mac") ? "⌘K" : "Ctrl+K"}
        </kbd>
        <span>Command</span>
      </div>
    );
  }

  const bg          = dark ? "#080808"                   : "#ffffff";
  const border      = dark ? "rgba(255,255,255,0.08)"    : "rgba(0,0,0,0.09)";
  const inputColor  = dark ? "rgba(255,255,255,0.85)"    : "rgba(0,0,0,0.85)";
  const placeholder = dark ? "rgba(255,255,255,0.2)"     : "rgba(0,0,0,0.2)";
  const catLabel    = dark ? "rgba(255,255,255,0.2)"     : "rgba(0,0,0,0.2)";
  const cmdLabel    = dark ? "rgba(255,255,255,0.75)"    : "rgba(0,0,0,0.75)";
  const cmdDesc     = dark ? "rgba(255,255,255,0.3)"     : "rgba(0,0,0,0.3)";
  const selBg       = dark ? "rgba(255,255,255,0.06)"    : "rgba(0,0,0,0.05)";
  const iconColor   = dark ? "rgba(255,255,255,0.3)"     : "rgba(0,0,0,0.3)";
  const iconSelColor= dark ? "rgba(255,255,255,0.6)"     : "rgba(0,0,0,0.55)";
  const kbdBg       = dark ? "rgba(255,255,255,0.06)"    : "rgba(0,0,0,0.05)";
  const kbdText     = dark ? "rgba(255,255,255,0.3)"     : "rgba(0,0,0,0.3)";

  let globalIndex = 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        .cp-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: ${dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)"};
          backdrop-filter: blur(3px);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: 14vh;
          animation: cp-bg-in 0.15s ease both;
        }
        @keyframes cp-bg-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .cp-panel {
          width: 100%;
          max-width: 600px;
          background: ${bg};
          border: 1px solid ${border};
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 24px 80px ${dark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.18)"}, 0 4px 16px ${dark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)"};
          animation: cp-panel-in 0.18s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cp-panel-in {
          from { opacity: 0; transform: scale(0.97) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Input */
        .cp-input {
          width: 100%;
          background: transparent; border: none; outline: none;
          fontFamily: 'DM Mono', monospace;
          font-size: 14px; color: ${inputColor};
          caret-color: ${inputColor};
          letter-spacing: 0.02em;
          padding: 0;
        }
        .cp-input::placeholder { color: ${placeholder}; }

        /* List */
        .cp-list {
          max-height: 320px;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 6px 0;
        }
        .cp-list::-webkit-scrollbar { display: none; }

        /* Command row */
        .cp-cmd {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: background 0.1s ease, border-color 0.1s ease;
        }
        .cp-cmd.selected {
          background: ${selBg};
          border-left-color: ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"};
        }
        .cp-cmd:hover {
          background: ${selBg};
        }

        /* Category header */
        .cp-cat {
          padding: 6px 16px 3px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${catLabel};
        }
        .cp-cat:not(:first-child) { margin-top: 4px; }

        /* Footer */
        .cp-footer {
          padding: 8px 16px;
          border-top: 1px solid ${border};
          display: flex; align-items: center; gap: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${kbdText};
        }
        .cp-kbd {
          background: ${kbdBg};
          border: 1px solid ${border};
          border-radius: 3px;
          padding: "1px 5px";
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: ${kbdText};
          margin-right: 4px;
        }

        @media (max-width: 640px) {
          .cp-overlay { padding-top: 0; align-items: flex-end; }
          .cp-panel { border-radius: 12px 12px 0 0; max-width: 100%; }
        }
      `}</style>

      {/* Backdrop */}
      <div className="cp-overlay" onClick={() => setOpen(false)}>
        <div className="cp-panel" onClick={(e) => e.stopPropagation()}>

          {/* ── Input row ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 16px",
            borderBottom: filtered.length > 0 || response ? `1px solid ${border}` : "none",
          }}>
            {/* Prompt */}
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13, color: placeholder,
              flexShrink: 0, lineHeight: 1,
            }}>›</span>

            <input
              ref={inputRef}
              className="cp-input"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setResponse(null); }}
              onKeyDown={handleKeyDown}
              placeholder="Search commands or ask a question..."
              autoComplete="off"
              spellCheck="false"
            />

            {query && (
              <button
                onClick={() => { setQuery(""); setResponse(null); inputRef.current?.focus(); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: placeholder, fontSize: 14, padding: 0, lineHeight: 1, flexShrink: 0,
                }}
              >×</button>
            )}
          </div>

          {/* ── Command list ── */}
          {flatList.length > 0 && !response && (
            <div ref={listRef} className="cp-list">
              {Object.entries(grouped).map(([cat, cmds]) => (
                <div key={cat}>
                  <div className="cp-cat">{CATEGORY_META[cat]?.label || cat}</div>
                  {cmds.map((cmd) => {
                    const idx = globalIndex++;
                    const isSel = idx === selected;
                    return (
                      <div
                        key={cmd.id}
                        ref={(el) => (itemRefs.current[idx] = el)}
                        className={`cp-cmd${isSel ? " selected" : ""}`}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelected(idx)}
                      >
                        {/* Icon */}
                        <span style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          color: isSel ? iconSelColor : iconColor,
                          width: 16, textAlign: "center", flexShrink: 0,
                          lineHeight: 1,
                        }}>
                          {cmd.icon}
                        </span>

                        {/* Label + desc */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12.5,
                            color: isSel ? (dark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.9)") : cmdLabel,
                            letterSpacing: "0.02em",
                          }}>
                            {highlightMatch(cmd.label, query)}
                          </span>
                          {cmd.desc && (
                            <span style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10.5, color: cmdDesc,
                              marginLeft: 10, letterSpacing: "0.02em",
                            }}>
                              {cmd.desc}
                            </span>
                          )}
                        </div>

                        {/* Category badge — only when searching */}
                        {query && (
                          <span style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 9, letterSpacing: "0.12em",
                            color: catLabel, textTransform: "uppercase",
                            flexShrink: 0,
                          }}>
                            {CATEGORY_META[cmd.category]?.label}
                          </span>
                        )}

                        {/* Enter indicator on selected */}
                        {isSel && (
                          <span style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 9, color: kbdText,
                            flexShrink: 0, marginLeft: 4,
                          }}>↵</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Dynamic suggestions based on query */}
              {query.trim() && (() => {
                const q = query.toLowerCase();
                const techHits = ["react","python","javascript","three.js","mediapipe","flutter","node","fastapi","opencv","arduino"]
                  .filter(t => q.includes(t) || t.includes(q));
                if (techHits.length > 0) {
                  return (
                    <div>
                      <div className="cp-cat">Contextual</div>
                      {techHits.slice(0, 2).map((tech) => {
                        const idx = globalIndex++;
                        const isSel = idx === selected;
                        return (
                          <div
                            key={tech}
                            ref={(el) => (itemRefs.current[idx] = el)}
                            className={`cp-cmd${isSel ? " selected" : ""}`}
                            onClick={() => { document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}
                            onMouseEnter={() => setSelected(idx)}
                          >
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: isSel ? iconSelColor : iconColor, width: 16, textAlign: "center", flexShrink: 0 }}>◈</span>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5, color: isSel ? (dark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.9)") : cmdLabel }}>
                                Show {tech} projects
                              </span>
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: cmdDesc, marginLeft: 10 }}>
                                Jump to projects section
                              </span>
                            </div>
                            {isSel && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: kbdText, flexShrink: 0, marginLeft: 4 }}>↵</span>}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* ── No results — treat as question ── */}
          {query.trim() && flatList.length === 0 && !response && (
            <div style={{
              padding: "14px 16px",
              fontFamily: "'DM Mono', monospace",
              fontSize: 11, color: cmdDesc,
              letterSpacing: "0.03em",
            }}>
              Press <kbd style={{ background: kbdBg, border: `1px solid ${border}`, borderRadius: 2, padding: "1px 5px", fontSize: 9 }}>↵</kbd> to ask as a question
            </div>
          )}

          {/* ── Response panel ── */}
          <ResponsePanel response={response} dark={dark} />

          {/* ── Footer ── */}
          <div className="cp-footer">
            <span>
              <kbd className="cp-kbd" style={{ padding: "1px 5px" }}>↑↓</kbd>Navigate
            </span>
            <span>
              <kbd className="cp-kbd" style={{ padding: "1px 5px" }}>↵</kbd>Select
            </span>
            <span>
              <kbd className="cp-kbd" style={{ padding: "1px 5px" }}>Esc</kbd>Close
            </span>
            <span style={{ marginLeft: "auto" }}>
              {history.length > 0 ? `${history.length} commands run` : "Type to search"}
            </span>
          </div>

        </div>
      </div>
    </>
  );
}