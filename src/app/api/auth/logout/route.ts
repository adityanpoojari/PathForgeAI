import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getCurrentUser } from "@/lib/auth/session";
import { logSecurityEvent } from "@/lib/security/auditLog";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) {
      await logSecurityEvent("LOGOUT", user.id);
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
