import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA
// ─────────────────────────────────────────────────────────────────────────────
const PORTFOLIO = {
  name: "Yuvraj Malik",
  role: "Full Stack Developer & AI Engineer",
  tagline: "I build software that feels like science fiction.",
  email: "yuvraj.malik003@gmail.com",
  location: "Patiala, Punjab, India",
  education: "B.E. Computer Engineering · Thapar Institute of Engineering & Technology (2024–2028)",
  links: {
    github:   "https://github.com/Yuvraj-Malik",
    linkedin: "https://www.linkedin.com/in/yuvraj-malik-b00005303/",
    leetcode: "https://leetcode.com/u/Yuvraj-Malik/",
  },
  skills: {
    languages: ["Python", "JavaScript", "Dart", "C++"],
    frontend:  ["React", "Next.js", "Tailwind CSS", "Three.js"],
    backend:   ["Node.js", "FastAPI", "Django", "REST APIs"],
    ai_ml:     ["OpenCV", "MediaPipe", "TensorFlow", "MoveNet", "PyTorch", "LLM APIs"],
    mobile:    ["Flutter"],
    tools:     ["Git", "Docker", "Supabase", "Firebase", "MongoDB"],
    embedded:  ["Arduino C++", "Embedded I/O"],
  },
  projects: [
    { name: "Spatial Console",      tech: ["Three.js", "MediaPipe", "React Three Fiber"], desc: "Browser-based 3D spatial builder controlled entirely by hand gestures." },
    { name: "Jarvis",               tech: ["Python", "LLM APIs", "Edge-TTS"],             desc: "Fault-tolerant multi-LLM voice assistant with real desktop automation." },
    { name: "Stark Paper Analyzer", tech: ["FastAPI", "Gemini 2.5", "React"],             desc: "Transforms research PDFs into structured intelligence-ready outputs." },
    { name: "Code Vault",           tech: ["React 19", "Node.js", "MongoDB"],             desc: "Team-based live coding arena. Hosted 30-team campus competition." },
    { name: "Air Canvas",           tech: ["Python", "OpenCV", "MediaPipe"],              desc: "Touchless drawing interface on a 5000×5000 canvas using hand gestures." },
    { name: "AI Pose Detection",    tech: ["TensorFlow Lite", "MoveNet", "OpenCV"],       desc: "Real-time exercise form scoring using biomechanical state machines." },
    { name: "Anime Clash",          tech: ["Vanilla JS", "Netlify Functions"],            desc: "Deterministic daily anime popularity game with multiple game modes." },
    { name: "Bomb Difuse",          tech: ["Arduino C++"],                               desc: "Physical reaction game on bare-metal microcontroller hardware." },
  ],
  experience: [
    { role: "AI-ML Intern — Auraflo",     org: "Thapar Institute", year: "2025", desc: "Developed AI-powered solutions for real-world applications." },
    { role: "Core Member — LEAD Society", org: "Thapar Institute", year: "2025", desc: "Technical workshops, events, and mentoring junior developers." },
    { role: "Executive Member — LEAD",    org: "Thapar Institute", year: "2024", desc: "Organized events and attended workshops." },
    { role: "Member — OWASP TIET",        org: "Thapar Institute", year: "2024", desc: "Security-focused technical society at TIET." },
  ],
  achievements: [
    "District Level Chess gold medalist",
    "Engineered a multi-LLM fallback system with 99%+ uptime",
    "Hosted a 30-team competitive coding event with zero downtime",
    "Built a touchless drawing app with real-time gesture recognition",
    "Designed biomechanical exercise scoring with ~90% accuracy",
  ],
  why_hire: "I don't just build features — I build systems that actually hold up in the real world. Most people optimize for demos; I optimize for execution under pressure. I've built gesture-controlled 3D interfaces, offline AI systems, and real-time platforms from scratch. I think in systems, move fast across the stack, and I ship things that feel a step ahead of what's expected.",
  what_makes_different: "Most developers think in features. I think in systems. Before I write code, I think about architecture, scale, and experience. What sets me apart is range — I can go from AI pipelines in Python to full-stack applications to hardware-level Arduino systems, all within the same project. That combination lets me build things most people wouldn't even attempt.",
  journey: "I started with curiosity about how things work, and that turned into building things that probably shouldn't exist yet. From simple Python scripts to creating Jarvis — a desktop voice assistant — to real-time gesture systems running in the browser. Right now, I'm studying Computer Engineering at Thapar Institute while consistently shipping projects that push the limits of what the web can do.",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function normalizeQuery(q) {
  return q.trim().replace(/[?!.]+$/, "").trim();
}

function fuzzyScore(query, target) {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if (!q) return 1;
  if (t === q) return 100;
  if (t.startsWith(q) && q.length >= 3) return 90;
  if (t.includes(q)   && q.length >= 3) return 80;
  if (q.length < 4) return 0;
  let qi = 0, score = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) { score++; qi++; }
  }
  if (qi === q.length) return 40 + (score / q.length) * 30;
  return 0;
}

