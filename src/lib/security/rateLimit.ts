import prisma from "@/lib/db/prisma";

// In-memory cache to reduce database round-trips
const memoryCache = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  limit: number;
}

/**
 * Checks and increments rate limit for a given key within windowSeconds.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const resetTimeMs = now + windowSeconds * 1000;

  // 1. Fast in-memory check
  const mem = memoryCache.get(key);
  if (mem && mem.resetAt > now) {
    if (mem.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(mem.resetAt),
        limit,
      };
    }
  }

  // 2. Database persistent check
  try {
    const existing = await prisma.rateLimitRecord.findUnique({
      where: { key },
    });

    if (existing && existing.resetAt > new Date(now)) {
      if (existing.count >= limit) {
        memoryCache.set(key, { count: existing.count, resetAt: existing.resetAt.getTime() });
        return {
          allowed: false,
          remaining: 0,
          resetAt: existing.resetAt,
          limit,
        };
      }

      const updated = await prisma.rateLimitRecord.update({
        where: { key },
        data: { count: { increment: 1 } },
      });

      memoryCache.set(key, { count: updated.count, resetAt: updated.resetAt.getTime() });
      return {
        allowed: true,
        remaining: Math.max(0, limit - updated.count),
        resetAt: updated.resetAt,
        limit,
      };
    }

    // Window expired or new key
    const newResetDate = new Date(resetTimeMs);
    const created = await prisma.rateLimitRecord.upsert({
      where: { key },
      update: {
        count: 1,
        resetAt: newResetDate,
      },
      create: {
        key,
        count: 1,
        resetAt: newResetDate,
      },
    });

    memoryCache.set(key, { count: 1, resetAt: resetTimeMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: newResetDate,
      limit,
    };
  } catch (error) {
    // Graceful fallback to memory on DB hiccup so service remains uninterrupted
    console.warn("Database rate limit fallback to memory:", error);
    const cur = memoryCache.get(key) || { count: 0, resetAt: resetTimeMs };
    if (cur.resetAt <= now) {
      cur.count = 1;
      cur.resetAt = resetTimeMs;
    } else {
      cur.count += 1;
    }
    memoryCache.set(key, cur);

    return {
      allowed: cur.count <= limit,
      remaining: Math.max(0, limit - cur.count),
      resetAt: new Date(cur.resetAt),
      limit,
    };
  }
}
