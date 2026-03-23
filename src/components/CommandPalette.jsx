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
  { id: "nav-home",     category: "navigate", icon: "⌂", label: "Go to Home",     desc: "Scroll to the top",            aliases: ["home","top","start","hero"],               action: "scroll:#hero" },
  { id: "nav-about",    category: "navigate", icon: "◉", label: "Go to About",    desc: "Jump to the about section",    aliases: ["about","bio","who"],                       action: "scroll:#about" },
  { id: "nav-projects", category: "navigate", icon: "◈", label: "Go to Projects", desc: "Browse all projects",          aliases: ["projects","work","portfolio","code"],      action: "scroll:#projects" },
  { id: "nav-journey",  category: "navigate", icon: "◎", label: "Go to Journey",  desc: "Timeline & experience",        aliases: ["journey","timeline","experience"],         action: "scroll:#journey" },
  { id: "nav-contact",  category: "navigate", icon: "◌", label: "Go to Contact",  desc: "Get in touch",                 aliases: ["contact","reach","message","hire"],        action: "scroll:#contact" },
  { id: "act-resume",   category: "action",   icon: "↓", label: "Download Resume", desc: "Open resume PDF",             aliases: ["resume","cv","download","pdf"],            action: "open:/resume.pdf" },
  { id: "act-github",   category: "action",   icon: "◆", label: "Open GitHub",    desc: "View source code and repos",   aliases: ["github","git","repos","source"],           action: `open:${PORTFOLIO.links.github}` },
  { id: "act-linkedin", category: "action",   icon: "◇", label: "Open LinkedIn",  desc: "Connect professionally",       aliases: ["linkedin","connect","network"],            action: `open:${PORTFOLIO.links.linkedin}` },
  { id: "act-leetcode", category: "action",   icon: "◑", label: "Open LeetCode",  desc: "View competitive programming", aliases: ["leetcode","dsa","competitive"],            action: `open:${PORTFOLIO.links.leetcode}` },
  { id: "act-email",    category: "action",   icon: "✉", label: "Copy Email",     desc: "Copy email to clipboard",      aliases: ["email","copy email","mail","clipboard"],   action: "copy:yuvraj.malik003@gmail.com" },
  { id: "act-theme",    category: "action",   icon: "◐", label: "Toggle Theme",   desc: "Switch dark / light mode",     aliases: ["theme","dark mode","light mode","toggle"], action: "theme" },
  { id: "term-help",     category: "terminal", icon: ">", label: "help",    desc: "List all available commands", aliases: ["help","commands","what can you do"],                        action: "terminal:help" },
  { id: "term-whoami",   category: "terminal", icon: ">", label: "whoami",  desc: "Who is Yuvraj Malik",         aliases: ["whoami","who are you","who is yuvraj","introduce yourself"], action: "terminal:whoami" },
  { id: "term-skills",   category: "terminal", icon: ">", label: "skills",  desc: "List technical skills",       aliases: ["skills","tech stack","technologies"],                       action: "terminal:skills" },
  { id: "term-projects", category: "terminal", icon: ">", label: "projects",desc: "List all projects",           aliases: ["list projects","all projects","project list"],              action: "terminal:projects" },
  { id: "term-clear",    category: "terminal", icon: ">", label: "clear",   desc: "Clear the palette history",   aliases: ["clear","reset","cls"],                                      action: "terminal:clear" },
  { id: "ai-hire",      category: "ai", icon: "✦", label: "Why should we hire you?",     desc: "The honest pitch",        aliases: ["why hire","why you","pitch","convince me"],           action: "ai:hire" },
  { id: "ai-different", category: "ai", icon: "✦", label: "What makes you different?",   desc: "What sets you apart",     aliases: ["what makes you different","what sets you apart"],    action: "ai:different" },
  { id: "ai-journey",   category: "ai", icon: "✦", label: "Tell me your journey",        desc: "Background and story",    aliases: ["tell me your journey","your story","background"],    action: "ai:journey" },
  { id: "ai-contact",   category: "ai", icon: "✦", label: "How can I contact you?",      desc: "Get in touch details",    aliases: ["contact info","how to contact","how to reach"],      action: "ai:contact" },
  { id: "egg-surprise", category: "easter", icon: "★", label: "surprise me",     desc: "???", aliases: ["surprise","random","fun","lucky"],                   action: "easter:surprise" },
  { id: "egg-hack",     category: "easter", icon: "★", label: "hack the system", desc: "...", aliases: ["hack","hacker","matrix","glitch","sudo"],            action: "easter:hack" },
  { id: "egg-jarvis",   category: "easter", icon: "★", label: "jarvis",          desc: "...", aliases: ["jarvis","hey jarvis","iron man","tony stark"],       action: "easter:jarvis" },
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
// HOW TO ENABLE: create .env in project root → VITE_GEMINI_API_KEY=your_key
// Free key at: aistudio.google.com
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

