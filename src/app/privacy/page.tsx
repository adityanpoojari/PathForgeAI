import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy & Data Sovereignty</span>
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 font-mono">Last updated: September 2026</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                1. Zero Personal Data Sent to AI
              </h2>
              <p>
                We enforce strict data isolation. <strong>Never</strong> under any circumstances are your personal data (such as your name, email address, IP address, or user ID) transmitted to any AI provider (Google Gemini, Groq, OpenRouter, or Ollama). The AI engine receives exclusively the technical parameters: requested technology stack, proficiency level, career goal, and study duration.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                2. Information We Collect
              </h2>
              <p>
                When creating an account, we collect only your chosen display name, email address, and a securely salted and hashed representation of your password (using bcrypt with work factor 12). Plaintext passwords are never stored or logged anywhere in our system.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                3. Cookie Security & Tracking
              </h2>
              <p>
                We do not use invasive third-party tracking, advertising, or cross-site fingerprinting cookies. We use only essential, secure, SameSite, and HttpOnly session cookies for user authentication and CSRF protection.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                4. Data Portability & Right to Erasure (GDPR)
              </h2>
              <p>
                You retain complete ownership over your data. At any time from your Account Settings, you may download a full JSON copy of all saved learning paths and notes, or execute permanent account deletion which immediately purges all associated records.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
