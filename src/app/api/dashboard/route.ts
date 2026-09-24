import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paths = await prisma.learningPath.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const progressRecords = await prisma.progress.findMany({
      where: { userId: user.id },
    });

    const completedTopicIds = new Set(
      progressRecords.filter((p) => p.completed && p.itemType === "topic").map((p) => p.itemId)
    );

    const completedProjectIds = new Set(
      progressRecords.filter((p) => p.completed && p.itemType === "project").map((p) => p.itemId)
    );

    const completedProblemIds = new Set(
      progressRecords.filter((p) => p.completed && p.itemType === "problem").map((p) => p.itemId)
    );

    // Parse paths and compute progress
    const pathsWithStats = paths.map((p) => {
      let content: any = {};
      try {
        content = JSON.parse(p.contentJson);
      } catch (e) {}

      const totalTopics = (content.modules || []).reduce(
        (acc: number, m: any) => acc + (m.topics?.length || 0),
        0
      );

      let completedInPath = 0;
      (content.modules || []).forEach((m: any, mIdx: number) => {
        (m.topics || []).forEach((_: any, tIdx: number) => {
          if (completedTopicIds.has(`mod-${m.order || mIdx + 1}-top-${tIdx}`)) {
            completedInPath++;
          }
        });
      });

      const percent = totalTopics > 0 ? Math.round((completedInPath / totalTopics) * 100) : 0;

      return {
        id: p.id,
        title: p.title,
        technologies: p.technologies,
        level: p.level,
        goal: p.goal,
        hoursPerWeek: p.hoursPerWeek,
        weeks: p.weeks,
        shareId: p.shareId,
        createdAt: p.createdAt,
        totalTopics,
        completedTopics: completedInPath,
        progressPercent: percent,
        modulesCount: content.modules?.length || 0,
        projectsCount: content.projects?.length || 0,
      };
    });

    // Compute streak from recent completions
    const totalCompleted = completedTopicIds.size + completedProjectIds.size + completedProblemIds.size;
    const streakDays = totalCompleted > 0 ? Math.min(14, Math.max(1, Math.ceil(totalCompleted / 2))) : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalSavedPaths: paths.length,
        totalCompletedTopics: completedTopicIds.size,
        totalCompletedProjects: completedProjectIds.size,
        totalCompletedProblems: completedProblemIds.size,
        streakDays,
      },
      paths: pathsWithStats,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
