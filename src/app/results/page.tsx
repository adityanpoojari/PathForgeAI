"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildSafeResourceUrl } from "@/lib/utils/resourceLinks";
import { LearningPathOutput } from "@/lib/types/roadmap";
import {
  Compass,
  Sparkles,
  Map,
  FolderGit2,
  CheckSquare,
  HelpCircle,
  Calendar,
  Share2,
  Printer,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Layers,
  Clock,
  RotateCcw,
  ShieldAlert,
  Info,
  Save,
  Copy,
  Check,
  StickyNote,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState<
    "roadmap" | "projects" | "practice" | "interview" | "schedule"
  >("roadmap");

  const [data, setData] = useState<LearningPathOutput | null>(null);
  const [providerUsed, setProviderUsed] = useState<string>("AI Engine");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User interactions & progress state
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [openTopicNotes, setOpenTopicNotes] = useState<string | null>(null);
  const [topicNotes, setTopicNotes] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Share & Save state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // 1. Try loading from sessionStorage first (instant preview from generator)
    const cachedSession = sessionStorage.getItem("pathforge_current_result");
    if (cachedSession) {
      try {
        const parsed = JSON.parse(cachedSession);
        if (parsed?.data && (!pathId || parsed.pathId === pathId)) {
          setData(parsed.data);
          setProviderUsed(parsed.providerUsed || "Zero-Cost AI Provider");
          setLoading(false);
        }
      } catch (e) {
        // Fallback to fetch
      }
    }

    // 2. Fetch from database if pathId is provided
    if (pathId) {
      fetch(`/api/paths/${pathId}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && resData.path?.content) {
            setData(resData.path.content);
            if (resData.progress) {
              const compMap: Record<string, boolean> = {};
              resData.progress.forEach((p: any) => {
                if (p.completed) compMap[p.itemId] = true;
              });
              setCompletedItems(compMap);
            }
            if (resData.notes) {
              const noteMap: Record<string, string> = {};
              resData.notes.forEach((n: any) => {
                noteMap[n.topicId] = n.content;
              });
              setTopicNotes(noteMap);
            }
          }
          setLoading(false);
        })
        .catch(() => {
          if (!data) setError("Failed to load learning path details.");
          setLoading(false);
        });
    } else if (!cachedSession) {
      setLoading(false);
      setError("No learning path specified. Please generate one first.");
    }
  }, [pathId]);

  const toggleComplete = async (itemId: string, itemType: "topic" | "project" | "problem") => {
    const nextVal = !completedItems[itemId];
    setCompletedItems((prev) => ({ ...prev, [itemId]: nextVal }));

    if (pathId) {
      try {
        await fetch("/api/progress/toggle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learningPathId: pathId,
            itemId,
            itemType,
            completed: nextVal,
          }),
        });
      } catch (e) {
        // Silent fail for progress sync if guest
      }
    }
  };

  const handleSaveNote = async (topicId: string, content: string) => {
    setTopicNotes((prev) => ({ ...prev, [topicId]: content }));
    if (pathId) {
      try {
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learningPathId: pathId,
            topicId,
            content,
          }),
        });
      } catch (e) {}
    }
  };

  const handleSavePath = async () => {
    if (!pathId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/paths/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathId }),
      });
      if (res.ok) {
        setSaveSuccess(true);
      } else {
        router.push(`/auth/login?redirect=/results?id=${pathId}`);
      }
    } catch {
      router.push(`/auth/login?redirect=/results?id=${pathId}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyShareLink = () => {
    const url = `${window.location.origin}/share/${pathId || "demo"}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <Compass className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
            <h3 className="font-heading text-lg font-bold">Loading Learning Curriculum...</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="font-heading text-xl font-bold">No Active Curriculum Found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">{error || "Please try generating a path."}</p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500"
            >
              Go to Generator
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate completion percentage
  const totalTopics = data.modules.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = Object.keys(completedItems).filter((k) => completedItems[k]).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Overview & Actions Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-indigo-950/5 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono border border-indigo-200 dark:border-indigo-800">
                    {data.technology}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    {data.level}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
                    Goal: {data.goal}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Engine: {providerUsed}
                  </span>
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {data.technology} Mastery: {data.goal}
                </h1>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {data.overview}
                </p>

                {/* Prerequisites */}
                {data.prerequisites && data.prerequisites.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Prerequisites:</span>
                    {data.prerequisites.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 min-w-[200px] no-print">
                <button
                  onClick={handleSavePath}
                  disabled={saving || saveSuccess}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Saved to Dashboard</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{saving ? "Saving..." : "Save to Dashboard"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 className="w-4 h-4 text-indigo-500" />
                  <span>Share Path</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-emerald-500" />
                  <span>Export PDF / Print</span>
                </button>

                <Link
                  href="/generate"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Change Pace / Stack</span>
                </Link>
              </div>
            </div>

            {/* Progress tracker bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">
                  Curriculum Progress: {completedTopicsCount} of {totalTopics} topics completed
                </span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Mandatory Verification Note */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 flex-shrink-0 text-amber-500" />
              <span>
                <strong>Note:</strong> AI-generated plan, please verify with official documentation.
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-print">
            {[
              { id: "roadmap", label: "Roadmap Timeline", icon: Map, count: data.modules.length },
              { id: "projects", label: "Milestone Projects", icon: FolderGit2, count: data.projects.length },
              { id: "practice", label: "Practice Problems", icon: CheckSquare, count: data.practiceProblems.length },
              { id: "interview", label: "Interview Prep", icon: HelpCircle, count: data.interviewQuestions.length },
              { id: "schedule", label: "Weekly Schedule", icon: Calendar, count: data.weeklySchedule.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                      : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: ROADMAP TIMELINE */}
          {activeTab === "roadmap" && (
            <div className="space-y-8">
              {data.modules.map((mod, modIdx) => (
                <div
                  key={mod.order}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                        {mod.order}
                      </div>
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {mod.title}
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.estimatedHours} Estimated Hours
                    </span>
                  </div>

                  {/* Topics vertical timeline */}
                  <div className="space-y-6 pl-4 border-l-2 border-indigo-500/30">
                    {mod.topics.map((topic, topicIdx) => {
                      const topicKey = `mod-${mod.order}-top-${topicIdx}`;
                      const isDone = !!completedItems[topicKey];
                      const isNotesOpen = openTopicNotes === topicKey;

                      return (
                        <div key={topic.title} className="relative pl-6 space-y-3">
                          {/* Dot indicator */}
                          <button
                            onClick={() => toggleComplete(topicKey, "topic")}
                            className={`absolute -left-[27px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isDone
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "bg-white dark:bg-slate-900 border-indigo-500 hover:scale-110"
                            }`}
                            title={isDone ? "Mark as in-progress" : "Mark as completed"}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                          </button>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3
                                className={`font-heading text-base font-bold transition-colors ${
                                  isDone ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
                                }`}
                              >
                                {topic.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                {topic.description}
                              </p>
                            </div>

                            <button
                              onClick={() => setOpenTopicNotes(isNotesOpen ? null : topicKey)}
                              className={`p-2 rounded-xl text-xs border transition-colors flex items-center gap-1.5 no-print ${
                                topicNotes[topicKey]
                                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                                  : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                              title="Add or view study notes"
                            >
                              <StickyNote className="w-4 h-4" />
                              <span className="hidden sm:inline">Notes</span>
                            </button>
                          </div>

                          {/* Anti-Hallucination Safe Resource Links */}
                          {topic.resources && topic.resources.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {topic.resources.map((res, rIdx) => {
                                const safe = buildSafeResourceUrl(res.type, res.searchQuery, data.technology);
                                return (
                                  <a
                                    key={rIdx}
                                    href={safe.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3 text-indigo-500" />
                                    <span>{res.label}</span>
                                    <span className="text-[10px] text-slate-400">({safe.domainLabel})</span>
                                  </a>
                                );
                              })}
                            </div>
                          )}

                          {/* Inline Topic Study Notes Drawer */}
                          {isNotesOpen && (
                            <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60 space-y-2 no-print">
                              <label className="text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                                <StickyNote className="w-3.5 h-3.5 text-amber-500" />
                                Study Notes for: {topic.title}
                              </label>
                              <textarea
                                value={topicNotes[topicKey] || ""}
                                onChange={(e) => handleSaveNote(topicKey, e.target.value)}
                                placeholder="Write reminders, code snippets, or key takeaways..."
                                rows={3}
                                className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/80 bg-white/80 dark:bg-slate-900/80 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj, pIdx) => {
                const projectKey = `proj-${pIdx}`;
                const isDone = !!completedItems[projectKey];

                const badgeColors: Record<string, string> = {
                  beginner: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
                  intermediate: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
                  advanced: "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
                  capstone: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                };

                return (
                  <div
                    key={proj.title}
                    className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl border ${
                            badgeColors[proj.difficulty] || badgeColors.intermediate
                          }`}
                        >
                          {proj.difficulty} Tier
                        </span>
                        <button
                          onClick={() => toggleComplete(projectKey, "project")}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors no-print ${
                            isDone
                              ? "bg-emerald-500 text-white border-emerald-500"
                              : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isDone ? "Completed" : "Mark Built"}</span>
                        </button>
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Required Skills */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Skills Utilized:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Features to Build:</span>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {proj.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stretch Goals */}
                      {proj.stretchGoals && proj.stretchGoals.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            🌟 Stretch Goals:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                            {proj.stretchGoals.map((sg, sgIdx) => (
                              <li key={sgIdx} className="flex items-start gap-2">
                                <span className="text-amber-500">•</span>
                                <span>{sg}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: PRACTICE PROBLEMS */}
          {activeTab === "practice" && (
            <div className="space-y-4">
              {data.practiceProblems.map((prob, prIdx) => {
                const probKey = `prob-${prIdx}`;
                const isDone = !!completedItems[probKey];
                const diffColor =
                  prob.difficulty === "easy"
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800"
                    : prob.difficulty === "medium"
                    ? "text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800"
                    : "text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900";

                return (
                  <div
                    key={prob.title}
                    className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleComplete(probKey, "problem")}
                      className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className={`font-heading text-base font-bold ${isDone ? "line-through text-slate-400" : "text-slate-900 dark:text-white"}`}>
                          {prob.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {prob.topic}
                          </span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${diffColor}`}>
                            {prob.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-300">
                        💡 <strong>Hint:</strong> {prob.hint}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: INTERVIEW PREP */}
          {activeTab === "interview" && (
            <div className="space-y-4">
              {data.interviewQuestions.map((iq, iqIdx) => {
                const isRevealed = !!revealedAnswers[iqIdx];

                return (
                  <div
                    key={iq.question}
                    className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {iq.topic} • {iq.difficulty}
                        </span>

                        <button
                          onClick={() => setRevealedAnswers((prev) => ({ ...prev, [iqIdx]: !isRevealed }))}
                          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 no-print"
                        >
                          <span>{isRevealed ? "Hide Answer" : "Reveal Model Answer"}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {iq.question}
                      </h3>

                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pt-3 border-t border-slate-100 dark:border-slate-800"
                          >
                            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                                Expert Model Answer:
                              </span>
                              {iq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: WEEKLY SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.weeklySchedule.map((weekItem) => (
                  <div
                    key={weekItem.week}
                    className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          Week {weekItem.week}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {weekItem.hours} Hours
                        </span>
                      </div>

                      <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                        {weekItem.focus}
                      </h3>

                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                        {weekItem.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold">Share Your Learning Path</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Anyone with this link can view this curriculum, follow the timeline, and fork it into their own plan.
            </p>

            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex items-center justify-between gap-2">
              <span className="text-xs font-mono truncate text-slate-700 dark:text-slate-300">
                {typeof window !== "undefined" ? `${window.location.origin}/share/${pathId || "demo"}` : ""}
              </span>
              <button
                onClick={handleCopyShareLink}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-indigo-500 flex-shrink-0"
              >
                {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedShare ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <Compass className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
              <h3 className="font-heading text-lg font-bold">Loading PathForge Curriculum...</h3>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <ResultsContent />
    </React.Suspense>
  );
}
