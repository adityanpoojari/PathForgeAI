import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Compass, Sparkles, Cpu, ShieldCheck, Heart, Terminal } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>About PathForge AI</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Modern Tech Education at Zero Cost
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We built PathForge AI with a single mission: to eliminate the friction, cost barriers, and hallucinated links of traditional learning roadmaps.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Completely Free Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero reliance on paid cloud APIs. Uses tiered free models from Google Gemini, Groq, OpenRouter, local Ollama, and offline curated templates.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Anti-Hallucination Links
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                AI is strictly forbidden from generating URLs. All resources are verified and mapped against an allowlist of official documentation domains.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                6-in-1 Comprehensive Pacing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Modules, milestone projects, practice problems, interview prep, and weekly schedules calculated to your exact available hours.
              </p>
            </div>
          </div>

          {/* Architecture details */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              The Architecture Behind the Platform
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Modern developer roadmaps are often either static images created years ago or generic bullet lists with no hands-on context. PathForge AI combines state-of-the-art LLMs with programmatic constraints (Zod schemas, request hash caching, and mathematical hour allocation) to generate balanced curricula.
              </p>
              <p>
                Every request is hashed via SHA256 of parameters. If an identical stack and schedule has been synthesized before, it is loaded instantaneously from cache without invoking an external API.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