function scoreCommand(cmd, query) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  return Math.max(
    fuzzyScore(q, cmd.label),
    fuzzyScore(q, cmd.desc),
    ...cmd.aliases.map(a => fuzzyScore(q, a)),
    fuzzyScore(q, cmd.category),
  );
}

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const q = normalizeQuery(query).toLowerCase();
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
// COMMAND REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
const COMMANDS = [
  // Navigation
  { id: "nav-home",     category: "navigate", icon: "⌂", label: "Go to Home",     desc: "Scroll to the top",            aliases: ["home","top","start","hero"],                               action: "scroll:#hero" },
  { id: "nav-about",    category: "navigate", icon: "◉", label: "Go to About",    desc: "Jump to the about section",    aliases: ["about","bio","who"],                                       action: "scroll:#about" },
  { id: "nav-projects", category: "navigate", icon: "◈", label: "Go to Projects", desc: "Browse all projects",          aliases: ["projects","work","portfolio","code"],                      action: "scroll:#projects" },
  { id: "nav-journey",  category: "navigate", icon: "◎", label: "Go to Journey",  desc: "Timeline & experience",        aliases: ["journey","timeline","experience"],                         action: "scroll:#journey" },
  { id: "nav-contact",  category: "navigate", icon: "◌", label: "Go to Contact",  desc: "Get in touch",                 aliases: ["contact","reach","message","hire"],                        action: "scroll:#contact" },
  // Actions
  { id: "act-resume",   category: "action",   icon: "↓", label: "Download Resume", desc: "Open resume PDF",             aliases: ["resume","cv","download","pdf"],                            action: "open:/resume.pdf" },
  { id: "act-github",   category: "action",   icon: "◆", label: "Open GitHub",    desc: "View source code and repos",   aliases: ["github","git","repos","source"],                           action: `open:${PORTFOLIO.links.github}` },
  { id: "act-linkedin", category: "action",   icon: "◇", label: "Open LinkedIn",  desc: "Connect professionally",       aliases: ["linkedin","connect","network"],                            action: `open:${PORTFOLIO.links.linkedin}` },
  { id: "act-leetcode", category: "action",   icon: "◑", label: "Open LeetCode",  desc: "View competitive programming", aliases: ["leetcode","dsa","competitive"],                            action: `open:${PORTFOLIO.links.leetcode}` },
  { id: "act-email",    category: "action",   icon: "✉", label: "Copy Email",     desc: "Copy email to clipboard",      aliases: ["email","copy email","mail","clipboard"],                   action: "copy:yuvraj.malik003@gmail.com" },
  { id: "act-theme",    category: "action",   icon: "◐", label: "Toggle Theme",   desc: "Switch dark / light mode",     aliases: ["theme","dark mode","light mode","toggle"],                 action: "theme" },
  // Terminal
  { id: "term-help",     category: "terminal", icon: ">", label: "help",    desc: "List all available commands", aliases: ["help","commands","what can you do"],                             action: "terminal:help" },
  { id: "term-whoami",   category: "terminal", icon: ">", label: "whoami",  desc: "Who is Yuvraj Malik",         aliases: ["whoami","who are you","who is yuvraj","introduce yourself"],      action: "terminal:whoami" },
  { id: "term-skills",   category: "terminal", icon: ">", label: "skills",  desc: "List technical skills",       aliases: ["skills","tech stack","technologies"],                            action: "terminal:skills" },
  { id: "term-projects", category: "terminal", icon: ">", label: "projects",desc: "List all projects",           aliases: ["list projects","all projects","project list"],                   action: "terminal:projects" },
  { id: "term-clear",    category: "terminal", icon: ">", label: "clear",   desc: "Clear the palette history",   aliases: ["clear","reset","cls"],                                           action: "terminal:clear" },
  // Ask Me
  { id: "ai-hire",      category: "ai", icon: "✦", label: "Why should we hire you?",     desc: "The honest pitch",           aliases: ["why hire","why you","pitch","convince me"],            action: "ai:hire" },
  { id: "ai-different", category: "ai", icon: "✦", label: "What makes you different?",   desc: "What sets you apart",        aliases: ["what makes you different","what sets you apart"],      action: "ai:different" },
  { id: "ai-journey",   category: "ai", icon: "✦", label: "Tell me your journey",        desc: "Background and story",       aliases: ["tell me your journey","your story","background"],      action: "ai:journey" },
  { id: "ai-contact",   category: "ai", icon: "✦", label: "How can I contact you?",      desc: "Get in touch details",       aliases: ["contact info","how to contact","how to reach"],        action: "ai:contact" },
  // Easter Eggs
  { id: "egg-surprise", category: "easter", icon: "★", label: "surprise me",     desc: "???",  aliases: ["surprise","random","fun","lucky"],                              action: "easter:surprise" },
  { id: "egg-hack",     category: "easter", icon: "★", label: "hack the system", desc: "...",  aliases: ["hack","hacker","matrix","glitch","sudo"],                       action: "easter:hack" },
  { id: "egg-jarvis",   category: "easter", icon: "★", label: "jarvis",          desc: "...",  aliases: ["jarvis","hey jarvis","iron man","tony stark"],                  action: "easter:jarvis" },
];

