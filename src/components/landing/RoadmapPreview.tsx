"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  FolderGit2,
  CheckSquare,
  HelpCircle,
  Calendar,
  Clock,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function RoadmapPreview() {
  const [activeTab, setActiveTab] = useState<"roadmap" | "projects" | "practice" | "interview" | "schedule">("roadmap");
  const [revealedAnswer, setRevealedAnswer] = useState(false);

  return (
    <section className="py-6 lg:py-8 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-xl mx-auto mb-5 space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Interactive Output Preview
          </h2>
          <p className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See What Your Custom Path Looks Like
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generated sample: <span className="font-medium text-slate-800 dark:text-slate-200">Java + Beginner + Software Developer (6 Weeks)</span>
          </p>
        </div>

        {/* Product Window Mockup */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-indigo-950/5 overflow-hidden">
          {/* Window Header */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/40">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">pathforge-preview.json</span>
            </div>

            {/* Minimal Tab Switcher */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: "roadmap", label: "Roadmap", icon: Map },
                { id: "projects", label: "Projects", icon: FolderGit2 },
                { id: "practice", label: "Practice", icon: CheckSquare },
                { id: "interview", label: "Interview", icon: HelpCircle },
                { id: "schedule", label: "Schedule", icon: Calendar },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === "roadmap" && (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                        Module 1: Java Fundamentals & Syntax
                      </h3>
                      <p className="text-xs text-slate-400">Prerequisites: Basic terminal commands</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-mono">
                      <Clock className="w-3 h-3" /> 18 Hours
                    </span>
                  </div>

                  <div className="space-y-4 pl-3 border-l-2 border-indigo-500/30">
                    <div className="relative pl-4 space-y-1">
                      <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        JVM, JRE, JDK & Development Setup
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Understanding Java compilation bytecode, JVM execution lifecycle, and configuring IntelliJ IDEA with modern JDK 21+.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <ExternalLink className="w-2.5 h-2.5 text-indigo-500" /> Official Oracle Docs
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Tutorial Video
                        </span>
                      </div>
                    </div>

                    <div className="relative pl-4 space-y-1">
                      <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Variables, Data Types & Control Structures
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Primitive types, reference types, type casting, ternary operators, loops, and modern pattern matching switch expressions.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      Beginner Milestone
                    </span>
                    <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                      Student Management Console Application
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      CRUD operations, GPA calculations, and persistent file storage.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {["OOP", "Collections", "File I/O"].map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      Capstone Launch
                    </span>
                    <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                      Distributed Task Scheduler & Job Engine
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Asynchronous worker pools with Java 21 Virtual Threads and resilient retry queues.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {["Virtual Threads", "Spring Boot", "Docker"].map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100/50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "practice" && (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-3"
                >
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                      readOnly
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Two Sum with HashMap
                        </h4>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          Easy
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Topic: Collections & Hashing
                      </p>
                      <div className="mt-2 text-xs bg-slate-200/50 dark:bg-slate-800/60 p-2.5 rounded-lg text-slate-600 dark:text-slate-300">
                        💡 <strong>Hint:</strong> Store the complement of each number in a HashMap to achieve an O(n) single pass time complexity.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "interview" && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-3"
                >
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        Intermediate • Collections
                      </span>
                      <button
                        onClick={() => setRevealedAnswer(!revealedAnswer)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>{revealedAnswer ? "Hide Model Answer" : "Reveal Model Answer"}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${revealedAnswer ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      How does HashMap handle bucket collisions in Java 8+?
                    </h4>
                    {revealedAnswer && (
                      <div className="text-xs text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg border border-indigo-200/50 dark:border-indigo-800/50 leading-relaxed">
                        HashMap uses an array of buckets. When two keys hash to the same bucket index, they form a linked list. Once a single bucket reaches a threshold (TREEIFY_THRESHOLD = 8) and total table capacity is at least 64, the linked list transforms into a balanced red-black tree, reducing lookup time from O(n) to O(log n).
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "schedule" && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { week: 1, focus: "Syntax & CLI Setup", hours: 10, task: "Install JDK 21, write first classes & loops" },
                    { week: 2, focus: "OOP Foundations", hours: 10, task: "Encapsulation, inheritance, start Student App" },
                    { week: 3, focus: "Collections & Streams", hours: 10, task: "Master HashMap, ArrayList, and Lambdas" },
                  ].map((w) => (
                    <div key={w.week} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">Week {w.week}</span>
                        <span className="text-slate-400 text-[11px]">{w.hours} hrs</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{w.focus}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{w.task}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
