import { z } from "zod";

const SUSPICIOUS_PROMPT_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /disregard\s+(all\s+)?(previous|prior)/i,
  /you\s+are\s+now\s+in\s+developer\s+mode/i,
  /system\s+prompt\s+override/i,
  /reveal\s+your\s+(api\s+key|system\s+prompt|secret)/i,
  /print\s+environment\s+variables/i,
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript:/i,
];

export function sanitizeUserInput(input: string, maxLength = 100): string {
  if (!input) return "";

  // Strip control characters and HTML tags
  let cleaned = input.replace(/[<>]/g, "").trim();

  // Cap length
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  // Check for suspicious injection patterns
  for (const pattern of SUSPICIOUS_PROMPT_PATTERNS) {
    if (pattern.test(cleaned)) {
      throw new Error("Invalid or prohibited characters detected in technology/goal inputs.");
    }
  }

  return cleaned;
}

export const GeneratePathRequestSchema = z.object({
  technologies: z.array(z.string().min(1).max(80)).min(1).max(10),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  goal: z.string().min(2).max(100),
  hoursPerWeek: z.number().int().min(2).max(80).default(10),
  durationWeeks: z.number().int().min(1).max(52).default(8),
});

export type GeneratePathRequest = z.infer<typeof GeneratePathRequestSchema>;
