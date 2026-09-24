import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolved = await params;
    const id = resolved.id;

    const pathRecord = await prisma.learningPath.findFirst({
      where: {
        OR: [{ id }, { shareId: id }],
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    if (!pathRecord) {
      return NextResponse.json({ error: "Learning path not found" }, { status: 404 });
    }

    const content = JSON.parse(pathRecord.contentJson);

    // Get progress records if logged in
    const user = await getCurrentUser();
    let progressRecords: any[] = [];
    let notes: any[] = [];

    if (user) {
      if (!pathRecord.userId) {
        await prisma.learningPath.update({
          where: { id: pathRecord.id },
          data: { userId: user.id },
        });
      }
      progressRecords = await prisma.progress.findMany({
        where: { userId: user.id, learningPathId: pathRecord.id },
      });
      notes = await prisma.note.findMany({
        where: { userId: user.id, learningPathId: pathRecord.id },
      });
    }

    return NextResponse.json({
      success: true,
      path: {
        id: pathRecord.id,
        title: pathRecord.title,
        technologies: pathRecord.technologies,
        level: pathRecord.level,
        goal: pathRecord.goal,
        hoursPerWeek: pathRecord.hoursPerWeek,
        weeks: pathRecord.weeks,
        visibility: pathRecord.visibility,
        shareId: pathRecord.shareId,
        createdAt: pathRecord.createdAt,
        content,
      },
      progress: progressRecords,
      notes,
      isOwner: user?.id === pathRecord.userId,
      isAuthenticated: !!user,
    });
  } catch (error) {
    console.error("Get path by id error:", error);
    return NextResponse.json({ error: "Failed to load learning path" }, { status: 500 });
  }
}