RULES:
- Speak as Yuvraj in first person. Never say "Yuvraj" — say "I".
- For "who is this", "who are you", "introduce yourself" → give a confident intro: name, role, what you build, education.
- For personal questions (girlfriend, age, salary, hobbies) → answer with wit and personality. Don't deflect.
- For rude/offensive input → respond with calm confidence, not aggression. A single dry line is fine.
- Only use data above. Never invent facts.
- If something isn't in the data, say "I don't have that info — reach me at ${PORTFOLIO.email}"`;

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL AI — custom answers for every predictable question
// Returns null if nothing matches → Gemini handles it
// ─────────────────────────────────────────────────────────────────────────────
function localAIResponse(q) {
  const t = q.toLowerCase().trim();

  // ── RUDE / OFFENSIVE ─────────────────────────────────────────────────────
  const rudeWords = ["fuck","shit","bitch","cunt","bastard","idiot","stupid","dumb","loser","moron","chutiya","bc","mc","bkl","lodu","gandu","bakwas","bekar","faltu","worthless","useless","trash","garbage","pathetic"];
  if (rudeWords.some(w => t.includes(w)))
    return `Bold of you to open a portfolio and start here. Anyway — I've built gesture-controlled 3D environments and AI systems from scratch. Stick around, it gets interesting.`;

  // ── GREETINGS ─────────────────────────────────────────────────────────────
  if (/^(hi+|hello+|hey+|yo|sup|hiya|heya|howdy|greetings|wassup|what.?s up|namaste|hola|bonjour|salut|ciao|oi|aight|aayo)$/.test(t))
    return `Hey! I'm ${PORTFOLIO.name} — ${PORTFOLIO.role}. ${PORTFOLIO.tagline} Ask me anything.`;

  // ── IDENTITY ──────────────────────────────────────────────────────────────
  if (t.match(/who (is|are|r) (this|he|yuvraj|this dude|this guy|this person|u|you)|who made this|whose portfolio|introduce yourself|tell me about yourself|about yourself|who are you/))
    return `I'm ${PORTFOLIO.name} — ${PORTFOLIO.role} based in ${PORTFOLIO.location}. ${PORTFOLIO.tagline} Currently studying Computer Engineering at Thapar Institute (2024–2028) while shipping real systems: gesture-controlled 3D, multi-LLM AI assistants, and full-stack platforms.`;

  // ── RELATIONSHIP / GF ─────────────────────────────────────────────────────
  if (t.match(/girlfriend|\bgf\b|\bbf\b|boyfriend|relationship|dating|\bsingle\b|married|wife|husband|partner|crush|love life|love interest|does he like|is he taken|available|\bbae\b|\bboo\b|pyaar|ladki/))
    return `Currently in a committed relationship — with my code editor. She never crashes (unlike my last React app). My GitHub streak is the only streak I'm maintaining right now.`;

  // ── AGE / DOB ─────────────────────────────────────────────────────────────
  if (t.match(/how old|\bage\b|\bborn\b|birthday|\bdob\b|birth date|year of birth|kitne saal|umar/))
    return `Second-year Computer Engineering student at Thapar Institute, batch 2024–2028. Judge me by what I've shipped, not how old I am.`;

  // ── LOOKS / APPEARANCE ───────────────────────────────────────────────────
  if (t.match(/handsome|good.?looking|cute|\bugly\b|\blooks\b|appearance|\bhot\b|attractive|pretty|\bface\b|\bheight\b|\btall\b|\bshort\b|weight|\bfat\b|\bthin\b|\bbody\b|sundar|kaisa dikhta/))
    return `I'll let the code speak for itself. Though "dangerously overloaded" has been used to describe my skill set — make of that what you will.`;

  // ── PERSONALITY / VIBE ───────────────────────────────────────────────────
  if (t.match(/personality|\bvibe\b|\benergy\b|\baura\b|introvert|extrovert|\bshy\b|confident|arrogant|humble|attitude|\bego\b|\bchill\b|boring|\bnerd\b|\bgeek\b|kaisa insaan|swabhav/))
    return `Introvert who ships loud. I'd rather build something impressive than talk about building it. Chess player, systems thinker, occasional debugger at 2am.`;

  // ── FRIENDS / SOCIAL LIFE ────────────────────────────────────────────────
  if (t.match(/\bfriends\b|social life|social media|instagram|twitter|snapchat|popular|\bcool\b|\bdost\b|\byaar\b|hang out|\bparty\b|going out|akela|lonely/))
    return `I exist. I have friends. Most conversations eventually turn into "have you seen this project I'm building?" They tolerate me.`;

  // ── MONEY / SALARY ───────────────────────────────────────────────────────
  if (t.match(/salary|\bpay\b|\bmoney\b|package|\bctc\b|compensation|stipend|\bearn\b|\brich\b|\bpoor\b|\bbroke\b|paise|rupee|lakh|crore|how much (do|does|will|would)/))
    return `Open to conversations — but the right problem matters more than the number. If the work is interesting enough, we'll figure out the rest.`;

  // ── HOBBIES / FREE TIME ──────────────────────────────────────────────────
  if (t.match(/hobby|hobbies|free time|outside.?work|passion|\binterest\b|pastime|weekend|spare time|kya karta|timepass|fun karta/))
    return `Chess — district-level gold medalist. And building things that don't need to exist yet. The line between hobby and work disappeared a while ago.`;

  // ── FOOD ─────────────────────────────────────────────────────────────────
  if (t.match(/\bfood\b|\beat\b|\bdish\b|cuisine|khana|favourite food|kya khata|cook|cooking|kitchen|chef|\bbake\b|maggi|chai|\bcoffee\b/))
    return `Diet entirely fueled by unresolved bugs and chai. I've automated the question of what to eat — that counts as cooking, right?`;

  // ── MOVIES / SHOWS ───────────────────────────────────────────────────────
  if (t.match(/movie|film|show|series|\bwatch\b|netflix|favourite show|tv|web series|dekhta/))
    return `Interstellar, The Social Network, Mr. Robot. Anything with a well-designed system. I watch things that make me want to build.`;

  // ── MUSIC ────────────────────────────────────────────────────────────────
  if (t.match(/music|\bsong\b|playlist|\blisten\b|singer|band|artist|favourite song|kya sunta/))
    return `Lofi when coding. Something loud when debugging. Silence when actually thinking.`;

  // ── ANIME ────────────────────────────────────────────────────────────────
  if (t.match(/\banime\b|manga|weeb|otaku|favourite anime|which anime/))
    return `Let's not go there or we'll be here all day. But yes.`;

  // ── GAMING ───────────────────────────────────────────────────────────────
  if (t.match(/\bgame\b|gaming|\bplay\b|gamer|favourite game|khelna|video game/))
    return `Chess, mostly. And occasionally I build the games instead of playing them — see: Anime Clash, Bomb Difuse.`;

  // ── FAVOURITE LANGUAGE/TECH ──────────────────────────────────────────────
  if (t.match(/fav(ou?rite)? (language|tech|framework|tool|stack)|best language|prefer (to )?(code|use|work)/))
    return `Python for AI. JavaScript when it has to look good. C++ when there's no OS and everything is on fire. Depends what needs solving.`;

  // ── JOKES / HUMOUR ───────────────────────────────────────────────────────
  if (t.match(/\bjoke\b|\bfunny\b|\blaugh\b|humou?r|comedy|make me laugh|entertain|\broast\b|haha|\blol\b|lmao|ek joke|mazak/))
    return `Why do programmers prefer dark mode? Because light attracts bugs. That's the only one I know. I express humor through variable names.`;

  // ── ROAST ────────────────────────────────────────────────────────────────
  if (t.match(/roast (me|him|yuvraj|yourself)|criticize|weakness|bad at|not good at|failure|\bflaws\b|kya nahi aata/))
    return `Fine. I sometimes over-engineer things that could be simple. I've rewritten Jarvis three times. I debug by adding more logs than a forest. But the output? Worth it.`;

  // ── COMPLIMENTS ──────────────────────────────────────────────────────────
  if (t.match(/impressive|\bwow\b|amazing|\bgreat\b|awesome|\bcool\b|nice work|good job|well done|love (it|this|the)|\brespect\b|\bdope\b|\bfire\b|\blit\b|bahut accha|wah|ekdum/))
    return `Appreciate it. Now hire me. 😄`;

  // ── TESTING THE BOT ──────────────────────────────────────────────────────
  if (t.match(/\btest\b|testing|\bcheck\b|hello world|\bping\b|are you (there|working|alive|on)|can you hear|kya tu sun|sun raha/))
    return `Online. All systems nominal. Ask me anything.`;

  // ── AI / THIS CHATBOT ─────────────────────────────────────────────────────
  if (t.match(/are you (an? )?ai|are you (a )?bot|are you real|are you human|who built you|how do you work|what are you|are you chatgpt|are you gemini|tu bot hai|real hai/))
    return `I'm an AI assistant built into Yuvraj's portfolio — powered by Gemini and his portfolio data. I answer as him. For anything I miss, he's at ${PORTFOLIO.email}`;

  // ── COMPARISON ───────────────────────────────────────────────────────────
  if (t.match(/pratham|compare|better than|\bvs\b|versus|competition|other developer|kisise better/))
    return `I'll let the work speak. Eight shipped projects, cross-stack depth from AI pipelines to hardware, and a portfolio that doubles as a command center. Make your own call.`;

  // ── EXISTENTIAL / RANDOM ─────────────────────────────────────────────────
  if (t.match(/meaning of life|\b42\b|universe|\bgod\b|exist|consciousness|philosophy|\bdeep\b|zindagi ka matlab|sab moh maya/))
    return `42. Also: ship things, think in systems, sleep occasionally. That's roughly my philosophy.`;

  // ── AVAILABILITY / HIRING ────────────────────────────────────────────────
  if (t.match(/available|open to work|looking for (job|work|opportunity|role)|hire|internship|full.?time|freelance|remote|kaam chahiye/))
    return `Yes — open to interesting opportunities. Full-time, internship, or freelance. The work has to be meaningful. Reach me at ${PORTFOLIO.email}`;

  // ── FUTURE GOALS ─────────────────────────────────────────────────────────
  if (t.match(/goal|future|plan|dream|ambition|where do you see|5 years|aspiration|what do you want|aage kya/))
    return `Build systems that feel like science fiction — and eventually, build the company around one of them. For now: ship things that matter, learn obsessively, stay ahead.`;

  // ── COLLEGE / EDUCATION ──────────────────────────────────────────────────
  if (t.match(/college|university|thapar|\btiet\b|education|degree|\bcgpa\b|\bgpa\b|marks|percentage|10th|12th|school|padhai|parhna/))
    return `Studying ${PORTFOLIO.education}. CGPA? Good enough to not worry about — I'm more focused on what I'm shipping.`;

  // ── SKILLS ───────────────────────────────────────────────────────────────
  if (t.match(/skill|\bstack\b|technolog|what do you know|what can you do|capabilities|languages|tools|framework/))
    return `My stack: ${PORTFOLIO.skills.languages.join(", ")} · ${PORTFOLIO.skills.frontend.join(", ")} · ${PORTFOLIO.skills.backend.join(", ")} · ${PORTFOLIO.skills.ai_ml.join(", ")}. Also Flutter for mobile and Arduino for embedded.`;

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  if (t.match(/project|\bbuilt\b|what have you (made|built|created|done)|show me your work|your work|portfolio pieces/))
    return `${PORTFOLIO.projects.length} projects shipped: ${PORTFOLIO.projects.map(p => p.name).join(", ")}. Gesture-controlled 3D to multi-LLM AI systems.`;

  // ── SPECIFIC PROJECTS ────────────────────────────────────────────────────
  if (t.includes("jarvis"))
    return `Jarvis — multi-LLM voice assistant controlling my desktop: WhatsApp, YouTube, email. Multi-provider fallback for 99%+ uptime. Built in Python.`;
  if (t.match(/spatial|\b3d\b|gesture|hand tracking/))
    return `Spatial Console — browser-based 3D builder controlled by hand gestures. No mouse, no keyboard. Just MediaPipe + React Three Fiber in your browser.`;
  if (t.match(/stark|paper|analyzer|\bpdf\b|research/))
    return `Stark Paper Analyzer — upload a research PDF, get structured intelligence. FastAPI + Gemini 2.5 + React. Turns dense papers into something readable.`;
  if (t.match(/code vault|coding arena|competition/))
    return `Code Vault — live team-based coding arena. Hosted a 30-team campus competition with zero downtime. React 19, Node.js, MongoDB.`;
  if (t.match(/air canvas|drawing|touchless/))
    return `Air Canvas — draw on a 5000×5000 canvas using just your hand. No touch needed. OpenCV + MediaPipe.`;
  if (t.match(/pose|exercise|fitness|workout/))
    return `AI Pose Detection — real-time exercise form scoring with ~90% accuracy. TensorFlow Lite + MoveNet.`;
  if (t.match(/anime clash|anime game/))
    return `Anime Clash — deterministic daily anime popularity game. Think Wordle but for anime debates. Multiple game modes.`;
  if (t.match(/\bbomb\b|arduino|hardware/))
    return `Bomb Difuse — physical reaction game on bare-metal Arduino. No OS, no libraries, raw C++ and a buzzer. Nobody asked. Built it anyway.`;

  // ── WHY HIRE ─────────────────────────────────────────────────────────────
  if (t.match(/why hire|hire you|why you|why should (i|we)|pitch yourself|sell yourself|convince me|make your case|kyun rakhe/))
    return PORTFOLIO.why_hire;

  // ── WHAT MAKES YOU DIFFERENT ─────────────────────────────────────────────
  if (t.match(/different|unique|stand out|special|what sets you apart|why you over others|better than others|alag kya/))
    return PORTFOLIO.what_makes_different;

  // ── JOURNEY / BACKGROUND ─────────────────────────────────────────────────
  if (t.match(/journey|\bstory\b|background|how (did you start|you started|you got into|you began)|your path|shuru kaise|kaise start/))
    return PORTFOLIO.journey;

  // ── EXPERIENCE / INTERNSHIP ──────────────────────────────────────────────
  if (t.match(/experience|internship|\bintern\b|work history|previous work|worked at|\bjob\b|kaam kiya/))
    return `${PORTFOLIO.experience.map(e => `${e.role} at ${e.org} (${e.year})`).join(" · ")}.`;

  // ── ACHIEVEMENTS ─────────────────────────────────────────────────────────
  if (t.match(/achievement|accomplish|\baward\b|\bwin\b|\bwon\b|\bmedal\b|chess|proud of|highlight|kya jeeta/))
    return `Highlights: ${PORTFOLIO.achievements.join(". ")}.`;

  // ── CONTACT ──────────────────────────────────────────────────────────────
  if (t.match(/contact|\breach\b|get in touch|how to (reach|contact|find)|connect with|(^|\s)email($|\s)/))
    return `Email: ${PORTFOLIO.email} · GitHub: ${PORTFOLIO.links.github} · LinkedIn: ${PORTFOLIO.links.linkedin}`;

  // ── LOCATION ─────────────────────────────────────────────────────────────
  if (t.match(/where (are you|do you live|from|based)|\blocation\b|\bcity\b|india|patiala|punjab|kahan rehta/))
    return `Based in ${PORTFOLIO.location}.`;

  // No local match → Gemini handles it
  return null;
}


