# PathForge AI: AI Learning Path Generator 🚀

> **A production-ready web application that generates personalized, multi-dimensional learning paths for any technology stack and career goal.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io)

---

## 🌟 Key Features

- **6-in-1 Structured Output**: Generates an ordered curriculum roadmap, 4-tier milestone projects (Beginner to Capstone), practice problem drills with hints, interview prep Q&A with model answers, an adaptive weekly study schedule, and clean PDF export.
- **Smart Tech Stack Mapping**: Enter any single or multi-technology combination (e.g. `Java`, `Python + PostgreSQL`, `React + Next.js`) tailored to your target career role and skill level.
- **Verified Documentation Resources**: Documentation links resolve exclusively to official, authoritative domains (Oracle, MDN, Python.org, React.dev, etc.) with anti-hallucination guards.
- **Progress & Streak Tracking**: Interactive timeline checkpoints, real-time completion percentages, daily learning streaks, and personal topic notes.
- **Authentication & Dashboard**: Secure user accounts with bcrypt hashing, session cookies, and a personal dashboard to manage all saved learning paths.

---

## 🛠️ Quickstart & Local Installation

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/your-username/pathforge-ai.git
cd pathforge-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Demo Data
```bash
npx prisma db push
npm run seed
```
Demo account: `demo@pathforge.ai` / `Password123!`

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. In **Environment Variables**, configure:
   - `DATABASE_URL` (PostgreSQL connection string from Neon or Supabase)
   - `NEXTAUTH_SECRET` (A random 32-character secret)
   - `GEMINI_API_KEY` (Your Google Gemini API key)
5. Click **Deploy**.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
