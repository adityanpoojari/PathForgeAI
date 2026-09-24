"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Map,
  FolderGit2,
  CheckSquare,
  HelpCircle,
  CalendarDays,
  FileDown,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Flame,
  Code2,
} from "lucide-react";

export function FeaturesGrid() {
  const cards = [
    {
      id: "curriculum",
      icon: Map,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      accentGlow: "group-hover:border-indigo-500/40",
      badge: "Zero Broken Links",
      badgeColor: "text-indigo-400 bg-indigo-500/10",
      title: "Sequenced Curriculum & Verified Docs",
      description:
        "Ordered prerequisites and realistic hour estimates. The AI is barred from hallucinating fake links—resolving only to MDN, Oracle, Python.org, and official specs.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] font-mono space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">✓ Mod 1: Fundamentals</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">18 hrs</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[10px] truncate">docs.oracle.com/en/java/javase/21</span>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      icon: FolderGit2,
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      accentGlow: "group-hover:border-purple-500/40",
      badge: "Portfolio Ready",
      badgeColor: "text-purple-400 bg-purple-500/10",
      title: "4-Tier Milestone Projects",
      description:
        "Step-by-step portfolio builds spanning Beginner, Intermediate, Advanced, and Capstone with clear architecture requirements and stretch goals.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Tier 4: Capstone</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Production</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-purple-500/30" />
            <div className="h-1.5 flex-1 rounded-full bg-purple-500/50" />
            <div className="h-1.5 flex-1 rounded-full bg-purple-500/70" />
            <div className="h-1.5 flex-1 rounded-full bg-purple-500" />
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">Task Engine • Java 21 + Spring Boot</p>
        </div>
      ),
    },
    {
      id: "practice",
      icon: CheckSquare,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      accentGlow: "group-hover:border-emerald-500/40",
      badge: "Hands-On Drills",
      badgeColor: "text-emerald-400 bg-emerald-500/10",
      title: "Practice Problems & Hints",
      description:
        "LeetCode-style algorithmic challenges classified Easy, Medium, and Hard, complete with progressive hints that never spoil the answer.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Two Sum HashMap</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Easy</span>
          </div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-600 dark:text-slate-400 font-mono flex items-center justify-between">
            <span>💡 Store complement</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(N) Time</span>
          </div>
        </div>
      ),
    },
    {
      id: "interview",
      icon: HelpCircle,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      accentGlow: "group-hover:border-amber-500/40",
      badge: "Placement Tested",
      badgeColor: "text-amber-400 bg-amber-500/10",
      title: "Placement Interview Questions",
      description:
        "Frequently asked technical screening questions with accordion model answers, edge-case breakdowns, and architectural trade-offs.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] space-y-1.5">
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-medium">Q: HashMap bucket collisions?</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-700 dark:text-slate-300 font-mono leading-relaxed border-l-2 border-amber-500">
            TREEIFY_THRESHOLD = 8 → Red-Black Tree
          </div>
        </div>
      ),
    },
    {
      id: "schedule",
      icon: CalendarDays,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      accentGlow: "group-hover:border-blue-500/40",
      badge: "Personalized Pace",
      badgeColor: "text-blue-400 bg-blue-500/10",
      title: "Adaptive Weekly Schedule",
      description:
        "Dynamically distributed to fit your exact weekly study availability (5–40 hrs) and timeline (2–24 weeks). Never fall behind or burn out.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>Pace: 10 hrs/week</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">6 Weeks</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] text-center font-mono">
            <span className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 font-medium">W1: Syntax</span>
            <span className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 font-medium">W2: OOP</span>
            <span className="p-1 rounded bg-blue-500/20 text-blue-700 dark:text-blue-200 font-semibold border border-blue-500/30">W3: APIs</span>
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      icon: FileDown,
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      accentGlow: "group-hover:border-rose-500/40",
      badge: "PDF & Tracking",
      badgeColor: "text-rose-400 bg-rose-500/10",
      title: "Streak Tracking & Clean PDF Export",
      description:
        "Check off completed topics, maintain learning streaks, take persistent notes, and export a clean print-ready PDF study curriculum in 1 click.",
      microUi: (
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800/80 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" /> 7-Day Streak
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">84% Complete</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-indigo-500 h-1.5 rounded-full w-[84%]" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>Notes Saved (Sync)</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5">
              <span>Export PDF</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-6 lg:py-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Six Perspectives. One Complete Blueprint.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered to guide you from foundational theory to real-world code and interview readiness.
          </p>
        </div>

        {/* Perfectly balanced 3x2 grid of all 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group ${card.accentGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${card.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Embedded Micro-UI component */}
                {card.microUi}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
