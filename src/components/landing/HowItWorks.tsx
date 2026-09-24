"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sliders, Cpu, Layers, Award } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Define Your Ambition",
    description:
      "Enter any stack—from 'Java' to 'Python + Django + PostgreSQL'—pick your current level, target career title, and weekly schedule.",
    icon: Sliders,
    color: "from-blue-500 to-indigo-500",
  },
  {
    step: "02",
    title: "Zero-Cost AI Architecture",
    description:
      "Our tiered provider engine queries Google Gemini, Groq, OpenRouter, or curated offline blueprints with structured Zod enforcement.",
    icon: Cpu,
    color: "from-indigo-500 to-purple-500",
  },
  {
    step: "03",
    title: "6-in-1 Generated Roadmap",
    description:
      "Receive ordered modules, official documentation resources, hands-on projects, LeetCode-style practice drills, and interview answers.",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "04",
    title: "Track, Build & Excel",
    description:
      "Interactive dashboard tracking progress %, maintaining learning streaks, taking topic notes, and exporting verified study guides.",
    icon: Award,
    color: "from-pink-500 to-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-6 lg:py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
          <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
            How PathForge Works
          </h2>
          <p className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Blank Slate to Career Ready in 4 Steps
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            No cookie-cutter generic roadmaps. Every path is dynamically computed to match your exact hours and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative glass-panel rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group border border-slate-200/80 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} p-[1px] shadow-md group-hover:scale-110 transition-transform duration-200`}
                  >
                    <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
