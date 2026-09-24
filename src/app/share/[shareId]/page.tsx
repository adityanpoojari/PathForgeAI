import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LearningPathOutput } from "@/lib/types/roadmap";
import { buildSafeResourceUrl } from "@/lib/utils/resourceLinks";
import {
  Compass,
  Map,
  FolderGit2,
  CheckSquare,
  HelpCircle,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SharePageProps {
  params: Promise<{ shareId: string }> | { shareId: string };
}

export default async function SharePage({ params }: SharePageProps) {
  const resolved = await params;
  const shareId = resolved.shareId;

  const pathRecord = await prisma.learningPath.findFirst({
    where: {
      OR: [{ shareId }, { id: shareId }],
    },
    include: {
      user: { select: { name: true } },
    },
  });

  if (!pathRecord) {
    notFound();
  }

  let content: LearningPathOutput;
  try {
    content = JSON.parse(pathRecord.contentJson);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
                {content.technology}
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                {content.level}
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
                {content.goal}
              </span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {content.technology} Mastery: {content.goal}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.overview}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span>Curated for {pathRecord.weeks} Weeks ({pathRecord.hoursPerWeek} hrs/week)</span>
              <Link
                href={`/generate?tech=${encodeURIComponent(content.technology)}&level=${encodeURIComponent(content.level)}&goal=${encodeURIComponent(content.goal)}`}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fork & Customize This Path</span>
              </Link>
            </div>
          </div>

          {/* Modules Timeline */}
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-indigo-500" />
              <span>Curriculum Modules & Verified Topics</span>
            </h2>

            {content.modules.map((mod) => (
              <div
                key={mod.order}
                className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    Module {mod.order}: {mod.title}
                  </h3>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                    {mod.estimatedHours} Hours
                  </span>
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-indigo-500/20">
                  {mod.topics.map((t, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {t.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t.description}
                      </p>
                      {t.resources && t.resources.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {t.resources.map((res, rIdx) => {
                            const safe = buildSafeResourceUrl(res.type, res.searchQuery, content.technology);
                            return (
                              <a
                                key={rIdx}
                                href={safe.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>{res.label}</span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-500" />
              <span>Milestone Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {proj.difficulty}
                  </span>
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
