import { AIProvider } from "../types";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";
import { buildSystemPrompt, buildUserPrompt } from "../promptBuilder";

export class OpenRouterProvider implements AIProvider {
  id = "openrouter";
  name = "OpenRouter (Free Models)";

  isConfigured(): boolean {
    return !!process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim().length > 0;
  }

  async generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free";
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(params);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://pathforge.ai",
        "X-Title": "PathForge AI",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenRouter API error (${res.status}): ${errText}`);
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from OpenRouter");
    }

    const parsedJson = JSON.parse(content);
    return LearningPathOutputSchema.parse(parsedJson);
  }
}
