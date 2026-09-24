import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to save paths to your dashboard" }, { status: 401 });
    }

    const { pathId } = await req.json();
    if (!pathId) {
      return NextResponse.json({ error: "Missing pathId" }, { status: 400 });
    }

    const existing = await prisma.learningPath.findUnique({
      where: { id: pathId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Learning path not found" }, { status: 404 });
    }

    // Associate with user
    const updated = await prisma.learningPath.update({
      where: { id: pathId },
      data: { userId: user.id },
    });

    return NextResponse.json({ success: true, message: "Path saved to your dashboard!", path: updated });
  } catch (error) {
    console.error("Save path error:", error);
    return NextResponse.json({ error: "Failed to save path" }, { status: 500 });
  }
}
