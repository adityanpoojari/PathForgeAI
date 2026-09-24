import { GeneratePathParams } from "@/lib/types/roadmap";

export function buildSystemPrompt(): string {
  return `You are PathForge AI, an elite curriculum architect and principal software engineering mentor.
Your task is to generate a comprehensive, highly personalized, 6-dimensional learning curriculum for a software engineer.

CRITICAL INSTRUCTIONS & CONSTRAINTS:
1. OUTPUT FORMAT: Respond ONLY with valid, parseable JSON conforming to the exact schema requested. Do not include markdown code block ticks (\`\`\`json) if possible, or include only clean JSON.
2. NO URL INVENTIONS (ANTI-HALLUCINATION): NEVER invent, predict, or guess website URLs. For all resource objects, provide ONLY:
   - "label": Clear title of the resource
   - "type": "docs" | "video" | "article" | "practice"
   - "searchQuery": A precise search keyword query (e.g. "Oracle Java Collections HashMap documentation")
3. REALISTIC SCHEDULE MATCHING:
   - The "weeklySchedule" array MUST contain exactly N items corresponding to the requested duration in weeks (Week 1 through Week N).
   - Each item's "hours" field must equal the user's requested weekly hours.
   - The total estimated hours across all modules must comfortably fit within (durationWeeks * hoursPerWeek).
4. PROJECT TIERS:
   - Include exactly 4 hands-on projects spanning: "beginner", "intermediate", "advanced", "capstone".
   - Each project must have realistic skills, features, and stretch goals.
5. PRACTICE PROBLEMS:
   - Include 4 practice problems with difficulty ("easy" | "medium" | "hard"), topic, and actionable hints.
6. INTERVIEW PREP:
   - Include 4 high-frequency technical interview questions with complete, expert model answers.`;
}

export function buildUserPrompt(params: GeneratePathParams): string {
  const techList = params.technologies.join(", ");
  return `Create a complete learning path with these exact parameters:
- Technologies / Stack: ${techList}
- Proficiency Level: ${params.level}
- Target Career Goal: ${params.goal}
- Study Commitment: ${params.hoursPerWeek} hours per week
- Total Duration: ${params.durationWeeks} weeks

JSON Output Schema:
{
  "overview": string,
  "technology": "${techList}",
  "level": "${params.level}",
  "goal": "${params.goal}",
  "prerequisites": string[],
  "modules": [
    {
      "order": number,
      "title": string,
      "estimatedHours": number,
      "topics": [
        {
          "title": string,
          "description": string,
          "resources": [
            { "label": string, "type": "docs"|"video"|"article"|"practice", "searchQuery": string }
          ]
        }
      ]
    }
  ],
  "projects": [
    {
      "title": string,
      "difficulty": "beginner"|"intermediate"|"advanced"|"capstone",
      "description": string,
      "skills": string[],
      "features": string[],
      "stretchGoals": string[]
    }
  ],
  "practiceProblems": [
    {
      "title": string,
      "difficulty": "easy"|"medium"|"hard",
      "topic": string,
      "hint": string
    }
  ],
  "interviewQuestions": [
    {
      "question": string,
      "answer": string,
      "difficulty": string,
      "topic": string
    }
  ],
  "weeklySchedule": [
    {
      "week": number,
      "focus": string,
      "tasks": string[],
      "hours": number
    }
  ]
}`;
}
