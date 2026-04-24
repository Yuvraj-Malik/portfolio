<div align="center">

<br/>

<img src="public/favicon.png" width="64" height="64" alt="YM" />

<br/>

# Yuvraj Malik — Portfolio

> Full Stack Developer & AI Engineer · Thapar Institute · 2024–2028

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMloiLz48L3N2Zz4=&logoColor=white)](https://groq.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

<br/>

**[View Live →](https://yuvrajm.dev/)**

<br/>

</div>

---

| **Easter eggs** | `jarvis` · `hack the system` · `surprise me` (10 randomised) |
## 🧩 Firebase Setup (NotFound Leaderboard)

Handles identity questions, technical queries, rude inputs, Hindi, salary, relationships, comparisons — everything a friend or recruiter would try.

---

### 🚀 Project Showcase

Each project ships with two completely different expanded layouts:

**Showcase** — visual and impression-first
- Large image preview, italic thesis, numbered feature list, authority signal

**Engineered** — dense system-design format
- 4-tab deep-dive: Overview · Architecture · Challenges · Metrics
- Problem statement, decision rationale, performance numbers

---

### ✨ Everything Else

| Feature | Description |
|---|---|
| **Preloader** | YM monogram animation — scan lines, typewriter, skip on reload |
| **Navbar** | 3-zone layout · AiFace component · live clock · glass blur · scroll-shrink |
| **NotFound** | "Dodge the Bugs" canvas game · Firebase global leaderboard |
| **Contact** | EmailJS-powered form — no backend needed |
| **Theming** | Dark/light persisted to localStorage, synced via MutationObserver |
| **Responsive** | Desktop, tablet, and mobile tuned individually |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with React Router
- **Vite 7** — instant dev, optimised production bundles
- **Tailwind CSS v4** — utility-first styling

### AI & Integrations
- **Groq API** — command palette AI fallback
- **EmailJS** — contact form delivery, no server
- **Firebase Firestore** — realtime global leaderboard (`onSnapshot` + `runTransaction`)

### Typography
- **Instrument Serif** — headlines
- **DM Mono** — terminal text, UI labels

### Deployment
- **Netlify** — `netlify.toml` + `public/_redirects` pre-configured

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/Yuvraj-Malik/portfolio
cd portfolio
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# ── Contact Form (EmailJS) ──────────────────────────────────────────
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# ── Command Palette AI (Groq) ───────────────────────────────────────
# Optional · free at console.groq.com
# Without this, local responses still handle most portfolio queries
VITE_GROQ_API_KEY=your_groq_api_key

# ── NotFound Global Leaderboard (Firebase) ──────────────────────────
# Optional · without this, the game still works — only leaderboard is disabled
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

---

## 🧩 Firebase Setup (NotFound Leaderboard)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore → create collection `highscore` → document `global` → field `score: 0`
3. Set security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /highscore/global {
      allow read: if true;
      allow write: if request.resource.data.score is int
                   && request.resource.data.score > resource.data.score
                   && request.resource.data.score < 10000;
    }
  }
}
```

4. Add your domain to Firebase Authorized Domains when live

---

## 🎨 Customisation

| What | Where |
|---|---|
| Portfolio data & AI responses | `PORTFOLIO` object in `CommandPalette.jsx` |
| Custom AI answers | `localAIResponse()` in `CommandPalette.jsx` |
| Project content | `PROJECTS` array in `Projects.jsx` |
| Social links | `Hero.jsx` · `Navbar.jsx` · `Footer.jsx` |
| Resume | `public/Resume_Yuvraj_Malik.pdf` |
| SEO | `public/robots.txt` · `public/sitemap.xml` — update domain before going live |

---

## 📜 Scripts

```bash
npm run dev               # Start dev server (localhost:5173)
npm run build             # Production build → dist/
npm run preview           # Preview production build locally
npm run lint              # Run ESLint
npm run images:compress   # Compress project preview images
```

---

<div align="center">

<br/>

Built from scratch by **[Yuvraj Malik](https://github.com/Yuvraj-Malik)**

[![Email](https://img.shields.io/badge/Email-yuvraj.malik003%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yuvraj.malik003@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yuvraj%20Malik-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yuvraj-malik27)


