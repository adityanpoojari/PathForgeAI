"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, TECHNOLOGIES, TechnologyItem } from "@/data/technologies";
import {
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  BrainCircuit,
  Cloud,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  BrainCircuit,
  Cloud,
  Cpu,
  ShieldCheck,
};

export function TechShowcase() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("languages");

  const filteredTechs = TECHNOLOGIES.filter(
    (t) => t.category === activeCategory
  );

  const handleTechClick = (tech: TechnologyItem) => {
    const goal = tech.relatedGoals[0] || "Software Developer";
    const query = new URLSearchParams({
      tech: tech.name,
      level: "Beginner",
      goal: goal,
    }).toString();
    router.push(`/generate?${query}`);
  };

  return (
    <section id="technologies" className="py-6 lg:py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Over 60+ Technologies Supported</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curated Catalog Across All Major Domains
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Click any technology to pre-fill the generator and blueprint your career path.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Code2;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                    : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredTechs.map((tech) => (
              <button
                key={tech.id}
                onClick={() => handleTechClick(tech)}
                className="text-left glass-panel p-5 rounded-2xl hover:border-indigo-500/60 dark:hover:border-indigo-400/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                      <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tech.name}
                      </h3>
                    </div>
                    {tech.popular && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Goal: {tech.relatedGoals[0]}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Forge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
