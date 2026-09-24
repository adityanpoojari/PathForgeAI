import { AIProvider } from "../types";
import { GeneratePathParams, LearningPathOutput, LearningPathOutputSchema } from "@/lib/types/roadmap";

import javaData from "@/data/roadmaps/java.json";
import pythonData from "@/data/roadmaps/python.json";
import reactData from "@/data/roadmaps/react.json";
import dockerData from "@/data/roadmaps/docker.json";
import dsaData from "@/data/roadmaps/dsa.json";
import defaultData from "@/data/roadmaps/default.json";

const STATIC_TEMPLATES: Record<string, any> = {
  java: javaData,
  python: pythonData,
  react: reactData,
  docker: dockerData,
  dsa: dsaData,
  "data structures": dsaData,
  algorithms: dsaData,
};

export class TemplateProvider implements AIProvider {
  id = "template";
  name = "Curated Template Engine (Built-in Fallback)";

  isConfigured(): boolean {
    // Built-in offline fallback is ALWAYS configured and ready
    return true;
  }

  async generateRoadmap(params: GeneratePathParams): Promise<LearningPathOutput> {
    const primaryTech = (params.technologies[0] || "default").toLowerCase();

    let matchedTemplate = defaultData;
    for (const [key, tpl] of Object.entries(STATIC_TEMPLATES)) {
      if (primaryTech.includes(key)) {
        matchedTemplate = tpl;
        break;
      }
    }

    // Create a deep copy so we never mutate static imports
    const templateContent = JSON.parse(JSON.stringify(matchedTemplate));

    // Adapt template dynamically to the user's specific params
    const techDisplay = params.technologies.join(" + ");
    templateContent.technology = techDisplay;
    templateContent.level = params.level;
    templateContent.goal = params.goal;
    templateContent.overview = `A personalized, production-oriented curriculum mastering ${techDisplay} tailored for a ${params.level} level engineer pursuing a ${params.goal} career track over ${params.durationWeeks} weeks.`;

    // Recalculate weekly schedule to match durationWeeks and hoursPerWeek exactly
    const totalTargetHours = params.durationWeeks * params.hoursPerWeek;
    const adaptedWeekly = [];

    const moduleTopics = (templateContent.modules || []).flatMap((m: any) =>
      m.topics.map((t: any) => `${m.title}: ${t.title}`)
    );

    for (let w = 1; w <= params.durationWeeks; w++) {
      const topicIndex = (w - 1) % (moduleTopics.length || 1);
      const nextTopicIndex = w % (moduleTopics.length || 1);

      const focusTopic = moduleTopics[topicIndex] || `Core Concepts Milestone ${w}`;
      const secondaryTopic = moduleTopics[nextTopicIndex] || "Hands-on implementation & review";

      adaptedWeekly.push({
        week: w,
        focus: `Week ${w}: ${focusTopic.split(":")[1]?.trim() || focusTopic}`,
        tasks: [
          `Study and experiment with ${focusTopic}`,
          `Build hands-on code examples for ${secondaryTopic}`,
          `Solve weekly practice challenges and review architecture`,
        ],
        hours: params.hoursPerWeek,
      });
    }

    templateContent.weeklySchedule = adaptedWeekly;

    // Scale module hours to fit within total duration
    const moduleCount = templateContent.modules.length || 1;
    const hoursPerMod = Math.max(8, Math.floor(totalTargetHours / moduleCount));
    templateContent.modules.forEach((mod: any) => {
      mod.estimatedHours = hoursPerMod;
    });

    return LearningPathOutputSchema.parse(templateContent);
  }
}
