import crypto from "crypto";
import prisma from "@/lib/db/prisma";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";

export function computeRequestHash(params: GeneratePathParams): string {
  const normalizedTech = [...params.technologies]
    .map((t) => t.trim().toLowerCase())
    .sort()
    .join(",");
  const normalizedLevel = params.level.trim().toLowerCase();
  const normalizedGoal = params.goal.trim().toLowerCase();

  const rawKey = `${normalizedTech}:${normalizedLevel}:${normalizedGoal}:${params.hoursPerWeek}:${params.durationWeeks}`;
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

export async function getCachedRoadmap(
  hash: string
): Promise<{ output: LearningPathOutput; pathId: string; shareId: string } | null> {
  try {
    const existing = await prisma.learningPath.findUnique({
      where: { requestHash: hash },
    });

    if (!existing) return null;

    const parsedJson = JSON.parse(existing.contentJson);
    const validated = LearningPathOutputSchema.parse(parsedJson);

    return {
      output: validated,
      pathId: existing.id,
      shareId: existing.shareId,
    };
  } catch (error) {
    console.warn("Failed to retrieve or parse cached roadmap:", error);
    return null;
  }
}
