import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { signToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { logSecurityEvent } from "@/lib/security/auditLog";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address").max(100),
  password: z.string().min(1, "Password is required").max(128),
});

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password format." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // Rate limit: 8 login attempts per 15 minutes per IP/email
    const rateCheck = await checkRateLimit(`login:${ip}:${normalizedEmail}`, 8, 900);
    if (!rateCheck.allowed) {
      await logSecurityEvent("LOGIN_LOCKED_OUT", null, { ip, email: normalizedEmail });
      return NextResponse.json(
        { error: "Too many failed attempts. Account temporarily locked for 15 minutes." },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.passwordHash) {
      await logSecurityEvent("LOGIN_FAILED", null, { ip, email: normalizedEmail, reason: "NOT_FOUND" });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      await logSecurityEvent("LOGIN_FAILED", user.id, { ip, email: normalizedEmail, reason: "BAD_PASSWORD" });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await logSecurityEvent("LOGIN_SUCCESS", user.id, { ip, email: normalizedEmail });

    // Generate signed session token
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: "Login successful",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
