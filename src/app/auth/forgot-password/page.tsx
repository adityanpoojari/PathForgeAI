"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Secure anti-enumeration simulation: generic success state
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="w-full max-w-md space-y-6 relative">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px] shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
              PathForge<span className="text-indigo-500">AI</span>
            </span>
          </Link>
          <h1 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Reset your password
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Enter your email and we'll send you recovery instructions
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-indigo-950/5 space-y-5">
          {submitted ? (
            <div className="text-center space-y-3 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-white">
                Check your inbox
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If an account exists for <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>, you will receive password reset instructions shortly.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  Account Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Send Reset Link"}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/auth/login"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
