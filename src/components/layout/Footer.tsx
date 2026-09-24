import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Heart, Github, Twitter, Terminal, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center">
                  <Compass className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                PathForge<span className="text-indigo-500">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Personalized, multi-dimensional AI learning curricula tailored to your schedule, stack, and career goals.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Free-to-Run Architecture</span>
            </div>
          </div>

          {/* Column 1: Generator & Stacks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Curricula & Stacks
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/generate?tech=Java&level=Beginner&goal=Software+Developer" className="hover:text-indigo-500 transition-colors">
                  Java + Software Dev
                </Link>
              </li>
              <li>
                <Link href="/generate?tech=Python&level=Intermediate&goal=Data+Scientist" className="hover:text-indigo-500 transition-colors">
                  Python + Data Scientist
                </Link>
              </li>
              <li>
                <Link href="/generate?tech=React&level=Beginner&goal=Frontend+Developer" className="hover:text-indigo-500 transition-colors">
                  React + Frontend
                </Link>
              </li>
              <li>
                <Link href="/generate?tech=Docker&level=Beginner&goal=DevOps%2FCloud+Engineer" className="hover:text-indigo-500 transition-colors">
                  Docker + DevOps
                </Link>
              </li>
              <li>
                <Link href="/generate?tech=DSA&level=Intermediate&goal=Placement%2FInterview+Prep" className="hover:text-indigo-500 transition-colors">
                  DSA + Placement Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/generate" className="hover:text-indigo-500 transition-colors">
                  Path Generator
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-500 transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-500 transition-colors">
                  About & Architecture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-500 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Security & Policy
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-indigo-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="/security.txt" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>security.txt</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} PathForge AI. Released under MIT License for all developers.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> for lifelong learners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
