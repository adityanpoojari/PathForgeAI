import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/db/prisma";

const SESSION_COOKIE_NAME = "pathforge_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecretKey(): string {
  return process.env.NEXTAUTH_SECRET || "default-insecure-secret-key-pathforge-32bytes";
}

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string | null;
  role: string;
  exp: number;
}

export function signToken(payload: Omit<SessionPayload, "exp">): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const fullPayload: SessionPayload = { ...payload, exp };
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, providedSignature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", getSecretKey())
      .update(encodedPayload)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(providedSignature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  name: string | null;
  role: string;
} | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    return user;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
