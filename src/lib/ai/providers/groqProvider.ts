import { AIProvider } from "../types";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";
import { buildSystemPrompt, buildUserPrompt } from "../promptBuilder";

export class GroqProvider implements AIProvider {
  id = "groq";
  name = "Groq Cloud (Free)";

  isConfigured(): boolean {
    return !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim().length > 0;
  }

  async generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(params);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
      throw new Error(`Groq API error (${res.status}): ${errText}`);
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from Groq");
    }

    const parsedJson = JSON.parse(content);
    return LearningPathOutputSchema.parse(parsedJson);
  }
}
