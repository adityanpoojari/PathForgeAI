import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const savedPathsCount = await prisma.learningPath.count({
      where: { userId: user.id },
    });

    const completedTopicsCount = await prisma.progress.count({
      where: { userId: user.id, completed: true },
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        savedPathsCount,
        completedTopicsCount,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
