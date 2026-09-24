import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { logSecurityEvent } from "@/lib/security/auditLog";
import { sanitizeUserInput, GeneratePathRequestSchema } from "@/lib/security/sanitize";
import { computeRequestHash, getCachedRoadmap } from "@/lib/ai/cache";
import { providerManager } from "@/lib/ai/providerManager";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const user = await getCurrentUser();

    // 1. Parse & Sanitize Input
    const body = await req.json();
    const rawParsed = GeneratePathRequestSchema.safeParse(body);
    if (!rawParsed.success) {
      return NextResponse.json(
        { error: rawParsed.error.errors[0]?.message || "Invalid request parameters" },
        { status: 400 }
      );
    }

    const { level, hoursPerWeek, durationWeeks } = rawParsed.data;

    // Defense against prompt injection
    const sanitizedTechs = rawParsed.data.technologies.map((t) => sanitizeUserInput(t, 60));
    const sanitizedGoal = sanitizeUserInput(rawParsed.data.goal, 80);

    const params = {
      technologies: sanitizedTechs,
      level,
      goal: sanitizedGoal,
      hoursPerWeek,
      durationWeeks,
    };

    // 2. Cache Deduplication Check (Zero Cost Instant - saves user quota)
    const hash = computeRequestHash(params);
    const cached = await getCachedRoadmap(hash);

    if (cached) {
      console.log(`[Cache Hit] Returning cached roadmap for hash: ${hash.slice(0, 10)}...`);

      // Auto-save to dashboard for logged-in users
      if (user) {
        try {
          const existingPath = await prisma.learningPath.findUnique({
            where: { id: cached.pathId },
          });
          if (existingPath && !existingPath.userId) {
            await prisma.learningPath.update({
              where: { id: cached.pathId },
              data: { userId: user.id },
            });
          } else if (existingPath && existingPath.userId !== user.id) {
            await prisma.progress.upsert({
              where: {
                userId_learningPathId_itemId: {
                  userId: user.id,
                  learningPathId: cached.pathId,
                  itemId: "enrolled",
                },
              },
              update: {},
              create: {
                userId: user.id,
                learningPathId: cached.pathId,
                itemId: "enrolled",
                itemType: "topic",
                completed: false,
              },
            });
          }
        } catch (e) {
          console.error("Auto-save cached path error:", e);
        }
      }

      return NextResponse.json({
        success: true,
        data: cached.output,
        pathId: cached.pathId,
        shareId: cached.shareId,
        cached: true,
        providerUsed: "Cache (Zero Cost Instant)",
      });
    }

    // 3. Rate Limiting Check (only for new generations)
    const isAuth = !!user;
    const limit = isAuth
      ? parseInt(process.env.RATE_LIMIT_USER_DAILY || "15", 10)
      : parseInt(process.env.RATE_LIMIT_GUEST_DAILY || "5", 10);
    const rateKey = isAuth ? `generate:user:${user.id}` : `generate:ip:${ip}`;

    // 24-hour window (86400 seconds)
    const rateCheck = await checkRateLimit(rateKey, limit, 86400);
    if (!rateCheck.allowed) {
      await logSecurityEvent("RATE_LIMIT_EXCEEDED", user?.id || null, {
        endpoint: "/api/generate-path",
        ip,
        isAuth,
      });

      return NextResponse.json(
        {
          error: `Daily generation quota reached (${limit} per day). Please try again tomorrow or upgrade by signing in.`,
          quotaExceeded: true,
          resetAt: rateCheck.resetAt,
        },
        { status: 429 }
      );
    }

    // 4. Generate via AI Provider Hierarchy with Cascading Fallback
    const genResult = await providerManager.generateWithFallback(params);

    // 5. Persist to Database for Fast Caching & Relational Progress Tracking
    const title = `${params.technologies.join(" + ")} Mastery: ${params.goal}`;
    const newPath = await prisma.learningPath.create({
      data: {
        userId: user?.id || null,
        title,
        technologies: params.technologies.join(", "),
        level: params.level,
        goal: params.goal,
        hoursPerWeek: params.hoursPerWeek,
        weeks: params.durationWeeks,
        requestHash: hash,
        contentJson: JSON.stringify(genResult.data),
        visibility: "public",
      },
    });

    // Seed relational modules, topics, and projects in background
    try {
      for (const mod of genResult.data.modules) {
        const createdMod = await prisma.module.create({
          data: {
            learningPathId: newPath.id,
            order: mod.order,
            title: mod.title,
            estimatedHours: mod.estimatedHours,
          },
        });

        for (const top of mod.topics) {
          await prisma.topic.create({
            data: {
              moduleId: createdMod.id,
              title: top.title,
              description: top.description,
              resourcesJson: JSON.stringify(top.resources || []),
            },
          });
        }
      }

      for (const proj of genResult.data.projects) {
        await prisma.project.create({
          data: {
            learningPathId: newPath.id,
            title: proj.title,
            difficulty: proj.difficulty,
            description: proj.description,
            skillsJson: JSON.stringify(proj.skills || []),
            featuresJson: JSON.stringify(proj.features || []),
            stretchGoalsJson: JSON.stringify(proj.stretchGoals || []),
          },
        });
      }

      for (const prob of genResult.data.practiceProblems) {
        await prisma.practiceProblem.create({
          data: {
            learningPathId: newPath.id,
            title: prob.title,
            difficulty: prob.difficulty,
            topic: prob.topic,
            hint: prob.hint,
          },
        });
      }

      for (const q of genResult.data.interviewQuestions) {
        await prisma.interviewQuestion.create({
          data: {
            learningPathId: newPath.id,
            question: q.question,
            answer: q.answer,
            difficulty: q.difficulty,
            topic: q.topic,
          },
        });
      }

      for (const item of genResult.data.weeklySchedule) {
        await prisma.weeklyPlan.create({
          data: {
            learningPathId: newPath.id,
            week: item.week,
            focus: item.focus,
            tasksJson: JSON.stringify(item.tasks || []),
            hours: item.hours,
          },
        });
      }
    } catch (relError) {
      console.warn("Relational tables write warning (JSON cached successfully):", relError);
    }

    // 6. Log Audit Event
    await logSecurityEvent("PATH_GENERATED", user?.id || null, {
      tech: params.technologies.join(","),
      goal: params.goal,
      provider: genResult.providerUsed,
      pathId: newPath.id,
    });

    return NextResponse.json({
      success: true,
      data: genResult.data,
      pathId: newPath.id,
      shareId: newPath.shareId,
      cached: false,
      providerUsed: genResult.providerUsed,
    });
  } catch (error: any) {
    console.error("Path generation route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate learning path. Please try again." },
      { status: 500 }
    );
  }
}
