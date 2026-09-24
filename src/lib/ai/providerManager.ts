import { AIProvider, GenerationResult } from "./types";
import { GeneratePathParams, LearningPathOutput } from "@/lib/types/roadmap";
import { GeminiProvider } from "./providers/geminiProvider";
import { GroqProvider } from "./providers/groqProvider";
import { OpenRouterProvider } from "./providers/openrouterProvider";
import { OllamaProvider } from "./providers/ollamaProvider";
import { TemplateProvider } from "./providers/templateProvider";

export class ProviderManager {
  private providers: AIProvider[];

  constructor() {
    this.providers = [
      new GeminiProvider(),
      new GroqProvider(),
      new OpenRouterProvider(),
      new OllamaProvider(),
      new TemplateProvider(), // Final reliable fallback
    ];
  }

  getOrderedProviders(): AIProvider[] {
    const preferredPrimary = process.env.AI_PRIMARY_PROVIDER || "gemini";
    const primary = this.providers.find((p) => p.id === preferredPrimary);

    if (!primary) return this.providers;

    const remaining = this.providers.filter((p) => p.id !== preferredPrimary);
    return [primary, ...remaining];
  }

  async generateWithFallback(params: GeneratePathParams): Promise<GenerationResult> {
    const ordered = this.getOrderedProviders();
    const errors: { provider: string; error: string }[] = [];

    for (const provider of ordered) {
      if (!provider.isConfigured() && provider.id !== "template") {
        continue;
      }

      // Try once, retry once if parse error
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`[AI ProviderManager] Attempting provider: ${provider.name} (attempt ${attempt})`);
          const roadmap = await provider.generateRoadmap(params);
          console.log(`[AI ProviderManager] Successfully generated roadmap using: ${provider.name}`);

          return {
            data: roadmap,
            providerUsed: provider.name,
            cached: false,
          };
        } catch (err: any) {
          const errMsg = err?.message || String(err);
          console.warn(`[AI ProviderManager] Provider ${provider.name} attempt ${attempt} failed: ${errMsg}`);

          if (attempt === 2 || provider.id === "template") {
            errors.push({ provider: provider.name, error: errMsg });
          }
        }
      }
    }

    // Ultimate fallback: Template Provider
    console.log("[AI ProviderManager] All providers exhausted. Falling back to built-in Template Engine.");
    const fallbackTemplate = new TemplateProvider();
    const result = await fallbackTemplate.generateRoadmap(params);

    return {
      data: result,
      providerUsed: "Curated Template Engine (Automatic Fallback)",
      cached: false,
    };
  }
}

export const providerManager = new ProviderManager();
