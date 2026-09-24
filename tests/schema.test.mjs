import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { z } from "zod";

const ResourceSchema = z.object({
  label: z.string(),
  type: z.enum(["docs", "video", "article", "practice"]),
  searchQuery: z.string(),
});

const TopicSchema = z.object({
  title: z.string(),
  description: z.string(),
  resources: z.array(ResourceSchema).default([]),
});

const ModuleSchema = z.object({
  order: z.number(),
  title: z.string(),
  estimatedHours: z.number(),
  topics: z.array(TopicSchema),
});

const ProjectSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "capstone"]),
  description: z.string(),
  skills: z.array(z.string()),
  features: z.array(z.string()),
  stretchGoals: z.array(z.string()).default([]),
});

const PracticeProblemSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string(),
  hint: z.string(),
});

const InterviewQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  difficulty: z.string(),
  topic: z.string(),
});

const WeeklyScheduleSchema = z.object({
  week: z.number(),
  focus: z.string(),
  tasks: z.array(z.string()),
  hours: z.number(),
});

const LearningPathOutputSchema = z.object({
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

const templateFiles = ["java.json", "python.json", "react.json", "docker.json", "dsa.json", "default.json"];

for (const file of templateFiles) {
  test(`Roadmap template ${file} strictly passes Zod validation`, () => {
    const filePath = path.join(process.cwd(), "src", "data", "roadmaps", file);
    assert.equal(fs.existsSync(filePath), true, `Template file ${file} exists`);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const parsed = LearningPathOutputSchema.safeParse(content);
    assert.equal(parsed.success, true, `Zod parsing errors in ${file}: ${JSON.stringify(parsed.error?.errors)}`);
    assert.ok(parsed.data.modules.length > 0, `${file} has modules`);
    assert.ok(parsed.data.projects.length >= 4, `${file} has at least 4 projects`);
    assert.ok(parsed.data.practiceProblems.length >= 4, `${file} has at least 4 practice problems`);
    assert.ok(parsed.data.interviewQuestions.length >= 4, `${file} has at least 4 interview questions`);
    assert.ok(parsed.data.weeklySchedule.length > 0, `${file} has weekly schedule`);
  });
}

test("Invalid schema is rejected by Zod", () => {
  const invalidPayload = {
    overview: "Incomplete",
    technology: "Test",
    // Missing level, goal, modules, projects, etc.
  };
  const parsed = LearningPathOutputSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false);
});
