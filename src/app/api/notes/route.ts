import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const NoteSchema = z.object({
  learningPathId: z.string(),
  topicId: z.string(),
  content: z.string().max(2000),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = NoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { learningPathId, topicId, content } = parsed.data;

    const note = await prisma.note.upsert({
      where: {
        userId_learningPathId_topicId: {
          userId: user.id,
          learningPathId,
          topicId,
        },
      },
      update: { content },
      create: {
        userId: user.id,
        learningPathId,
        topicId,
        content,
      },
    });

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error("Save note error:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
