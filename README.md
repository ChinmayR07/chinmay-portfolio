# Chinmay Raichur — Developer Portfolio

> Personal portfolio website built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a Claude API-powered AI assistant that answers recruiter questions in real time.

🌐 **Live:** [chinmayraichur.me](https://chinmay-portfolio-seven.vercel.app/)  
📄 **Resume:** [Download PDF](https://chinmayraichur.me/resume.pdf)  
💼 **LinkedIn:** [linkedin.com/in/chinmay-raichur](https://linkedin.com/in/chinmay-raichur)

---

## ✨ Features

- **Dark / Light mode** — default dark, one-click toggle, zero flash on load
- **Smooth scroll navigation** — IntersectionObserver auto-highlights active section in navbar
- **Framer Motion animations** — scroll-triggered fade-ups, stagger grids, hero sequence
- **AI Portfolio Bot** — floating Claude API chatbot answers recruiter questions about my background
- **GitHub Activity feed** — live contribution graph + pinned repos via GitHub API
- **Fully responsive** — mobile-first, tested on iPhone, Android, tablet, and desktop
- **Lighthouse ≥ 95** — optimized images, static generation, Tailwind purge, font swap
- **SEO optimized** — OpenGraph tags, JSON-LD structured data, sitemap, robots.txt
- **CI/CD pipeline** — GitHub Actions: lint → type-check → test → build → deploy on every push

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) (App Router) | SSR + SSG, file-based routing, API routes |
| [React 18](https://react.dev) | Component model, hooks |
| [TypeScript 5](https://typescriptlang.org) | Type safety throughout |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling, design tokens |
| [Framer Motion](https://framer.com/motion) | Scroll-triggered animations |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode, zero flash |

### Backend (Next.js API Routes)
| Route | Purpose |
|---|---|
| `POST /api/chat` | Claude API proxy — keeps API key server-side |
| `POST /api/contact` | Contact form with rate limiting |
| `GET /api/github` | GitHub stats with 1hr cache |

### Integrations
| Service | Purpose |
|---|---|
| [Anthropic Claude API](https://anthropic.com) | AI portfolio assistant |
| [GitHub REST API](https://docs.github.com/en/rest) | Live contribution data |
| [EmailJS](https://emailjs.com) | Contact form (no backend needed) |
| [Vercel Analytics](https://vercel.com/analytics) | Privacy-friendly visitor analytics |

---

## 📁 Project Structure

```
chinmay-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, SEO metadata, ThemeProvider
│   ├── page.tsx                # Home — assembles all section components
│   ├── globals.css             # Design tokens, Tailwind base, CSS variables
│   ├── not-found.tsx           # Custom 404
│   └── api/
│       ├── chat/route.ts       # Claude API proxy (POST)
│       ├── contact/route.ts    # Contact form handler (POST)
│       └── github/route.ts     # GitHub stats (GET, cached 1hr)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, active-section highlight, theme toggle
│   │   └── Footer.tsx
│   ├── sections/               # One component per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── GitHubActivity.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Resume.tsx
│   │   ├── Contact.tsx
│   │   └── AIChatBot.tsx       # Floating Claude-powered chat widget
│   └── ui/
│       ├── SectionWrapper.tsx  # Scroll-triggered animation wrapper
│       └── SectionHeader.tsx   # Reusable label + title + subtitle
│
├── data/
│   └── index.ts                # All content: experience, skills, education, projects
│
├── hooks/
│   ├── useActiveSection.ts     # IntersectionObserver — tracks visible section
│   └── useScrolled.ts          # Navbar frosted glass on scroll
│
├── lib/
│   ├── utils.ts                # cn(), getDuration(), generateId(), etc.
│   └── animations.ts           # Framer Motion variants library
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
├── __tests__/
│   └── utils.test.ts           # Jest unit tests
│
└── .github/
    └── workflows/
        ├── ci.yml              # PR checks: lint + type-check + test + build
        └── deploy.yml          # main → Vercel production deploy
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### 1. Clone the repo
```bash
git clone https://github.com/ChinmayR07/chinmay-portfolio.git
cd chinmay-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:
```env
# Anthropic Claude API (server-side only)
ANTHROPIC_API_KEY=sk-ant-...

# EmailJS (from emailjs.com dashboard)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx

# GitHub (optional — increases rate limit from 60 to 5000 req/hr)
NEXT_PUBLIC_GITHUB_USERNAME=chinmayraichur
GITHUB_TOKEN=ghp_xxx
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
npm test             # Jest unit tests
npm run test:watch   # Jest in watch mode
npm run format       # Prettier format all files
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select repo
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-deploys on every push to `main`

### GitHub Pages (Static Export)
1. Uncomment the `output: 'export'` lines in `next.config.js`
2. Push to GitHub
3. Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions
4. The `deploy.yml` workflow handles the rest

> Note: GitHub Pages static export disables API routes. For full functionality (AI Bot, contact form), use Vercel.

---

## 🤖 AI Portfolio Bot

The AI assistant is powered by the [Anthropic Claude API](https://anthropic.com). It's implemented as a **Next.js API Route** (`app/api/chat/route.ts`) which:

- Keeps the API key server-side (never exposed to the browser)
- Loads Chinmay's full profile as a system prompt
- Supports multi-turn conversation history
- Gracefully falls back if the API key isn't configured

To enable it locally, add `ANTHROPIC_API_KEY` to `.env.local`.

---

## 📊 Performance

| Metric | Score |
|---|---|
| Lighthouse Performance | ≥ 95 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

Key techniques: `next/image` auto-WebP, dynamic imports for heavy components, Tailwind CSS purge, `font-display: swap`, static generation.

---

## 📝 License

MIT — feel free to use this as a template for your own portfolio.

---

*Built by Chinmay Raichur · [chinmayraichur@gmail.com](mailto:chinmayraichur@gmail.com)*
