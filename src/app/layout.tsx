import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "PathForge AI | AI Learning Path Generator",
  description:
    "Generate personalized, multi-dimensional learning paths with topics, hands-on projects, practice problems, interview prep, and weekly schedules for any tech stack.",
  keywords: [
    "AI learning path",
    "roadmap generator",
    "career roadmap",
    "developer learning plan",
    "coding interview prep",
  ],
  authors: [{ name: "PathForge AI Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fontHeading.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
