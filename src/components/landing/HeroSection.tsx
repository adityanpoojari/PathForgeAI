"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Layers,
  Code2,
  Calendar,
  Zap,
} from "lucide-react";
import { CAREER_GOALS, PROFICIENCY_LEVELS } from "@/data/technologies";

const TYPEWRITER_EXAMPLES = [
  { text: "Java + beginner", goal: "Software Developer" },
  { text: "Python + intermediate", goal: "Data Scientist" },
  { text: "React + beginner", goal: "Frontend Developer" },
  { text: "Docker + beginner", goal: "DevOps/Cloud Engineer" },
  { text: "DSA + intermediate", goal: "Placement/Interview Prep" },
];

export function HeroSection() {
  const router = useRouter();
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [selectedTech, setSelectedTech] = useState("React");
  const [selectedLevel, setSelectedLevel] = useState<string>("Beginner");
  const [selectedGoal, setSelectedGoal] = useState<string>("Frontend Developer");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % TYPEWRITER_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      tech: selectedTech,
      level: selectedLevel,
      goal: selectedGoal,
    }).toString();
    router.push(`/generate?${query}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-6 lg:pt-12 lg:pb-8">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        {/* Sleek Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs font-medium text-indigo-700 dark:text-indigo-300"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Zero-Cost Engine • Built for Engineers</span>
        </motion.div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            Turn any tech stack into a{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              career-ready roadmap
            </span>
          </motion.h1>

          {/* Cycling Typewriter Subhead */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2"
          >
            <span>Type stacks like</span>
            <div className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentExampleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800/60 text-sm sm:text-base"
                >
                  "{TYPEWRITER_EXAMPLES[currentExampleIndex].text}"
                </motion.span>
              </AnimatePresence>
            </div>
            <span>and get a 6-in-1 plan.</span>
          </motion.div>
        </div>

        {/* Sleek Command-Bar Style Quick Generator Widget */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <form
            onSubmit={handleQuickGenerate}
            className="glass-panel p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-950/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            {/* Tech Input */}
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 text-left">
              <Code2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <input
                type="text"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                placeholder="Tech: Java, Python, React..."
                className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                required
              />
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

            {/* Level Select */}
            <div className="flex items-center gap-2 px-3 py-1.5 text-left min-w-[130px]">
              <Layers className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {PROFICIENCY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="dark:bg-slate-900">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

            {/* Career Goal Select */}
            <div className="flex items-center gap-2 px-3 py-1.5 text-left min-w-[170px]">
              <Compass className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {CAREER_GOALS.map((goal) => (
                  <option key={goal} value={goal} className="dark:bg-slate-900">
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl sm:rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Forge Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>

        {/* Minimal Stack Preset Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick stacks:</span>
          {[
            { label: "Java", tech: "Java", level: "Beginner", goal: "Software Developer" },
            { label: "Python • Data Science", tech: "Python", level: "Intermediate", goal: "Data Scientist" },
            { label: "React • Frontend", tech: "React", level: "Beginner", goal: "Frontend Developer" },
            { label: "Docker • DevOps", tech: "Docker", level: "Beginner", goal: "DevOps/Cloud Engineer" },
            { label: "DSA • Placement", tech: "Data Structures & Algorithms", level: "Intermediate", goal: "Placement/Interview Prep" },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setSelectedTech(chip.tech);
                setSelectedLevel(chip.level);
                setSelectedGoal(chip.goal);
              }}
              className="px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors text-[11px]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
