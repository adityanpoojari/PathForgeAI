import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 font-mono">Last updated: September 2026</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                1. Educational Nature of Service
              </h2>
              <p>
                PathForge AI generates curricula and educational suggestions for software developers. Curricula are provided as guidance for personal and professional development and should always be verified against official language and framework documentation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                2. Acceptable Use
              </h2>
              <p>
                Users agree not to attempt to bypass rate limits, perform prompt injection attacks, reverse-engineer proprietary security filters, or submit automated malicious denial-of-service traffic.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                3. Open Source & Zero-Cost Model
              </h2>
              <p>
                PathForge AI is provided free of charge under the MIT License. No fees or subscription charges are required for any standard functionality.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
