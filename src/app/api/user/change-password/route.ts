import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { verifyPassword, hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { logSecurityEvent } from "@/lib/security/auditLog";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ChangePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid password format" }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!fullUser || !fullUser.passwordHash) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validCurrent = await verifyPassword(currentPassword, fullUser.passwordHash);
    if (!validCurrent) {
      await logSecurityEvent("PASSWORD_CHANGE_FAILED", user.id, { reason: "BAD_CURRENT_PASSWORD" });
      return NextResponse.json({ error: "Current password does not match" }, { status: 400 });
    }

    const passCheck = validatePasswordStrength(newPassword);
    if (!passCheck.valid) {
      return NextResponse.json({ error: passCheck.message }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    });

    await logSecurityEvent("PASSWORD_CHANGED_SUCCESS", user.id);

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