const CATEGORY_META = {
  navigate: { label: "Navigate"    },
  action:   { label: "Actions"     },
  terminal: { label: "Terminal"    },
  ai:       { label: "Ask Me"      },
  easter:   { label: "Easter Eggs" },
};

// ─────────────────────────────────────────────────────────────────────────────
// AI — Gemini with smart local fallback
// HOW TO ENABLE: create .env file in project root with:
// VITE_GEMINI_API_KEY=your_key_here
// Get free key at: aistudio.google.com
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Yuvraj Malik's portfolio AI assistant. Answer questions about Yuvraj as if you are him. Be concise, confident, direct. Max 80 words unless more detail is needed.

PORTFOLIO DATA:
- Name: ${PORTFOLIO.name} | Role: ${PORTFOLIO.role}
- Location: ${PORTFOLIO.location} | Email: ${PORTFOLIO.email}
- Education: ${PORTFOLIO.education}
- GitHub: ${PORTFOLIO.links.github} | LinkedIn: ${PORTFOLIO.links.linkedin}
- Languages: ${PORTFOLIO.skills.languages.join(", ")}
- Frontend: ${PORTFOLIO.skills.frontend.join(", ")}
- Backend: ${PORTFOLIO.skills.backend.join(", ")}
- AI/ML: ${PORTFOLIO.skills.ai_ml.join(", ")}
- Tools: ${PORTFOLIO.skills.tools.join(", ")}
- Projects: ${PORTFOLIO.projects.map(p => `${p.name} (${p.tech.join(", ")}): ${p.desc}`).join(" | ")}
- Experience: ${PORTFOLIO.experience.map(e => `${e.role} @ ${e.org} ${e.year}`).join(", ")}
- Achievements: ${PORTFOLIO.achievements.join("; ")}
- Why hire: ${PORTFOLIO.why_hire}
- What makes different: ${PORTFOLIO.what_makes_different}
- Journey: ${PORTFOLIO.journey}

RULES: Only use data above. Never invent facts. Speak as Yuvraj (first person). For greetings, introduce yourself briefly. For personal questions like girlfriend/relationship/age/salary, answer with wit and personality — don't deflect or say "my portfolio doesn't cover that". Be human. If asked something genuinely not in the data, say "I don't have that info — reach me at ${PORTFOLIO.email}"`;


