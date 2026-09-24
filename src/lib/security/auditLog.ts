import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export async function logSecurityEvent(
  event: string,
  userId?: string | null,
  metadata?: Record<string, any>
) {
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const userAgent = headerList.get("user-agent") || "unknown";

    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        event,
        ipAddress,
        userAgent,
        metadataJson: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
