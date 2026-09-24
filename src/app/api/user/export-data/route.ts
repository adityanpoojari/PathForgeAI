import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        learningPaths: true,
        progressRecords: true,
        notes: true,
      },
    });

    const exportPayload = {
      exportTimestamp: new Date().toISOString(),
      user: fullUser,
    };

    return new NextResponse(JSON.stringify(exportPayload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="pathforge-data-${user.id}.json"`,
      },
    });
  } catch (error) {
    console.error("Export data error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
