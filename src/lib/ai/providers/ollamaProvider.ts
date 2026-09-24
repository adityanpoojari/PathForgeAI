import { AIProvider } from "../types";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";
import { buildSystemPrompt, buildUserPrompt } from "../promptBuilder";

export class OllamaProvider implements AIProvider {
  id = "ollama";
  name = "Ollama Local (Offline & Free)";

  isConfigured(): boolean {
    // Available if host configured, defaults to localhost:11434
    return true;
  }

  async generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput> {
    const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "llama3.1";
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(params);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          format: "json",
          stream: false,
        }),
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Ollama offline or model missing (${res.status})`);
      }

      const json = await res.json();
      const content = json.response;
      if (!content) {
        throw new Error("Empty response from Ollama");
      }

      const parsedJson = JSON.parse(content);
      return LearningPathOutputSchema.parse(parsedJson);
    } catch (error: any) {
      clearTimeout(timeout);
      throw new Error(`Ollama local provider failed: ${error.message}`);
    }
  }
}
