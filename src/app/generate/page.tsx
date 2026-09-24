"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TECHNOLOGIES, CAREER_GOALS, PROFICIENCY_LEVELS, TechnologyItem } from "@/data/technologies";
import {
  Compass,
  Sparkles,
  Layers,
  Clock,
  Calendar,
  X,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ShieldCheck,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STEPS = [
  "Analyzing stack dependencies & prerequisites...",
  "Structuring curriculum & topic hierarchy...",
  "Designing 4-tier milestone projects...",
  "Formulating practice problems & hints...",
  "Curating technical interview questions & model answers...",
  "Synthesizing customized weekly schedule...",
  "Validating schema & verifying official documentation...",
];

function GeneratorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial params from query string if available
  const initialTech = searchParams.get("tech");
  const initialLevel = searchParams.get("level") || "Beginner";
  const initialGoal = searchParams.get("goal") || "Software Developer";

  const [selectedTechs, setSelectedTechs] = useState<string[]>(
    initialTech ? [initialTech] : ["Java"]
  );
  const [techInput, setTechInput] = useState("");
  const [level, setLevel] = useState(initialLevel);
  const [goal, setGoal] = useState(initialGoal);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [durationWeeks, setDurationWeeks] = useState(6);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestions filtered by query and not already selected
  const suggestions = TECHNOLOGIES.filter(
    (t) =>
      t.name.toLowerCase().includes(techInput.toLowerCase().trim()) &&
      !selectedTechs.some((st) => st.toLowerCase() === t.name.toLowerCase())
  ).slice(0, 8);

  const addTech = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!selectedTechs.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedTechs([...selectedTechs, trimmed]);
    }
    setTechInput("");
    setShowSuggestions(false);
  };

  const removeTech = (index: number) => {
    setSelectedTechs(selectedTechs.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(techInput);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTechs.length === 0 && !techInput.trim()) {
      setError("Please specify at least one technology or topic.");
      return;
    }

    const finalTechs = [...selectedTechs];
    if (techInput.trim()) {
      finalTechs.push(techInput.trim());
      setSelectedTechs(finalTechs);
      setTechInput("");
    }

    setError(null);
    setIsGenerating(true);
    setCurrentStepIdx(0);

    // Step cycle animation
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1100);

    try {
      const res = await fetch("/api/generate-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technologies: finalTechs,
          level,
          goal,
          hoursPerWeek,
          durationWeeks,
        }),
      });

      clearInterval(stepInterval);

      const result = await res.json();
      if (!res.ok) {
        setIsGenerating(false);
        setError(result.error || "Generation encountered an issue.");
        return;
      }

      // Store generated data in session storage for instant results rendering
      sessionStorage.setItem("pathforge_current_result", JSON.stringify(result));

      // Navigate to results page
      router.push(`/results?id=${result.pathId}&cached=${result.cached}`);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsGenerating(false);
      setError("Network error while connecting to generation engine. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Dimensional AI Learning Path Engine</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Design Your Personalized Curriculum
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Combine technologies, adjust your weekly capacity, and let PathForge AI construct an end-to-end blueprint.
            </p>
          </div>

          {/* Generator Form Card */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-indigo-950/5 relative overflow-hidden">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
                <div>
                  <h4 className="font-bold">Generation Notice</h4>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Technology Multi-Select Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Target Technologies / Stack (Multi-Select or Custom)
                </label>
                <div className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex flex-wrap items-center gap-2">
                  {selectedTechs.map((tech, idx) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold shadow-xs"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech(idx)}
                        aria-label={`Remove ${tech}`}
                        className="p-0.5 hover:bg-indigo-200/50 dark:hover:bg-indigo-800 rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  <div className="relative flex-1 min-w-[180px]">
                    <input
                      ref={inputRef}
                      type="text"
                      value={techInput}
                      onChange={(e) => {
                        setTechInput(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={handleKeyDown}
                      placeholder={selectedTechs.length === 0 ? "e.g. Java, Python, React, Docker..." : "Add another technology or press enter..."}
                      className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />

                    {/* Autocomplete Dropdown */}
                    {showSuggestions && techInput.trim().length > 0 && suggestions.length > 0 && (
                      <div className="absolute left-0 top-full mt-2 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 max-h-60 overflow-y-auto p-1.5">
                        {suggestions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => addTech(item.name)}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-800 dark:text-slate-200"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-slate-400 text-xs">({item.category})</span>
                            </div>
                            <Plus className="w-4 h-4 text-indigo-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tip: You can combine stacks, e.g. <span className="font-mono text-indigo-600 dark:text-indigo-400">Python + Django + PostgreSQL</span> or type any custom specialty.
                </p>
              </div>

              {/* Level & Career Goal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    Starting Proficiency Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {PROFICIENCY_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Career Goal */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-indigo-500" />
                    Target Career Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CAREER_GOALS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pacing Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Hours Per Week */}
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      Weekly Study Hours
                    </span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm">
                      {hoursPerWeek} hrs / week
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={40}
                    step={2}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>4 hrs (Casual)</span>
                    <span>20 hrs (Intensive)</span>
                    <span>40 hrs (Full-time)</span>
                  </div>
                </div>

                {/* Duration in Weeks */}
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      Target Duration
                    </span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm">
                      {durationWeeks} Weeks
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={24}
                    step={1}
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>2 Wks (Sprint)</span>
                    <span>8 Wks (Standard)</span>
                    <span>24 Wks (Mastery)</span>
                  </div>
                </div>
              </div>

              {/* Total Commitment Banner */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900/50 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Total Program Investment:</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                  ~{hoursPerWeek * durationWeeks} Total Practice Hours
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Generate My 6-in-1 Learning Path</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Animated Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full glass-panel p-8 rounded-3xl border border-indigo-500/30 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[2px] mx-auto animate-pulse">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                  <Compass className="w-8 h-8 text-indigo-400 animate-spin" style={{ animationDuration: "8s" }} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-white">
                  Synthesizing Your Curriculum
                </h3>
                <p className="text-xs text-indigo-300 font-mono">
                  Stack: {selectedTechs.join(" + ")} • {goal}
                </p>
              </div>

              {/* Step Progression Bar */}
              <div className="space-y-3">
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                    style={{
                      width: `${((currentStepIdx + 1) / LOADING_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="min-h-[2.5rem] flex items-center justify-center">
                  <p className="text-xs sm:text-sm font-medium text-slate-300 animate-pulse">
                    {LOADING_STEPS[currentStepIdx]}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Cost Engine • Structured JSON Validation</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <Compass className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
              <h3 className="font-heading text-lg font-bold">Loading PathForge Generator...</h3>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <GeneratorForm />
    </React.Suspense>
  );
}
