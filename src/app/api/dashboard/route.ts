import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progressRecords = await prisma.progress.findMany({
      where: { userId: user.id },
    });

    const userProgressPathIds = Array.from(new Set(progressRecords.map((pr) => pr.learningPathId)));

    const paths = await prisma.learningPath.findMany({
      where: {
        OR: [
          { userId: user.id },
          { id: { in: userProgressPathIds } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    // Group progress records strictly by learningPathId
    const progressByPath = new Map<string, Set<string>>();
    const allCompletedTopicKeys = new Set<string>();
    const allCompletedProjectKeys = new Set<string>();
    const allCompletedProblemKeys = new Set<string>();

    progressRecords.forEach((pr) => {
      if (!pr.completed || pr.itemId === "enrolled") return;
      const globalKey = `${pr.learningPathId}:${pr.itemId}`;
      if (pr.itemType === "topic") {
        allCompletedTopicKeys.add(globalKey);
        if (!progressByPath.has(pr.learningPathId)) {
          progressByPath.set(pr.learningPathId, new Set());
        }
        progressByPath.get(pr.learningPathId)!.add(pr.itemId);
      } else if (pr.itemType === "project") {
        allCompletedProjectKeys.add(globalKey);
      } else if (pr.itemType === "problem") {
        allCompletedProblemKeys.add(globalKey);
      }
    });

    // Parse paths and compute progress per path
    const pathsWithStats = paths.map((p) => {
      let content: any = {};
      try {
        content = JSON.parse(p.contentJson);
      } catch (e) {}

      const totalTopics = (content.modules || []).reduce(
        (acc: number, m: any) => acc + (m.topics?.length || 0),
        0
      );

      const pathCompletedTopics = progressByPath.get(p.id) || new Set();
      let completedInPath = 0;
      (content.modules || []).forEach((m: any, mIdx: number) => {
        (m.topics || []).forEach((_: any, tIdx: number) => {
          const topicKey = `mod-${m.order || mIdx + 1}-top-${tIdx}`;
          if (pathCompletedTopics.has(topicKey)) {
            completedInPath++;
          }
        });
      });

      const percent = totalTopics > 0 
        ? Math.min(100, Math.round((completedInPath / totalTopics) * 100)) 
        : 0;

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

    // Compute streak from total completed items across all paths
    const totalCompleted = allCompletedTopicKeys.size + allCompletedProjectKeys.size + allCompletedProblemKeys.size;
    const streakDays = totalCompleted > 0 ? Math.min(14, Math.max(1, Math.ceil(totalCompleted / 2))) : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalSavedPaths: paths.length,
        totalCompletedTopics: allCompletedTopicKeys.size,
        totalCompletedProjects: allCompletedProjectKeys.size,
        totalCompletedProblems: allCompletedProblemKeys.size,
        streakDays,
      },
      paths: pathsWithStats,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
