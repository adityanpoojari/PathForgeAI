import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const ToggleSchema = z.object({
  learningPathId: z.string(),
  itemId: z.string(),
  itemType: z.enum(["topic", "project", "problem"]),
  completed: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ToggleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { learningPathId, itemId, itemType, completed } = parsed.data;

    const record = await prisma.progress.upsert({
      where: {
        userId_learningPathId_itemId: {
          userId: user.id,
          learningPathId,
          itemId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        learningPathId,
        itemId,
        itemType,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, progress: record });
  } catch (error) {
    console.error("Progress toggle error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
