"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-6 lg:py-10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 text-center overflow-hidden border border-indigo-200/50 dark:border-indigo-900/50 shadow-xl shadow-indigo-500/10">
          {/* Glowing backdrop */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="relative space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ready in 5 seconds • No credit card required</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Start Your Personalized Learning Journey Today
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of developers turning abstract career aspirations into concrete, week-by-week actionable execution plans.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/generate"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Forge My Path Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#technologies"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                Browse 60+ Technologies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