// Smart local fallback — used when no API key is set
function localAIResponse(q) {
  const t = q.toLowerCase();

  if (t.includes("girlfriend") || t.includes("relationship") || t.includes("dating") || t.includes("single") || t.includes("married") || t.includes("wife") || t.includes("partner"))
    return `Currently in a committed relationship — with my code editor. She never crashes (unlike my last React app). My GitHub commit history is the only streak I'm maintaining right now.`;

  if (t.includes("age") || t.includes("how old") || t.includes("born") || t.includes("birthday"))
    return `I'm a second-year Computer Engineering student at Thapar Institute, batch 2024–2028. You can do the math — but I prefer to be judged by what I've shipped, not how old I am.`;

  if (t.includes("hobby") || t.includes("free time") || t.includes("fun") || t.includes("outside") || t.includes("passion"))
    return `Chess — district-level gold medalist. And building things that don't need to exist yet. The line between hobby and work is blurry when you enjoy both equally.`;

  if (t.includes("favourite") || t.includes("favorite") || t.includes("fav ") || t.includes("best language") || t.includes("prefer"))
    return `Python for AI and quick thinking. JavaScript when the product has to look good. C++ when there's no OS and everything is on fire. Depends what needs solving.`;

  if (t.includes("salary") || t.includes("pay") || t.includes("money") || t.includes("package") || t.includes("ctc"))
    return `Ha. Open to conversations — but the right problem matters more than the number. If the work is interesting enough, we can figure out the rest.`;

  if (t.includes("funny") || t.includes("joke") || t.includes("laugh") || t.includes("humor"))
    return `Why do programmers prefer dark mode? Because light attracts bugs. — That's the only one I know. I express humor through variable names in my code.`;

  if (/^(hi|hello|hey|yo|sup)$/.test(t))
    return `Hello. I'm ${PORTFOLIO.name} — ${PORTFOLIO.role}. Ask me about skills, projects, journey, or contact.`;

  if (t.includes("who are you") || t.includes("introduce") || t.includes("about yourself"))
    return `I'm ${PORTFOLIO.name}, a ${PORTFOLIO.role} based in ${PORTFOLIO.location}. ${PORTFOLIO.tagline} Currently studying at ${PORTFOLIO.education.split("·")[0].trim()}.`;

  if (t.includes("skill") || t.includes("stack") || t.includes("technolog") || t.includes("know"))
    return `My stack: ${PORTFOLIO.skills.languages.join(", ")} · ${PORTFOLIO.skills.frontend.join(", ")} · ${PORTFOLIO.skills.backend.join(", ")} · ${PORTFOLIO.skills.ai_ml.join(", ")}. Also Flutter for mobile and Arduino for embedded.`;

  if (t.includes("project") || t.includes("built") || t.includes("work") || t.includes("portfolio"))
    return `I've built ${PORTFOLIO.projects.length} projects: ${PORTFOLIO.projects.map(p => p.name).join(", ")}. From gesture-controlled 3D environments to multi-LLM AI systems.`;

  if (t.includes("hire") || t.includes("why you") || t.includes("pitch") || t.includes("convince"))
    return PORTFOLIO.why_hire;

  if (t.includes("different") || t.includes("unique") || t.includes("stand out") || t.includes("special"))
    return PORTFOLIO.what_makes_different;

  if (t.includes("journey") || t.includes("story") || t.includes("background") || t.includes("started"))
    return PORTFOLIO.journey;

  if (t.includes("contact") || t.includes("email") || t.includes("reach"))
    return `Email: ${PORTFOLIO.email} · GitHub: ${PORTFOLIO.links.github} · LinkedIn: ${PORTFOLIO.links.linkedin}`;

  if (t.includes("education") || t.includes("study") || t.includes("college") || t.includes("thapar") || t.includes("degree"))
    return `I'm studying ${PORTFOLIO.education}.`;

  if (t.includes("experience") || t.includes("intern") || t.includes("work history"))
    return `${PORTFOLIO.experience.map(e => `${e.role} at ${e.org} (${e.year})`).join(", ")}.`;

  if (t.includes("location") || t.includes("where") || t.includes("city") || t.includes("india"))
    return `I'm based in ${PORTFOLIO.location}.`;

  if (t.includes("jarvis"))
    return `Jarvis is my most personal project — a multi-LLM voice assistant that controls my desktop: WhatsApp, YouTube, email, and more. Built in Python with multi-provider fallback for 99%+ uptime.`;

  if (t.includes("spatial") || t.includes("3d") || t.includes("gesture"))
    return `Spatial Console is a browser-based 3D builder controlled entirely by hand gestures. No mouse, no keyboard — just MediaPipe hand tracking and React Three Fiber.`;

  if (t.includes("achievement") || t.includes("chess") || t.includes("accomplish"))
    return `Highlights: ${PORTFOLIO.achievements.join(". ")}.`;

  return `I don't have a specific answer for that. Try asking about my skills, projects, experience, or why you should hire me. Or just type "help" to see all commands.`;
}

