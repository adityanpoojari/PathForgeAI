"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Compass,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Flame,
  FolderGit2,
  Layers,
  ArrowRight,
  Plus,
  Share2,
  Clock,
  Calendar,
  AlertCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check auth status
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((authData) => {
        if (!authData.authenticated) {
          router.push("/auth/login?redirect=/dashboard");
          return;
        }
        setUser(authData.user);

        // Fetch dashboard data
        return fetch("/api/dashboard");
      })
      .then((res) => res?.json())
      .then((dashData) => {
        if (dashData?.success) {
          setData(dashData);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <Compass className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
            <h3 className="font-heading text-lg font-bold">Loading Your Learning Dashboard...</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = data?.stats || {
    totalSavedPaths: 0,
    totalCompletedTopics: 0,
    totalCompletedProjects: 0,
    streakDays: 0,
  };

  const paths = data?.paths || [];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back, {user?.name || "Developer"} 👋
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Track your active curricula, check milestone completions, and maintain your learning streak.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
              <Link
                href="/generate"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Path</span>
              </Link>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                <span>Active Paths</span>
                <BookOpen className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {stats.totalSavedPaths}
              </div>
              <div className="text-[11px] text-slate-400">Total curricula enrolled</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                <span>Topics Mastered</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {stats.totalCompletedTopics}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified concepts</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                <span>Projects Built</span>
                <FolderGit2 className="w-4 h-4 text-purple-500" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {stats.totalCompletedProjects}
              </div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Portfolio milestone</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                <span>Learning Streak</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                {stats.streakDays} Days 🔥
              </div>
              <div className="text-[11px] text-slate-400">Keep momentum alive</div>
            </div>
          </div>

          {/* Enrolled Curricula Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                My Learning Curricula
              </h2>
              <span className="text-xs text-slate-500">
                {paths.length} {paths.length === 1 ? "Path" : "Paths"}
              </span>
            </div>

            {paths.length === 0 ? (
              <div className="glass-panel p-10 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
                <Compass className="w-10 h-10 text-indigo-400 mx-auto" />
                <h3 className="font-heading text-lg font-bold">No Learning Paths Saved Yet</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Generate your first multi-dimensional roadmap to start tracking your daily progress and projects.
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-500"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Your First Path</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paths.map((p: any) => (
                  <div
                    key={p.id}
                    className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-5 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {p.technologies}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {p.hoursPerWeek} hrs/wk • {p.weeks} wks
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Goal: {p.goal}</span>
                        <span>•</span>
                        <span>Level: {p.level}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                            {p.completedTopics} of {p.totalTopics} Topics
                          </span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {p.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${p.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <Link
                        href={`/share/${p.shareId || p.id}`}
                        target="_blank"
                        className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Public Link</span>
                      </Link>

                      <Link
                        href={`/results?id=${p.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <span>Resume Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
