import React from "react";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center font-bold">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black text-slate-900 dark:text-white">
            404
          </h1>
          <h2 className="font-heading text-lg font-bold text-slate-800 dark:text-slate-200">
            Roadmap Path Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            The learning path or page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/generate"
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            Forge a New Path
          </Link>
        </div>
      </div>
    </div>
  );
}
