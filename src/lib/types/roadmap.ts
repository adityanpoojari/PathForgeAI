import { z } from "zod";

export const ResourceSchema = z.object({
  label: z.string(),
  type: z.enum(["docs", "video", "article", "practice"]),
  searchQuery: z.string(),
  url: z.string().optional(),
});

export const TopicSchema = z.object({
  title: z.string(),
  description: z.string(),
  resources: z.array(ResourceSchema).default([]),
});

export const ModuleSchema = z.object({
  order: z.number(),
  title: z.string(),
  estimatedHours: z.number(),
  topics: z.array(TopicSchema),
});

export const ProjectSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "capstone"]),
  description: z.string(),
  skills: z.array(z.string()),
  features: z.array(z.string()),
  stretchGoals: z.array(z.string()).default([]),
});

export const PracticeProblemSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string(),
  hint: z.string(),
});

export const InterviewQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  difficulty: z.string(),
  topic: z.string(),
});

export const WeeklyScheduleSchema = z.object({
  week: z.number(),
  focus: z.string(),
  tasks: z.array(z.string()),
  hours: z.number(),
});

export const LearningPathOutputSchema = z.object({
  overview: z.string(),
  technology: z.string(),
  level: z.string(),
  goal: z.string(),
  prerequisites: z.array(z.string()).default([]),
  modules: z.array(ModuleSchema),
  projects: z.array(ProjectSchema),
  practiceProblems: z.array(PracticeProblemSchema),
  interviewQuestions: z.array(InterviewQuestionSchema),
  weeklySchedule: z.array(WeeklyScheduleSchema),
});

export type Resource = z.infer<typeof ResourceSchema>;
export type Topic = z.infer<typeof TopicSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type PracticeProblem = z.infer<typeof PracticeProblemSchema>;
export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>;
export type WeeklyScheduleItem = z.infer<typeof WeeklyScheduleSchema>;
export type LearningPathOutput = z.infer<typeof LearningPathOutputSchema>;

export interface GeneratePathParams {
  technologies: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  goal: string;
  hoursPerWeek: number;
  durationWeeks: number;
}