async function askGemini(messages) {
  const lastQuestion = messages[messages.length - 1]?.content || "";
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
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
// STATIC RESPONSES
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
        { type: "prose", title: "Hot Take",          text: "Most portfolios are just resumes with animations. Mine is an argument. Every project exists to prove something people thought was too hard." },
        { type: "prose", title: "Origin Story",      text: "I got into coding because I was too lazy to do repetitive tasks manually. Turns out automation is just organized laziness — and I'm very organized." },
        { type: "prose", title: "Chess + Code",      text: "District-level chess gold medalist. Chess taught me to think 10 moves ahead. I apply the same logic to system design — always planning for what breaks next." },
        { type: "prose", title: "The Jarvis Story",  text: "Jarvis started as a voice command script and became a full desktop AI. It now manages WhatsApp, YouTube, and email. My laptop basically runs itself." },
        { type: "prose", title: "Confession",        text: "I've rewritten Jarvis from scratch three times. Not because it broke — because I kept learning better ways to build it. Version 3 is the one I'm proud of." },
        { type: "prose", title: "Weird Flex",        text: "I built a working bomb-defuse game on Arduino — no OS, no libraries, just raw C++ and a buzzer. Nobody asked for it. I did it anyway." },
        { type: "prose", title: "Philosophy",        text: "I don't want to work at a company that wants a coder. I want somewhere that needs a builder — someone who sees a problem and can't sleep until it's solved." },
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

  const dim    = dark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.86)";
  const body   = dark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,1)";
  const bdr    = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const pill   = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const pillTx = dark ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.95)";
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
  const [fabBurst,     setFabBurst]     = useState(false);
  const [usedArrowNav, setUsedArrowNav] = useState(false);
  const inputRef    = useRef(null);
  const itemRefs    = useRef([]);
  const fabBurstRef = useRef(null);

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
      setUsedArrowNav(false);
    } else {
      setTimeout(() => setMounted(false), 200);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (fabBurstRef.current) clearTimeout(fabBurstRef.current);
    };
  }, []);

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

  // ── FIX: Arrow keys always work — even when response is showing ──────────
  // We track "listLength" separately so ArrowDown/Up always have a valid range
  const listLength = filtered.length;

  useEffect(() => { itemRefs.current[selected]?.scrollIntoView({ block: "nearest" }); }, [selected]);
  useEffect(() => { setSelected(0); setUsedArrowNav(false); }, [query]);

  const sendToAI = useCallback(async (question) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Try local custom responses first — they're instant and zero cost
    const localAnswer = localAIResponse(normalizeQuery(question));

    if (!apiKey) {
      // No Gemini key — use local answer or show a decent fallback
      const answer = localAnswer ?? `Hmm, I don't have a specific answer for that. Try: who are you · skills · projects · why hire · journey. Or reach me at ${PORTFOLIO.email}`;
      const newH = [...convoHistory, { role: "user", content: question }, { role: "assistant", content: answer }];
      setConvoHistory(newH);
      setResponse({ type: "prose", title: "Answer", text: answer });
      setCmdCount(c => c + 1);
      return;
    }

    // If local answered it — use that, no API call needed
    if (localAnswer) {
      const newH = [...convoHistory, { role: "user", content: question }, { role: "assistant", content: localAnswer }];
      setConvoHistory(newH);
      setResponse({ type: "prose", title: "Answer", text: localAnswer });
      setCmdCount(c => c + 1);
      return;
    }

    // Local didn't match — send to Gemini
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
    // Navigation → close palette after scrolling
    if (action.startsWith("scroll:")) {
      document.querySelector(action.replace("scroll:", ""))?.scrollIntoView({ behavior: "smooth" });
      setOpen(false); return;
    }
    // External links → open in new tab, keep palette open
    if (action.startsWith("open:"))   { window.open(action.replace("open:", ""), "_blank"); return; }
    if (action.startsWith("copy:"))   { navigator.clipboard.writeText(action.replace("copy:", "")); setResponse({ type: "terminal", title: "Clipboard", lines: ["  ✓ Email copied to clipboard."] }); return; }
    if (action === "theme")           { if (setDark) setDark(d => !d); else document.documentElement.classList.toggle("dark", !document.documentElement.classList.contains("dark")); return; }
    if (action === "terminal:clear")  { setConvoHistory([]); setResponse(null); setQuery(""); return; }

    // Allow help to toggle closed when clicked again.
    if (action === "terminal:help" && response?.type === "terminal" && response?.title === "help") {
      setResponse(null);
      return;
    }

    const staticRes = getStaticResponse(action);
    if (staticRes) { setResponse(staticRes); setCmdCount(c => c + 1); return; }
    await sendToAI(cmd.label);
  }, [response, sendToAI, setDark]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (response) { setResponse(null); return; }
      setOpen(false); return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setUsedArrowNav(true); setSelected(s => Math.min(s + 1, listLength - 1)); return; }
    if (e.key === "ArrowUp")   { e.preventDefault(); setUsedArrowNav(true); setSelected(s => Math.max(s - 1, 0)); return; }
    if (e.key === "Enter") {
      e.preventDefault();
      const norm = normalizeQuery(query);
      if (norm && filtered[selected]) {
        const selectedCmd = filtered[selected];
        const matchScore = scoreCommand(selectedCmd, norm);
        const exact = [selectedCmd.label, ...selectedCmd.aliases]
          .map(v => normalizeQuery(v).toLowerCase())
          .includes(norm.toLowerCase());

        // Treat strong command matches as commands to avoid accidental AI API calls.
        if (usedArrowNav || exact || selectedCmd.category === "navigate" || matchScore >= 70) {
          setResponse(null);
          executeCommand(selectedCmd);
          setUsedArrowNav(false);
          return;
        }
      }
      if (!norm && filtered[selected]) { setResponse(null); executeCommand(filtered[selected]); setUsedArrowNav(false); return; }
      if (norm) sendToAI(norm);
    }
  };

  const handleFabClick = () => {
    setFabBurst(true);
    if (fabBurstRef.current) clearTimeout(fabBurstRef.current);
    fabBurstRef.current = setTimeout(() => setFabBurst(false), 320);
    setOpen(o => !o);
  };

  const bg   = dark ? "#080808"                : "#ffffff";
  const bdr  = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.32)";
  const inp  = dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const ph   = dark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.72)";
  const cat  = dark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.82)";
  const lbl  = dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.9)";
  const dsc  = dark ? "rgba(255,255,255,0.3)"  : "rgba(0,0,0,0.9)";
  const sel  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const ico  = dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.88)";
  const icoS = dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)";
  const kbg  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const ktx  = dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.88)";

  let gi = 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .cp-overlay { position:fixed;inset:0;z-index:9998;background:${dark?"rgba(0,0,0,0.58)":"rgba(0,0,0,0.22)"};backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;animation:cp-bg-in 0.15s ease both; }
        @keyframes cp-bg-in    { from{opacity:0} to{opacity:1} }
        @keyframes cp-dot      { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1.2)} }
        @keyframes cp-panel-in { from{opacity:0;transform:scale(.97) translateY(-8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes cp-fab-breathe { 0%,100%{ box-shadow: 0 12px 34px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 24px rgba(79,70,229,0.35), 0 0 42px rgba(59,130,246,0.2); } 50%{ box-shadow: 0 16px 42px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 38px rgba(79,70,229,0.45), 0 0 62px rgba(59,130,246,0.28); } }
        @keyframes cp-fab-pulse { 0%{ transform: translate(-50%, -50%) scale(0.9); opacity: 0.35; } 70%{ transform: translate(-50%, -50%) scale(1.22); opacity: 0; } 100%{ transform: translate(-50%, -50%) scale(1.22); opacity: 0; } }
        @keyframes cp-fab-click { 0%{ transform: scale(1); } 45%{ transform: scale(0.93); } 100%{ transform: scale(1); } }
        @keyframes cp-cursor-blink { 0%,44%{ opacity: 1; } 45%,100%{ opacity: 0.2; } }
        .cp-panel { width:100%;max-width:600px;background:${bg};border:1px solid ${bdr};border-radius:10px;overflow:hidden;box-shadow:0 24px 80px ${dark?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.16)"},0 4px 16px ${dark?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.07)"};animation:cp-panel-in 0.18s cubic-bezier(0.16,1,0.3,1) both; }
        .cp-input { width:100%;background:transparent;border:none;outline:none;font-family:'DM Mono',monospace;font-size:14px;color:${inp};caret-color:${inp};letter-spacing:0.02em;padding:0; }
        .cp-input::placeholder { color:${ph}; }
        .cp-list { max-height:260px;overflow-y:auto;scrollbar-width:none;padding:6px 0; }
        .cp-list::-webkit-scrollbar { display:none; }
        .cp-cmd { display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;border-left:2px solid transparent;transition:background 0.1s,border-color 0.1s; }
        .cp-cmd.sel { background:${sel};border-left-color:${dark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.13)"}; }
        .cp-cmd:hover { background:${sel}; }
        .cp-cat { padding:6px 16px 3px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${cat}; }
        .cp-cat:not(:first-child) { margin-top:4px; }
        .cp-footer { padding:8px 16px;border-top:1px solid ${bdr};display:flex;align-items:center;gap:14px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:${ktx}; }
        .cp-fab-wrap { position: fixed; right: 24px; bottom: 24px; z-index: 10020; display: flex; align-items: center; justify-content: center; }
        .cp-fab-pulse { position: absolute; width: 78px; height: 78px; border-radius: 50%; background: radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(99,102,241,0.2) 40%, rgba(139,92,246,0) 72%); animation: cp-fab-pulse 3.6s ease-out infinite; pointer-events: none; left: 50%; top: 50%; }
        .cp-fab { position: relative; width: 56px; height: 56px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.28); background: ${dark ? "linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))" : "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(148,163,184,0.24))"}; color: ${dark ? "#ffffff" : "#050505"}; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transform: translateY(0) scale(1) rotate(0deg); transition: transform 240ms cubic-bezier(0.22,1,0.36,1), border-color 240ms ease, box-shadow 240ms ease, background 240ms ease; box-shadow: 0 12px 34px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 24px rgba(79,70,229,0.35), 0 0 42px rgba(59,130,246,0.2); animation: cp-fab-breathe 4.5s ease-in-out infinite; overflow: hidden; }
        .cp-fab::before { content: ""; position: absolute; inset: -2px; border-radius: inherit; background: conic-gradient(from 210deg, rgba(56,189,248,0.0), rgba(56,189,248,0.55), rgba(99,102,241,0.55), rgba(168,85,247,0.55), rgba(56,189,248,0.0)); filter: blur(8px); opacity: 0.32; transition: opacity 240ms ease; z-index: 0; }
        .cp-fab::after { content: ""; position: absolute; inset: 1px; border-radius: inherit; background: linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.02) 36%); opacity: 0.65; pointer-events: none; z-index: 1; }
        .cp-fab:hover, .cp-fab:focus-visible { transform: translateY(-2px) scale(1.08) rotate(-2deg); border-color: rgba(255,255,255,0.48); box-shadow: 0 18px 42px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 36px rgba(59,130,246,0.4), 0 0 66px rgba(139,92,246,0.34); }
        .cp-fab:hover::before, .cp-fab:focus-visible::before { opacity: 0.7; }
        .cp-fab:focus-visible { outline: none; }
        .cp-fab-open { border-color: rgba(147,197,253,0.62); box-shadow: 0 18px 42px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 40px rgba(59,130,246,0.44), 0 0 70px rgba(139,92,246,0.38); }
        .cp-fab-burst { animation: cp-fab-click 320ms cubic-bezier(0.2,1,0.3,1), cp-fab-breathe 4.5s ease-in-out infinite; }
        .cp-fab-symbol { position: relative; z-index: 2; font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; letter-spacing: 0.02em; text-shadow: 0 0 12px rgba(186,230,253,0.45); transform: translateY(0.5px); }
        .cp-cursor { display: inline-block; animation: cp-cursor-blink 1.1s steps(1, end) infinite; margin-left: 1px; }
        .cp-fab-tip { position: absolute; left: 44%; bottom: calc(100% + 12px); transform: translate(-50%, 2px); opacity: 0; pointer-events: none; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(226,232,240,0.95); background: rgba(9,12,24,0.72); border: 1px solid rgba(148,163,184,0.35); border-radius: 6px; padding: 6px 9px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); white-space: nowrap; transition: opacity 220ms ease, transform 220ms ease; box-shadow: 0 8px 24px rgba(0,0,0,0.32), 0 0 24px rgba(59,130,246,0.15); }
        .cp-fab-tip kbd { font-family: 'DM Mono', monospace; font-size: 9px; border: 1px solid rgba(148,163,184,0.5); border-bottom-color: rgba(148,163,184,0.72); border-radius: 4px; padding: 1px 4px; background: rgba(15,23,42,0.55); color: rgba(226,232,240,0.95); margin: 0 2px; }
        .cp-fab-wrap:hover .cp-fab-tip, .cp-fab-wrap:focus-within .cp-fab-tip { opacity: 1; transform: translate(-50%, -3px); }
        @media(max-width:640px){ .cp-overlay{padding-top:0;align-items:flex-end;} .cp-panel{border-radius:12px 12px 0 0;max-width:100%;} }
      `}</style>

      {/* ── Floating terminal button — ALWAYS visible ── */}
      <div className="cp-fab-wrap">
        <div className="cp-fab-pulse" aria-hidden="true" />
        <button
          onClick={handleFabClick}
          className={`cp-fab${fabBurst ? " cp-fab-burst" : ""}${open ? " cp-fab-open" : ""}`}
          aria-label="Open command palette"
        >
          <span className="cp-fab-symbol" aria-hidden="true">&gt;<span className="cp-cursor">_</span></span>
        </button>
        <div className="cp-fab-tip">Press <kbd>Ctrl</kbd> + <kbd>K</kbd></div>
      </div>

      {/* ── Palette overlay — only when open ── */}
      {(open || mounted) && (
      <div className="cp-overlay" onClick={() => setOpen(false)}>
        <div className="cp-panel" onClick={e => e.stopPropagation()}>

          {/* Top bar — back + close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px 0 16px", minHeight: 32 }}>
            {response && response.type !== "loading" ? (
              <button onClick={() => setResponse(null)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 10, color: dsc, padding: "3px 6px", borderRadius: 4, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = inp)}
                onMouseLeave={e => (e.currentTarget.style.color = dsc)}
              >← back</button>
            ) : (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: dsc, paddingLeft: 2 }}>
                {response?.title || ""}
              </span>
            )}
            <button onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: dsc, padding: "0 4px", lineHeight: 1, borderRadius: 4, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = inp)}
              onMouseLeave={e => (e.currentTarget.style.color = dsc)}
            >×</button>
          </div>

          {/* Input */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 12px", borderBottom: `1px solid ${bdr}` }}>
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

          {/* Command list — always visible, response shows below it */}
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
                        onClick={() => { setResponse(null); setUsedArrowNav(false); executeCommand(cmd); }}
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

          {/* No match */}
          {query.trim() && filtered.length === 0 && !response && (
            <div style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: dsc, letterSpacing: "0.03em" }}>
              Press <kbd style={{ background: kbg, border: `1px solid ${bdr}`, borderRadius: 2, padding: "1px 5px", fontSize: 9 }}>↵</kbd> to ask as a question
            </div>
          )}

          {/* Response — sits below the command list */}
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
      )}
    </>
  );
}