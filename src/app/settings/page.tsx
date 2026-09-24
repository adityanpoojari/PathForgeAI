"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Settings,
  Lock,
  Download,
  Trash2,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  // Delete account state
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/auth/login?redirect=/settings");
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(false);
    setSavingPass(true);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPassError(data.error || "Failed to update password");
        setSavingPass(false);
        return;
      }
      setPassSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setSavingPass(false);
    } catch {
      setPassError("Network error. Please try again.");
      setSavingPass(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    try {
      const res = await fetch("/api/user/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.error || "Failed to delete account");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setDeleteError("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <h3 className="font-heading text-lg font-bold">Loading Settings...</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Account Settings & Security
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Manage your credentials, view active zero-cost AI engines, and export data.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              <span>Profile Information</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs">Full Name</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">{user?.name || "Not set"}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs">Email Address</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">{user?.email}</div>
              </div>
            </div>
          </div>

          {/* AI Engine & Providers Architecture Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-500" />
              <span>Zero-Cost AI Provider Hierarchy</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              PathForge AI evaluates providers in cascading order. If one reaches rate limits, the next automatically takes over.
            </p>

            <div className="space-y-2.5">
              {[
                { name: "Google Gemini 1.5 Flash", desc: "Free Google AI Studio Key (Primary)", status: "Active" },
                { name: "Groq Cloud (Llama 3.1)", desc: "Free Tier Ultra-Fast (Fallback 1)", status: "Standby" },
                { name: "OpenRouter Free Models", desc: "Zero-cost models ending in :free (Fallback 2)", status: "Standby" },
                { name: "Ollama Local (Offline)", desc: "Local open-source server at localhost:11434 (Fallback 3)", status: "Standby" },
                { name: "Curated Roadmap Templates", desc: "Top 30 technologies pre-computed (100% Reliable Offline Fallback)", status: "Ready" },
              ].map((prov, i) => (
                <div
                  key={prov.name}
                  className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">#{i + 1}</span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{prov.name}</span>
                      <span className="text-slate-400 block text-[11px]">{prov.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {prov.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Change Password Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              <span>Change Password</span>
            </h2>

            {passError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Password updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  New Password (min 8 chars, uppercase & number)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={savingPass}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                {savingPass ? "Saving..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Data Export & Danger Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Export data */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Export My Data</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Download a complete JSON export of your saved roadmaps, topic notes, and progress records.
                </p>
              </div>

              <a
                href="/api/user/export-data"
                download
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download JSON Export</span>
              </a>
            </div>

            {/* Danger Zone */}
            <div className="glass-panel p-6 rounded-3xl border border-rose-200/60 dark:border-rose-950/60 bg-rose-50/20 dark:bg-rose-950/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-heading text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Permanently delete your profile and all associated learning paths. This action is irreversible.
                </p>
              </div>

              {showDeleteConfirm ? (
                <div className="space-y-2">
                  {deleteError && <p className="text-xs text-rose-600">{deleteError}</p>}
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter password to confirm"
                    className="w-full px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-white/80 dark:bg-slate-900 text-xs"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
                >
                  Delete My Account
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
