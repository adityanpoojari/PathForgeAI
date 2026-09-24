"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is PathForge AI truly 100% free to run?",
    a: "Yes! PathForge AI is engineered from the ground up to operate without paid services. It uses free-tier AI keys (Google Gemini, Groq, OpenRouter), local open-source Ollama models, and an offline curated template engine covering 30+ top technologies so it always works even with zero API keys.",
  },
  {
    q: "What happens if an AI provider hits a rate limit?",
    a: "PathForge features an automatic cascade fallback router. If Google Gemini experiences a rate limit or network glitch, the request automatically falls back to Groq, then OpenRouter, then local Ollama, and finally our pre-computed curated roadmap templates. Your request will never crash.",
  },
  {
    q: "How does PathForge prevent fake or broken (hallucinated) URLs?",
    a: "Unlike standard LLM interfaces that invent non-existent web links, our server-side engine explicitly forbids the AI from generating raw URLs. Instead, the AI provides semantic search queries, and our application constructs safe, verified links against an allowlist of official documentation domains (e.g. docs.oracle.com, react.dev, docs.python.org).",
  },
  {
    q: "Can I customize the weekly hours and schedule pace?",
    a: "Absolutely! The generator includes interactive sliders for available hours per week (5 to 40 hours) and total roadmap duration (2 to 24 weeks). The engine recalculates module distribution and weekly tasks to fit your exact availability.",
  },
  {
    q: "Do I have to create an account to generate a roadmap?",
    a: "No, guests can generate roadmaps immediately without logging in. Creating a free account lets you save unlimited learning paths to your personal dashboard, track completed topics & problems, add notes, and generate public share links.",
  },
  {
    q: "Can I export my learning path as a PDF?",
    a: "Yes! The results page includes a dedicated 'Export PDF / Print' feature powered by a custom CSS print stylesheet that cleans away navigation bars and renders a clean, professional multi-page document.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-6 lg:py-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Everything you need to know about our architecture, pacing, and zero-cost design.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="glass-panel rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
