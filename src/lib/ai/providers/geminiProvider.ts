import { AIProvider } from "../types";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";
import { buildSystemPrompt, buildUserPrompt } from "../promptBuilder";

export class GeminiProvider implements AIProvider {
  id = "gemini";
  name = "Google Gemini (Free)";

  isConfigured(): boolean {
    return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0;
  }

  async generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(params);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.3,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${errText}`);
    }

    const jsonResponse = await res.json();
    const rawContent = jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      throw new Error("Empty response from Google Gemini");
    }

    const parsedJson = JSON.parse(rawContent);
    return LearningPathOutputSchema.parse(parsedJson);
  }
}
