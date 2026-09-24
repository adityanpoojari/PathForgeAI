import { GeneratePathParams, LearningPathOutput } from "@/lib/types/roadmap";

export interface AIProvider {
  id: string;
  name: string;
  isConfigured(): boolean;
  generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput>;
}

export interface GenerationResult {
  data: LearningPathOutput;
  providerUsed: string;
  cached: boolean;
}
