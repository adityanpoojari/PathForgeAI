import { NextResponse } from "next/server";
import { getCurrentUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { logSecurityEvent } from "@/lib/security/auditLog";
import prisma from "@/lib/db/prisma";

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ error: "Password confirmation required" }, { status: 400 });
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!fullUser || !fullUser.passwordHash) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await verifyPassword(password, fullUser.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }

    await logSecurityEvent("ACCOUNT_DELETED", user.id);

    // Delete user and cascade relations
    await prisma.user.delete({
      where: { id: user.id },
    });

    const response = NextResponse.json({ success: true, message: "Account deleted permanently" });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