async function askGemini(messages) {
  const lastQuestion = messages[messages.length - 1]?.content || "";
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // No key → local fallback immediately, no loading delay
  if (!apiKey) return localAIResponse(normalizeQuery(lastQuestion));

  try {
    const contents = messages
      .filter(m => m?.content)
      .map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
        }),
      }
    );

    if (!res.ok) return localAIResponse(normalizeQuery(lastQuestion));

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p?.text || "").join("").trim();
    return text || localAIResponse(normalizeQuery(lastQuestion));
  } catch {
    return localAIResponse(normalizeQuery(lastQuestion));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC RESPONSES — no API call needed
// ─────────────────────────────────────────────────────────────────────────────
function getStaticResponse(action) {
  switch (action) {
    case "terminal:skills":
    case "ai:skills":
      return {
        type: "structured", title: "Technical Skills",
        sections: [
          { label: "Languages", items: PORTFOLIO.skills.languages },
          { label: "Frontend",  items: PORTFOLIO.skills.frontend },
          { label: "Backend",   items: PORTFOLIO.skills.backend },
          { label: "AI / ML",   items: PORTFOLIO.skills.ai_ml },
          { label: "Mobile",    items: PORTFOLIO.skills.mobile },
          { label: "Tools",     items: PORTFOLIO.skills.tools },
          { label: "Embedded",  items: PORTFOLIO.skills.embedded },
        ],
      };
    case "terminal:projects":
    case "ai:projects":
      return { type: "projects", title: "Projects", items: PORTFOLIO.projects };
    case "terminal:whoami":
      return {
        type: "terminal", title: "whoami",
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
        type: "terminal", title: "help",
        lines: [
          "  Navigation :  home · about · projects · journey · contact",
          "  Actions    :  resume · github · linkedin · copy email · toggle theme",
          "  Terminal   :  whoami · skills · projects · clear",
          "  Ask me     :  just type anything naturally",
          "  Easter eggs:  surprise me · hack the system · jarvis",
        ],
      };
    case "ai:hire":
      return { type: "prose", title: "Why Yuvraj?", text: PORTFOLIO.why_hire };
    case "ai:different":
      return { type: "prose", title: "What Makes Me Different", text: PORTFOLIO.what_makes_different };
    case "ai:journey":
      return { type: "prose", title: "My Journey", text: PORTFOLIO.journey };
    case "ai:contact":
      return {
        type: "contact", title: "Get in Touch",
        items: [
          { label: "Email",    value: PORTFOLIO.email },
          { label: "GitHub",   value: PORTFOLIO.links.github },
          { label: "LinkedIn", value: PORTFOLIO.links.linkedin },
          { label: "Location", value: PORTFOLIO.location },
        ],
      };
    case "easter:jarvis":
      return {
        type: "terminal", title: "jarvis",
        lines: [
          "  JARVIS ONLINE. All systems nominal.",
          "  Scanning Yuvraj's portfolio...",
          "  ✓ Projects      8 deployed",
          "  ✓ Skills        dangerously overloaded",
          "  ✓ Ambition      off the charts",
          "  Shall I begin the usual diagnostics, sir?",
        ],
      };
    case "easter:hack":
      return { type: "hack" };
    case "easter:surprise": {
      const list = [
        { type: "prose", title: "Fun Fact",          text: "I built Jarvis before finishing my second year. Some call it reckless. I call it Tuesday." },
        { type: "prose", title: "Unpopular Opinion", text: "The best code is the code you don't write. I've deleted more than I've shipped — and the projects got better every time." },
        { type: "prose", title: "Secret",            text: "The 'science fiction' in my tagline isn't metaphor. Gesture-controlled 3D, multi-modal AI, real-time pose detection — all sci-fi ten years ago." },
        { type: "prose", title: "Hot Take",          text: "Most portfolios are just resumes with animations. Mine is an argument. Every project exists to prove something that people thought was too hard." },
        { type: "prose", title: "Origin Story",      text: "I got into coding because I was too lazy to do repetitive tasks manually. Turns out automation is just organized laziness — and I'm very organized." },
        { type: "prose", title: "Chess + Code",      text: "I'm a district-level chess gold medalist. Chess taught me to think 10 moves ahead. I apply the same logic to system design — always planning for what breaks next." },
        { type: "prose", title: "The Jarvis Story",  text: "Jarvis started as a voice command script and turned into a full desktop AI. It now manages my WhatsApp, YouTube, and email. My laptop basically runs itself." },
        { type: "prose", title: "Confession",        text: "I've rewritten Jarvis from scratch three times. Not because it broke — because I kept learning better ways to build it. Version 3 is the one I'm proud of." },
        { type: "prose", title: "Weird Flex",        text: "I once built a working bomb-defuse game on an Arduino with no OS, no libraries, just raw C++ and a buzzer. Nobody asked for it. I did it anyway." },
        { type: "prose", title: "Philosophy",        text: "I don't want to work at a company that wants a coder. I want to work somewhere that needs a builder — someone who sees a problem and can't sleep until it's solved." },
      ];
      return list[Math.floor(Math.random() * list.length)];
    }
    default: return null;
  }
}

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

  const dim    = dark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.3)";
  const body   = dark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.67)";
  const bdr    = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const pill   = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const pillTx = dark ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.48)";
  const btn    = dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";

  useEffect(() => {
    if (response?.type !== "hack") return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const id = setInterval(() => setHackChars(Array.from({ length: 80 }, () => chars[Math.floor(Math.random() * chars.length)])), 60);
    setTimeout(() => { clearInterval(id); setHackChars([]); }, 2500);
    return () => { clearInterval(id); setHackChars([]); };
  }, [response]);

  if (!response) return null;

  if (response.type === "loading") {
    return (
      <div style={{ borderTop: `1px solid ${bdr}`, padding: "18px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: btn, display: "inline-block", animation: `cp-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: dim, marginLeft: 6 }}>Thinking...</span>
      </div>
    );
  }

  if (response.type === "hack") {
    return (
      <div style={{ padding: "20px", fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.7, color: "#00ff41", letterSpacing: "0.05em", wordBreak: "break-all", maxHeight: 180, overflow: "hidden", borderTop: `1px solid ${bdr}` }}>
        <div style={{ marginBottom: 8, opacity: 0.5, fontSize: 9, letterSpacing: "0.15em" }}>SYSTEM BREACH DETECTED — INITIATING COUNTERMEASURES</div>
        {hackChars.length > 0 ? hackChars.join("") : "ACCESS DENIED. Nice try. — Yuvraj"}
      </div>
    );
  }

  return (
    <div style={{ borderTop: `1px solid ${bdr}` }}>
      {/* Body */}
      <div style={{ padding: "10px 20px 20px 20px", maxHeight: 240, overflowY: "auto" }}>

        {response.type === "structured" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {response.sections.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dim, width: 68, flexShrink: 0, paddingTop: 1 }}>{s.label}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: pill, color: pillTx, padding: "2px 8px", borderRadius: 3 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {response.type === "projects" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {response.items.map((p, i) => (
              <div key={p.name} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${bdr}` }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dim, flexShrink: 0, width: 20, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.82)", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: body, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {response.type === "prose" && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: body, lineHeight: 1.78, margin: 0, letterSpacing: "0.02em" }}>{response.text}</p>
        )}

        {response.type === "contact" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {response.items.map(item => (
              <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: dim, width: 60, flexShrink: 0 }}>{item.label}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: body }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {response.type === "terminal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {response.lines.map((line, i) => (
              <div key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: body, lineHeight: 1.8, letterSpacing: "0.03em" }}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function CommandPalette({ setDark }) {
  const dark = useDarkMode();
  const [open,         setOpen]         = useState(false);
  const [query,        setQuery]        = useState("");
  const [selected,     setSelected]     = useState(0);
  const [response,     setResponse]     = useState(null);
  const [convoHistory, setConvoHistory] = useState([]);
  const [cmdCount,     setCmdCount]     = useState(0);
  const [mounted,      setMounted]      = useState(false);
  const inputRef   = useRef(null);
  const itemRefs   = useRef([]);
  const debounceRef = useRef(null); // for auto-answer on typing

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
      setMounted(true);
      setQuery(""); setResponse(null); setSelected(0);
    } else {
      setTimeout(() => setMounted(false), 200);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = normalizeQuery(query);
    if (!q) return COMMANDS.slice(0, 12);
    return COMMANDS
      .map(cmd => ({ cmd, score: scoreCommand(cmd, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ cmd }) => cmd);
  }, [query]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(cmd => { if (!g[cmd.category]) g[cmd.category] = []; g[cmd.category].push(cmd); });
    return g;
  }, [filtered]);

  useEffect(() => { itemRefs.current[selected]?.scrollIntoView({ block: "nearest" }); }, [selected]);
  useEffect(() => { setSelected(0); }, [query]);

  // Auto-answer: fire AI after 600ms pause when query looks like a question
  // (no strong command match AND query is 6+ chars)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const norm = normalizeQuery(query);
    if (!norm || norm.length < 6) return;
    const topScore = filtered.length > 0 ? scoreCommand(filtered[0], norm) : 0;
    // Only auto-fire if no strong command match (score < 70) — don't hijack "skills" etc.
    if (topScore >= 70) return;
    debounceRef.current = setTimeout(() => {
      sendToAI(norm);
    }, 650);
    return () => clearTimeout(debounceRef.current);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendToAI = useCallback(async (question) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    // Skip loading state for local responses — they're instant
    if (!apiKey) {
      const answer = localAIResponse(normalizeQuery(question));
      const newH = [...convoHistory, { role: "user", content: question }, { role: "assistant", content: answer }];
      setConvoHistory(newH);
      setResponse({ type: "prose", title: "Answer", text: answer });
      setCmdCount(c => c + 1);
      return;
    }
    // Gemini — show loading
    setResponse({ type: "loading" });
    const newHistory = [...convoHistory, { role: "user", content: question }];
    setConvoHistory(newHistory);
    const answer = await askGemini(newHistory);
    setConvoHistory([...newHistory, { role: "assistant", content: answer }]);
    setResponse({ type: "prose", title: "Yuvraj's AI", text: answer });
    setCmdCount(c => c + 1);
  }, [convoHistory]);

  const executeCommand = useCallback(async (cmd) => {
    const { action } = cmd;
    if (action.startsWith("scroll:")) { document.querySelector(action.replace("scroll:", ""))?.scrollIntoView({ behavior: "smooth" }); return; }
    if (action.startsWith("open:"))   { window.open(action.replace("open:", ""), "_blank"); return; }
    if (action.startsWith("copy:"))   { navigator.clipboard.writeText(action.replace("copy:", "")); setResponse({ type: "terminal", title: "Clipboard", lines: ["  ✓ Email copied to clipboard."] }); return; }
    if (action === "theme")           { if (setDark) setDark(d => !d); else document.documentElement.classList.toggle("dark", !document.documentElement.classList.contains("dark")); return; }
    if (action === "terminal:clear")  { setConvoHistory([]); setResponse(null); setQuery(""); return; }
    const staticRes = getStaticResponse(action);
    if (staticRes) { setResponse(staticRes); setCmdCount(c => c + 1); return; }
    await sendToAI(cmd.label);
  }, [sendToAI, setDark]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { if (response) { setResponse(null); return; } setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter") {
      e.preventDefault();
      const norm = normalizeQuery(query);
      // Clear debounce so manual Enter doesn't double-fire
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // If response is showing and user pressed Enter on a command → execute it and clear response
      if (norm && filtered[selected]) {
        const exact = [filtered[selected].label, ...filtered[selected].aliases]
          .map(v => normalizeQuery(v).toLowerCase())
          .includes(norm.toLowerCase());
        if (exact) { setResponse(null); executeCommand(filtered[selected]); return; }
      }
      if (!norm && filtered[selected]) { setResponse(null); executeCommand(filtered[selected]); return; }
      if (norm) sendToAI(norm);
    }
  };

  if (!open && !mounted) {
    return (
      <div
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 40, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "color 0.2s ease", userSelect: "none" }}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"; }}
      >
        <kbd style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`, borderRadius: 3, padding: "2px 6px", color: "inherit" }}>
          {typeof navigator !== "undefined" && navigator.platform?.includes("Mac") ? "⌘K" : "Ctrl+K"}
        </kbd>
        <span>Command</span>
      </div>
    );
  }

  const bg   = dark ? "#080808"                : "#ffffff";
  const bdr  = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const inp  = dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const ph   = dark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.2)";
  const cat  = dark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.2)";
  const lbl  = dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)";
  const dsc  = dark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.3)";
  const sel  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const ico  = dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const icoS = dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)";
  const kbg  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const ktx  = dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";

  let gi = 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .cp-overlay { position:fixed;inset:0;z-index:9998;background:${dark?"rgba(0,0,0,0.58)":"rgba(0,0,0,0.22)"};backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;animation:cp-bg-in 0.15s ease both; }
        @keyframes cp-bg-in    { from{opacity:0} to{opacity:1} }
        @keyframes cp-dot      { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1.2)} }
        @keyframes cp-panel-in { from{opacity:0;transform:scale(.97) translateY(-8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .cp-panel { width:100%;max-width:600px;background:${bg};border:1px solid ${bdr};border-radius:10px;overflow:hidden;box-shadow:0 24px 80px ${dark?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.16)"},0 4px 16px ${dark?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.07)"};animation:cp-panel-in 0.18s cubic-bezier(0.16,1,0.3,1) both; }
        .cp-input { width:100%;background:transparent;border:none;outline:none;font-family:'DM Mono',monospace;font-size:14px;color:${inp};caret-color:${inp};letter-spacing:0.02em;padding:0; }
        .cp-input::placeholder { color:${ph}; }
        .cp-list { max-height:320px;overflow-y:auto;scrollbar-width:none;padding:6px 0; }
        .cp-list::-webkit-scrollbar { display:none; }
        .cp-cmd { display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;border-left:2px solid transparent;transition:background 0.1s,border-color 0.1s; }
        .cp-cmd.sel { background:${sel};border-left-color:${dark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.13)"}; }
        .cp-cmd:hover { background:${sel}; }
        .cp-cat { padding:6px 16px 3px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${cat}; }
        .cp-cat:not(:first-child) { margin-top:4px; }
        .cp-footer { padding:8px 16px;border-top:1px solid ${bdr};display:flex;align-items:center;gap:14px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:${ktx}; }
        @media(max-width:640px){ .cp-overlay{padding-top:0;align-items:flex-end;} .cp-panel{border-radius:12px 12px 0 0;max-width:100%;} }
      `}</style>

      <div className="cp-overlay">
        <div className="cp-panel" onClick={e => e.stopPropagation()}>

          {/* ── Top bar: always visible — back (when response) + close ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px 0 16px",
            minHeight: 32,
          }}>
            {/* Back button — only visible when response is showing */}
            {response && response.type !== "loading" ? (
              <button
                onClick={() => setResponse(null)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 10, color: dsc, padding: "3px 6px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = inp)}
                onMouseLeave={e => (e.currentTarget.style.color = dsc)}
              >
                ← back
              </button>
            ) : (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: dsc, paddingLeft: 2 }}>
                {response?.title || ""}
              </span>
            )}
            {/* Close button — always */}
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: dsc, padding: "0 4px", lineHeight: 1, borderRadius: 4, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = inp)}
              onMouseLeave={e => (e.currentTarget.style.color = dsc)}
            >×</button>
          </div>

          {/* Input */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: filtered.length > 0 || response ? `1px solid ${bdr}` : "none" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: ph, flexShrink: 0, lineHeight: 1 }}>›</span>
            <input ref={inputRef} className="cp-input" value={query}
              onChange={e => { setQuery(e.target.value); if (!e.target.value) setResponse(null); }}
              onKeyDown={handleKeyDown}
              placeholder="Search commands or ask anything..."
              autoComplete="off" spellCheck="false"
            />
            {query && (
              <button onClick={() => { setQuery(""); setResponse(null); inputRef.current?.focus(); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: ph, fontSize: 14, padding: 0, lineHeight: 1, flexShrink: 0 }}>×</button>
            )}
          </div>

          {/* Command list — always visible, even when response is showing */}
          {filtered.length > 0 && (
            <div className="cp-list">
              {Object.entries(grouped).map(([c, cmds]) => (
                <div key={c}>
                  <div className="cp-cat">{CATEGORY_META[c]?.label || c}</div>
                  {cmds.map(cmd => {
                    const idx = gi++;
                    const isSel = idx === selected;
                    return (
                      <div key={cmd.id} ref={el => (itemRefs.current[idx] = el)}
                        className={`cp-cmd${isSel ? " sel" : ""}`}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelected(idx)}
                      >
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: isSel ? icoS : ico, width: 16, textAlign: "center", flexShrink: 0, lineHeight: 1 }}>{cmd.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5, color: isSel ? (dark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.92)") : lbl, letterSpacing: "0.02em" }}>
                            {highlightMatch(cmd.label, query)}
                          </span>
                          {cmd.desc && (
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: dsc, marginLeft: 10, letterSpacing: "0.02em" }}>{cmd.desc}</span>
                          )}
                        </div>
                        {query && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: cat, textTransform: "uppercase", flexShrink: 0 }}>{CATEGORY_META[cmd.category]?.label}</span>}
                        {isSel && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: ktx, flexShrink: 0, marginLeft: 4 }}>↵</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* No match hint */}
          {query.trim() && filtered.length === 0 && (
            <div style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: dsc, letterSpacing: "0.03em" }}>
              Press <kbd style={{ background: kbg, border: `1px solid ${bdr}`, borderRadius: 2, padding: "1px 5px", fontSize: 9 }}>↵</kbd> to ask as a question
            </div>
          )}

          {/* Response */}
          <ResponsePanel response={response} dark={dark} />

          {/* Footer */}
          <div className="cp-footer">
            <span><kbd style={{ background: kbg, border: `1px solid ${bdr}`, borderRadius: 3, padding: "1px 5px", fontFamily: "'DM Mono', monospace", fontSize: 9, color: ktx, marginRight: 4 }}>↑↓</kbd>Navigate</span>
            <span><kbd style={{ background: kbg, border: `1px solid ${bdr}`, borderRadius: 3, padding: "1px 5px", fontFamily: "'DM Mono', monospace", fontSize: 9, color: ktx, marginRight: 4 }}>↵</kbd>Select</span>
            <span><kbd style={{ background: kbg, border: `1px solid ${bdr}`, borderRadius: 3, padding: "1px 5px", fontFamily: "'DM Mono', monospace", fontSize: 9, color: ktx, marginRight: 4 }}>Esc</kbd>Close</span>
            <span style={{ marginLeft: "auto" }}>
              {convoHistory.length > 0
                ? `${Math.floor(convoHistory.length / 2)} exchange${convoHistory.length > 2 ? "s" : ""} · context active`
                : cmdCount > 0 ? `${cmdCount} run` : import.meta.env.VITE_GEMINI_API_KEY ? "Powered by Gemini" : "AI ready · add key to enable"}
            </span>
          </div>

        </div>
      </div>
    </>
  );
}